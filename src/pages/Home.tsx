import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="welcome">
        <p className="welcome__text welcome__text--big welcome__text--black">
          Welcome to <em>this</em> grade calculator
        </p>
        <p className="welcome__text welcome__text--small welcome__text--gray">
          I really don't know why I made this
        </p>
      </div>
      <div className="navigation">
        <div className="navigation__text-container">
          <p className="navigation__text">
            If you want to calculate your average in a class by entering each
            grade
          </p>
          <p className="navigation__text">
            If you want to calculate what you need to make on your final to hit
            a target grade
          </p>
        </div>
        <div className="navigation__button-container">
          <Link to="/grade-calculator-v2/average">
            <button className="navigation__button">
              Class Average Calculator
            </button>
          </Link>
          <Link to="/grade-calculator-v2/final">
            <button className="navigation__button">Final Calculator</button>
          </Link>
        </div>
      </div>
      <div className="trademark">
        <div className="trademark__text">
          <p>made by @zfalstic</p>
        </div>
      </div>
    </div>
  );
}
