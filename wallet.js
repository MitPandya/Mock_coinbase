var request = require('supertest')("http://api.postcodes.io");
var data = require('./mock.json');
var nock = require('nock');


const express = require('express')
const app = express()
const port = 3000

app.get('/get_wallet_details', (request, response) => {
	var wallet_data;
	getAccountDetails(function(data) {
    	wallet_data = data;
	});
	setTimeout(function () {
		//console.log(response);
  		//console.log(wallet_data);
  		response.send(wallet_data);
	}, 2000);
  	
});

app.get('/send_money', (request, response) => {
	var send_money_data;
	getAccountDetails(function(data) {
    	send_money_data = data;
	});
	setTimeout(function () {
		//console.log(response);
  		//console.log(wallet_data);
  		response.send(send_money_data);
	}, 2000);
  	
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});


function send_money(callback){
    var jsonContent = JSON.stringify(data.send_money);
    var temp;
    nock("http://api.postcodes.io")
      .get('/send_money/')
      .reply(200, jsonContent);

    request
      .get('/send_money/')
      .expect(200)
      .end(function (err, res) {
        callback(res.text);
      });
}

function getAccountDetails(callback){
    var jsonContent = JSON.stringify(data.account_details);
    var temp;
    nock("http://api.postcodes.io")
      .get('/account_details/')
      .reply(200, jsonContent);

    request
      .get('/account_details/')
      .expect(200)
      .end(function (err, res) {
        callback(res.text);
      });
}