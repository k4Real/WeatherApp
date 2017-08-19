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
 *  add error pictures
 * 
 * Learned
 * soundeffect depending on weathe
 * How to apply a CSS 3 blur filter to a background image
 *  create a list with differrent Cities where you can select fom create an Object: a  weather object.


 */

//***********Variables***********************



var temperature ;
var weatherTypes =[
    "rain",
    "sun",
    "clouds",
    "clear sky",
    "thunderstorm",
    "snow",
    "mist",
    "haze"
     
];

var tempUnit ;
var windSpeed;
var date;
var weatherObject = {};
var weatherAPI ;
var latitude;
var tempWeather ;
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
     weatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&APPID="+apiKey+"&units=metric";
 };




function getCurrentWeather () {
    
   
    

    
   $.ajax({
  method: "GET",
  url: weatherAPI,
  dataType: "json",
  success: function(response){
      
     city= response.name ;
     country=response.sys.country ;
     date =  getCurrentDate()  ;
     windSpeed =response.wind.speed ;
     temperature = parseInt(response.main.temp*10)/10; 
     tempUnit="Celsius";
     descriptionWeather= response.weather[0].description ;
     toHTML(city,country,temperature,descriptionWeather,windSpeed) ;
  }
});
    
    
}

function getCurrentDate (){
    
    
    var today = new Date();
var dd = today.getDate();
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var mm =  monthNames[today.getMonth()]; //January is 0!

var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

 

return  dd+ '. ' +mm  + ' ' + yyyy;
    
    
    
    
    
    
    
}














function toHTML (pCity,pCountry, pTemperature,pDescriptionWeather,pWind) {
    
 
 $(".temperature").html(pTemperature+"&#8451;");
 $("#location").html(pCity+", "+pCountry);
 $(".weatherIcon").html("<p>"+ pDescriptionWeather  +"</p>") ;
 $("#windSpeed").html(pWind+" m/h");
 $("#currentDate").html("Date:" + getCurrentDate);
  setBackground(pDescriptionWeather);
  
  
 
}

// search weather description  for specific keyword and set relevant background
function setBackground (pWeather){
    
    tempWeather="" ;
    
    for (i=0; i<weatherTypes.length;i++){
        
  if(pWeather.indexOf(weatherTypes[i])!== -1){
      tempWeather= weatherTypes[i];
     
  }
    
    }
    
    
    
    
    
    switch(tempWeather) {
    case "clear sky":
        $("body").css("background-image","url('img/clearsky.jpg')") ;
        break;
    case "few clouds":
         $("body").css("background-image","url('img/cloudy.jpg')") ;
        break;
    
    case "scattered clouds":
         $("body").css("background-image","url('img/cloudy.jpg')") ;
        break;
        
    case "broken clouds":
         $("body").css("background-image","url('img/cloudy.jpg')") ;
        break;
        
    case "clouds":
         $("body").css("background-image","url('img/cloudy.jpg')") ;
        break;
        
     case "shower rain":
       $("body").css("background-image","url('img/rain.jpg')") ;
        break;
        
     case "rain":
      $("body").css("background-image","url('img/rain.jpg')") ;
        break;
        
    case "thunderstorm":
          $("body").css("background-image","url('img/thunderstorm.jpg')") ;
        break;
        
     case "snow":
       $("body").css("background-image","url('img/snowy.jpg')") ;
        break;
        
     case "mist":
        $("body").css("background-image","url('img/mist.jpg')") ;
        break;
        
       case "haze":
        $("body").css("background-image","url('img/mist.jpg')") ;
        break;
        
        default:
             $("body").css("background-image","url('img/mist.jpg')") ;
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
 getCurrentWeather();

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
 getCurrentWeather();

}, 500);  
    
});


$('.searchButton').click(function(){
    
   // need to do this to get the value of a text field
   var tempCity = document.getElementById("searchTxt").value;
  
  weatherAPI = "http://api.openweathermap.org/data/2.5/weather?q="+tempCity+"&APPID="+apiKey+"&units=metric";
  
  // using timeout fucntion to give ajax request time to be completed
  setTimeout(function(){
 getCurrentWeather();

}, 500);
});