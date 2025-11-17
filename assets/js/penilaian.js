// ==================== CUSTOM SELECT DROPDOWN ====================
// Inisialisasi setelah DOM loaded
document.addEventListener('DOMContentLoaded', function() {
  initCustomSelects();
});

function initCustomSelects() {
  const customSelects = document.getElementsByClassName("custom-select");
  
  // Loop semua custom select
  for (let i = 0; i < customSelects.length; i++) {
    const selectElement = customSelects[i].getElementsByTagName("select")[0];
    
    // Buat div untuk selected item
    const selectedDiv = document.createElement("DIV");
    selectedDiv.setAttribute("class", "select-selected");
    selectedDiv.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
    customSelects[i].appendChild(selectedDiv);
    
    // Buat div untuk items dropdown
    const itemsDiv = document.createElement("DIV");
    itemsDiv.setAttribute("class", "select-items select-hide");
    
    // Loop semua option (skip yang pertama - "Pilih...")
    for (let j = 1; j < selectElement.length; j++) {
      const optionDiv = document.createElement("DIV");
      optionDiv.innerHTML = selectElement.options[j].innerHTML;
      
      // Event ketika option diklik
      optionDiv.addEventListener("click", function(e) {
        const select = this.parentNode.parentNode.getElementsByTagName("select")[0];
        const selectedDisplay = this.parentNode.previousSibling;
        
        // Update select value
        for (let k = 0; k < select.length; k++) {
          if (select.options[k].innerHTML === this.innerHTML) {
            select.selectedIndex = k;
            selectedDisplay.innerHTML = this.innerHTML;
            
            // Update class "same-as-selected"
            const allOptions = this.parentNode.getElementsByClassName("same-as-selected");
            for (let m = 0; m < allOptions.length; m++) {
              allOptions[m].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        selectedDisplay.click();
      });
      
      itemsDiv.appendChild(optionDiv);
    }
    customSelects[i].appendChild(itemsDiv);
    
    // Event ketika selected div diklik (toggle dropdown)
    selectedDiv.addEventListener("click", function(e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
}

// Fungsi untuk close semua dropdown
function closeAllSelect(elmnt) {
  const items = document.getElementsByClassName("select-items");
  const selected = document.getElementsByClassName("select-selected");
  const arrNo = [];
  
  for (let i = 0; i < selected.length; i++) {
    if (elmnt === selected[i]) {
      arrNo.push(i);
    } else {
      selected[i].classList.remove("select-arrow-active");
    }
  }
  
  for (let i = 0; i < items.length; i++) {
    if (arrNo.indexOf(i)) {
      items[i].classList.add("select-hide");
    }
  }
}

// Close dropdown ketika klik di luar
document.addEventListener("click", closeAllSelect);