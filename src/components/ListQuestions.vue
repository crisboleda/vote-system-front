<template>
  <v-container fluid class="my-6 mx-6">
    <v-row>
      <v-col v-for="(question, i) in questions" :key="i" cols="12" md="4">
        <v-card class="px-3 py-3" elevation="5">
          <v-card-title>{{ question.title }}</v-card-title>
          <v-card-text>
            <h4>Opciones:</h4>
            <v-card
              class="py-1 my-3 px-3 d-flex justify-space-between"
              elevation="1"
              v-for="(option, j) in question.options"
              :key="j"
            >
              <p>{{ option.text }}</p>
              <p>{{ option.votes_count }}</p>
            </v-card>
            <div class="d-flex justify-end pr-3">
              <p>
                <b>Total: </b>
                {{ question.options.reduce((acumulador, op) => acumulador + op.votes_count, 0) }}
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const questions = ref([])

onMounted(async () => {
  const response = await api.get('/questions', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  questions.value = response.data
})
</script>
