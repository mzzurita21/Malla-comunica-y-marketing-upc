// Mapa de dependencias: cada curso tiene un array de los códigos que desbloquea
const cursos = {
  "HU625": ["HU626", "HU317", "CO13"],
  "HU06": ["HU66"],
  "MA431": ["CM65"],
  "CO16": ["CO19"],
  "HU626": ["CO13"],
  "AF103": ["HU49", "CM28"],
  "CM17": ["PU66", "CM51"],
  "PU66": ["CM51", "IM02"],
  "CM65": ["MA470"],
  "CM28": ["CM29", "CM66", "EF91"],
  "CO22": ["PU124"],
  "IM02": ["IM86"],
  "CM66": ["CM00", "CM67", "CM22"],
  "EF91": ["CM31", "CM87"],
  "CM00": ["CM88", "CM36"],
  "CM67": ["CM83"],
  "IM86": ["CM33", "CM83"],
  "CM22": ["CM83"],
  "CM87": ["CM33", "CM83"],
  "CM33": ["CM03", "CM37"],
  "CM68": ["CM70"],
  "CO07": ["CO09"],
  "CM83": ["CM84", "CM58", "CM37"],
  "CM88": ["CM36"],
  "PU33": ["IM77"],
  "CM70": ["CM89"],
  "CM84": ["CM79", "CM71"],
  "CM58": ["CM75"],
  "CM75": ["CM74"],
  "CM79": ["CM85"],
  // sin prerrequisitos explícitos
  "HU548": [], "HU193": [], "HU187": [], "HU15": [], "CO14": [],
  "HU49": [], "CM29": [], "CM31": [], "CM03": [], "CM36": [],
  "CM37": [], "CM71": [], "CM85": [], "CM74": [], "IM77": [],
  "CO09": [],
  "Electivo1": [], "Electivo2": [], "Electivo3": [],
  "Electivo4": [], "Electivo5": [], "Electivo6": [],
  "Electivo7": [], "Electivo8": []
};

const aprobados = new Set();

function toggleCurso(codigo, boton) {
  if (aprobados.has(codigo)) {
    aprobados.delete(codigo);
    boton.classList.remove("aprobado");
    bloquearDependientes(codigo);
  } else {
    aprobados.add(codigo);
    boton.classList.add("aprobado");
    desbloquearDependientes(codigo);
  }
}

function desbloquearDependientes(codigo) {
  (cursos[codigo] || []).forEach(dep => {
    const elem = document.getElementById(dep);
    if (elem) {
      elem.style.opacity = "1";
    }
  });
}

function bloquearDependientes(codigo) {
  (cursos[codigo] || []).forEach(dep => {
    const sigueDesbloqueado = Object.entries(cursos).some(([cur, deps]) => {
      return cur !== codigo && aprobados.has(cur) && deps.includes(dep);
    });
    if (!sigueDesbloqueado) {
      const elem = document.getElementById(dep);
      if (elem) {
        elem.style.opacity = "0.5";
        const boton = elem.querySelector("button");
        if (aprobados.has(dep)) {
          aprobados.delete(dep);
          boton.classList.remove("aprobado");
          bloquearDependientes(dep);
        }
      }
    }
  });
}

function inicializarEventos() {
  document.querySelectorAll(".curso").forEach(div => {
    const codigo = div.id;
    const boton = div.querySelector("button");
    boton.addEventListener("click", () => toggleCurso(codigo, boton));
    if (!cursos[codigo] || cursos[codigo].length === 0) {
      div.style.opacity = "1";
    } else {
      div.style.opacity = "0.5";
    }
  });
}

inicializarEventos();

