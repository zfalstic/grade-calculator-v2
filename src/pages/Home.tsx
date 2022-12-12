import React from 'react';
import { Link } from 'react-router-dom'

import './Home.css'

export default function Home() {
  return (
    <div>
      <div className='WelcomeText'>
        <div className='WelcomeText-big'>
          <p>Welcome to <em>this</em> grade calculator</p>
        </div>
        <div className='WelcomeText-small'>
          <p>I really don't know why I made this</p>
        </div>
      </div>
      <div className='NavContainer'>
        <div className='NavText'>
          <p>If you want to calculate your average in a class by entering each grade</p>
          <p>If you want to calculate what you need to make on your final to hit a target grade</p>
        </div>
        <div className='NavButton'>
          <Link to='/grade-calculator-v2/average'><button className='ActualNavButton'>Class Average Calculator</button></Link>
          <Link to='/grade-calculator-v2/final'><button className='ActualNavButton'>Final Calculator</button></Link>
        </div>        
      </div>
    </div>
  );
}
