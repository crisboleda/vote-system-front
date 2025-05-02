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
      </v-tabs>
    </template>

    <v-btn icon="mdi-export" @click="logout"></v-btn>
  </v-toolbar>

  <v-tabs-window v-model="tab">
    <v-tabs-window-item :value="1"> <QuestionForm /> </v-tabs-window-item>
    <v-tabs-window-item :value="2"> <UserForm /> </v-tabs-window-item>
    <v-tabs-window-item :value="3"> <ListQuestions /> </v-tabs-window-item>
  </v-tabs-window>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import api from '../services/api'
import ListQuestions from '@/components/ListQuestions.vue'
import QuestionForm from '@/components/QuestionForm.vue'
import UserForm from '@/components/UserForm.vue'
import router from '@/router'

const tab = ref(null)

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
</script>
