<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft, Info } from 'lucide-vue-next'

const props = defineProps<{
  title: string
  subtitle?: string
  infoLabel?: string
}>()

const emit = defineEmits<{
  (e: 'info'): void
}>()

const router = useRouter()

const handleBack = () => {
  router.back()
}

const handleInfo = () => {
  emit('info')
}
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <div class="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-10 pt-6">
      <header class="flex items-center justify-between">
        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5"
          @click="handleBack"
        >
          <ArrowLeft class="h-5 w-5" />
          <span class="sr-only">Back</span>
        </button>

        <div class="flex-1 px-3 text-center">
          <h1 class="text-base font-semibold leading-tight">{{ title }}</h1>
          <p v-if="subtitle" class="mt-0.5 text-xs text-white/50">{{ subtitle }}</p>
        </div>

        <button
          v-if="infoLabel"
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5"
          @click="handleInfo"
        >
          <Info class="h-5 w-5" />
          <span class="sr-only">{{ infoLabel }}</span>
        </button>
        <div v-else class="h-11 w-11" />
      </header>

      <main class="mt-6 flex-1 space-y-6">
        <slot />
      </main>
    </div>
  </div>
</template>
