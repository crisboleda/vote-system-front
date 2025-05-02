<template>
  <v-dialog persistent :modelValue="dialog" max-width="70%" min-height="70%">
    <v-card class="pa-4" elevation="4">
      <v-card-title class="text-h6">{{ question.title }}</v-card-title>
      <v-card-text>
        <Bar :data="chartData" :options="chartOptions" />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="() => emit('closeQuestionResults')"> Cerrar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  dialog: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['closeQuestionResults'])

const chartData = computed(() => ({
  labels: props.question.options.map((option) => option.text),
  datasets: [
    {
      label: 'Cantidad de votos',
      backgroundColor: '#3f51b5',
      data: props.question.options.map((option) => option.votes_count || 0),
    },
  ],
}))

const maxVotes = computed(() => {
  const votes = props.question ? props.question.options.map((opt) => opt.votes_count || 0) : [0]
  const max = Math.max(...votes)
  return max < 4 ? 4 : Math.ceil(max * 1.2)
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: maxVotes.value,
      ticks: {
        stepSize: 1,
        precision: 0,
      },
    },
  },
}
</script>
