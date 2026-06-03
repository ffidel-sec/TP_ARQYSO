const problema = {
  titulo: 'El problema',
  color: 'from-rose-500 to-pink-500',
  borderColor: 'border-rose-200 dark:border-rose-800/40',
  icono: (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  items: [
    'El dispositivo escribe directamente en memoria física mediante DMA.',
    'Si la página del búfer se desaloja antes de terminar, los datos se corrompen.',
  ],
}

const soluciones = [
  {
    key: 'pinning',
    titulo: 'Solución 1: Pinning',
    color: 'from-blue-500 to-indigo-500',
    borderColor: 'border-blue-200 dark:border-blue-800/40',
    icono: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    items: [
      'Bloquear los marcos involucrados en la E/S para que no sean reemplazados.',
      'Simple pero reduce la disponibilidad de memoria.',
    ],
  },
  {
    key: 'buffers',
    titulo: 'Solución 2: Búferes del kernel',
    color: 'from-violet-500 to-purple-500',
    borderColor: 'border-violet-200 dark:border-violet-800/40',
    icono: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    items: [
      'La E/S se realiza en búferes del kernel (nunca paginados).',
      'Al completar, se copia al espacio de usuario.',
      'Evita la corrupción pero introduce una copia extra.',
    ],
  },
]

function Card({ sec, isProblem }) {
  return (
    <div className={`bg-white dark:bg-slate-800/80 rounded-2xl border ${sec.borderColor} overflow-hidden shadow-sm flex flex-col`}>
      <div className={`bg-gradient-to-r ${sec.color} px-5 py-4`}>
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            {sec.icono}
          </span>
          <h3 className="text-white font-semibold text-[15px]">{sec.titulo}</h3>
        </div>
      </div>
      <div className={`p-5 space-y-3 flex-1 ${isProblem ? 'text-center' : ''}`}>
        {sec.items.map((item, j) => (
          <div key={j} className={`flex items-start gap-3 ${isProblem ? 'justify-center' : ''}`}>
            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-500 mt-2" />
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px] text-left">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BloqueoPaginas({ data }) {
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

      <div className="flex flex-col items-center gap-6">
        <div className="w-full max-w-lg">
          <Card sec={problema} isProblem />
        </div>

        <svg className="w-6 h-6 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>

        <div className="w-full grid gap-6 md:grid-cols-2">
          {soluciones.map((sec) => (
            <Card key={sec.key} sec={sec} />
          ))}
        </div>
      </div>
    </div>
  )
}
