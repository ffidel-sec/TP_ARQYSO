const segments = [
  { num: 0, label: 'Tabla de\nsímbolos', size: 20 },
  { num: 1, label: 'Texto\nfuente', size: 12 },
  { num: 2, label: 'Constantes', size: 1, inline: true },
  { num: 3, label: 'Árbol de\nanálisis\nsintáctico', size: 16 },
  { num: 4, label: 'Pila de\nllamadas', size: 12 },
]

const maxSize = Math.max(...segments.map((s) => s.size))

function YAxis({ size, maxH }) {
  const ticks = []
  const step = Math.max(1, Math.ceil(size / 4))
  for (let v = 0; v <= size; v += step) {
    ticks.push(v)
  }
  if (ticks[ticks.length - 1] !== size) ticks.push(size)

  return (
    <div className="flex flex-col-reverse justify-between shrink-0 mr-1.5" style={{ height: `${(size / maxSize) * maxH}px`, width: '24px' }}>
      {ticks.map((t) => (
        <span key={t} className="text-[10px] leading-none text-slate-400 dark:text-slate-500 text-right font-mono">
          {t}K
        </span>
      ))}
    </div>
  )
}

function Bar({ seg, h, maxH }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-end">
        <YAxis size={seg.size} maxH={maxH} />
        <div
          className="w-[72px] border-2 border-slate-700 dark:border-slate-500 bg-white dark:bg-slate-700 flex items-center justify-center relative rounded-sm shadow-sm"
          style={{ height: `${h}px` }}
        >
          {seg.inline ? (
            <span className="font-sans text-[12px] font-medium text-slate-700 dark:text-slate-200 border-2 border-slate-700 dark:border-slate-400 bg-slate-100 dark:bg-slate-600 px-2 py-0.5 absolute bottom-1 whitespace-nowrap">
              {seg.label}
            </span>
          ) : (
            <span className="font-sans text-[12px] font-normal text-slate-700 dark:text-slate-200 text-center leading-snug pointer-events-none px-1">
              {seg.label.split('\n').map((line, i) => (
                <span key={i}>{i > 0 && <br />}{line}</span>
              ))}
            </span>
          )}
        </div>
      </div>
      <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 text-center leading-tight">
        Seg<br />{seg.num}
      </span>
    </div>
  )
}

export default function FiguraSegmentos() {
  return (
    <div className="w-full">
      <h3 className="font-mono text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-6 text-center">
        Organización de Segmentos de Memoria
      </h3>

      <div className="hidden sm:flex items-end justify-center gap-4">
        {segments.map((seg) => (
          <Bar key={seg.num} seg={seg} maxH={260} h={Math.max((seg.size / maxSize) * 260, 20)} />
        ))}
      </div>

      <div className="sm:hidden overflow-x-auto pb-2">
        <div className="flex items-end gap-4 px-2 min-w-[520px]">
          {segments.map((seg) => (
            <Bar key={seg.num} seg={seg} maxH={180} h={Math.max((seg.size / maxSize) * 180, 18)} />
          ))}
        </div>
      </div>
    </div>
  )
}
