<template>
  <div class="app">
    <h1>Descubre qué tipo de vendedor eres</h1>
    <div class="quiz">
      <h2 id="question" v-html="currentQuestion" v-if="!renderSellerDescription"></h2>
      <h2 id="seller-title" v-html="sellerType.title" v-if="renderSellerDescription"></h2>
      <div id="answer-buttons" v-show="showAnswers">
        <button class="btn" v-for="(answer, letter) in currentAnswers" :key="`answer-${letter}`"
          @click="checkAnswer(letter)">{{
            `${letter}. ${answer}` }}</button>
      </div>
      <p id="seller-description" v-if="renderSellerDescription" v-html="sellerType.description"></p>
      <button id="reset-btn" @click="resetQuiz()" v-if="renderRestartBtn">Reiniciar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Interactive07",
  data: function () {
    return {
      showAnswers: true,
      renderSellerDescription: false,
      renderRestartBtn: false,
      questionsAndAnswers: [
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
      ],
      sellersTypes: {
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
      },
      sellerType: {
        title: '',
        description: ''
      },
      listOfResponses: [],
      currentQuestionIndex: 0,
    }
  },
  computed: {
    currentQuestion: function () {
      return this.currentQuestionIndex + 1 + ". " + this.questionsAndAnswers[this.currentQuestionIndex].question;
    },
    currentAnswers: function () {
      return this.questionsAndAnswers[this.currentQuestionIndex].answers;
    }
  },
  methods: {
    resetQuiz() {
      this.listOfResponses = [];
      this.currentQuestionIndex = 0;

      this.showAnswers = true
      this.renderRestartBtn = false
      this.renderSellerDescription = false
    },
    getTypeOfSeller() {
      const countA = this.listOfResponses.filter((item) => item === "A").length;
      const countB = this.listOfResponses.filter((item) => item === "B").length;
      const countC = this.listOfResponses.filter((item) => item === "C").length;
      const countD = this.listOfResponses.filter((item) => item === "D").length;

      if (countA >= 3) {
        return this.sellersTypes.dedicated
      } else if (countB >= 3) {
        return this.sellersTypes.related
      } else if (countC >= 3) {
        return this.sellersTypes.integrated
      } else if (countD >= 3) {
        return this.sellersTypes.separate
      } else {
        return null
      }
    },
    renderTypeOfSeller() {
      const typeOfSeller = this.getTypeOfSeller()

      if (typeOfSeller) {
        this.showAnswers = false

        this.sellerType.title = typeOfSeller.title
        this.sellerType.description = typeOfSeller.description

        this.renderRestartBtn = true
        this.renderSellerDescription = true
      }
    },
    nextQuestion() {
      this.currentQuestionIndex++;
    },
    checkAnswer(answer) {
      if (this.listOfResponses.length >= 3) {
        if (this.listOfResponses.length < 4) {
          this.listOfResponses.push(answer)
          const typeOfSeller = this.getTypeOfSeller()

          if (typeOfSeller) {
            this.renderTypeOfSeller()
          } else {
            if (this.listOfResponses.length === 3) {
              this.nextQuestion()
            } else {
              console.log('No hay match para estas respuestas')
            }
          }
        } else {
          this.renderTypeOfSeller()
        }
      } else {
        this.listOfResponses.push(answer)
        this.nextQuestion()
      }
    }
  },
  mounted() {
    this.resetQuiz();
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

.app {
  background: #27476e;
  width: 90%;
  max-width: 600px;
  margin: 100px auto 0;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 20px #d1e1e9;
  border-radius: 12px;
}

.app h1 {
  font-size: 25px;
  color: #fff;
  font-weight: 600;
  border-bottom: 1px solid #EAE0B7;
  padding-bottom: 30px;
}

.quiz {
  padding: 20px 0;
}

.quiz h2 {
  font-size: 18px;
  color: #fafafa;
  font-weight: 600;
  margin-bottom: 10px;
}

.quiz #seller-description {
  font-size: 18px;
  color: #ffffff;
  margin: 2rem 0;
}

.btn {
  background: #fff;
  color: #000;
  font-weight: 500;
  width: 100%;
  border: 1px solid #222;
  padding: 10px;
  margin: 10px 0;
  text-align: left;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  background: #EAE0B7;
  /* color: #fff; */
}

#reset-btn {
  background: #EAE0B7;
  color: #000;
  font-weight: 500;
  width: 150px;
  border: 0;
  padding: 10px;
  margin: 20px auto 0;
  border-radius: 4px;
  cursor: pointer;
}
</style>

