import { useState, useEffect } from 'react'
import CountriesService from './services/Countries'

import './App.css'

const DisplayFindCountriesInput = (props) => {
  return (
    <div>
      <p>Type name of the country:</p>
      <input className="filtercountry" value={props.keywords} onChange={props.setKeywords} />
    </div>
  )
}

const DisplayCountry = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Captial: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h4>Languages</h4>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

const DisplayFilteredCountries = ({countries}) => {  
  if(countries.length > 10) 
  {
    return (
        <p>
          Found too many matches. Please narrow down your search.
        </p>
    )
  } 
  else if(countries.length === 1) 
  {
    return (
      <DisplayCountry country={countries[0]} />
    )
  }
  else 
  {
    return (
      <ul className='filteredcountries'>
        {countries.map((country, index) => <li key={index}>{country.name.common}</li>)}
      </ul>
    )
  }

}

const App = () => {
  const [filterKeywords, setFilterKeywords] = useState('')
  const [allCountries, setAllCountries] = useState([])

  const fetchAndLoadCountries = () => {
    CountriesService
      .fetchAll()
      .then(initialData => setAllCountries(initialData))
  }

  const filteredCountries = filterKeywords === "" ? allCountries : allCountries.filter(country => country.name.common.toLowerCase().includes(filterKeywords.toLowerCase()))
  
  useEffect(fetchAndLoadCountries, [])
  
  
  /* Input Handlers */
  const handleFilterKeywords = (event) => {
    setFilterKeywords(event.target.value)
  }

  return (
    <>
      <h1>Countries</h1>
      <h4>Our database contains information of <code>{allCountries.length}</code> countries.</h4>

      <DisplayFindCountriesInput keywords={filterKeywords} setKeywords={handleFilterKeywords} />
  
      <DisplayFilteredCountries countries={filteredCountries} />
    </>
  )
}

export default App