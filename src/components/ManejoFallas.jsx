import { useState } from 'react'

const stepColors = [
  { bg: 'from-indigo-500 to-blue-600', ring: 'ring-indigo-200 dark:ring-indigo-800' },
  { bg: 'from-blue-500 to-cyan-600', ring: 'ring-blue-200 dark:ring-blue-800' },
  { bg: 'from-cyan-500 to-teal-600', ring: 'ring-cyan-200 dark:ring-cyan-800' },
  { bg: 'from-teal-500 to-green-600', ring: 'ring-teal-200 dark:ring-teal-800' },
  { bg: 'from-green-500 to-emerald-600', ring: 'ring-green-200 dark:ring-green-800' },
  { bg: 'from-emerald-500 to-lime-600', ring: 'ring-emerald-200 dark:ring-emerald-800' },
  { bg: 'from-yellow-500 to-amber-600', ring: 'ring-yellow-200 dark:ring-yellow-800' },
  { bg: 'from-orange-500 to-red-600', ring: 'ring-orange-200 dark:ring-orange-800' },
  { bg: 'from-red-500 to-rose-600', ring: 'ring-red-200 dark:ring-red-800' },
  { bg: 'from-rose-500 to-pink-600', ring: 'ring-rose-200 dark:ring-rose-800' },
]

export default function ManejoFallas({ data }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="space-y-8">
      <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 transition-colors">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Introducción
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
          {data.introduccion}
        </p>
      </section>

      <div className="md:hidden">
        {data.secciones?.map((sec, i) => {
          const color = stepColors[i % stepColors.length]
          const isHovered = hovered === i
          return (
            <div
              key={i}
              className="relative flex items-start gap-4 pb-6 animate-fade-in-up"
              style={{cursor: 'pointer'}}
              onClick={() => {}}
              style={{animationDelay: `${i * 0.06}s`}}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex flex-col items-center flex-shrink-0">
                <span className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${color.bg} text-white flex items-center justify-center font-bold text-xs shadow-sm ring-4 ${color.ring} transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
                  {i + 1}
                </span>
                {i < data.secciones.length - 1 && (
                  <div className="w-0.5 flex-1 min-h-[1rem] bg-gradient-to-b from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-full" />
                )}
              </div>
              <div className={`flex-1 bg-white dark:bg-slate-800/80 rounded-xl border transition-all duration-300 p-4 shadow-sm cursor-pointer ${isHovered ? 'border-indigo-300 dark:border-indigo-600 shadow-md -translate-y-0.5' : 'border-slate-200 dark:border-slate-700'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-block text-white text-[10px] font-bold px-2 py-0.5 rounded-md bg-gradient-to-r ${color.bg}`}>
                    Paso {i + 1}
                  </span>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{sec.titulo}</h3>
                </div>
                {sec.items && (
                  <ul className="space-y-1">
                    {sec.items.map((item, j) => (
                      <li key={j} className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="hidden md:block relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 -translate-x-1/2 rounded-full" />

        {data.secciones?.map((sec, i) => {
          const color = stepColors[i % stepColors.length]
          const isHovered = hovered === i
          const isLeft = i % 2 === 0

          return (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_1fr] items-start pb-8 animate-fade-in-up"
              style={{animationDelay: `${i * 0.06}s`, cursor: 'pointer'}}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {}}
            >
              <div className={`flex ${isLeft ? 'justify-end pr-8' : 'pl-8'}`}>
                {isLeft && (
                  <div className={`w-full max-w-md bg-white dark:bg-slate-800/80 rounded-xl border transition-all duration-300 p-5 shadow-sm cursor-pointer ${
                    isHovered
                      ? 'border-indigo-300 dark:border-indigo-600 shadow-lg -translate-y-1'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`inline-block text-white text-[11px] font-bold px-2.5 py-1 rounded-lg bg-gradient-to-r ${color.bg} transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}>
                        Paso {i + 1}
                      </span>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-[15px]">{sec.titulo}</h3>
                    </div>
                    {sec.items && (
                      <ul className="space-y-1.5">
                        {sec.items.map((item, j) => (
                          <li key={j} className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center relative z-10">
                <span className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${color.bg} text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ${color.ring} transition-all duration-300 ${isHovered ? 'scale-110 shadow-lg' : ''}`}>
                  {i + 1}
                </span>
              </div>

              <div className={`flex ${isLeft ? 'pl-8' : 'justify-end pr-8'}`}>
                {!isLeft && (
                  <div className={`w-full max-w-md bg-white dark:bg-slate-800/80 rounded-xl border transition-all duration-300 p-5 shadow-sm cursor-pointer ${
                    isHovered
                      ? 'border-indigo-300 dark:border-indigo-600 shadow-lg -translate-y-1'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`inline-block text-white text-[11px] font-bold px-2.5 py-1 rounded-lg bg-gradient-to-r ${color.bg} transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}>
                        Paso {i + 1}
                      </span>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-[15px]">{sec.titulo}</h3>
                    </div>
                    {sec.items && (
                      <ul className="space-y-1.5">
                        {sec.items.map((item, j) => (
                          <li key={j} className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {data.conceptos && (
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 p-6 md:p-8 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl" />
          <h2 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-5 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Conceptos clave
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 relative">
            {data.conceptos.map((c, i) => (
              <div
                key={i}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-indigo-100 dark:border-indigo-800/50 p-5 hover:shadow-md transition-all duration-200 animate-fade-in-up"
                style={{animationDelay: `${i * 0.1}s`}}
              >
                <span className="inline-block text-white text-xs font-bold px-2.5 py-1 rounded-lg mb-3 bg-gradient-to-r from-indigo-500 to-purple-600">
                  {c.nombre}
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {c.descripcion}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
