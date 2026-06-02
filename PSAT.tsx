import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  User, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldAlert, 
  Users, 
  FileText, 
  Cpu, 
  ChevronRight, 
  LogOut, 
  RefreshCw, 
  Search, 
  Filter, 
  Code, 
  Check, 
  AlertTriangle, 
  Lock, 
  Trash2, 
  Edit3, 
  Save, 
  Plus, 
  Eye, 
  Flame, 
  Sparkles, 
  Gamepad2, 
  Zap, 
  ShieldX
} from 'lucide-react';

// 10 SOAL PG (HOTS) & 5 SOAL ESAI (HOTS) PEMROGRAMAN WEB HTML KELAS X RPL
const SOAL_EXAM = {
  pilihanGanda: [
    {
      id: "pg1",
      pertanyaan: "Diberikan potongan kode: <a href='contact.html'> <img src='mail.png' alt='Hubungi Kami'> </a>. Mengapa struktur penulisan elemen ini dianggap sebagai praktik terbaik (best practice) dalam aksesibilitas web?",
      pilihan: [
        { key: "A", teks: "Karena tag gambar memaksa browser membuat baris baru di dalam link." },
        { key: "B", teks: "Atribut alt memberikan deskripsi alternatif bagi pengguna pembaca layar (screen reader) saat gambar berfungsi sebagai tautan." },
        { key: "C", teks: "Karena elemen a tidak boleh berdiri sendiri tanpa adanya elemen gambar di dalamnya." },
        { key: "D", teks: "Penggunaan tag gambar di dalam link secara otomatis mempercepat waktu pemuatan halaman web." }
      ],
      jawabanBenar: "B"
    },
    {
      id: "pg2",
      pertanyaan: "Seorang siswa menulis kode berikut:\n<ul type='1'>\n  <li>Analisis</li>\n  <li>Desain</li>\n</ul>\nNamun, daftar yang muncul tetap menggunakan simbol bullet bulat, bukan angka. Analisis mengapa kesalahan ini terjadi!",
      pilihan: [
        { key: "A", teks: "Tag ul hanya mendukung type 'disc', 'circle', dan 'square'. Jika ingin daftar berangka (1, 2, 3), harus menggunakan tag <ol>." },
        { key: "B", teks: "Browser X tidak mendukung atribut type pada elemen list." },
        { key: "C", teks: "Atribut type harus diletakkan pada tag <li>, bukan pada tag pembuka <ul>." },
        { key: "D", teks: "Siswa lupa menutup tag <ul> dengan tag </list>." }
      ],
      jawabanBenar: "A"
    },
    {
      id: "pg3",
      pertanyaan: "Perhatikan cuplikan dokumen berikut:\n<div>\n  <p>Paragraf Pertama <span>di dalam span</p> yang terputus</span>\n</div>\nBagaimana browser modern merender kode HTML yang memiliki tumpang tindih (overlapping tags) seperti di atas?",
      pilihan: [
        { key: "A", teks: "Browser akan menghentikan proses rendering halaman dan menampilkan error fatal (white screen)." },
        { key: "B", teks: "Tag span otomatis dihapus dan teks di dalamnya digabungkan ke elemen div terluar." },
        { key: "C", teks: "Browser melakukan auto-correction DOM tree, tetapi berisiko merusak struktur layout CSS karena penutupan elemen yang tidak valid secara semantik." },
        { key: "D", teks: "Browser akan menampilkan pesan pop-up peringatan kepada pengunjung web mengenai kerusakan tag." }
      ],
      jawabanBenar: "C"
    },
    {
      id: "pg4",
      pertanyaan: "Anda ingin membuat form pencarian yang secara otomatis mengarahkan fokus kursor ke input teks segera setelah halaman web dimuat tanpa mengharuskan pengguna mengekliknya terlebih dahulu. Atribut HTML5 mana yang paling efisien digunakan?",
      pilihan: [
        { key: "A", teks: "<input type='text' focus='true'>" },
        { key: "B", teks: "<input type='text' autofocus>" },
        { key: "C", teks: "<input type='text' required>" },
        { key: "D", teks: "<input type='text' placeholder='Cari...' active>" }
      ],
      jawabanBenar: "B"
    },
    {
      id: "pg5",
      pertanyaan: "Perhatikan struktur navigasi berikut:\n<nav>\n  <a href='#section1'>Home</a> | \n  <a href='#section2'>Profile</a>\n</nav>\nApa arti dari nilai atribut href yang diawali simbol '#' (hash) tersebut?",
      pilihan: [
        { key: "A", teks: "Tautan eksternal yang merujuk pada server web terenkripsi (Secure HTTPS)." },
        { key: "B", teks: "Perintah bagi browser untuk mengunduh dokumen lokal bernama section1." },
        { key: "C", teks: "Penanda jangkar (anchor) untuk berpindah ke elemen dengan ID tertentu pada halaman yang sama." },
        { key: "D", teks: "Tautan mati (broken link) yang belum ditentukan alamat tujuannya." }
      ],
      jawabanBenar: "C"
    },
    {
      id: "pg6",
      pertanyaan: "Mengapa penggunaan tag semantik seperti <header>, <article>, <section>, dan <footer> sangat direkomendasikan dibandingkan penggunaan tumpukan tag <div> yang berlebihan?",
      pilihan: [
        { key: "A", teks: "Tag semantik memberikan struktur dokumen yang bermakna bagi mesin pencari (SEO) dan teknologi asistif, serta mempermudah pemeliharaan kode." },
        { key: "B", teks: "Tag semantik secara otomatis menerapkan styling CSS modern tanpa memerlukan file stylesheet eksternal." },
        { key: "C", teks: "Penggunaan tag semantik dapat mengurangi ukuran file HTML hingga lebih dari 50%." },
        { key: "D", teks: "Tag <div> sudah dinyatakan usang (deprecated) dan tidak didukung lagi di standar HTML5." }
      ],
      jawabanBenar: "A"
    },
    {
      id: "pg7",
      pertanyaan: "Jika sebuah gambar gagal dimuat akibat koneksi internet terputus, elemen apa yang akan ditampilkan di layar jika kode ditulis sebagai: <img src='logo.png' alt='Logo SMKN X' width='100'>?",
      pilihan: [
        { key: "A", teks: "Layar kosong (blank) karena seluruh halaman gagal dirender oleh browser." },
        { key: "B", teks: "Kotak kosong berukuran 100px yang menampilkan teks alternatif 'Logo SMKN X'." },
        { key: "C", teks: "Browser akan mengunduh gambar pengganti secara otomatis dari repositori Google Images." },
        { key: "D", teks: "Ikon tanda tanya besar berwarna merah di pojok kiri atas halaman." }
      ],
      jawabanBenar: "B"
    },
    {
      id: "pg8",
      pertanyaan: "Seorang developer ingin membuat formulir di mana pengguna wajib mengisi alamat email mereka dengan format yang valid sebelum data dikirimkan. Kombinasi tipe input dan atribut HTML5 apa yang paling tepat?",
      pilihan: [
        { key: "A", teks: "<input type='text' name='email' validation='true'>" },
        { key: "B", teks: "<input type='mail' required>" },
        { key: "C", teks: "<input type='email' required>" },
        { key: "D", teks: "<input type='text' format='email'>" }
      ],
      jawabanBenar: "C"
    },
    {
      id: "pg9",
      pertanyaan: "Mengapa disarankan untuk meletakkan tag <link rel='stylesheet'> di dalam blok <head> sedangkan tag <script> JavaScript sering kali diletakkan di akhir sebelum penutup </body>?",
      pilihan: [
        { key: "A", teks: "Supaya dokumen CSS dibaca pertama kali agar tampilan tidak berantakan (FOUC), sedangkan JS diletakkan di bawah agar tidak menghalangi proses parsing HTML (render-blocking)." },
        { key: "B", teks: "Karena tag <link> tidak akan berfungsi jika diletakkan di luar blok <head>." },
        { key: "C", teks: "Supaya file HTML memenuhi standar validasi W3C yang melarang JS berada di area head." },
        { key: "D", teks: "JavaScript yang diletakkan di dalam head secara otomatis akan dinonaktifkan oleh browser." }
      ],
      jawabanBenar: "A"
    },
    {
      id: "pg10",
      pertanyaan: "Terdapat kode HTML berikut:\n<iframe src='video.mp4' width='500' height='300'> Browser Anda tidak mendukung iframe </iframe>\nApa fungsi dari teks 'Browser Anda tidak mendukung iframe' di dalam tag tersebut?",
      pilihan: [
        { key: "A", teks: "Menjadi judul (tooltip) video ketika kursor diarahkan ke area iframe." },
        { key: "B", teks: "Pesan fallback yang hanya akan muncul jika browser pengguna tidak mendukung teknologi iframe." },
        { key: "C", teks: "Keterangan wajib yang digunakan oleh crawler mesin pencari untuk mengindeks file video." },
        { key: "D", teks: "Perintah text-to-speech yang akan dibacakan oleh browser secara otomatis." }
      ],
      jawabanBenar: "B"
    }
  ],
  esai: [
    {
      id: "essay1",
      pertanyaan: "Rancanglah sebuah form pendaftaran siswa baru menggunakan kode HTML5. Form ini harus memiliki field: Nama Lengkap (wajib diisi), Email (validasi email, wajib diisi), Password (minimal 8 karakter), Kelas (pilihan dropdown: X RPL A atau X RPL B), dan sebuah Tombol Submit.",
      petunjuk: "Gunakan tag <form>, <input> dengan atribut type & required yang tepat, tag <select>, dan <button>.",
      kunciAnalisis: "Menggunakan tag form, input type='email', input type='password' minlength='8', select dengan option, serta button submit."
    },
    {
      id: "essay2",
      pertanyaan: "Analisislah kode HTML di bawah ini. Temukan minimal 3 kesalahan sintaksis atau ketidakpatuhan semantik, lalu tuliskan kode perbaikan yang benar!\n\n<font size='5'><b>Form Pencarian</font></b>\n<form action='search.php'>\n  <input type='text' id='cari'>\n  <button type='submit'>Cari\n</form>",
      petunjuk: "Uraikan letak kesalahannya (seperti overlapping tag, tag tidak ditutup, atau penggunaan tag usang) dan tuliskan kode bersihnya.",
      kunciAnalisis: "Overlapping <font> dan <b>, tag <button> tidak memiliki penutup, dan tag <font> merupakan tag usang (sebaiknya diganti heading h1-h6 atau div + CSS)."
    },
    {
      id: "essay3",
      pertanyaan: "Rancanglah struktur tabel HTML untuk jadwal pelajaran kelas X RPL. Tabel harus memiliki 3 baris dan 3 kolom. Baris pertama adalah Header (Mata Pelajaran, Kelas, Jam Mulai). Gunakan atribut 'border' bernilai '1' pada tag table untuk visualisasi sederhana.",
      petunjuk: "Gunakan elemen <table>, <tr>, <th> untuk header, dan <td> untuk isi data baris selanjutnya secara terstruktur.",
      kunciAnalisis: "Elemen <table> dengan atribut border, 3 baris <tr>, header <th> pada baris pertama, dan td pada baris kedua dan ketiga."
    },
    {
      id: "essay4",
      pertanyaan: "Jelaskan mengapa atribut 'alt' pada tag <img> sangat krusial dalam Search Engine Optimization (SEO) dan aksesibilitas bagi penyandang disabilitas (tunanetra) yang menggunakan screen reader!",
      petunjuk: "Hubungkan penjelasan Anda dengan cara kerja bot mesin pencari Google dan teknologi pembaca layar.",
      kunciAnalisis: "Alt text dibaca oleh screen reader untuk menjelaskan konten gambar pada tunanetra, dan digunakan bot mesin pencari untuk mengindeks serta memahami konteks gambar yang tidak bisa dilihat secara visual oleh algoritma."
    },
    {
      id: "essay5",
      pertanyaan: "Buatlah struktur dasar dokumen HTML5 yang valid secara standar W3C dari awal hingga akhir, lengkap dengan deklarasi tipe dokumen, penentuan bahasa indonesia, dan tag meta penyesuai layar ponsel (viewport responsive)!",
      petunjuk: "Tuliskan seluruh tag wajib mulai dari <!DOCTYPE html> hingga tag penutup </html> secara berurutan dan terstruktur.",
      kunciAnalisis: "Mengandung <!DOCTYPE html>, <html lang='id'>, <head> dengan <meta charset='UTF-8'> and <meta name='viewport' content='...'>, <title>, serta blok <body>."
    }
  ]
};

