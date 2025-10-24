import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/Home.css';
import ejaan from '../assets/Ejaan.png';
import tataKata from '../assets/Tata_Kata.png';
import tataKalimat from '../assets/Tata_Kalimat.png';

const Home = () => {
  const courses = [
    { id: 1, image: ejaan },
    { id: 2, image: tataKata },
    { id: 3, image: tataKalimat },
  ];

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
              style={{ backgroundColor: course.bgColor }}
            >
              <img src={course.image} alt={course.title} className="course-image" />
              <div className="course-title">{course.title}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;