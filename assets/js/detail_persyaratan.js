// Get data from URL parameters or localStorage
function getDetailData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id) {
      // TODO: Fetch data from server based on ID
      // fetchPersyaratanById(id);
      console.log('Loading persyaratan for ID:', id);
    } else {
      // Load from localStorage if available
      const savedData = localStorage.getItem('currentPersyaratanData');
      if (savedData) {
        const data = JSON.parse(savedData);
        populatePersyaratanData(data);
      }
    }
  }
  
  // Populate data
  function populatePersyaratanData(data) {
    // Update Latar Belakang
    if (data.latar_belakang) {
      document.querySelector('.detail-text-box').textContent = data.latar_belakang;
    }
    
    // Update file list if needed
    if (data.files) {
      updateFileList(data.files);
    }
  }
  
  // Update file list dynamically
  function updateFileList(files) {
    const fileList = document.querySelector('.file-list');
    fileList.innerHTML = '';
    
    files.forEach((file, index) => {
      const fileItem = document.createElement('div');
      fileItem.className = 'file-item';
      
      fileItem.innerHTML = `
        <div class="file-name">${file.name}</div>
        <button class="btn-view-file" onclick="viewFile('${file.url}')">
          Lihat File
        </button>
      `;
      
      fileList.appendChild(fileItem);
    });
  }
  
  // View file function
  function viewFile(fileUrl) {
    if (!fileUrl) {
      alert('File tidak tersedia');
      return;
    }
    
    // Open file in new tab
    window.open(fileUrl, '_blank');
    
    // Alternative: Open in modal/viewer
    // showFileModal(fileUrl);
  }
  
  // Show file in modal (optional feature)
  function showFileModal(fileUrl) {
    // TODO: Implement modal viewer for PDF/images
    console.log('Opening file in modal:', fileUrl);
    
    // Example using a simple modal
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const iframe = document.createElement('iframe');
    iframe.src = fileUrl;
    iframe.style.cssText = `
      width: 90%;
      height: 90%;
      border: none;
      background: white;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      border: none;
      background: white;
      color: #0b2d72;
      font-size: 30px;
      cursor: pointer;
      border-radius: 50%;
    `;
    closeBtn.onclick = () => document.body.removeChild(modal);
    
    modal.appendChild(iframe);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
  }
  
  // Download file function (optional)
  function downloadFile(fileUrl, fileName) {
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(error => {
        console.error('Error downloading file:', error);
        alert('Gagal mengunduh file');
      });
  }
  
  // Fetch data from server (for future implementation)
  function fetchPersyaratanById(id) {
    /*
    fetch(`/api/usulan/${id}/persyaratan`)
      .then(response => response.json())
      .then(data => {
        populatePersyaratanData(data);
        // Save to localStorage for navigation between tabs
        localStorage.setItem('currentPersyaratanData', JSON.stringify(data));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Gagal memuat data persyaratan');
      });
    */
  }
  
  // Print function
  function printDetail() {
    window.print();
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    getDetailData();
  });
  
  // Example: Set sample data for demonstration
  const sampleData = {
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
  
  // Save sample data to localStorage for demo
  if (!localStorage.getItem('currentPersyaratanData')) {
    localStorage.setItem('currentPersyaratanData', JSON.stringify(sampleData));
  }
  
  // Export functions for use in HTML
  if (typeof window !== 'undefined') {
    window.viewFile = viewFile;
    window.downloadFile = downloadFile;
    window.printDetail = printDetail;
  }