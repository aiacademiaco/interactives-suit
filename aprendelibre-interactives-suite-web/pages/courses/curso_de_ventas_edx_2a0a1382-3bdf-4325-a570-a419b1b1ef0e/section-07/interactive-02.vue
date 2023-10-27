<template>
  <div class="decisions-tree-wrapper">
    <div class="card">

      <div class="onboarding" v-if="onBoarding.show">
        <div class="content">
          <h2>¿Qué pasa en la mente de un cliente al decidir una compra?</h2>
          <p v-if="onBoarding.firstStep">Cuando tienes hambre, lo primero que haces es reconocer de forma consciente que
            necesitas
            comer algo para suprimir esa sensación en tu estómago. Ahí caes en cuenta de que tienes una necesidad clara.
          </p>
          <p class="message" v-if="onBoarding.firstStep">Situacion inicial "Tengo hambre" ---> Consciencia</p>
          <p v-if="onBoarding.secondStep">Entonces, empiezas a <strong>conectar ese necesidad consciente con la
              información que tienes según tus
              experiencias:</strong>
            sabes qué te gusta comer, qué alimentos prefieren evitar, cuáles opciones están a tu alcance y otros factores
            que te ayudan a crear un abanico de opciones interesantes:</p>
        </div>
        <div class="actions">
          <button class="actions__button" @click="renderOnBoardingSteps()"
            v-html="onBoarding.firstStep ? 'Continuar' : 'Ver opciones'"></button>
        </div>
      </div>

      <div class="interactive-content-wrapper" v-if="!onBoarding.show">
        <div class="content">
          <span class="title" v-show="showTitle">{{ title }}</span>
          <p class="message" v-if="showFinalOrder">{{ finalOrder }}</p>
          <div v-if="renderActivityText">
            <p>Después de realizar este proceso mental puedes identificar exactamente qué producto es el que deseas
              adquirir, en este momento deja de ser una necesidad para convertirse en un requerimiento específico, es
              decir, <strong>un deseo.</strong> <br> Este <strong>deseo</strong> te lleva a realizar <strong>la acción de
                compra</strong>. <br> Todo este proceso sucede de igual forma en nuestras mentes tanto para la compra de
              un chocolate como para la compra de un inmueble o una empresa.</p>
          </div>
        </div>

        <div class="actions">
          <button class="actions__button" v-for="(option, index) in options" :key="`option-${index}`"
            @click="selectOption(option)">{{
              option.answer
            }}</button>

          <button class="actions__button" v-if="renderNextBtn" @click="completeOrderAndShowConfirmation()">Completar
            orden</button>
          <button class="actions__button" v-if="renderResetButton" @click="resetInteractive()">Reiniciar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// SEO
useSeoMeta({
  title: '¿Qué pasa en la mente de un cliente al decidir una compra?',
  ogTitle: '¿Qué pasa en la mente de un cliente al decidir una compra?',
  description: 'Para comprender mejor cada una de las etapas que conforman el proceso de compra, analiza el siguiente ejemplo',
  ogDescription: 'Para comprender mejor cada una de las etapas que conforman el proceso de compra, analiza el siguiente ejemplo',
})

const showTitle = ref(true);
const title = ref("¿Qué te gustaría comer?");
const options = ref([
  {
    answer: "Hamburguesa",
    subQuestion: "¿Qué tipo de hamburguesa te gustaría?"
  },
  {
    answer: "Sopa mexicana",
    subQuestion: "¿Cómo te gustaría tu sopa mexicana?"
  },
  {
    answer: "Ensalada con pollo",
    subQuestion: "¿Qué tipo de ensalada con pollo te gustaría?"
  }
]);
const renderActivityText = ref(false);
const renderNextBtn = ref(false);
const finalOrder = ref('');
const showFinalOrder = ref(false);
const renderResetButton = ref(false);
const onBoarding = ref({
  show: true,
  firstStep: true,
  secondStep: false,
});

// Methods
function renderOnBoardingSteps() {
  if (onBoarding.value.secondStep) {
    onBoarding.value.show = false;
  }

  onBoarding.value.firstStep = false;
  onBoarding.value.secondStep = true;
}

function handleHamburguesa(option) {
  finalOrder.value = option.answer
  title.value = option.subQuestion

  options.value = [
    { answer: 'de carne', subQuestion: '' },
    { answer: 'de pollo', subQuestion: '' },
    { answer: 'vegetariana', subQuestion: '' },
    { answer: 'sencilla', subQuestion: '' },
    { answer: 'doble', subQuestion: '' },
  ];
}

function handleSopaMexicana(option) {
  finalOrder.value = option.answer;
  title.value = option.subQuestion;

  options.value = [
    { answer: 'sin picante', subQuestion: '' },
    { answer: 'con picante', subQuestion: '' },
    { answer: 'casera', subQuestion: '' },
  ];
}

function handleEnsaladaConPollo(option) {
  finalOrder.value = option.answer;
  title.value = option.subQuestion;

  options.value = [
    { answer: 'pollo broaster', subQuestion: '' },
    { answer: 'con aderezo', subQuestion: '' },
    { answer: 'sin aderezo', subQuestion: '' },
    { answer: 'pollo asado', subQuestion: '' },
  ];
}

function showActivityExplanation() {
  showTitle.value = false

  options.value = []

  renderActivityText.value = true
  renderNextBtn.value = true
}

function completeOrderAndShowConfirmation() {
  renderActivityText.value = false
  renderNextBtn.value = false

  showTitle.value = true
  title.value = '¡Gracias por tu compra!'

  showFinalOrder.value = true

  renderResetButton.value = true
}

function resetInteractive() {
  onBoarding.value.show = true;
  onBoarding.value.firstStep = true;
  onBoarding.value.secondStep = false;

  title.value = "¿Qué te gustaría comer?";
  options.value = [
    {
      answer: "Hamburguesa",
      subQuestion: "¿Qué tipo de hamburguesa te gustaría?"
    },
    {
      answer: "Sopa mexicana",
      subQuestion: "¿Cómo te gustaría tu sopa mexicana?"
    },
    {
      answer: "Ensalada con pollo",
      subQuestion: "¿Qué tipo de ensalada con pollo te gustaría?"
    }
  ];
  finalOrder.value = '';
  showFinalOrder.value = false;
  renderResetButton.value = false;
}

function selectOption(option) {
  switch (option.answer) {
    case 'Hamburguesa':
      handleHamburguesa(option)
      break;
    case 'Sopa mexicana':
      handleSopaMexicana(option)
      break;
    case 'Ensalada con pollo':
      handleEnsaladaConPollo(option)
      break;
    // Respuestas finales
    case 'de carne':
    case 'de pollo':
    case 'vegetariana':
    case 'sencilla':
    case 'doble':
    case 'sin picante':
    case 'con picante':
    case 'casera':
    case 'pollo broaster':
    case 'con aderezo':
    case 'sin aderezo':
    case 'pollo asado':
      finalOrder.value = `Orden: ${finalOrder.value} ${option.answer}.`;

      showActivityExplanation()
      break;
  }
}
</script>