// Get data from URL parameters or localStorage
function getDetailData() {
    // Use DetailDataManager
    const data = window.DetailDataManager.getDetailData(window.DetailDataManager.STORAGE_KEYS.LOG_DATA);
    
    if (data && data.logs) {
      populateLogData(data.logs);
    } else {
      // Try to load from server
      const id = window.DetailDataManager.getCurrentId();
      if (id) {
        fetchLogById(id);
      } else {
        // Use sample data
        const sampleLogs = getSampleLogs();
        populateLogData(sampleLogs);
      }
    }
  }
  
  // Populate log data
  function populateLogData(logs) {
    const tbody = document.querySelector('.log-table tbody');
    if (!tbody) return;
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Sort logs by date (newest first)
    const sortedLogs = logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Add rows
    sortedLogs.forEach(log => {
      const row = createLogRow(log);
      tbody.appendChild(row);
    });
  }
  
  // Create log row
  function createLogRow(log) {
    const tr = document.createElement('tr');
    
    // Format date
    const dateStr = formatDate(log.timestamp);
    
    // Get status badge class
    const statusClass = getStatusClass(log.status);
    
    tr.innerHTML = `
      <td data-label="Tanggal">${dateStr}</td>
      <td data-label="Status">
        <span class="status-badge ${statusClass}">${log.status}</span>
      </td>
      <td data-label="Keterangan">${log.keterangan}</td>
    `;
    
    return tr;
  }
  
  // Format date
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
  }
  
  // Get status class
  function getStatusClass(status) {
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes('done') || statusLower.includes('selesai') || statusLower.includes('disetujui')) {
      return 'status-done';
    } else if (statusLower.includes('proses') || statusLower.includes('review')) {
      return 'status-proses';
    } else if (statusLower.includes('draft') || statusLower.includes('ditolak')) {
      return 'status-draft';
    }
    
    return 'status-draft';
  }
  
  // Fetch log from server (for future implementation)
  function fetchLogById(id) {
    /*
    fetch(`/api/usulan/${id}/log`)
      .then(response => response.json())
      .then(data => {
        populateLogData(data.logs);
        // Save to localStorage for navigation between tabs
        window.DetailDataManager.saveDetailData('LOG_DATA', data);
      })
      .catch(error => {
        console.error('Error fetching log data:', error);
        // Use sample data as fallback
        const sampleLogs = getSampleLogs();
        populateLogData(sampleLogs);
      });
    */
  }
  
  // Get sample logs
  function getSampleLogs() {
    return [
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
    ];
  }
  
  // Export to PDF (optional feature)
  function exportToPDF() {
    alert('Fitur export PDF akan segera tersedia');
    // TODO: Implement PDF export using library like jsPDF
  }
  
  // Print function
  function printLog() {
    window.print();
  }
  
  // Filter logs by status (optional feature)
  function filterLogsByStatus(status) {
    const rows = document.querySelectorAll('.log-table tbody tr');
    
    rows.forEach(row => {
      const statusBadge = row.querySelector('.status-badge');
      if (!status || statusBadge.textContent.trim() === status) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
  
  // Search logs (optional feature)
  function searchLogs(query) {
    const rows = document.querySelectorAll('.log-table tbody tr');
    const searchLower = query.toLowerCase();
    
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      if (text.includes(searchLower)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    getDetailData();
  });
  
  // Setup sample log data in DetailDataManager if not exists
  if (window.DetailDataManager && !window.DetailDataManager.STORAGE_KEYS.LOG_DATA) {
    window.DetailDataManager.STORAGE_KEYS.LOG_DATA = 'currentLogData';
  }
  
  // Export functions for use in HTML
  if (typeof window !== 'undefined') {
    window.exportToPDF = exportToPDF;
    window.printLog = printLog;
    window.filterLogsByStatus = filterLogsByStatus;
    window.searchLogs = searchLogs;
  }