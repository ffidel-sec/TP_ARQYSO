import { useParams, Link } from 'react-router-dom'
import { unidades } from '../data/temas'

export default function UnidadPage() {
  const { slug } = useParams()
  const unidad = unidades.find((u) => u.slug === slug)

  if (!unidad) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Unidad no encontrada</h1>
          <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Volver al inicio</Link>
        </div>
      </div>
    )
  }

  const isIndigo = unidad.color === 'indigo'
  const heroGrad = isIndigo
    ? 'from-indigo-600 via-indigo-700 to-purple-800 dark:from-indigo-950 dark:via-indigo-900 dark:to-purple-950'
    : 'from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-950 dark:via-emerald-900 dark:to-teal-950'
  const accent = isIndigo ? 'bg-indigo-600' : 'bg-emerald-600'
  const badgeGrad = isIndigo ? 'from-indigo-500 to-purple-600' : 'from-emerald-500 to-teal-600'
  const borderColor = isIndigo ? 'border-indigo-200 dark:border-indigo-700' : 'border-emerald-200 dark:border-emerald-700'
  const dotColor = isIndigo ? 'bg-indigo-400 dark:bg-indigo-500' : 'bg-emerald-400 dark:bg-emerald-500'
  const idColor = isIndigo ? 'text-indigo-500 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-400'
  const hoverText = isIndigo
    ? 'group-hover/sub:text-indigo-700 dark:group-hover/sub:text-indigo-300'
    : 'group-hover/sub:text-emerald-700 dark:group-hover/sub:text-emerald-300'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className={`relative overflow-hidden bg-gradient-to-br ${heroGrad}`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Inicio
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {unidad.titulo}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              {unidad.descripcion}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14 pb-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
          <span className={`w-1 h-6 ${accent} rounded-full inline-block`} />
          Temas
        </h2>
        <div className="space-y-6">
          {unidad.secciones.map((sec, si) => (
            <div key={sec.id} className="animate-fade-in-up" style={{ animationDelay: `${si * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-4 p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${badgeGrad} text-white flex items-center justify-center font-bold text-base shadow-sm`}>
                  {sec.id}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {sec.titulo}
                  </h3>
                </div>
                <svg className="w-5 h-5 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <div className={`ml-4 pl-6 border-l-2 ${borderColor} space-y-1`}>
                {sec.subtemas.map((st) => {
                  const href = st.slug ? `/subtema/${st.slug}` : `/tema/${sec.slug}`
                  return (
                    <Link
                      key={st.id}
                      to={href}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors duration-200 group/sub"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} group-hover/sub:scale-150 transition-transform`} />
                      <span className={`text-xs font-mono font-semibold w-12 flex-shrink-0 ${idColor}`}>
                        {st.id}
                      </span>
                      <span className={`text-sm text-slate-600 dark:text-slate-400 ${hoverText} transition-colors`}>
                        {st.titulo}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
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
