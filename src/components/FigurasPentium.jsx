function FigSelector() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex w-full h-14 rounded-lg overflow-hidden border border-slate-500">
        <div className="flex-[13] bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm text-center px-1">
          &Iacute;ndice (13 bits)
        </div>
        <div className="flex-[2] bg-emerald-600 flex items-center justify-center text-white font-semibold text-xs text-center px-1 border-l border-slate-500">
          TI<br /><span className="text-[10px] font-normal">GDT/LDT</span>
        </div>
        <div className="flex-[3] bg-amber-600 flex items-center justify-center text-white font-semibold text-xs text-center px-1 border-l border-slate-500">
          RPL<br /><span className="text-[10px] font-normal">(2 bits)</span>
        </div>
      </div>
      <div className="flex w-full mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
        <div className="flex-[13] text-center">identifica la entrada en la tabla</div>
        <div className="flex-[2] text-center">0=GDT<br />1=LDT</div>
        <div className="flex-[3] text-center">privilegio<br />0 (kernel) a 3 (usuario)</div>
      </div>
    </div>
  )
}

function FigFlujo() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <div className="flex flex-col gap-2">
          <div className="bg-indigo-600 text-white px-3 sm:px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm text-center shadow-sm">
            Selector
          </div>
          <div className="bg-slate-500 text-white px-3 sm:px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm text-center shadow-sm">
            Desplazamiento
          </div>
        </div>
        <div className="text-slate-400 text-xl sm:text-2xl font-bold self-center">+</div>
        <div className="bg-emerald-600 text-white px-3 sm:px-5 py-3 rounded-lg font-semibold text-xs sm:text-sm text-center shadow-sm">
          Descriptor
          <div className="text-[10px] sm:text-xs font-normal opacity-80 mt-0.5">Base + L&iacute;mite + Protecci&oacute;n</div>
        </div>
        <div className="text-slate-400 text-xl sm:text-2xl font-bold">&rarr;</div>
        <div className="bg-amber-600 text-white px-3 sm:px-5 py-3 rounded-lg font-semibold text-xs sm:text-sm text-center shadow-sm">
          Direcci&oacute;n lineal
          <div className="text-[10px] sm:text-xs font-normal opacity-80 mt-0.5">32 bits &rarr; entra a paginaci&oacute;n</div>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3 space-y-1">
        <p className="font-medium">Cargado en CS o DS</p>
        <p className="text-[11px]">Base + desplazamiento | verifica l&iacute;mite y permisos &rarr; entra a la etapa de paginaci&oacute;n</p>
      </div>
    </div>
  )
}

function FigPaginacion() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-blue-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm">
            Dir (10 bits)
          </div>
          <div className="bg-emerald-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm">
            P&aacute;gina (10 bits)
          </div>
          <div className="bg-slate-500 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm">
            Offset (12 bits)
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-8 text-slate-400 text-lg font-mono">
          <span>&darr;</span>
          <span>&darr;</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          <div className="bg-blue-700 text-white px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold shadow-sm text-center">
            Directorio
            <div className="text-[10px] font-normal opacity-80">1024 entradas</div>
          </div>
          <div className="text-slate-400 text-xl font-bold">&rarr;</div>
          <div className="bg-emerald-600 text-white px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold shadow-sm text-center">
            Tabla de p&aacute;ginas
            <div className="text-[10px] font-normal opacity-80">1024 entradas</div>
          </div>
          <div className="text-slate-400 text-xl font-bold">&rarr;</div>
          <div className="bg-amber-700 text-white px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold shadow-sm text-center">
            Marco f&iacute;sico
            <div className="text-[10px] font-normal opacity-80">n&uacute;mero de frame</div>
          </div>
          <div className="text-slate-400 text-xl font-bold">+</div>
          <div className="bg-red-700 text-white px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold shadow-sm text-center">
            Dir. f&iacute;sica
            <div className="text-[10px] font-normal opacity-80">byte en RAM</div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
        TLB cachea las combinaciones Dir+P&aacute;gina m&aacute;s recientes &rarr; traducci&oacute;n instant&aacute;nea
      </p>
    </div>
  )
}

function FigAnillos() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center justify-center gap-6 sm:gap-10">
        <div className="relative w-72 h-72 flex-shrink-0">
          <div className="absolute inset-0 rounded-full border-[3px] border-indigo-400/60 dark:border-indigo-400/40 flex items-start justify-center pt-2.5 text-indigo-500 dark:text-indigo-400 font-bold text-sm">
            3
          </div>
          <div className="absolute inset-[48px] rounded-full border-[3px] border-emerald-400/60 dark:border-emerald-400/40 flex items-start justify-center pt-2 text-emerald-500 dark:text-emerald-400 font-bold text-sm">
            2
          </div>
          <div className="absolute inset-[80px] rounded-full border-[3px] border-amber-400/60 dark:border-amber-400/40 flex items-start justify-center pt-1.5 text-amber-500 dark:text-amber-400 font-bold text-sm">
            1
          </div>
          <div className="absolute inset-[112px] rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
            0
          </div>
          <div className="absolute right-0 top-1/2 w-8 border-t border-dashed border-slate-400 dark:border-slate-500 hidden sm:block" />
        </div>
        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4">
          <div>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold mr-2 align-middle">0</span>
            M&aacute;ximo privilegio &mdash; Kernel del SO
          </div>
          <div>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-amber-500 text-amber-600 dark:text-amber-400 text-[10px] font-bold mr-2 align-middle">1</span>
            Privilegio alto &mdash; Llamadas al sistema
          </div>
          <div>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold mr-2 align-middle">2</span>
            Privilegio medio &mdash; Bibliotecas compartidas
          </div>
          <div>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-indigo-400 text-indigo-500 dark:text-indigo-400 text-[10px] font-bold mr-2 align-middle">3</span>
            M&iacute;nimo privilegio &mdash; Programas de usuario
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FigurasPentium({ tipo, pie }) {
  if (!tipo) return null

  return (
    <div className="my-6">
      <div className="bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 shadow-sm">
        {tipo === 'selector' && <FigSelector />}
        {tipo === 'flujo' && <FigFlujo />}
        {tipo === 'paginacion' && <FigPaginacion />}
        {tipo === 'anillos' && <FigAnillos />}
      </div>
      {pie && (
        <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 italic">
          Figura &mdash; {pie}
        </p>
      )}
    </div>
  )
}
