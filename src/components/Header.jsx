import React from 'react';
import '../styles/Header.css';
import tabaImg from '../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
          <img src={tabaImg} alt="Logo" width="40" height="40" /> <span className="logo-text">taba</span>
      </div>
      <div className="user-profile">
        <div className="avatar">J</div>
        <div className="user-info">
          <span className="username">Jennoi</span>
          <span className="user-id">19623020</span>
        </div>
      </div>
    </header>
  );
};

export default Header;