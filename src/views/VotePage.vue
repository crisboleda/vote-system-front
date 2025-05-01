<template>
  <v-toolbar
    :elevation="8"
    class="text-white"
    image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-toolbar-title text="Conjunto Residencial - Panel de Administración"></v-toolbar-title>

    <template v-slot:extension>
      <v-tabs v-model="tab" align-tabs="center">
        <v-tab :value="1">CREAR PREGUNTAS</v-tab>
        <v-tab :value="2">CREAR PROPIETARIO</v-tab>
        <v-tab :value="3">VER PREGUNTAS</v-tab>
        <v-tab :value="4">VER PROPIETARIOS</v-tab>
      </v-tabs>
    </template>

    <v-btn icon="mdi-export"></v-btn>
  </v-toolbar>

  <v-tabs-window v-model="tab">
    <v-tabs-window-item :value="1"> 1</v-tabs-window-item>
    <v-tabs-window-item :value="2"> 2</v-tabs-window-item>
    <v-tabs-window-item :value="3"> 3</v-tabs-window-item>
    <v-tabs-window-item :value="4"> </v-tabs-window-item>
  </v-tabs-window>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const questions = ref([])
const tab = ref(null)

onMounted(async () => {
  const res = await api.get('/questions')
  questions.value = res.data
})

const vote = async (questionId, optionId) => {
  try {
    await api.post(`/questions/${questionId}/vote`, { option_id: optionId })
    alert('Voto registrado correctamente')
  } catch (error) {
    alert(error.response?.data?.message || 'Error al votar')
  }
}
</script>

<style>
.question-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
