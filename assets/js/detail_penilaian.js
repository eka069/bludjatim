// Toggle Accordion
function toggleAccordion(header) {
    const accordionItem = header.parentElement;
    const isActive = accordionItem.classList.contains('active');
    
    // Close all accordions
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Open clicked accordion if it wasn't active
    if (!isActive) {
      accordionItem.classList.add('active');
    }
  }
  
  // Get data from URL parameters or localStorage
  function getDetailData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id) {
      // TODO: Fetch data from server based on ID
      // fetchPenilaianById(id);
      console.log('Loading penilaian for ID:', id);
    } else {
      // Load from localStorage if available
      const savedData = localStorage.getItem('currentPenilaianData');
      if (savedData) {
        const data = JSON.parse(savedData);
        populatePenilaianData(data);
      }
    }
  }
  
  // Populate penilaian data
  function populatePenilaianData(data) {
    if (!data) return;
    
    // Update Substantif scores
    if (data.substantif) {
      const substantifContent = document.querySelectorAll('.accordion-content')[0];
      if (substantifContent) {
        updateScoreItems(substantifContent, data.substantif);
      }
    }
    
    // Update Teknis scores
    if (data.teknis) {
      const teknisContent = document.querySelectorAll('.accordion-content')[1];
      if (teknisContent) {
        updateScoreItems(teknisContent, data.teknis);
      }
    }
    
    // Update Administratif scores
    if (data.administratif) {
      const administratifContent = document.querySelectorAll('.accordion-content')[2];
      if (administratifContent) {
        updateScoreItems(administratifContent, data.administratif);
      }
    }
    
    // Update result status
    if (data.hasil) {
      const resultStatus = document.querySelector('.result-status');
      if (resultStatus) {
        resultStatus.textContent = data.hasil.status;
        
        // Change color based on status
        if (data.hasil.status.toLowerCase().includes('diterima')) {
          resultStatus.style.backgroundColor = '#d1fae5';
          resultStatus.style.color = '#065f46';
        } else if (data.hasil.status.toLowerCase().includes('ditolak')) {
          resultStatus.style.backgroundColor = '#fee2e2';
          resultStatus.style.color = '#991b1b';
        } else {
          resultStatus.style.backgroundColor = '#fef3c7';
          resultStatus.style.color = '#92400e';
        }
      }
    }
  }
  
  // Update score items in accordion
  function updateScoreItems(contentElement, scores) {
    const scoreItems = contentElement.querySelectorAll('.score-item');
    let totalScore = 0;
    
    scores.items.forEach((item, index) => {
      if (scoreItems[index]) {
        const label = scoreItems[index].querySelector('.score-label');
        const value = scoreItems[index].querySelector('.score-value');
        
        if (label) label.textContent = item.label;
        if (value) {
          value.textContent = item.value;
          totalScore += parseInt(item.value) || 0;
        }
      }
    });
    
    // Update total
    const totalValue = contentElement.querySelector('.total-value');
    if (totalValue) {
      totalValue.textContent = scores.total || totalScore;
    }
  }
  
  // Fetch data from server (for future implementation)
  function fetchPenilaianById(id) {
    /*
    fetch(`/api/usulan/${id}/penilaian`)
      .then(response => response.json())
      .then(data => {
        populatePenilaianData(data);
        // Save to localStorage for navigation between tabs
        localStorage.setItem('currentPenilaianData', JSON.stringify(data));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Gagal memuat data penilaian');
      });
    */
  }
  
  // Calculate total score across all categories
  function calculateTotalScore() {
    let grandTotal = 0;
    
    document.querySelectorAll('.total-value').forEach(totalElement => {
      const value = parseInt(totalElement.textContent) || 0;
      grandTotal += value;
    });
    
    console.log('Total Score:', grandTotal);
    return grandTotal;
  }
  
  // Print function
  function printDetail() {
    window.print();
  }
  
  // Export to PDF (optional feature)
  function exportToPDF() {
    alert('Fitur export PDF akan segera tersedia');
    // TODO: Implement PDF export using library like jsPDF
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    getDetailData();
    
    // Optional: Auto-open first accordion
    // const firstAccordion = document.querySelector('.accordion-item');
    // if (firstAccordion) {
    //   firstAccordion.classList.add('active');
    // }
  });
  
  // Example: Set sample data for demonstration
  const sampleData = {
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
      status: 'Diterima untuk menerapkan BLUD'
    }
  };
  
  // Save sample data to localStorage for demo
  if (!localStorage.getItem('currentPenilaianData')) {
    localStorage.setItem('currentPenilaianData', JSON.stringify(sampleData));
  }
  
  // Export functions for use in HTML
  if (typeof window !== 'undefined') {
    window.toggleAccordion = toggleAccordion;
    window.printDetail = printDetail;
    window.exportToPDF = exportToPDF;
  }