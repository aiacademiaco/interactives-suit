<template>
  <div class="activity-wrapper">
    <div class="card">

      <div class="content">
        <span class="title" v-show="showTitle">{{ pregunta }}</span>
        <p class="message" v-if="showFinalOrder">{{ finalOrder }}</p>
        <div v-if="renderactivityText" v-html="activityText"></div>
      </div>

      <div class="actions">
        <button class="actions__button" v-for="(opcion, index) in opciones" :key="index"
          @click="seleccionarOpcion(opcion)">{{
            opcion.respuesta
          }}</button>

        <button class="actions__button" v-if="renderNextBtn" @click="completeOrderAndShowConfirmation()">Completar
          orden</button>
        <button class="actions__button" v-if="renderResetButton" @click="resetOrder()">Nueva orden</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTitle: true,
      pregunta: "¿Qué te gustaría comer?",
      opciones: [
        {
          respuesta: "Hamburguesa",
          subPregunta: "¿Qué tipo de hamburguesa te gustaría?"
        },
        {
          respuesta: "Sopa mexicana",
          subPregunta: "¿Cómo te gustaría tu sopa mexicana?"
        },
        {
          respuesta: "Ensalada con pollo",
          subPregunta: "¿Qué tipo de ensalada con pollo te gustaría?"
        }
      ],
      activityText: '<p>Después de realizar este proceso mental puedes identificar exactamente qué producto es el que deseas adquirir, en este momento deja de ser una necesidad para convertirse en un requerimiento específico, es decir, <strong>un deseo.</strong> <br> Este <strong>deseo</strong> te lleva a realizar <strong>la acción de compra</strong>. <br> Todo este proceso sucede de igual forma en nuestras mentes tanto para la compra de un chocolate como para la compra de un inmueble o una empresa.</p>',
      renderactivityText: false,
      renderNextBtn: false,
      finalOrder: '',
      showFinalOrder: false,
      renderResetButton: false
    };
  },
  methods: {
    handleSopaMexicana(opcion) {
      this.finalOrder = opcion.respuesta;
      this.pregunta = opcion.subPregunta;
      this.opciones = [
        { respuesta: 'sin picante', subPregunta: '' },
        { respuesta: 'con picante', subPregunta: '' },
        { respuesta: 'casera', subPregunta: '' },
      ];
    },
    handleEnsaladaConPollo(opcion) {
      this.finalOrder = opcion.respuesta;
      this.pregunta = opcion.subPregunta;
      this.opciones = [
        { respuesta: 'pollo broaster', subPregunta: '' },
        { respuesta: 'con aderezo', subPregunta: '' },
        { respuesta: 'sin aderezo', subPregunta: '' },
        { respuesta: 'pollo asado', subPregunta: '' },
      ];
    },
    showActivityExplanation() {
      this.showTitle = false;

      this.opciones = [];

      this.renderactivityText = true;
      this.renderNextBtn = true;
    },
    completeOrderAndShowConfirmation() {
      this.renderactivityText = false;
      this.renderNextBtn = false;

      this.showTitle = true;
      this.pregunta = '¡Gracias por tu compra!';

      this.showFinalOrder = true;

      this.renderResetButton = true;
    },
    resetOrder() {
      this.pregunta = "¿Qué te gustaría comer?";
      this.opciones = [
        {
          respuesta: "Hamburguesa",
          subPregunta: "¿Qué tipo de hamburguesa te gustaría?"
        },
        {
          respuesta: "Sopa mexicana",
          subPregunta: "¿Cómo te gustaría tu sopa mexicana?"
        },
        {
          respuesta: "Ensalada con pollo",
          subPregunta: "¿Qué tipo de ensalada con pollo te gustaría?"
        }
      ];
      this.finalOrder = '';
      this.showFinalOrder = false;
      this.renderResetButton = false;
    },
    seleccionarOpcion(opcion) {
      switch (opcion.respuesta) {
        case 'Hamburguesa':
          this.handleHamburguesa(opcion);
          break;
        case 'Sopa mexicana':
          this.handleSopaMexicana(opcion);
          break;
        case 'Ensalada con pollo':
          this.handleEnsaladaConPollo(opcion);
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
          this.finalOrder = `Orden: ${this.finalOrder} ${opcion.respuesta}.`;

          this.showActivityExplanation()
          break;
      }
    },
    handleHamburguesa(opcion) {
      this.finalOrder = opcion.respuesta;
      this.pregunta = opcion.subPregunta;
      this.opciones = [
        { respuesta: 'de carne', subPregunta: '' },
        { respuesta: 'de pollo', subPregunta: '' },
        { respuesta: 'vegetariana', subPregunta: '' },
        { respuesta: 'sencilla', subPregunta: '' },
        { respuesta: 'doble', subPregunta: '' },
      ];
    },
  }
};
</script>

<style scoped>
.activity-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.card {
  max-width: 350px;
  padding: 1.875rem;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background-color: #fff;
}

.content {
  text-align: center;
}

.title {
  color: #000000;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5rem;
}

.message {
  margin-top: 1rem;
  color: #595b5f;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 600;
}

.actions {
  margin: 1rem;
}

.actions__button {
  padding: 0.5rem 1rem;
  background-color: #1aa06d;
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 0.75rem;
  cursor: pointer;
}

@keyframes animate {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.09);
  }
}
</style>