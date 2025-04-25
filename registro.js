import { db, collection, addDoc } from './firebase-init.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registro-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = {
      nombre: form.nombre.value.trim(),
      apellido: form.apellido.value.trim(),
      correo: form.correo.value.trim(),
      password: form.password.value.trim(),
      telefono: form.telefono.value.trim(),
      nacimiento: form.nacimiento.value,
      pais: form.pais.value.trim(),
      fechaRegistro: new Date().toISOString()
    };

    console.log("Usuario a registrar:", usuario); // Verifica que los datos se llenen

    try {
      await addDoc(collection(db, "usuarios"), usuario);
      alert("¡Usuario registrado exitosamente!");
      form.reset();
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar usuario.");
    }
  });
});
