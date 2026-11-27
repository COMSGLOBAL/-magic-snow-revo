
const APP_CONTENT = {

  welcome: {
    title: "¡BIENVENIDO AL MANUAL!",
    subtitle: "Todo lo que necesitas saber para gestionar REVO durante Magic Snow.",
    description: "Hemos preparado este espacio de formación para acompañarte durante la campaña Magic Snow. Aprende a utilizar el datáfono y gestionar correctamente la operativa de caja a través de vídeos tutoriales, instrucciones paso a paso y ejercicios prácticos.",
    image: "datafono.png"
  },

  support: {
    email: "soporte@lacasadelascarcasas.es",
    channel: "",
    link: "mailto:soporte@lacasadelascarcasas.es"
  },

  modules: [

    // ==================================
    // 01 - INICIO
    // ==================================

    {
      id: 1,
      title: "INICIO",
      icon: "⏻",
      video: "1o4d4YRDWUY",

      description:
        "Aprende a encender el datáfono, acceder a Handy REVO, conocer las credenciales de acceso y descubrir las principales funciones del sistema.",

      steps: [

        {
          time: "00:00",
          title: "Encender el datáfono",
          text: "Al encender el dispositivo aparecerá la pantalla principal de BBVA. Encontrarás las opciones Cobros, Apps, Otros y Calculadora."
        },

        {
          time: "00:26",
          title: "Acceder a Handy REVO",
          text: "Entra en la carpeta Apps y selecciona la aplicación Handy REVO. Esta será la aplicación que utilizaremos para gestionar las ventas de Magic Snow."
        },

        {
          time: "00:36",
          title: "🔐 CREDENCIALES DE ACCESO",
          text: "Usuario: el mismo que utilizáis en la Intranet. Contraseña: igual que el usuario. Ejemplo: Usuario: tienda001 / Contraseña: tienda001."
        },

        {
          time: "00:36",
          title: "Si recibís dos datáfonos",
          text: "Si vuestra tienda recibe dos datáfonos para la campaña Magic Snow, debéis utilizar las mismas credenciales de acceso en ambos dispositivos."
        },

        {
          time: "00:55",
          title: "Cargar los productos",
          text: "Una vez introducidos el usuario y la contraseña, esperad a que se inicie la sesión y se carguen todos los productos disponibles para la campaña."
        },

        {
          time: "01:10",
          title: "🔑 PIN DE ACCESO",
          text: "¡IMPORTANTE! El PIN de acceso a REVO es siempre: 0000."
        },

        {
          time: "01:18",
          title: "Conocer la pantalla principal",
          text: "En la pantalla principal encontrarás Venta rápida, el botón R de REVO para abrir el menú lateral y el apartado de soporte."
        },

        {
          time: "01:30",
          title: "Seleccionar la vista de cuadrados",
          text: "Trabajaremos siempre con la vista de cuadrados. Para refrescar la pantalla, utiliza el botón situado en la parte inferior."
        }

      ],

      important: [
        "🔐 CREDENCIALES DE ACCESO: el usuario es el mismo que utilizáis en la Intranet y la contraseña es igual que el usuario.",
        "Ejemplo: Usuario: tienda001 / Contraseña: tienda001.",
        "Si recibís dos datáfonos, utilizad las mismas credenciales en ambos.",
        "🔑 ¡IMPORTANTE! El PIN de acceso es siempre 0000.",
        "Todos los pagos se gestionarán a través de Handy REVO.",
        "El botón Cobros de BBVA únicamente se utilizará si no funciona REVO, según lo indicado en el tutorial.",
        "No utilizaremos las carpetas Otros ni Calculadora.",
        "Utiliza siempre la vista de cuadrados.",
        "El datáfono de Magic Snow está destinado exclusivamente a la operativa de la campaña."
      ],

      checklist: [
        "He encendido el datáfono.",
        "He accedido a Apps y Handy REVO.",
        "Conozco las credenciales de acceso de mi tienda.",
        "He iniciado sesión correctamente.",
        "Sé que debo utilizar las mismas credenciales si recibimos dos datáfonos.",
        "Los productos se han cargado correctamente.",
        "Sé que el PIN de acceso es 0000.",
        "He seleccionado la vista de cuadrados.",
        "Identifico Venta rápida y el menú lateral."
      ]

    },

    // ==================================
    // 02 - APERTURA DE CAJA
    // ==================================

    {
      id: 2,
      title: "APERTURA DE CAJA",
      icon: "▣",
      video: "8AlF-eySvMM",

      description:
        "Realiza la apertura de turno y prepara la caja antes de comenzar las ventas.",

      steps: [
{
  time: "",
  title: "🔄 Sincronización diaria",
  text: "Como buena práctica, recomendamos pulsar Sync (Sincronizar) en el menú lateral de REVO cada mañana antes de comenzar las ventas. De esta forma, se descargarán las últimas actualizaciones del catálogo: cambios de precios, nuevos productos y otras modificaciones."
},
        {
          time: "00:05",
          title: "Acceder a Control de caja",
          text: "Abre el menú lateral mediante el botón R y selecciona Control de caja. Encontrarás las opciones Abrir turno, Entrada/Salida y Reporte Z."
        },

        {
          time: "00:14",
          title: "Abrir turno",
          text: "Selecciona Abrir turno e introduce el efectivo correspondiente al fondo inicial de caja: 150 €. Confirma la apertura."
        },

        {
          time: "00:28",
          title: "Acceder a Venta rápida",
          text: "Una vez abierto el turno, selecciona Venta rápida para comenzar la operativa de venta."
        },

        {
          time: "00:37",
          title: "Consultar los productos disponibles",
          text: "Encontrarás el producto Magic Snow y, si tu tienda o pop-up dispone de ellos para la campaña, también aparecerán los Squishies."
        },

        {
          time: "00:44",
          title: "Añadir productos a la venta",
          text: "Pulsa sobre el producto correspondiente. Cada pulsación añadirá automáticamente una unidad a la venta."
        }

      ],

     
important: [
  "🔄 BUENA PRÁCTICA: sincroniza REVO cada mañana antes de comenzar las ventas.",
  "La sincronización permite descargar cambios de precios, nuevos productos y otras actualizaciones del catálogo.",
  "Realiza la apertura de turno todos los días antes de comenzar las ventas.",
  "El fondo inicial de caja será de 150 €.",
  "Comprueba que el turno está abierto antes de vender.",
  "Los productos disponibles pueden variar según la tienda o pop-up."
],

checklist: [
  "He sincronizado REVO antes de comenzar las ventas.",
  "He accedido a Control de caja.",
  "He seleccionado Abrir turno.",
  "He introducido el fondo inicial de 150 €.",
  "He confirmado la apertura de caja.",
  "He accedido a Venta rápida.",
  "He comprobado los productos disponibles."
]


    },

    // ==================================
    // 03 - COBROS CON DATÁFONO
    // ==================================

    {
      id: 3,
      title: "COBROS CON DATÁFONO",
      icon: "▤",
      video: "BiY1IvGjqZI",

      description:
        "Aprende a gestionar las ventas, aplicar descuentos y realizar cobros en efectivo o con tarjeta mediante REVO.",

      steps: [

        {
          time: "00:00",
          title: "Confirmar los productos",
          text: "Una vez seleccionados los productos y cantidades correspondientes, pulsa Hecho para acceder a la pantalla de cobro."
        },

        {
          time: "00:05",
          title: "Aplicar descuentos",
          text: "Desde la pantalla de cobro podrás aplicar el descuento del 50% o el descuento Family, únicamente cuando corresponda."
        },

        {
          time: "00:18",
          title: "Eliminar una venta",
          text: "Si se ha producido una confusión antes de cobrar, accede a Opciones y selecciona la opción para eliminar la venta."
        },

        {
          time: "00:28",
          title: "Acceder al cobro",
          text: "Pulsa el botón circular de Cobrar para seleccionar el método de pago."
        },

        {
          time: "00:34",
          title: "Introducir el efectivo recibido",
          text: "Si el cliente paga en efectivo, introduce la cantidad que te ha entregado. REVO calculará automáticamente el cambio que debes devolver."
        },

        {
          time: "00:45",
          title: "Confirmar el cobro en efectivo",
          text: "Pulsa el icono del billete de 100 para confirmar el pago en efectivo. El datáfono imprimirá automáticamente el ticket."
        },

        {
          time: "01:04",
          title: "Cobrar con tarjeta",
          text: "Selecciona el producto, pulsa Hecho, accede a Cobrar y selecciona el método de pago con tarjeta."
        },

        {
          time: "01:11",
          title: "Utilizar el lector de tarjetas",
          text: "Utiliza el lector del datáfono y completa el cobro con normalidad."
        }

      ],

      important: [
        "Comprueba los productos y cantidades antes de cobrar.",
        "Aplica descuentos únicamente cuando corresponda.",
        "Selecciona correctamente el método de pago.",
        "En los pagos en efectivo, comprueba el cambio indicado por REVO."
      ],

      checklist: [
        "Sé confirmar los productos de una venta.",
        "Sé aplicar los descuentos correspondientes.",
        "Sé eliminar una venta antes de cobrar.",
        "Sé realizar un cobro en efectivo.",
        "Sé comprobar el cambio.",
        "Sé realizar un cobro con tarjeta."
      ]

    },

    // ==================================
    // 04 - DEVOLUCIONES
    // ==================================

    {
      id: 4,
      title: "DEVOLUCIONES",
      icon: "↶",
      video: "L_JP7XzSS4U",

      description:
        "Localiza una venta en el Histórico de REVO y realiza su devolución mediante el método de pago original.",

      steps: [

        {
          time: "00:08",
          title: "Acceder al Histórico",
          text: "Abre el menú lateral mediante el botón R y selecciona Histórico."
        },

        {
          time: "00:14",
          title: "Localizar la compra",
          text: "Busca la fecha en la que se realizó la compra. REVO mostrará el listado de las ventas realizadas ese día."
        },

        {
          time: "00:22",
          title: "Seleccionar Hacer devolución",
          text: "Identifica la venta correspondiente, pulsa los tres puntos y selecciona Hacer devolución."
        },

        {
          time: "00:30",
          title: "Gestionar la devolución",
          text: "La devolución se realiza mediante el método de pago original. Si la compra fue con tarjeta, se devolverá mediante tarjeta. Si fue en efectivo, devolveremos el importe en efectivo."
        }

      ],

      important: [
        "Las devoluciones se gestionan desde Histórico.",
        "Comprueba que has localizado la compra correcta.",
        "Utiliza siempre el mismo método de pago de la compra original."
      ],

      checklist: [
        "Sé acceder al Histórico.",
        "Sé buscar una compra por fecha.",
        "Sé localizar la venta correcta.",
        "Identifico la opción Hacer devolución.",
        "Sé gestionar una devolución en efectivo.",
        "Sé gestionar una devolución con tarjeta."
      ]

    },

    // ==================================
    // 05 - CIERRE DE TURNO E INFORME Z
    // ==================================

    {
      id: 5,
      title: "CIERRE DE TURNO E INFORME Z",
      icon: "▥",
      video: "hxzUyt_-xGc",

      description:
        "Realiza el cierre diario de caja, comprueba el efectivo y obtén el Informe Z.",

      steps: [

        {
          time: "00:00",
          title: "Acceder a Control de caja",
          text: "Al finalizar la jornada, abre el menú lateral, accede a Control de caja y selecciona Cerrar turno."
        },

        {
          time: "00:05",
          title: "Realizar el recuento de efectivo",
          text: "Cuenta el efectivo disponible teniendo en cuenta el fondo inicial de 150 € y los movimientos de efectivo realizados durante la jornada."
        },

        {
          time: "00:13",
          title: "Completar el cierre de turno",
          text: "Introduce el efectivo correspondiente y completa el cierre. En el ejemplo del tutorial, el fondo inicial de 150 € y unas ventas en efectivo de 150 € dan un total de 300 €."
        },

        {
          time: "00:22",
          title: "Obtener el Informe Z",
          text: "Una vez cerrado el turno, selecciona Reporte Z e imprime el informe."
        },

        {
          time: "00:31",
          title: "Comprobar los importes",
          text: "En el Informe Z podrás consultar los totales, las cantidades y el fondo de caja inicial y final. Comprueba que los importes coinciden."
        },

        {
          time: "00:40",
          title: "Volver a acceder a REVO",
          text: "Si sales accidentalmente de la aplicación, vuelve a acceder a Handy REVO, introduce siempre el PIN 0000 y sincroniza la aplicación."
        },

        {
          time: "00:52",
          title: "Sincronizar la aplicación",
          text: "Siempre que desde Central se comunique una actualización, utiliza la opción Sincronizar del menú lateral."
        },

        {
          time: "01:06",
          title: "Soporte y cierre de sesión",
          text: "Desde el menú lateral podrás cerrar sesión o acceder a ayuda. Ante cualquier incidencia, contacta directamente con nuestro equipo de soporte interno a través de soporte@lacasadelascarcasas.es."
        }

      ],

      important: [
        "Realiza el cierre de turno todos los días al finalizar la jornada.",
        "Ten en cuenta el fondo inicial de 150 €.",
        "Imprime el Informe Z y comprueba los importes.",
        "Recuerda que el PIN de REVO es siempre 0000.",
        "Sincroniza REVO cuando Central comunique una actualización.",
        "Ante cualquier incidencia, contacta con soporte@lacasadelascarcasas.es."
      ],

      checklist: [
        "He accedido a Control de caja.",
        "He realizado el recuento de efectivo.",
        "He tenido en cuenta el fondo inicial.",
        "He completado el cierre de turno.",
        "He obtenido e impreso el Informe Z.",
        "He comprobado los importes.",
        "Sé cuándo debo sincronizar REVO.",
        "Sé a quién contactar en caso de incidencia."
      ]

    },

    // ==================================
    // 06 - DUDAS Y SOPORTE
    // ==================================

    {
      id: 6,
      title: "DUDAS Y SOPORTE",
      icon: "?",
      video: null,

      description:
        "Consulta las preguntas frecuentes y los canales de ayuda durante la campaña Magic Snow.",

      faq: [

        {
          question: "¿Qué aplicación debo utilizar?",
          answer: "Handy REVO. Encontrarás la aplicación dentro de la carpeta Apps del datáfono."
        },

        {
          question: "¿Cuáles son las credenciales de acceso a REVO?",
          answer: "El usuario es el mismo que utilizáis en la Intranet y la contraseña es igual que el usuario. Ejemplo: Usuario: tienda001 / Contraseña: tienda001."
        },

        {
          question: "¿Qué ocurre si recibimos dos datáfonos?",
          answer: "Debéis utilizar las mismas credenciales de acceso de vuestra tienda en ambos datáfonos."
        },

        {
          question: "¿Cuál es el PIN de REVO?",
          answer: "¡IMPORTANTE! El PIN que debes introducir siempre es 0000."
        },

        {
          question: "¿Qué hago si no puedo iniciar sesión?",
          answer: "Comprueba que estás utilizando el usuario y la contraseña correspondientes a tu tienda. Si la incidencia continúa, contacta con soporte@lacasadelascarcasas.es."
        },

        {
          question: "¿Qué hago si no funciona Handy REVO?",
          answer: "Según el tutorial de inicio, la opción Cobros de BBVA se utilizará únicamente cuando no funcione Handy REVO. Contacta con soporte interno para resolver la incidencia."
        },

        {
          question: "¿Con cuánto efectivo debo abrir la caja?",
          answer: "El fondo inicial de caja será de 150 €. Accede a Control de caja y selecciona Abrir turno."
        },

        {
          question: "¿Cómo añado productos a la venta?",
          answer: "Accede a Venta rápida. Cada pulsación sobre el producto añadirá una unidad a la venta."
        },

        {
          question: "¿Cómo elimino una venta antes de cobrar?",
          answer: "Desde la pantalla de cobro, accede a Opciones y selecciona la opción para eliminar la venta."
        },

        {
          question: "¿Qué descuentos puedo aplicar?",
          answer: "En la pantalla de cobro están disponibles los descuentos del 50% y Family. Aplícalos únicamente cuando corresponda."
        },

        {
          question: "¿Cómo sé cuánto cambio debo devolver?",
          answer: "Introduce en REVO el importe entregado por el cliente. La aplicación calculará automáticamente el cambio."
        },

        {
          question: "¿Qué hago si se rechaza un pago?",
          answer: "Contacta con nuestro equipo de soporte interno a través de soporte@lacasadelascarcasas.es."
        },

        {
          question: "¿Cómo realizo una devolución?",
          answer: "Accede a Histórico, busca la fecha de compra, localiza la venta, pulsa los tres puntos y selecciona Hacer devolución."
        },

        {
          question: "¿Puedo devolver en efectivo una compra realizada con tarjeta?",
          answer: "No. La devolución debe realizarse mediante el mismo método de pago de la compra original."
        },

        {
          question: "¿Dónde encuentro el Informe Z?",
          answer: "En Control de caja, selecciona Reporte Z después de realizar el cierre de turno."
        },

        {
          question: "¿Qué hago si salgo accidentalmente de REVO?",
          answer: "Vuelve a acceder a Handy REVO, introduce el PIN 0000 y selecciona Sincronizar."
        },

        {
          question: "¿Cuándo debo sincronizar REVO?",
          answer: "Cuando Central comunique alguna actualización o después de volver a acceder tras una salida accidental de la aplicación."
        },

        {
          question: "¿Con quién contacto si tengo una incidencia?",
          answer: "Contacta directamente con nuestro equipo de soporte interno de La Casa de las Carcasas a través de soporte@lacasadelascarcasas.es."
        }

      ]

    }

  ]

};
