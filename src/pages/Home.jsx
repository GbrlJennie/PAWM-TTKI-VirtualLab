import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/Home.css';
import ejaan from '../assets/Ejaan.png';
import tataKata from '../assets/Tata_Kata.png';
import tataKalimat from '../assets/Tata_Kalimat.png';

const Home = () => {
  const navigate = useNavigate();

  const courses = [
    { id: 1, title: 'Ejaan', image: ejaan, path: '/Ejaan' },
    { id: 2, title: 'Tata Kata', image: tataKata, path: '/Tata-Kata' },
    { id: 3, title: 'Tata Kalimat', image: tataKalimat, path: '/Tata-Kalimat' },
  ];

  const handleCourseClick = (path) => {
    navigate(path);
  };

  return (
    <div className="home-wrapper">
      <Header />
      <Sidebar />
      <main className="main-content">
        <h1>Selamat datang, Jennoi!</h1>
        <p className="subtitle">Sudah siap belajar apa hari ini?</p>

        <div className="courses-grid">
          {courses.map((course) => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => handleCourseClick(course.path)}
            >
              <img src={course.image} alt={course.title} className="course-image" />
              <div className="course-title"></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;