// src/data/dragDropQuestions.js
// Menggabungkan 2 soal Tata Kalimat + 3 soal Ejaan, total 5 soal.

export const questionSets = {
  'tata-kalimat': [
    // Soal 1 (Asli Tata Kalimat)
    {
      title: 'Tata Kalimat: Efektif atau Tidak Efektif (1)',
      instructions:
        'Kelompokkan kalimat sesuai efektivitasnya untuk materi Tata Kalimat.',
      sentences: [
        { text: 'Saya bertemu teman lama di pasar tadi pagi.', correct: 'Efektif' },
        { text: 'Karena ia ingin cepat selesai maka ia buru-buru jadi hasilnya kurang baik.', correct: 'Tidak Efektif' },
        { text: 'Subjek dan predikat harus seimbang dalam struktur kalimat.', correct: 'Efektif' },
        { text: 'Dia menunggu menunggu sampai temannya datang.', correct: 'Tidak Efektif' },
        { text: 'Ia menonton film baru semalam.', correct: 'Efektif' },
        { text: 'Saya pergi ke toko karena saya ingin membeli makanan jadi saya bergegas pergi.', correct: 'Tidak Efektif' },
        { text: 'Kepala sekolah memberikan sambutan.', correct: 'Efektif' },
        { text: 'Ketika sudah sampai, sampai dia lupa membawa barangnya.', correct: 'Tidak Efektif' },
      ],
    },
    // Soal 2 (Asli Tata Kalimat)
    {
      title: 'Tata Kalimat: Efektif atau Tidak Efektif (2)',
      instructions: 'Tarik setiap kalimat ke kategori yang tepat.',
      sentences: [
        { text: 'Sinta membaca buku di ruang tamu.', correct: 'Efektif' },
        { text: 'Dia berjalan pergi keluar dari pintu yang terbuka lebar sekali.', correct: 'Tidak Efektif' },
        { text: 'Kami mengunjungi nenek di desa.', correct: 'Efektif' },
        { text: 'Ia menunggu di depan sambil menunggu lagi di belakang.', correct: 'Tidak Efektif' },
        { text: 'Para siswa mengikuti upacara.', correct: 'Efektif' },
        { text: 'Karena tidak punya uang maka dia tidak bisa membeli apa-apa sehingga kecewa.', correct: 'Tidak Efektif' },
        { text: 'Dia terlambat karena bangun kesiangan.', correct: 'Efektif' },
        { text: 'Kalimatnya panjang karena memakai banyak kata yang sebetulnya tidak perlu.', correct: 'Tidak Efektif' },
      ],
    },
    // Soal 3 (Diambil dari Ejaan 1)
    {
      title: 'Klasifikasi: Kalimat Efektif atau Tidak Efektif (1)',
      instructions:
        'Seret kalimat ke kolom "Efektif" jika kalimat tersusun singkat, jelas, dan tepat; ke kolom "Tidak Efektif" jika tampak bertele-tele, berulang, atau tidak efektif.',
      sentences: [
        { text: 'Ia hadir dalam rapat.', correct: 'Efektif' },
        { text: 'Karena hujan, jadi pertandingan ditunda.', correct: 'Tidak Efektif' },
        { text: 'Kami mendiskusikan tugas kelompok.', correct: 'Efektif' },
        { text: 'Dia pergi ke pasar untuk membeli sayur, lalu dia pulang kemudian memasak.', correct: 'Tidak Efektif' },
        { text: 'Adik membaca buku cerita di kamar.', correct: 'Efektif' },
        { text: 'Untuk alasan karena dia terlambat, maka ujian dimulai tanpa dia.', correct: 'Tidak Efektif' },
        { text: 'Para siswa membersihkan kelas.', correct: 'Efektif' },
        { text: 'Ia membaca buku dan kemudian menulis catatan, lalu dia meninjau catatan itu kembali.', correct: 'Tidak Efektif' },
      ],
    },
    // Soal 4 (Diambil dari Ejaan 2)
    {
      title: 'Klasifikasi: Efektif atau Tidak Efektif (2)',
      instructions: 'Susun klasifikasi yang benar berdasarkan efektivitas kalimat.',
      sentences: [
        { text: 'Mereka akan berpartisipasi dalam lomba.', correct: 'Efektif' },
        { text: 'Dia sangat, sangat senang atas kemenangannya.', correct: 'Tidak Efektif' },
        { text: 'Rina menulis laporan di ruang kerja.', correct: 'Efektif' },
        { text: 'Ia bekerja keras karena ingin mencapai tujuan sehingga dia berhasil.', correct: 'Tidak Efektif' },
        { text: 'Ayah memperbaiki kursi rusak itu.', correct: 'Efektif' },
        { text: 'Karena ia lapar maka ia makan makanan yang rasanya enak sekali.', correct: 'Tidak Efektif' },
        { text: 'Saya meminjam buku kepada Rudi.', correct: 'Efektif' },
        { text: 'Dia menyelesaikan tugasnya, kemudian dia tidur, setelah itu dia bangun.', correct: 'Tidak Efektif' },
      ],
    },
    // Soal 5 (Diambil dari Ejaan 3)
    {
      title: 'Klasifikasi: Efektif atau Tidak Efektif (3)',
      instructions: 'Tarik setiap kalimat ke kategori yang tepat.',
      sentences: [
        { text: 'Kalimat aktif lebih jelas daripada kalimat pasif dalam banyak konteks.', correct: 'Efektif' },
        { text: 'Saya ingin pergi ke toko karena saya perlu membeli sesuatu, jadi saya pergi.', correct: 'Tidak Efektif' },
        { text: 'Ia mencari rumah yang dijual.', correct: 'Efektif' },
        { text: 'Ia masuk ke dalam ruangan karena dia ingin melihat apa yang ada di dalamnya.', correct: 'Tidak Efektif' },
        { text: 'Mahasiswa itu belajar dan melakukan penelitian.', correct: 'Efektif' },
        { text: 'Dia makan makanan yang enak dan dia sangat menikmati makanannya itu.', correct: 'Tidak Efektif' },
        { text: 'Meja ini lebih berat daripada kursi itu.', correct: 'Efektif' },
        { text: 'Ketika dia tiba, tiba-tiba listrik mati sehingga lampu padam.', correct: 'Tidak Efektif' },
      ],
    },
  ],
};