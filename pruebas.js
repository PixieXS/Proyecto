document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.exo-menu');

  if (menuToggle && menu) {
      menuToggle.addEventListener('click', () => {
          menu.classList.toggle('open');
      });
  } else {
      console.error('No se encontraron los elementos .menu-toggle o .exo-menu.');
  }
});