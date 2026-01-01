<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { t } = useI18n()
</script>

<template>
  <AuthLayout>
    <template #brand>
      <div class="flex w-full items-center justify-between">
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80"
        >
          <span class="sr-only">{{ t('common.profile') }}</span>
          <span class="text-base">••</span>
        </button>
        <p class="text-lg font-semibold tracking-tight">{{ t('brand') }}</p>
        <div class="h-10 w-10"></div>
      </div>
    </template>

    <section class="space-y-8">
      <!-- Main illustration area -->
      <div class="relative overflow-hidden rounded-3xl bg-neutral-900/40 px-6 pb-8 pt-12">
        <!-- Person illustration area -->
        <div class="relative mx-auto flex max-w-sm flex-col items-center">
          <!-- Top icons row -->
          <div class="mb-6 flex w-full items-center justify-between px-4">
            <div class="flex flex-col items-center gap-2">
              <div class="flex h-20 w-20 items-center justify-center rounded-full bg-purple-300">
                <div class="relative">
                  <div class="h-10 w-10 rounded bg-amber-200"></div>
                  <div
                    class="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  >
                    <span class="text-xs">₿</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div class="flex h-24 w-36 items-center justify-center rounded-2xl bg-pink-300/80">
                <div class="text-center">
                  <div class="mb-1 text-xs text-neutral-800">💳</div>
                  <div class="text-neutral-900">••••</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Center figure -->
          <div class="relative z-10 mb-4">
            <div class="h-32 w-32 rounded-full bg-neutral-700"></div>
            <div
              class="absolute -bottom-4 -right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-xl"
            >
              $
            </div>
          </div>

          <!-- Bottom icons -->
          <div class="flex w-full items-end justify-around px-8">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-300">
              <span class="text-2xl">☕</span>
            </div>
            <div class="mb-4 h-12 w-12 rounded-full bg-amber-400"></div>
            <div class="flex items-end gap-1">
              <div class="h-8 w-3 rounded-full bg-amber-400"></div>
              <div class="h-12 w-3 rounded-full bg-amber-400"></div>
              <div class="h-10 w-3 rounded-full bg-amber-400"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Heading section -->
      <div class="text-center">
        <h1 class="text-[32px] font-bold leading-tight tracking-tight">
          {{ t('auth.hero.title') }}
        </h1>
        <p class="mt-2 text-base text-white/60">{{ t('auth.hero.subtitle') }}</p>
      </div>

      <!-- Action buttons -->
      <div class="flex gap-4">
        <RouterLink to="/register" class="flex-1">
          <BaseButton block variant="secondary" class="py-4 text-base">{{
            t('auth.actions.signup')
          }}</BaseButton>
        </RouterLink>
        <RouterLink to="/login" class="flex-1">
          <BaseButton block class="py-4 text-base">{{ t('auth.actions.login') }}</BaseButton>
        </RouterLink>
      </div>
    </section>

    <section class="mt-8 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-base font-semibold tracking-wide text-white/90">{{ t('common.learn') }}</h2>
        <button type="button" class="rounded-full px-3 py-2 text-white/50 hover:text-white/80">
          <span class="sr-only">{{ t('common.moreOptions') }}</span>
          <span class="text-xl">⋯</span>
        </button>
      </div>

      <article class="rounded-3xl bg-neutral-900/60 p-5">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold leading-snug">{{ t('auth.learnCard.title') }}</h3>
            <p class="mt-2 text-sm text-white/50">{{ t('auth.learnCard.readTime') }}</p>
          </div>
          <div
            class="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-neutral-800/60 text-4xl"
          >
            🙌
          </div>
        </div>
      </article>
    </section>

    <template #bottom-nav>
      <nav
        class="flex items-center justify-between rounded-2xl border border-white/5 bg-neutral-900/60 px-6 py-4 text-xs font-medium text-white/70"
      >
        <button class="flex flex-col items-center gap-1.5 text-pink-500">
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            />
          </svg>
          <span>{{ t('common.home') }}</span>
        </button>
        <button class="flex flex-col items-center gap-1.5">
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
          <span>{{ t('common.card') }}</span>
        </button>
        <button class="flex flex-col items-center gap-1.5">
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
          <span>{{ t('common.send') }}</span>
        </button>
        <button class="flex flex-col items-center gap-1.5">
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <span>{{ t('common.hub') }}</span>
        </button>
      </nav>
    </template>
  </AuthLayout>
</template>
