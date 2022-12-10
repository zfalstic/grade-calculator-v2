import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return(
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/average'>Average</Link>
          </li>
          <li>
            <Link to='/final'>Final</Link>
          </li>
        </ul>

        <Outlet />
      </nav>
    </div>
  );
} 