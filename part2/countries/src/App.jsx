import { useState, useEffect } from 'react'
import CountriesService from './services/Countries'
import DisplayCountry from './components/DisplayCountry'
import './App.css'

const DisplayFindCountriesInput = (props) => {
  return (
    <div>
      <p>Type name of the country:</p>
      <input className="filtercountry" value={props.keywords} onChange={props.setKeywords} />
    </div>
  )
}

const DisplayFilteredCountries = ({countries, onSelectCountry, selectedCountry}) => {
  let showCountryIndex = -1
  
  if (typeof selectedCountry === "number" && selectedCountry >= 0) 
  {
    showCountryIndex = selectedCountry
  } 
  else if(countries.length === 1)
  {
    showCountryIndex = 0
  } 

  if(countries.length > 10) 
  {
    return (
        <p>
          Found too many matches. Please narrow down your search.
        </p>
    )
  } 
  else 
  {
    return (
      <div>
        <ul className='filteredcountries'>
          {countries.length >1 && countries.map((country, index) => <li key={index}>{country.name.common} <button onClick={() => onSelectCountry(index)}>show</button></li>)}
        </ul>
        {(showCountryIndex >= 0) && <DisplayCountry country={countries[showCountryIndex]} />} 
      </div>
    )
  }

}

const App = () => {
  const [filterKeywords, setFilterKeywords] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(null);

  const fetchAndLoadCountries = () => {
    CountriesService
      .fetchAll()
      .then(initialData => setAllCountries(initialData))
  }

  if(selectedCountryIndex) {

  }
  const filteredCountries = filterKeywords === "" ? allCountries : allCountries.filter(country => country.name.common.toLowerCase().includes(filterKeywords.toLowerCase()))
  
  useEffect(fetchAndLoadCountries, [])
  
  /* Input Handlers */
  const handleFilterKeywords = (event) => {
    setFilterKeywords(event.target.value)
    setSelectedCountryIndex(null)
  }

  return (
    <>
      <h1>Countries</h1>
      <h4>Our database contains information of <code>{allCountries.length}</code> countries.</h4>

      <DisplayFindCountriesInput keywords={filterKeywords} setKeywords={handleFilterKeywords} />
      {/* Only show once there are some keywords entered */}
      {filterKeywords !== "" && 
        <DisplayFilteredCountries 
          countries={filteredCountries} 
          onSelectCountry={setSelectedCountryIndex} 
          selectedCountry={selectedCountryIndex} />}
    </>
  )
}

export default App