// Get data from URL parameters or localStorage
function getDetailData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id) {
      // TODO: Fetch data from server based on ID
      // fetchDataById(id);
      console.log('Loading data for ID:', id);
    } else {
      // Load from localStorage if available
      const savedData = localStorage.getItem('currentDetailData');
      if (savedData) {
        const data = JSON.parse(savedData);
        populateDetailFields(data);
      }
    }
  }
  
  // Populate fields with data
  function populateDetailFields(data) {
    if (data.nomor_permohonan) {
      document.querySelector('.detail-field:nth-child(1) .detail-value').textContent = data.nomor_permohonan;
    }
    
    if (data.nama_blud) {
      document.querySelector('.detail-field:nth-child(2) .detail-value').textContent = data.nama_blud;
    }
    
    if (data.bidang) {
      document.querySelector('.detail-field:nth-child(3) .detail-value').textContent = data.bidang;
    }
    
    if (data.alamat) {
      document.querySelector('.detail-field:nth-child(4) .detail-value').textContent = data.alamat;
    }
  }
  
  // Fetch data from server (for future implementation)
  function fetchDataById(id) {
    /*
    fetch(`/api/usulan/${id}`)
      .then(response => response.json())
      .then(data => {
        populateDetailFields(data);
        // Save to localStorage for navigation between tabs
        localStorage.setItem('currentDetailData', JSON.stringify(data));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Gagal memuat data');
      });
    */
  }
  
  // Print function (optional feature)
  function printDetail() {
    window.print();
  }
  
  // Export to PDF (optional feature - requires library)
  function exportToPDF() {
    alert('Fitur export PDF akan segera tersedia');
    // TODO: Implement PDF export using library like jsPDF
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    getDetailData();
  });
  
  // Example: Set sample data for demonstration
  // You can remove this in production
  const sampleData = {
    nomor_permohonan: 'BLUD-0008',
    nama_blud: 'SMK Negeri 1 Bisa Maju',
    bidang: 'Pendidikan Menengah Kejuruan',
    alamat: 'Jl. Ahmad Yani No. 52, Surabaya, Jawa Timur'
  };
  
  // Save sample data to localStorage for demo
  if (!localStorage.getItem('currentDetailData')) {
    localStorage.setItem('currentDetailData', JSON.stringify(sampleData));
  }
  
  // Export functions for use in HTML
  if (typeof window !== 'undefined') {
    window.printDetail = printDetail;
    window.exportToPDF = exportToPDF;
  }