// Tab Navigation
document.querySelectorAll('.form-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    // Remove active class from all tabs
    document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked tab
    this.classList.add('active');
    
    // Get tab name
    const tabName = this.getAttribute('data-tab');
    console.log('Switching to tab:', tabName);
    
    // TODO: Load content based on tab
    // switchTabContent(tabName);
  });
});

// Form Submission
document.getElementById('formPengajuan').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const namaBlud = document.getElementById('namaBlud').value;
  const bidang = document.getElementById('bidang').value;
  const alamat = document.getElementById('alamat').value;
  
  // Validate
  if (!namaBlud || !bidang || !alamat) {
    alert('Mohon lengkapi semua field yang diperlukan');
    return;
  }
  
  // Create data object
  const formData = {
    nama_blud: namaBlud,
    bidang: bidang,
    alamat: alamat
  };
  
  console.log('Form Data:', formData);
  
  // TODO: Send to server
  // submitFormData(formData);
  
  alert('Data berhasil disimpan!');
  
  // Optional: Reset form
  // this.reset();
});

// Batal Button
function batalForm() {
  if (confirm('Apakah Anda yakin ingin membatalkan? Data yang diisi akan hilang.')) {
    document.getElementById('formPengajuan').reset();
    // Optional: redirect
    // window.location.href = '/pages/opd/usulan_pendirian.html';
  }
}

// Reset border color on input
document.querySelectorAll('.form-control-custom').forEach(input => {
  input.addEventListener('input', function() {
    this.style.borderColor = '#d1d5db';
  });
  
  input.addEventListener('focus', function() {
    this.style.borderColor = '#0b2d72';
  });
  
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.style.borderColor = '#d1d5db';
    }
  });
});

// Function to switch tab content (for future implementation)
function switchTabContent(tabName) {
  // Hide all tab contents
  // Show selected tab content
  console.log('Loading content for:', tabName);
}

// Function to submit form data (for future implementation)
function submitFormData(data) {
  // Example: Send data to server
  /*
  fetch('/api/pengajuan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    alert('Data berhasil disimpan!');
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Terjadi kesalahan saat menyimpan data');
  });
  */
}