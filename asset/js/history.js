console.log("Page Loaded!");

const apiKey="e01e7340103244a7bf9150936242611";
let btnHistorySearch= document.getElementById("btn-history-search");
let txtHistoryCity= document.getElementById("txt-history-city");
let txtHistoryDate= document.getElementById("txt-history-date");

window.onload=function(){
    historySearch("Sri Lanka","2024-01-01");
}

function historySearch(historyCity,historyDate){

    let url=`https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${historyCity}&dt=${historyDate}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        
        let body = `<thead>
                        <tr>
                            <th>📅 Date</th>
                            <th>🌏 Country</th>
                            <th>🗺️ Region</th>
                            <th>📍 City</th>
                            <th>☁️ Condition</th>
                            <th>🌡️ Temparature</th>
                            <th>💧 Humidity</th>
                            <th>🌦️ Chance of Rain</th>
                            <th>💨 Wind Speed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${data.forecast.forecastday[0].date}</td>
                            <td>${data.location.country}</td>
                            <td>${data.location.region}</td>
                            <td>${data.location.name}</td>
                            <td>${data.forecast.forecastday[0].day.condition.text}</td>
                            <td>${data.forecast.forecastday[0].day.avgtemp_c} °C</td>
                            <td>${data.forecast.forecastday[0].day.avghumidity}</td>
                            <td>${data.forecast.forecastday[0].day.daily_chance_of_rain}</td>
                            <td>${data.forecast.forecastday[0].day.maxwind_kph} kph </td>
                        </tr>            
                    </tbody>`;
                    
                    document.getElementById("txt-city").innerHTML=data.location.name;
                    document.getElementById("txt-temparature").innerHTML=data.forecast.forecastday[0].day.avgtemp_c+"°C";
                    let img=document.getElementById("weather-icon");
                    img.src=data.forecast.forecastday[0].day.condition.icon;
                    document.getElementById("tbl-weather-history-conditions").innerHTML=body;
    });
}

btnHistorySearch.addEventListener("click", ()=>{
    historySearch(txtHistoryCity.value,txtHistoryDate.value);
});

let citySuggestionList=document.getElementById("city-suggestion-list");

txtHistoryCity.addEventListener("input", ()=>{
    
    if(txtHistoryCity.value==""){
        citySuggestionList.innerText="";
    }

    
    let list=[];
    let url=`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${txtHistoryCity.value}`
        
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
                    historySearch(element.name,"2024-01-01");
                    txtHistoryCity.value=element.name;
                    txtHistoryDate.value="2024-01-01";
                    citySuggestionList.innerHTML="";
                });
            }
        });
    }); 
});