export default function RespaldoInstruccion({ data }) {
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

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-amber-200 dark:border-amber-800/40 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Ambigüedad del PC
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">1</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
                En arquitecturas complejas, el fallo puede ocurrir en cualquier punto. El PC puede apuntar a lugares intermedios.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">2</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
                El SO no sabe con certeza dónde empezaba la instrucción.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-rose-200 dark:border-rose-800/40 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Efectos secundarios
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">1</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
                Si una instrucción modifica un registro antes del fallo, el SO debe deducir si el cambio ocurrió.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">2</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
                Debe deshacer el efecto en software antes de reiniciar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-emerald-200 dark:border-emerald-800/40 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-5 py-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Solución en CPU modernas
          </h3>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">1</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
              Registros ocultos que guardan copia exacta del PC antes de cada instrucción.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">2</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
              Registran qué efectos secundarios ya se completaron.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">3</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
              Si la CPU no los tiene, el SO debe analizar la instrucción por software.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
