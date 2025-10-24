import React from 'react';
import '../styles/Sidebar.css';
import home from '../assets/home.png';
import materi from '../assets/library_books.png';
import kuis from '../assets/assessment.png';
import logout from '../assets/logout.png';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
      <nav className="nav-menu">
        <div className="nav-item">
          <img src={home} alt="Home Icon" className="icon" />
          <span className="label">Beranda</span>
        </div>
        <div className="nav-item">
          <img src={materi} alt="Materi Icon" className="icon" />
          <span className="label">Materi</span>
        </div>
        <div className="nav-item">
          <img src={kuis} alt="Kuis Icon" className="icon" />
          <span className="label">Kuis</span>
        </div>
      </nav>
      <div className="logout">
        <img src={logout} alt="Logout Icon" className="icon" />
        <span className="label">Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;