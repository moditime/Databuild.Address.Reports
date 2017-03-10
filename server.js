
var express = require('express');
var cors = require('cors')
var app = express()
var logger = require('./logger')
//var loggers = require('./loggerp')
var _persist = require('./companyDictionary')

var _pers = require('./projectDictionary')

// var comlogger = logger('C:\\Code\\Databuild\\Logs\\logs.txt')
// var projlogger = logger('C:\\Code\\Databuild\\Logs\\logs_proj.txt')
var bodyParser = require('body-parser');
// middleware
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const GenerateReport = require('./generateReport');
const queries = require('./queries');

app.get('/Projects', function (req, res) {

    GenerateReport("ProjectAggregate", queries.companyAddressCounter, queries.company.formatter, function (addresses) {
        res.send(addresses);
    });

})



app.get('/companies', function (req, res) {

    GenerateReport("CompanyAggregate", queries.companyAddressCounter, queries.company.formatter, function (addresses) {
        res.send(addresses);
    });

})


app.post('/companies/Address', function (req, res) {

    console.log("Recieved",req.body.address)
  
    GenerateReport("CompanyAggregate", queries.companiesSharingSameAddress(req.body.address), queries.company.formatterOne, function (addresses) {
        res.send(addresses);
    });
})


app.post('/projects/Address', function (req, res) {
   
    GenerateReport("ProjectAggregate", queries.companiesSharingSameAddress(req.body.address), queries.company.formatterTwo, function (addresses) {
        res.send(addresses);
    });
})



app.post('/projects/ids', function (req, res) {
    var address =req.body.address;
     console.log("Project Address",address);
    GenerateReport("ProjectAggregate", queries.companiesSharingSameAddress(address), queries.company.projectIdsFormatter, function (project_ids) {
        res.json(project_ids);
    });
})



app.post('/companies/ids', function (req, res) {
    var address = req.body.address;
    console.log("Address",address);
    GenerateReport("CompanyAggregate", queries.companiesSharingSameAddress(address), queries.company.companyIdsFormatter, function (company_ids) {
        //console.log("Results",res.json(company_ids));
        res.json(company_ids);
    });
})



app.get('/persist', function (req, res) {
    _persist(function (dictionary) {
        res.json(dictionary)
    });
})

app.get('/pers', function (req, res) {
    _pers(function (dictionary) {
        res.json(dictionary)
    });
})

app.listen(3002, function () {
    console.log('Address Reports API  listening on port 3002!')
})