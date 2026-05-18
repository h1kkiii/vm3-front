const API = "http://10.0.2.16:3454";

const MSG = {
  guardado: "Alumno guardado correctamente.",
  error: "DNI repetido o error al guardar.",
  fetchError: "Error de red. Intente nuevamente.",
};

const getVal = (id) => document.getElementById(id)?.value.trim() ?? "";

async function guardarAlumno() {
  const apellidos = getVal("apellidos");
  const nombres   = getVal("nombres");
  const dni       = getVal("dni");

  try {
    const respuesta = await fetch(`${API}/grabaAlumnos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apellidos, nombres, dni }),
    });

    const resultado = await respuesta.text();
    alert(resultado === "1" ? MSG.guardado : MSG.error);
  } catch {
    alert(MSG.fetchError);
  }
}

const consultarAlumnos = async() =>{
  const lista = document.getElementById("lista");
  try {
    const respuesta = await fetch(`${API}/consultarAlumnos`);
    const alumnos = await respuesta.json();
    lista.innerHTML = "";
    for (const alumno of alumnos) {
      const initials = alumno.apellidos.trim().slice(0, 2).toUpperCase();
      const li = document.createElement("li");
      li.className = "alumno-item";
      li.innerHTML = `
        <div class="alumno-avatar">${initials}</div>
        <div class="alumno-info">
          <div class="alumno-nombre"></div>
          <div class="alumno-dni"></div>
        </div>`;
      li.querySelector(".alumno-nombre").textContent =
        `${alumno.apellidos}, ${alumno.nombres}`;
      li.querySelector(".alumno-dni").textContent = `DNI ${alumno.dni}`;
      lista.appendChild(li);
    }
  } catch {
    lista.innerHTML = `<li>${MSG.fetchError}</li>`;
  }
}