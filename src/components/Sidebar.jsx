import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';
import home from '../assets/home.png';
import materi from '../assets/library_books.png';
import kuis from '../assets/assessment.png';
import logout from '../assets/logout.png';
import { supabase } from '../supabaseClient';

const Sidebar = () => {
  const [isMateriOpen, setIsMateriOpen] = useState(false);
  const [isKuisOpen, setIsKuisOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMateri = () => {
    setIsMateriOpen(!isMateriOpen);
  };

  const toggleKuis = () => {
    setIsKuisOpen(!isKuisOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      // Arahkan ke halaman login setelah berhasil logout
      navigate('/Login');
    }
  };

  const materiItems = [
    { label: 'Ejaan', path: '/Ejaan' },
    { label: 'Tata Kata', path: '/Tata-Kata' },
    { label: 'Tata Kalimat', path: '/Tata-Kalimat' },
  ];

  const kuisItems = [
    { label: 'Ejaan', path: '/Kuis/Ejaan' },
    { label: 'Tata Kata', path: '/Kuis/Tata-Kata' },
    { label: 'Tata Kalimat', path: '/Kuis/Tata-Kalimat' },
  ];

  return (
    <aside className="sidebar">
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
      <nav className="nav-menu">
        <div className="nav-item" onClick={() => handleNavigation('/')}>
          <img src={home} alt="Home Icon" className="icon" />
          <span className="label">Beranda</span>
        </div>
        
        <div className="nav-item-dropdown">
          <div className="nav-item" onClick={toggleMateri}>
            <img src={materi} alt="Materi Icon" className="icon" />
            <span className="label">Materi</span>
            <span className={`dropdown-arrow ${isMateriOpen ? 'open' : ''}`}>▼</span>
          </div>
          
          {isMateriOpen && (
            <div className="dropdown-menu">
              {materiItems.map((item) => (
                <div
                  key={item.path}
                  className="dropdown-item"
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="nav-item-dropdown">
          <div className="nav-item" onClick={toggleKuis}>
            <img src={kuis} alt="Kuis Icon" className="icon" />
            <span className="label">Kuis</span>
            <span className={`dropdown-arrow ${isKuisOpen ? 'open' : ''}`}>▼</span>
          </div>
          
          {isKuisOpen && (
            <div className="dropdown-menu">
              {kuisItems.map((item) => (
                <div
                  key={item.path}
                  className="dropdown-item"
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
      <div className="logout" onClick={handleLogout}>
        <img src={logout} alt="Logout Icon" className="icon" />
        <span className="label">Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;