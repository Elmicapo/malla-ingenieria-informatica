"use client";
import { useEffect, useMemo, useState } from "react";

/* ================= TIPOS ================= */
type Tipologia = "B" | "C" | "T" | "P" | "O";

const nombreTipologia: Record<Tipologia, string> = {
  B: "Básicas",
  C: "Disciplinarias – Profesionales",
  O: "Electivas del Plan - Líneas Profundización",
  P: "Requisitos de Grado",
  T: "Obligatorias de Ley",
};

type Materia = {
  id: string;
  nombre: string;
  creditos: number;
  tipologia: Tipologia;
  prereq: string[];
  coreq: string[];
};

type Semestre = {
  nivel: number;
  materias: Materia[];
};

/* ================= CRÉDITOS REQUERIDOS ================= */
const creditosRequeridos: Record<Tipologia, number> = {
  B: 39,
  C: 89,
  O: 8,
  P: 8,
  T: 3,
};

/* ================= COLORES POR TIPOLOGÍA ================= */
const colores: Record<Tipologia, string> = {
  B: "bg-blue-100 border-blue-600 text-gray-900",
  C: "bg-purple-100 border-purple-600 text-gray-900",
  T: "bg-green-100 border-green-600 text-gray-900",
  P: "bg-red-100 border-red-600 text-gray-900",
  O: "bg-pink-100 border-pink-600 text-gray-900",
};

