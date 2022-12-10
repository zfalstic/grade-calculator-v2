import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return(
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/grade-calculator-v2'>Home</Link>
          </li>
          <li>
            <Link to='/grade-calculator-v2/average'>Average</Link>
          </li>
          <li>
            <Link to='/grade-calculator-v2/final'>Final</Link>
          </li>
        </ul>

        <Outlet />
      </nav>
    </div>
  );
} 