import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/MateriDetail.css';
import tataKalimatImg from '../assets/Tata-Kalimat-Banner.png';

const TataKalimat = () => {
  const [activeSection, setActiveSection] = useState('pengantar');

  const sections = [
    { id: 'pengantar', title: 'Pengantar Tata Kalimat' },
    { id: 'unsur', title: 'Unsur-Unsur Kalimat' },
    { id: 'jenis', title: 'Jenis Kalimat' },
    { id: 'efektif', title: 'Kalimat Efektif' },
    { id: 'kesalahan', title: 'Kesalahan Umum' },
  ];

  const content = {
    pengantar: {
      title: 'Pengantar Tata Kalimat',
      type: 'text',
      definition: 'Tata kalimat mempelajari cara menyusun kata menjadi kalimat yang efektif, logis, dan mudah dipahami.',
      tujuan: [
        'Menyusun kalimat sesuai kaidah bahasa Indonesia.',
        'Memahami fungsi dan peran unsur kalimat.',
        'Membedakan kalimat efektif dan tidak efektif.',
      ],
    },
    unsur: {
      title: 'Unsur-Unsur Kalimat',
      type: 'text',
      description: 'Setidaknya memiliki Subjek (S) dan Predikat (P). Bisa ditambah Objek (O), Pelengkap (Pel), dan Keterangan (Ket)',
      items: [
        {
          label: 'Subjek',
          function: 'Pelaku / tokoh utama',
          example: 'Ani membaca buku',
        },
        {
          label: 'Predikat',
          function: 'Menyatakan tindakan',
          example: 'Ani membaca buku',
        },
        {
          label: 'Objek',
          function: 'Penerima tindakan',
          example: 'Ani membaca buku',
        },
        {
          label: 'Pelengkap',
          function: 'Melengkapi predikat',
          example: 'Dia menjadi guru',
        },
        {
          label: 'Keterangan',
          function: 'Waktu/tempat/cara',
          example: 'Kami belajar di sekolah',
        },
      ],
    },
    jenis: {
      title: 'Jenis Kalimat',
      type: 'items',
      items: [
        {
          label: 'a. Berdasarkan Tujuan',
          subItems: [
            {
              title: 'Kalimat Berita (Deklaratif)',
              description: 'Menyampaikan informasi',
              example: 'Contoh: Ia pergi ke sekolah.',
            },
            {
              title: 'Kalimat Tanya (Interogatif)',
              description: 'Menanyakan sesuatu',
              example: 'Contoh: Kapan ia pergi?',
            },
            {
              title: 'Kalimat Perintah (Imperatif)',
              description: 'Meminta/menginstruksi',
              example: 'Contoh: Pergilah ke sekolah!',
            },
          ],
        },
        {
          label: 'b. Berdasarkan Struktur',
          subItems: [
            {
              title: 'Kalimat Sederhana',
              description: '(S-P atau S-P-O)',
              example: 'Contoh: Ayah tidur.',
            },
            {
              title: 'Kalimat Majemuk Setara',
              description: 'Dihubungkan konjungsi dan, atau, tetapi',
              example: 'Contoh: Saya belajar dan adik bermain.',
            },
            {
              title: 'Kalimat Majemuk Bertingkat',
              description: 'Ada klausa induk & anak kalimat',
              example: 'Contoh: Dia tersenyum karena senang.',
            },
          ],
        },
      ],
    },
    efektif: {
      title: 'Kalimat Efektif',
      type: 'text',
      description: 'Ciri-ciri Kalimat Efektif:',
      ciri: [
        '✅ Logis',
        '✅ Mengikuti kaidah EYD/PUEBI',
        '✅ Ringkas, tidak bertele-tele',
        '✅ Ejaan dan tanda baca benar',
      ],
      example: 'Contoh Perbaikan:\n\nTidak Efektif → Efektif\nKarena virus itu sehingga sekolah ditutup. → Karena virus itu, sekolah ditutup.\nPara hadirin-hadirin dimohon berdiri. → Para hadirin dimohon berdiri.',
    },
    kesalahan: {
      title: 'Kesalahan Umum Tata Kalimat',
      type: 'items',
      items: [
        {
          label: 'Kalimat tanpa Subjek/Predikat',
          description: 'Kalimat harus minimal memiliki subjek dan predikat',
          example: 'Contoh salah: Sedang belajar.\nContoh benar: Saya sedang belajar.',
        },
        {
          label: 'Pemakaian Konjungsi Ganda',
          description: 'Menghindari penggunaan konjungsi yang berlebihan',
          example: 'Contoh salah: Karena virus itu sehingga sekolah ditutup.\nContoh benar: Karena virus itu, sekolah ditutup.',
        },
        {
          label: 'Kalimat Rancu',
          description: 'Makna ganda atau membingungkan pembaca',
          example: 'Gunakan kalimat yang jelas dan spesifik.',
        },
        {
          label: 'Urutan Informasi Tidak Logis',
          description: 'Penyusunan informasi harus sesuai urutan logika',
          example: 'Pastikan informasi penting didahulukan.',
        },
      ],
    },
  };

  const currentContent = content[activeSection];

  const renderUnsurTable = () => {
    if (activeSection !== 'unsur') return null;
    return (
      <div className="table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th>Unsur</th>
              <th>Fungsi</th>
              <th>Contoh</th>
            </tr>
          </thead>
          <tbody>
            {currentContent.items.map((item, index) => (
              <tr key={index}>
                <td>{item.label}</td>
                <td>{item.function}</td>
                <td>{item.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="materi-wrapper">
      <Header />
      <Sidebar />
      <main className="materi-content">
        {/* Banner */}
        <div className="materi-banner" style={{ backgroundImage: `url(${tataKalimatImg})` }}>
          <h1 className="banner-title"></h1>
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

            {currentContent.type === 'text' && (
              <>
                {currentContent.definition && (
                  <p className="content-description">
                    <strong>Definisi:</strong> {currentContent.definition}
                  </p>
                )}

                {currentContent.tujuan && (
                  <>
                    <h3 className="content-subtitle">Tujuan Pembelajaran:</h3>
                    <ul className="content-list">
                      {currentContent.tujuan.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}

                {currentContent.description && (
                  <p className="content-description">{currentContent.description}</p>
                )}

                {activeSection === 'unsur' && renderUnsurTable()}

                {currentContent.ciri && (
                  <ul className="content-list">
                    {currentContent.ciri.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}

                {currentContent.example && (
                  <p className="content-example">{currentContent.example}</p>
                )}
              </>
            )}

            {currentContent.type === 'items' && (
              <div className="content-items">
                {currentContent.items.map((item, index) => (
                  <div key={index} className="item">
                    <h3 className="item-label">{item.label}</h3>
                    
                    {item.description && (
                      <p className="item-description">{item.description}</p>
                    )}

                    {item.subItems && (
                      <div className="sub-items">
                        {item.subItems.map((subItem, subIndex) => (
                          <div key={subIndex} className="sub-item">
                            <h4 className="sub-item-title">{subItem.title}</h4>
                            <p className="sub-item-description">{subItem.description}</p>
                            <p className="sub-item-example">{subItem.example}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.example && (
                      <p className="item-example">{item.example}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TataKalimat;