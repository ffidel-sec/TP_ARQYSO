const steps = [
  {
    label: '(a)',
    desc: '<strong>Estado inicial.</strong> 5 segmentos contiguos. Sin fragmentaci\u00f3n.',
    segs: [
      { name: 'Seg 4', size: 7, cls: 's4' },
      { name: 'Seg 3', size: 8, cls: 's3' },
      { name: 'Seg 2', size: 5, cls: 's2' },
      { name: 'Seg 1', size: 8, cls: 's1' },
      { name: 'Seg 0', size: 4, cls: 's0' },
    ],
  },
  {
    label: '(b)',
    desc: '<strong>Seg 1 finaliza.</strong> Queda un hueco de 3K. Entra Seg 7 (5K).',
    segs: [
      { name: 'Seg 4', size: 7, cls: 's4' },
      { name: 'Seg 3', size: 8, cls: 's3' },
      { name: 'Seg 2', size: 5, cls: 's2' },
      { name: '', size: 3, cls: 'frag' },
      { name: 'Seg 7', size: 5, cls: 's7' },
      { name: 'Seg 0', size: 4, cls: 's0' },
    ],
  },
  {
    label: '(c)',
    desc: '<strong>Entra Seg 5 (4K).</strong> Aparecen dos huecos de 3K.',
    segs: [
      { name: '', size: 3, cls: 'frag' },
      { name: 'Seg 5', size: 4, cls: 's5' },
      { name: 'Seg 3', size: 8, cls: 's3' },
      { name: 'Seg 2', size: 5, cls: 's2' },
      { name: '', size: 3, cls: 'frag' },
      { name: 'Seg 7', size: 5, cls: 's7' },
      { name: 'Seg 0', size: 4, cls: 's0' },
    ],
  },
  {
    label: '(d)',
    desc: '<strong>M\u00e1s fragmentaci\u00f3n.</strong> Un segmento nuevo de 10K <em>no entrar\u00eda</em>.',
    segs: [
      { name: '', size: 3, cls: 'frag' },
      { name: 'Seg 5', size: 4, cls: 's5' },
      { name: '', size: 4, cls: 'frag' },
      { name: 'Seg 6', size: 4, cls: 's6' },
      { name: 'Seg 2', size: 5, cls: 's2' },
      { name: '', size: 3, cls: 'frag' },
      { name: 'Seg 7', size: 5, cls: 's7' },
      { name: 'Seg 0', size: 4, cls: 's0' },
    ],
  },
  {
    label: '(e)',
    desc: '<strong>Compactaci\u00f3n:</strong> todos los segmentos se mueven al fondo. Un solo hueco de 10K.',
    segs: [
      { name: '', size: 10, cls: 'frag' },
      { name: 'Seg 5', size: 4, cls: 's5' },
      { name: 'Seg 6', size: 4, cls: 's6' },
      { name: 'Seg 2', size: 5, cls: 's2' },
      { name: 'Seg 7', size: 5, cls: 's7' },
      { name: 'Seg 0', size: 4, cls: 's0' },
    ],
  },
]

const colorMap = {
  s0: { bg: '#e8f4fd', color: '#0c447c' },
  s1: { bg: '#fef3e8', color: '#633806' },
  s2: { bg: '#eaf3de', color: '#27500a' },
  s3: { bg: '#fbeaf0', color: '#4b1528' },
  s4: { bg: '#eeedfe', color: '#26215c' },
  s5: { bg: '#e1f5ee', color: '#04342c' },
  s6: { bg: '#faeeda', color: '#412402' },
  s7: { bg: '#f0f4f8', color: '#2c3e50' },
  frag: { bg: '', color: '#888780' },
}

const MAX_H = 380
const maxK = Math.max(...steps.map((s) => s.segs.reduce((a, x) => a + x.size, 0)))

export default function FragmentacionExterna() {
  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
      <h3 className="font-mono text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-1">
        Fragmentaci&oacute;n externa
      </h3>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
        Efecto tablero de ajedrez
      </p>
      <div className="flex gap-3 justify-center">
        {steps.map((step, i) => {
          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1 min-w-0 transition-all duration-200 hover:scale-[1.08] hover:z-10 cursor-default">
              <div
                className="w-full border border-slate-300 dark:border-slate-600 rounded overflow-hidden transition-all duration-200 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-200/40 dark:hover:shadow-indigo-900/40"
                style={{ height: `${MAX_H}px` }}
              >
                {step.segs.map((seg, j) => {
                  const h = Math.max((seg.size / maxK) * MAX_H, seg.cls === 'frag' ? 14 : 22)
                  const colors = colorMap[seg.cls] || { bg: '#f0f4f8', color: '#2c3e50' }
                  const isFrag = seg.cls === 'frag'
                  return (
                    <div
                      key={j}
                      className="w-full flex items-center justify-center flex-col overflow-hidden"
                      style={{
                        height: `${h}px`,
                        background: isFrag
                          ? 'repeating-linear-gradient(45deg,#d3d1c7 0px,#d3d1c7 2px,#f1efe8 2px,#f1efe8 8px)'
                          : colors.bg,
                        color: isFrag ? colors.color : colors.color,
                        borderTop: j > 0 ? '1px solid rgba(0,0,0,.08)' : 'none',
                      }}
                    >
                      {seg.name && (
                        <span className="font-mono text-[11px] font-semibold leading-tight text-center">
                          {seg.name}
                        </span>
                      )}
                      <span className="font-mono text-[10px] opacity-70">
                        ({seg.size}K)
                      </span>
                    </div>
                  )
                })}
              </div>
              <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                {step.label}
              </span>
              <span
                className="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-snug max-w-[180px]"
                dangerouslySetInnerHTML={{ __html: step.desc }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
