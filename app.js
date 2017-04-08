/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

var ibmdb = require('ibm_db')
global.dbConnString = "put your credentials here";

// start server on the specified port and binding host
app.get('/cars', function(req, res) {
    carBudget = req.query.carBudget;
    seats = req.query.seats;
    litres = req.query.fuelBudget / 2.5;
    kms = req.query.averageKM;
    KM_Per_Litre = kms / litres;
    console.log(KM_Per_Litre);
    ibmdb.open(dbConnString, function(err, conn) {
        if (err) {
            console.log("Error", err);
        } else {
            var query = "SELECT * FROM FINAL_DATA WHERE formattedprice <=" + carBudget + " AND KM_Per_Litre >=" +  KM_Per_Litre + " AND SeatingCapacity = " + seats + " ORDER BY BrandValue DESC LIMIT 6;";
            conn.query(query, function(err, rows) {
                if (err) {
                    console.log("Error", err);
                    return;
                } else {
                    console.log(rows);
                    res.send(rows);
                    conn.close(function() {
                        console.log("Connection closed successfully");
                    });
                }
            });
        }
    })
});