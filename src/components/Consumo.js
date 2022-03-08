import React from 'react';
import axios from 'axios';

import { useState } from 'react';
import { useEffect } from 'react';
// import logo from '../assets/load.gif'


const Consumo = () => {


    const[weather, setWeather] = useState({}) //pasamos un objeto vacio como valor por default al weather.

    const [temp, setTemp] = useState({});

    const [isC, setIsC]= useState(true);

    const[backgndColor, setbackgndColor]=useState("linear-gradient( 135deg, #72EDF2 10%, #5151E5 100%)");
    const[color, setColor]=useState("#0323469d");
    const[bgBtn, setbgBtn]= useState("#2f5e8f");

    let  today = new Date();
    
    let todayIs = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`


    useEffect( ()=>{    
        navigator.geolocation.getCurrentPosition(success);//?is used to get the current position of the device.
        },[]);


    const success=(pos)=>{

        let latitude = pos.coords.latitude;
        let longitude = pos.coords.longitude;

        
        axios.get( `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4752e37b5bfea353b5a494c5e134282f&units=metric`)
        .then(res => {
            setWeather(res.data); //seteamos Weather, ahora vale data de la respuesta de la API
            setTemp(res.data.main.temp);

            if(temp > "20"){
                //a partir de 20° C se hace un cambio de estilos
                setbackgndColor("linear-gradient( 135deg, #e0d42a 10%, #e56251 100%)");
                setColor("#c411119d");
                setbgBtn("rgb(209, 124, 109)");
            }
        });
        
    }
    
        setTimeout(() => {
            setLoading(false);
            },7000);//despues de 6 seg. el estado de loading cambia a false

const toggle =()=>{
    
    if(isC){
        let convert =(temp*1.8)+32;
            setTemp(convert.toFixed(1));
            // console.log(temp);
            setIsC(false);
    }

    else{
        let convert =(temp - 32)* 0.55555;
        setTemp(convert.toFixed(1)); 
        setIsC(true);
    }
    
}


const [loading, setLoading] = useState(true);

//Si esta cargando (si loaging es true)...
if(loading){
    return(
    <div>
        <p className='loading'>Loading...</p>
   </div>
    )
  }

  else{
    return (

        <div className='card'>

            <div className='card-main-information' style={{background: backgndColor, color:color} }>
                <h2><i className="fa-solid fa-location-dot"></i>  {weather.name}. {weather.sys?.country}</h2>
                <p className='description'>"{weather.weather?.[0].description}"</p>
                <div className='flex'>
                <img src={` http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}  alt="" />
                <p className='description'><i className="fa-solid fa-temperature-empty"></i> {`${temp} ${isC? "°C":"°F"}`}</p>
                </div>
                <button onClick={toggle} style={{background:bgBtn}}>Change to {isC? "°F": "°C"}</button>



            </div>

            <div className='card-secondary-information'>

                <p> <i className="fa-solid fa-droplet"></i>  humidity: {weather.main?.humidity } %</p>
                <p><i className="fa-solid fa-gauge"></i> pressure: {weather.main?.pressure } hPa</p>
                <p><i className="fa-solid fa-wind"></i>     wind speed: {weather.wind?.speed } m/s</p>
                <p className='date'> {todayIs} </p>
            </div>


        </div>
    );
    }
};

export default Consumo;