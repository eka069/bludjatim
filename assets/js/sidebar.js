// // ===== SIDEBAR JAVASCRIPT (REUSABLE) =====

// // Toggle Sidebar untuk Mobile
// function toggleSidebar() {
//   const sidebar = document.getElementById('sidebar');
//   const overlay = document.getElementById('sidebarOverlay');
  
//   if (sidebar && overlay) {
//     sidebar.classList.toggle('show');
//     overlay.classList.toggle('show');
//   }
// }
// // Event Listeners
// document.addEventListener('DOMContentLoaded', function() {
//   // Close sidebar saat klik overlay
//   const overlay = document.getElementById('sidebarOverlay');
//   if (overlay) {
//     overlay.addEventListener('click', toggleSidebar);
//   }

//   // Toggle Submenu
//   const usulanMenu = document.getElementById('usulanPendirianMenu');
// if (usulanMenu) {
//   usulanMenu.addEventListener('click', function() {
//     window.location.href = "/pages/opd/usulan_pendirian.html";
//   });
// }

  
//   // Close sidebar saat window di-resize ke desktop
//   window.addEventListener('resize', function() {
//     if (window.innerWidth > 991) {
//       const sidebar = document.getElementById('sidebar');
//       const overlay = document.getElementById('sidebarOverlay');
      
//       if (sidebar && overlay) {
//         sidebar.classList.remove('show');
//         overlay.classList.remove('show');
//       }
//     }
//   });
// });

// ===== SIDEBAR JAVASCRIPT (REUSABLE & UX IMPROVED) =====

// Toggle Sidebar untuk Mobile
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  
  if (sidebar && overlay) {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Close sidebar saat klik overlay
  const overlay = document.getElementById('sidebarOverlay');
  if (overlay) {
    overlay.addEventListener('click', toggleSidebar);
  }

  // Set active menu berdasarkan URL saat ini
  setActiveMenuFromURL();

  // Handle klik menu Usulan Pendirian (dengan submenu)
  const usulanMenu = document.getElementById('usulanPendirianMenu');
  if (usulanMenu) {
    usulanMenu.addEventListener('click', function(e) {
      e.preventDefault();
      toggleUsulanSubmenu();
    });
  }

  // Handle klik menu utama lainnya (tanpa submenu)
  const allMainMenus = document.querySelectorAll('.nav-item-custom:not(#usulanPendirianMenu)');
  allMainMenus.forEach(menu => {
    menu.addEventListener('click', function(e) {
      // Jangan prevent default untuk navigasi normal
      // Tapi remove active dari semua menu lain
      removeAllActiveStates();
      this.classList.add('active');
      
      // Tutup submenu jika terbuka
      const submenu = document.getElementById('usulanSubmenu');
      const chevron = document.querySelector('#usulanPendirianMenu .chevron');
      if (submenu) submenu.classList.remove('show');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
      
      // Tutup sidebar di mobile
      if (window.innerWidth <= 991) {
        setTimeout(toggleSidebar, 200);
      }
    });
  });

  // Handle klik submenu items
  const submenuItems = document.querySelectorAll('.submenu-item');
  submenuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // Biarkan navigasi berjalan
      // Remove active dari semua
      removeAllActiveStates();
      
      // Set active ke submenu item ini
      this.classList.add('active');
      
      // Set parent menu (Usulan Pendirian) juga active
      const usulanMenu = document.getElementById('usulanPendirianMenu');
      if (usulanMenu) {
        usulanMenu.classList.add('active');
      }
      
      // Biarkan submenu tetap terbuka
      const submenu = document.getElementById('usulanSubmenu');
      const chevron = document.querySelector('#usulanPendirianMenu .chevron');
      if (submenu) submenu.classList.add('show');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
      
      // Tutup sidebar di mobile
      if (window.innerWidth <= 991) {
        setTimeout(toggleSidebar, 200);
      }
    });
  });

  // Close sidebar saat window di-resize ke desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 991) {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebarOverlay');
      
      if (sidebar && overlay) {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
      }
    }
  });
});

// Function: Toggle Submenu Usulan Pendirian
function toggleUsulanSubmenu() {
  const submenu = document.getElementById('usulanSubmenu');
  const usulanMenu = document.getElementById('usulanPendirianMenu');
  const chevron = document.querySelector('#usulanPendirianMenu .chevron');
  
  if (!submenu || !usulanMenu) return;

  const isOpen = submenu.classList.contains('show');
  
  // Remove active dari menu lain
  const allMainMenus = document.querySelectorAll('.nav-item-custom:not(#usulanPendirianMenu)');
  allMainMenus.forEach(menu => menu.classList.remove('active'));
  
  if (isOpen) {
    // Tutup submenu
    submenu.classList.remove('show');
    usulanMenu.classList.remove('active');
    if (chevron) chevron.style.transform = 'rotate(0deg)';
    
    // Remove active dari submenu items
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => item.classList.remove('active'));
  } else {
    // Buka submenu
    submenu.classList.add('show');
    usulanMenu.classList.add('active');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }
}

// Function: Remove semua active state
function removeAllActiveStates() {
  const allNavItems = document.querySelectorAll('.nav-item-custom');
  allNavItems.forEach(item => item.classList.remove('active'));
  
  const allSubmenuItems = document.querySelectorAll('.submenu-item');
  allSubmenuItems.forEach(item => item.classList.remove('active'));
}