/* ================= DATOS ================= */
const semestres: Semestre[] = [
  {
    nivel: 1,
    materias: [
      { id: "s1m1", nombre: "MATEMATICAS", creditos: 3, tipologia: "B", prereq: [], coreq: [] },
      { id: "s1m2", nombre: "HABILIDADES COMUNICATIVAS I", creditos: 2, tipologia: "B", prereq: [], coreq: [] },
      { id: "s1m3", nombre: "HUMANIDADES I", creditos: 2, tipologia: "B", prereq: [], coreq: [] },
      { id: "s1m4", nombre: "ALGORITMOS Y PROGRAMACION I", creditos: 4, tipologia: "C", prereq: [], coreq: [] },
      { id: "s1m5", nombre: "MATEMATICAS DISCRETAS", creditos: 3, tipologia: "C", prereq: [], coreq: [] },
      { id: "s1m6", nombre: "INTRODUCCION AL AREA PROFESIONAL", creditos: 2, tipologia: "C", prereq: [], coreq: [] },
    ],
  },
  {
    nivel: 2,
    materias: [
      { id: "s2m1", nombre: "GEOMETRIA VECTORIAL", creditos: 3, tipologia: "B", prereq: [], coreq: [] },
      { id: "s2m2", nombre: "CALCULO DIFERENCIAL", creditos: 3, tipologia: "B", prereq: ["s1m1"], coreq: [] },
      { id: "s2m3", nombre: "FISICA DEL MOVIMIENTO", creditos: 3, tipologia: "B", prereq: ["s1m1"], coreq: ["s2m4"] },
      { id: "s2m4", nombre: "LABORATORIO DE FISICA DEL MOVIMIENTO", creditos: 1, tipologia: "B", prereq: [], coreq: ["s2m3"] },
      { id: "s2m5", nombre: "HABILIDADES COMUNICATIVAS II", creditos: 2, tipologia: "B", prereq: ["s1m2"], coreq: [] },
      { id: "s2m6", nombre: "ALGORITMOS Y PROGRAMACION II", creditos: 4, tipologia: "C", prereq: ["s1m4"], coreq: [] },
      { id: "s2m7", nombre: "DEPORTE, ARTE Y RECREACION", creditos: 1, tipologia: "T", prereq: [], coreq: [] },
    ],
  },
  {
    nivel: 3,
    materias: [
      { id: "s3m1", nombre: "HUMANIDADES II", creditos: 2, tipologia: "B", prereq: ["s1m3"], coreq: [] },
      { id: "s3m2", nombre: "CALCULO INTEGRAL", creditos: 3, tipologia: "B", prereq: ["s2m2"], coreq: [] },
      { id: "s3m3", nombre: "ALGEBRA LINEAL", creditos: 3, tipologia: "B", prereq: ["s2m1"], coreq: [] },
      { id: "s3m4", nombre: "ALGORITMOS Y PROGRAMACION III", creditos: 3, tipologia: "C", prereq: ["s2m6"], coreq: [] },
      { id: "s3m5", nombre: "TALLER DE LENGUAJES DE PROGRAMACION I", creditos: 3, tipologia: "C", prereq: ["s2m6"], coreq: [] },
      { id: "s3m6", nombre: "BASES DE DATOS I", creditos: 3, tipologia: "C", prereq: ["s1m5"], coreq: [] },
    ],
  },
  {
    nivel: 4,
    materias: [
      { id: "s4m1", nombre: "CALCULO DE VARIAS VARIABLES", creditos: 3, tipologia: "B", prereq: ["s3m2"], coreq: [] },
      { id: "s4m2", nombre: "ESTADISTICAS", creditos: 3, tipologia: "B", prereq: ["s3m2"], coreq: [] },
      { id: "s4m3", nombre: "PROGRAMACION LINEAL", creditos: 3, tipologia: "B", prereq: ["s3m3"], coreq: [] },
      { id: "s4m4", nombre: "ANALISIS DE SOFTWARE", creditos: 3, tipologia: "C", prereq: ["s3m5"], coreq: [] },
      { id: "s4m5", nombre: "TALLER DE LENGUAJES DE PROGRAMACION II", creditos: 3, tipologia: "C", prereq: ["s3m5"], coreq: ["s4m6"] },
      { id: "s4m6", nombre: "ALGORITMOS Y PROGRAMACION IV", creditos: 3, tipologia: "C", prereq: ["s3m4"], coreq: ["s4m5"] },
    ],
  },
  {
    nivel: 5,
    materias: [
      { id: "s5m1", nombre: "ECUACIONES DIFERENCIALES", creditos: 3, tipologia: "B", prereq: ["s4m1"], coreq: [] },
      { id: "s5m2", nombre: "DISEÑO DE SOFTWARE", creditos: 3, tipologia: "C", prereq: ["s4m4", "s3m6"], coreq: [] },
      { id: "s5m3", nombre: "BASES DE DATOS II", creditos: 3, tipologia: "C", prereq: ["s3m6"], coreq: [] },
      { id: "s5m4", nombre: "ESTADISTICA INFERENCIAL", creditos: 3, tipologia: "C", prereq: ["s4m2"], coreq: [] },
      { id: "s5m5", nombre: "FUNDAMENTOS DE CIRCUITOS Y DISPOSITIVOS ELECTRONICOS", creditos: 3, tipologia: "C", prereq: ["s2m3", "s2m4"], coreq: [] },
    ],
  },
  {
    nivel: 6,
    materias: [
      { id: "s6m1", nombre: "PROYECTO INTEGRADOR", creditos: 2, tipologia: "C", prereq: ["s5m2"], coreq: [] },
      { id: "s6m2", nombre: "ELECTRONICA DIGITAL Y ARQUITECTURA DE HARDWARE", creditos: 3, tipologia: "C", prereq: ["s5m5"], coreq: [] },
      { id: "s6m3", nombre: "METODOS NUMERICOS", creditos: 3, tipologia: "C", prereq: ["s3m3", "s5m1"], coreq: [] },
      { id: "s6m4", nombre: "INVESTIGACION DE OPERACIONES", creditos: 3, tipologia: "C", prereq: ["s3m5", "s5m4"], coreq: [] },
      { id: "s6m5", nombre: "TEORIA DE LA INFORMACION", creditos: 3, tipologia: "C", prereq: ["s5m4"], coreq: [] },
    ],
  },
  {
    nivel: 7,
    materias: [
      { id: "s7m1", nombre: "PRUEBAS Y GESTION DE LA CONFIGURACION", creditos: 2, tipologia: "C", prereq: ["s5m3"], coreq: [] },
      { id: "s7m2", nombre: "FORMULACION Y EVALUACION DE PROYECTOS DE TI", creditos: 3, tipologia: "C", prereq: ["s6m1"], coreq: [] },
      { id: "s7m3", nombre: "SISTEMAS OPERATIVOS", creditos: 3, tipologia: "C", prereq: ["s6m2"], coreq: [] },
      { id: "s7m4", nombre: "REDES DE COMUNICACION", creditos: 3, tipologia: "C", prereq: ["s6m5"], coreq: [] },
      { id: "s7m5", nombre: "INTELIGENCIA ARTIFICIAL", creditos: 3, tipologia: "C", prereq: ["s4m6", "s6m3"], coreq: [] },
      { id: "s7m6", nombre: "SEMIOTICA INFORMATICA", creditos: 2, tipologia: "C", prereq: ["s3m6", "s4m5"], coreq: [] },
      { id: "s7m7", nombre: "ETICA Y CIUDADANIA", creditos: 2, tipologia: "T", prereq: [], coreq: [] },
    ],
  },
  {
    nivel: 8,
    materias: [
      { id: "s8m1", nombre: "PROGRAMACION DISTRIBUIDA Y PARALELA", creditos: 2, tipologia: "C", prereq: ["s7m4", "s4m5"], coreq: [] },
      { id: "s8m2", nombre: "GESTION DE REDES Y SERVICIOS", creditos: 3, tipologia: "C", prereq: ["s7m4"], coreq: [] },
      { id: "s8m3", nombre: "MODELOS Y SIMULACION", creditos: 3, tipologia: "C", prereq: ["s6m4"], coreq: [] },
      { id: "s8m4", nombre: "GESTION DE PROYECTOS DE TI", creditos: 3, tipologia: "C", prereq: ["s7m2"], coreq: [] },
      { id: "s8m5", nombre: "CIENCIA, TECNOLOGIA E INNOVACION", creditos: 2, tipologia: "C", prereq: ["s5m4"], coreq: [] },
    ],
  },
  {
    nivel: 9,
    materias: [
      { id: "s9m1", nombre: "TRABAJO DE GRADO", creditos: 8, tipologia: "P", prereq: ["s8m5", "s8m4"], coreq: [] },
    ],
  },
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
  const todas = semestres.flatMap((s) => s.materias);

  const desbloqueada = (m: Materia) =>
    m.prereq.every((p) => aprobadas.includes(p));

  /* Toggle con lógica de correquisitos */
  const toggle = (id: string) => {
    const materia = todas.find((m) => m.id === id);
    const coreqs = materia?.coreq ?? [];

    setAprobadas((prev) => {
      if (prev.includes(id)) {
        // Desmarcar: también desmarca correquisitos
        return prev.filter((x) => x !== id && !coreqs.includes(x));
      } else {
        // Marcar: también marca correquisitos
        return [...new Set<string>([...prev, id, ...coreqs])];
      }
    });
  };

  /* ---------- Cálculos ---------- */
  const creditosPorTipologia = useMemo(() => {
    const base: Record<Tipologia, number> = { B: 0, C: 0, T: 0, P: 0, O: 0 };
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
              <p className="font-bold">{t} – {nombreTipologia[t]}</p>
              <p>Aprobados: {creditosPorTipologia[t]}</p>
              <p>Requeridos: {creditosRequeridos[t]}</p>
              <p className="font-semibold">
                Faltan: {Math.max(creditosRequeridos[t] - creditosPorTipologia[t], 0)}
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

      {/* ===== SEMESTRES ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {semestres.map((s) => (
          <div key={s.nivel} className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-900">
              Semestre {s.nivel}
            </h3>

            {s.materias.map((m) => {
              const activa = aprobadas.includes(m.id);
              const ok = desbloqueada(m);
              const tieneCoreq = m.coreq.length > 0;

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
                      {tieneCoreq && (
                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                          correq
                        </span>
                      )}
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
