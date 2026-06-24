import { useState, useRef } from 'react'

const treeData = {
  name: '/',
  desc: 'Directorio raíz del sistema de archivos',
  type: 'folder',
  icon: '📁',
  children: [
    {
      name: 'Usuario 1',
      desc: 'Directorio personal del primer usuario',
      type: 'folder',
      icon: '📁',
      children: [
        { name: 'Proyecto1.txt', desc: 'Archivo de texto del proyecto', type: 'file', icon: '📝', color: '#58a6ff' },
        { name: 'informe.pdf', desc: 'Informe trimestral en PDF', type: 'file', icon: '📄', color: '#f85149' },
      ],
    },
    {
      name: 'Usuario 2',
      desc: 'Directorio personal del segundo usuario',
      type: 'folder',
      icon: '📁',
      children: [
        { name: 'Proyecto1.txt', desc: 'Archivo de texto del proyecto', type: 'file', icon: '📝', color: '#58a6ff' },
        { name: 'reporte.pdf', desc: 'Reporte de actividades en PDF', type: 'file', icon: '📄', color: '#d2a8ff' },
      ],
    },
  ],
}

const NODE_W = 86
const NODE_H = 34
const SLOT = 94
const Y_STEP = 64
const PAD = 14

function assignLeaves(node, start = 0) {
  if (!node.children?.length) {
    node.leaf = { lo: start, hi: start }
    return start + 1
  }
  let offset = start
  for (const c of node.children) offset = assignLeaves(c, offset)
  node.leaf = { lo: start, hi: offset - 1 }
  return offset
}

function buildLayout(node, depth, path) {
  const lo = node.leaf.lo
  const hi = node.leaf.hi
  const cx = PAD + (lo + hi + 1) * SLOT / 2
  const y = PAD + depth * Y_STEP
  return {
    ...node,
    fullPath: path,
    level: depth,
    cx,
    x: cx - NODE_W / 2,
    y,
    cy: y + NODE_H / 2,
    children: node.children?.map(c => buildLayout(c, depth + 1, path + '/' + c.name)) || [],
  }
}

function flatten(n, a = []) { a.push(n); n.children.forEach(c => flatten(c, a)); return a }

function allEdges(n, a = []) {
  n.children.forEach(c => {
    const parentBottom = n.y + NODE_H
    const childTop = c.y
    const midY = (parentBottom + childTop) / 2
    a.push({
      parent: n,
      child: c,
      midY,
      vert1: { x1: n.cx, y1: parentBottom, x2: n.cx, y2: midY },
      horiz: n.children.length > 1 ? { x1: n.children[0].cx, x2: n.children.at(-1).cx, y: midY } : null,
      vert2: { x1: c.cx, y1: midY, x2: c.cx, y2: childTop },
    })
    allEdges(c, a)
  })
  return a
}

const STYLES = [
  { stroke: '#f85149', fill: '#1a0a0b', txt: '#f85149', fs: 12, fw: 'bold' },
  { stroke: '#1f6feb', fill: '#0d1c34', txt: '#58a6ff', fs: 10, fw: 600 },
  { stroke: '#238636', fill: '#0b1f12', txt: '#3fb950', fs: 10, fw: 500 },
]

function style(node) {
  if (node.type === 'file') {
    const c = node.color || '#58a6ff'
    return { stroke: c, fill: '#0d1117', txt: c, fs: 10, fw: 500 }
  }
  return STYLES[Math.min(node.level, STYLES.length - 1)]
}

function collectAncestorIds(node, nodes, out = new Set()) {
  if (!node.parentPath) return out
  const parent = nodes.find(n => n.fullPath === node.parentPath)
  if (parent) {
    out.add(parent._id)
    collectAncestorIds(parent, nodes, out)
  }
  return out
}

