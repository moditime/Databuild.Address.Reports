var fs = require('fs');
var readline = require('readline');

var filepath = 'C:\\Code\\Databuild\\Logs\\delete-projects-log.txt';
var dictionary = {};

function buildDictionary(log) {
    if (!dictionary[log.address]) {
        dictionary[log.address] = log.ids;
    }
}

function writeToDictionaryFile(cb) {
    var lineReader = readline.createInterface({
        input: fs.createReadStream(filepath)
    });

    lineReader.on('line', function (line) {
        var log = JSON.parse(line);
        buildDictionary(log);
    });

    lineReader.on('close', function () {
        cb(dictionary);
    });
}

module.exports = writeToDictionaryFile;