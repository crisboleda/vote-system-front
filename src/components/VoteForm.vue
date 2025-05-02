<template>
  <v-dialog persistent :modelValue="dialog" max-width="70%" min-height="70%">
    <v-card class="pa-4" elevation="4">
      <v-card-title class="text-h6">
        {{ question.title }}
      </v-card-title>

      <v-card-text>
        <v-radio-group v-model="selectedOption" label="Selecciona una opción">
          <v-radio
            v-for="option in question.options"
            :key="option.id"
            :label="option.text"
            :value="option.id"
          />
        </v-radio-group>

        <v-alert v-if="error" type="error" class="mt-2" dense text>
          {{ error }}
        </v-alert>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="() => emit('closeVoteForm')"> Cerrar </v-btn>

        <v-btn color="green" :disabled="!selectedOption || loading" @click="submitVote">
          Votar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'

const selectedOption = ref(null)
const loading = ref(false)
const error = ref(null)

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  dialog: { type: Boolean, required: true },
})

const emit = defineEmits(['voted', 'closeVoteForm'])

const submitVote = async () => {
  loading.value = true
  error.value = null

  try {
    const token = localStorage.getItem('token')

    await api.post(
      `/questions/${props.question.id}/vote`,
      { option_id: selectedOption.value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    emit('voted', props.question.id)
  } catch (err) {
    if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else {
      error.value = 'Ocurrió un error al votar.'
    }
  } finally {
    loading.value = false
  }
}
</script>
