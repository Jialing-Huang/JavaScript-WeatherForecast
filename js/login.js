
///Set date and clock time function
///Update the time every one second 
window.setInterval(function(){
    let clockElement = document.getElementById("clock");
    clockElement.innerHTML = new Date().toLocaleTimeString();
}, 1000)

///Call the date after 0.5 second passed when the html refreshed
window.setTimeout(function(){
    let dateElement = document.getElementById("date");
    dateElement.innerHTML = new Date().toDateString();
}, 500)

//Set AJAX method to communicate with client and server
const xhrObject = new XMLHttpRequest();
xhrObject.open("GET","https://dataservice.accuweather.com/forecasts/v1/daily/5day/56186?apikey=CyGfvhXKk0oKGtAYPTE4HSxN3CkyEDRL&metric=true");

//Set functions to parse the response
xhrObject.onload = function (){
    const myJSON = xhrObject.response;

    const myObjectFromJSON = JSON.parse(myJSON);
    var infoElement = document.getElementById("info");
    infoElement.innerHTML = "Weather in Montreal for the next 5 days!";
    
    //Fetch parsed JSON data of 5 days and show them by added elements on the html page
    for(var i = 0; i < 5; i++){
        //Get the parent node by id. The parent node is a <ul> element 
        infoElement = document.getElementById("info");

        //Create <li> element and add it as child node of <ul> element
        let dateForecast = document.createElement("li");
        infoElement.appendChild(dateForecast);

        //Get the parenet node of <ul> element and add <div> element as a child node
        infoElement = document.getElementById("info");
        let infoForecast = document.createElement("div");
        infoElement.appendChild(infoForecast);

        //Specify the content of the <div> element by selector of object
        infoForecast.innerHTML = "Max: "+myObjectFromJSON.DailyForecasts[i].Temperature.Maximum.Value+"C"+" Min: "+myObjectFromJSON.DailyForecasts[i].Temperature.Minimum.Value+"C";
        
        //Run the same process again
        infoElement = document.getElementById("info");
        infoForecast = document.createElement("div");
        infoElement.appendChild(infoForecast);
        infoForecast.innerHTML = "Day: "+myObjectFromJSON.DailyForecasts[i].Day.IconPhrase+" Night: "+myObjectFromJSON.DailyForecasts[i].Night.IconPhrase;
        
        //Identify the id of the <li> element by the count value of the for loop
        dateForecast.id = i.toString();

        //Get the parenet node of <li> element and create and add <a> element as a child node
        let linkForecast = document.getElementById(dateForecast.id); 
        let linkInfo = document.createElement("a");
        linkForecast.appendChild(linkInfo);
        
        //Speficify the content and .href attribute with parsed JSON response
        linkInfo.innerHTML = myObjectFromJSON.DailyForecasts[i].Date;
        linkInfo.href = myObjectFromJSON.DailyForecasts[i].Link;
 
    }

    //Print some important info at the console
    console.log(myObjectFromJSON);
    console.log(myObjectFromJSON.DailyForecasts[0].Date);
    console.log(myObjectFromJSON.DailyForecasts[0].Day.IconPhrase);
}

//Set a regular expression for email validation
var emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//Set minimum password length as 6
var minPwdLength = 6;

//Specify constantly showed info and warning info
function sendXHRRequest(){
    //Set reminding info for sending request
    let messageElement = document.getElementById("message");
    messageElement.innerHTML = "\"Request issued successfully\"";

    //Set the default value of email and password 
    let emailElement = document.getElementById("email");
    let emailValue = emailElement.value;

    let pwdElement = document.getElementById("password");
    let pwdValue = pwdElement.value;

    //Either email validation wrong or password length wrong will cause a warning info which is a new <p> element to be added
    if(emailRe.test(emailValue) === false || pwdValue.length < minPwdLength){
        let warningZone = document.getElementById("warning");
        let warningElement = document.createElement("p");
        warningZone.appendChild(warningElement);
        warningElement.innerHTML = "Error! Please complete the form!";

        //An email validation error will cause a warning info which is a new <p> element to be added
        if(emailRe.test(emailValue) === false){
            let warningZone = document.getElementById("warning");
            let warningElement = document.createElement("p");
            warningZone.appendChild(warningElement);
            warningElement.innerHTML = "* Email address must be filled in!";
        }
        
        //An password length validation error will cause a warning info which is a new <p> element to be added
        if(pwdValue.length < minPwdLength){
            let warningZone = document.getElementById("warning");
            let warningElement = document.createElement("p");
            warningZone.appendChild(warningElement);
            warningElement.innerHTML = "* Password length must be at least 6 characters!";
        }
    }
    else{
        //If no error determined then send the requrest to the server
        xhrObject.send();
    }
    
}

