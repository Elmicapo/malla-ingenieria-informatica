"use client";
import { useState, useEffect } from "react";

// Datos completos de semestres y materias
const semestres = [
  { nivel: 1, materias: [
    { id: "s1m1", nombre: "Lengua Materna", creditos: 2, tipologia: "B", prereq: [] },
    { id: "s1m2", nombre: "Cálculo Diferencial", creditos: 3, tipologia: "B", prereq: [] },
    { id: "s1m3", nombre: "Introducción al Área Profesional", creditos: 3, tipologia: "C", prereq: [] },
    { id: "s1m4", nombre: "Algoritmos y Programación I", creditos: 4, tipologia: "C", prereq: [] },
    { id: "s1m5", nombre: "Matemáticas Discretas I", creditos: 4, tipologia: "B", prereq: [] },
    { id: "s1m6", nombre: "Humanidades I (Cultura Contemporánea)", creditos: 2, tipologia: "T", prereq: [] },
  ]},
  { nivel: 2, materias: [
    { id: "s2m1", nombre: "Física del Movimiento", creditos: 4, tipologia: "B", prereq: [] },
    { id: "s2m2", nombre: "Cálculo Integral", creditos: 3, tipologia: "B", prereq: ["s1m2"] },
    { id: "s2m3", nombre: "Geometría Vectorial", creditos: 3, tipologia: "B", prereq: [] },
    { id: "s2m4", nombre: "Algoritmos y Programación II", creditos: 4, tipologia: "C", prereq: ["s1m4"] },
    { id: "s2m5", nombre: "Matemáticas Discretas II", creditos: 4, tipologia: "B", prereq: ["s1m5"] },
    { id: "s2m6", nombre: "Deporte, Arte y Recreación", creditos: 1, tipologia: "T", prereq: [] },
  ]},
  { nivel: 3, materias: [
    { id: "s3m1", nombre: "Electricidad y Magnetismo", creditos: 4, tipologia: "B", prereq: ["s2m1"] },
    { id: "s3m2", nombre: "Álgebra Lineal", creditos: 3, tipologia: "B", prereq: ["s2m3"] },
    { id: "s3m3", nombre: "Cálculo de Varias Variables", creditos: 3, tipologia: "B", prereq: ["s2m2"] },
    { id: "s3m4", nombre: "Algoritmos y Programación III", creditos: 3, tipologia: "C", prereq: ["s2m4"] },
    { id: "s3m5", nombre: "Taller de Lenguajes de Programación I", creditos: 2, tipologia: "C", prereq: ["s2m4"] },
    { id: "s3m6", nombre: "Semiótica Informática", creditos: 2, tipologia: "C", prereq: ["s1m3"] },
    { id: "s3m7", nombre: "Pedagogía Constitucional", creditos: 1, tipologia: "T", prereq: [] },
  ]},
  { nivel: 4, materias: [
    { id: "s4m1", nombre: "Ecuaciones Diferenciales", creditos: 3, tipologia: "B", prereq: ["s3m3"] },
    { id: "s4m2", nombre: "Electrónica Digital", creditos: 4, tipologia: "C", prereq: ["s3m1"] },
    { id: "s4m3", nombre: "Algoritmos y Programación IV", creditos: 3, tipologia: "C", prereq: ["s3m4"] },
    { id: "s4m4", nombre: "Análisis de Software", creditos: 4, tipologia: "C", prereq: ["s3m5","s3m6"] },
    { id: "s4m5", nombre: "Bases de Datos I", creditos: 4, tipologia: "C", prereq: ["s2m5"] },
  ]},
  { nivel: 5, materias: [
    { id: "s5m1", nombre: "Taller de Lenguajes de Programación II", creditos: 2, tipologia: "C", prereq: ["s4m3"] },
    { id: "s5m2", nombre: "Diseño de Software", creditos: 4, tipologia: "C", prereq: ["s4m4","s4m5"] },
    { id: "s5m3", nombre: "Arquitectura de Hardware", creditos: 4, tipologia: "C", prereq: ["s4m2"] },
    { id: "s5m4", nombre: "Teoría de Lenguajes y Compiladores", creditos: 4, tipologia: "C", prereq: ["s2m5","s3m5"] },
    { id: "s5m5", nombre: "Estadística Aplicada", creditos: 4, tipologia: "C", prereq: ["s2m2"] },
  ]},
  { nivel: 6, materias: [
    { id: "s6m1", nombre: "Proyecto de Construcción de Software", creditos: 2, tipologia: "C", prereq: ["s4m3","s5m2"] },
    { id: "s6m2", nombre: "Bases de Datos II", creditos: 3, tipologia: "C", prereq: ["s4m5"] },
    { id: "s6m3", nombre: "Emprendimiento Empresarial TI", creditos: 2, tipologia: "C", prereq: [] },
    { id: "s6m4", nombre: "Teoría de la Información", creditos: 3, tipologia: "C", prereq: ["s5m5"] },
    { id: "s6m5", nombre: "Análisis Numérico", creditos: 4, tipologia: "C", prereq: ["s3m2","s4m1"] },
    { id: "s6m6", nombre: "Sistemas Operativos", creditos: 4, tipologia: "C", prereq: ["s5m3"] },
  ]},
  { nivel: 7, materias: [
    { id: "s7m1", nombre: "Inteligencia Artificial", creditos: 2, tipologia: "C", prereq: ["s4m3","s6m5"] },
    { id: "s7m2", nombre: "Pruebas y Gestión de la Configuración", creditos: 2, tipologia: "C", prereq: ["s6m1"] },
    { id: "s7m3", nombre: "Redes de Comunicaciones", creditos: 4, tipologia: "C", prereq: ["s6m6"] },
    { id: "s7m4", nombre: "Investigación de Operaciones", creditos: 4, tipologia: "C", prereq: ["s3m2","s5m5"] },
    { id: "s7m5", nombre: "Metodología de la Investigación", creditos: 2, tipologia: "C", prereq: ["s5m5"] },
    { id: "s7m6", nombre: "Sistemas y Organizaciones", creditos: 2, tipologia: "C", prereq: [] },
    { id: "s7m7", nombre: "Ecología", creditos: 1, tipologia: "T", prereq: [] },
  ]},
  { nivel: 8, materias: [
    { id: "s8m1", nombre: "Programación Distribuida y Paralela", creditos: 2, tipologia: "C", prereq: ["s7m3","s5m1"] },
    { id: "s8m2", nombre: "Proyecto Integrador", creditos: 2, tipologia: "C", prereq: ["s6m1"] },
    { id: "s8m3", nombre: "Formulación y Evaluación de Proyectos TI", creditos: 3, tipologia: "C", prereq: ["s6m1","s7m6"] },
    { id: "s8m4", nombre: "Gestión de Redes y Servicios", creditos: 3, tipologia: "C", prereq: ["s7m3"] },
    { id: "s8m5", nombre: "Modelos y Simulación", creditos: 3, tipologia: "C", prereq: ["s7m4"] },
    { id: "s8m6", nombre: "Humanidades II (Cultura Política)", creditos: 2, tipologia: "B", prereq: [] },
  ]},
  { nivel: 9, materias: [
    { id: "s9m1", nombre: "Gestión de Proyectos de TI", creditos: 3, tipologia: "C", prereq: ["s8m3"] },
    { id: "s9m2", nombre: "Ética", creditos: 1, tipologia: "T", prereq: [] },
  ]},
  { nivel: 10, materias: [
    { id: "s10m1", nombre: "Trabajo de Grado", creditos: 7, tipologia: "P", prereq: ["s9m1","s7m5"] },
  ]},
];

// Créditos requeridos por tipología
const creditosRequeridos = {
  B: 32,
  C: 109,
  T: 4,
  P: 19,
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

  const toggleMateria = (id: string) => {
    setAprobadas(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const desbloqueada = (materia: { prereq: string[] }) =>
    materia.prereq.every(p => aprobadas.includes(p));

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