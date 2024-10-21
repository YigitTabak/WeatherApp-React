import React, { useEffect, useRef, useState } from "react";
import "./Weather.css"
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"
import humidity_icon from "../assets/humidity.png"

const Weather = () => {
    const inputRef=useRef()
    const [weatherData, setWeatherData]= useState(false)
    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,
    }
    const search= async (city)=>{
        if(city === ""){
            alert("Şehir İsmi Giriniz");
            return
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url);
            const data=await response.json();
            if(!response.ok){
                alert("Şehir İsmi Yanlış");
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humdity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch(error){
            setWeatherData(false);
            console.error("Error")
        }

    }
  return(
  
    <div className="weather">
        <p id="havadur">Anlık Hava Durumu</p>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder="Şehir İsmi"></input>
            <img src={search_icon} onClick={()=>search(inputRef.current.value)}></img>
        </div>

        {weatherData?<>
            <img src={weatherData.icon} className="weather-icon"></img>
            <p className="temparature">{weatherData.temperature}°c</p>
            <p className="location">{weatherData.location}</p>
            <div className="weather-data">
            <div className="col">
                    <img src={humidity_icon}></img>
                <div>
                    <p>{weatherData.humdity}%</p>
                    <span>Nem</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon}></img>
                    <div>
                        <p>{weatherData.windSpeed}km</p>
                        <span>Rüzgar Hızı</span>
                    </div>
            </div>
        </div>   
        </>:<></>}  
    </div>)

}
export default Weather