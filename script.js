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
