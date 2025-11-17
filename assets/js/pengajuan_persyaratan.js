// File Upload Handler
document.querySelectorAll('.file-input').forEach(input => {
    input.addEventListener('change', function(e) {
      const label = this.nextElementSibling;
      const fileName = label.querySelector('.file-name');
      
      if (this.files.length > 0) {
        fileName.textContent = this.files[0].name;
        label.classList.add('has-file');
      } else {
        fileName.textContent = 'No file chosen';
        label.classList.remove('has-file');
      }
    });
  });
  
  // Editor Toolbar Buttons
  document.querySelectorAll('.editor-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const title = this.getAttribute('title');
      
      // Get the textarea
      const textarea = document.querySelector('.editor-textarea');
      
      // Simple text formatting (for demonstration)
      // In production, you might want to use a rich text editor library
      switch(title) {
        case 'Bold':
          wrapSelectedText(textarea, '**', '**');
          break;
        case 'Italic':
          wrapSelectedText(textarea, '*', '*');
          break;
        case 'Underline':
          wrapSelectedText(textarea, '<u>', '</u>');
          break;
        case 'Strikethrough':
          wrapSelectedText(textarea, '~~', '~~');
          break;
        default:
          console.log('Editor action:', title);
      }
    });
  });
  
  // Helper function to wrap selected text
  function wrapSelectedText(textarea, prefix, suffix) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    if (selectedText) {
      const beforeText = textarea.value.substring(0, start);
      const afterText = textarea.value.substring(end);
      
      textarea.value = beforeText + prefix + selectedText + suffix + afterText;
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }
  }
  
  // Form Submission
  document.getElementById('formPersyaratan').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const latarBelakang = document.getElementById('latarBelakang').value;
    
    // Check required files
    const requiredFiles = [
      'dokumenSubstantif',
      'suratPermohonan',
      'suratKesanggupan',
      'polaTataKelola',
      'rencanaStrategi',
      'standarPelayanan'
    ];
    
    let allFilesUploaded = true;
    let missingFiles = [];
    
    requiredFiles.forEach(fileId => {
      const fileInput = document.getElementById(fileId);
      if (!fileInput.files.length) {
        allFilesUploaded = false;
        const label = fileInput.closest('.file-upload-group').querySelector('.file-label').textContent.trim();
        missingFiles.push(label);
      }
    });
    
    // Validate
    if (!latarBelakang.trim()) {
      alert('Mohon isi Latar Belakang');
      return;
    }
    
    if (!allFilesUploaded) {
      alert('Mohon upload semua dokumen yang wajib:\n\n' + missingFiles.join('\n'));
      return;
    }
    
    // Create FormData
    const formData = new FormData();
    formData.append('latar_belakang', latarBelakang);
    
    // Add all files
    document.querySelectorAll('.file-input').forEach(input => {
      if (input.files.length > 0) {
        formData.append(input.id, input.files[0]);
      }
    });
    
    console.log('Form Data:', Object.fromEntries(formData));
    
    // TODO: Send to server
    // submitFormData(formData);
    
    alert('Persyaratan berhasil disubmit!');
  });
  
  // Simpan Draft Button
  function simpanDraft() {
    const latarBelakang = document.getElementById('latarBelakang').value;
    
    if (!latarBelakang.trim()) {
      alert('Tidak ada data untuk disimpan sebagai draft');
      return;
    }
    
    // Create FormData
    const formData = new FormData();
    formData.append('latar_belakang', latarBelakang);
    formData.append('status', 'draft');
    
    // Add uploaded files
    document.querySelectorAll('.file-input').forEach(input => {
      if (input.files.length > 0) {
        formData.append(input.id, input.files[0]);
      }
    });
    
    console.log('Draft Data:', Object.fromEntries(formData));
    
    // TODO: Send to server
    // saveDraft(formData);
    
    alert('Draft berhasil disimpan!');
  }
  
  // Batal Button
  function batalForm() {
    if (confirm('Apakah Anda yakin ingin membatalkan? Data yang diisi akan hilang.')) {
      document.getElementById('formPersyaratan').reset();
      
      // Reset file names
      document.querySelectorAll('.file-name').forEach(fileName => {
        fileName.textContent = 'No file chosen';
      });
      
      document.querySelectorAll('.file-upload-label').forEach(label => {
        label.classList.remove('has-file');
      });
      
      // Optional: redirect
      // window.location.href = '/pages/opd/usulan_pendirian.html';
    }
  }
  
  // Focus effect for textarea
  document.querySelector('.editor-textarea').addEventListener('focus', function() {
    this.parentElement.querySelector('.editor-toolbar').style.borderColor = '#0b2d72';
  });
  
  document.querySelector('.editor-textarea').addEventListener('blur', function() {
    this.parentElement.querySelector('.editor-toolbar').style.borderColor = '#d1d5db';
  });
  
  // Function to submit form data (for future implementation)
  function submitFormData(formData) {
    /*
    fetch('/api/persyaratan', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      alert('Persyaratan berhasil disubmit!');
      window.location.href = '/pages/opd/usulan_pendirian.html';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat submit data');
    });
    */
  }
  
  // Function to save draft (for future implementation)
  function saveDraft(formData) {
    /*
    fetch('/api/persyaratan/draft', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      alert('Draft berhasil disimpan!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan draft');
    });
    */
  }