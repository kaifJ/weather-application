const axios = require('axios');
const request = require('request');
const yargs = require('yargs');

var args = yargs
          .options({
            address:{
              describe:'address of the location',
              demand:true,
              alias:'a'
            }
          })
          .help()
          .argv;

var encodedURI = encodeURIComponent(args.a);
var geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}&key=AIzaSyBIQrS94xpxlaFxCPVjmR7R-tFPekC9pQc`;

axios.get(geoUrl).then((location)=>{
  var lat = location.data.results[0].geometry.location.lat;
  var lng = location.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/55f32ee75389e46cfb856ca530490bff/${lat},${lng}`;
  axios.get(weatherUrl).then((weather)=>{
    console.log(`Address : ${location.data.results[0].formatted_address}`);
    console.log(`Temperature : ${weather.data.currently.temperature}`);
    console.log(`Feels liek : ${weather.data.currently.apparentTemperature}`);
  });
});
