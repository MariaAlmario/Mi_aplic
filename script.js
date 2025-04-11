document.addEventListener("DOMContentLoaded", () => {
    // Splash Screen
    setTimeout(() => {
      document.getElementById("splash-screen").style.display = "none";
    }, 2000);
  
    fetchGaleria();
    setupBuscador();
    cargarFavoritos();
   
  });
  
  // Muestra la sección activa
  function mostrarSeccion(id) {
    document.querySelectorAll(".seccion").forEach(sec => {
      sec.classList.remove("activa");
    });
    document.getElementById(id).classList.add("activa");
  }
  
  // Obtener imágenes desde la API
  async function fetchGaleria() {
    const res = await fetch("https://picsum.photos/v2/list?page=1&limit=20");
    const data = await res.json();
    mostrarImagenes(data, document.getElementById("image-list"));
  }
  
  // Mostrar imágenes en un contenedor
  function mostrarImagenes(imagenes, contenedor) {
    contenedor.innerHTML = "";
    imagenes.forEach(img => {
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="${img.download_url}" alt="${img.author}">
        <p>${img.author}</p>
        <button onclick="agregarFavorito('${img.id}', '${img.download_url}', '${img.author}')">⭐</button>
      `;
      contenedor.appendChild(div);
    });
  }
  
  // Buscador + filtro
  function setupBuscador() {
    const input = document.getElementById("search-input");
    const filtro = document.getElementById("filter-select");
  
    async function buscarYFiltrar() {
      const res = await fetch("https://picsum.photos/v2/list?page=1&limit=50");
      const data = await res.json();
      const query = input.value.toLowerCase();
      const filtroValor = filtro.value;
  
      const filtradas = data.filter(img =>
        img.author.toLowerCase().includes(query)
      );
  
      const contenedor = document.getElementById("search-results");
      contenedor.innerHTML = "";
  
      filtradas.forEach(img => {
        let url = img.download_url;
  
        if (filtroValor === "grayscale") {
          url = `https://picsum.photos/id/${img.id}/300/200?grayscale`;
        } else if (filtroValor === "blur") {
          url = `https://picsum.photos/id/${img.id}/300/200?blur`;
        } else {
          url = `https://picsum.photos/id/${img.id}/300/200`;
        }
  
        const div = document.createElement("div");
        div.innerHTML = `
          <img src="${url}" alt="${img.author}">
          <p>${img.author}</p>
          <button onclick="agregarFavorito('${img.id}', '${url}', '${img.author}')">⭐</button>
        `;
        contenedor.appendChild(div);
      });
    }
  
    input.addEventListener("input", buscarYFiltrar);
    filtro.addEventListener("change", buscarYFiltrar);
  }
  
  
  // Favoritos usando localStorage (CRUD)
  function agregarFavorito(id, url, autor) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    if (!favoritos.find(fav => fav.id === id)) {
      favoritos.push({ id, url, autor });
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      cargarFavoritos();
    }
  }
  
  function cargarFavoritos() {
    const contenedor = document.getElementById("favoritos-list");
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    contenedor.innerHTML = "";
  
    favoritos.forEach(fav => {
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="${fav.url}" alt="${fav.autor}">
        <p>${fav.autor}</p>
        <button onclick="eliminarFavorito('${fav.id}')">❌</button>
      `;
      contenedor.appendChild(div);
    });
  }
  
  function eliminarFavorito(id) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.filter(fav => fav.id !== id);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    cargarFavoritos();
  }
  
  // Feature único: imagen aleatoria
  function mostrarImagenAleatoria() {
    const contenedor = document.getElementById("imagen-aleatoria");
    const random = Math.floor(Math.random() * 1000);
    const url = `https://picsum.photos/id/${random}/400/300`;
  
    contenedor.innerHTML = `
      <img src="${url}" alt="Imagen aleatoria">
    `;
  }
  