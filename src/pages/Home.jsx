import { Link } from 'react-router-dom'
import { integrantes } from '../data/temas'

const secciones = [
  {
    id: '3.6',
    titulo: 'Paginación',
    slug: 'cuestiones-de-implementacion',
    subtemas: [
      { id: '3.6', titulo: 'Paginación' },
      { id: '3.6.1', titulo: 'Participación del SO en la paginación', slug: 'participacion-del-so-en-la-paginacion' },
      { id: '3.6.2', titulo: 'Manejo de fallos de página', slug: 'manejo-de-fallas-de-pagina' },
      { id: '3.6.3', titulo: 'Respaldo de Instrucción', slug: 'respaldo-de-instruccion' },
      { id: '3.6.4', titulo: 'Bloqueo de páginas en memoria', slug: 'bloqueo-de-paginas-en-memoria' },
      { id: '3.6.5', titulo: 'Almacén de respaldo', slug: 'almacen-de-respaldo' },
      { id: '3.6.6', titulo: 'Separación de política y mecanismo', slug: 'separacion-de-politica-y-mecanismo' },
    ],
  },
  {
    id: '3.7',
    titulo: 'Segmentación',
    slug: 'segmentacion',
    subtemas: [
      { id: '3.7', titulo: 'Segmentación' },
      { id: '3.7.1', titulo: 'Implementación de segmentación pura', slug: 'implementacion-de-segmentacion-pura' },
      { id: '3.7.2', titulo: 'Segmentación con paginación: MULTICS', slug: 'segmentacion-con-paginacion-multics' },
      { id: '3.7.3', titulo: 'Segmentación con paginación: Intel Pentium', slug: 'segmentacion-con-paginacion-intel-pentium' },
    ],
  },
]

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 dark:from-indigo-950 dark:via-indigo-900 dark:to-purple-950">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight animate-fade-in-up">
            Paginación y Segmentación
            <span className="block text-indigo-200">de la Memoria RAM</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.15s'}}>
            Exploramos cómo el sistema operativo divide y organiza la RAM para ejecutar múltiples procesos de forma eficiente, segura y sin conflictos.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-indigo-600 rounded-full inline-block" />
          Integrantes
        </h2>
        <div className="flex flex-wrap gap-3">
          {integrantes.map((nombre, i) => (
            <span
              key={nombre}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200 animate-fade-in-up cursor-pointer"
              style={{animationDelay: `${i * 0.05}s`}}
            >
              {nombre}
            </span>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-indigo-600 rounded-full inline-block" />
          Temas
        </h2>
        <div className="space-y-6">
          {secciones.map((sec, si) => (
            <div key={sec.id} className="animate-fade-in-up" style={{animationDelay: `${si * 0.1}s`}}>
              <div className="flex items-center gap-3 mb-4 p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
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

              <div className="ml-4 pl-6 border-l-2 border-indigo-200 dark:border-indigo-700 space-y-1">
                {sec.subtemas.map((st) => {
                  const href = st.slug ? `/subtema/${st.slug}` : `/tema/${sec.slug}`
                  return (
                    <Link
                      key={st.id}
                      to={href}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors duration-200 group/sub"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500 group-hover/sub:scale-150 transition-transform" />
                      <span className="text-xs font-mono font-semibold text-indigo-500 dark:text-indigo-400 w-12 flex-shrink-0">
                        {st.id}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover/sub:text-indigo-700 dark:group-hover/sub:text-indigo-300 transition-colors">
                        {st.titulo}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
