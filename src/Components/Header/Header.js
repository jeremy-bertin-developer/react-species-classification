import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="container-fluid mx-auto">
      <div className="row">
        <div className="col-12 header-wrapper">
            <h1 className="text-left m-3">BIM SPOT — API Exercise</h1>
        </div>
      </div>
    </header>
  );
}

export default Header;