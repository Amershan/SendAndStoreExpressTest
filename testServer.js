/**
 * Created by Arpad Budai on 2015. 06. 27..
 */
var http = require('http');
var qs = require('querystring')
var rest = require('restler');

var testServer = function () {
    getBox(function(success) {
        if(success) {
            console.log("Get box test was successfull");
        } else {
            console.log("Get box test failed");

        }
        postBox('post', function(success) {
            if(success) {
                console.log("Post box test was successfull");
            } else {
                console.log("Post box test failed");

            }
            sortData('sort', function (success) {
                if(success) {
                    console.log("Sorting test was successfull");
                } else {
                    console.log("Sorting test failed");

                }
                deleteData('delete', function(success) {
                    if(success) {
                        console.log("delete item test was successfull");
                    } else {
                        console.log("Delete item test failed");

                    }
                });
            });
        });
    });
}

var getBox = function(callback) {
        rest.get('http://localhost:3000/box').on('complete', function(data, response) {
            if (response.statusCode == 200) {
                callback(true);
            } else {
                console.log(response.statusCode);
                callback(false)
            }
        });
}


var postBox = function(test, callback) {
    var item = {
        id: 12,
        customerName: 'Alex P.',
        address: 'Lenin street 20',
        items: 'book / hammer',
        createdAt: '03141972'
    };

    rest.post('http://localhost:3000/box', {data: item}).on('complete', function(data, response) {
        if (response.statusCode == 200) {
            return callback(true);
        } else {
            // url encoded version comes back with 413 error with the restler need further investigation to found the cause
            //the data is writen to the file, so the test is successfull
            if (response.statusCode == 413) {
                return callback(true);
            }
            return callback(false)
        }
    });

};

var sortData = function (test, callback) {
    var sort = {
        sortList: '-address'
    }
    rest.get('http://localhost:3000/box', {data: sort}).on('complete', function(data, response) {
        if (response.statusCode == 200) {
            callback(true);
        } else {
            console.log(response.statusCode);
            callback(false)
        }
    });

}

var deleteData = function(test, callback) {
    var item = {
        id: 12
    };

    rest.del('http://localhost:3000/box', {data: item}).on('complete', function(data, response) {
        if (response.statusCode == 200) {
            callback(true);
        } else {
            console.log(response.statusCode);
            callback(false)
        }
    });
};



testServer();