console.log("Page Loaded!");

const apiKey="e01e7340103244a7bf9150936242611";
let btnForecastSearch= document.getElementById("btn-forecast-search");
let txtForecastCity=document.getElementById("txt-forecast-city");
let txtForecastDays=document.getElementById("txt-forecast-days");

window.onload=function(){
    forecastSearch("Sri Lanka", "5");
}

function forecastSearch(forecastCity,forecastDays){
    
    let url= `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${forecastCity}&days=${forecastDays}&aqi=no&alerts=no`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        
        let body = `<thead>
                        <tr>
                            <th>📅 Date</th>
                            <th>🌥️ Icon</th>
                            <th>☁️ Condition</th>
                            <th>🌡️ Temparature</th>
                            <th>💧 Humidity</th>
                            <th>🌦️ Chance of Rain</th>
                            <th>🌧️ Precipitation</th>
                        </tr>
                    </thead>`;
                    
                    data.forecast.forecastday.forEach(element => {
                        body += `<tr>
                                    <td>${element.date}</td>
                                    <td><img src=${element.day.condition.icon}></img></td>
                                    <td>${element.day.condition.text}</td>
                                    <td>${element.day.avgtemp_c} °C</td>
                                    <td>${element.day.avghumidity}</td>
                                    <td>${element.day.daily_chance_of_rain} %</td>
                                    <td>${element.day.totalprecip_mm} mm</td>
                                </tr>`;
                                
                    });
                    document.getElementById("city").innerHTML=data.location.name;
                    document.getElementById("temparature").innerHTML=data.current.temp_c+"°C";
                    let img= document.getElementById("weather-icon").src=data.current.condition.icon;
                    document.getElementById("tbl-weather-forecast-conditions").innerHTML=body;
    });
}

btnForecastSearch.addEventListener("click", ()=>{
    forecastSearch(txtForecastCity.value,txtForecastDays.value);
});

let citySuggestionList=document.getElementById("city-suggestion-list");

txtForecastCity.addEventListener("input", ()=>{

    if(txtForecastCity.value==""){
        citySuggestionList.innerHTML="";
    }
    
    let list=[];
    let url=`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${txtForecastCity.value}`
    
    citySuggestionList.innerHTML="";
        
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(element => {
            let suggestionList=`${element.name}, ${element.region}, ${element.country}`;

            if(!list.includes(suggestionList)){
                li= document.createElement("li");
                li.textContent=suggestionList;
                citySuggestionList.appendChild(li);
                list.push(li.textContent);
                    
                li.addEventListener("click", ()=> {
                    //city=`${element.name},  ${element.region},  ${element.country}`;
                    forecastSearch(element.name,"5");
                    txtForecastCity.value=element.name;
                    txtForecastDays.value="5";
                    citySuggestionList.innerHTML="";
                });
            }
        });
    });
});