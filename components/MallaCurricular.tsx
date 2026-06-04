"use client";
import { useState, useEffect } from "react";

// Datos completos de semestres y materias
const semestres = [
  { nivel: 1, materias: [
    { id: "s1m1", nombre: "MATEMATICAS", creditos: 3, tipologia: "B", prereq: [], coreq: [] },
    { id: "s1m2", nombre: "HABILIDADES COMUNICATIVAS I", creditos: 2 , tipologia: "B", prereq: [] , coreq: []},
    { id: "s1m3", nombre: "HUMANIDADES I", creditos: 2, tipologia: "B", prereq: [] , coreq: []},
    { id: "s1m4", nombre: "ALGORITMOS Y PROGRAMACION I", creditos: 4, tipologia: "C", prereq: [] , coreq: []},
    { id: "s1m5", nombre: "MATEMATICAS DISCRETAS", creditos: 3, tipologia: "C", prereq: [] , coreq: []},
    { id: "s1m6", nombre: "INTRODUCCION AL AREA PROFESIONAL", creditos: 2, tipologia: "C", prereq: [] , coreq: []},
  ]},
  { nivel: 2, materias: [
    { id: "s2m1", nombre: "GEOMETRIA VECTORIAL", creditos: 3, tipologia: "B", prereq: [], coreq: [] },
    { id: "s2m2", nombre: "CALCULO DIFERENCIAL", creditos: 3, tipologia: "B", prereq: ["s1m1"], coreq: [] },
    { id: "s2m3", nombre: "FISICA DEL MOVIMIENTO", creditos: 3, tipologia: "B", prereq: ["s1m1"], coreq: ["s2m4"]  },
    { id: "s2m4", nombre: "LABORATORIO DE FISICA DEL MOVIEMIENTO", creditos: 1, tipologia: "B", prereq: [], coreq: [] },
    { id: "s2m5", nombre: "HUMANIDADES COMUNICATIVAS II", creditos: 2, tipologia: "B", prereq: ["s1m2"] , coreq: []},
    { id: "s2m6", nombre: "ALGORITMOS Y PROGRAMACION II", creditos: 4, tipologia: "C", prereq: ["s1m4"], coreq: [] },
   {id: "s2m7", nombre: "DEPORTE, ARTE Y RECREACION", creditos:1 , tipologia: "T", prereq: [], , coreq: []} ,
                                                                                                            
  ]},
  { nivel: 3, materias: [
    { id: "s3m1", nombre: "HUMANIDADES II", creditos: 2, tipologia: "B", prereq: ["s1m3"], coreq: [] },
    { id: "s3m2", nombre: "CALCULO INTEGRAL", creditos: 3, tipologia: "B", prereq: ["s2m2"], coreq: [] },
    { id: "s3m3", nombre: "ALGEBRA LINEAL", creditos: 3, tipologia: "B", prereq: ["s2m1"] , coreq: []},
    { id: "s3m4", nombre: "ALGORITMOS Y PROGRAMACIO III", creditos: 3, tipologia: "C", prereq: ["s2m6"], coreq: [] },
    { id: "s3m5", nombre: "TALLER DE LENGUAJES DE PROGRAMACION I", creditos: 3, tipologia: "C", prereq: ["s2m6"], coreq: [] },
    { id: "s3m6", nombre: "BASES DE DATOS I", creditos: 3, tipologia: "C", prereq: ["s1m5"], coreq: [] },
  
  ]},
  { nivel: 4, materias: [
    { id: "s4m1", nombre: "CALCULO DE VARIAS VARIABLES", creditos: 3, tipologia: "B", prereq: ["s3m2"] , coreq: []},
    { id: "s4m2", nombre: "ESTADISTICAS", creditos: 3, tipologia: "B", prereq: ["s3m2"], coreq: [] },
    { id: "s4m3", nombre: "PROGRAMACION LINEAL", creditos: 3, tipologia: "B", prereq: ["s3m3"], coreq: [] },
    { id: "s4m4", nombre: "ANALISIS DE SOFTWARE", creditos: 3, tipologia: "C", prereq: ["s3m5"], coreq: [] },
    { id: "s4m5", nombre: "TALLER DE LENGUAJES DE PROGRAMACION II", creditos: 3, tipologia: "C", prereq: ["s3m5"], coreq: ["s4m6"] },
    { id: "s4m6", nombre: "ALGORITMOS Y PROGRAMACION IV", creditos: 3, tipologia: "C", prereq: ["s3m4"], coreq: [] },
    
  ]},
  { nivel: 5, materias: [
    { id: "s5m1", nombre: "ECUACIONES DIFERENCIALES", creditos: 3, tipologia: "B", prereq: ["s4m1"], coreq: [] },
    { id: "s5m2", nombre: "DISEÑO DE SOTFWARE", creditos: 3, tipologia: "C", prereq: ["s4m4","s3m6"] , coreq: []},
    { id: "s5m3", nombre: "BASES DE DATOS II", creditos: 3, tipologia: "C", prereq: ["s3m6"], coreq: [] },
    { id: "s5m4", nombre: "ESTADISTICA INFERENCIAL", creditos: 3, tipologia: "C", prereq: ["s4m2"], coreq: [] },
    { id: "s5m5", nombre: "FUNDAMENTOS DE CIRCUITOS Y DISPOSITIVOS ELECTRONICOS", creditos: 3, tipologia: "C", prereq: ["s2m3","s2m4"], coreq: [] },
  ]},
  { nivel: 6, materias: [
    { id: "s6m1", nombre: "PROYECTO INTEGRADOR", creditos: 2, tipologia: "C", prereq: ["s5m2"] , coreq: []},
    { id: "s6m2", nombre: "ELECTRONICA DIGITAL Y ARQUITECTURA DE HARDWARE", creditos: 3, tipologia: "C", prereq: ["s5m5"], coreq: [] },
    { id: "s6m3", nombre: "METODOS NUMERICOS", creditos: 3, tipologia: "C", prereq: ["s3m3","s5m1"], coreq: [] },
    { id: "s6m4", nombre: "INVESTIGACION DE OPERACIONES", creditos: 3, tipologia: "C", prereq: ["s3m5","s5m4"], coreq: [] },
    { id: "s6m5", nombre: "TEORIA DE LA INFORMACION", creditos: 3, tipologia: "C", prereq: ["s5m4"], coreq: [] },

  ]},
  { nivel: 7, materias: [
    { id: "s7m1", nombre: "PRUEBS Y GESTION DE LA CONFIGURACION", creditos: 2, tipologia: "C", prereq: ["s5m3"], coreq: [] },
    { id: "s7m2", nombre: "FORMULACION Y EVALUACION DE PROYECTOS DE TI", creditos: 3, tipologia: "C", prereq: ["s6m1"], coreq: [] },
    { id: "s7m3", nombre: "SISTEMAS OPERATIVOS", creditos: 3, tipologia: "C", prereq: ["s6m2"], coreq: [] },
    { id: "s7m4", nombre: "REDES DE COMUNICACION", creditos: 3, tipologia: "C", prereq: ["s6m5"]coreq: [] },
    { id: "s7m5", nombre: "INTELIGENCIA ARTIFICIAL", creditos: 3, tipologia: "C", prereq: ["s4m6","s6m3"], coreq: [] },
    { id: "s7m6", nombre: "SEMIOTICA INFORMATICA", creditos: 2, tipologia: "C", prereq: ["s3m6", "s4m5"], coreq: [] },
    { id: "s7m7", nombre: "ETICA Y CIUDADANIA", creditos: 2, tipologia: "T", prereq: [] ,coreq: []},
 
  ]},
  { nivel: 8, materias: [
    { id: "s8m1", nombre: "PROGRAMACION DISTRIBUIDA Y PARALELA", creditos: 2, tipologia: "C", prereq: ["s7m4","s4m5"] },
    { id: "s8m2", nombre: "GESTION DE REDES Y SERVICIOS", creditos: 3, tipologia: "C", prereq: ["s7m4"] ,coreq: [] },
    { id: "s8m3", nombre: "MODELOS Y SIMULACION", creditos: 3, tipologia: "C", prereq: ["s6m4"] ,coreq: [] },
    { id: "s8m4", nombre: "GESTION DE PROYECTOS DE TI", creditos: 3, tipologia: "C", prereq: ["s7m2"]  ,coreq: []},
    { id: "s8m5", nombre: "CIENCIA, TECNOLOGIA E INNOVACION", creditos: 2, tipologia: "C", prereq: ["s5m4"] ,coreq: [] },

  ]},
  { nivel: 9, materias: [
    
];

// Créditos requeridos por tipología
const creditosRequeridos = {
  B: 39,
  C: 89,
  O: 8,
  T: 3,
  P: 8,
};

export default function MallaCurricular() {
  const [aprobadas, setAprobadas] = useState<string[]>([]);

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("materiasAprobadas") || "[]");
    setAprobadas(guardadas);
  }, []);

  useEffect(() => {
    localStorage.setItem("materiasAprobadas", JSON.stringify(aprobadas));
  }, [aprobadas]);

  const toggleMateria = (id) => {
  const materia = todasMaterias.find(m => m.id === id);
  const coreqs = materia?.coreq || [];

  setAprobadas(prev => {
    if (prev.includes(id)) {
      // Al desmarcar, también desmarca todos sus correquisitos
      return prev.filter(m => m !== id && !coreqs.includes(m));
    } else {
      // Al marcar, también marca todos sus correquisitos
      return [...new Set([...prev, id, ...coreqs])];
    }
  });
};
 const desbloqueada = (materia) => {
  const prereqOk = materia.prereq.every(p => aprobadas.includes(p));
  const coreqOk = (materia.coreq || []).every(p =>
    aprobadas.includes(p) || todasMaterias.find(m => m.id === p)
  );
  return prereqOk; // correq no bloquea el acceso, solo el deseleccionar
};

  const todasMaterias = semestres.flatMap(s => s.materias);
  const creditosAprobados = todasMaterias.filter(m => aprobadas.includes(m.id)).reduce((s, m) => s + m.creditos, 0);
  const creditosTotales = todasMaterias.reduce((s, m) => s + m.creditos, 0);
  const porcentaje = Math.round((creditosAprobados / creditosTotales) * 100);

  const creditosPorTipologia: { [key: string]: number } = {};
  Object.keys(creditosRequeridos).forEach(tipo => {
    creditosPorTipologia[tipo] = todasMaterias
      .filter(m => m.tipologia === tipo && aprobadas.includes(m.id))
      .reduce((s, m) => s + m.creditos, 0);
  });

  const colorPorTipologia: { [key: string]: string } = {
    B: "bg-blue-100 border-blue-400",
    C: "bg-purple-100 border-purple-400",
    T: "bg-green-100 border-green-400",
    P: "bg-red-100 border-red-400",
  };

  return (
  <div className="p-6 space-y-8">
    <h1 className="text-3xl font-bold text-center">
      Malla Curricular – Ingeniería Informática
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {semestres.map((semestre) => (
        <div
          key={semestre.nivel}
          className="bg-white rounded-2xl shadow-lg p-4"
        >
          <h2 className="text-xl font-semibold text-center mb-4">
            Semestre {semestre.nivel}
          </h2>

          <ul className="space-y-3">
            {semestre.materias.map((m) => (
              <li
                key={m.id}
                className={`flex justify-between items-center p-3 rounded-xl border text-gray-900 ${
                  desbloqueada(m)
                    ? colorPorTipologia[m.tipologia]
                    : "bg-gray-200 border-gray-400 opacity-50 text-gray-600"
                }`}
              >
                <div>
                  <p className="font-medium">{m.nombre}</p>
                  <p className="text-sm">
                    {m.creditos} créditos · {m.tipologia}
                  </p>
                </div>

                <input
                  type="checkbox"
                  disabled={!desbloqueada(m)}
                  checked={aprobadas.includes(m.id)}
                  onChange={() => toggleMateria(m.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);
}
