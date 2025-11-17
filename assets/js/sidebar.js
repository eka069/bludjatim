// ===== SIDEBAR JAVASCRIPT (REUSABLE) =====

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

  // Toggle Submenu
  const usulanMenu = document.getElementById('usulanPendirianMenu');
if (usulanMenu) {
  usulanMenu.addEventListener('click', function() {
    window.location.href = "/pages/opd/usulan_pendirian.html";
  });
}

  
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

