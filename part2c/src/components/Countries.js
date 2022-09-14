import { useState, useEffect }  from 'react'
import axios from 'axios'

const Countries = ({countries, filter, setFilter}) => {

    const api_key = process.env.REACT_APP_API_KEY

    const [temperature, setTemperature] = useState('')
    const [wind, setWind] = useState('')
    const [icon, setIcon] = useState('')
    
    const countriesToShow = countries.filter(item => {
        if(filter === ''){
            return item
      } else if (item.name.common.toLowerCase().includes(filter.toLowerCase())) {
            return item
      }
      })

      useEffect(() => {
          if (countriesToShow.length === 1) {
            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${countriesToShow[0].capital}&units=metric&APPID=${api_key}`)
            .then(response => {
                setTemperature(response.data.main.temp)
                setIcon(response.data.weather[0].icon)
                setWind(response.data.wind.speed)
                
            })
          }
        
      }, [filter])

  

    return (
        <>
        {countriesToShow.length < 10 && countriesToShow.length > 1 && countriesToShow.map((country) => {
                return (
                    <div key={country.name.common}>
                        {country.name.common}<button onClick={() => setFilter(country.name.common)}>show</button>
                    </div>
                    
                )
            
          })}
        {countriesToShow.length >= 10 && <p>Too many matches, specify another filter</p>}
        {countriesToShow.length === 1 && 
        <>
            <h1>{countriesToShow[0].name.common}</h1>
            <div>
                <p>capital {countriesToShow[0].capital}</p>
                <p>area {countriesToShow[0].area}</p>
            </div>
            <div>
                <h3>languages:</h3>
                <ul>
                {Object.values(countriesToShow[0].languages).map((language, index) => {
                    return (
                        <li key={index}>{language}</li>
                    )
                })}
                </ul>
            </div>
            <div>
                <img src={countriesToShow[0].flags.png}/>
            </div>
            <h2>Weather in {countriesToShow[0].capital}</h2>
            <p>temperature {temperature} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
            <p>wind {wind} m/s</p>
        </>
        }
        </>
    )
  }
  
  export default Countries

  