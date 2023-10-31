<template>
  <div class="app">
    <h1>Descubre qué tipo de vendedor eres</h1>
    <div class="quiz">
      <h2 id="question" v-html="currentQuestion" v-if="!renderSellerDescription && !renderTryAgainText"></h2>
      <h2 id="seller-title" v-html="sellerType.title" v-if="renderSellerDescription"></h2>
      <div id="answer-buttons" v-show="showAnswers">
        <button class="btn" v-for="(answer, letter) in currentAnswers" :key="`answer-${letter}`"
          @click="checkAnswer(letter)">{{
            `${letter}. ${answer}` }}</button>
      </div>
      <p id="seller-description" v-if="renderSellerDescription" v-html="sellerType.description"></p>
      <p class="try-again-text" v-if="renderTryAgainText" v-html="tryAgainText"></p>
      <div class="btn-container">
        <button id="reset-btn" @click="resetQuiz()" v-if="renderRestartBtn">Reiniciar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// SEO
useSeoMeta({
  title: 'Descubre qué tipo de vendedor eres',
  ogTitle: 'Descubre qué tipo de vendedor eres',
  description: 'Sin importar qué tipo de vendedor seas, es importante que concretes tus tareas y que conozcas a tu cliente. Sin embargo, reconocer qué estilo manejas o de qué manera te sientes mejor a la hora de vender, puedes responder al siguiente test y así conocer cómo explotar dichas habilidades con el fin de lograr ventas exitosas.',
  ogDescription: 'Sin importar qué tipo de vendedor seas, es importante que concretes tus tareas y que conozcas a tu cliente. Sin embargo, reconocer qué estilo manejas o de qué manera te sientes mejor a la hora de vender, puedes responder al siguiente test y así conocer cómo explotar dichas habilidades con el fin de lograr ventas exitosas.',
})

// Reactive properties
const showAnswers = ref(true)
const renderSellerDescription = ref(false)
const renderRestartBtn = ref(false)
const renderTryAgainText = ref(false)
const sellerType = ref({
  title: '',
  description: ''
})
const listOfResponses = ref([])
const currentQuestionIndex = ref(0)

// Data
const questionsAndAnswer = [
  {
    question: 'Al iniciar una venta suelo:',
    answers: {
      A: 'Planificar meticulosamente cada detalle y dirijo el proceso de ventas para alcanzar los resultados deseados.',
      B: 'Construir relaciones sólidas y de confianza con los clientes, enfocándome en la comunicación y la empatía.',
      C: 'Colaborar con el cliente para llegar a una decisión consensuada, utilizando mi conocimiento para construir soluciones conjuntas.',
      D: 'Buscar toda la información posible y controlo los aspectos críticos antes de tomar medidas en la venta.'
    }
  },
  {
    question: 'A la hora de construir un ambiente de ventas prefiero',
    answers: {
      A: 'Lograr resultados y alcanzar los objetivos de venta, incluso si eso significa dirigir el proceso con poca participación del cliente.',
      B: 'Generar un ambiente de confianza y comprensión, asegurándome de que el cliente se sienta valorado y escuchado.',
      C: 'Trabajar en equipo con el cliente para encontrar soluciones que sean mutuamente beneficiosas.',
      D: 'Procurar tener todo bajo control, garantizando que el proceso de ventas sea efectivo y eficiente.'
    }
  },
  {
    question: 'Durante el proceso de venta prefiero:',
    answers: {
      A: 'Dirigir el proceso y tomo decisiones rápidas y firmes para lograr resultados concretos.',
      B: 'Establecer relaciones cálidas y amigables con los clientes, creando un ambiente de confianza y apertura.',
      C: 'Colaborar activamente con el cliente, involucrándolo en la toma de decisiones y construyendo soluciones conjuntas.',
      D: 'Tengo toda la información y el control necesario para asegurar que el proceso de venta fluya sin problemas.'
    }
  },
  {
    question: 'Cuando cierro la venta, yo...',
    answers: {
      A: 'Destaco los resultados y beneficios tangibles que el cliente obtendrá al adquirir mi producto o servicio.',
      B: 'Resalto cómo nuestra relación se fortalecerá y cómo el cliente se beneficiará de nuestra interacción continua.',
      C: 'Me aseguro de que tanto el cliente como yo estemos de acuerdo en la decisión, construyendo un consenso antes de avanzar.',
      D: 'Garantizo que todos los aspectos y detalles se hayan abordado adecuadamente antes de finalizar el proceso de venta.'
    }
  }
]
const sellerTypes = {
  dedicated: {
    title: "Tu estilo de vendedor es: 'Dedicado'",
    description:
      "Una característica que se marca mucho en tu estilo de venta es la planificación, al igual que la facilidad de dirigir los procesos comerciales y el personal relacionado, asegurando el éxito en la ejecución de las tareas con el fin de obtener resultados positivos. Aunque tus clientes no necesitan participar activamente en la venta, tu experticia, conocimientos en el producto/servicio y participación te permiten solucionar sus necesidades. Esto significa que tienes una alta orientación a la tarea pero una baja orientación a las relaciones.",
  },
  related: {
    title: "Tu estilo de vendedor es: 'Relacionado'",
    description:
      "La clave de tu ejercicio de ventas es la “confianza”, ya que te orientas más a las relaciones que a la tarea. Esta es la manera eficaz en la que has conseguido cerrar tratos, pues eres un vendedor que apunta a mantener una comunicación abierta, valorando la opinión y necesidades de tu cliente. Te enfocas en comprender, escuchar, aceptar y empatizar, de forma general, con tus clientes, lo cual les da seguridad a la hora de adquirir tu producto o servicio, pues se sienten valorados durante el proceso de compra.",
  },
  integrated: {
    title: "Tu estilo de vendedor es: 'Integrado'",
    description:
      "Eres altamente orientado a las relaciones y a la tarea, pues integras perfectamente tu interés por tus clientes, construyendo una relación de confianza y colaboración con ellos, al igual que empleas tus conocimientos y experticia en tu producto o servicio para llegar a un consenso con el comprado",
  },
  separate: {
    title: "Tu estilo de vendedor es: 'Separado'",
    description:
      "Por la naturaleza de tu producto y de la dinámica de venta, sueles mantener una relación bastante distanciada o nula con tu cliente. Asimismo, como tienes una baja orientación tanto a la tarea como a las relaciones, eres un vendedor que requiere de todas las medidas y control total sobre la información y manejo de los recursos que se te otorgan para concretar tus ventas",
  },
}
const tryAgainText = '¡Vaya! Al parecer, tus habilidades en las ventas te permiten transitar entre los distintos tipos de vendedor. Sin embargo, te animamos a que repases un poco más esta sección y presentes de nuevo la actividad, con el fin de reconocer tu perfil de vendedor.'