// Data Simulasi Awal (Daftar Hadir & Skor)
const DATA_AWAL_SISWA = [
  {
    id: "sis-1",
    nama: "Aditya Pratama",
    kelas: "X RPL A",
    absen: "01",
    skorPG: 80,
    skorEssay: 86,
    skorTotal: 83,
    status: "Selesai",
    waktuMulai: "02 Jun 2026, 08:00",
    jawabanPG: { pg1: "B", pg2: "A", pg3: "C", pg4: "A", pg5: "C", pg6: "A", pg7: "B", pg8: "C", pg9: "B", pg10: "B" }, 
    jawabanEssay: {
      essay1: "<form action='/submit'>\n  <input type='text' required placeholder='Nama'>\n  <input type='email' required placeholder='Email'>\n  <input type='password' minlength='8' required>\n  <select>\n    <option>X RPL A</option>\n    <option>X RPL B</option>\n  </select>\n  <button type='submit'>Daftar</button>\n</form>",
      essay2: "1. Overlapping tag <font> dan <b>\n2. Tag <button> tidak ditutup </button>\n3. Penggunaan tag <font> yang sudah usang di HTML5.\n\nPerbaikan:\n<h3><b>Form Pencarian</b></h3>\n<form action='search.php'>\n  <input type='text' id='cari'>\n  <button type='submit'>Cari</button>\n</form>",
      essay3: "<table border='1'>\n  <tr>\n    <th>Mata Pelajaran</th>\n    <th>Kelas</th>\n    <th>Jam Mulai</th>\n  </tr>\n  <tr>\n    <td>HTML Dasar</td>\n    <td>X RPL A</td>\n    <td>08:00</td>\n  </tr>\n  <tr>\n    <td>Algoritma</td>\n    <td>X RPL B</td>\n    <td>10:00</td>\n  </tr>\n</table>",
      essay4: "Atribut alt membantu Google mengindeks gambar berdasarkan kata kunci teks karena bot Google tidak bisa melihat gambar secara langsung. Bagi tunanetra, screen reader akan membacakan isi atribut alt ini sehingga mereka tahu gambar apa yang disajikan.",
      essay5: "<!DOCTYPE html>\n<html lang='id'>\n<head>\n  <meta charset='UTF-8'>\n  <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n  <title>Tugas HTML5</title>\n</head>\n<body>\n  <h1>Halo Dunia</h1>\n</body>\n</html>"
    },
    analisisAI: {
      essay1: { skor: 95, umpanBalik: "Sangat bagus! Semua field pendaftaran dibuat dengan tag yang sesuai, lengkap dengan batasan minlength dan validasi tipe input." },
      essay2: { skor: 90, umpanBalik: "Luar biasa. Berhasil mengidentifikasi tiga kesalahan utama dan memberikan struktur perbaikan semantik yang bersih." },
      essay3: { skor: 95, umpanBalik: "Tabel terstruktur dengan rapi. Atribut border, header <th>, serta data td diposisikan pada baris tr yang tepat." },
      essay4: { skor: 80, umpanBalik: "Penjelasan tepat sasaran. Hubungan antara indeksation search engine dan teknologi asistif digambarkan dengan baik." },
      essay5: { skor: 100, umpanBalik: "Sempurna. Struktur dasar standar W3C ditulis lengkap tanpa ada satu pun tag penutup yang tertinggal." }
    }
  },
  {
    id: "sis-2",
    nama: "Siti Rahmawati",
    kelas: "X RPL B",
    absen: "24",
    skorPG: 90,
    skorEssay: 92,
    skorTotal: 91,
    status: "Selesai",
    waktuMulai: "02 Jun 2026, 08:15",
    jawabanPG: { pg1: "B", pg2: "A", pg3: "C", pg4: "B", pg5: "C", pg6: "A", pg7: "B", pg8: "C", pg9: "A", pg10: "C" },
    jawabanEssay: {
      essay1: "<form>\n  <input type='text' required>\n  <input type='email' required>\n  <input type='password'>\n  <select><option>X RPL B</option></select>\n  <button>Kirim</button>\n</form>",
      essay2: "Tag button tidak ditutup, font itu tag usang, b dan font berantakan urutannya.",
      essay3: "<table border='1'>\n  <tr><th>Mapel</th><th>Kelas</th><th>Mulai</th></tr>\n  <tr><td>PBO</td><td>X RPL B</td><td>07:30</td></tr>\n  <tr><td>Basis Data</td><td>X RPL B</td><td>09:00</td></tr>\n</table>",
      essay4: "Supaya kalau gambarnya gak muncul, pembaca layar tunanetra bisa membacakan deskripsinya. Dan membantu SEO Google.",
      essay5: "<!DOCTYPE html>\n<html>\n<head>\n<title>Judul</title>\n</head>\n<body></body>\n</html>"
    },
    analisisAI: {
      essay1: { skor: 80, umpanBalik: "Bagus, namun atribut minlength='8' pada password belum diterapkan sesuai spesifikasi soal." },
      essay2: { skor: 85, umpanBalik: "Identifikasi masalah sudah lengkap, namun Anda tidak melampirkan baris kode perbaikan yang bersih secara menyeluruh." },
      essay3: { skor: 100, umpanBalik: "Sempurna! Tabel sesuai instruksi 3 baris dan 3 kolom lengkap dengan atribut border." },
      essay4: { skor: 95, umpanBalik: "Sangat baik. Penjelasan ringkas namun mencakup kedua aspek penting yaitu aksesibilitas dan bot penjelajah Google." },
      essay5: { skor: 75, umpanBalik: "Struktur dasar benar, tetapi Anda melewatkan tag meta viewport responsive and atribut penentuan bahasa (lang) yang diminta pada deskripsi soal." }
    }
  }
];

