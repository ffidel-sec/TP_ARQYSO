import { useState, useEffect, useRef } from 'react'

const phases = [
  { key: 'create', icon: '◇', label: 'CREAR PROCESO', color: 'emerald' },
  { key: 'exec', icon: '▶', label: 'EJECUTAR PROCESO', color: 'sky' },
  { key: 'fault', icon: '⚡', label: 'FALLO DE PÁGINA', color: 'amber' },
  { key: 'end', icon: '■', label: 'TERMINAR PROCESO', color: 'rose' },
]

const phaseColors = {
  emerald: { bg: 'bg-emerald-950/60', border: 'border-emerald-700/50', text: 'text-emerald-400', glow: 'shadow-emerald-900/50', dot: 'bg-emerald-400' },
  sky: { bg: 'bg-sky-950/60', border: 'border-sky-700/50', text: 'text-sky-400', glow: 'shadow-sky-900/50', dot: 'bg-sky-400' },
  amber: { bg: 'bg-amber-950/60', border: 'border-amber-700/50', text: 'text-amber-400', glow: 'shadow-amber-900/50', dot: 'bg-amber-400' },
  rose: { bg: 'bg-rose-950/60', border: 'border-rose-700/50', text: 'text-rose-400', glow: 'shadow-rose-900/50', dot: 'bg-rose-400' },
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
    <div className={`rounded-xl border ${pc.border} ${pc.bg} backdrop-blur-sm overflow-hidden transition-all duration-500 ${isOpen ? `shadow-lg ${pc.glow} shadow-[0_0_30px_-12px]` : 'shadow-sm opacity-80 hover:opacity-100'}`}>
      <button onClick={onToggle} className="w-full flex items-center gap-3 px-5 py-4 cursor-pointer text-left group">
        <span className={`w-9 h-9 rounded-lg border ${pc.border} flex items-center justify-center text-lg ${pc.text} group-hover:scale-110 transition-transform`}>
          {phase.icon}
        </span>
        <span className="flex-1 font-mono text-sm font-bold tracking-wider text-slate-100">
          <span className={pc.text}>#{index + 1}</span> {phase.label}
        </span>
        <span className={`w-2 h-2 rounded-full transition-all duration-700 ${isOpen ? pc.dot : 'bg-slate-600'}`} />
        <svg className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="transition-all duration-500 ease-in-out overflow-hidden" style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 800}px` : '0px' }}>
        <div ref={contentRef} className="px-5 pb-5 pl-[3.75rem] space-y-3">
          {seccion?.items?.map((item, j) => (
            <div key={j} className={`flex items-start gap-3 transition-all duration-500 ${isOpen && j < visibleItems ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: `${j * 80}ms` }}>
              <span className={`font-mono text-[11px] ${pc.text} mt-0.5 flex-shrink-0 w-5`}>{String(j + 1).padStart(2, '0')}</span>
              <span className="font-mono text-[13px] text-slate-300 leading-relaxed">{item}</span>
            </div>
          ))}
          {isOpen && visibleItems < (seccion?.items?.length ?? 0) && (
            <div className="flex gap-1.5 pl-8">
              <span className={`w-1.5 h-1.5 rounded-full ${pc.dot} animate-pulse`} />
              <span className={`w-1.5 h-1.5 rounded-full ${pc.dot} animate-pulse`} style={{ animationDelay: '0.2s' }} />
              <span className={`w-1.5 h-1.5 rounded-full ${pc.dot} animate-pulse`} style={{ animationDelay: '0.4s' }} />
            </div>
          )}
          {isOpen && visibleItems >= (seccion?.items?.length ?? 0) && (
            <div className={`font-mono text-[11px] ${pc.text} pl-8 flex items-center gap-2`}>
              <span>OK</span>
              <span className="text-slate-600">—</span>
              <span className="text-slate-500">{seccion?.items?.length ?? 0} operaciones completadas</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ParticipacionSO({ data }) {
  const [openPhase, setOpenPhase] = useState(null)
  const [booted, setBooted] = useState(false)
  const [bootLine, setBootLine] = useState(0)

  const bootLines = [
    'SISTEMA DE MEMORIA VIRTUAL v3.6.1',
    'Inicializando MMU... OK',
    'Cargando tabla de procesos... OK',
    'Esperando instrucciones...',
    `Sistema listo — ${data.secciones?.length ?? 0} fases disponibles`,
  ]

  useEffect(() => {
    if (booted) return
    const timer = setInterval(() => {
      setBootLine((v) => {
        if (v >= bootLines.length - 1) { clearInterval(timer); setBooted(true); return v }
        return v + 1
      })
    }, 300)
    return () => clearInterval(timer)
  }, [booted])

  return (
    <div className="space-y-5">
      {/* Boot sequence */}
      <div className="rounded-xl border border-slate-700/60 bg-slate-950 p-5 shadow-2xl shadow-slate-900/80 font-mono">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_theme(colors.red.500)]" />
          <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_6px_theme(colors.yellow.500)]" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_theme(colors.emerald.500)]" />
          <span className="ml-2 text-slate-600 text-[10px] tracking-widest">OS MEMORY CONTROLLER — TERMINAL v1.0</span>
        </div>
        <div className="space-y-1">
          {bootLines.slice(0, bootLine + 1).map((line, i) => (
            <div key={i} className="flex items-start gap-3 animate-fade-in" style={{ animationDuration: '0.1s' }}>
              <span className="text-slate-700 text-[11px] mt-0.5 flex-shrink-0">[{String(i).padStart(2, '0')}:00]</span>
              <span className={`text-[13px] ${i === bootLines.length - 1 && !booted ? 'text-emerald-400' : 'text-slate-300'}`}>
                {line}
                {i === bootLines.length - 1 && !booted && <span className="ml-1 animate-pulse">▌</span>}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Introduction */}
      {booted && (
        <div className="rounded-xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm p-5 animate-fade-in-up">
          <p className="font-mono text-[13px] text-slate-300 leading-relaxed">
            <span className="text-indigo-400 font-bold">$</span> {data.introduccion}
          </p>
        </div>
      )}

      {/* Phases */}
      {booted && (
        <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
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
      )}

      {/* Key concepts */}
      {booted && data.conceptos && (
        <div className="rounded-xl border border-indigo-500/20 bg-slate-900/80 backdrop-blur-sm p-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="font-mono text-[10px] text-indigo-400 tracking-widest mb-4 flex items-center gap-2">
            <span>CONCEPTOS CLAVE</span>
            <span className="flex-1 border-t border-slate-800" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.conceptos.map((c, i) => (
              <div key={i} className="rounded-lg border border-indigo-800/30 bg-slate-950/60 p-3 font-mono text-xs hover:border-indigo-600/50 transition-colors">
                <div className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold text-[11px]">{c.nombre}</span>
                </div>
                <div className="mt-1.5 flex items-start gap-2">
                  <span className="text-slate-600 mt-0.5">→</span>
                  <span className="text-slate-300 leading-relaxed">{c.descripcion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
