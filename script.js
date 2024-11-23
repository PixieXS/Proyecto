// Seleccionamos todos los enlaces del menú
const navLinks = document.querySelectorAll("nav ul li a");

// Obtenemos la URL actual de la página
const currentUrl = window.location.href;

// Recorremos los enlaces
navLinks.forEach(link => {
    // Comparamos la URL del enlace con la URL actual
    if (link.href === currentUrl) {
        link.classList.add("active"); // Si coinciden, añadimos la clase 'active'
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Manejo de la visibilidad de los campos de tarjeta de crédito
    const creditCardRadio = document.getElementById('radio-4');
    const paypalRadio = document.getElementById('radio-3');
    const creditCardInfo = document.getElementById('credit-card-info');

    // Función para manejar la visibilidad de los campos de tarjeta de crédito
    function toggleCreditCardInfo() {
        creditCardInfo.style.display = creditCardRadio.checked ? 'block' : 'none';
    }

    // Escuchar cambios en los métodos de pago
    creditCardRadio.addEventListener('change', toggleCreditCardInfo);
    paypalRadio.addEventListener('change', toggleCreditCardInfo);

    // Ejecutar una vez para aplicar el estado inicial al cargar la página
    toggleCreditCardInfo();

    // Manejo de la selección de las denominaciones predeterminadas
    const denominations = document.querySelectorAll('.denomination');
    const donationButton = document.querySelector('button');
    const otherInput = document.querySelector('.denomination-other input');

    denominations.forEach(function(denomination) {
        denomination.addEventListener('click', function() {
            // Limpiar la selección de todas las denominaciones y desmarcar los radio buttons
            denominations.forEach(function(item) {
                item.classList.remove('selected');
                const radio = item.querySelector('input[type="radio"]');
                if (radio) radio.checked = false;
            });

            // Limpiar el campo "Otro"
            otherInput.classList.remove('selected');
            otherInput.value = '';

            // Marcar la denominación seleccionada
            this.classList.add('selected');
            const selectedRadio = this.querySelector('input[type="radio"]');
            if (selectedRadio) selectedRadio.checked = true;

            // Obtener el valor de la denominación seleccionada
            const selectedAmount = selectedRadio.value;

            // Actualizar el texto del botón con el monto seleccionado
            donationButton.textContent = 'Donar Lps.' + selectedAmount;
        });
    });

    // Manejo del campo de "Otro monto"
    otherInput.addEventListener('input', function () {
        // Limitar a solo valores numéricos
        const value = this.value.replace(/\D/g, ''); // Eliminar cualquier carácter no numérico
        this.value = value;  // Actualizar el valor del campo

        // Limpiar la selección de las denominaciones predefinidas
        denominations.forEach(function(item) {
            item.classList.remove('selected');
            const radio = item.querySelector('input[type="radio"]');
            if (radio) radio.checked = false;
        });

        // Marcar el campo "Otro" como seleccionado
        this.classList.add('selected');

        // Actualizar el texto del botón con el valor ingresado en "Otro"
        if (value) {
            donationButton.textContent = 'Donar Lps.' + value;
        } else {
            donationButton.textContent = 'Donar Lps.'; // Si el campo está vacío, poner el texto por defecto
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("donationModal");
    const openModalBtn = document.getElementById("openDonationModal");
    const closeBtn = document.getElementsByClassName("close")[0];
    const donationContent = document.getElementById("donation-content");

    // Función para abrir el modal y cargar el contenido de la página de donar
    openModalBtn.addEventListener("click", function(event) {
        event.preventDefault();  // Prevenir la redirección al hacer clic en el enlace

        // Cargar el contenido de la página de donaciones dentro del modal
        fetch("donaciones")
            .then(response => response.text())
            .then(data => {
                // Obtener el contenido de la página de donar y cargarlo en el modal
                const content = data.match(/<div class="donate">.*?<\/div>/s);  // Extraer solo la sección relevante de la página
                if (content) {
                    donationContent.innerHTML = content[0];
                }
                modal.style.display = "block";  // Mostrar el modal
            })
            .catch(error => {
                console.error("Error al cargar la página de donar:", error);
            });
    });

    // Cerrar el modal cuando se hace clic en la 'X'
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Cerrar el modal si el usuario hace clic fuera del contenido del modal
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});


//CALENDARIO
document.addEventListener("DOMContentLoaded", function () {
    const events = document.querySelectorAll("#event-list li");
    const today = new Date();

    // Convertir la fecha en formato "AAAA-MM-DD" a un objeto Date
    function getDateFromAttr(event) {
        return new Date(event.getAttribute("data-date"));
    }

    // Encontrar el evento más cercano
    let closestEvent = null;
    let closestDateDiff = Infinity;

    events.forEach(event => {
        const eventDate = getDateFromAttr(event);
        const dateDiff = eventDate - today;

        if (dateDiff >= 0 && dateDiff < closestDateDiff) {
            closestDateDiff = dateDiff;
            closestEvent = event;
        }

        // Añadir el evento click para mostrar un mensaje
        event.addEventListener("click", function () {
            alert("Seleccionaste: " + event.textContent.trim());
        });
    });

    // Resaltar el evento más cercano
    if (closestEvent) {
        closestEvent.classList.add("highlight");
    }
});

