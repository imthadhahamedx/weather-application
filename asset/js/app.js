console.log("Page Loaded!");

const apiKey="e01e7340103244a7bf9150936242611";

let btnSearch= document.getElementById("btn-city-search");
let txtCity= document.getElementById("txt-city-name");

window.onload= function(){
    citySearch("Sri Lanka");
}
    
function citySearch(city){

    let url=`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    

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
                            <th>💨 Wind Speed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${data.location.localtime}</td>
                            <td>${data.location.country}</td>
                            <td>${data.location.region}</td>
                            <td>${data.location.name}</td>
                            <td>${data.current.condition.text}</td>
                            <td>${data.current.temp_c} °C</td>
                            <td>${data.current.humidity}</td>
                            <td>${data.current.wind_kph} Kph</td>
                        </tr>            
                    </tbody>`;
                    
                    document.getElementById("txt-city").innerHTML=data.location.name;
                    document.getElementById("txt-temparature").innerHTML=data.current.temp_c+"°C";
                    let img=document.getElementById("weather-icon");
                    img.src=data.current.condition.icon;
                    document.getElementById("tbl-weather-conditions").innerHTML=body;
    });
}
    
btnSearch.addEventListener("click", ()=>{
    citySearch(txtCity.value);
});

let citySuggestionList = document.getElementById("city-suggestion-list");

txtCity.addEventListener("input", ()=>{
    if(txtCity.value==""){
        citySuggestionList.innerHTML="";
    }
    
    let list=[];
    let url=`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${txtCity.value}`
    
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
                    citySearch(element.name);
                    txtCity.value=element.name;
                    citySuggestionList.innerHTML="";
                });
            }
        });
    }); 
});


    