function setActiveMenuFromURL() {
  const currentPath = window.location.pathname;
  
  // Cek jika di halaman dashboard
  if (currentPath.includes('dashboard.html') || currentPath === '/') {
    removeAllActiveStates();
    const dashboardMenu = document.querySelector('a[href="/dashboard.html"]');
    if (dashboardMenu) dashboardMenu.classList.add('active');
    return;
  }
  
  // Cek jika di halaman profil
  if (currentPath.includes('profil.html')) {
    removeAllActiveStates();
    const profilMenu = document.querySelector('a[href*="profil.html"]');
    if (profilMenu) profilMenu.classList.add('active');
    return;
  }
  
  // Cek submenu items (list_permohonan atau hasil-rekomendasi)
  const submenuItems = document.querySelectorAll('.submenu-item');
  let foundSubmenuActive = false;
  
  submenuItems.forEach(item => {
    const itemHref = item.getAttribute('href');
    if (itemHref && currentPath.includes(itemHref)) {
      removeAllActiveStates();
      
      // Set submenu item active
      item.classList.add('active');
      
      // Set parent menu active dan buka submenu
      const usulanMenu = document.getElementById('usulanPendirianMenu');
      const submenu = document.getElementById('usulanSubmenu');
      const chevron = document.querySelector('#usulanPendirianMenu .chevron');
      
      if (usulanMenu) usulanMenu.classList.add('active');
      if (submenu) submenu.classList.add('show');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
      
      foundSubmenuActive = true;
    }
  });
  
  // Jika di halaman usulan_pendirian.html (parent page tanpa submenu active)
  if (!foundSubmenuActive && currentPath.includes('usulan_pendirian.html')) {
    removeAllActiveStates();
    const usulanMenu = document.getElementById('usulanPendirianMenu');
    const submenu = document.getElementById('usulanSubmenu');
    const chevron = document.querySelector('#usulanPendirianMenu .chevron');
    
    if (usulanMenu) usulanMenu.classList.add('active');
    if (submenu) submenu.classList.add('show');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }
}

// Sidebar Submenu Toggle Function

function toggleSubmenu(event, submenuId) {
  event.preventDefault();
  event.stopPropagation(); // Prevent event bubbling
  
  const navItem = event.currentTarget;
  const submenu = document.getElementById(submenuId);
  
  // Check if this submenu is already open
  const isCurrentlyOpen = submenu.classList.contains('show');
  
  // Close all other submenus
  document.querySelectorAll('.submenu').forEach(function(otherSubmenu) {
    otherSubmenu.classList.remove('show');
  });
  
  // Remove expanded class from all nav items
  document.querySelectorAll('.nav-item-custom').forEach(function(item) {
    item.classList.remove('expanded');
  });
  
  // If the clicked submenu was not open, open it
  if (!isCurrentlyOpen) {
    submenu.classList.add('show');
    navItem.classList.add('expanded');
  }
}

// Auto expand submenu if it has active item
document.addEventListener('DOMContentLoaded', function() {
  // Find all active submenu items
  const activeSubmenus = document.querySelectorAll('.submenu-item.active');
  
  activeSubmenus.forEach(function(activeItem) {
    // Get parent submenu
    const submenu = activeItem.closest('.submenu');
    if (submenu) {
      // Show submenu
      submenu.classList.add('show');
      
      // Find parent nav item and mark as expanded and has active submenu
      const parentDiv = submenu.parentElement;
      const navItem = parentDiv.querySelector('.nav-item-custom');
      if (navItem) {
        navItem.classList.add('expanded', 'has-active-submenu');
      }
    }
  });
});
function toggleSubmenu(event, submenuId) {
  event.preventDefault();
  
  const navItem = event.currentTarget;
  const submenu = document.getElementById(submenuId);
  
  // Check if this submenu is already open
  const isCurrentlyOpen = submenu.classList.contains('show');
  
  // Close all other submenus
  document.querySelectorAll('.submenu').forEach(function(otherSubmenu) {
    otherSubmenu.classList.remove('show');
  });
  
  // Remove expanded class from all nav items
  document.querySelectorAll('.nav-item-custom').forEach(function(item) {
    item.classList.remove('expanded');
  });
  
  // If the clicked submenu was not open, open it
  if (!isCurrentlyOpen) {
    submenu.classList.add('show');
    navItem.classList.add('expanded');
  }
}

// Auto expand submenu if it has active item
document.addEventListener('DOMContentLoaded', function() {
  // Find all active submenu items
  const activeSubmenus = document.querySelectorAll('.submenu-item.active');
  
  activeSubmenus.forEach(function(activeItem) {
    // Get parent submenu
    const submenu = activeItem.closest('.submenu');
    if (submenu) {
      // Show submenu
      submenu.classList.add('show');
      
      // Find parent nav item and mark as expanded and has active submenu
      const parentDiv = submenu.parentElement;
      const navItem = parentDiv.querySelector('.nav-item-custom');
      if (navItem) {
        navItem.classList.add('expanded', 'has-active-submenu');
      }
    }
  });
});