export default function DirectorioJerarquico() {
  const leafCount = assignLeaves(treeData, 0)
  const root = buildLayout(treeData, 0, '/')

  let idCounter = 0
  const nodes = flatten(root).map(n => ({ ...n, _id: idCounter++ }))
  const edges = allEdges(root)

  nodes.forEach(n => {
    n.parentPath = n.fullPath.substring(0, n.fullPath.lastIndexOf('/')) || (n.fullPath === '/' ? null : '/')
  })

  const [tooltip, setTooltip] = useState(null)
  const [hoveredIds, setHoveredIds] = useState(new Set())
  const [selected, setSelected] = useState(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const [cw, setCw] = useState(500)

  const maxLevel = Math.max(...nodes.map(n => n.level))
  const svgW = PAD * 2 + leafCount * SLOT
  const svgH = PAD + (maxLevel + 1) * Y_STEP + PAD

  const handleMove = e => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setCw(rect.width)
  }

  const handleHover = node => {
    setTooltip(node)
    const ids = new Set([node._id])
    if (node.children?.length) {
      nodes.forEach(n => {
        if (n.fullPath.startsWith(node.fullPath + '/') || n.fullPath === node.fullPath) ids.add(n._id)
      })
    }
    const parent = nodes.find(n => n.fullPath === node.parentPath)
    if (parent) {
      collectAncestorIds(node, nodes, ids)
    }
    setHoveredIds(ids)
  }

  const handleLeave = () => {
    setTooltip(null)
    setHoveredIds(new Set())
  }

  const handleClick = node => {
    setSelected(prev => prev?._id === node._id ? null : node)
  }

  const TOOLTIP_W = 260
  const TOOLTIP_H = 50

  return (
    <div>
      <div ref={containerRef}
        className="relative rounded-xl overflow-hidden border border-slate-700/50"
        style={{ background: '#0d1117' }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="px-3 py-1.5 border-b border-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-mono text-slate-500 tracking-wide">SISTEMA DE DIRECTORIOS JERÁRQUICO</span>
        </div>

        <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" style={{ display: 'block' }}>
          {edges.map((e, i) => {
            const parentHov = hoveredIds.has(e.parent._id)
            const childHov = hoveredIds.has(e.child._id)
            const active = parentHov || childHov
            const lineColor = active ? style(e.child).stroke : '#30363d'
            const lineWidth = active ? 2.5 : 1.5

            return (
              <g key={i}>
                <line x1={e.vert1.x1} y1={e.vert1.y1} x2={e.vert1.x2} y2={e.vert1.y2}
                  stroke={lineColor} strokeWidth={lineWidth} style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                />
                {e.horiz && (
                  <line x1={e.horiz.x1} y1={e.horiz.y} x2={e.horiz.x2} y2={e.horiz.y}
                    stroke={lineColor} strokeWidth={lineWidth} style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                  />
                )}
                <line x1={e.vert2.x1} y1={e.vert2.y1} x2={e.vert2.x2} y2={e.vert2.y2}
                  stroke={lineColor} strokeWidth={lineWidth} style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                />
              </g>
            )
          })}

          {nodes.map((node, i) => {
            const s = style(node)
            const hov = hoveredIds.has(node._id)
            const sel = selected?._id === node._id
            const isRoot = node.level === 0
            const animDelay = `${i * 0.06}s`

            return (
              <g key={node._id}
                style={{ cursor: 'pointer', opacity: 1, transition: `opacity 0.35s ${animDelay}` }}
                onMouseEnter={() => handleHover(node)}
                onMouseLeave={handleLeave}
                onClick={() => handleClick(node)}
              >
                {isRoot && (
                  <rect x={node.x - 4} y={node.y - 3} width={NODE_W + 8} height={NODE_H + 6}
                    rx={7} fill="none" stroke={sel ? '#f85149' : (hov ? 'rgba(248,81,73,0.2)' : 'none')}
                    strokeWidth={sel ? 2 : 1}
                    style={{ transition: 'stroke 0.25s' }}
                  />
                )}
                <rect x={node.x} y={node.y} width={NODE_W} height={NODE_H}
                  rx={isRoot ? 6 : 4}
                  fill={sel ? (isRoot ? '#2d0f0f' : '#1a2744') : s.fill}
                  stroke={sel ? s.stroke : (hov ? s.stroke : s.stroke)}
                  strokeWidth={sel ? 2.5 : (hov ? 2 : 1.2)}
                  style={{ transition: 'fill 0.25s, stroke-width 0.2s' }}
                />
                <text x={node.cx} y={isRoot ? node.y + 10 : node.y + 9}
                  textAnchor="middle" dominantBaseline="central" fontSize={isRoot ? 12 : 11}>
                  {node.icon || '📁'}
                </text>
                <text x={node.cx} y={isRoot ? node.y + 20 : node.y + 22}
                  textAnchor="middle" dominantBaseline="central"
                  fill={s.txt} fontSize={s.fs} fontWeight={hov || sel ? 'bold' : s.fw}
                  fontFamily="Courier New, monospace"
                  style={{ transition: 'font-weight 0.15s' }}
                >
                  {isRoot ? '/' : node.name}
                </text>
                {isRoot && (
                  <text x={node.cx} y={node.y + 29}
                    textAnchor="middle" dominantBaseline="central"
                    fill="#f85149" fontSize={8} fontWeight={600}
                    fontFamily="Courier New, monospace" opacity="0.85"
                  >
                    Directorio Raíz
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {tooltip && (() => {
          const left = Math.min(Math.max(mouse.x - TOOLTIP_W / 2, 4), cw - TOOLTIP_W - 4)
          const top = mouse.y - TOOLTIP_H - 6 < 0 ? mouse.y + 14 : mouse.y - TOOLTIP_H - 6
          return (
            <div className="absolute z-50 pointer-events-none"
              style={{ left, top, width: TOOLTIP_W }}
            >
              <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-600/60 rounded-lg px-2.5 py-2 shadow-xl shadow-black/40">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{tooltip.icon || '📁'}</span>
                  <span className="text-white font-bold font-mono text-xs">
                    {tooltip.name}{tooltip.type === 'folder' ? '/' : ''}
                  </span>
                </div>
                <div className="text-slate-400 mt-0.5 font-mono text-[10px] flex items-center gap-1">
                  <span className="text-slate-500">ruta:</span>
                  <span style={{ color: style(tooltip).txt }}>{tooltip.fullPath}</span>
                </div>
                <div className="text-slate-400 mt-0.5 text-[11px] leading-relaxed border-t border-slate-700/50 pt-0.5">
                  {tooltip.desc}
                </div>
              </div>
            </div>
          )
        })()}

        <div className="px-3 py-1.5 border-t border-slate-800 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] text-slate-600 font-mono">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-sm" style={{ background: '#f85149' }} />raíz</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-sm" style={{ background: '#1f6feb' }} />carpeta</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-sm" style={{ background: '#58a6ff' }} />archivo</span>
        </div>
      </div>

      {selected && (
        <div className="mt-2 rounded-xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm px-4 py-3 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{selected.icon || '📁'}</span>
              <span className="text-white font-bold font-mono text-sm">
                {selected.name}{selected.type === 'folder' ? '/' : ''}
              </span>
            </div>
            <button onClick={() => setSelected(null)}
              className="text-slate-500 hover:text-white text-sm px-1.5 py-0.5 rounded hover:bg-slate-800 transition-colors cursor-pointer"
            >✕</button>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[12px]">
            <div>
              <span className="text-slate-500 font-mono">tipo</span>
              <p className="text-slate-300 font-mono">{selected.type === 'folder' ? 'Directorio' : 'Archivo'}</p>
            </div>
            <div>
              <span className="text-slate-500 font-mono">ruta</span>
              <p className="text-slate-300 font-mono" style={{ color: style(selected).txt }}>{selected.fullPath}</p>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 font-mono">descripción</span>
              <p className="text-slate-300">{selected.desc}</p>
            </div>
            {selected.type === 'file' && (
              <div className="col-span-2 flex gap-2 mt-1">
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                  extensión: .{selected.name.split('.').pop()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
