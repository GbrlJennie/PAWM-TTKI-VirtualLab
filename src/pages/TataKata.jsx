import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/MateriDetail.css';
import tataKataImg from '../assets/Tata_Kata.png';

const MateriDetail = () => {
  const [activeSection, setActiveSection] = useState('pengantar');

  const sections = [
    { id: 'pengantar', title: 'Pengantar Tata Kata' },
    { id: 'jenis', title: 'Jenis-jenis Kata' },
    { id: 'proses', title: 'Proses pembentukan kata' },
  ];

  const content = {
    pengantar: {
      title: 'Pengantar Tata Kata',
      description: 'Tata kata membahas pembentukan kata dan hubungan antar unsur dalam kata.',
    },
    jenis: {
      title: 'Jenis-jenis Kata',
      items: [
        {
          label: 'a. Kata Benda (Nomina)',
          description: 'Menunjukkan nama orang, tempat, atau benda.',
          example: 'Contoh: buku, rumah, Andi, Jakarta.',
        },
        {
          label: 'b. Kata Kerja (Verba)',
          description: 'Menyatakan tindakan atau aktivitas.',
          example: 'Contoh: membaca, menulis, berjalan.',
        },
        {
          label: 'c. Kata Sifat (Adjektiva)',
          description: 'Menyatakan sifat atau keadaan.',
          example: 'Contoh: cepat, tinggi, cantik.',
        },
        {
          label: 'd. Kata Sifat (Adjektiva)',
          description: 'Menyatakan sifat atau keadaan.',
          example: 'Contoh: cepat, tinggi, cantik.',
        },
      ],
    },
    proses: {
      title: 'Proses pembentukan kata',
      description: 'Penjelasan tentang proses pembentukan kata dalam bahasa Indonesia.',
    },
  };

  const currentContent = content[activeSection];

  return (
    <div className="materi-wrapper">
      <Header />
      <Sidebar />
      <main className="materi-content">
        {/* Banner */}
        <div className="materi-banner" style={{ backgroundImage: `url(${tataKataImg})` }}>
          <h1 className="banner-title">Tata Kata</h1>
        </div>

        <div className="materi-container">
          {/* Sidebar Navigation */}
          <aside className="materi-sidebar">
            <nav className="section-nav">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`section-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.title}
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="materi-main">
            <h2 className="content-title">{currentContent.title}</h2>

            {activeSection === 'pengantar' && (
              <p className="content-description">{currentContent.description}</p>
            )}

            {activeSection === 'jenis' && (
              <div className="content-items">
                {currentContent.items.map((item, index) => (
                  <div key={index} className="item">
                    <h3 className="item-label">{item.label}</h3>
                    <p className="item-description">{item.description}</p>
                    <p className="item-example">{item.example}</p>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'proses' && (
              <p className="content-description">{currentContent.description}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MateriDetail;