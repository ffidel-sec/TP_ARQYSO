export const integrantes = [
  'Briguera Mateo',
  'Grando Fidel',
  'Nicolas Piñan',
  'Julian Patricio Urgaregui',
  'Luciano Gaston Villosio',
]

export const temas = [
  {
    id: '3.6',
    slug: 'cuestiones-de-implementacion',
    titulo: 'Cuestiones de Implementación',
    presentador: 'Briguera Mateo, Nicolas Piñan',
  },
  {
    id: '3.7',
    slug: 'segmentacion',
    titulo: 'Segmentación',
    presentador: 'Luciano Gaston Villosio, Grando Fidel, Julian Patricio Urgaregui',
  },
  {
    id: '4.1',
    slug: 'archivos',
    titulo: 'Archivos',
    presentador: '',
  },
  {
    id: '4.2',
    slug: 'directorios',
    titulo: 'Directorios',
    presentador: '',
  },
]

export const temaToUnidad = {
  'cuestiones-de-implementacion': 'memoria-virtual',
  'segmentacion': 'memoria-virtual',
  'archivos': 'sistema-de-archivos',
  'directorios': 'sistema-de-archivos',
}

export const unidades = [
  {
    id: '3',
    slug: 'memoria-virtual',
    titulo: 'Memoria Virtual',
    descripcion: 'Paginación y Segmentación: cómo el sistema operativo divide y organiza la RAM para ejecutar múltiples procesos de forma eficiente, segura y sin conflictos.',
    color: 'indigo',
    secciones: [
      {
        id: '3.6',
        titulo: 'Cuestiones de Implementación',
        slug: 'cuestiones-de-implementacion',
        subtemas: [
          { id: '3.6', titulo: 'Cuestiones de Implementación' },
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
    ],
  },
  {
    id: '4',
    slug: 'sistema-de-archivos',
    titulo: 'Sistema de Archivos',
    descripcion: 'Archivos y Directorios: cómo el sistema operativo organiza, accede y protege la información persistente almacenada en disco.',
    color: 'emerald',
    secciones: [
      {
        id: '4.1',
        titulo: 'Archivos',
        slug: 'archivos',
        subtemas: [
          { id: '4.1.1', titulo: 'Nomenclatura de archivos', slug: 'nomenclatura-de-archivos' },
          { id: '4.1.2', titulo: 'Estructura de archivos', slug: 'estructura-de-archivos' },
          { id: '4.1.3', titulo: 'Tipos de archivos', slug: 'tipos-de-archivos' },
          { id: '4.1.4', titulo: 'Acceso a archivos', slug: 'acceso-a-archivos' },
          { id: '4.1.5', titulo: 'Atributos de archivos', slug: 'atributos-de-archivos' },
          { id: '4.1.6', titulo: 'Operaciones de archivos', slug: 'operaciones-de-archivos' },
          { id: '4.1.7', titulo: 'Programa de ejemplo', slug: 'programa-de-ejemplo' },
        ],
      },
      {
        id: '4.2',
        titulo: 'Directorios',
        slug: 'directorios',
        subtemas: [
          { id: '4.2.1', titulo: 'Sistemas de directorios de un solo nivel', slug: 'sistemas-de-directorios-de-un-solo-nivel' },
          { id: '4.2.2', titulo: 'Sistemas de directorios jerárquicos', slug: 'sistemas-de-directorios-jerarquicos' },
          { id: '4.2.3', titulo: 'Nombres de rutas', slug: 'nombres-de-rutas' },
          { id: '4.2.4', titulo: 'Operaciones de directorios', slug: 'operaciones-de-directorios' },
        ],
      },
    ],
  },
]
