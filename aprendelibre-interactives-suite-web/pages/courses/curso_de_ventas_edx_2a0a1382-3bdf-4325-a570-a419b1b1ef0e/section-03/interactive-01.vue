<template>
  <h2 class="activity__title">Drag and Drop Matching Activity</h2>

  <div class="activity-wrapper">
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
import confetti from "canvas-confetti";

export default {
  data() {
    return {
      items: [
        { label: "Auditivos" },
        { label: "Kineticos" },
        { label: "Visuales" },
      ],
      answers: [
        { key: "relajacion", label: "Hombros bajos y caídos. Mantienen la cabeza firmemente apoyada en los hombres, realizan movimientos lentos, seguros y calmados, lentos en sus respuestas motoras y verbales. Suelen tocar a otros y a sí mismos, uso de predicados verbales relacionados a sensaciones, sentimientos, materia y tacto." },
        { key: "lenguajeCorporal", label: "Hombros levantados, parpadeo inquieto, respiración rápida y superficial, inclinación de cabeza hacia adelante, escasa expresión corporal, manos móviles, uso de predicados verbales relativos a imágenes o visión." },
        { key: "comunicacion", label: "Hombros equilibrados, cabeza hacia atrás, tórax más desarrollado, respiración torácica, tendencia a señalarse al oído, tendencia a tocarse los labios; predicados verbales relacionados a aspectos del habla y escucha" },
      ],
      dragItem: null,
      matches: {
        Auditivos: "comunicacion",
        Kineticos: "relajacion",
        Visuales: "lenguajeCorporal",
      },
      renderFeedback: false,
      feedback: {
        correct: {
          Visuales: "¡Así es!, los «clientes visuales» tienden a procesar la información mediante imágenes mentales. Por eso, lo más recomendable es que le presentes tu producto/servicio, de modo que lo vea antes de implementarlo o usarlo.",
          Auditivos: "¡Correcto! Los «clientes auditivos»  suelen pensar o recordar a través de sonidos, voces e incluso, ruidos específicos. Es así, como puedes hacer uso de un discurso convincente, explicando tu producto para concretar la venta",
          Kineticos: "¡Muy bien! Los «clientes kinéticos» construyen pensamientos como sentimientos y sensaciones físicas. Si notas que tus clientes son de este tipo, puedes generar dinámicas de interacción entre tu cliente y tu producto o servicio, de modo que pueda percibir su utilidad más allá de sus características físicas.",
        },
        text: "¡Inténtalo de nuevo!",
      },
    };
  },
  methods: {
    onDragStart(item, index) {
      this.renderFeedback = false;
      this.feedback.text = "¡Inténtalo de nuevo!";

      this.dragItem = { item, index };
    },
    onDragOver(event) {
      event.preventDefault();
    },
    checkAnswer(selectedOption, dropedOption) {
      return this.matches[selectedOption] === dropedOption;
    },
    removeMatchedItems(selectedOption, dropedOption) {
      this.items = this.items.filter((item) => item.label !== selectedOption);
      this.answers = this.answers.filter((answer) => answer.key !== dropedOption);
    },
    handleMatched(isCorrect, selectedOption, dropedOption) {
      if (isCorrect) {
        this.removeMatchedItems(selectedOption, dropedOption);
      }
    },
    setCorrectFeedback(selectedOption) {
      this.feedback.text = this.feedback.correct[selectedOption];
    },
    fireConfetti() {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 100,
      })
    },
    handleFeedback(isCorrect, selectedOption) {
      if (isCorrect) {
        this.setCorrectFeedback(selectedOption);

        this.fireConfetti();
      }

      this.renderFeedback = true;
    },
    resetDragItem() {
      this.dragItem = null;
    },
    onDrop(dropedOption) {
      if (!this.dragItem) return;

      const selectedOption = this.dragItem.item.label;
      const isCorrect = this.checkAnswer(selectedOption, dropedOption);

      this.handleMatched(isCorrect, selectedOption, dropedOption);
      this.handleFeedback(isCorrect, selectedOption);
      this.resetDragItem();
    }
  }
};
</script>

<style scoped>
.activity__title {
  text-align: center;
}

.activity-wrapper {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 6rem auto;
}

.draggable-options-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.draggable__option {
  box-sizing: border-box;
  padding: 1rem 1.5rem;
  background: rgba(217, 217, 217, 0.58);
  border: 1px solid white;
  box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
  border-radius: 12px;
  backdrop-filter: blur(6px);
  cursor: grab;
  transition: all 0.5s;
  user-select: none;
  font-size: 1.125rem;
  font-weight: 600;
  color: black;
}

.draggable__option:hover {
  border: 1px solid #000;
  transform: scale(1.05);
}

.draggable__option:active {
  cursor: grabbing;
  transform: scale(0.95) rotateZ(1.7deg);
}

.match-option {
  max-width: 400px;
}

.match-option__text {
  font-size: 18px;
  border: 2px solid #3F51B5;
  border-radius: 12px;
  padding: 1rem;
}

.feedback-container {
  width: 40%;
  margin: 0 auto;
}

.feedback-container__text {
  text-align: center;
  font-size: 20px;
}
</style>
