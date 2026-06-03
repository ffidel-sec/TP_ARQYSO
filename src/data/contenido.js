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
            titulo: 'Las estructuras de control',
            items: [
              'Primero, el SO mantiene un PCB — Process Control Block — por cada proceso. El PCB contiene la dirección al segmento del descriptor de su proceso. Cuando el SO cambia de proceso, carga esa dirección en el hardware y listo.',
              'Segundo, el segmento del descriptor. Hay uno por proceso, y es básicamente la tabla maestra. Podemos pensarlo como el README de un repositorio — cada línea es un descriptor de un segmento distinto. Con solo leer el segmento del descriptor sabemos todo sobre la memoria del proceso.',
              'Tercero, el descriptor del segmento. Es una estructura de 36 bits que funciona como el carnet de identidad de un segmento. Contiene el puntero a la tabla de páginas de ese segmento, los permisos de acceso — lectura, escritura, ejecución — y el tamaño en páginas.',
              'Cuarto, la tabla de páginas. Hay una por segmento. Le dice al sistema en qué marco de RAM está cada página, o si está en disco esperando ser cargada.',
            ],
          },
          {
            static: true,
            component: 'jerarquia-multics',
            titulo: 'Jerarquía de memoria en MULTICS',
          },
          {
            static: true,
            titulo: 'Traducción de dirección',
            items: [
              'Cuando la CPU quiere acceder a una dirección de memoria, esa dirección tiene 34 bits divididos en tres partes: 18 bits para el número de segmento, 6 bits para el número de página, y 10 bits para el desplazamiento dentro de la página.',
              'El algoritmo es el siguiente:',
              '1. El número de segmento se usa para encontrar el descriptor en el segmento del descriptor.',
              '2. El descriptor apunta a la tabla de páginas de ese segmento.',
              '3. El número de página busca en esa tabla y obtiene el marco físico en RAM.',
              '4. Al marco se le suma el desplazamiento y se obtiene la dirección física final.',
              'Sin optimización esto implica 3 accesos a RAM solo para traducir una dirección. Por eso existe el TLB.',
            ],
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
          {
            titulo: 'En la práctica, nadie usa la segmentación',
            items: [
              'Toda esta arquitectura tiene una ironía práctica. Linux, Windows y macOS definen todos sus segmentos con Base 0 y Límite máximo (4\u202fGB), lo que hace que la dirección lineal siempre sea igual al desplazamiento y la segmentación quede completamente anulada.',
              'En la práctica, estos sistemas operativos usan el Pentium como si fuera un procesador de paginación pura, ignorando la segmentación para simplificar la portabilidad a otras arquitecturas.',
              'Tanenbaum: "Todos los sistemas operativos actuales para el Pentium funcionan de esta manera [paginación pura]. OS/2 fue el único que utilizó todo el poder de la arquitectura Intel MMU."',
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
}

const subtemasPorSlug = {}
for (const [parentSlug, entry] of Object.entries(contenido)) {
  for (const st of entry.subtemas ?? []) {
    subtemasPorSlug[st.slug] = { ...st, parentSlug }
  }
}

export { subtemasPorSlug }
