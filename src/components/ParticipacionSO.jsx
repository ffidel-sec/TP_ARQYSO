import { useState, useEffect, useRef } from 'react'

const phases = [
  { key: 'create', icon: '◇', label: 'Crear proceso', color: 'emerald' },
  { key: 'exec', icon: '▶', label: 'Ejecutar proceso', color: 'sky' },
  { key: 'fault', icon: '⚡', label: 'Fallo de página', color: 'amber' },
  { key: 'end', icon: '■', label: 'Terminar proceso', color: 'rose' },
]

const phaseColors = {
  emerald: {
    badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/50',
    dot: 'bg-emerald-500',
    accent: 'text-emerald-600 dark:text-emerald-400',
    pill: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  },
  sky: {
    badge: 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-700/50',
    dot: 'bg-sky-500',
    accent: 'text-sky-600 dark:text-sky-400',
    pill: 'bg-sky-500/10 text-sky-700 dark:text-sky-300',
  },
  amber: {
    badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/50',
    dot: 'bg-amber-500',
    accent: 'text-amber-600 dark:text-amber-400',
    pill: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  },
  rose: {
    badge: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-700/50',
    dot: 'bg-rose-500',
    accent: 'text-rose-600 dark:text-rose-400',
    pill: 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
  },
}

function PhaseCard({ phase, seccion, index, isOpen, onToggle }) {
  const pc = phaseColors[phase.color]
  const contentRef = useRef(null)
  const [visibleItems, setVisibleItems] = useState(0)

  useEffect(() => {
    if (!isOpen) { setVisibleItems(0); return }
    const items = seccion?.items ?? []
    if (items.length === 0) return
    const timer = setInterval(() => {
      setVisibleItems((v) => {
        if (v >= items.length) { clearInterval(timer); return items.length }
        return v + 1
      })
    }, 350)
    return () => clearInterval(timer)
  }, [isOpen, seccion])

  return (
    <div className={`bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md ${isOpen ? 'shadow-md' : ''}`}>
      <button onClick={onToggle} className="w-full flex items-center gap-4 p-5 cursor-pointer text-left group transition-colors duration-200">
        <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform duration-200 ${pc.badge}`}>
          {phase.icon}
        </span>
        <span className="flex-1 text-base font-semibold text-slate-800 dark:text-slate-100 pr-4">
          <span className={`text-sm font-mono font-bold ${pc.accent} mr-2`}>#{index + 1}</span>
          {phase.label}
        </span>
        <svg
          className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-all duration-300 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="transition-all duration-500 ease-in-out overflow-hidden" style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 800}px` : '0px' }}>
        <div ref={contentRef} className="px-5 pb-5 pl-[4.25rem] space-y-3">
          {seccion?.items?.map((item, j) => (
            <div key={j} className={`flex items-start gap-3 transition-all duration-500 ${isOpen && j < visibleItems ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: `${j * 80}ms` }}>
              <span className={`w-1.5 h-1.5 rounded-full ${pc.dot} mt-2 flex-shrink-0`} />
              <span className="text-slate-600 dark:text-slate-300 leading-relaxed">{item}</span>
            </div>
          ))}
          {isOpen && visibleItems < (seccion?.items?.length ?? 0) && (
            <div className="flex gap-1.5 pl-7">
              <span className={`w-1.5 h-1.5 rounded-full ${pc.dot} animate-pulse`} />
              <span className={`w-1.5 h-1.5 rounded-full ${pc.dot} animate-pulse`} style={{ animationDelay: '0.2s' }} />
              <span className={`w-1.5 h-1.5 rounded-full ${pc.dot} animate-pulse`} style={{ animationDelay: '0.4s' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ParticipacionSO({ data }) {
  const [openPhase, setOpenPhase] = useState(null)

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 transition-colors animate-fade-in">
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

      {/* Phases */}
      <div className="space-y-3">
        {data.secciones?.map((sec, i) => (
          <PhaseCard
            key={i}
            phase={phases[i] ?? { key: `p${i}`, icon: '•', label: sec.titulo, color: 'slate' }}
            seccion={sec}
            index={i}
            isOpen={openPhase === i}
            onToggle={() => setOpenPhase(openPhase === i ? null : i)}
          />
        ))}
      </div>

      {/* Key concepts */}
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
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-indigo-100 dark:border-indigo-800/50 p-5 hover:shadow-md transition-all duration-200"
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
