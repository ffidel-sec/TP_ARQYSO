import { useState, useCallback, useRef } from 'react'

const fsData = {
  name: '/',
  desc: 'Directorio raíz del sistema de archivos',
  children: [
    {
      name: 'home',
      desc: 'Directorios personales de los usuarios no privilegiados',
      children: [
        {
          name: 'usuario',
          desc: 'Directorio personal del usuario',
          children: [
            { name: 'Documents', desc: 'Documentos personales del usuario', children: [] },
            { name: 'Downloads', desc: 'Archivos descargados de internet', children: [] },
          ],
        },
      ],
    },
    {
      name: 'tmp',
      desc: 'Almacenamiento temporal — borrado automáticamente en cada reinicio',
      children: [
        { name: 'session.lock', desc: 'Archivo de bloqueo de sesión temporal', children: [] },
        { name: 'cache_app',    desc: 'Caché temporal generada por una aplicación', children: [] },
      ],
    },
    {
      name: 'root',
      desc: 'Directorio personal exclusivo del superusuario root',
      children: [
        { name: '.ssh',    desc: 'Claves y configuración SSH del usuario root', children: [] },
        { name: 'scripts', desc: 'Scripts de administración del sistema', children: [] },
      ],
    },
    {
      name: 'proc',
      desc: 'Sistema de archivos virtual con información del kernel y procesos en vivo',
      children: [
        { name: 'cpuinfo', desc: 'Información detallada del procesador (modelo, núcleos, flags)', children: [] },
        { name: 'meminfo', desc: 'Estadísticas de uso de memoria RAM y swap', children: [] },
      ],
    },
  ],
}

// ── Layout: left-to-right ─────────────────────────────────────────────────────
const NW     = 148  // node width
const NH     = 38   // node height
const X_STEP = 195  // horizontal distance center-to-center per level
const SLOT   = 72   // vertical space allocated per leaf node
const PAD    = 24   // outer padding

function countLeaves(node) {
  if (!node.children?.length) return 1
  return node.children.reduce((s, c) => s + countLeaves(c), 0)
}

// branchIdx: index of the level-1 ancestor (0=home,1=tmp,2=root,3=proc)
function buildLayout(node, depth, slotStart, path, level, branchIdx = -1) {
  const leaves  = countLeaves(node)
  const x = PAD + depth * X_STEP
  const y = slotStart + (leaves * SLOT) / 2 - NH / 2

  const result = {
    name: node.name, desc: node.desc, path, level, branchIdx,
    x, y,
    cx: x + NW / 2,
    cy: y + NH / 2,
    children: [],
  }

  if (node.children?.length) {
    let cur = slotStart
    for (let i = 0; i < node.children.length; i++) {
      const c  = node.children[i]
      const cp = path === '/' ? '/' + c.name : path + '/' + c.name
      const childBranch = level === 0 ? i : branchIdx
      result.children.push(buildLayout(c, depth + 1, cur, cp, level + 1, childBranch))
      cur += countLeaves(c) * SLOT
    }
  }
  return result
}

function collectNodes(n, out = []) { out.push(n); n.children?.forEach(c => collectNodes(c, out)); return out }
function collectEdges(n, out = []) { n.children?.forEach(c => { out.push([n, c]); collectEdges(c, out) }); return out }

// ── Styles ────────────────────────────────────────────────────────────────────
const STYLE_ROOT   = { stroke: '#f85149', text: '#f85149', fill: '#1a0a0b', fs: 18, fw: 'bold' }
const STYLE_L1     = { stroke: '#1f6feb', text: '#58a6ff', fill: '#0d1c34', fs: 14, fw: 'normal' }
const STYLE_GREEN  = { stroke: '#238636', text: '#3fb950', fill: '#0b1f12', fs: 13, fw: 'normal' }
const STYLE_VIOLET = { stroke: '#7c3aed', text: '#a78bfa', fill: '#150d2a', fs: 13, fw: 'normal' }
const STYLE_L3     = { stroke: '#9e6a03', text: '#e3b341', fill: '#1c1605', fs: 12, fw: 'normal' }

function getStyle(node) {
  if (node.level === 0) return STYLE_ROOT
  if (node.level === 1) return STYLE_L1
  if (node.level >= 3)  return STYLE_L3
  // level 2: alternate by branch (even=green, odd=violet)
  return node.branchIdx % 2 === 0 ? STYLE_GREEN : STYLE_VIOLET
}

const EDGE_COLOR = ['#3d1a1a', '#0d2040', '#0b2216', '#1f1805']

