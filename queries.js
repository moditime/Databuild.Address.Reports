
/* Companies*/

module.exports = {
    companyAddressCounter: [
        { $group: { _id: { address: '$Address' }, count: { $sum: 1 } } },
        { "$sort": { "count": -1 } }
    ],
    companiesSharingSameAddress: function (address) {
        return [
            {
                $match: {
                    "Address": address
                }
            }
        ]
    },

    company: {
        projectIdsFormatter: function (dataPromise, callback) {
            var projects = [];

            dataPromise.then(function (data) {

                data.forEach(function (item) {
                    projects.push(item.ProjectIdentity);
                });

                callback(projects);
            })
        },
        companyIdsFormatter: function (dataPromise, callback) {
            var company = [];

            dataPromise.then(function (data) {

                data.forEach(function (item) {
                    company.push(item.CompanyIdentity);
                });

                callback(company);
            })
        } ,
        formatter: function (dataPromise, callback) {
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
        },
        formatterOne: function (dataPromise, callback) {
            var companies = [];

            dataPromise.then(function (data) {

                data.forEach(function (item) {

                    companies.push({
                        Id: item.CompanyIdentity,
                        Name: item.Name
                    });

                });

                callback(companies);
            })
        },
        formatterTwo: function (dataPromise, callback) {
            var projects = [];

            dataPromise.then(function (data) {

                data.forEach(function (item) {
                    projects.push({
                        Id: item.ProjectIdentity,
                        Name: item.Name
                    });

                });

                callback(projects);
            })
        }
    }






}

// Projects
/*
module.exports = {
    projectAddressCounter: [
        { $group: { _id: { address: '$Address' }, count: { $sum: 1 } } },
        { "$sort": { "count": -1 } }
    ],
    projectSharingSameAddress: (address) => {
        return [
            {
                $match: {
                    "Address": address
                }
            }
        ]
    },

    project: {
        projformatter: function (dataPromise, callback) {
            var addresses = [];

            dataPromise.then(function (data) {

                data.forEach(function (item) {

                    if (item && item.count > 5) {
                        const address = item._id.address;
                        const fullAddress = [ address.StreetNumber, address.Street, address.Suburb, address.City, address.Province, address.Country].map(x => x || '').filter(x => x).join(', ');
                        addresses.push({
                            count: item.count,
                            fulladdress: fullAddress,
                            address: address
                        });
                    }
                });

                callback(addresses);
            })
        },
        projformatterOne: function (dataPromise, callback) {
            var projects = [];

            dataPromise.then(function (data) {

                data.forEach(function (item) {
                    projects.push({
                        Id: item.CompanyIdentity,
                        Name: item.Name
                    });

                });

                callback(projects);
            })
        }
    }






}*/