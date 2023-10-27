<template>
  <h1 class="activity__title">Drag and Drop Matching Activity</h1>
  <div class="drag-and-drop-wrapper">
    <div class="draggable-options-container">
      <p class="draggable__option" v-for="(item, index) in items" :key="index" :draggable="true"
        @dragstart="onDragStart(item, index)">
        {{ item.label }}
      </p>
    </div>

    <div class="match-container">
      <div class="match-option" v-for="(answer, index) in answers" :id="index" :key="index" @dragover.prevent="onDragOver"
        @drop="onDrop(answer.key)">
        <p class="match-option__text">{{ answer.label }}</p>
      </div>
    </div>
  </div>

  <div class="feedback-container" v-if="renderFeedback">
    <p class="feedback-container__text">{{ feedback.text }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import confetti from "canvas-confetti";

export default {
  setup() {
    // SEO
    useHead({
      title: 'Drag and Drop Matching Activity',
      meta: [
        { name: 'description', content: 'My amazing site.' }
      ],
      bodyAttrs: {
        class: 'drag-and-drop'
      },
    })

    // Reactive data
    const feedBackAnimation = ref(false);

    const items = ref([
      { label: "Auditivos" },
      { label: "Kineticos" },
      { label: "Visuales" },
    ]);

    const answers = ref([
      { key: "relajacion", label: "Hombros bajos y caídos. Mantienen la cabeza firmemente apoyada en los hombres, realizan movimientos lentos, seguros y calmados, lentos en sus respuestas motoras y verbales. Suelen tocar a otros y a sí mismos, uso de predicados verbales relacionados a sensaciones, sentimientos, materia y tacto." },
      { key: "lenguajeCorporal", label: "Hombros levantados, parpadeo inquieto, respiración rápida y superficial, inclinación de cabeza hacia adelante, escasa expresión corporal, manos móviles, uso de predicados verbales relativos a imágenes o visión." },
      { key: "comunicacion", label: "Hombros equilibrados, cabeza hacia atrás, tórax más desarrollado, respiración torácica, tendencia a señalarse al oído, tendencia a tocarse los labios; predicados verbales relacionados a aspectos del habla y escucha" },
    ]);

    const dragItem = ref(null);
    const renderFeedback = ref(false);

    // Data
    const matches = {
      Auditivos: "comunicacion",
      Kineticos: "relajacion",
      Visuales: "lenguajeCorporal",
    };

    const feedback = {
      correct: {
        Visuales: "¡Así es!, los «clientes visuales» tienden a procesar la información mediante imágenes mentales. Por eso, lo más recomendable es que le presentes tu producto/servicio, de modo que lo vea antes de implementarlo o usarlo.",
        Auditivos: "¡Correcto! Los «clientes auditivos»  suelen pensar o recordar a través de sonidos, voces e incluso, ruidos específicos. Es así, como puedes hacer uso de un discurso convincente, explicando tu producto para concretar la venta",
        Kineticos: "¡Muy bien! Los «clientes kinéticos» construyen pensamientos como sentimientos y sensaciones físicas. Si notas que tus clientes son de este tipo, puedes generar dinámicas de interacción entre tu cliente y tu producto o servicio, de modo que pueda percibir su utilidad más allá de sus características físicas.",
      },
      text: "¡Inténtalo de nuevo!",
    };

    // Methods
    function onDragStart(item, index) {
      renderFeedback.value = false;
      feedback.text = "¡Inténtalo de nuevo!";

      dragItem.value = { item, index };
    }

    function onDragOver(event) {
      event.preventDefault();
    }

    function checkAnswer(selectedOption, dropedOption) {
      return matches[selectedOption] === dropedOption;
    }

    function removeMatchedItems(selectedOption, dropedOption) {
      items.value = items.value.filter((item) => item.label !== selectedOption);
      answers.value = answers.value.filter((answer) => answer.key !== dropedOption);
    }

    function handleMatched(isCorrect, selectedOption, dropedOption) {
      if (isCorrect) {
        removeMatchedItems(selectedOption, dropedOption);
      }
    }

    function setCorrectFeedback(selectedOption) {
      feedback.text = feedback.correct[selectedOption];
    }

    function fireConfetti() {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 100,
      })
    }

    function handleFeedback(isCorrect, selectedOption) {
      if (isCorrect) {
        setCorrectFeedback(selectedOption);

        fireConfetti();
      }

      renderFeedback.value = true;
    }

    function resetDragItem() {
      dragItem.value = null;
    }

    function onDrop(dropedOption) {
      if (!dragItem.value) return;

      const selectedOption = dragItem.value.item.label;
      const isCorrect = checkAnswer(selectedOption, dropedOption);

      handleMatched(isCorrect, selectedOption, dropedOption);
      handleFeedback(isCorrect, selectedOption);
      resetDragItem();
    }

    // Return the data and methods that the component needs
    return {
      items,
      answers,
      renderFeedback,
      feedback,
      onDragStart,
      onDragOver,
      onDrop,
      feedBackAnimation
    };
  }
}

</script>
