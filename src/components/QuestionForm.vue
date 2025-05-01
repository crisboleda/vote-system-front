<template>
  <v-card class="my-6 mx-6 px-4 py-4" elevation="5">
    <v-card-title>Crear Pregunta</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="createQuestion">
        <v-text-field v-model="newQuestion.title" label="Título" required />
        <div v-for="(option, index) in newQuestion.options" :key="index" class="d-flex align-start">
          <v-text-field v-model="newQuestion.options[index]" label="Opción" class="flex-grow-1" />
          <v-btn class="mt-1" variant="tonal" color="red" icon @click="removeOption(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
        <div class="d-flex align-center">
          <v-btn class="mt-3" text @click="addOption">Agregar opción</v-btn>
          <v-btn type="submit" color="green" class="mt-3">Crear pregunta</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'

const newQuestion = ref({
  title: '',
  options: [''],
})

const createQuestion = async () => {
  try {
    await api.post('/questions', newQuestion.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    newQuestion.value = { title: '', options: [''] }
  } catch (error) {
    alert('Error al crear pregunta')
    console.error(error)
  }
}

const addOption = () => newQuestion.value.options.push('')
const removeOption = (index) => newQuestion.value.options.splice(index, 1)
</script>