// Logo SMKN Kasomalang (SVG Component)
const LogoSMK = ({ className = "h-12 w-12" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="#1e293b" stroke="#38bdf8" strokeWidth="4" />
    <path d="M50 15 L80 35 L80 65 L50 85 L20 65 L20 35 Z" fill="#0369a1" stroke="#38bdf8" strokeWidth="3" />
    <path d="M50 25 L70 38 L70 62 L50 75 L30 62 L30 38 Z" fill="#0284c7" />
    {/* Huruf R P L */}
    <text x="50" y="47" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold" fontFamily="monospace">SMK</text>
    <text x="50" y="63" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace">RPL</text>
    <path d="M45 70 H55" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export default function App() {
  const [role, setRole] = useState(null); // 'admin' | 'siswa' | 'admin-auth' | null
  const [passwordInput, setPasswordInput] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Identitas Siswa saat Login
  const [siswaData, setSiswaData] = useState({ nama: '', kelas: 'X RPL A', absen: '' });
  const [currentSiswa, setCurrentSiswa] = useState(null);
  
  // Database State di Memori (Daftar Hadir & Skor)
  const [daftarUjianSiswa, setDaftarUjianSiswa] = useState(DATA_AWAL_SISWA);
  
  // State Ujian Siswa Berjalan
  const [examActive, setExamActive] = useState(false);
  const [jawabanSiswaPG, setJawabanSiswaPG] = useState({});
  const [jawabanSiswaEssay, setJawabanSiswaEssay] = useState({
    essay1: '', essay2: '', essay3: '', essay4: '', essay5: ''
  });
  const [waktuMulaiSiswa, setWaktuMulaiSiswa] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState("");
  
  // Fitur Anti-Cheat & Jumpscare
  const [showJumpscare, setShowJumpscare] = useState(false);
  const [cheatAttempts, setCheatAttempts] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef(null);

  // Fitur Mini Game "HTML Bug Smasher" (Penyegar Otak)
  const [showGame, setShowGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [fallingItems, setFallingItems] = useState([]);
  const gameAreaRef = useRef(null);
  const gameIntervalRef = useRef(null);
  const [hasPlayedGame, setHasPlayedGame] = useState(false);

  // State Panel Admin
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard', 'soal'
  const [selectedDetailSiswa, setSelectedDetailSiswa] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterKelas, setFilterKelas] = useState('Semua');

  // State Modal Edit Siswa (CRUD)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [siswaToEdit, setSiswaToEdit] = useState(null);

  // State Modal Tambah Siswa Manual (CRUD)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSiswaData, setNewSiswaData] = useState({
    nama: '',
    kelas: 'X RPL A',
    absen: '',
    skorPG: 0,
    skorEssay: 0,
    status: 'Selesai',
    waktuMulai: 'Input Manual'
  });

  const apiKey = ""; // Kunci API dikosongkan sesuai instruksi lingkungan Canvas

  // Inisialisasi Deteksi Tab Berpindah (Anti-Cheat)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && examActive) {
        setCheatAttempts(prev => {
          const next = prev + 1;
          setShowJumpscare(true);
          playSpookySound();
          return next;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [examActive]);

  // Synthesizer Audio untuk Efek Jumpscare Menakutkan
  const playSpookySound = () => {
    if (isMuted) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      // Ledakan Bas Rendah Mendengung
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, ctx.currentTime); // A2 Note
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 2.5);
      
      gain.gain.setValueAtTime(1.0, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3.0);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 3.0);

      // Jeritan Frekuensi Tinggi Melengking
      const screamOsc = ctx.createOscillator();
      const screamGain = ctx.createGain();
      screamOsc.type = 'triangle';
      screamOsc.frequency.setValueAtTime(800, ctx.currentTime);
      screamOsc.frequency.linearRampToValueAtTime(1600, ctx.currentTime + 0.5);
      screamOsc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 2.0);

      screamGain.gain.setValueAtTime(0.6, ctx.currentTime);
      screamGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.2);

      screamOsc.connect(screamGain);
      screamGain.connect(ctx.destination);
      screamOsc.start();
      screamOsc.stop(ctx.currentTime + 2.2);
    } catch (e) {
      console.warn("Gagal memainkan efek suara", e);
    }
  };

  // Sound Effect untuk Game (Beep saat hit/miss)
  const playBeep = (freq, duration, type = 'sine') => {
    if (isMuted) return;
    try {
      const ctx = audioContextRef.current || new (window.AudioContext || window.webkitAudioContext)();
      if (!audioContextRef.current) audioContextRef.current = ctx;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch(e){}
  };

  // MINI GAME LOGIC: HTML BUG SMASHER
  const startRefreshGame = () => {
    setShowGame(true);
    setGameScore(0);
    setGameActive(true);
    setFallingItems([]);
  };

  useEffect(() => {
    if (gameActive) {
      gameIntervalRef.current = setInterval(() => {
        // Spawn item baru
        const itemsToSpawn = [
          { label: '<font>', isBug: true, color: 'bg-red-500 text-white' },
          { label: '<marquee>', isBug: true, color: 'bg-red-600 text-white' },
          { label: '<center>', isBug: true, color: 'bg-rose-500 text-white' },
          { label: '<b> overlapping', isBug: true, color: 'bg-orange-500 text-white' },
          { label: '<article>', isBug: false, color: 'bg-emerald-500 text-white' },
          { label: '<section>', isBug: false, color: 'bg-teal-500 text-white' },
          { label: '<main>', isBug: false, color: 'bg-cyan-500 text-white' },
          { label: '<header>', isBug: false, color: 'bg-blue-500 text-white' }
        ];
        
        const randomItem = itemsToSpawn[Math.floor(Math.random() * itemsToSpawn.length)];
        const newItem = {
          id: Math.random(),
          x: Math.random() * 85, // Persentase posisi kiri
          y: -10, // Di luar area atas
          speed: 1.8 + Math.random() * 2,
          ...randomItem
        };
        
        setFallingItems(prev => [...prev, newItem]);
      }, 700);

      // Loop Animasi Falling
      const animationTimer = setInterval(() => {
        setFallingItems(prev => {
          return prev
            .map(item => ({ ...item, y: item.y + item.speed }))
            .filter(item => {
              if (item.y > 100) {
                // Jika lolos tanpa diklik dan itu adalah Bug, tidak masalah.
                // Jika itu tag bersih lolos, tidak pinalti.
                return false;
              }
              return true;
            });
        });
      }, 30);

      // Waktu game berakhir (30 detik)
      const gameTimer = setTimeout(() => {
        setGameActive(false);
        setHasPlayedGame(true);
        clearInterval(gameIntervalRef.current);
        clearInterval(animationTimer);
      }, 20000);

      return () => {
        clearInterval(gameIntervalRef.current);
        clearInterval(animationTimer);
        clearTimeout(gameTimer);
      };
    }
  }, [gameActive]);

  const handleItemClick = (clickedItem) => {
    if (!gameActive) return;
    
    if (clickedItem.isBug) {
      setGameScore(prev => prev + 10);
      playBeep(600, 0.15, 'triangle');
    } else {
      setGameScore(prev => Math.max(0, prev - 5));
      playBeep(220, 0.25, 'sawtooth');
    }
    
    setFallingItems(prev => prev.filter(item => item.id !== clickedItem.id));
  };

  // Penilaian Menggunakan AI Gemini 2.5 Flash
  const analisisJawabanDenganAI = async (essayAnswers) => {
    setLoadingAI(true);
    setAiError("");
    
    const callGeminiWithBackoff = async (payload, retries = 5, delay = 1000) => {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (response.ok) return await response.json();
        } catch (e) {}
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
      throw new Error("Koneksi AI Sibuk. Menggunakan penilaian algoritma cadangan SMKN Kasomalang.");
    };

    const systemPrompt = `Anda adalah Asisten Guru Produktif RPL di SMKN Kasomalang yang bertugas memberikan penilaian esai ujian HTML HOTS secara obyektif (skor 0-100) dan umpan balik analitis edukatif dalam format JSON.
Format JSON respon wajib:
{
  "essay1": { "skor": <0-100>, "umpanBalik": "string" },
  "essay2": { "skor": <0-100>, "umpanBalik": "string" },
  "essay3": { "skor": <0-100>, "umpanBalik": "string" },
  "essay4": { "skor": <0-100>, "umpanBalik": "string" },
  "essay5": { "skor": <0-100>, "umpanBalik": "string" }
}

Kriteria Penilaian:
- Essay 1 (Form): Validasi email, minlength password, dropdown kelas, struktur <form>.
- Essay 2 (Analisis Bug): Identifikasi overlapping tag, tag button tidak ditutup, & penggunaan tag <font> usang. Tulis perbaikan bersih.
- Essay 3 (Tabel 3x3): Elemen table border='1', header th, isi baris td terstruktur.
- Essay 4 (Alt Text): Relevansi screen reader disabilitas & indeks perayap SEO mesin pencari.
- Essay 5 (Dokumen Dasar): DOCTYPE, html lang='id', charset, meta viewport, title, dan body.`;

    const userQuery = `Nilai lembar jawaban esai berikut ini:
Esai 1: "${essayAnswers.essay1}"
Esai 2: "${essayAnswers.essay2}"
Esai 3: "${essayAnswers.essay3}"
Esai 4: "${essayAnswers.essay4}"
Esai 5: "${essayAnswers.essay5}"`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            essay1: { type: "OBJECT", properties: { skor: { type: "INTEGER" }, umpanBalik: { type: "STRING" } }, required: ["skor", "umpanBalik"] },
            essay2: { type: "OBJECT", properties: { skor: { type: "INTEGER" }, umpanBalik: { type: "STRING" } }, required: ["skor", "umpanBalik"] },
            essay3: { type: "OBJECT", properties: { skor: { type: "INTEGER" }, umpanBalik: { type: "STRING" } }, required: ["skor", "umpanBalik"] },
            essay4: { type: "OBJECT", properties: { skor: { type: "INTEGER" }, umpanBalik: { type: "STRING" } }, required: ["skor", "umpanBalik"] },
            essay5: { type: "OBJECT", properties: { skor: { type: "INTEGER" }, umpanBalik: { type: "STRING" } }, required: ["skor", "umpanBalik"] }
          },
          required: ["essay1", "essay2", "essay3", "essay4", "essay5"]
        }
      }
    };

    try {
      const data = await callGeminiWithBackoff(payload);
      const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (textResult) {
        return JSON.parse(textResult);
      }
    } catch (error) {
      console.error(error);
      return fallbackPenilaianLokal(essayAnswers);
    }
  };

  // Penilaian Cadangan Regex Lokal
  const fallbackPenilaianLokal = (essayAnswers) => {
    let result = {};
    for (let i = 1; i <= 5; i++) {
      const key = `essay${i}`;
      const ans = (essayAnswers[key] || "").toLowerCase();
      let skor = 35;
      let fb = "Sistem Offline - Penilaian otomatis lokal SMKN Kasomalang.";

      if (ans.trim().length > 10) {
        skor = 70;
        if (i === 1 && ans.includes("form") && ans.includes("email")) skor = 85;
        if (i === 2 && (ans.includes("button") || ans.includes("font"))) skor = 80;
        if (i === 3 && ans.includes("table") && ans.includes("tr")) skor = 90;
        if (i === 4 && (ans.includes("reader") || ans.includes("seo"))) skor = 85;
        if (i === 5 && ans.includes("doctype") && ans.includes("viewport")) skor = 95;
        fb = `Koreksi Lokal: Menemukan kecocokan indikator wajib pada esai ${i}.`;
      } else if (ans.trim().length === 0) {
        skor = 0;
        fb = "Jawaban kosong. Siswa tidak mengisi respon apapun.";
      }
      result[key] = { skor, umpanBalik: fb };
    }
    return result;
  };

  // Autentikasi Admin dengan Password "Tajama21"
  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (passwordInput === 'Tajama21') {
      setIsAdminAuthenticated(true);
      setRole('admin');
      setAdminTab('dashboard');
      setAuthError('');
    } else {
      setAuthError('Kata sandi admin salah! Otoritas ditolak.');
    }
  };

  // Hapus Siswa (CRUD)
  const handleDeleteSiswa = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus siswa ini dari daftar hadir?")) {
      setDaftarUjianSiswa(prev => prev.filter(s => s.id !== id));
      if (selectedDetailSiswa && selectedDetailSiswa.id === id) {
        setSelectedDetailSiswa(null);
      }
    }
  };

  // Mulai Proses Edit Siswa (CRUD)
  const handleStartEditSiswa = (siswa) => {
    setSiswaToEdit({ ...siswa });
    setIsEditModalOpen(true);
  };

  // Simpan Perubahan Siswa (CRUD)
  const handleSaveEditSiswa = (e) => {
    e.preventDefault();
    const total = Math.round((Number(siswaToEdit.skorPG) + Number(siswaToEdit.skorEssay)) / 2);
    const updated = {
      ...siswaToEdit,
      skorPG: Number(siswaToEdit.skorPG),
      skorEssay: Number(siswaToEdit.skorEssay),
      skorTotal: total
    };

    setDaftarUjianSiswa(prev => prev.map(s => s.id === updated.id ? updated : s));
    setIsEditModalOpen(false);
    setSiswaToEdit(null);
    if (selectedDetailSiswa && selectedDetailSiswa.id === updated.id) {
      setSelectedDetailSiswa(updated);
    }
  };

  // Tambah Siswa Baru secara Manual (CRUD)
  const handleAddSiswaManual = (e) => {
    e.preventDefault();
    const total = Math.round((Number(newSiswaData.skorPG) + Number(newSiswaData.skorEssay)) / 2);
    const docId = "sis-" + Date.now();
    const newStudent = {
      ...newSiswaData,
      id: docId,
      skorPG: Number(newSiswaData.skorPG),
      skorEssay: Number(newSiswaData.skorEssay),
      skorTotal: total,
      jawabanPG: {},
      jawabanEssay: {
        essay1: "Manual Input",
        essay2: "Manual Input",
        essay3: "Manual Input",
        essay4: "Manual Input",
        essay5: "Manual Input"
      },
      analisisAI: {
        essay1: { skor: Number(newSiswaData.skorEssay), umpanBalik: "Diinput secara manual oleh Admin." },
        essay2: { skor: Number(newSiswaData.skorEssay), umpanBalik: "Diinput secara manual oleh Admin." },
        essay3: { skor: Number(newSiswaData.skorEssay), umpanBalik: "Diinput secara manual oleh Admin." },
        essay4: { skor: Number(newSiswaData.skorEssay), umpanBalik: "Diinput secara manual oleh Admin." },
        essay5: { skor: Number(newSiswaData.skorEssay), umpanBalik: "Diinput secara manual oleh Admin." }
      }
    };

    setDaftarUjianSiswa(prev => [newStudent, ...prev]);
    setIsAddModalOpen(false);
    setNewSiswaData({
      nama: '',
      kelas: 'X RPL A',
      absen: '',
      skorPG: 0,
      skorEssay: 0,
      status: 'Selesai',
      waktuMulai: 'Manual Input'
    });
  };

  // Mulai Ujian untuk Siswa
  const handleSiswaLogin = (e) => {
    e.preventDefault();
    if (!siswaData.nama.trim() || !siswaData.absen.trim()) {
      alert("Mohon isi Nama Lengkap dan No Absen Anda!");
      return;
    }
    setCurrentSiswa({
      ...siswaData,
      id: "sis-" + Date.now(),
      status: "Mengerjakan",
    });
    setWaktuMulaiSiswa(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    setExamActive(true);
    setCheatAttempts(0);
    setHasPlayedGame(false);
  };

  // Submit Lembar Jawaban Siswa
  const handleSelesaiUjian = async () => {
    setLoadingAI(true);
    
    // Koreksi PG (10 Soal)
    let benarPG = 0;
    SOAL_EXAM.pilihanGanda.forEach((soal) => {
      if (jawabanSiswaPG[soal.id] === soal.jawabanBenar) {
        benarPG++;
      }
    });
    const skorPG = (benarPG / SOAL_EXAM.pilihanGanda.length) * 100;

    // Evaluasi Essay Menggunakan AI (5 Soal)
    let hasilAI = null;
    try {
      hasilAI = await analisisJawabanDenganAI(jawabanSiswaEssay);
    } catch (err) {
      setAiError("Gagal menghubungi AI untuk evaluasi lengkap. Penilaian lokal cadangan diterapkan.");
      hasilAI = fallbackPenilaianLokal(jawabanSiswaEssay);
    }

    // Skor Rata-rata Esai
    const totalSkorEsai = Object.values(hasilAI).reduce((acc, curr) => acc + curr.skor, 0);
    const skorEssayRata = Math.round(totalSkorEsai / 5);
    
    // Tambahkan Bonus Game jika ada (Maksimum bonus +5 poin)
    const bonusPoin = Math.min(5, Math.floor(gameScore / 40));
    const skorTotal = Math.min(100, Math.round((skorPG + skorEssayRata) / 2) + bonusPoin);

    const dataHasilSiswa = {
      id: currentSiswa.id,
      nama: currentSiswa.nama,
      kelas: currentSiswa.kelas,
      absen: currentSiswa.absen,
      skorPG: skorPG,
      skorEssay: skorEssayRata,
      skorTotal: skorTotal,
      bonusGame: bonusPoin,
      cheatAttempts: cheatAttempts,
      status: "Selesai",
      waktuMulai: `${new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}, ${waktuMulaiSiswa}`,
      jawabanPG: jawabanSiswaPG,
      jawabanEssay: jawabanSiswaEssay,
      analisisAI: hasilAI
    };

    setDaftarUjianSiswa(prev => [dataHasilSiswa, ...prev]);
    setCurrentSiswa(dataHasilSiswa);
    setExamActive(false);
    setLoadingAI(false);
  };

  // Logout Siswa
  const handleKeluarSiswa = () => {
    setRole(null);
    setCurrentSiswa(null);
    setSiswaData({ nama: '', kelas: 'X RPL A', absen: '' });
    setJawabanSiswaPG({});
    setJawabanSiswaEssay({
      essay1: '', essay2: '', essay3: '', essay4: '', essay5: ''
    });
    setGameScore(0);
  };

  // Logout Admin
  const handleLogoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setRole(null);
    setPasswordInput('');
  };

  const filteredSiswa = daftarUjianSiswa.filter(s => {
    const cocokNama = s.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const cocokKelas = filterKelas === 'Semua' || s.kelas === filterKelas;
    return cocokNama && cocokKelas;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col relative overflow-x-hidden">
      
      {/* ================= JUMPSCARE SCREEN OVERLAY ================= */}
      {showJumpscare && (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center p-4 select-none">
          {/* Efek Getar dan Strobo Merah */}
          <div className="absolute inset-0 bg-red-950/40 mix-blend-color-burn animate-pulse pointer-events-none" />
          
          {/* Monster Bug SVG yang Menyeramkan */}
          <div className="animate-bounce text-red-600 mb-6 scale-125 sm:scale-150">
            <svg viewBox="0 0 100 100" className="h-44 w-44 filter drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">
              <path d="M50 15 L35 40 H65 Z" fill="#991b1b" />
              <circle cx="42" cy="35" r="5" fill="#f87171" className="animate-ping" />
              <circle cx="58" cy="35" r="5" fill="#f87171" className="animate-ping" />
              {/* Kaki-kaki Monster */}
              <path d="M20 45 Q 35 48 50 45 Q 65 48 80 45" stroke="#ef4444" strokeWidth="4" fill="none" />
              <path d="M15 60 Q 35 58 50 60 Q 65 58 85 60" stroke="#ef4444" strokeWidth="4" fill="none" />
              <path d="M20 75 Q 35 68 50 75 Q 65 68 80 75" stroke="#ef4444" strokeWidth="4" fill="none" />
              {/* Badan Utama */}
              <ellipse cx="50" cy="55" rx="22" ry="25" fill="#7f1d1d" stroke="#ef4444" strokeWidth="3" />
              {/* Mata Bersinar */}
              <circle cx="43" cy="50" r="4" fill="#ffffff" />
              <circle cx="57" cy="50" r="4" fill="#ffffff" />
              {/* Mulut Taring */}
              <path d="M38 65 Q 50 78 62 65 L 56 65 L 50 70 L 44 65 Z" fill="#ffffff" />
            </svg>
          </div>

          <div className="text-center space-y-4 max-w-xl z-10 px-4">
            <h1 className="text-4xl sm:text-5xl font-black text-red-500 tracking-wider animate-pulse drop-shadow-md">
              MENDETEKSI KECURANGAN!
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-red-400">
              Awas {currentSiswa?.nama || 'Siswa'} ketahuan, jangan macam-macam ,saya tandain ya ! 
            </p>
            <div className="bg-red-950/60 border border-red-500/50 p-3 rounded-xl text-xs sm:text-sm text-red-300 leading-relaxed font-mono">
              Sistem SMKN Kasomalang mencatat aktivitas meninggalkan layar ujian. "Hantu Bug Syntax" ini akan otomatis mengurangi poin orisinalitas pengerjaan Anda jika terulang kembali!
            </div>
            
            <button 
              onClick={() => setShowJumpscare(false)}
              className="mt-6 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold px-8 py-3 rounded-xl shadow-lg border border-red-400 transition animate-pulse"
            >
              SAYA SETUJU & BERJANJI JUJUR (OK) 👍
            </button>
            
            <p className="text-xs text-slate-400 italic mt-2">Kecurangan tercatat: {cheatAttempts} kali.</p>
          </div>
        </div>
      )}

      {/* Header Utama */}
      <header className="bg-slate-950/80 backdrop-blur-md text-white shadow-xl py-4 px-6 sticky top-0 z-40 border-b border-sky-900/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <LogoSMK className="h-12 w-12 hover:rotate-12 transition-transform duration-300" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-sky-400">CBT SMKN Kasomalang</h1>
              <p className="text-xs text-slate-400 font-mono">Kompetensi Keahlian Rekayasa Perangkat Lunak (RPL)</p>
            </div>
          </div>

          {/* Pengatur Suara */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono transition text-slate-300"
            >
              {isMuted ? "🔈 Aktifkan Suara" : "🔊 Matikan Suara"}
            </button>

            {role === 'siswa' && currentSiswa && (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold">{currentSiswa.nama}</p>
                  <p className="text-xs text-sky-400">{currentSiswa.kelas} • No. Absen {currentSiswa.absen}</p>
                </div>
                {!examActive && (
                  <button 
                    onClick={handleKeluarSiswa}
                    className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 transition px-3 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Keluar
                  </button>
                )}
              </div>
            )}

            {role === 'admin' && (
              <div className="flex items-center gap-3">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Admin SMKNK
                </span>
                <button 
                  onClick={handleLogoutAdmin}
                  className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition text-slate-300"
                >
                  <LogOut className="h-3.5 w-3.5" /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 z-10">
        
        {/* ================= SELEKSI ROLE AWAL ================= */}
        {!role && (
          <div className="max-w-4xl mx-auto py-12">
            <div className="text-center mb-12 space-y-3">
              <div className="flex justify-center mb-3">
                <LogoSMK className="h-24 w-24 animate-pulse" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">CBT HTML &bull; RPL SMKN KASOMALANG</h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Platform Evaluasi Teori dan Praktek Kode HTML5 Berstandar HOTS. Dilengkapi dengan deteksi kecurangan dan penilaian esai cerdas berbasis teknologi AI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
              {/* Card Siswa */}
              <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="bg-sky-500/10 text-sky-400 p-4 rounded-xl inline-block mb-6 border border-sky-500/20">
                    <User className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Login Peserta Ujian</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Mulai pengerjaan evaluasi HTML Kelas X RPL A/B. Pastikan Anda jujur, karena sistem akan mendeteksi perpindahan tab browser dengan memunculkan Bug Monster!
                  </p>
                </div>
                <button
                  onClick={() => setRole('siswa')}
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-sky-900/30"
                >
                  Masuk sebagai Siswa <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Card Admin */}
              <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="bg-indigo-500/10 text-indigo-400 p-4 rounded-xl inline-block mb-6 border border-indigo-500/20">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Dashboard Guru / Admin</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Akses kontrol penuh untuk melihat daftar hadir real-time, menguji soal, mengedit skor siswa secara luring (CRUD), serta melihat hasil ulasan detil dari AI.
                  </p>
                </div>
                <button
                  onClick={() => setRole('admin-auth')}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-indigo-900/30"
                >
                  Masuk Ruang Guru <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= OTENTIKASI ADMIN GURU ================= */}
        {role === 'admin-auth' && (
          <div className="max-w-md mx-auto py-12">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="text-center">
                <div className="bg-indigo-500/10 p-3 rounded-full inline-block text-indigo-400 mb-2">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Sistem Keamanan Guru</h3>
                <p className="text-xs text-slate-400 mt-1">Gunakan sandi keamanan admin SMKN Kasomalang</p>
              </div>

              <form onSubmit={handleAdminAuth} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Kata Sandi</label>
                  <input
                    type="password"
                    placeholder="Masukkan sandi..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl py-3 px-4 outline-none text-sm text-white transition font-mono"
                  />
                  {authError && (
                    <p className="text-xs text-red-400 font-medium mt-2 flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" /> {authError}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRole(null)}
                    className="w-1/3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs py-3 rounded-xl transition"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 rounded-xl transition"
                  >
                    Buka Panel Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= ALUR SISWA ================= */}
        {role === 'siswa' && (
          <div className="max-w-3xl mx-auto">
            {/* Form Registrasi / Login */}
            {!currentSiswa && !examActive && (
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 md:p-8 shadow-2xl space-y-6">
                <div className="text-center space-y-2 pb-4 border-b border-slate-700">
                  <LogoSMK className="h-16 w-16 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Pendaftaran Pengujian HTML5</h3>
                  <p className="text-xs text-slate-400">Silakan isi form sesuai identitas asli kelas X RPL</p>
                </div>

                <form onSubmit={handleSiswaLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Nama Lengkap Siswa</label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap Anda..."
                      value={siswaData.nama}
                      onChange={(e) => setSiswaData({ ...siswaData, nama: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-sky-500 rounded-xl py-3 px-4 outline-none text-white transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Pilih Kelas</label>
                      <select
                        value={siswaData.kelas}
                        onChange={(e) => setSiswaData({ ...siswaData, kelas: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-sky-500 rounded-xl py-3 px-4 outline-none text-white transition"
                      >
                        <option value="X RPL A">X RPL A (SMKN Kasomalang)</option>
                        <option value="X RPL B">X RPL B (SMKN Kasomalang)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Nomor Absen</label>
                      <input
                        type="number"
                        required
                        min="1"
                        max="45"
                        placeholder="Contoh: 12"
                        value={siswaData.absen}
                        onChange={(e) => setSiswaData({ ...siswaData, absen: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-sky-500 rounded-xl py-3 px-4 outline-none text-white transition"
                      />
                    </div>
                  </div>

                  <div className="bg-amber-950/40 rounded-xl p-4 border border-amber-500/20 flex items-start gap-3 mt-4 text-xs text-amber-200 leading-relaxed">
                    <ShieldAlert className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <div>
                      <p className="font-bold mb-1">Pemberitahuan Proteksi Ujian:</p>
                      <p>Membuka tab browser baru, mencari bantuan dari situs lain, atau meminimalkan layar akan memicu **"Syntax Bug Jumpscare"**. Jaga integritas dan kejujuran Anda!</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setRole(null)}
                      className="w-1/3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-3 px-4 rounded-xl transition"
                    >
                      Kembali
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2"
                    >
                      Mulai Ujian <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* LEMBAR KERJA SISWA */}
            {examActive && currentSiswa && (
              <div className="space-y-6">
                
                {/* Status Bar */}
                <div className="bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl flex flex-wrap justify-between items-center gap-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-emerald-400 animate-pulse" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Waktu Mulai</p>
                      <p className="text-xs font-bold text-slate-300">Pengerjaan dimulai sejak {waktuMulaiSiswa} WIB</p>
                    </div>
                  </div>
                  
                  {cheatAttempts > 0 && (
                    <div className="bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full text-red-400 text-xs font-mono flex items-center gap-1.5 animate-pulse">
                      <ShieldX className="h-4 w-4" /> Pelanggaran Layar: {cheatAttempts}
                    </div>
                  )}

                  <span className="text-xs bg-sky-500/10 text-sky-400 border border-sky-500/30 px-3 py-1 rounded-full font-bold">
                    SMKN Kasomalang RPL
                  </span>
                </div>

                {/* --- SEKSI I: PILIHAN GANDA (10 SOAL HOTS) --- */}
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-8">
                  <div className="pb-3 border-b border-slate-700">
                    <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Bagian I: 10 Pilihan Ganda Analisis</span>
                    <h4 className="text-xs text-slate-400 mt-1.5 font-mono">Uji konsep semantik, pemecahan masalah (troubleshooting), dan render-rendering browser.</h4>
                  </div>

                  {SOAL_EXAM.pilihanGanda.map((soal, index) => (
                    <div key={soal.id} className="space-y-3">
                      <div className="flex gap-2.5 items-start">
                        <span className="bg-slate-900 text-sky-400 font-bold text-sm w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5 border border-slate-800">{index + 1}</span>
                        <div className="flex-1">
                          <pre className="font-semibold text-slate-200 text-[14px] whitespace-pre-wrap leading-relaxed font-sans">{soal.pertanyaan}</pre>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2 pl-9">
                        {soal.pilihan.map((pil) => {
                          const isSelected = jawabanSiswaPG[soal.id] === pil.key;
                          return (
                            <button
                              key={pil.key}
                              type="button"
                              onClick={() => setJawabanSiswaPG({ ...jawabanSiswaPG, [soal.id]: pil.key })}
                              className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center gap-3 ${
                                isSelected 
                                  ? 'bg-sky-500/10 border-sky-500 text-sky-300 font-medium' 
                                  : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300'
                              }`}
                            >
                              <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 ${
                                isSelected ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
                              }`}>
                                {pil.key}
                              </span>
                              <span>{pil.teks}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ================= GURU INTERAKTIF: GAME REFRESH OTAK ================= */}
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-700">
                    <div>
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 w-max">
                        <Gamepad2 className="h-3.5 w-3.5" /> Bonus Game: Smasher HTML Bug!
                      </span>
                      <h4 className="text-xs text-slate-400 mt-1">Gunakan game penyegar otak ini untuk meraih bonus skor (maksimal +5 poin).</h4>
                    </div>
                    
                    {!showGame && !hasPlayedGame && (
                      <button
                        type="button"
                        onClick={startRefreshGame}
                        className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs py-2 px-4 rounded-xl transition flex items-center gap-1"
                      >
                        Mulai Game <Sparkles className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {showGame && (
                    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-4 relative overflow-hidden">
                      <div className="flex justify-between items-center text-xs font-mono text-slate-400 pb-2 border-b border-slate-900">
                        <span>Skor Game: <b className="text-amber-400">{gameScore}</b></span>
                        <span className="text-red-400 animate-pulse font-bold">{gameActive ? "🕹️ GAME BERJALAN..." : "🛑 GAME SELESAI"}</span>
                        <span>Maks Bonus: <b className="text-emerald-400">+5</b></span>
                      </div>

                      {/* Area Bermain */}
                      <div 
                        ref={gameAreaRef}
                        className="h-64 bg-slate-900/40 rounded-xl relative overflow-hidden border border-slate-800 select-none cursor-crosshair"
                      >
                        {gameActive && fallingItems.map(item => (
                          <button
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            style={{ 
                              left: `${item.x}%`, 
                              top: `${item.y}%`, 
                              position: 'absolute' 
                            }}
                            className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold shadow-lg transition-transform active:scale-95 whitespace-nowrap ${item.color} flex items-center gap-1`}
                          >
                            <Flame className={`h-3 w-3 ${item.isBug ? 'text-orange-300' : 'text-emerald-300'}`} />
                            {item.label}
                          </button>
                        ))}

                        {!gameActive && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-center p-4">
                            <Zap className="h-8 w-8 text-amber-500 mb-2 animate-bounce" />
                            <p className="font-bold text-sm text-slate-200">Waktu Habis! Skor Anda: {gameScore}</p>
                            <p className="text-[10px] text-slate-400 mt-1">Anda memperoleh bonus sebanyak <span className="text-emerald-400 font-bold">+{Math.min(5, Math.floor(gameScore / 40))} poin</span> pada skor akhir!</p>
                          </div>
                        )}
                      </div>

                      <div className="text-[10px] text-slate-500 font-mono text-center">
                        💡 CARA BERMAIN: Klik hancurkan tag-tag usang/bermasalah <span className="text-red-400 font-bold">merah</span>. Hindari tag bersih HTML5 <span className="text-emerald-400 font-bold">hijau</span>!
                      </div>
                    </div>
                  )}

                  {hasPlayedGame && !showGame && (
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-xs text-center text-amber-400 font-mono">
                      🎉 Anda telah memainkan Refresh Game! Bonus poin tercatat.
                    </div>
                  )}
                </div>

                {/* --- SEKSI II: ESAI (5 SOAL HOTS) --- */}
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-8">
                  <div className="pb-3 border-b border-slate-700">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Bagian II: 5 Esai Sintaks & Analisis</span>
                    <h4 className="text-xs text-slate-400 mt-1.5 font-mono">Gunakan editor kode gelap terintegrasi untuk menyusun rancangan sintaks HTML5 valid.</h4>
                  </div>

                  {SOAL_EXAM.esai.map((soal, index) => (
                    <div key={soal.id} className="space-y-3">
                      <div className="flex gap-2.5 items-start">
                        <span className="bg-slate-900 text-indigo-400 font-bold text-sm w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5 border border-slate-800">{index + 1}</span>
                        <div>
                          <p className="font-semibold text-slate-200 text-[14px] leading-relaxed">{soal.pertanyaan}</p>
                          <span className="text-[11px] text-indigo-400 font-medium italic mt-1.5 block">Petunjuk: {soal.petunjuk}</span>
                        </div>
                      </div>

                      <div className="pl-9">
                        {[0, 1, 2, 4].includes(index) ? (
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1 font-mono">
                              <Code className="h-3.5 w-3.5 text-indigo-400" /> Editor Kode Gelap HTML
                            </label>
                            <textarea
                              rows={8}
                              placeholder="<!-- Ketik respon tag HTML di sini... -->"
                              value={jawabanSiswaEssay[soal.id] || ''}
                              onChange={(e) => setJawabanSiswaEssay({ ...jawabanSiswaEssay, [soal.id]: e.target.value })}
                              className="w-full font-mono text-xs bg-slate-950 text-emerald-400 p-4 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 leading-relaxed"
                            />
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Kolom Analisis Konseptual</label>
                            <textarea
                              rows={5}
                              placeholder="Tuliskan ulasan konsep Anda secara detil di sini..."
                              value={jawabanSiswaEssay[soal.id] || ''}
                              onChange={(e) => setJawabanSiswaEssay({ ...jawabanSiswaEssay, [soal.id]: e.target.value })}
                              className="w-full text-xs bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl p-4 outline-none text-white transition"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tombol Submit */}
                <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <h5 className="font-bold text-white text-sm">Selesai Meneliti Semua Jawaban?</h5>
                    <p className="text-xs text-slate-500 font-mono">Mengklik selesai akan mentransmisikan lembar jawaban Anda ke server AI.</p>
                  </div>
                  
                  <button
                    onClick={handleSelesaiUjian}
                    disabled={loadingAI}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loadingAI ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" /> Menghubungi Korektor AI...
                      </>
                    ) : (
                      <>
                        Kirim Lembar Jawaban <CheckCircle2 className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* RINGKASAN HASIL SISWA */}
            {!examActive && currentSiswa && currentSiswa.status === "Selesai" && (
              <div className="space-y-6 animate-fade-in">
                
                <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl text-center space-y-6">
                  <div className="inline-flex bg-emerald-500/10 text-emerald-400 p-3.5 rounded-full border border-emerald-500/20">
                    <Award className="h-12 w-12" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-white">Lembar Ujian Berhasil Dinilai!</h3>
                    <p className="text-slate-400 text-xs mt-1">Ujian mandiri berbasis AI di SMKN Kasomalang telah terekam secara orisinal.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-700 max-w-2xl mx-auto font-mono">
                    <div className="text-center p-3 bg-slate-900 rounded-xl">
                      <span className="text-[10px] text-slate-500 font-semibold block uppercase">Skor PG</span>
                      <span className="text-base font-bold text-slate-300">{currentSiswa.skorPG}/100</span>
                    </div>
                    <div className="text-center p-3 bg-slate-900 rounded-xl">
                      <span className="text-[10px] text-slate-500 font-semibold block uppercase">Skor Esai AI</span>
                      <span className="text-base font-bold text-indigo-400">{currentSiswa.skorEssay}/100</span>
                    </div>
                    <div className="text-center p-3 bg-slate-900 rounded-xl">
                      <span className="text-[10px] text-slate-500 font-semibold block uppercase">Bonus Game</span>
                      <span className="text-base font-bold text-amber-400">+{currentSiswa.bonusGame || 0}</span>
                    </div>
                    <div className="text-center p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl">
                      <span className="text-[10px] text-indigo-400 font-semibold block uppercase">Skor Total</span>
                      <span className="text-lg font-black text-indigo-300">{currentSiswa.skorTotal}</span>
                    </div>
                  </div>

                  {currentSiswa.cheatAttempts > 0 && (
                    <div className="bg-red-500/10 text-red-400 text-xs p-3.5 rounded-xl max-w-md mx-auto border border-red-500/20 flex items-center gap-2">
                      <ShieldX className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <p className="text-left font-mono">Terdeteksi: Anda keluar dari area pengerjaan sebanyak <b>{currentSiswa.cheatAttempts} kali</b> selama ujian berlangsung.</p>
                    </div>
                  )}

                  {aiError && (
                    <div className="bg-red-500/10 text-red-400 text-xs p-3 rounded-xl flex items-center gap-2 max-w-md mx-auto border border-red-500/20">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <p className="text-left font-mono">{aiError}</p>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={handleKeluarSiswa}
                      className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 px-6 rounded-xl text-xs transition"
                    >
                      Selesai & Keluar ke Beranda
                    </button>
                  </div>
                </div>

                {/* Hasil Analisis AI untuk Siswa */}
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-6">
                  <div className="pb-3 border-b border-slate-700 flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-sky-400" />
                    <h4 className="font-bold text-white">Hasil Analisis Guru AI (Gemini 2.5 Flash)</h4>
                  </div>

                  <div className="space-y-4">
                    {SOAL_EXAM.esai.map((soal, i) => {
                      const ansKey = soal.id;
                      const feedback = currentSiswa.analisisAI?.[ansKey];
                      return (
                        <div key={ansKey} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                          <p className="text-xs font-bold text-slate-500">Soal Esai {i + 1}</p>
                          <p className="text-sm font-semibold text-slate-300 leading-relaxed">{soal.pertanyaan}</p>
                          
                          <div className="pt-2 border-t border-slate-800 mt-2">
                            <p className="text-xs font-bold text-slate-500">Konstruksi Kode / Respon Anda:</p>
                            <pre className="text-xs bg-black text-slate-300 p-2.5 rounded-lg font-mono overflow-x-auto mt-1 whitespace-pre-wrap leading-relaxed">
                              {currentSiswa.jawabanEssay[ansKey] || "Kosong"}
                            </pre>
                          </div>
                          
                          <div className="mt-3 bg-indigo-500/5 p-3 rounded-lg border border-indigo-500/20 flex items-start gap-2.5">
                            <Cpu className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                            <div className="font-mono">
                              <p className="text-xs font-bold text-indigo-300">Skor: {feedback?.skor}/100</p>
                              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{feedback?.umpanBalik}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* ================= ALUR GURU / ADMIN PANEL ================= */}
        {role === 'admin' && isAdminAuthenticated && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Navigasi Panel Admin */}
            <div className="flex flex-wrap border-b border-slate-700 justify-between items-center gap-3">
              <div className="flex font-mono">
                <button
                  onClick={() => { setAdminTab('dashboard'); setSelectedDetailSiswa(null); }}
                  className={`py-3 px-5 font-semibold text-xs border-b-2 transition flex items-center gap-2 ${
                    adminTab === 'dashboard' && !selectedDetailSiswa
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Users className="h-4 w-4" /> Daftar Hadir & Nilai Siswa
                </button>
                <button
                  onClick={() => { setAdminTab('soal'); setSelectedDetailSiswa(null); }}
                  className={`py-3 px-5 font-semibold text-xs border-b-2 transition flex items-center gap-2 ${
                    adminTab === 'soal'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="h-4 w-4" /> Daftar Soal HOTS
                </button>
                {selectedDetailSiswa && (
                  <span className="py-3 px-5 font-semibold text-xs border-b-2 border-amber-500 text-amber-500 flex items-center gap-1.5">
                    <Cpu className="h-4 w-4" /> Analisis: {selectedDetailSiswa.nama}
                  </span>
                )}
              </div>

              {/* Tombol Tambah Siswa Manual (CRUD) */}
              {!selectedDetailSiswa && adminTab === 'dashboard' && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="mb-2 sm:mb-0 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 px-3.5 rounded-lg flex items-center gap-1 transition shadow-md"
                >
                  <Plus className="h-4 w-4" /> Input Siswa Manual
                </button>
              )}
            </div>

            {/* TAB 1: DASHBOARD & MANAGEMENT (CRUD) */}
            {adminTab === 'dashboard' && !selectedDetailSiswa && (
              <div className="space-y-6">
                
                {/* Panel Indikator Kelas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
                  <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm flex items-center gap-4">
                    <div className="bg-sky-500/10 text-sky-400 p-3 rounded-xl">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Hadir Ujian</p>
                      <h4 className="text-2xl font-black text-white">{daftarUjianSiswa.length} <span className="text-xs font-normal text-slate-500">Siswa</span></h4>
                    </div>
                  </div>

                  <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm flex items-center gap-4">
                    <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Lulus KBM (&gt;= 75)</p>
                      <h4 className="text-2xl font-black text-white">
                        {daftarUjianSiswa.filter(s => s.skorTotal >= 75).length}
                        <span className="text-xs font-normal text-slate-500"> / {daftarUjianSiswa.length}</span>
                      </h4>
                    </div>
                  </div>

                  <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm flex items-center gap-4">
                    <div className="bg-amber-500/10 text-amber-400 p-3 rounded-xl">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Rerata Esai AI</p>
                      <h4 className="text-2xl font-black text-white">
                        {daftarUjianSiswa.length > 0 
                          ? Math.round(daftarUjianSiswa.reduce((acc, curr) => acc + curr.skorEssay, 0) / daftarUjianSiswa.length) 
                          : 0}
                      </h4>
                    </div>
                  </div>

                  <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm flex items-center gap-4">
                    <div className="bg-indigo-500/10 text-indigo-400 p-3 rounded-xl">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Rerata Kelas</p>
                      <h4 className="text-2xl font-black text-white">
                        {daftarUjianSiswa.length > 0 
                          ? Math.round(daftarUjianSiswa.reduce((acc, curr) => acc + curr.skorTotal, 0) / daftarUjianSiswa.length) 
                          : 0}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Filter Dan Cari */}
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:w-1/2">
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Cari siswa berdasarkan nama..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-full bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-indigo-500 transition"
                    />
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <Filter className="h-4 w-4 text-slate-500" />
                    <select
                      value={filterKelas}
                      onChange={(e) => setFilterKelas(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-slate-300 py-2.5 px-3 rounded-xl text-xs outline-none transition"
                    >
                      <option value="Semua">Semua Kelas</option>
                      <option value="X RPL A">X RPL A</option>
                      <option value="X RPL B">X RPL B</option>
                    </select>
                  </div>
                </div>

                {/* Tabel Management Siswa */}
                <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
                    <h4 className="font-bold text-slate-200">Kehadiran & Kontrol Data SMKN Kasomalang (CRUD)</h4>
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 font-mono">KK KBM: 75</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-700 text-slate-400 font-bold uppercase text-[9px] tracking-wider font-mono">
                          <th className="py-3.5 px-6">Absen</th>
                          <th className="py-3.5 px-6">Nama Lengkap</th>
                          <th className="py-3.5 px-6">Kelas</th>
                          <th className="py-3.5 px-6 text-center">PG</th>
                          <th className="py-3.5 px-6 text-center">Esai AI</th>
                          <th className="py-3.5 px-6 text-center">Bonus Game</th>
                          <th className="py-3.5 px-6 text-center">Curang (Layar)</th>
                          <th className="py-3.5 px-6 text-center">Nilai Akhir</th>
                          <th className="py-3.5 px-6 text-center">Kelulusan</th>
                          <th className="py-3.5 px-6 text-right">Opsi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/60">
                        {filteredSiswa.length > 0 ? (
                          filteredSiswa.map((siswa) => {
                            const isLulus = siswa.skorTotal >= 75;
                            return (
                              <tr key={siswa.id} className="hover:bg-slate-700/40 transition font-mono">
                                <td className="py-4 px-6 font-bold text-slate-500">{siswa.absen}</td>
                                <td className="py-4 px-6 font-sans">
                                  <div>
                                    <p className="font-semibold text-slate-200">{siswa.nama}</p>
                                    <p className="text-[10px] text-slate-500">Mulai: {siswa.waktuMulai}</p>
                                  </div>
                                </td>
                                <td className="py-4 px-6 font-medium text-slate-400 font-sans">{siswa.kelas}</td>
                                <td className="py-4 px-6 text-center font-bold text-slate-300">{siswa.skorPG}</td>
                                <td className="py-4 px-6 text-center font-bold text-indigo-400">{siswa.skorEssay}</td>
                                <td className="py-4 px-6 text-center font-bold text-amber-400">+{siswa.bonusGame || 0}</td>
                                <td className="py-4 px-6 text-center font-bold text-red-400">{siswa.cheatAttempts || 0}x</td>
                                <td className="py-4 px-6 text-center font-black text-sky-400 bg-slate-900/20">{siswa.skorTotal}</td>
                                <td className="py-4 px-6 text-center font-sans">
                                  {isLulus ? (
                                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1">
                                      <Check className="h-3 w-3" /> Lulus
                                    </span>
                                  ) : (
                                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1">
                                      Remedial
                                    </span>
                                  )}
                                </td>
                                <td className="py-4 px-6 text-right">
                                  <div className="flex justify-end gap-1.5">
                                    <button
                                      onClick={() => setSelectedDetailSiswa(siswa)}
                                      title="Koreksi & Analisis AI Detil"
                                      className="p-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg border border-blue-500/20 transition"
                                    >
                                      <Eye className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleStartEditSiswa(siswa)}
                                      title="Edit Identitas / Nilai"
                                      className="p-1.5 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-lg border border-amber-500/20 transition"
                                    >
                                      <Edit3 className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteSiswa(siswa.id)}
                                      title="Hapus Data"
                                      className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg border border-red-500/20 transition"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="10" className="text-center py-12 text-slate-500">
                              Tidak ada siswa terdaftar.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* MODAL EDIT DATA SISWA (CRUD) */}
            {isEditModalOpen && siswaToEdit && (
              <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6 shadow-2xl space-y-4">
                  <div className="pb-3 border-b border-slate-700">
                    <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                      <Edit3 className="h-4 w-4 text-amber-400" /> Edit Data Siswa (CRUD)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Modifikasi nama, kelas, absen atau ubah skor manual.</p>
                  </div>

                  <form onSubmit={handleSaveEditSiswa} className="space-y-4 text-xs font-mono">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nama Siswa</label>
                      <input
                        type="text"
                        required
                        value={siswaToEdit.nama}
                        onChange={(e) => setSiswaToEdit({ ...siswaToEdit, nama: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-white outline-none font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Kelas</label>
                        <select
                          value={siswaToEdit.kelas}
                          onChange={(e) => setSiswaToEdit({ ...siswaToEdit, kelas: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-white outline-none"
                        >
                          <option value="X RPL A">X RPL A</option>
                          <option value="X RPL B">X RPL B</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">No Absen</label>
                        <input
                          type="number"
                          required
                          value={siswaToEdit.absen}
                          onChange={(e) => setSiswaToEdit({ ...siswaToEdit, absen: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-700">
                      <div>
                        <label className="block text-[10px] font-bold text-indigo-400 uppercase mb-1">Skor PG (0-100)</label>
                        <input
                          type="number"
                          required
                          min="0"
                          max="100"
                          value={siswaToEdit.skorPG}
                          onChange={(e) => setSiswaToEdit({ ...siswaToEdit, skorPG: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-white outline-none font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-indigo-400 uppercase mb-1">Skor Esai AI (0-100)</label>
                        <input
                          type="number"
                          required
                          min="0"
                          max="100"
                          value={siswaToEdit.skorEssay}
                          onChange={(e) => setSiswaToEdit({ ...siswaToEdit, skorEssay: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-white outline-none font-bold"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => { setIsEditModalOpen(false); setSiswaToEdit(null); }}
                        className="w-1/3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2.5 rounded-xl transition"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1"
                      >
                        <Save className="h-3.5 w-3.5" /> Simpan Perubahan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* MODAL TAMBAH DATA SISWA MANUAL (CRUD) */}
            {isAddModalOpen && (
              <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6 shadow-2xl space-y-4">
                  <div className="pb-3 border-b border-slate-700">
                    <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                      <Plus className="h-5 w-5 text-indigo-500" /> Tambah Siswa Baru (Manual Input)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Input manual untuk data ujian siswa yang berlangsung offline.</p>
                  </div>

                  <form onSubmit={handleAddSiswaManual} className="space-y-4 text-xs font-mono font-bold">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nama Siswa</label>
                      <input
                        type="text"
                        required
                        placeholder="Ketik nama lengkap..."
                        value={newSiswaData.nama}
                        onChange={(e) => setNewSiswaData({ ...newSiswaData, nama: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-white outline-none font-sans font-normal"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Kelas</label>
                        <select
                          value={newSiswaData.kelas}
                          onChange={(e) => setNewSiswaData({ ...newSiswaData, kelas: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-white outline-none"
                        >
                          <option value="X RPL A">X RPL A</option>
                          <option value="X RPL B">X RPL B</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">No Absen</label>
                        <input
                          type="number"
                          required
                          value={newSiswaData.absen}
                          onChange={(e) => setNewSiswaData({ ...newSiswaData, absen: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-700">
                      <div>
                        <label className="block text-[10px] font-bold text-sky-400 uppercase mb-1">Skor PG</label>
                        <input
                          type="number"
                          required
                          value={newSiswaData.skorPG}
                          onChange={(e) => setNewSiswaData({ ...newSiswaData, skorPG: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-indigo-400 uppercase mb-1">Skor Esai</label>
                        <input
                          type="number"
                          required
                          value={newSiswaData.skorEssay}
                          onChange={(e) => setNewSiswaData({ ...newSiswaData, skorEssay: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(false)}
                        className="w-1/3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2.5 rounded-xl transition"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition"
                      >
                        Tambah Siswa
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* REVIEW LEMBAR ESAI OLEH AI */}
            {selectedDetailSiswa && (
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-2xl space-y-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-700">
                  <div>
                    <button 
                      onClick={() => setSelectedDetailSiswa(null)}
                      className="text-xs text-sky-400 hover:underline font-bold mb-1.5 block font-mono"
                    >
                      &larr; Kembali ke Daftar Nilai
                    </button>
                    <h3 className="text-lg font-bold text-white">Lembar Penilaian & Evaluasi AI</h3>
                    <p className="text-xs text-slate-400 font-mono">Siswa: {selectedDetailSiswa.nama} • {selectedDetailSiswa.kelas} • Absen {selectedDetailSiswa.absen}</p>
                  </div>
                  
                  <div className="flex gap-2 font-mono text-xs">
                    <span className="bg-slate-900 px-3 py-1.5 rounded-lg text-slate-300">PG: {selectedDetailSiswa.skorPG}/100</span>
                    <span className="bg-indigo-950 text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-500/20">Esai: {selectedDetailSiswa.skorEssay}/100</span>
                    <span className="bg-sky-950 text-sky-300 px-3 py-1.5 rounded-lg font-bold">Total: {selectedDetailSiswa.skorTotal}</span>
                  </div>
                </div>

                {/* Lembar Hasil PG */}
                <div className="space-y-3 font-mono text-xs">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Bagian 1: Hasil Jawaban Pilihan Ganda (10 Soal HOTS)</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {SOAL_EXAM.pilihanGanda.map((soal, i) => {
                      const ans = selectedDetailSiswa.jawabanPG[soal.id];
                      const isCorrect = ans === soal.jawabanBenar;
                      return (
                        <div key={soal.id} className={`p-3 rounded-xl border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                          <p className="text-[10px] text-slate-500">Soal {i+1}</p>
                          <p className="font-bold text-xs mt-0.5">Jwb: {ans || '-'}</p>
                          <p className="text-[9px] font-semibold mt-1">Kunci: {soal.jawabanBenar}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Hasil Analisis Esai AI */}
                <div className="space-y-4 pt-4 border-t border-slate-700">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px] font-mono">Bagian 2: Hasil Koreksi & Review Detil Esai oleh AI Gemini</h4>
                  
                  {SOAL_EXAM.esai.map((soal, i) => {
                    const ansKey = soal.id;
                    const evalAI = selectedDetailSiswa.analisisAI?.[ansKey];
                    return (
                      <div key={ansKey} className="border border-slate-700 rounded-xl overflow-hidden bg-slate-900/40">
                        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-700 flex justify-between items-center text-xs font-mono">
                          <span className="font-bold text-slate-300">Esai {i + 1}</span>
                          <span className="bg-indigo-500/10 text-indigo-400 font-bold px-2.5 py-1 rounded-full border border-indigo-500/20">Skor AI: {evalAI?.skor || 0}/100</span>
                        </div>
                        
                        <div className="p-4 space-y-3">
                          <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Pertanyaan:</p>
                            <p className="text-xs font-semibold text-slate-300 mt-0.5 leading-relaxed">{soal.pertanyaan}</p>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Jawaban Siswa:</p>
                            <pre className="text-xs bg-slate-950 text-emerald-400 p-3 rounded-lg font-mono overflow-x-auto mt-1 whitespace-pre-wrap leading-relaxed">
                              {selectedDetailSiswa.jawabanEssay[ansKey] || "(Kosong)"}
                            </pre>
                          </div>

                          <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4 flex items-start gap-3">
                            <Cpu className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-bold text-indigo-300 font-mono">Umpan Balik AI:</p>
                              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{evalAI?.umpanBalik || "Tanpa umpan balik."}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <button
                    onClick={() => setSelectedDetailSiswa(null)}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs px-4 py-2 rounded-lg transition"
                  >
                    Tutup Lembar Penilaian
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: REVIEW DAFTAR SOAL GURU */}
            {adminTab === 'soal' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl">
                  <div className="pb-4 border-b border-slate-700 mb-6 flex justify-between items-center bg-slate-900/30 p-4 rounded-xl">
                    <div>
                      <h3 className="text-base font-bold text-slate-200">Soal HOTS Aktif</h3>
                      <p className="text-xs text-slate-400 mt-0.5">SMKN Kasomalang &bull; Pemrograman Web Dasar (X RPL)</p>
                    </div>
                    <span className="text-xs bg-indigo-500/10 font-bold py-1.5 px-3 rounded-lg text-indigo-400 border border-indigo-500/20 font-mono">
                      10 PG | 5 Esai
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-xs text-sky-400 uppercase tracking-widest mb-4 font-mono">A. Daftar Pilihan Ganda (HOTS)</h4>
                      <div className="space-y-4">
                        {SOAL_EXAM.pilihanGanda.map((soal, i) => (
                          <div key={soal.id} className="p-4 bg-slate-900/40 rounded-xl border border-slate-700 space-y-2">
                            <p className="font-semibold text-xs text-slate-200">{i+1}. {soal.pertanyaan}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                              {soal.pilihan.map(p => (
                                <p key={p.key} className={`p-2.5 rounded-lg border ${p.key === parseInt(soal.jawabanBenar) || p.key === soal.jawabanBenar ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                                  {p.key}. {p.teks} {p.key === soal.jawabanBenar && " (Kunci)"}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-700">
                      <h4 className="font-bold text-xs text-indigo-400 uppercase tracking-widest mb-4 font-mono">B. Daftar Esai & Kunci AI</h4>
                      <div className="space-y-4">
                        {SOAL_EXAM.esai.map((soal, i) => (
                          <div key={soal.id} className="p-4 bg-slate-900/40 rounded-xl border border-slate-700 space-y-2">
                            <p className="font-semibold text-xs text-slate-200">{i+1}. {soal.pertanyaan}</p>
                            <p className="text-[11px] text-indigo-400 italic">Petunjuk: {soal.petunjuk}</p>
                            <div className="mt-3 bg-indigo-500/5 p-3 rounded-lg border border-indigo-500/10 text-xs font-mono">
                              <p className="font-bold text-indigo-300">Kunci Analisis Guru AI:</p>
                              <p className="text-slate-400 mt-1 leading-relaxed">{soal.kunciAnalisis}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer Utama */}
      <footer className="bg-slate-950 text-slate-500 py-8 px-6 border-t border-slate-800/80 text-center text-xs mt-12 z-10 relative">
        <div className="max-w-7xl mx-auto space-y-2 font-mono">
          <LogoSMK className="h-10 w-10 mx-auto opacity-70 hover:opacity-100 transition duration-300" />
          <p className="font-semibold text-slate-300">CBT SMKN KASOMALANG &bull; RPL Kompetensi v3.5 (HOTS)</p>
          <p className="text-[10px] text-slate-600">Terbuka untuk GitHub Pages Hosting Mandiri (Single-page Application React)</p>
          <p className="text-[9px] text-slate-700">&copy; 2026 SMK Negeri Kasomalang. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
