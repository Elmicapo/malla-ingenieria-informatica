"use client";
import { useEffect, useMemo, useState } from "react";

/* ================= TIPOS ================= */
type Tipologia = "B" | "C" | "T" | "P" | "L" | "O";

const nombreTipologia: Record<Tipologia, string> = {
  B: "Básicas",
  C: "Disciplinarias – Profesionales",
  L: "Electivas Libres",
  O: "Electivas de Profundización",
  P: "Requisitos de Grado",
  T: "Obligatorias de Ley",
};

type Materia = {
  id: string;
  nombre: string;
  creditos: number;
  tipologia: Tipologia;
  prereq: string[];
};

type Semestre = {
  nivel: number;
  materias: Materia[];
};

/* ================= CRÉDITOS REQUERIDOS ================= */
const creditosRequeridos: Record<Tipologia, number> = {
  B: 32,
  C: 109,
  L: 6,
  O: 8,
  P: 19,
  T: 4,
};

/* ================= COLORES FUERTES ================= */
const colores: Record<Tipologia, string> = {
  B: "bg-blue-100 border-blue-600 text-gray-900",
  C: "bg-purple-100 border-purple-600 text-gray-900",
  T: "bg-green-100 border-green-600 text-gray-900",
  P: "bg-red-100 border-red-600 text-gray-900",
  L: "bg-yellow-100 border-yellow-600 text-gray-900",
  O: "bg-pink-100 border-pink-600 text-gray-900",
};


/* ================= DATOS ================= */

