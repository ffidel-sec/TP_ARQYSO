import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { temas, temaToUnidad } from '../data/temas'
import { subtemasPorSlug } from '../data/contenido'
import FragmentacionExterna from '../components/FragmentacionExterna'
import ParticipacionSO from '../components/ParticipacionSO'
import FigurasPentium from '../components/FigurasPentium'
import JerarquiaMultics from '../components/JerarquiaMultics'
import RespaldoInstruccion from '../components/RespaldoInstruccion'
import BloqueoPaginas from '../components/BloqueoPaginas'
import ManejoFallas from '../components/ManejoFallas'
import FilesystemTree from '../components/FilesystemTree'

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

function SectionAccordion({ sec, index, isOpen, onToggle, color, dotColor }) {
  const contentRef = useRef(null)
  const openChevron = dotColor?.includes('emerald') ? 'text-emerald-500' : 'text-indigo-500'

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
          className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-all duration-300 ${isOpen ? `rotate-180 ${openChevron}` : ''}`}
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
          {sec.html ? (
            <div dangerouslySetInnerHTML={{ __html: sec.html }} />
          ) : sec.source ? (
            <pre className="bg-slate-900 dark:bg-slate-950 text-green-400 text-sm rounded-xl p-4 overflow-x-auto leading-relaxed font-mono whitespace-pre-wrap">{sec.source}</pre>
          ) : sec.table ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-200">Atributo</th>
                    <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-200">Significado</th>
                  </tr>
                </thead>
                <tbody>
                  {sec.rows.map((row, j) => (
                    <tr key={j} className="border-b border-slate-100 dark:border-slate-700/50 even:bg-slate-50/50 dark:even:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="p-3 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">{row.attr}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : sec.code ? (
            (() => {
              const groups = sec.items.reduce((acc, item) => {
                if (item.startsWith('  ')) {
                  const last = acc[acc.length - 1]
                  if (last) last.cmds.push(item.trimStart())
                  else acc.push({ desc: null, cmds: [item.trimStart()] })
                } else {
                  acc.push({ desc: item, cmds: [] })
                }
                return acc
              }, [])
              return groups.map((g, gi) => (
                <div key={gi} className="mb-4 last:mb-0">
                  {g.desc && (
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">{g.desc}</p>
                  )}
                  {g.cmds.length > 0 && (
                    <pre className="bg-slate-900 dark:bg-slate-950 text-green-400 text-sm rounded-xl p-4 overflow-x-auto leading-relaxed font-mono whitespace-pre-wrap">
                      {g.cmds.map((line, li) => (
                        <div key={li}>{line}</div>
                      ))}
                    </pre>
                  )}
                </div>
              ))
            })()
          ) : sec.items && (
            <ul className="space-y-2.5">
              {sec.items.map((item, j) => (
                <li key={j} className="text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${dotColor ?? 'bg-indigo-400 dark:bg-indigo-500'} mt-2.5 flex-shrink-0`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {sec.figura && (
            <FigurasPentium tipo={sec.figura} pie={sec.pieFigura} />
          )}
        </div>
      </div>
    </div>
  )
}

