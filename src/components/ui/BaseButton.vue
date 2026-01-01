<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'ghost'
    block?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    block: false,
  },
)

const baseClasses =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

const variantClasses: Record<typeof props.variant, string> = {
  primary: 'bg-white text-neutral-950 hover:bg-white/90 focus-visible:outline-white/80',
  secondary:
    'border border-white/15 bg-neutral-900 text-white hover:bg-neutral-900/80 focus-visible:outline-white/40',
  ghost: 'bg-transparent text-white hover:bg-white/10 focus-visible:outline-white/30',
}
</script>

<template>
  <button
    :type="props.type"
    :class="[baseClasses, variantClasses[props.variant], props.block && 'w-full']"
  >
    <slot />
  </button>
</template>
