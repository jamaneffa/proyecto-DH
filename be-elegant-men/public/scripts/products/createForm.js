window.addEventListener("load", () => {
    // Obtener todos los elementos con id que sigue el patrón sizeId_*
    let checkboxes = document.querySelectorAll('[id^="sizeId_"]');
    let stockInputs = document.querySelectorAll('[id^="stockForSizeId_"]');
  
    // Asignar el evento a cada checkbox
    checkboxes.forEach((checkbox, index) => {
      let stockInput = stockInputs[index];
  
      checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
          stockInput.value = '1';
        } else {
          stockInput.value = '';
        }
      });
    });
  });
  
