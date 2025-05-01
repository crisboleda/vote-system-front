<template>
  <v-card class="my-6 mx-6 px-4 py-4" elevation="2">
    <v-card-title>Registrar Usuario</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="registerUser">
        <v-text-field v-model="newUser.name" label="Nombre" required />
        <v-text-field v-model="newUser.email" label="Correo" required />
        <v-text-field v-model="newUser.password" label="Contraseña" type="password" required />
        <v-select
          v-model="newUser.role"
          :items="['Propietario', 'Administrador']"
          label="Rol"
          required
        />

        <v-btn type="submit" color="primary" class="mt-3">Registrar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'

const typeUserLabel = {
  administrador: 'admin',
  propietario: 'user',
}

const newUser = ref({
  name: '',
  email: '',
  password: '',
  role: null,
})

const registerUser = async () => {
  try {
    const userData = { ...newUser.value }
    userData.role = typeUserLabel[newUser.value.role.toLocaleLowerCase()]
    await api.post('/register', userData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    alert('Usuario registrado exitosamente')
    newUser.value = { name: '', email: '', password: '', role: 'user' }
  } catch (error) {
    alert('Error al registrar usuario')
    console.error(error)
  }
}
</script>
