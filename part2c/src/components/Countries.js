import { useState }  from 'react'

const Countries = ({countries, filter}) => {
    
    const countriesToShow = countries.filter(item => {
        if(filter === ''){
            return item
      } else if (item.name.common.toLowerCase().includes(filter.toLowerCase())) {
            return item
      }
      })

    return (
        <>
        {countriesToShow.length < 10 && countriesToShow.length > 1 && countriesToShow.map((country) => {
                return (

                    <p key={country.name.common}>{country.name.common}</p>
                )
            
          })}
        {countriesToShow.length >= 10 && <p>Too many matches, specify another filter</p>}
        {countriesToShow.length === 1 && 
        <>
            <h1>{countriesToShow[0].name.common}</h1>
            <p>capital {countriesToShow[0].capital}</p>
            <p>area {countriesToShow[0].area}</p>
            <p>languages:</p>
            <img src={countriesToShow[0].flags.png}/>
        </>
        }
        </>
    )
  }
  
  export default Countries