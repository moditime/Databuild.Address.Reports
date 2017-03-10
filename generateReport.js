var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var MONGO_URI = 'mongodb://127.0.0.1:27017';
var DATABASE_NAME = 'AggregateCache';
var COLLECTION_NAME = 'CompanyAggregate';

function GenerateReport(collectionName, query, fnFormatter, callback) {


    fnFormatter = fnFormatter || function (dataPromise, callback) {
        var addresses = [];

        dataPromise.then(function (data) {

            data.forEach(function (item) {

                if (item && item.count > 5) {
                    var address = item._id.address;
                    var fullAddress = [address.StreetNumber, address.Street, address.Suburb, address.City, address.Province, address.Country]
                    .map(function(x){
                            return  x || ''
                        }).filter(function(x){
                            return x;
                        }).join(', ');
                    addresses.push({
                        count: item.count,
                        fulladdress: fullAddress,
                        address: address
                    });
                }
            });

            callback(addresses);
        })
    }


    MongoClient.connect('mongodb://127.0.0.1:27017/AggregateCache', function (err, db) {

        if (err) {
            console.err(err);
        }

        cursor = db.collection(collectionName).aggregate(query);

        var dataPromise = cursor.toArray();


        fnFormatter(dataPromise, callback);

        // var addresses = [];

        // dataPromise.then(function (data) {

        //     data.forEach(function (item) {

        //         if (item && item.count > 5) {
        //             const address = item._id.address;
        //             const fullAddress = [address.StreetNumber, address.Street, address.Suburb, address.City, address.Province, address.Country].map(x => x || '').filter(x => x).join(', ');
        //             addresses.push({
        //                 count: item.count,
        //                 fulladdress: fullAddress,
        //                 address: address
        //             });
        //         }
        //     });

        //    callback(addresses);
        // })

    })

}

module.exports = GenerateReport;