const semestres: Semestre[] = [
  { nivel: 1, materias: [
    { id: "s1m1", nombre: "Lengua Materna", creditos: 2, tipologia: "B", prereq: [] },
    { id: "s1m2", nombre: "Cálculo Diferencial", creditos: 3, tipologia: "B", prereq: [] },
    { id: "s1m3", nombre: "Introducción al Área Profesional", creditos: 3, tipologia: "C", prereq: [] },
    { id: "s1m4", nombre: "Algoritmos y Programación I", creditos: 4, tipologia: "C", prereq: [] },
    { id: "s1m5", nombre: "Matemáticas Discretas I", creditos: 4, tipologia: "C", prereq: [] },
    { id: "s1m6", nombre: "Humanidades I", creditos: 2, tipologia: "T", prereq: [] },
  ]},
  { nivel: 2, materias: [
    { id: "s2m1", nombre: "Física del Movimiento", creditos: 4, tipologia: "B", prereq: [] },
    { id: "s2m2", nombre: "Cálculo Integral", creditos: 3, tipologia: "B", prereq: ["s1m2"] },
    { id: "s2m3", nombre: "Geometría Vectorial", creditos: 3, tipologia: "B", prereq: [] },
    { id: "s2m4", nombre: "Algoritmos y Programación II", creditos: 4, tipologia: "C", prereq: ["s1m4"] },
    { id: "s2m5", nombre: "Matemáticas Discretas II", creditos: 4, tipologia: "C", prereq: ["s1m5"] },
    { id: "s2m6", nombre: "Deporte, Arte y Recreación", creditos: 1, tipologia: "T", prereq: [] },
    { id: "ing1", nombre: "Inglés I", creditos: 4, tipologia: "P", prereq: [] },
  ]},
  { nivel: 3, materias: [
{ id: "s3m1", nombre: "Electricidad y Magnetismo", creditos: 4, tipologia: "B", prereq: ["s2m1"] },
{ id: "s3m2", nombre: "Álgebra Lineal", creditos: 3, tipologia: "B", prereq: ["s2m3"] },
{ id: "s3m3", nombre: "Cálculo de varias variables", creditos: 3, tipologia: "B", prereq: ["s2m2"] },
{ id: "s3m4", nombre: "Algoritmos y Programación III", creditos: 3, tipologia: "C", prereq: ["s2m4"] },
{ id: "s3m5", nombre: "Taller de Lenguajes de Programación I", creditos: 2, tipologia: "C", prereq: ["s2m4"] },
{ id: "s3m6", nombre: "Semiótica Informática", creditos: 2, tipologia: "C", prereq: ["s1m3"] },
{ id: "s3m7", nombre: "Pedagogía Constitucional", creditos: 1, tipologia: "T", prereq: [] },
]},
{ nivel: 4, materias: [
{ id: "s4m1", nombre: "Ecuaciones Diferenciales", creditos: 3, tipologia: "B", prereq: ["s3m3"] },
{ id: "s4m2", nombre: "Electrónica Digital", creditos: 4, tipologia: "C", prereq: ["s3m1"] },
{ id: "s4m3", nombre: "Algoritmos y Programación IV", creditos: 3, tipologia: "C", prereq: ["s3m4"] },
{ id: "s4m4", nombre: "Análisis de Software", creditos: 4, tipologia: "C", prereq: ["s3m5", "s3m6"] },
{ id: "s4m5", nombre: "Bases de Datos I", creditos: 4, tipologia: "C", prereq: ["s2m5"] },
{ id: "ing2", nombre: "Inglés II", creditos: 4, tipologia: "P", prereq: ["ing1"] },
]},
{ nivel: 5, materias: [
{ id: "s5m1", nombre: "Taller de Lenguajes de Programación II", creditos: 2, tipologia: "C", prereq: ["s4m3"] },
{ id: "s5m2", nombre: "Diseño de Software", creditos: 4, tipologia: "C", prereq: ["s4m4", "s4m5"] },
{ id: "s5m3", nombre: "Arquitectura de Hardware", creditos: 4, tipologia: "C", prereq: ["s4m2"] },
{ id: "s5m4", nombre: "Teoria de lenguajes y Compiladores", creditos: 4, tipologia: "C", prereq: ["s3m5", "s2-5"] },
{ id: "s5m5", nombre: "Estadística Aplicada", creditos: 4, tipologia: "C", prereq: ["s2m2"] },
{ id: "ing3", nombre: "Inglés III", creditos: 4, tipologia: "P", prereq: ["ing2"] },
]},
{ nivel: 6, materias: [
{ id: "s6m1", nombre: "Proyecto de Construccion de Software", creditos: 2, tipologia: "C", prereq: ["s5m2", "s4m3"] },
{ id: "s6m2", nombre: "Bases de Datos II", creditos: 3, tipologia: "C", prereq: ["s4m5"] },
{ id: "s6m3", nombre: "Emprendimiento Empresarial TI", creditos: 2, tipologia: "C", prereq: [] },
{ id: "s6m4", nombre: "Teoría de la Información", creditos: 3, tipologia: "C", prereq: ["s5m5"] },
{ id: "s6m5", nombre: "Análisis Numérico", creditos: 4, tipologia: "C", prereq: ["s3m2", "s4m1"] },
{ id: "s6m6", nombre: "Sistemas Operativos", creditos: 4, tipologia: "C", prereq: ["s5m3"] },
]},
{ nivel: 7, materias: [
{ id: "s7m1", nombre: "Inteligencia Artificial", creditos: 2, tipologia: "C", prereq: ["s6m5", "s4m3"] },
{ id: "s7m2", nombre: "Pruebas y gestion de de la configuración", creditos: 2, tipologia: "C", prereq: ["s6m1"] },
{ id: "s7m3", nombre: "Redes de Comunicaciones", creditos: 4, tipologia: "C", prereq: ["s6m4"] },
{ id: "s7m4", nombre: "Investigación de Operaciones", creditos: 4, tipologia: "C", prereq: ["s3m2", "s5m5"] },
{ id: "s7m5", nombre: "Metodología de la Investigación", creditos: 2, tipologia: "C", prereq: ["s5m5"] },
{ id: "s7m6", nombre: "Sistemas y Organizaciones", creditos: 2, tipologia: "C", prereq: [] },
{ id: "s7m7", nombre: "Ecología", creditos: 1, tipologia: "T", prereq: [] },
{ id: "l1", nombre: "Electiva Libre I", creditos: 2, tipologia: "L", prereq: [] },
]},
{ nivel: 8, materias: [
{ id: "s8m1", nombre: "Programación Distribuida y Paralela", creditos: 2, tipologia: "C", prereq: ["s7m3", "s5m1"] },
{ id: "s8m2", nombre: "Proyecto Integrador", creditos: 2, tipologia: "C", prereq: ["s6m1"] },
{ id: "s8m3", nombre: "Formulación y Evaluación de Proyectos TI", creditos: 3, tipologia: "C", prereq: ["s7m6", "s6m1"] },
{ id: "s8m4", nombre: "Gestión de Redes y servicios", creditos: 3, tipologia: "C", prereq: ["s7m3"] },
{ id: "s8m5", nombre: "Modelos y Simulación", creditos: 3, tipologia: "C", prereq: ["s7m4"] },
{ id: "s8m6", nombre: "Humanidades II", creditos: 2, tipologia: "B", prereq: [] },
{ id: "l2", nombre: "Electiva Libre II", creditos: 2, tipologia: "L", prereq: ["l1"] }, 
{ id: "o1", nombre: "Profundización I", creditos: 3, tipologia: "O", prereq: [] },
    
]},
{ nivel: 9, materias: [
{ id: "s9m1", nombre: "Gestión de Proyectos TI", creditos: 3, tipologia: "C", prereq: ["s8m3"] },
{ id: "s9m2", nombre: "Ética", creditos: 1, tipologia: "T", prereq: [] },
{ id: "l3", nombre: "Electiva Libre III", creditos: 2, tipologia: "L", prereq: ["l2"] },
{ id: "o2", nombre: "Profundización II", creditos: 3, tipologia: "O", prereq: ["o1"] },
    
]},
{ nivel: 10, materias: [
{ id: "s10m1", nombre: "Trabajo de Grado", creditos: 7, tipologia: "P", prereq: ["s9m1", "s7m5"] },
 { id: "o3", nombre: "Profundización III", creditos: 2, tipologia: "O", prereq: ["o2"] },
]},

];
/* ================= COMPONENTE ================= */
export default function MallaCurricular() {
  const [aprobadas, setAprobadas] = useState<string[]>([]);

  /* ---------- Persistencia ---------- */
  useEffect(() => {
    const data = localStorage.getItem("malla_aprobadas");
    if (data) setAprobadas(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("malla_aprobadas", JSON.stringify(aprobadas));
  }, [aprobadas]);

  /* ---------- Helpers ---------- */
  const desbloqueada = (m: Materia) =>
    m.prereq.every((p) => aprobadas.includes(p));

  const toggle = (id: string) => {
    setAprobadas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ---------- Cálculos ---------- */
  const todas = semestres.flatMap((s) => s.materias);

  const creditosPorTipologia = useMemo(() => {
    const base: Record<Tipologia, number> = {
      B: 0, C: 0, T: 0, P: 0, L: 0, O: 0,
    };
    todas.forEach((m) => {
      if (aprobadas.includes(m.id)) {
        base[m.tipologia] += m.creditos;
      }
    });
    return base;
  }, [aprobadas, todas]);

  const creditosTotales = Object.values(creditosRequeridos).reduce((a, b) => a + b, 0);
  const creditosAprobados = Object.values(creditosPorTipologia).reduce((a, b) => a + b, 0);
  const progreso = Math.round((creditosAprobados / creditosTotales) * 100);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
        Malla Curricular – Ingeniería Informática
      </h1>

      {/* ===== CUADRO POR TIPOLOGÍA ===== */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Créditos por Tipología
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {(Object.keys(creditosRequeridos) as Tipologia[]).map((t) => (
            <div key={t} className={`p-4 rounded-xl border-2 ${colores[t]}`}>
              <p className="font-bold">
  {t} – {nombreTipologia[t]}
</p>
              <p>Aprobados: {creditosPorTipologia[t]}</p>
              <p>Requeridos: {creditosRequeridos[t]}</p>
              <p className="font-semibold">
                Faltan: {Math.max(
                  creditosRequeridos[t] - creditosPorTipologia[t],
                  0
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== BARRA DE PROGRESO ===== */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="w-full h-5 bg-gray-300 rounded-full">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all"
            style={{ width: `${progreso}%` }}
          />
        </div>
        <p className="text-center mt-2 font-semibold text-gray-900">
          Progreso total: {progreso}%
        </p>
      </div>

      {/* ===== SEMESTRES (PC GRID) ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {semestres.map((s) => (
          <div key={s.nivel} className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-900">
              Semestre {s.nivel}
            </h3>

            {s.materias.map((m) => {
              const activa = aprobadas.includes(m.id);
              const ok = desbloqueada(m);

              return (
                <div
                  key={m.id}
                  className={`p-3 mb-3 rounded-xl border-2 transition
                    ${ok ? colores[m.tipologia] : "bg-gray-200 border-gray-400 text-gray-700"}
                    ${activa ? "scale-105 shadow-md" : ""}
                  `}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{m.nombre}</p>
                      <p className="text-sm">
                        {m.creditos} créditos · {m.tipologia}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={activa}
                      disabled={!ok}
                      onChange={() => toggle(m.id)}
                      className="w-5 h-5"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}


