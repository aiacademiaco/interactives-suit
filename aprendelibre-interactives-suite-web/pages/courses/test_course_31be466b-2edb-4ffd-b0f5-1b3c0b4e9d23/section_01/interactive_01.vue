<template>
  <div>
    <!-- your code -->
    <h1>hola mundo</h1>
    <!-- Muestra el mensaje si successMessage tiene un valor -->
    <p v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const data = ref(null);
    const successMessage = ref(""); // Mensaje de éxito

    onMounted(async () => {
      const response = await fetch("http://localhost:8080/api/courses");
      const responseData = await response.json();

      if (responseData.courses) {
        successMessage.value = "Petición exitosa"; // Configura el mensaje cuando la petición sea exitosa
      }
    });

    return {
      data,
      successMessage,
    };
  },
};
</script>