function TimelineSection({ sec, index, color, dotColor }) {
  const isEmerald = dotColor?.includes('emerald')
  const connectorClass = isEmerald
    ? 'from-emerald-300/60 to-emerald-200/40 dark:from-emerald-600/60 dark:to-emerald-500/30'
    : 'from-indigo-300/60 to-indigo-200/40 dark:from-indigo-600/60 dark:to-indigo-500/30'
  const bulletColor = dotColor ?? 'bg-indigo-400 dark:bg-indigo-500'

  return (
    <div className="relative flex gap-6 animate-fade-in-up" style={{animationDelay: `${index * 0.08}s`}}>
      <div className="flex flex-col items-center">
        <span className={`flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br ${color} text-white flex items-center justify-center font-bold text-sm shadow-md z-10`}>
          {index + 1}
        </span>
        {index < 9 && (
          <div className={`w-0.5 flex-1 min-h-[2rem] bg-gradient-to-b ${connectorClass}`} />
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
                <span className={`w-1 h-1 rounded-full ${bulletColor} mt-2 flex-shrink-0`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default function SubTemaPage() {
  const { subSlug } = useParams()
  const st = subtemasPorSlug[subSlug]
  const parentTema = temas.find((t) => t.slug === st?.parentSlug)
  const unidadSlug = temaToUnidad[st?.parentSlug] ?? ''
  const [openSections, setOpenSections] = useState({})
  const toggleSection = (i) => setOpenSections((p) => ({ ...p, [i]: !p[i] }))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [subSlug])

  if (!st || !parentTema) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Subtema no encontrado</h1>
          <Link to={`/unidad/${unidadSlug}`} className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Volver a la unidad</Link>
        </div>
      </div>
    )
  }

  const color = topicColors[temas.findIndex((t) => t.slug === st.parentSlug) % topicColors.length]
  const isUnit4 = unidadSlug === 'sistema-de-archivos'
  const heroGrad = isUnit4
    ? 'from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-950 dark:via-emerald-900 dark:to-teal-950'
    : 'from-indigo-600 via-indigo-700 to-purple-800 dark:from-indigo-950 dark:via-indigo-900 dark:to-purple-950'
  const heroBlobColor = isUnit4 ? 'bg-teal-300' : 'bg-purple-300'
  const heroTextColor = isUnit4 ? 'text-emerald-200' : 'text-indigo-200'
  const iconColor = isUnit4 ? 'text-emerald-500' : 'text-indigo-500'
  const dotColor = isUnit4 ? 'bg-emerald-400 dark:bg-emerald-500' : 'bg-indigo-400 dark:bg-indigo-500'
  const markerColor = isUnit4 ? 'marker:text-emerald-500 dark:marker:text-emerald-400' : 'marker:text-indigo-500 dark:marker:text-indigo-400'
  const conceptosBg = isUnit4
    ? 'from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50'
    : 'from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50'
  const conceptosBorder = isUnit4
    ? 'border-emerald-100 dark:border-emerald-800/50'
    : 'border-indigo-100 dark:border-indigo-800/50'
  const conceptosBlobColor = isUnit4 ? 'bg-emerald-200/20' : 'bg-indigo-200/20'
  const conceptosTitle = isUnit4 ? 'text-emerald-800 dark:text-emerald-300' : 'text-indigo-800 dark:text-indigo-300'
  const bottomLinkHover = isUnit4
    ? 'hover:text-emerald-600 dark:hover:text-emerald-400'
    : 'hover:text-indigo-600 dark:hover:text-indigo-400'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className={`relative overflow-hidden bg-gradient-to-br ${heroGrad}`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl" />
          <div className={`absolute -bottom-20 -right-20 w-96 h-96 ${heroBlobColor} rounded-full blur-3xl`} />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
          <Link
            to={`/unidad/${unidadSlug}`}
            className={`inline-flex items-center gap-1.5 ${heroTextColor} hover:text-white text-sm font-medium mb-6 transition-colors duration-200 group`}
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a la unidad
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 ${heroTextColor} text-xs font-medium mb-3`}>
                <span>{st.id}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                {st.titulo}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        {st.introduccion && !st.componente && (
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 mb-6 transition-colors animate-fade-in">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
              <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Introducción
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
              {st.introduccion}
            </p>
          </section>
        )}

        {st.componente === 'participacion-so' ? (
          <section className="mb-6">
            <ParticipacionSO data={st} />
          </section>
        ) : st.componente === 'respaldo-instruccion' ? (
          <section className="mb-6">
            <RespaldoInstruccion data={st} />
          </section>
        ) : st.componente === 'bloqueo-paginas' ? (
          <section className="mb-6">
            <BloqueoPaginas data={st} />
          </section>
        ) : st.componente === 'manejo-fallas' ? (
          <section className="mb-6">
            <ManejoFallas data={st} />
          </section>
        ) : st.tipo === 'timeline' ? (
          <section className="mb-6 pl-2">
            {st.secciones?.map((sec, i) => (
              <TimelineSection key={i} sec={sec} index={i} color={color} dotColor={dotColor} />
            ))}
          </section>
        ) : st.secciones ? (
          <section className="space-y-3 mb-6">
            {st.secciones.map((sec, i) => (
              <div key={i} className="animate-fade-in-up" style={{animationDelay: `${i * 0.06}s`}}>
                {sec.static ? (
                  <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                    {sec.titulo && (
                      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-4">
                        {sec.titulo}
                      </h3>
                    )}
                    {sec.intro && (
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px] mb-4">
                        {sec.intro}
                      </p>
                    )}
                    {sec.component === 'fragmentacion-externa' && (
                      <div className="mb-4">
                        <FragmentacionExterna />
                      </div>
                    )}
                    {sec.component === 'jerarquia-multics' && (
                      <div className="mb-4">
                        <JerarquiaMultics />
                      </div>
                    )}
                    {sec.component === 'filesystem-tree' && (
                      <div className="mb-4">
                        <FilesystemTree />
                      </div>
                    )}
                    {sec.html ? (
                      <div dangerouslySetInnerHTML={{ __html: sec.html }} />
                    ) : sec.source ? (
                      <pre className="bg-slate-900 dark:bg-slate-950 text-green-400 text-sm rounded-xl p-4 overflow-x-auto leading-relaxed font-mono whitespace-pre-wrap">{sec.source}</pre>
                    ) : sec.table ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="bg-slate-100 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-200">Atributo</th>
                              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-200">Significado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sec.rows.map((row, j) => (
                              <tr key={j} className="border-b border-slate-100 dark:border-slate-700/50 even:bg-slate-50/50 dark:even:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-700/30 transition-colors">
                                <td className="p-3 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">{row.attr}</td>
                                <td className="p-3 text-slate-600 dark:text-slate-300">{row.meaning}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : sec.code ? (
                      (() => {
                        const groups = sec.items.reduce((acc, item) => {
                          if (item.startsWith('  ')) {
                            const last = acc[acc.length - 1]
                            if (last) last.cmds.push(item.trimStart())
                            else acc.push({ desc: null, cmds: [item.trimStart()] })
                          } else {
                            acc.push({ desc: item, cmds: [] })
                          }
                          return acc
                        }, [])
                        return groups.map((g, gi) => (
                          <div key={gi} className="mb-4 last:mb-0">
                            {g.desc && (
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px] mb-2">{g.desc}</p>
                            )}
                            {g.cmds.length > 0 && (
                              <pre className="bg-slate-900 dark:bg-slate-950 text-green-400 text-sm rounded-xl p-4 overflow-x-auto leading-relaxed font-mono whitespace-pre-wrap">
                                {g.cmds.map((line, li) => (
                                  <div key={li}>{line}</div>
                                ))}
                              </pre>
                            )}
                          </div>
                        ))
                      })()
                    ) : sec.numbered ? (
                      <div className="space-y-3">
                        {sec.items?.map((item, j) => (
                          <p key={j} className="text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${dotColor} mt-2.5 flex-shrink-0`} />
                            <span>{item}</span>
                          </p>
                        ))}
                        {sec.algorithm && (
                          <ol className={`list-decimal list-inside space-y-2 ml-2 ${markerColor}`}>
                            {sec.algorithm.map((step, j) => (
                              <li key={j} className="text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
                                {step}
                              </li>
                            ))}
                          </ol>
                        )}
                        {sec.conclusion && (
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {sec.conclusion}
                          </p>
                        )}
                      </div>
                    ) : sec.items && (
                      <ul className="space-y-2.5">
                        {sec.items.map((item, j) => (
                          <li key={j} className="text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${dotColor} mt-2.5 flex-shrink-0`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <SectionAccordion
                    sec={sec}
                    index={i}
                    isOpen={!!openSections[i]}
                    onToggle={() => toggleSection(i)}
                    color={color}
                    dotColor={dotColor}
                  />
                )}
              </div>
            ))}
          </section>
        ) : null}

        {st.solucion && (
          <section className="bg-white dark:bg-slate-800/80 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 p-6 md:p-8 mb-6 shadow-sm transition-colors animate-fade-in-up">
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {st.solucion.titulo}
            </h3>
            <ul className="space-y-2.5">
              {st.solucion.items.map((item, j) => (
                <li key={j} className="text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {st.conceptos && !st.componente && (
          <section className={`relative overflow-hidden bg-gradient-to-br ${conceptosBg} rounded-2xl border ${conceptosBorder} p-6 md:p-8 mb-6 transition-colors`}>
            <div className={`absolute top-0 right-0 w-32 h-32 ${conceptosBlobColor} rounded-full blur-2xl`} />
            <h2 className={`text-lg font-semibold ${conceptosTitle} mb-5 flex items-center gap-2`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Conceptos clave
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 relative">
              {st.conceptos.map((c, i) => (
                <div
                  key={i}
                  className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border ${conceptosBorder} p-5 hover:shadow-md transition-all duration-200 animate-fade-in-up`}
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

        <div className="flex items-center justify-between pb-10">
          <Link
            to={`/unidad/${unidadSlug}`}
            className={`inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 ${bottomLinkHover} transition-colors`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Volver a la unidad
          </Link>
        </div>
      </div>
    </div>
  )
}
