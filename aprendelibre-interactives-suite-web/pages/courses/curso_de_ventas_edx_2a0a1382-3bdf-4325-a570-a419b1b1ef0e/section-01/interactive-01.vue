<template>
  <div class="app">
    <h1>Descubre qué tipo de vendedor eres</h1>
    <div class="quiz">
      <h2 id="question" v-html="currentQuestion" v-if="!renderSellerDescription"></h2>
      <h2 id="seller-title" v-html="sellerType.title" v-if="renderSellerDescription"></h2>
      <div id="answer-buttons" v-show="showAnswers">
        <button class="btn" @click="checkAnswer(true)">
          Más como yo
        </button>
        <button class="btn" @click="checkAnswer(false)">
          Menos como yo
        </button>
      </div>
      <p id="seller-description" v-if="renderSellerDescription" v-html="sellerType.description"></p>
      <button id="reset-btn" @click="startQuiz()" v-if="renderRestartBtn">Reiniciar</button>
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
      questionList: [
        "Planifico meticulosamente cada detalle y dirijo el proceso de ventas para alcanzar los resultados deseados.",
        "Construyo relaciones sólidas y de confianza con los clientes, enfocándome en la comunicación y la empatía.",
        "Colaboro con el cliente para llegar a una decisión consensuada, utilizando mi conocimiento para construir soluciones conjuntas.",
        "Busco toda la información posible y controlo los aspectos críticos antes de tomar medidas en la venta.",
        "Logro resultados y alcanzar los objetivos de venta, incluso si eso significa dirigir el proceso con poca participación del cliente.",
        "Genero un ambiente de confianza y comprensión, asegurándome de que el cliente se sienta valorado y escuchado.",
        "Trabajo en equipo con el cliente para encontrar soluciones que sean mutuamente beneficiosas.",
        "Procuro tener todo bajo control, garantizando que el proceso de ventas sea efectivo y eficiente.",
        "Dirijo el proceso y tomo decisiones rápidas y firmes para lograr resultados concretos.",
        "Establezco relaciones cálidas y amigables con los clientes, creando un ambiente de confianza y apertura.",
        "Colaboro activamente con el cliente, involucrándolo en la toma de decisiones y construyendo soluciones conjuntas.",
        "Tengo toda la información y el control necesario para asegurar que el proceso de venta fluya sin problemas.",
        "Destaco los resultados y beneficios tangibles que el cliente obtendrá al adquirir mi producto o servicio.",
        "Resalto cómo nuestra relación se fortalecerá y cómo el cliente se beneficiará de nuestra interacción continua.",
        "Me aseguro de que tanto el cliente como yo estemos de acuerdo en la decisión, construyendo un consenso antes de avanzar.",
        "Garantizo que todos los aspectos y detalles se hayan abordado adecuadamente antes de finalizar el proceso de venta."
      ],
      sellersTypes: {
        dedicated: {
          matches: [1, 5, 9, 13],
          title: "Tu estilo de vendedor es: 'Dedicado'",
          description:
            "Una característica que se marca mucho en tu estilo de venta es la planificación, al igual que la facilidad de dirigir los procesos comerciales y el personal relacionado, asegurando el éxito en la ejecución de las tareas con el fin de obtener resultados positivos. Aunque tus clientes no necesitan participar activamente en la venta, tu experticia, conocimientos en el producto/servicio y participación te permiten solucionar sus necesidades. Esto significa que tienes una alta orientación a la tarea pero una baja orientación a las relaciones.",
        },
        related: {
          matches: [2, 6, 10, 14],
          title: "Tu estilo de vendedor es: 'Relacionado'",
          description:
            "La clave de tu ejercicio de ventas es la “confianza”, ya que te orientas más a las relaciones que a la tarea. Esta es la manera eficaz en la que has conseguido cerrar tratos, pues eres un vendedor que apunta a mantener una comunicación abierta, valorando la opinión y necesidades de tu cliente. Te enfocas en comprender, escuchar, aceptar y empatizar, de forma general, con tus clientes, lo cual les da seguridad a la hora de adquirir tu producto o servicio, pues se sienten valorados durante el proceso de compra.",
        },
        integrated: {
          matches: [3, 7, 11, 15],
          title: "Tu estilo de vendedor es: 'Integrado'",
          description:
            "Eres altamente orientado a las relaciones y a la tarea, pues integras perfectamente tu interés por tus clientes, construyendo una relación de confianza y colaboración con ellos, al igual que empleas tus conocimientos y experticia en tu producto o servicio para llegar a un consenso con el comprado",
        },
        separate: {
          matches: [4, 8, 12, 16],
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
      currentQuestion: '',
      questionNo: 0,
      currentQuestionIndex: 0,
    }
  },
  methods: {
    showQuestion() {
      const question = this.questionList[this.currentQuestionIndex];
      this.questionNo = this.currentQuestionIndex + 1;

      this.currentQuestion = this.questionNo + ". " + question;
    },
    startQuiz() {
      this.listOfResponses = [];
      this.currentQuestionIndex = 0;

      this.showQuestion();

      this.showAnswers = true
      this.renderRestartBtn = false
      this.renderSellerDescription = false
    },
    getTypeOfSeller() {
      for (const key in this.sellersTypes) {
        const sellerType = this.sellersTypes[key]

        const matches = this.listOfResponses.filter((item) => {
          return sellerType.matches.includes(item);
        });

        if (matches.length === 4) {
          return sellerType;
        }
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
      } else {
        this.currentQuestionIndex++;
        this.showQuestion();
      }
    },
    nextQuestion() {
      if (this.listOfResponses.length >= 4) {
        this.renderTypeOfSeller()
      } else if (this.currentQuestionIndex < this.questionList.length) {
        this.currentQuestionIndex++;
        this.showQuestion();
      }
    },
    checkAnswer(answer) {
      if (answer) {
        this.listOfResponses.push(this.questionNo)
      }

      this.nextQuestion();
    }
  },
  mounted() {
    this.startQuiz();
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
  color: #040506;
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

