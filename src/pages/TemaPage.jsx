import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { temas } from '../data/temas'
import { contenido } from '../data/contenido'
import FiguraSegmentos from '../components/FiguraSegmentos'

const topicColors = [
  'from-indigo-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-sky-500 to-blue-600',
  'from-violet-500 to-indigo-600',
  'from-cyan-500 to-blue-600',
  'from-fuchsia-500 to-purple-600',
  'from-lime-500 to-emerald-600',
  'from-red-500 to-rose-600',
]

function StaticSection({ sec, index, color }) {
  return (
    <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <span className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center font-bold text-sm shadow-sm`}>
          {index + 1}
        </span>
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
          {sec.titulo}
        </h3>
      </div>
      {sec.intro && (
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px] mb-4 ml-14">
          {sec.intro}
        </p>
      )}
      {sec.figura === 'segmentos' && (
        <div className="mb-4 -mx-6">
          <FiguraSegmentos />
        </div>
      )}
      {sec.items && (
        <ul className="space-y-2.5 ml-14">
          {sec.items.map((item, j) => (
            <li key={j} className="text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500 mt-2.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function SectionAccordion({ sec, index, isOpen, onToggle, color }) {
  const contentRef = useRef(null)

  return (
    <div className={`bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md ${isOpen ? 'shadow-md' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 cursor-pointer text-left group transition-colors duration-200"
      >
        <span className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform duration-200`}>
          {index + 1}
        </span>
        <span className="flex-1 text-base font-semibold text-slate-800 dark:text-slate-100 pr-4">
          {sec.titulo}
        </span>
        <svg
          className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-all duration-300 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 600}px` : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <div ref={contentRef} className="px-5 pb-5 pl-[4.25rem] space-y-4">
          {sec.intro && (
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
              {sec.intro}
            </p>
          )}
          {sec.items && (
            <ul className="space-y-2.5">
              {sec.items.map((item, j) => (
                <li key={j} className="text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500 mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {sec.figura === 'segmentos' && (
            <FiguraSegmentos />
          )}
        </div>
      </div>
    </div>
  )
}

function TimelineSection({ sec, index, color }) {
  return (
    <div className="relative flex gap-6 animate-fade-in-up" style={{animationDelay: `${index * 0.08}s`}}>
      <div className="flex flex-col items-center">
        <span className={`flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br ${color} text-white flex items-center justify-center font-bold text-sm shadow-md z-10`}>
          {index + 1}
        </span>
        {index < 9 && (
          <div className="w-0.5 flex-1 min-h-[2rem] bg-gradient-to-b from-indigo-300/60 to-indigo-200/40 dark:from-indigo-600/60 dark:to-indigo-500/30" />
        )}
      </div>
      <div className="flex-1 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 p-5 mb-2 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 text-[15px]">
          {sec.titulo}
        </h3>
        {sec.items && (
          <ul className="space-y-1.5">
            {sec.items.map((item, j) => (
              <li key={j} className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-indigo-400 dark:bg-indigo-500 mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default function TemaPage() {
  const { slug } = useParams()
  const tema = temas.find((t) => t.slug === slug)
  const index = temas.findIndex((t) => t.slug === slug)
  const data = contenido[slug]
  const [openSections, setOpenSections] = useState({})

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.getElementById(window.location.hash.slice(1))
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 400)
    }
  }, [slug])

  if (!tema || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Tema no encontrado</h1>
          <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Volver al inicio</Link>
        </div>
      </div>
    )
  }

  const toggleSection = (i) => setOpenSections((p) => ({ ...p, [i]: !p[i] }))
  const color = topicColors[index % topicColors.length]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 dark:from-indigo-950 dark:via-indigo-900 dark:to-purple-950">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-indigo-200 hover:text-white text-sm font-medium mb-6 transition-colors duration-200 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium mb-3">
                <span>{tema.id}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                {tema.titulo}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        
        {data.introduccion && (
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 mb-6 transition-colors animate-fade-in">
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
        )}

        {data.secciones && data.secciones.length > 0 && data.tipo === 'timeline' && (
          <section className="mb-6 pl-2">
            {data.secciones.map((sec, i) => (
              <TimelineSection
                key={i}
                sec={sec}
                index={i}
                color={color}
              />
            ))}
          </section>
        )}

        {data.secciones && data.secciones.length > 0 && data.tipo !== 'timeline' && (
          <section className="space-y-4 mb-6">
            {data.secciones.map((sec, i) => (
              <div key={i} className="animate-fade-in-up" style={{animationDelay: `${i * 0.06}s`}}>
                {sec.static ? (
                  <StaticSection sec={sec} index={i} color={color} />
                ) : (
                  <SectionAccordion
                    sec={sec}
                    index={i}
                    isOpen={!!openSections[i]}
                    onToggle={() => toggleSection(i)}
                    color={color}
                  />
                )}
              </div>
            ))}
          </section>
        )}

        {data.desarrollo && !data.secciones && (
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 mb-6 transition-colors">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Desarrollo</h2>
            <ul className="space-y-3">
              {data.desarrollo.map((punto, i) => (
                <li key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2.5 flex-shrink-0" />
                  {punto}
                </li>
              ))}
            </ul>
          </section>
        )}

        {data.conceptos && !data.subtemas && (
          <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 p-6 md:p-8 mb-6 transition-colors">
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
                  <span className={`inline-block text-white text-xs font-bold px-2.5 py-1 rounded-lg mb-3 bg-gradient-to-r ${color}`}>
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

        {data.conclusion && !data.subtemas && (
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 mb-10 transition-colors">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Conclusión
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
              {data.conclusion}
            </p>
          </section>
        )}

        <div className="flex items-center justify-between pb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
