import './App.css';
import axios from 'axios'
import React, { useState,useEffect } from 'react';
import Coin from './Coin';
function App() {
  const [coins,setCoins]= useState([]);
  const [search,setSearch] = useState('');
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res => {
      setCoins(res.data);
      console.log(res.data)
    }).catch(error =>  console.log(error))
  },[])
 const handleChange = e => {
   e.preventDefault()
   setSearch(e.target.value);
 }
 const filterCoins  = coins.filter(coin => 
  coin.name.toLowerCase().includes(search.toLowerCase()));
  console.log(filterCoins)

  return (


    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">SEARCH CRYPTO</h1>
        <form >
          <input 
          type="text"  
          placeholder="search"
          onChange={handleChange}
          className="coin-input" />
        </form>
      </div>
      {filterCoins.map(coin => {
        return(<Coin 
          key={coin.id}
          name={coin.name}
          price={coin.current_price}
          symbol={coin.symbol}
          marketcap={coin.total_volume}
          volume={coin.market_cap}
          image={coin.image}
          priceChange={coin.price_change_percentage_24h}
        />)
      })}
    </div>
  );
}

export default App;
