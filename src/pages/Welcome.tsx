import React from 'react';
import './Welcome.css'

export default function Welcome () {
  return (
    <div className='WelcomeText'>
      <div className='WelcomeText-big'>
        <p>Welcome to <em>this</em> grade calculator</p>
      </div>
      <div className='WelcomeText-small'>
        <p>I really don't know why I made this</p>
      </div>
    </div>
  );
}
