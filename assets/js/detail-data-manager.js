/**
 * Detail Data Manager
 * Manages data sharing between detail pages (data, persyaratan, penilaian)
 */

// Storage keys
const STORAGE_KEYS = {
    MAIN_DATA: 'currentDetailData',
    PERSYARATAN_DATA: 'currentPersyaratanData',
    PENILAIAN_DATA: 'currentPenilaianData',
    LOG_DATA: 'currentLogData',
    CURRENT_ID: 'currentUsulanId'
  };
  
  // Get ID from URL or localStorage
  function getCurrentId() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id) {
      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.CURRENT_ID, id);
      return id;
    }
    
    // Get from localStorage
    return localStorage.getItem(STORAGE_KEYS.CURRENT_ID);
  }
  
  // Save current ID
  function saveCurrentId(id) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ID, id);
  }
  
  // Navigate to detail page with ID
  function navigateToDetailPage(page, id) {
    if (!id) {
      id = getCurrentId();
    }
    
    if (id) {
      window.location.href = `${page}.html?id=${id}`;
    } else {
      window.location.href = `${page}.html`;
    }
  }
  
  // Load all data for current ID
  function loadAllDetailData(id) {
    if (!id) {
      console.error('No ID provided');
      return;
    }
    
    // TODO: Fetch from API
    // This is a placeholder for future API integration
    fetchUsulanDetail(id);
  }
  
  // Fetch usulan detail from API (placeholder)
  function fetchUsulanDetail(id) {
    /*
    // Example API call
    Promise.all([
      fetch(`/api/usulan/${id}`).then(r => r.json()),
      fetch(`/api/usulan/${id}/persyaratan`).then(r => r.json()),
      fetch(`/api/usulan/${id}/penilaian`).then(r => r.json())
    ])
    .then(([mainData, persyaratanData, penilaianData]) => {
      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.MAIN_DATA, JSON.stringify(mainData));
      localStorage.setItem(STORAGE_KEYS.PERSYARATAN_DATA, JSON.stringify(persyaratanData));
      localStorage.setItem(STORAGE_KEYS.PENILAIAN_DATA, JSON.stringify(penilaianData));
      
      // Trigger custom event
      window.dispatchEvent(new CustomEvent('detailDataLoaded', { 
        detail: { mainData, persyaratanData, penilaianData } 
      }));
    })
    .catch(error => {
      console.error('Error fetching detail data:', error);
    });
    */
    
    console.log('Loading data for ID:', id);
  }
  
  // Get data by key
  function getDetailData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  
  // Save data by key
  function saveDetailData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  // Clear all detail data
  function clearDetailData() {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
  
  // Setup demo data
  function setupDemoData() {
    // Main data
    const mainData = {
      id: '8',
      nomor_permohonan: 'BLUD-0008',
      nama_blud: 'SMK Negeri 1 Bisa Maju',
      bidang: 'Pendidikan Menengah Kejuruan',
      alamat: 'Jl. Ahmad Yani No. 52, Surabaya, Jawa Timur',
      tanggal_pengajuan: '2025-01-15',
      status: 'Disetujui'
    };
    
    // Persyaratan data
    const persyaratanData = {
      latar_belakang: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      files: [
        { name: 'Dokumen substantif dan teknis', url: '/uploads/dokumen-substantif.pdf' },
        { name: 'Surat Permohonan', url: '/uploads/surat-permohonan.pdf' },
        { name: 'Surat pernyataan kesanggupan untuk meningkatkan kinerja', url: '/uploads/surat-kesanggupan.pdf' },
        { name: 'Pola Tata Kelola', url: '/uploads/pola-tata-kelola.pdf' },
        { name: 'Rencana Strategi BLUD', url: '/uploads/rencana-strategi.pdf' },
        { name: 'Standar Pelayanan Minimal', url: '/uploads/standar-pelayanan.pdf' },
        { name: 'Laporan keuangan atau prognosis/proyeksi keuangan', url: '/uploads/laporan-keuangan.pdf' },
        { name: 'Laporan audit terakhir atau pernyataan bersedia untuk diaudit oleh pemeriksa eksternal pemerintah', url: '/uploads/laporan-audit.pdf' }
      ]
    };
    
    // Penilaian data
    const penilaianData = {
      substantif: {
        items: [
          { label: 'Bentuk Layanan Umum, Frekuensi Aktivitas Layanan', value: 30 },
          { label: 'Karakteristik Pasar pada Bisnis BLUD', value: 18 },
          { label: 'Struktur, Tugas dan Fungsi BLUD', value: 24 }
        ],
        total: 72
      },
      teknis: {
        items: [
          { label: 'Pola Tata Kelola', value: 25 },
          { label: 'Rencana Strategis Bisnis', value: 22 },
          { label: 'Standar Pelayanan Minimal', value: 20 }
        ],
        total: 67
      },
      administratif: {
        items: [
          { label: 'Laporan Keuangan/Proyeksi Keuangan', value: 15 },
          { label: 'Laporan Audit/Pernyataan Kesediaan Audit', value: 12 }
        ],
        total: 27
      },
      hasil: {
        status: 'Diterima untuk menerapkan BLUD',
        total_nilai: 166
      }
    };
    
    // Log data
    const logData = {
      logs: [
        {
          timestamp: '2025-11-07T09:50:00',
          status: 'DONE',
          keterangan: 'Hasil Rekomendasi Penerapan BLUD'
        },
        {
          timestamp: '2025-11-06T14:30:00',
          status: 'PROSES PENILAIAN',
          keterangan: 'Submit usulan & proses penilaian oleh Tim Penilai'
        },
        {
          timestamp: '2025-11-06T11:50:00',
          status: 'DRAFT',
          keterangan: 'Draft usulan dibuat'
        }
      ]
    };
    
    // Save demo data
    saveDetailData(STORAGE_KEYS.MAIN_DATA, mainData);
    saveDetailData(STORAGE_KEYS.PERSYARATAN_DATA, persyaratanData);
    saveDetailData(STORAGE_KEYS.PENILAIAN_DATA, penilaianData);
    saveDetailData(STORAGE_KEYS.LOG_DATA, logData);
    saveCurrentId('8');
  }
  
  // Initialize
  function initDetailDataManager() {
    // Setup demo data if not exists
    if (!getDetailData(STORAGE_KEYS.MAIN_DATA)) {
      setupDemoData();
    }
    
    // Get current ID
    const id = getCurrentId();
    if (id) {
      console.log('Current Usulan ID:', id);
    }
  }
  
  // Export functions
  if (typeof window !== 'undefined') {
    window.DetailDataManager = {
      getCurrentId,
      saveCurrentId,
      navigateToDetailPage,
      loadAllDetailData,
      getDetailData,
      saveDetailData,
      clearDetailData,
      setupDemoData,
      STORAGE_KEYS
    };
    
    // Auto-initialize
    initDetailDataManager();
  }
  
  // For CommonJS/Module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      getCurrentId,
      saveCurrentId,
      navigateToDetailPage,
      loadAllDetailData,
      getDetailData,
      saveDetailData,
      clearDetailData,
      setupDemoData,
      STORAGE_KEYS
    };
  }