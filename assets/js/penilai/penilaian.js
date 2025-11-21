// ==================== PENILAIAN GLOBAL JAVASCRIPT ====================
// Digunakan untuk: Substantif, Teknis, Administratif

// ===== CUSTOM SELECT DROPDOWN (GLOBAL) =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('Penilaian Global JS loaded');
  console.log('Body classes:', document.body.className);
  
  // Inisialisasi custom select setelah delay
  setTimeout(function() {
    initCustomSelects();
  }, 500);
  
  // Inisialisasi logic spesifik per halaman
  initPageSpecificLogic();
});

// ===== FUNGSI INISIALISASI CUSTOM SELECT (GLOBAL) =====
function initCustomSelects() {
  console.log('Initializing custom selects...');
  const customSelects = document.querySelectorAll(".custom-select");
  console.log('Found custom selects:', customSelects.length);
  
  customSelects.forEach((customSelect, index) => {
    const selectElement = customSelect.querySelector("select");
    
    if (!selectElement) {
      console.log('No select element found at index', index);
      return;
    }
    
    // Hapus yang lama jika ada (re-initialization)
    const existingSelected = customSelect.querySelector(".select-selected");
    const existingItems = customSelect.querySelector(".select-items");
    if (existingSelected) existingSelected.remove();
    if (existingItems) existingItems.remove();
    
    // Buat div untuk selected item
    const selectedDiv = document.createElement("DIV");
    selectedDiv.className = "select-selected select-placeholder";
    selectedDiv.textContent = "Pilih...";
    
    customSelect.appendChild(selectedDiv);
    
    // Buat div untuk items dropdown
    const itemsDiv = document.createElement("DIV");
    itemsDiv.className = "select-items select-hide";
    
    // Loop semua option (skip yang pertama - "Pilih...")
    for (let j = 1; j < selectElement.options.length; j++) {
      const optionDiv = document.createElement("DIV");
      optionDiv.textContent = selectElement.options[j].textContent;
      optionDiv.setAttribute("data-value", selectElement.options[j].value);
      
      // Event ketika option diklik
      optionDiv.addEventListener("click", function(e) {
        e.stopPropagation();
        
        const select = customSelect.querySelector("select");
        const selectedDisplay = customSelect.querySelector(".select-selected");
        const dataValue = this.getAttribute("data-value");
        
        // Update select value
        for (let k = 0; k < select.options.length; k++) {
          if (select.options[k].value === dataValue) {
            select.selectedIndex = k;
            selectedDisplay.textContent = select.options[k].textContent;
            selectedDisplay.classList.remove("select-placeholder");
            select.dispatchEvent(new Event('change'));
            break;
          }
        }
        
        // Update class "same-as-selected"
        const allOptions = itemsDiv.querySelectorAll("div");
        allOptions.forEach(opt => opt.classList.remove("same-as-selected"));
        this.classList.add("same-as-selected");
        
        // Close dropdown
        itemsDiv.classList.add("select-hide");
        selectedDisplay.classList.remove("select-arrow-active");
      });
      
      itemsDiv.appendChild(optionDiv);
    }
    
    customSelect.appendChild(itemsDiv);
    
    // Event ketika selected div diklik (toggle dropdown)
    selectedDiv.addEventListener("click", function(e) {
      e.stopPropagation();
      
      // Close all other dropdowns
      document.querySelectorAll(".select-items").forEach(item => {
        if (item !== itemsDiv) {
          item.classList.add("select-hide");
        }
      });
      
      document.querySelectorAll(".select-selected").forEach(sel => {
        if (sel !== selectedDiv) {
          sel.classList.remove("select-arrow-active");
        }
      });
      
      // Toggle current dropdown
      itemsDiv.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  });
  
  console.log('Custom selects initialization complete');
}

// ===== CLOSE DROPDOWN SAAT KLIK DI LUAR (GLOBAL) =====
document.addEventListener("click", function(e) {
  if (!e.target.closest('.custom-select')) {
    document.querySelectorAll(".select-items").forEach(item => {
      item.classList.add("select-hide");
    });
    document.querySelectorAll(".select-selected").forEach(sel => {
      sel.classList.remove("select-arrow-active");
    });
  }
});

// ===== FORM VALIDATION (GLOBAL) =====
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value || field.value === "") {
      isValid = false;
      field.classList.add('is-invalid');
    } else {
      field.classList.remove('is-invalid');
    }
  });
  
  return isValid;
}

// ===== LOGIC SPESIFIK PER HALAMAN =====
function initPageSpecificLogic() {
  // SUBSTANTIF
  if (document.body.classList.contains('penilaian-substantif')) {
    console.log('Initializing Substantif page logic');
    
    const form = document.getElementById('penilaianForm');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm('penilaianForm')) {
          console.log('Substantif form valid, processing...');
          // Logic untuk submit atau redirect ke halaman berikutnya
          // alert('Form Substantif berhasil! Lanjut ke halaman berikutnya...');
          window.location.href = 'penilaian_teknis.html';
        } else {
          alert('Mohon lengkapi semua field yang required!');
        }
      });
    }
    
    // Button Batal
    const btnBatal = document.querySelector('.btn-batal');
    if (btnBatal) {
      btnBatal.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin membatalkan?')) {
          window.history.back();
        }
      });
    }
  }
  
  // TEKNIS
  if (document.body.classList.contains('penilaian-teknis')) {
    console.log('Initializing Teknis page logic');
    
    const form = document.getElementById('penilaianForm');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm('penilaianForm')) {
          console.log('Teknis form valid, processing...');
          // Logic khusus untuk halaman teknis
          // alert('Form Teknis berhasil! Lanjut ke halaman berikutnya...');
          window.location.href = 'penilaian_administratif.html';
        } else {
          alert('Mohon lengkapi semua field yang required!');
        }
      });
    }
    
    // Button Batal
    const btnBatal = document.querySelector('.btn-batal');
    if (btnBatal) {
      btnBatal.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin membatalkan?')) {
          window.history.back();
        }
      });
    }
  }
  
  // ADMINISTRATIF
  if (document.body.classList.contains('penilaian-administratif')) {
    console.log('Initializing Administratif page logic');
    
    const form = document.getElementById('penilaianForm');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm('penilaianForm')) {
          console.log('Administratif form valid, processing...');
          // Logic khusus untuk halaman administratif (ini halaman terakhir)
          alert('Form Administratif berhasil disimpan!');
          window.location.href = 'data_permohonan.html';
        } else {
          alert('Mohon lengkapi semua field yang required!');
        }
      });
    }
    
    // Button Batal
    const btnBatal = document.querySelector('.btn-batal');
    if (btnBatal) {
      btnBatal.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin membatalkan?')) {
          window.history.back();
        }
      });
    }
  }
}

// ===== UTILITY FUNCTIONS (GLOBAL) =====

// Function untuk scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function untuk show loading
function showLoading() {
  // Implementasi loading indicator jika diperlukan
  console.log('Loading...');
}

// Function untuk hide loading
function hideLoading() {
  // Implementasi hide loading jika diperlukan
  console.log('Loading complete');
}