<template>
  <div class="min-h-screen bg-neutral-950 text-white">
    <div class="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-6">
      <header class="flex items-center justify-between">
        <slot name="brand">
          <div class="flex items-center gap-2">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-base font-semibold"
            >
              PU
            </div>
            <p class="text-lg font-semibold tracking-tight">Payurus</p>
          </div>
        </slot>

        <slot name="profile">
          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-neutral-900/80 text-lg font-semibold"
          >
            <span class="sr-only">Profile</span>
            •
          </button>
        </slot>
      </header>

      <main class="mt-6 flex flex-1 flex-col gap-6">
        <slot />
      </main>

      <footer class="mt-6">
        <slot name="bottom-nav">
          <nav
            class="flex items-center justify-between rounded-2xl border border-white/5 bg-neutral-900/60 px-6 py-4 text-xs font-medium text-white/70"
          >
            <button class="flex flex-col items-center gap-1 text-sky-400">
              <span class="text-base">⌂</span>
              Home
            </button>
            <button class="flex flex-col items-center gap-1">
              <span class="text-base">💳</span>
              Card
            </button>
            <button class="flex flex-col items-center gap-1">
              <span class="text-base">⇄</span>
              Send
            </button>
            <button class="flex flex-col items-center gap-1">
              <span class="text-base">☰</span>
              Hub
            </button>
          </nav>
        </slot>
      </footer>
    </div>
  </div>
</template>
