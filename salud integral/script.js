// Lista de tips diarios
const tips = [
  "Bebe al menos 2 litros de agua al día.",
  "Duerme entre 7 y 8 horas cada noche.",
  "Camina al menos 30 minutos diarios.",
  "Practica respiración consciente durante 5 minutos.",
  "Consume frutas y verduras en cada comida.",
  "Evita el exceso de azúcares y grasas.",
  "Mantén una postura correcta al trabajar.",
  "Dedica tiempo a un pasatiempo relajante."
];

// Seleccionar tip aleatorio
function mostrarTipAleatorio() {
  const tipDelDia = tips[Math.floor(Math.random() * tips.length)];
  const tipsGrid = document.getElementById("tips-grid");
  
  // Mostrar solo 1 tip aleatorio destacado
  tipsGrid.innerHTML = `<div class="card">🌟 Tip del día: ${tipDelDia}</div>`;
}

// Ejecutar al cargar la página
window.onload = mostrarTipAleatorio;

// Espera a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
  const formPerfil = document.querySelector("#perfil form");
  const inputFoto = document.querySelector("#foto");
  const inputNombre = document.querySelector("#nombre");
  const inputIntereses = document.querySelector("#intereses");

  // Cargar datos guardados en localStorage
  if (localStorage.getItem("perfil")) {
    const perfil = JSON.parse(localStorage.getItem("perfil"));
    inputNombre.value = perfil.nombre || "";
    inputIntereses.value = perfil.intereses || "";

    // Mostrar imagen previa si existe
    if (perfil.foto) {
      const imgPreview = document.createElement("img");
      imgPreview.src = perfil.foto;
      imgPreview.alt = "Foto de perfil";
      imgPreview.style.width = "120px";
      imgPreview.style.borderRadius = "50%";
      formPerfil.insertBefore(imgPreview, inputFoto);
    }
  }

  // Guardar datos en localStorage al enviar
  formPerfil.addEventListener("submit", (e) => {
    e.preventDefault();

    const reader = new FileReader();
    if (inputFoto.files[0]) {
      reader.readAsDataURL(inputFoto.files[0]);
      reader.onload = () => {
        saveProfile(reader.result);
      };
    } else {
      saveProfile();
    }
  });

  function saveProfile(fotoBase64 = null) {
    const perfil = {
      nombre: inputNombre.value,
      intereses: inputIntereses.value,
      foto: fotoBase64 || (localStorage.getItem("perfil") ? JSON.parse(localStorage.getItem("perfil")).foto : null)
    };

    localStorage.setItem("perfil", JSON.stringify(perfil));
    alert("✅ Perfil guardado con éxito.");
  }
});
