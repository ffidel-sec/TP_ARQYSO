import { temas } from './temas'

const base = Object.fromEntries(
  temas.map((t) => [
    t.slug,
    {
      introduccion:
        'Texto introductorio pendiente — editar en src/data/contenido.js',
      desarrollo: [
        'Punto de desarrollo 1 pendiente.',
        'Punto de desarrollo 2 pendiente.',
        'Punto de desarrollo 3 pendiente.',
      ],
      conclusion: 'Conclusión pendiente.',
    },
  ])
)

export const contenido = {
  ...base,
  'cuestiones-de-implementacion': {
    introduccion:
      'Los implementadores de sistemas operativos deben elegir entre varios algoritmos y estrategias para gestionar la memoria virtual de manera eficiente. Las decisiones principales incluyen la selección entre el algoritmo de segunda oportunidad y el de envejecimiento, entre la asignación local o global de páginas, y entre la paginación por demanda o la prepaginación.',
    secciones: [
      {
        titulo: 'Paginación',
        items: [
          'Técnica de gestión de memoria que permite que la memoria de un programa no tenga que ser perfectamente contigua en la RAM física.',
          'Cuando un programa necesita ejecutarse, el SO toma sus páginas y las coloca en los marcos de la RAM que estén disponibles, sin importar si están separados o en desorden.',
          'Las páginas son bloques de información de tamaño fijo en los que el SO divide la memoria de un programa.',
        ],
      },
      {
        titulo: 'Algoritmo de Segunda Oportunidad',
        items: [
          'Mejora del algoritmo FIFO (el primero en entrar es el primero en salir).',
          'Cada página tiene un bit de referencia R que se pone en 1 cuando la página es usada.',
          'Las páginas se organizan en una lista circular, como las horas de un reloj.',
          'Cuando se necesita espacio, la "aguja del reloj" revisa la página: si su bit R es 1, el sistema le da una segunda oportunidad: cambia el bit a 0 y pasa a la siguiente página.',
          'Si su bit R ya es 0, esa página es la elegida para ser expulsada.',
        ],
      },
      {
        titulo: 'Algoritmo de Envejecimiento',
        items: [
          'Aproximación casi perfecta al algoritmo ideal (LRU), procesada de forma eficiente por software.',
          'Cada página tiene un contador de bits (ej. de 8 bits).',
          'En intervalos regulares, el SO revisa el bit de referencia de la página, lo mueve al inicio del contador y desplaza los demás bits a la derecha.',
          'Las páginas que se usaron recientemente tendrán números binarios muy altos; las que no se usaron, números muy bajos.',
        ],
      },
      {
        titulo: 'Asignación Local vs. Global',
        items: [
          'Asignación Local: cuando el proceso A necesita espacio, el algoritmo solo puede elegir entre las páginas que le pertenecen al propio proceso A.',
          'Asignación Global: cuando el proceso A necesita espacio, puede elegir una página de cualquier proceso del sistema, incluso de un proceso B si este no la está usando.',
        ],
      },
      {
        titulo: 'Prepaginación vs. Paginación por Demanda',
        items: [
          'Prepaginación: el SO intenta adivinar qué páginas va a necesitar el programa basándose en su comportamiento anterior. Cuando se abre un programa, el SO trae un grupo de páginas consecutivas a la RAM de golpe.',
          'Paginación por Demanda: cuando arranca un programa, este empieza con cero páginas en la RAM. A medida que el procesador ejecuta el código, se generan fallos de página y el SO las va trayendo del disco una por una.',
        ],
      },
    ],
    conceptos: [
      {
        nombre: 'Bit de Referencia (R)',
        descripcion:
          'Bit asociado a cada página que el hardware pone en 1 automáticamente cuando la página es accedida (lectura o escritura). Es fundamental para algoritmos de reemplazo como Segunda Oportunidad y Envejecimiento.',
      },
      {
        nombre: 'FIFO',
        descripcion:
          'Algoritmo de reemplazo de páginas donde la página que lleva más tiempo en memoria es la primera en ser expulsada. Simple pero propenso a reemplazar páginas muy usadas.',
      },
    ],
    conclusion:
      'La implementación de la memoria virtual requiere decisiones de diseño que impactan directamente en el rendimiento del sistema. La elección entre algoritmos de reemplazo, el ámbito de asignación y la estrategia de carga de páginas definen el equilibrio entre velocidad, uso de recursos y complejidad de implementación.',
    subtemas: [
      {
        id: '3.6.1',
        slug: 'participacion-del-so-en-la-paginacion',
        titulo: 'Participación del SO en la paginación',
        presentador: 'Briguera Mateo',
        componente: 'participacion-so',
        introduccion:
          'El sistema operativo no solo asigna memoria a los procesos, sino que interviene activamente en la paginación en cuatro momentos clave de la vida de un proceso.',
        secciones: [
          { titulo: 'Al crear el proceso', items: ['Determina el tamaño inicial del programa y sus datos.', 'Crea e inicializa la tabla de páginas en memoria.', 'Reserva espacio en el área de intercambio (swap) del disco.'] },
          { titulo: 'Al ejecutar el proceso', items: ['Restablece la MMU para el nuevo proceso.', 'Vacía el TLB para borrar el rastro del proceso anterior.', 'Carga la tabla de páginas en la MMU.', 'Opcionalmente, precarga algunas páginas.'] },
          { titulo: 'Al ocurrir un fallo de página', items: ['Lee los registros de hardware para identificar la dirección.', 'Busca la página en el disco.', 'Encuentra un marco libre (o desaloja uno).', 'Carga la página y actualiza la tabla.', 'Respaldan el PC para reintentar la instrucción.'] },
          { titulo: 'Al terminar el proceso', items: ['Libera la tabla de páginas y los marcos.', 'Libera el espacio en disco.', 'Si hay páginas compartidas, espera al último proceso.'] },
        ],
        conceptos: [
          { nombre: 'MMU', descripcion: 'Unidad de Gestión de Memoria. Traduce direcciones virtuales a físicas.' },
          { nombre: 'TLB', descripcion: 'Búfer de Traducción Anticipada. Caché ultrarrápida dentro de la MMU.' },
        ],
      },
      {
        id: '3.6.2',
        slug: 'manejo-de-fallas-de-pagina',
        titulo: 'Manejo de fallas de página',
        presentador: 'Briguera Mateo',
        tipo: 'timeline',
        introduccion:
          'Cuando un proceso intenta acceder a una página que no está en memoria física, el hardware genera una secuencia de 10 pasos orquestados entre hardware, SO y disco.',
        secciones: [
          { titulo: 'Trap', items: ['El hardware genera un trap al kernel y guarda el PC en la pila.'] },
          { titulo: 'Guardado de estado', items: ['Una rutina en ensamblador guarda los registros generales y la información volátil de la CPU.'] },
          { titulo: 'Identificación', items: ['El SO determina qué página virtual se necesita leyendo registros de hardware.'] },
          { titulo: 'Verificación y Reemplazo', items: ['El SO comprueba si la dirección es válida, busca un marco libre o ejecuta el algoritmo de reemplazo.'] },
          { titulo: 'Escritura (si está sucia)', items: ['Si la página víctima fue modificada, se planifica su escritura en disco y se suspende el proceso.'] },
          { titulo: 'Lectura', items: ['El SO busca la página en disco y planifica su lectura. El proceso sigue suspendido.'] },
          { titulo: 'Actualización', items: ['Al terminar la lectura, se actualizan las tablas de páginas y el marco se marca como normal.'] },
          { titulo: 'Respaldo del PC', items: ['Se restablece el PC al estado previo al fallo.'] },
          { titulo: 'Planificación', items: ['El proceso se vuelve a planificar y el SO regresa a la rutina ensamblador.'] },
          { titulo: 'Reanudación', items: ['La rutina recarga los registros y el proceso continúa como si nada hubiera pasado.'] },
        ],
        conceptos: [
          { nombre: 'Trap', descripcion: 'Señal que el procesador genera para pausar un programa y ceder el control al kernel.' },
        ],
      },
      {
        id: '3.6.3',
        slug: 'respaldo-de-instruccion',
        titulo: 'Respaldo de Instrucción',
        presentador: 'Briguera Mateo',
        introduccion:
          'Cuando ocurre un fallo de página a mitad de una instrucción, el SO debe reiniciarla desde el principio. Esto es complejo porque la instrucción pudo haberse ejecutado parcialmente.',
        secciones: [
          { titulo: 'Ambigüedad del PC', items: ['En arquitecturas complejas, el fallo puede ocurrir en cualquier punto. El PC puede apuntar a lugares intermedios.', 'El SO no sabe con certeza dónde empezaba la instrucción.'] },
          { titulo: 'Efectos secundarios', items: ['Si una instrucción modifica un registro antes del fallo, el SO debe deducir si el cambio ocurrió.', 'Debe deshacer el efecto en software antes de reiniciar.'] },
          { titulo: 'Solución en CPU modernas', items: ['Registros ocultos que guardan copia exacta del PC antes de cada instrucción.', 'Registran qué efectos secundarios ya se completaron.', 'Si la CPU no los tiene, el SO debe analizar la instrucción por software.'] },
        ],
      },
      {
        id: '3.6.4',
        slug: 'bloqueo-de-paginas-en-memoria',
        titulo: 'Bloqueo de páginas en memoria (Pinning)',
        presentador: 'Briguera Mateo',
        introduccion:
          'Existe un peligro crítico cuando interactúan la memoria virtual y las operaciones de E/S. Si un proceso se suspende durante una transferencia DMA, sus páginas pueden ser desalojadas, corrompiendo datos.',
        secciones: [
          { titulo: 'El problema', items: ['El dispositivo escribe directamente en memoria física mediante DMA.', 'Si la página del búfer se desaloja antes de terminar, los datos se corrompen.'] },
          { titulo: 'Solución 1: Pinning', items: ['Bloquear los marcos involucrados en la E/S para que no sean reemplazados.', 'Simple pero reduce la disponibilidad de memoria.'] },
          { titulo: 'Solución 2: Búferes del kernel', items: ['La E/S se realiza en búferes del kernel (nunca paginados).', 'Al completar, se copia al espacio de usuario. Evita la corrupción pero introduce una copia extra.'] },
        ],
      },
      {
        id: '3.6.5',
        slug: 'almacen-de-respaldo',
        titulo: 'Almacén de respaldo',
        presentador: 'Nicolas Piñan',
        introduccion:
          'Cuando la RAM se llena, el SO guarda páginas en el disco (HDD o SSD). Este espacio se conoce como almacén de respaldo o swap.',
        secciones: [
          {
            titulo: 'El Tipo de Contenedor: Partición Dedicada vs. Archivo de Intercambio',
            items: [
              'Partición dedicada (Swap Partition): Porción del disco sin sistema de archivos, reservada exclusivamente para swap. El kernel accede directamente mediante números de bloque. Es más rápida pero menos flexible. Enfoque clásico de UNIX/Linux.',
              'Archivo de intercambio (Swap File): Archivo especial dentro del sistema de archivos (ej. pagefile.sys en Windows). El SO escribe páginas dentro de ese archivo. Es más flexible (redimensionable) pero más lento por la sobrecarga del sistema de archivos.',
            ],
          },
          {
            titulo: 'La Estrategia de Asignación: Estática vs. Dinámica',
            items: [
              'Asignación Estática: Al iniciar el proceso se reserva un bloque fijo en disco del tamaño de su espacio de direcciones. Apenas arranca, el SO carga páginas a la RAM pero el contenido original queda en el disco (Copia de Sombra). Si la página nunca se modificó (bit M=0), al ser expulsada se descarta sin escribir, porque la copia en disco ya está vigente. Si se modificó (bit M=1), se escribe sobre la Copia de Sombra para actualizarla. Falla si el proceso crece más de lo reservado.',
              'Asignación Dinámica: No reserva espacio por adelantado. Solo se asigna un bloque en disco cuando una página es expulsada. El kernel mantiene un mapa del disco por proceso. Maximiza el uso del disco pero genera mayor sobrecarga de CPU.',
            ],
          },
          {
            titulo: 'Optimización: Código de Solo Lectura',
            items: [
              'Las páginas de código (instrucciones) son de solo lectura y nunca cambian.',
              'El SO no gasta swap para el código: usa el propio archivo ejecutable original (.exe o binario) como almacén de respaldo.',
              'Si la RAM se llena, el código se descarta y se vuelve a leer del ejecutable original cuando sea necesario.',
            ],
          },
        ],
        conceptos: [
          { nombre: 'Tipo de Contenedor', descripcion: 'Es el espacio físico en el disco donde el SO guarda las páginas desalojadas de la RAM. Puede ser una partición dedicada (swap partition, sin sistema de archivos, acceso directo) o un archivo de intercambio (swap file, dentro del sistema de archivos, flexible pero más lento).' },
          { nombre: 'Estrategia de Asignación', descripcion: 'Define cómo se distribuye el espacio en disco para las páginas de cada proceso. Puede ser estática (se reserva un bloque fijo al iniciar el proceso, con Copia de Sombra y bit M) o dinámica (se asigna bajo demanda cuando una página es expulsada, usando un mapa del disco por proceso).' },
        ],
      },
      {
        id: '3.6.6',
        slug: 'separacion-de-politica-y-mecanismo',
        titulo: 'Separación de política y mecanismo',
        presentador: 'Nicolas Piñan',
        introduccion:
          'Para mantener el núcleo del SO modular y evitable, los diseñadores separan la administración de memoria en dos categorías: el mecanismo (cómo se hace, en kernel) y la política (qué y cuándo se hace, en espacio de usuario).',
        secciones: [
          {
            titulo: 'El Principio: Política vs. Mecanismo',
            items: [
              'Mecanismo (el "cómo"): herramientas de bajo nivel que ejecutan físicamente las acciones. Reside en el kernel e interactúa directamente con el hardware (MMU, TLB).',
              'Política (el "qué" y "cuándo"): decisiones estratégicas como qué página reemplazar, cuándo traer una página, etc. Se ejecuta en espacio de usuario como un proceso más.',
              'Separarlos mantiene el kernel pequeño, modular y portable entre arquitecturas.',
            ],
          },
          {
            titulo: 'La Arquitectura de Tres Componentes (El Modelo Mach)',
            items: [
              'Manejador de la MMU de bajo nivel (kernel): interactúa directamente con el hardware de la MMU y el TLB. Es dependiente de la arquitectura.',
              'Manejador de fallos de página (kernel): independiente de la máquina. Atrapa los fallos de página y coordina con el paginador externo.',
              'Paginador externo (usuario): proceso en espacio de usuario que implementa la política de memoria virtual (qué página reemplazar, cuándo traer una página, etc.).',
            ],
          },
          {
            titulo: 'El Flujo de un Fallo de Página: Cruzando la Frontera',
            items: [
              '1. El proceso genera un fallo atrapado por el Manejador de fallos del kernel.',
              '2. El kernel envía un mensaje al Paginador Externo (usuario).',
              '3. El Paginador busca la página en disco y decide qué hacer.',
              '4. Envía los datos al manejador del kernel.',
              '5. El manejador configura la MMU y reanuda el proceso.',
            ],
          },
          {
            titulo: 'El Dilema Técnico: Los Bits R y M',
            items: [
              'El paginador externo (política) necesita conocer los bits R (referencia) y M (modificación) de cada página para tomar decisiones de reemplazo.',
              'Problema: solo el kernel (mecanismo) tiene acceso a la MMU donde residen estos bits.',
              'Solución A — Pasar info constantemente: el kernel envía los bits R y M al paginador externo en cada fallo. Es lento por la comunicación constante entre kernel y usuario.',
              'Solución B — Dejar algoritmo en kernel: el kernel mismo ejecuta la política de reemplazo. Rompe la separación y hace al kernel menos modular.',
            ],
          },
        ],
        conceptos: [
          { nombre: 'Principio de Separación', descripcion: 'Divide la administración de memoria en mecanismo (kernel: ejecuta acciones a nivel hardware) y política (usuario: decide qué y cuándo hacerlo). Mantiene el kernel pequeño, modular y portable entre arquitecturas.' },
          { nombre: 'Dilema Técnico del Acceso (Bits R y M)', descripcion: 'El paginador externo necesita los bits R y M para decidir el reemplazo, pero solo el kernel puede acceder a la MMU. Soluciones: pasar la info constantemente (lento) o ejecutar la política en kernel (rompe separación).' },
        ],
      },
    ],
  },
  'segmentacion': {
    introduccion:
      'La segmentación es una técnica de administración de memoria que divide el espacio de direcciones de un programa en segmentos lógicos de tamaño variable, como código, datos y pila. A diferencia de la paginación, que usa bloques de tamaño fijo, la segmentación permite que cada segmento crezca según las necesidades del programa.',
    secciones: [
      {
        titulo: 'Concepto de segmentación',
        items: [
          'Cada segmento tiene un nombre y una longitud específica.',
          'Las direcciones lógicas se expresan como (número de segmento, desplazamiento).',
          'La tabla de segmentos (en la CPU) mapea cada segmento a su base y límite en memoria física.',
        ],
      },
      {
        titulo: 'Ventajas',
        items: [
          'Facilita el crecimiento dinámico de estructuras de datos.',
          'Permite compartir segmentos entre procesos (ej. bibliotecas compartidas).',
          'Simplifica la protección de memoria por segmento (lectura/escritura/ejecución).',
        ],
      },
      {
        titulo: 'Desventajas',
        items: [
          'Fragmentación externa: los agujeros entre segmentos dificultan la asignación.',
          'Requiere gestión compleja de memoria para compactación.',
          'Los segmentos de tamaño variable hacen más complejo el reemplazo en disco.',
        ],
      },
    ],
    conceptos: [
      { nombre: 'Tabla de Segmentos', descripcion: 'Estructura en la CPU que contiene la base y el límite de cada segmento en memoria física.' },
      { nombre: 'Fragmentación Externa', descripcion: 'Espacio libre no contiguo entre segmentos que dificulta asignar nuevos segmentos grandes.' },
    ],
    subtemas: [
      {
        id: '3.7.1',
        slug: 'implementacion-de-segmentacion-pura',
        titulo: 'Implementación de segmentación pura',
        presentador: 'Grando Fidel',
        secciones: [
          {
            static: true,
            component: 'fragmentacion-externa',
            titulo: 'Fragmentación externa y compactación',
            intro: 'Se diferencia de la paginación principalmente en que las páginas tienen un tamaño físico y los segmentos no.',
            items: [
              'Este es el principal problema de la Segmentación pura.',
              'En este recuadro podemos ver cómo se desarrolla la Fragmentación Externa (efecto tablero de ajedrez), donde básicamente, los segmentos grandes se van liberando (los procesos finalizan) y van siendo ocupados por segmentos más pequeños, lo que genera que hayan pequeñas porciones de memoria desperdiciadas.',
              'Para solucionar esto se creó la compactación (3-34(e)), que básicamente junta todos los segmentos y los huecos se consolidan en uno solo grande, quedando espacio contiguo utilizable.',
              'La compactación tiene un costo alto: el SO tiene que mover segmentos en memoria y actualizar las tablas de segmentos. No es gratis.',
            ],
          },
        ],
      },
      {
        id: '3.7.2',
        slug: 'segmentacion-con-paginacion-multics',
        titulo: 'Segmentación con paginación: MULTICS',
        presentador: 'Grando Fidel',
        introduccion:
          'MULTICS (Multiplexed Information and Computing Service) combinó segmentación y paginación para obtener lo mejor de ambos mundos: segmentos lógicos de tamaño variable con paginación interna que elimina la fragmentación externa.',
        secciones: [
          { titulo: 'Arquitectura MULTICS', items: ['Cada segmento se divide en páginas de tamaño fijo.', 'La dirección lógica tiene tres niveles: (segmento, página, desplazamiento).', 'Dos niveles de tablas: tabla de segmentos (por proceso) y tabla de páginas (por segmento).'] },
          { titulo: 'Ventajas de la combinación', items: ['Segmentos lógicos visibles al programador.', 'Paginación interna que evita la fragmentación externa.', 'Cada segmento puede paginarse independientemente.'] },
          { titulo: 'Protección y compartición', items: ['Los segmentos compartidos se marcan en la tabla de segmentos.', 'Diferentes procesos pueden tener distintos permisos sobre el mismo segmento.', 'La paginación permite que las páginas de un segmento estén dispersas en RAM.'] },
        ],
        conceptos: [
          { nombre: 'MULTICS', descripcion: 'Sistema operativo pionero que combinó segmentación con paginación, inspirando diseños modernos como el de Intel Pentium.' },
        ],
      },
      {
        id: '3.7.3',
        slug: 'segmentacion-con-paginacion-intel-pentium',
        titulo: 'Segmentación con paginación: Intel Pentium',
        presentador: 'Julian Patricio Urgaregui',
        introduccion:
          'La arquitectura Intel Pentium implementa segmentación con paginación como evolución del diseño de MULTICS, añadiendo múltiples modos de operación y compatibilidad hacia atrás.',
        secciones: [
          { titulo: 'Modos de operación', items: ['Modo real: segmentación básica de 16 bits (compatibilidad con 8086).', 'Modo protegido: segmentación de 32 bits con protección por anillos (ring 0-3).', 'Modo de 64 bits (long mode): segmentación minimizada, paginación obligatoria.'] },
          { titulo: 'Segmentación en modo protegido', items: ['Los segmentos se definen en la GDT (Global Descriptor Table) y LDT (Local Descriptor Table).', 'Cada entrada describe base, límite y privilegios del segmento.', 'Los registros de segmento (CS, DS, SS, ES, FS, GS) apuntan a entradas de estas tablas.'] },
          { titulo: 'Paginación en Pentium', items: ['Tabla de páginas de dos niveles: directorio de páginas y tabla de páginas.', 'Páginas de 4 KB por defecto, con soporte para páginas de 4 MB.', 'El TLB acelera la traducción, con soporte para PGE (Global Pages) para evitar flushing innecesario.'] },
          { titulo: 'Combinación segmentación + paginación', items: ['La dirección lógica se traduce a lineal mediante segmentación.', 'La dirección lineal se traduce a física mediante paginación.', 'Permite segmentos grandes que se pagan internamente, combinando protección lógica con eficiencia de paginación.'] },
        ],
        conceptos: [
          { nombre: 'GDT/LDT', descripcion: 'Tablas de descriptores globales y locales que definen los segmentos en el procesador Intel.' },
          { nombre: 'Anillos de Protección', descripcion: 'Niveles de privilegio (ring 0 = kernel, ring 3 = usuario) que controlan el acceso a segmentos y páginas.' },
        ],
      },
    ],
  },
}

const subtemasPorSlug = {}
for (const [parentSlug, entry] of Object.entries(contenido)) {
  for (const st of entry.subtemas ?? []) {
    subtemasPorSlug[st.slug] = { ...st, parentSlug }
  }
}

export { subtemasPorSlug }