// Computed properties
const currentQuestion = computed(() => {
  return currentQuestionIndex.value + 1 + ". " + questionsAndAnswer[currentQuestionIndex.value].question;
})

const currentAnswers = computed(() => {
  return questionsAndAnswer[currentQuestionIndex.value].answers;
})

// Methods
function resetQuiz() {
  listOfResponses.value = []
  currentQuestionIndex.value = 0

  renderTryAgainText.value = false
  showAnswers.value = true
  renderRestartBtn.value = false
  renderSellerDescription.value = false
}

function getTypeOfSeller() {
  const countA = listOfResponses.value.filter((item) => item === "A").length;
  const countB = listOfResponses.value.filter((item) => item === "B").length;
  const countC = listOfResponses.value.filter((item) => item === "C").length;
  const countD = listOfResponses.value.filter((item) => item === "D").length;

  if (countA >= 3) {
    return sellerTypes.dedicated
  } else if (countB >= 3) {
    return sellerTypes.related
  } else if (countC >= 3) {
    return sellerTypes.integrated
  } else if (countD >= 3) {
    return sellerTypes.separate
  } else {
    return null
  }
}

function renderTypeOfSeller() {
  const typeOfSeller = getTypeOfSeller()

  if (typeOfSeller) {
    showAnswers.value = false

    sellerType.value.title = typeOfSeller.title
    sellerType.value.description = typeOfSeller.description

    renderRestartBtn.value = true
    renderSellerDescription.value = true
  }
}

function renderTryAgain() {
  showAnswers.value = false
  renderTryAgainText.value = true
  renderRestartBtn.value = true
}

function nextQuestion() {
  currentQuestionIndex.value++;
}

function checkAnswer(answer) {
  listOfResponses.value.push(answer)

  if (listOfResponses.value.length <= 3) {
    nextQuestion()
  } else {
    const typeOfSeller = getTypeOfSeller()

    if (typeOfSeller) {
      renderTypeOfSeller()
    } else {
      // If the user has not answered at least 3 questions with the same letter, we show the try again text
      renderTryAgain()
    }
  }
}

onMounted(() => {
  resetQuiz()
})
</script>
