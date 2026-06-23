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
        titulo: 'Asignación Local',
        items: [
          'Cuando un proceso necesita espacio, el algoritmo solo puede elegir entre las páginas que le pertenecen al propio proceso.',
        ],
      },
      {
        titulo: 'Prepaginación',
        items: [
          'El SO intenta adivinar qué páginas va a necesitar el programa basándose en su comportamiento anterior. Cuando se abre un programa, el SO trae un grupo de páginas consecutivas a la RAM de golpe.',
        ],
      },
      {
        titulo: 'Asignación Global',
        items: [
          'Cuando el proceso A necesita espacio, puede elegir una página de cualquier proceso del sistema, incluso de un proceso B si este no la esta usando.',
        ],
      },
      {
        titulo: 'Paginación por Demanda',
        items: [
          'Cuando arrancas un programa, este empieza con cero páginas en la RAM. A medida que el procesador ejecuta el código y va necesitando datos, se van generando "fallos de página" y el sistema operativo las va trayendo del disco una por una.',
        ],
      },
      {
        titulo: 'Memoria Virtual',
        items: [
          'Es una técnica del sistema operativo que utiliza parte de tu disco duro o SSD como una extensión de la memoria RAM física.',
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
      {
        nombre: 'Paginación por Demanda',
        descripcion:
          'Cuando arrancas un programa, este empieza con cero páginas en la RAM. A medida que el procesador ejecuta el código y va necesitando datos, se van generando "fallos de página" y el sistema operativo las va trayendo del disco una por una.',
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
          { titulo: 'Al ocurrir un fallo de página', items: ['Lee los registros de hardware para identificar la dirección.', 'Busca la página en el disco.', 'Encuentra un marco libre (o desaloja uno).', 'Carga la página y actualiza la tabla.', 'Respalda el PC para reintentar la instrucción correspondiente a la Página.'] },
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
        componente: 'manejo-fallas',
        introduccion:
          'Cuando un proceso intenta acceder a una página que no está en memoria física, el hardware genera una secuencia de 10 pasos orquestados entre hardware, SO y disco.',
        secciones: [
          { titulo: 'Trap', items: ['El hardware hace un trap al kernel, guardando el contador de programa en la pila.'] },
          { titulo: 'Guardado de estado', items: ['Una rutina en ensamblador guarda los registros generales y la información volátil de la CPU.'] },
          { titulo: 'Identificación', items: ['El SO determina qué página virtual se necesita leyendo registros de hardware.'] },
          { titulo: 'Verificación y Reemplazo', items: ['El SO comprueba si la dirección es válida, busca un marco libre o ejecuta el algoritmo de reemplazo.'] },
          { titulo: 'Escritura (si está sucia)', items: ['Si la página víctima fue modificada, se planifica su escritura en disco y se suspende el proceso.'] },
          { titulo: 'Lectura', items: ['El SO busca la página en disco y planifica su lectura. El proceso sigue suspendido.'] },
          { titulo: 'Actualización', items: ['Al terminar la lectura, se actualizan las tablas de páginas y el marco se marca como normal.'] },
          { titulo: 'Respaldo del Contador de Programa', items: ['Se restablece el Contador de Programa al estado previo al fallo.'] },
          { titulo: 'Planificación', items: ['El proceso se vuelve a planificar y el SO regresa a la rutina ensamblador.'] },
          { titulo: 'Reanudación', items: ['La rutina recarga los registros y el proceso continúa como si nada hubiera pasado.'] },
        ],
        conceptos: [
          { nombre: 'Trap', descripcion: 'Señal que el procesador genera para pausar un programa y ceder el control al kernel.' },
          { nombre: 'Contador de Programa', descripcion: 'Es un registro fundamental dentro de la Unidad Central de Procesamiento (CPU) de una computadora.' },
          { nombre: 'Pila', descripcion: 'Es un área de memoria asignada a cada programa en ejecución. Funciona como una estructura de datos del tipo "FIFO" (Primero en entrar, primero en salir).' },
        ],
      },
      {
        id: '3.6.3',
        slug: 'respaldo-de-instruccion',
        titulo: 'Respaldo de Instrucción',
        presentador: 'Briguera Mateo',
        componente: 'respaldo-instruccion',
        introduccion:
          'Cuando ocurre un fallo de página a mitad de una instrucción, el SO tiene que reiniciarla desde el principio. Esto puede llegar a ser sumamente complejo debido a:',
      },
      {
        id: '3.6.4',
        slug: 'bloqueo-de-paginas-en-memoria',
        titulo: 'Bloqueo de páginas en memoria',
        presentador: 'Briguera Mateo',
        introduccion:
          'Existe un peligro crítico cuando interactúan la memoria virtual y las operaciones de E/S. Si un proceso se suspende durante una transferencia DMA, sus páginas pueden ser desalojadas, corrompiendo datos.',
        componente: 'bloqueo-paginas',
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
      'La memoria virtual analizada anteriormente es unidimensional, debido a que las direcciones virtuales van desde 0 hasta cierta dirección máxima, una dirección después de la otra. Para muchos problemas, tener dos o más espacios de direcciones virtuales separados puede ser mucho mejor que tener sólo uno. Por ejemplo, un compilador tiene muchas tablas que se generan a medida que procede la compilación.',
    secciones: [
      {
        static: true,
        titulo: 'El Problema de la Memoria Unidimensional',
        items: [
          'Un compilador maneja diversas tablas que crecen dinámicamente: el código fuente, la tabla de símbolos, constantes, el árbol de análisis sintáctico y la pila de llamadas.',
          'En una memoria unidimensional, estas tablas deben colocarse en trozos contiguos.',
          'Si una tabla crece demasiado, puede chocar con otra, incluso si hay espacio libre en otras partes del espacio de direcciones virtual.',
        ],
      },
      {
        static: true,
        titulo: 'El Concepto de Segmentos',
        intro: 'La solución es proporcionar segmentos: espacios de direcciones independientes.',
        figura: 'segmentos',
        items: [
          'Definición: Cada segmento es una secuencia lineal de direcciones que van desde 0 hasta un máximo permitido.',
          'Flexibilidad: Los segmentos pueden tener distintas longitudes y estas pueden cambiar durante la ejecución (por ejemplo, una pila que crece al meter datos).',
          'Independencia: Al ser espacios separados, un segmento puede crecer o reducirse sin afectar a los demás.',
          'Direccionamiento: Para especificar una dirección, el programa debe usar una dirección de dos partes: (número de segmento, dirección dentro del segmento).',
        ],
      },
      {
        static: true,
        titulo: 'Características y Ventajas de la Segmentación',
        intro: 'A diferencia de la paginación, el segmento es una entidad lógica de la que el programador es consciente. Normalmente, un segmento contiene un solo tipo de objeto, como un procedimiento, un arreglo o una pila.',
        items: [
          'Simplificación de la Vinculación: Si cada procedimiento ocupa un segmento separado empezando en la dirección 0, vincular procedimientos compilados por separado es mucho más simple.',
          'Facilidad de Recopilación: Si un procedimiento en un segmento se modifica y crece, no es necesario cambiar las direcciones iniciales de los demás procedimientos, algo que sí ocurriría en una memoria unidimensional donde están empaquetados estrechamente.',
          'Compartición de Código y Datos: Permite que varios procesos compartan, por ejemplo, una biblioteca gráfica colocándola en un segmento común, eliminando la necesidad de que cada proceso tenga su propia copia.',
          'Protección Diferenciada: Dado que cada segmento es una entidad lógica homogénea (solo código o solo datos), se pueden aplicar diferentes tipos de protección. Un segmento de procedimiento puede ser de "solo ejecución", mientras que un arreglo de datos puede ser de "lectura/escritura" pero no ejecutable, lo que ayuda a atrapar errores de programación.',
        ],
      },
      {
        static: true,
        titulo: 'Comparación con la Paginación',
        items: [
          'Mientras que la paginación es "transparente", la segmentación es una técnica de la que el usuario es consciente para organizar lógicamente sus programas.',
          'Segmentación: Se inventó para permitir que programas y datos se dividan en espacios lógicamente independientes, facilitando la compartición y la protección.',
        ],
      },
    ],
    conceptos: [
      { nombre: 'Segmento', descripcion: 'Espacio de direcciones independiente, de tamaño variable, que contiene una entidad lógica (código, datos, pila). Se identifica con un número y su dirección se expresa como (número de segmento, desplazamiento).' },
      { nombre: 'Direccionamiento Bidimensional', descripcion: 'Esquema de direcciones de dos partes: (número de segmento, dirección dentro del segmento). Permite que cada segmento tenga su propio espacio de direcciones desde 0.' },
      { nombre: 'Protección Diferenciada', descripcion: 'Capacidad de asignar permisos específicos (solo ejecución, lectura/escritura, etc.) a cada segmento según su tipo lógico, atrapando errores de programación.' },
      { nombre: 'Compartición de Segmentos', descripcion: 'Mecanismo que permite que múltiples procesos accedan al mismo segmento (ej. bibliotecas compartidas) sin tener copias duplicadas en memoria.' },
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
            intro: 'Se diferencia de la paginación principalmente en que las páginas tienen un tamaño fijo y los segmentos no.',
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
          'MULTICS (Multiplexed Information and Computing Service) es un sistema operativo que tuvo su primera versión funcional en 1969. Para entender por qué existe, primero tenemos que entender el problema que resolvió.',
        secciones: [
          {
            static: true,
            titulo: 'El problema',
            items: [
              'Antes de MULTICS, los programas se cargaban enteros en memoria RAM. Si un programa ocupaba 512 megabytes pero estaba usando solo el 10%, los 460 megabytes restantes quedaban ocupando RAM en vano. Con varios usuarios corriendo programas al mismo tiempo, la RAM se agotaba rapidísimo.',
              'La solución que propusieron los desarrolladores fue combinar dos técnicas: segmentación y paginación.',
            ],
          },
          {
            static: true,
            titulo: 'Segmentación',
            items: [
              'La segmentación consiste en dividir cada programa en partes lógicas llamadas segmentos. Cada parte tiene una función distinta:',
              'El segmento de código tiene las instrucciones en lenguaje máquina, los MOV, JMP, ADD que ejecuta la CPU.',
              'El segmento de stack tiene las variables locales, parámetros de funciones y direcciones de retorno.',
              'El segmento de heap tiene los objetos creados dinámicamente.',
              'MULTICS proveía a cada programa hasta 250.000 segmentos, y cada uno podía tener hasta 65.536 palabras de 36 bits.',
            ],
          },
          {
            static: true,
            titulo: 'Paginación',
            items: [
              'Ahora bien, si un segmento era muy grande y solo se usaba una parte, seguíamos teniendo el mismo problema. Entonces los desarrolladores optaron por paginar cada segmento — es decir, dividirlo en bloques de tamaño fijo llamados páginas.',
              'Las páginas contienen los bytes crudos del segmento. Si una página no se está usando, se manda al disco. Cuando se necesita, se carga de vuelta a RAM. De esta forma, solo ocupan RAM las páginas que realmente se están usando en ese momento.',
            ],
          },
          {
            static: true,
            numbered: true,
            titulo: 'Traducción de dirección',
            items: [
              'Cuando un proceso quiere acceder a un dato, la CPU genera una dirección virtual de 34 bits dividida en tres partes: 18 bits para el número de segmento, 6 bits para el número de página, y 10 bits para el desplazamiento dentro de la página.',
              'El algoritmo es el siguiente:',
            ],
            algorithm: [
              'La CPU recibe la dirección virtual de 34 bits del proceso activo.',
              'Busca el PCB del proceso, que le da la dirección al segmento del descriptor.',
              'Usa los 18 bits para encontrar el descriptor del segmento correspondiente dentro del segmento del descriptor.',
              'El descriptor apunta a la tabla de páginas de ese segmento. Usa los 6 bits para encontrar la página exacta y obtener el marco físico en RAM.',
              'Suma los 10 bits de offset al marco físico para llegar a la palabra exacta dentro de la página.',
            ],
            conclusion: 'Sin optimización esto implica 3 accesos a RAM solo para traducir la dirección. Por eso existe el TLB.',
          },
          {
            static: true,
            component: 'jerarquia-multics',
            titulo: 'Jerarquía de memoria en MULTICS',
          },
          {
            static: true,
            titulo: 'TLB',
            items: [
              'El TLB es una caché dentro de la CPU que guarda las 16 traducciones más recientes. Cuando llega una dirección, el hardware la busca en el TLB en paralelo. Si está, obtiene el marco directamente en un ciclo. Si no está, recorre toda la cadena y guarda el resultado en TLB para la próxima vez.',
              'MULTICS fue un sistema adelantado para su época. Muchas de sus ideas están presentes en todos los sistemas operativos que usamos hoy. La última instancia de MULTICS se apagó en el año 2000, después de correr durante 30 años.',
            ],
          },
        ],
        conceptos: [
          { nombre: 'MULTICS', descripcion: 'Sistema operativo pionero (1969) que combinó segmentación con paginación. Ofrecía hasta 250.000 segmentos por programa, cada uno con hasta 65.536 palabras de 36 bits. Su última instancia se apagó en el año 2000 tras 30 años de operación.' },
          { nombre: 'TLB', descripcion: 'Caché dentro de la CPU que guarda las 16 traducciones de dirección más recientes. Permite traducir una dirección virtual a física en un solo ciclo de reloj cuando hay acierto.' },
          { nombre: 'Descriptor de segmento', descripcion: 'Estructura de 36 bits que identifica un segmento. Contiene puntero a su tabla de páginas, permisos de acceso (lectura, escritura, ejecución) y tamaño en páginas.' },
          { nombre: 'Segmento del descriptor', descripcion: 'Tabla maestra de un proceso que contiene todos los descriptores de sus segmentos. El PCB de cada proceso apunta a su segmento del descriptor.' },
          { nombre: 'PCB', descripcion: 'Process Control Block. Estructura del SO por cada proceso que contiene, entre otros datos, la dirección al segmento del descriptor. Cuando el SO cambia de proceso, carga esta dirección en el hardware.' },
          { nombre: 'Palabra', descripcion: 'Unidad básica de datos que la CPU procesa nativamente. En MULTICS, cada palabra es de 36 bits.' },
        ],
      },
      {
        id: '3.7.3',
        slug: 'segmentacion-con-paginacion-intel-pentium',
        titulo: 'Segmentación con paginación: Intel Pentium',
        presentador: 'Julian Patricio Urgaregui',
        introduccion:
          'El Intel Pentium implementa un sistema de memoria virtual que combina segmentación y paginación, directamente inspirado en MULTICS. Sin embargo, mientras MULTICS ofrecía hasta 256\u202fK segmentos pequeños, el Pentium apuesta por menos segmentos pero enormemente más grandes: hasta 16\u202fK segmentos de hasta 4\u202fGB cada uno. Como señala Tanenbaum, pocos programas necesitan más de 1000 segmentos, pero muchos necesitan segmentos muy extensos.',
        secciones: [
          {
            titulo: 'Las dos tablas de descriptores: LDT y GDT',
            items: [
              'La LDT (Local Descriptor Table) es privada de cada proceso y describe sus segmentos propios: código, datos y pila.',
              'La GDT (Global Descriptor Table) es única y compartida por todos los procesos, y describe los segmentos del sistema operativo.',
              'Cada tabla admite hasta 8192 descriptores, por lo que un proceso puede acceder a un total de 16\u202f384 segmentos.',
              'Para trabajar con un segmento, el programa carga un selector de 16 bits en uno de los seis registros de segmento del procesador.',
              'El más importante es el registro CS (Code Segment), que contiene siempre el selector del código en ejecución, y el DS (Data Segment), para los datos.',
            ],
          },
          {
            titulo: 'Estructura del selector de 16 bits',
            items: [
              'Índice (13 bits): identifica la entrada en la tabla.',
              'GDT/LDT (1 bit): 0=GDT / 1=LDT.',
              'Nivel de privilegio (2 bits): privilegio 0 (kernel) a 3 (usuario).',
              'Cuando se carga un selector en un registro de segmento, el hardware busca el descriptor correspondiente y lo guarda en registros internos de microprograma de acceso ultrarrápido, evitando consultar la tabla en cada instrucción.',
            ],
            figura: 'selector',
            pieFigura: 'Un selector de 16 bits identifica la tabla (LDT/GDT), la entrada y el nivel de privilegio.',
          },
          {
            titulo: 'El descriptor de segmento',
            items: [
              'Base (32 bits): la dirección donde empieza el segmento en memoria.',
              'Límite (20 bits): el tamaño máximo del segmento.',
              'Bit G (granularidad): si G=0 el límite está en bytes (máx. 1\u202fMB); si G=1 está en páginas de 4\u202fKB (máx. 4\u202fGB).',
              'Bit P (presente): indica si el segmento está en RAM o en disco.',
              'Bits de protección: tipo de acceso permitido y nivel de privilegio requerido.',
            ],
          },
          {
            titulo: 'De (selector, desplazamiento) a dirección lineal',
            items: [
              'La primera etapa de la traducción es la segmentación.',
              'El hardware verifica que el segmento esté presente y que el desplazamiento no supere el límite.',
              'Luego suma el campo Base del descriptor al desplazamiento, obteniendo una dirección lineal de 32 bits.',
            ],
            figura: 'flujo',
            pieFigura: 'La etapa de segmentación produce una dirección lineal que luego entra a la paginación.',
          },
          {
            titulo: 'De dirección lineal a dirección física: paginación de dos niveles',
            items: [
              'Con 32 bits de dirección y páginas de 4\u202fKB, un segmento podría tener hasta 1 millón de páginas. Una tabla plana sería inmanejable.',
              'La solución del Pentium es una tabla de páginas de dos niveles: la dirección lineal se divide en tres campos.',
              'Una tabla de páginas de segundo nivel cubre 1024 páginas × 4\u202fKB = 4\u202fMB de memoria.',
              'Para un segmento pequeño, el directorio tiene una única entrada y solo se necesitan dos páginas de overhead.',
              'Para no repetir la traducción en cada instrucción, el procesador tiene un TLB (Translation Lookaside Buffer) que cachea las traducciones recientes.',
            ],
            figura: 'paginacion',
            pieFigura: 'La dirección lineal recorre el directorio y la tabla de páginas hasta obtener la dirección física.',
          },
          {
            titulo: 'Los cuatro anillos de protección',
            items: [
              'El Pentium implementa cuatro niveles de privilegio llamados anillos, del 0 (kernel, máximo privilegio) al 3 (usuario, mínimo privilegio).',
              'En cada momento, el proceso en ejecución y cada segmento tienen asignado su nivel.',
              'Un programa no puede acceder directamente a recursos de un anillo más privilegiado.',
              'Anillo 0 — máximo privilegio: Kernel del SO (E/S, memoria, hardware).',
              'Anillo 1 — privilegio alto: Manejador de llamadas al sistema.',
              'Anillo 2 — privilegio medio: Bibliotecas compartidas del sistema.',
              'Anillo 3 — mínimo privilegio: Programas de usuario normales.',
            ],
            figura: 'anillos',
            pieFigura: 'Los cuatro anillos de protección y su contenido típico.',
          },
          {
            titulo: 'Compuertas de llamada',
            items: [
              'Para cruzar niveles de forma controlada existen las compuertas de llamada (call gates): descriptores especiales que definen exactamente a qué puntos de entrada del código privilegiado se puede llamar mediante la instrucción CALL.',
              'El código de usuario nunca puede saltar a una dirección arbitraria del kernel, solo a los puntos de entrada oficiales.',
              'Este mecanismo fue inventado en MULTICS y el Pentium lo heredó directamente.',
            ],
          },
        ],
        conceptos: [
          { nombre: 'Selector', descripcion: 'Valor de 16 bits formado por índice (13 bits), indicador de tabla TI (1 bit) y nivel de privilegio RPL (2 bits). Identifica un segmento en la GDT o LDT.' },
          { nombre: 'GDT/LDT', descripcion: 'Tablas de descriptores globales y locales. La GDT es única del sistema; la LDT es privada por proceso. Cada una almacena hasta 8192 descriptores de segmento de 8 bytes.' },
          { nombre: 'Anillos de Protección', descripcion: 'Niveles de privilegio (ring 0 = kernel, ring 3 = usuario) que controlan el acceso a segmentos y páginas. El Pentium implementa 4 anillos, aunque los SO modernos usan solo 0 y 3.' },
          { nombre: 'Compuerta de llamada (Call Gate)', descripcion: 'Descriptor especial que define puntos de entrada autorizados a código más privilegiado. Permite cruzar anillos de forma controlada mediante CALL.' },
          { nombre: 'TLB', descripcion: 'Búfer de Traducción Anticipada. Caché ultrarrápida dentro del procesador que almacena traducciones recientes de direcciones lineales a físicas.' },
        ],
      },
    ],
  },
  'archivos': {
    introduccion:
      'Un proceso en ejecución solo puede guardar información limitada en su espacio de direcciones, y esa información desaparece cuando el proceso termina. Para el almacenamiento a largo plazo se necesita que: (1) sea posible almacenar cantidades muy grandes de información, (2) la información sobreviva a la terminación del proceso, y (3) múltiples procesos puedan acceder a la información concurrentemente. La solución del SO es la abstracción del archivo, administrada por el sistema de archivos.',
    subtemas: [
      {
        id: '4.1.1',
        slug: 'nomenclatura-de-archivos',
        titulo: 'Nomenclatura de archivos',
        presentador: '',
        introduccion:
          'Los archivos son mecanismos de abstracción: permiten almacenar y recuperar información ocultando al usuario los detalles de cómo y dónde se guarda en disco. La característica más importante de cualquier abstracción es cómo se nombran los objetos que administra. Cuando un proceso crea un archivo, le asigna un nombre. Cuando el proceso termina, el archivo sigue existiendo y otros procesos pueden acceder a él mediante ese nombre.',
        secciones: [
          {
            static: true,
            titulo: 'Reglas generales',
            items: [
              'La mayoría de los SO permiten cadenas de 1 a 255 caracteres.',
              'Se permiten letras, dígitos y algunos caracteres especiales.',
              'Sensibilidad a mayúsculas/minúsculas: UNIX distingue (maria ≠ Maria ≠ MARIA), MS-DOS/Windows no.',
            ],
          },
          {
            static: true,
            titulo: 'Extensiones de archivo',
            intro: 'Muchos SO aceptan nombres en dos partes separadas por un punto: nombre.extensión. La extensión indica la naturaleza del archivo.',
            items: [
              'archivo.c — Programa fuente en C',
              'archivo.o — Archivo objeto (compilado, sin enlazar)',
              'archivo.txt — Archivo de texto general',
              'archivo.html — Página Web en HTML',
              'archivo.jpg — Imagen codificada con estándar JPEG',
              'archivo.mp3 — Música codificada en formato MPEG capa 3',
              'archivo.pdf — Archivo en Formato de Documento Portable',
              'archivo.zip — Archivo comprimido',
              'archivo.bak — Archivo de respaldo',
            ],
          },
          {
            static: true,
            titulo: 'UNIX vs Windows',
            items: [
              'En UNIX las extensiones son convenciones (no obligatorias).',
              'En Windows el SO las reconoce y las asocia a programas específicos: hacer doble clic en archivo.pdf abre el lector de PDFs configurado.',
            ],
          },
          {
            static: true,
            titulo: 'Ejemplo en terminal',
            code: true,
            items: [
              'Crear archivos con distintas extensiones:',
              '  touch programa.c',
              '  touch notas.txt',
              '  touch imagen.jpg',
              'Listar archivos del directorio actual:',
              '  ls -l',
              'Ver solo archivos .c:',
              '  ls *.c',
              'En UNIX, los tres siguientes son archivos DISTINTOS:',
              '  touch maria',
              '  touch Maria',
              '  touch MARIA',
              '  ls -1   # muestra los tres por separado',
            ],
          },
        ],
        conceptos: [
          { nombre: 'Extensión de archivo', descripcion: 'Parte del nombre del archivo después del punto que indica su tipo o formato. En UNIX es una convención; en Windows el SO la utiliza para asociar programas.' },
          { nombre: 'Sensibilidad a mayúsculas', descripcion: 'Propiedad del sistema de archivos que determina si "Archivo.txt" y "archivo.txt" se consideran el mismo archivo o distintos. UNIX los distingue; Windows no.' },
        ],
      },
      {
        id: '4.1.2',
        slug: 'estructura-de-archivos',
        titulo: 'Estructura de archivos',
        presentador: '',
        introduccion:
          'Los archivos pueden organizarse internamente de tres maneras, dependiendo del sistema operativo y el contexto histórico.',
        secciones: [
          {
            static: true,
            titulo: '(a) Secuencia de bytes',
            intro: 'El SO no conoce ni le importa la estructura interna. Todo son bytes. El significado lo imponen los programas de usuario. UNIX y Windows usan este modelo. Máxima flexibilidad.',
            items: [
              'Ventaja: el programador tiene libertad total para organizar el contenido como quiera. El SO no interfiere.',
              'Ejemplo: el archivo "Hola mundo\\n" se ve como [72][6F][6C][61][20][6D][75][6E][64][6F][0A]',
            ],
          },
          {
            static: true,
            titulo: '(b) Secuencia de registros de longitud fija',
            intro: 'Un archivo es una sucesión de registros con estructura interna definida. La operación read devuelve un registro; write sobrescribe o agrega uno.',
            items: [
              'Fue común en mainframes con tarjetas perforadas de 80 columnas: cada tarjeta era un registro de 80 caracteres.',
              'Hoy en día obsoleto como sistema primario porque el modelo de bytes es más flexible.',
              'Ejemplo conceptual: [Registro 1: "Gato       "][Registro 2: "Vaca       "][Registro 3: "Perro      "] — cada uno de 20 bytes fijos.',
            ],
          },
          {
            static: true,
            titulo: '(c) Árbol de registros',
            intro: 'Un archivo es un árbol de registros (no necesariamente de igual longitud), cada uno con un campo llave en posición fija. El árbol se ordena por esa llave para búsqueda rápida.',
            items: [
              'La operación fundamental no es "dame el byte 40" ni "dame el registro 3", sino "dame el registro cuya llave sea Pony".',
              'Cuando insertás un registro nuevo, no elegís vos dónde va. El SO decide dónde colocarlo en el árbol para mantener el orden.',
              'Se usa aún en mainframes para procesamiento de datos comerciales.',
            ],
          },
          {
            static: true,
            titulo: 'Ejemplo en terminal',
            code: true,
            items: [
              '(a) Secuencia de bytes — crear y leer un archivo de texto plano:',
              '  echo "Hola mundo" > archivo.txt',
              '  cat archivo.txt',
              '(b) Crear un archivo con 3 registros escritos a mano:',
              '  echo "Gato              " > registros.txt',
              '  echo "Vaca              " >> registros.txt',
              '  echo "Perro             " >> registros.txt',
              '  cat registros.txt',
              '  sed -n "2p" registros.txt   # lee solo el registro 2',
              '(c) Archivo con campo llave (formato nombre:descripción):',
              '  echo "Hormiga:insecto social" > zoologico.txt',
              '  echo "Gato:felino domestico" >> zoologico.txt',
              '  echo "Pony:equido pequeno" >> zoologico.txt',
              '  echo "Rata:roedor urbano" >> zoologico.txt',
              'Buscar por llave sin recorrer todo el archivo:',
              '  grep "Pony" zoologico.txt  # Pony:equido pequeno',
              'El sistema reordena solo (sort):',
              '  echo "Cabra:rumiante" >> zoologico.txt',
              '  sort zoologico.txt  # Cabra, Gato, Hormiga, Pony, Rata',
            ],
          },
        ],
        conceptos: [
          { nombre: 'Secuencia de bytes', descripcion: 'Modelo de archivo donde el SO trata el contenido como una secuencia plana de bytes sin estructura. Usado por UNIX y Windows. Máxima flexibilidad para el programador.' },
          { nombre: 'Registro de longitud fija', descripcion: 'Modelo de archivo compuesto por registros del mismo tamaño. Históricamente usado en mainframes con tarjetas perforadas. Obsoleto como sistema primario.' },
          { nombre: 'Árbol de registros con llave', descripcion: 'Modelo de archivo donde cada registro tiene un campo llave y el SO mantiene un árbol ordenado por esa llave para búsqueda rápida. Usado en mainframes comerciales.' },
        ],
      },
      {
        id: '4.1.3',
        slug: 'tipos-de-archivos',
        titulo: 'Tipos de archivos',
        presentador: '',
        introduccion:
          'Muchos sistemas operativos, incluyendo UNIX y Windows, soportan varias categorías de archivos con funciones específicas.',
        secciones: [
          {
            static: true,
            titulo: 'Archivos regulares',
            intro: 'Son los que contienen la información del usuario. Se subdividen generalmente en:',
            items: [
              'Archivos ASCII: Constan de líneas de texto. Su gran ventaja es que pueden mostrarse, imprimirse y editarse con herramientas estándar, además de facilitar la conexión entre programas mediante canalizaciones.',
              'Archivos binarios: Son cualquier archivo que no es ASCII. Tienen una estructura interna que solo conocen los programas que los utilizan.',
            ],
          },
          {
            static: true,
            titulo: 'Directorios',
            items: [
              'Son archivos de sistema utilizados para mantener la estructura y organización del sistema de archivos.',
            ],
          },
          {
            static: true,
            titulo: 'Archivos especiales de caracteres',
            items: [
              'Se relacionan con la entrada/salida (E/S) y modelan dispositivos serie como terminales, impresoras y redes.',
            ],
          },
          {
            static: true,
            titulo: 'Archivos especiales de bloques',
            items: [
              'Se utilizan específicamente para modelar dispositivos que almacenan datos en bloques, como los discos.',
            ],
          },
          {
            static: true,
            titulo: 'Estructura de archivos binarios comunes',
            intro: 'Incluso si el sistema operativo ve un archivo solo como una secuencia de bytes, ciertos archivos binarios deben seguir formatos específicos para ser útiles:',
            items: [
              'Archivos ejecutables: Contienen secciones como un número mágico (para identificar el tipo de archivo), un encabezado con tamaños de las secciones, el texto del programa, datos, bits de reubicación y una tabla de símbolos para depuración.',
              'Archivos de archivo (Archives): Consisten en colecciones de módulos de biblioteca compilados. Cada módulo tiene un encabezado con metadatos como el nombre, la fecha y los permisos.',
            ],
          },
          {
            static: true,
            titulo: 'Estructura de archivo ejecutable y módulos objeto',
            html: `<div class="bg-white dark:bg-slate-800 rounded-xl overflow-hidden">
<div style="overflow-x:auto;padding:1.5rem">
<svg viewBox="0 0 740 640" xmlns="http://www.w3.org/2000/svg" font-family="Helvetica, Arial, sans-serif" style="max-width:100%;height:auto;display:block;margin:0 auto">
  <defs>
    <pattern id="hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="#ededed"/>
      <line x1="0" y1="0" x2="0" y2="8" stroke="#1a1a1a" stroke-width="1.1"/>
    </pattern>
  </defs>
  <style>
    .box  { fill:#ededed; stroke:#1a1a1a; stroke-width:1.4; }
    .lbl  { fill:#000; font-size:17px; }
    .sm   { fill:#000; font-size:15px; }
    .cap  { fill:#000; font-size:19px; font-style:italic; }
    .brk  { fill:none; stroke:#1a1a1a; stroke-width:1.2; }
    .lead { fill:none; stroke:#1a1a1a; stroke-width:1; }
  </style>
  <rect x="0" y="0" width="740" height="640" fill="#d9d9d9"/>
  <g>
    <rect class="box" x="95" y="65"  width="160" height="28"/>
    <rect class="box" x="95" y="93"  width="160" height="28"/>
    <rect class="box" x="95" y="121" width="160" height="28"/>
    <rect class="box" x="95" y="149" width="160" height="28"/>
    <rect class="box" x="95" y="177" width="160" height="36"/>
    <rect class="box" x="95" y="213" width="160" height="28"/>
    <rect class="box" x="95" y="241" width="160" height="30" fill="url(#hatch)"/>
    <rect class="box" x="95" y="271" width="160" height="34"/>
    <text class="sm" x="175" y="83"  text-anchor="middle">N\u00FAmero m\u00E1gico</text>
    <text class="sm" x="175" y="111" text-anchor="middle">Tama\u00F1o del texto</text>
    <text class="sm" x="175" y="139" text-anchor="middle">Tama\u00F1o de los datos</text>
    <text class="sm" x="175" y="167" text-anchor="middle">Tama\u00F1o del BSS</text>
    <text class="sm" x="175" y="194" text-anchor="middle">Tama\u00F1o de la tabla</text>
    <text class="sm" x="175" y="210" text-anchor="middle">de s\u00EDmbolos</text>
    <text class="sm" x="175" y="231" text-anchor="middle">Punto de entrada</text>
    <text class="sm" x="175" y="292" text-anchor="middle">Banderas</text>
    <rect class="box" x="95" y="305" width="160" height="68"/>
    <rect class="box" x="95" y="373" width="160" height="68"/>
    <rect class="box" x="95" y="441" width="160" height="60"/>
    <rect class="box" x="95" y="501" width="160" height="76"/>
    <text class="lbl" x="175" y="345" text-anchor="middle">Texto</text>
    <text class="lbl" x="175" y="413" text-anchor="middle">Datos</text>
    <text class="sm"  x="175" y="475" text-anchor="middle">Bits de reubicaci\u00F3n</text>
    <text class="sm"  x="175" y="533" text-anchor="middle">Tabla de</text>
    <text class="sm"  x="175" y="549" text-anchor="middle">s\u00EDmbolos</text>
    <path class="brk" d="M 88 305 q 6 5 0 10 q -6 5 0 10"/>
    <path class="brk" d="M 88 373 q 6 5 0 10 q -6 5 0 10"/>
    <path class="brk" d="M 88 441 q 6 5 0 10 q -6 5 0 10"/>
    <path class="brk" d="M 88 501 q 6 5 0 10 q -6 5 0 10"/>
    <path class="brk" d="M 58 65 h -8 v 240 h 8" stroke-width="1.3"/>
    <text class="sm" x="44" y="190" text-anchor="middle" transform="rotate(-90 44 190)">Encabezado</text>
    <text class="cap" x="175" y="600" text-anchor="middle">(a)</text>
  </g>
  <g>
    <rect class="box" x="330" y="65"  width="130" height="45"/>
    <rect class="box" x="330" y="110" width="130" height="105"/>
    <rect class="box" x="330" y="215" width="130" height="45"/>
    <rect class="box" x="330" y="260" width="130" height="105"/>
    <rect class="box" x="330" y="365" width="130" height="45"/>
    <rect class="box" x="330" y="410" width="130" height="105"/>
    <text class="sm" x="395" y="92"  text-anchor="middle">Encabezado</text>
    <text class="sm" x="395" y="158" text-anchor="middle">M\u00F3dulo</text>
    <text class="sm" x="395" y="172" text-anchor="middle">objeto</text>
    <text class="sm" x="395" y="242" text-anchor="middle">Encabezado</text>
    <text class="sm" x="395" y="308" text-anchor="middle">M\u00F3dulo</text>
    <text class="sm" x="395" y="322" text-anchor="middle">objeto</text>
    <text class="sm" x="395" y="392" text-anchor="middle">Encabezado</text>
    <text class="sm" x="395" y="458" text-anchor="middle">M\u00F3dulo</text>
    <text class="sm" x="395" y="472" text-anchor="middle">objeto</text>
    <text class="cap" x="395" y="600" text-anchor="middle">(b)</text>
  </g>
  <g>
    <line class="lead" x1="460" y1="65"  x2="530" y2="40"/>
    <line class="lead" x1="460" y1="110" x2="530" y2="270"/>
    <rect class="box" x="530" y="40"  width="130" height="70"/>
    <rect class="box" x="530" y="110" width="130" height="45"/>
    <rect class="box" x="530" y="155" width="130" height="30"/>
    <rect class="box" x="530" y="185" width="130" height="30"/>
    <rect class="box" x="530" y="215" width="130" height="55"/>
    <text class="sm" x="595" y="70"  text-anchor="middle">Nombre del</text>
    <text class="sm" x="595" y="84"  text-anchor="middle">m\u00F3dulo</text>
    <text class="sm" x="595" y="137" text-anchor="middle">Datos</text>
    <text class="sm" x="595" y="174" text-anchor="middle">Propietario</text>
    <text class="sm" x="595" y="204" text-anchor="middle">Protecci\u00F3n</text>
    <text class="sm" x="595" y="246" text-anchor="middle">Tama\u00F1o</text>
  </g>
</svg>
</div>
</div>`,
          },
        ],
      },
      {
        id: '4.1.4',
        slug: 'acceso-a-archivos',
        titulo: 'Acceso a archivos',
        presentador: '',
        introduccion:
          'Los sistemas operativos han evolucionado en su capacidad de acceder a los datos dependiendo del medio de almacenamiento utilizado.',
        secciones: [
          {
            static: true,
            titulo: 'Acceso secuencial',
            items: [
              'Era el único tipo disponible en los primeros sistemas operativos.',
              'Un proceso puede leer todos los bytes o registros en orden desde el principio, pero no puede saltar datos o leer fuera de orden.',
              'Era el método convencional cuando el medio de almacenamiento principal era la cinta magnética.',
            ],
          },
          {
            static: true,
            titulo: 'Acceso aleatorio',
            intro: 'Se hizo posible con la llegada de los discos magnéticos.',
            items: [
              'Permite leer bytes o registros en cualquier orden, accediendo a la información por llaves en lugar de solo por posición.',
              'Importancia: Es esencial para aplicaciones de bases de datos, como los sistemas de reservación de aerolíneas, donde se necesita un registro específico de forma inmediata.',
            ],
          },
          {
            static: true,
            titulo: 'Métodos para especificar la posición',
            items: [
              'Incluir la posición de inicio en cada operación read.',
              'Utilizar una operación especial llamada seek para establecer la posición actual y luego realizar lecturas secuenciales desde ese punto (método empleado por UNIX y Windows).',
            ],
          },
        ],
      },
      {
        id: '4.1.5',
        slug: 'atributos-de-archivos',
        titulo: 'Atributos de archivos',
        presentador: '',
        introduccion:
          'Además del nombre y los datos propiamente dichos, los sistemas operativos asocian información adicional a cada archivo. A este conjunto de características se le conoce como atributos o metadatos, y varían según el diseño del sistema operativo.',
        secciones: [
          {
            static: true,
            titulo: 'Categorías de atributos',
            intro: 'Los atributos más comunes se agrupan en las siguientes categorías:',
            items: [
              'Protección y seguridad: Determinan quién puede acceder al archivo y qué acciones puede realizar (lectura, escritura, ejecución). Incluye campos como Creador, Propietario y Contraseña.',
              'Banderas (Flags): Son bits que activan o desactivan propiedades específicas: solo lectura, oculto, sistema, bandera de archivo (respaldo) y bandera temporal (borrado automático al finalizar el proceso).',
              'Información de registro (para mainframes): Campos como Longitud de registro, Posición de la llave y Longitud de la llave, presentes en sistemas antiguos donde se busca información a través de claves preestablecidas.',
              'Tiempos (Timestamps): Registran la fecha y hora de la creación, del último acceso y de la última modificación. Ejemplo de uso práctico: la herramienta make compara el tiempo de modificación del código fuente con el del código objeto para saber si debe recompilar.',
              'Tamaño: Registra el tamaño actual en bytes. En sistemas operativos antiguos se requería además especificar un "tamaño máximo" para reservar espacio contiguo en disco, restricción superada en los sistemas modernos.',
            ],
          },
          {
            static: true,
            titulo: 'Tabla de atributos',
            table: true,
            rows: [
              { attr: 'Protección', meaning: 'Quién puede acceder al archivo y en qué forma' },
              { attr: 'Contraseña', meaning: 'Contraseña necesaria para acceder al archivo' },
              { attr: 'Creador', meaning: 'ID de la persona que creó el archivo' },
              { attr: 'Propietario', meaning: 'El propietario actual' },
              { attr: 'Bandera de sólo lectura', meaning: '0 para lectura/escritura; 1 para sólo lectura' },
              { attr: 'Bandera oculto', meaning: '0 para normal; 1 para que no aparezca en los listados' },
              { attr: 'Bandera del sistema', meaning: '0 para archivos normales; 1 para archivo del sistema' },
              { attr: 'Bandera de archivo', meaning: '0 si ha sido respaldado; 1 si necesita respaldarse' },
              { attr: 'Bandera ASCII/binario', meaning: '0 para archivo ASCII; 1 para archivo binario' },
              { attr: 'Bandera de acceso aleatorio', meaning: '0 para sólo acceso secuencial; 1 para acceso aleatorio' },
              { attr: 'Bandera temporal', meaning: '0 para normal; 1 para eliminar archivo al salir del proceso' },
              { attr: 'Banderas de bloqueo', meaning: '0 para desbloqueado; distinto de cero para bloqueado' },
              { attr: 'Longitud de registro', meaning: 'Número de bytes en un registro' },
              { attr: 'Posición de la llave', meaning: 'Desplazamiento de la llave dentro de cada registro' },
              { attr: 'Longitud de la llave', meaning: 'Número de bytes en el campo llave' },
              { attr: 'Hora de creación', meaning: 'Fecha y hora en que se creó el archivo' },
              { attr: 'Hora del último acceso', meaning: 'Fecha y hora en que se accedió al archivo por última vez' },
              { attr: 'Hora de la última modificación', meaning: 'Fecha y hora en que se modificó por última vez el archivo' },
              { attr: 'Tamaño actual', meaning: 'Número de bytes en el archivo' },
              { attr: 'Tamaño máximo', meaning: 'Número de bytes hasta donde puede crecer el archivo' },
            ],
          },
        ],
      },
      {
        id: '4.1.6',
        slug: 'operaciones-de-archivos',
        titulo: 'Operaciones de archivos',
        presentador: '',
        introduccion:
          'Los archivos existen para almacenar información y permitir que se recupere posteriormente. Distintos sistemas proveen diferentes operaciones para permitir el almacenamiento y la recuperación. A continuación se muestra un análisis de las llamadas al sistema más comunes relacionadas con los archivos.',
        secciones: [
          {
            static: true,
            titulo: 'Operaciones',
            items: [
              'Create (Crear): Anuncia la existencia de un nuevo archivo vacío y establece sus atributos iniciales.',
              'Delete (Eliminar): Borra el archivo del sistema para liberar el espacio que ocupaba en el disco.',
              'Open (Abrir): Antes de usar un archivo, el proceso debe abrirlo. El sistema operativo carga sus atributos y la lista de direcciones de disco en la memoria principal (RAM) para agilizar los accesos futuros.',
              'Close (Cerrar): Rompe el vínculo del proceso con el archivo, liberando el espacio en la tabla interna de archivos abiertos del sistema. Además, obliga la escritura en disco del último bloque de datos, aunque no esté lleno.',
              'Read (Leer): Recupera datos del archivo desde la posición actual del apuntador. Se debe especificar la cantidad de bytes requerida y proveer un búfer en memoria para almacenarlos.',
              'Write (Escribir): Almacena datos en el archivo. Si el apuntador está al final, el archivo crece; si está en el medio, se sobrescriben los datos preexistentes.',
              'Append (Añadir): Una variante restrictiva de Write que únicamente permite añadir datos exclusivamente al final del archivo.',
              'Seek (Buscar/Reposicionar): Para archivos de acceso aleatorio. Mueve el apuntador interno del archivo a una posición exacta para que la siguiente operación de lectura o escritura ocurra allí.',
              'Get attributes (Obtener atributos): Permite a procesos externos leer los metadatos del archivo (como hace make con las fechas de modificación).',
              'Set attributes (Establecer atributos): Permite modificar los metadatos modificables (por ejemplo, cambiar los permisos de usuario o el estado de una bandera).',
              'Rename (Renombrar): Cambia el nombre del archivo. Aunque se puede simular copiándolo con un nombre nuevo y borrando el viejo, la llamada nativa es mucho más eficiente.',
            ],
          },
        ],
      },
      {
        id: '4.1.7',
        slug: 'programa-de-ejemplo',
        titulo: 'Programa de ejemplo',
        presentador: '',
        introduccion:
          'En esta sección examinaremos un programa simple de UNIX que copia un archivo de su archivo fuente a un archivo destino. Vamos a ver de manera secuencial la lógica básica de manipulación de archivos: copiar el archivo abc a xyz. Si xyz ya existe, se sobrescribirá. En caso contrario, se creará.',
        secciones: [
          {
            static: true,
            titulo: 'Código del programa',
            source: `/* Programa para copiar archivos. La verificaci\u00F3n y el reporte de errores son m\u00EDnimos. */

#include <sys/types.h>
#include <fcntl.h>
#include <stdlib.h>
#include <unistd.h>

#define TAM_BUF 4096
#define MODO_SALIDA 0700

int main(int argc, char *argv[])
{
    int ent_da, sal_da, leer_cuenta, escribir_cuenta;
    char buffer[TAM_BUF];

    if (argc != 3) exit(1);

    ent_da = open(argv[1], O_RDONLY);
    if (ent_da < 0) exit(2);
    sal_da = creat(argv[2], MODO_SALIDA);
    if (sal_da < 0) exit(3);

    while (TRUE) {
        leer_cuenta = read(ent_da, buffer, TAM_BUF);
        if (leer_cuenta < 0) break;
        escribir_cuenta = write(sal_da, buffer, leer_cuenta);
        if (escribir_cuenta <= 0) exit(4);
    }

    close(ent_da);
    close(sal_da);
    if (leer_cuenta == 0)
        exit(0);
    else
        exit(5);
}`,
          },
          {
            static: true,
            titulo: 'Estructura y funcionamiento',
            items: [
              'Estructura y Argumentos: El programa recibe argumentos a través de la función main(argc, argv). Verifica que el usuario haya ingresado exactamente dos nombres de archivo en la terminal (argc == 3). Si la sintaxis es incorrecta, aborta con un código de error.',
              'Descriptores de Archivos: Declara variables numéricas (ent_da y sal_da) para almacenar los descriptores de archivo, que son números enteros cortos que el sistema operativo devuelve para identificar inequívocamente qué archivo se está operando.',
              'Apertura y Creación: Invoca de forma consecutiva las llamadas open (para abrir el archivo origen en modo de sólo lectura O_RDONLY) y creat (para crear el archivo destino especificando los bits de protección de salida). Si alguna de estas llamadas devuelve un valor negativo, el programa falla de inmediato.',
              'El ciclo de copia (Buffer de datos): Define un búfer en memoria de 4096 bytes (TAM_BUF). El programa entra en un ciclo infinito donde: (1) llama a read para traer un bloque de 4KB desde el origen hacia el búfer; (2) almacena la cantidad de bytes reales leídos en una variable (leer_cuenta); (3) si leer_cuenta es 0 (llegó al fin del archivo) o menor (error), sale del ciclo mediante un break; (4) llama a write para volcar en el archivo destino únicamente la cantidad de bytes que fueron leídos (leer_cuenta), evitando así basura informática en el bloque final.',
              'Cierre y Finalización: Una vez fuera del bucle, el programa ejecuta la llamada close para ambos archivos y finaliza retornando un código de salida (0 si la copia fue exitosa, u otro número entero si hubo fallos de lectura).',
            ],
          },
        ],
      },
    ],
  },
  'directorios': {
    subtemas: [
      {
        id: '4.2.1',
        slug: 'sistemas-de-directorios-de-un-solo-nivel',
        titulo: 'Sistemas de directorios de un solo nivel',
        presentador: '',
        introduccion:
          'La forma más simple de un sistema de directorios, es tener un directorio que contenga todos los archivos, a lo que se le llama Directorio Raíz, este directorio es el primer directorio, el más alto en la jerarquía de un sistema de archivos. No está contenido dentro de ninguna otra carpeta; al contrario, todas las demás carpetas y archivos del sistema nacen de él.',
        secciones: [
          {
            static: true,
            titulo: 'Ventajas',
            items: [
              'Su simpleza y la habilidad de localizar archivos con rapidez, esto pasa porque solo hay un lugar dónde buscar.',
            ],
          },
        ],
      },
      {
        id: '4.2.2',
        slug: 'sistemas-de-directorios-jerarquicos',
        titulo: 'Sistemas de directorios jerárquicos',
        presentador: '',
        introduccion:
          'Tener un nivel de Directorios, es adecuado para aplicaciones dedicadas simples, pero para usuarios modernos con miles de archivos, sería imposible encontrar algo si todos los archivos estuvieran en un solo directorio. Para esto se crean los Sistemas de Directorios Jerárquicos, es decir, un árbol de directorios, con este esquema, pueden haber tantos directorios como se necesite para agrupar los archivos de en formas naturales.',
        secciones: [
          {
            static: true,
            titulo: 'Organización moderna',
            items: [
              'La capacidad de los usuarios para crear un número arbitrario de subdirectorios provee una poderosa herramienta de estructuración para que los usuarios organicen sus archivos y sus carpetas. Por eso los sistemas de archivos modernos se organizan de esta manera.',
            ],
          },
        ],
      },
      {
        id: '4.2.3',
        slug: 'nombres-de-rutas',
        titulo: 'Nombres de rutas',
        presentador: '',
        introduccion: 'En los sistemas operativos modernos tenemos dos formas de especificar rutas dentro del sistema jerárquico de directorios: rutas absolutas y rutas relativas. Conocer la diferencia es fundamental para navegar el sistema de archivos y ejecutar comandos correctamente.',
        secciones: [
          {
            static: true,
            titulo: 'Rutas Absolutas',
            code: true,
            intro: 'Parten obligatoriamente desde el directorio raíz y son únicas: no importa desde dónde se ejecuten, siempre apuntan al mismo lugar.',
            items: [
              'En Linux, parten desde la raíz del sistema de archivos (/):',
              '  /home/usuario/Escritorio/test.py',
              'En Windows, parten desde el punto de montaje (C:\\, D:\\, E:\\...) y usan \\ como separador:',
              '  C:\\Users\\usuario\\Escritorio',
            ],
          },
          {
            static: true,
            titulo: 'Rutas Relativas',
            code: true,
            intro: 'Parten del directorio de trabajo actual (el directorio en el que se encuentra el usuario en ese momento). Por ejemplo, si estamos en:',
            items: [
              '  /home/usuario/Escritorio/',
              'Y queremos mover el archivo "nota.txt" a /home/usuario/Documentos/, podemos usar la ruta relativa:',
              '  mv nota.txt ../Documentos/',
              'Los siguientes dos comandos hacen exactamente lo mismo:',
              '  mv nota.txt ../Documentos',
              '  mv /home/usuario/Escritorio/nota.txt /home/usuario/Documentos/',
            ],
          },
          {
            static: true,
            titulo: 'Operadores de rutas relativas',
            html: `<div style="overflow-x:auto">
  <table style="width:100%;border-collapse:collapse;font-size:14px;font-family:'Courier New',monospace">
    <thead>
      <tr style="border-bottom:2px solid rgba(99,102,241,0.4)">
        <th style="padding:10px 14px;text-align:left;font-weight:700;color:#818cf8;letter-spacing:.5px">Operador</th>
        <th style="padding:10px 14px;text-align:left;font-weight:700;color:#818cf8;letter-spacing:.5px;font-family:inherit">Descripción</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid rgba(100,116,139,0.2)">
        <td style="padding:10px 14px;font-weight:700;color:#34d399">../</td>
        <td style="padding:10px 14px;color:#e2e8f0">Retrocede un directorio (directorio padre)</td>
      </tr>
      <tr style="border-bottom:1px solid rgba(100,116,139,0.2)">
        <td style="padding:10px 14px;font-weight:700;color:#34d399">../../</td>
        <td style="padding:10px 14px;color:#e2e8f0">Retrocede dos directorios (directorio abuelo)</td>
      </tr>
      <tr style="border-bottom:1px solid rgba(100,116,139,0.2)">
        <td style="padding:10px 14px;font-weight:700;color:#34d399">./</td>
        <td style="padding:10px 14px;color:#e2e8f0">Directorio actual</td>
      </tr>
      <tr>
        <td style="padding:10px 14px;font-weight:700;color:#34d399">~/</td>
        <td style="padding:10px 14px;color:#e2e8f0">Directorio <em>home</em> del usuario (<code style="background:rgba(99,102,241,0.15);padding:1px 5px;border-radius:4px;color:#e2e8f0">/home/usuario</code>)</td>
      </tr>
    </tbody>
  </table>
</div>`,
          },
          {
            static: true,
            titulo: 'Árbol del sistema de archivos',
            intro: 'Visualización interactiva del sistema jerárquico de directorios. Pasa el ratón sobre cada nodo para ver su ruta absoluta.',
            component: 'filesystem-tree',
          },
        ],
      },
      {
        id: '4.2.4',
        slug: 'operaciones-de-directorios',
        titulo: 'Operaciones de directorios',
        presentador: '',
        introduccion:
          'Los sistemas operativos exponen un conjunto de llamadas al sistema para manipular directorios. A diferencia de las operaciones sobre archivos, estas actúan sobre la estructura del árbol de directorios: permiten crearlos, eliminarlos, recorrer su contenido y gestionar vínculos entre entradas.',
        secciones: [
          {
            static: true,
            titulo: 'Llamadas al sistema',
            html: `<section class="opdir-card">
  <p class="opdir-sub">Llamadas al sistema (UNIX) y su comando equivalente en terminal</p>
  <table class="opdir-table">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Breve descripción</th>
        <th>Comando</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Create</strong></td>
        <td>Crea un directorio vacío (incluye automáticamente <code>.</code> y <code>..</code>).</td>
        <td><code>mkdir</code></td>
      </tr>
      <tr>
        <td><strong>Delete</strong></td>
        <td>Elimina un directorio. Solo puede borrarse si está vacío.</td>
        <td><code>rmdir</code> / <code>rm -rf</code></td>
      </tr>
      <tr>
        <td><strong>Opendir / Closedir</strong></td>
        <td>Abre un directorio para leer su contenido y luego lo cierra para liberar recursos.</td>
        <td><code>cd dir</code> / <code>cd ..</code></td>
      </tr>
      <tr>
        <td><strong>Readdir</strong></td>
        <td>Devuelve la siguiente entrada del directorio en formato estándar, sin exponer su estructura interna.</td>
        <td><code>ls</code></td>
      </tr>
      <tr>
        <td><strong>Rename</strong></td>
        <td>Cambia el nombre de un directorio, igual que con un archivo.</td>
        <td><code>mv</code></td>
      </tr>
      <tr>
        <td><strong>Link</strong></td>
        <td>Crea un vínculo duro: el mismo archivo aparece en varios directorios e incrementa el contador del nodo-i.</td>
        <td><code>ln origen enlace</code></td>
      </tr>
      <tr>
        <td><strong>Unlink</strong></td>
        <td>Elimina una entrada de directorio. En UNIX es la llamada real para borrar archivos.</td>
        <td><code>rm</code></td>
      </tr>
      <tr>
        <td><strong>Vínculo simbólico</strong></td>
        <td>Apunta a un archivo que nombra a otro. Puede cruzar discos y máquinas remotas, pero es menos eficiente que el vínculo duro.</td>
        <td><code>ln -s</code></td>
      </tr>
    </tbody>
  </table>
</section>
<style>
  .opdir-card {
    --opdir-bg: #1e1e2e;
    --opdir-surface: #181825;
    --opdir-border: #313244;
    --opdir-text: #cdd6f4;
    --opdir-muted: #a6adc8;
    --opdir-accent: #89b4fa;
    --opdir-code: #a6e3a1;
    max-width: 880px;
    margin: 1rem auto;
    padding: 1.5rem;
    background: var(--opdir-bg);
    border: 1px solid var(--opdir-border);
    border-radius: 12px;
    font-family: -apple-system, "Segoe UI", Roboto, sans-serif;
    color: var(--opdir-text);
    box-shadow: 0 8px 24px rgba(0,0,0,.25);
  }
  .opdir-sub { margin: 0 0 1.25rem; font-size: .9rem; color: var(--opdir-muted); }
  .opdir-table { width: 100%; border-collapse: collapse; font-size: .92rem; }
  .opdir-table th, .opdir-table td { text-align: left; padding: .7rem .85rem; border-bottom: 1px solid var(--opdir-border); vertical-align: top; }
  .opdir-table thead th { font-size: .78rem; text-transform: uppercase; letter-spacing: .06em; color: var(--opdir-muted); border-bottom: 2px solid var(--opdir-accent); }
  .opdir-table tbody tr:hover { background: var(--opdir-surface); }
  .opdir-table td:first-child { white-space: nowrap; color: var(--opdir-text); }
  .opdir-table code { font-family: "JetBrains Mono","Fira Code",Consolas,monospace; font-size: .85em; color: var(--opdir-code); background: var(--opdir-surface); padding: .12rem .4rem; border-radius: 5px; border: 1px solid var(--opdir-border); }
  @media (max-width: 600px) { .opdir-table { font-size: .82rem; } .opdir-table th, .opdir-table td { padding: .55rem .5rem; } }
</style>`,
          },
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