const glowFilters = [
  { id: 'g-red',    color: '#f85149' },
  { id: 'g-blue',   color: '#1f6feb' },
  { id: 'g-green',  color: '#238636' },
  { id: 'g-yellow', color: '#9e6a03' },
  { id: 'g-violet', color: '#7c3aed' },
]

function glowId(node) {
  if (node.level === 0) return 'g-red'
  if (node.level === 1) return 'g-blue'
  if (node.level >= 3)  return 'g-yellow'
  return node.branchIdx % 2 === 0 ? 'g-green' : 'g-violet'
}

export default function FilesystemTree() {
  const [tooltip,    setTooltip]    = useState(null)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [mouse,      setMouse]      = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const totalLeaves = countLeaves(fsData)
  const tree  = buildLayout(fsData, 0, PAD, '/', 0)
  const nodes = collectNodes(tree)
  const edges = collectEdges(tree)

  const maxDepth = Math.max(...nodes.map(n => n.level))
  const treeW = PAD + (maxDepth + 1) * X_STEP + PAD
  const treeH = PAD + totalLeaves * SLOT + PAD

  const handleMove = useCallback(e => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const TOOLTIP_W  = 300
  const TOOLTIP_H  = 70
  const containerW = containerRef.current?.offsetWidth ?? 800
  const tooltipLeft = Math.min(Math.max(mouse.x - TOOLTIP_W / 2, 6), containerW - TOOLTIP_W - 6)
  const tooltipTop  = mouse.y - TOOLTIP_H - 8 < 0 ? mouse.y + 16 : mouse.y - TOOLTIP_H - 8

  return (
    <div
      ref={containerRef}
      className="relative rounded-xl overflow-hidden"
      style={{ background: '#0d1117' }}
      onMouseMove={handleMove}
      onMouseLeave={() => { setTooltip(null); setHoveredIdx(null) }}
    >
      <svg
        viewBox={`0 0 ${treeW} ${treeH}`}
        width="100%"
        style={{ display: 'block' }}
      >
        <defs>
          {glowFilters.map(({ id, color }) => (
            <filter key={id} id={id} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feFlood floodColor={color} floodOpacity="0.5" result="color"/>
              <feComposite in="color" in2="blur" operator="in" result="glow"/>
              <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          ))}
        </defs>

        {/* Edges: right-center of parent → left-center of child, S-curve */}
        {edges.map(([p, c], i) => {
          const x1 = p.x + NW, y1 = p.cy
          const x2 = c.x,      y2 = c.cy
          const mx = (x1 + x2) / 2
          return (
            <path key={i}
              d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
              stroke={EDGE_COLOR[Math.min(c.level, 3)]}
              strokeWidth="1.8" fill="none"
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const s       = getStyle(node)
          const hovered = hoveredIdx === i
          const scale   = hovered ? 1.08 : 1
          const estimatedW = node.name.length * s.fs * 0.58
          const tl = estimatedW > NW - 16 ? NW - 16 : undefined

          return (
            <g key={i} style={{ cursor: 'default' }}
              transform={`translate(${node.cx},${node.cy}) scale(${scale}) translate(${-node.cx},${-node.cy})`}
              onMouseEnter={() => { setTooltip(node); setHoveredIdx(i) }}
              onMouseLeave={() => { setTooltip(null); setHoveredIdx(null) }}
            >
              <rect
                x={node.x} y={node.y}
                width={NW} height={NH} rx={7}
                fill={s.fill}
                stroke={s.stroke}
                strokeWidth={hovered ? 2.5 : (node.level === 0 ? 2 : 1.5)}
                filter={hovered ? `url(#${glowId(node)})` : undefined}
              />
              <text
                x={node.cx} y={node.cy}
                textAnchor="middle" dominantBaseline="central"
                fill={s.text} fontSize={s.fs} fontWeight={hovered ? 'bold' : s.fw}
                fontFamily="Courier New, monospace"
                {...(tl ? { textLength: tl, lengthAdjust: 'spacingAndGlyphs' } : {})}
              >
                {node.name}
              </text>
            </g>
          )
        })}
      </svg>

      {tooltip && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{ left: tooltipLeft, top: tooltipTop, width: TOOLTIP_W }}
        >
          <div className="bg-slate-900 border border-emerald-500/60 rounded-lg px-3 py-2 shadow-xl text-xs">
            <div className="text-blue-400 font-bold font-mono text-sm">{tooltip.path}</div>
            {tooltip.desc && <div className="text-slate-400 mt-1 font-sans">{tooltip.desc}</div>}
          </div>
        </div>
      )}
    </div>
  )
}
