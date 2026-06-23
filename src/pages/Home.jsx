import { Link } from 'react-router-dom'
import { integrantes, unidades } from '../data/temas'

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-950 dark:to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-in-up">
            Trabajo Práctico
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            Arquitectura y
            <span className="block text-slate-300">Sistemas Operativos</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            Seleccioná la unidad que querés explorar.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-slate-500 rounded-full inline-block" />
          Integrantes
        </h2>
        <div className="flex flex-wrap gap-3">
          {integrantes.map((nombre, i) => (
            <span
              key={nombre}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {nombre}
            </span>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
          <span className="w-1 h-6 bg-slate-500 rounded-full inline-block" />
          Unidades
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {unidades.map((unidad, i) => {
            const isIndigo = unidad.color === 'indigo'
            return (
              <Link
                key={unidad.id}
                to={`/unidad/${unidad.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isIndigo ? 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40' : 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40'}`} />
                <div className="relative p-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {unidad.titulo}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {unidad.descripcion}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className={isIndigo ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-400'}>
                      {unidad.secciones.length} secciones · {unidad.secciones.reduce((a, s) => a + s.subtemas.length, 0)} subtemas
                    </span>
                    <svg
                      className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isIndigo ? 'text-indigo-500' : 'text-emerald-500'}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
