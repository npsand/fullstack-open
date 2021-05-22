import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Countries from './components/Countries';


const App = () =>{
  const [find, setFind] = useState('');
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY
  
  const handleFind = (event) =>{
    setFind(event.target.value);
    console.log(event.target.value);
  }
  
  const viewCountry = (country) =>{
    console.log(country.name);
    setFind(country.name);
  }

  useEffect(()=>{
    if(countries.length === 1){
      axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countries[0].capital}`)
      .then(response =>{
        setWeather(response.data);
        console.log('test in effect');
      })
    }else{
      setWeather(null);
    }
  },[countries])

  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        setCountries(response.data.filter(country => country.name.toLowerCase().includes(find.toLowerCase())));
        //console.log('test', response.data);
      })
  },[find])

  return(
    <div>
      {console.log('wheater test',weather)}
      <div>find countries <input onChange={handleFind} /></div>
      <Countries countries={countries} clickHandle={viewCountry} weather={weather} />
    </div>
  )
}


export default App;