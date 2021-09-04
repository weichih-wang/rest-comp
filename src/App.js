import React, { useState, useEffect } from 'react';
import useStore from './store/DataLoader.jsx';

import './App.css';
import RestaurantDashboard from './components/RestaurantDashboard/RestaurantDashboard'

function App() {
  const currState = useStore(state => state);
  const [currRestaurant, setCurrRestaurant] = useState('hookfish');

  const change = function(e) {
    setCurrRestaurant(e.target.value);
    currState.setCurrRestaurant(e.target.value);
  }
  
  useEffect(() => {
    currState.loadGamineData();
    currState.loadHookfishData();
    currState.setCurrRestaurant('hookfish');
  }, []);

  return (
    <>
      <select id="restaurant" onChange={change} value={currRestaurant}>
        <option value="hookfish">Hookfish</option>
        <option value="gamine">Gamine</option>
      </select>
      <RestaurantDashboard />
    </>
  );
}

export default App;
