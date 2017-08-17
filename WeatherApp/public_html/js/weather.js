/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * USE ternary operator
 */
/**********Notes*********************
29060e84e03e5fd17b47c3dae047ddf7 API KEY
**************************/

/**************************************
 * Goal
 * Weather of my current location
 * Search bar
 * Different Icon or background image depending on weather
 * Button to toggle between Fahrenheit and Celsius
 * Background Photos related to weather
 * Solution
 * Get current Location
 * 
 * Card Carussel  for next 5 days
 * Get weather object from API
 * Extract the relevant data
 *  Add button which changes onclick from fahrenheit to celsius  
 *  An If /switch statesment  for weather Icons
 * 
 * Learned
 * soundeffect depending on weathe
 * How to apply a CSS 3 blur filter to a background image
 *  create a list with differrent Cities where you can select fom create an Object: a  weather object.


 */

//***********Variables***********************



var temperature ;
var tempUnit ;
var weatherObject = {};
var latitude;
var longitude;
var country ;
var city;
var descriptionWeather ;
var apiKey = "29060e84e03e5fd17b47c3dae047ddf7";






//***************Variables*****************
//************** Functions**********************

 function setLocation (response){
     //extract local coords
     latitude=response.coords.latitude;
     longitude=response.coords.longitude;
    
 };




function getCurrentWeather (pLongitude,pLatitude) {
    
   
    
   var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat="+pLatitude+"&lon="+pLongitude+"&APPID="+apiKey+"&units=metric";
    
   $.ajax({
  method: "GET",
  url: weatherAPI,
  dataType: "json",
  success: function(response){
      
     city= response.name ;
     country=response.sys.country ;
     temperature = parseInt(response.main.temp*10)/10; 
     tempUnit="Celsius";
     descriptionWeather= response.weather[0].description ;
     toHTML(city,country,temperature,descriptionWeather) ;
  }
});
    
    
}

function getWeatherNextWeek (pLongitude,pLatitude) {
    
   
    
   var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?"+pLatitude+"&lon="+pLongitude+"&APPID="+apiKey+"&units=metric";
    
   $.ajax({
  method: "GET",
  url: weatherAPI,
  dataType: "json",
  success: function(response){
      
     city= response.name ;
     country=response.sys.country ;
     temperature = parseInt(response.main.temp*10)/10; 
     tempUnit="Celsius";
     descriptionWeather= response.weather[3] ;
     toHTML(city,country,temperature, descriptionWeather) ;
  }
});
    
    
}















function toHTML (pCity,pCountry, pTemperature,pDescriptionWeather) {
    
 
 $(".temperature").html(pTemperature+"&#8451;");
 $("#location").html(pCity+","+pCountry);
 $(".weatherIcon").html("<p>"+ pDescriptionWeather  +"</p>") ;
    
}


function setBackground (pWeather){
    
    switch(pWeather) {
    case "clear sky":
        code block
        break;
    case "few clouds":
        code block
        break;
    
    case "scattered clouds":
        code block
        break;
        
    case "broken clouds":
        code block
        break;
        
    case "few clouds":
        code block
        break;
        
     case "shower rain":
        code block
        break;
        
     case "rain":
        code block
        break;
        
    case "thunderstorm":
        code block
        break;
        
     case "snow":
        code block
        break;
        
     case "mist":
        code block
        break;
        
        
}
    
    
    
}






function error (){
    
     console.log(" It was not possible to get the current location");
    
}








//************** Functions**********************
//*******************Executed code**********************//


navigator.geolocation.getCurrentPosition(setLocation, error);

setTimeout(function(){
 getCurrentWeather(longitude, latitude);

}, 500);


$(".temperature").click(function(){
    
    if(tempUnit==="Celsius"){
        
     $(".temperature").html(parseInt((temperature*1.8 + 32)*10)/10+"&#8457;");  
        tempUnit="Fahrenheit";
        
    }
    
    else {
        
         $(".temperature").html(temperature+"&#8451;");
        tempUnit="Celsius";
    }
    
});

//Get current GPS data

$('.gpsButton').click(function(){
    
 navigator.geolocation.getCurrentPosition(setLocation, error);

setTimeout(function(){
 getCurrentWeather(longitude, latitude);

}, 500);  
    
});