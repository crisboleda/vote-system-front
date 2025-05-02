<template>
  <v-toolbar
    :elevation="8"
    class="text-white"
    image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-toolbar-title text="Conjunto Residencial"></v-toolbar-title>

    <v-btn icon="mdi-export" @click="logout"></v-btn>
  </v-toolbar>

  <VoteForm
    :dialog="dialog"
    :question="questionSelected"
    @voted="handleQuestionVoted"
    @closeVoteForm="dialog = false"
  />
  <QuestionResults
    :dialog="showQuestionResultsDialog"
    :question="questionSelected"
    @closeQuestionResults="showQuestionResultsDialog = false"
  />

  <v-container fluid class="my-6">
    <v-row>
      <v-col v-for="(question, i) in questions" :key="i" md="12" cols="12">
        <v-card class="d-flex justify-space-between pr-6 align-center">
          <div>
            <v-card-title
              >{{ question.title }} <br />
              <v-btn v-if="!question.answered" color="red" size="x-small" variant="outlined"
                >Pendiente por votar</v-btn
              >
              <v-btn v-if="question.answered" color="teal" size="x-small" variant="outlined"
                >Voto Completado</v-btn
              >
            </v-card-title>
          </div>
          <div>
            <v-btn
              v-if="!question.answered"
              @click="() => openQuestionVoteModal(question.id)"
              color="green"
              class="mx-1"
              >Votar</v-btn
            >
            <v-btn
              v-if="question.answered"
              @click="() => openQuestionResultsModal(question.id)"
              color="blue"
              class="mx-1"
              >Resultados</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import api from '../services/api'
import router from '@/router'
import VoteForm from '@/components/VoteForm.vue'
import QuestionResults from '@/components/QuestionResults.vue'

const questions = ref([])
const questionSelected = ref(null)
const dialog = ref(false)
const showQuestionResultsDialog = ref(false)

const handleQuestionVoted = async () => {
  dialog.value = false
  await getQuestions()
}

const openQuestionVoteModal = (questionId) => {
  dialog.value = true
  questionSelected.value = questions.value.find((question) => question.id == questionId)
}

const openQuestionResultsModal = (questionId) => {
  showQuestionResultsDialog.value = true
  questionSelected.value = questions.value.find((question) => question.id == questionId)
}

const logout = async () => {
  try {
    const accessToken = localStorage.getItem('token')
    await api.post(
      '/logout',
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    router.push('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

const getQuestions = async () => {
  try {
    const response = await api.get('/questions', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    questions.value = response.data
  } catch (error) {
    if (error.status === 401) {
      router.push('/login')
    }
  }
}

onMounted(async () => await getQuestions())
</script>
