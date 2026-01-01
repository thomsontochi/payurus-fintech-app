<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Plus, UserRound, Phone, IdCard, Info, Camera } from 'lucide-vue-next'
import TransferScreenShell from '@/components/layout/TransferScreenShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

type IbanMode = 'iban' | 'easy'

const { t } = useI18n()
const activeTab = ref<'phone' | 'iban'>('phone')
const ibanMode = ref<IbanMode>('iban')

const quickLinks = [{ id: 'new', label: t('transfers.send.addNew') }]
</script>

<template>
  <TransferScreenShell :title="t('transfers.send.title')" :subtitle="t('transfers.send.info')">
    <section
      class="rounded-3xl border border-white/10 bg-[#101010] p-2 text-sm font-medium text-white/60"
    >
      <div class="grid grid-cols-2 overflow-hidden rounded-[26px] bg-black/20 p-1">
        <button
          class="rounded-[22px] py-2 text-center transition"
          :class="activeTab === 'phone' ? 'bg-white text-black font-semibold' : ''"
          @click="activeTab = 'phone'"
        >
          {{ t('transfers.send.tabs.phone') }}
        </button>
        <button
          class="rounded-[22px] py-2 text-center transition"
          :class="activeTab === 'iban' ? 'bg-white text-black font-semibold' : ''"
          @click="activeTab = 'iban'"
        >
          {{ t('transfers.send.tabs.iban') }}
        </button>
      </div>
    </section>

    <section>
      <p class="text-xs font-semibold uppercase tracking-wider text-white/50">
        {{ t('transfers.send.quickLinks') }}
      </p>
      <div class="mt-3 flex flex-col gap-2">
        <button
          v-for="link in quickLinks"
          :key="link.id"
          class="flex items-center gap-3 rounded-2xl border border-dashed border-white/15 px-4 py-3 text-left text-white transition hover:border-white/40"
        >
          <span
            class="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-transparent"
          >
            <Plus class="h-5 w-5" />
          </span>
          <div>
            <p class="text-sm font-semibold">{{ link.label }}</p>
            <p class="text-xs text-white/50">{{ t('transfers.send.addNew') }}</p>
          </div>
        </button>
      </div>
    </section>

    <section class="space-y-3 rounded-3xl border border-white/10 bg-[#101010] p-4 text-white/80">
      <div class="flex items-start gap-3">
        <div class="rounded-full border border-white/15 p-2">
          <UserRound class="h-5 w-5" />
        </div>
        <div class="flex-1 space-y-1">
          <p class="text-sm font-semibold text-white">
            {{ t('transfers.send.contactPermission.title') }}
          </p>
          <p class="text-xs leading-relaxed text-white/60">
            {{ t('transfers.send.contactPermission.body') }}
          </p>
          <button class="text-xs font-semibold text-white/80 underline underline-offset-2">
            {{ t('transfers.send.contactPermission.link') }}
          </button>
        </div>
        <button class="rounded-full border border-white/20 p-2 text-white/60">
          <Info class="h-4 w-4" />
        </button>
      </div>
      <BaseButton variant="secondary" class="w-full py-3 text-sm">
        {{ t('transfers.send.contactPermission.action') }}
      </BaseButton>
    </section>

    <section v-if="activeTab === 'phone'" class="space-y-4">
      <div class="space-y-2">
        <label class="text-xs font-semibold uppercase tracking-wider text-white/50">
          {{ t('transfers.send.tabs.phone') }}
        </label>
        <div
          class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
        >
          <Phone class="h-5 w-5 text-white/60" />
          <input
            type="tel"
            :placeholder="t('transfers.send.phonePlaceholder')"
            class="w-full bg-transparent text-base text-white placeholder:text-white/40 focus:outline-none"
          />
        </div>
      </div>
      <BaseButton class="w-full py-3 text-base">
        {{ t('transfers.send.continue') }}
      </BaseButton>
    </section>

    <section v-else class="space-y-4">
      <div class="rounded-[22px] border border-white/10 bg-[#101010] p-1 text-sm font-medium">
        <div class="grid grid-cols-2 gap-1">
          <button
            class="rounded-[18px] py-2 text-center transition"
            :class="ibanMode === 'iban' ? 'bg-white text-black font-semibold' : 'text-white/60'"
            @click="ibanMode = 'iban'"
          >
            {{ t('transfers.send.ibanToggle.iban') }}
          </button>
          <button
            class="rounded-[18px] py-2 text-center transition"
            :class="ibanMode === 'easy' ? 'bg-white text-black font-semibold' : 'text-white/60'"
            @click="ibanMode = 'easy'"
          >
            {{ t('transfers.send.ibanToggle.easy') }}
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-xs font-semibold uppercase tracking-wider text-white/50">
          {{
            ibanMode === 'iban'
              ? t('transfers.send.ibanToggle.iban')
              : t('transfers.send.ibanToggle.easy')
          }}
        </label>
        <div
          class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
        >
          <component :is="ibanMode === 'iban' ? IdCard : UserRound" class="h-5 w-5 text-white/60" />
          <input
            type="text"
            :placeholder="
              ibanMode === 'iban'
                ? t('transfers.send.ibanPlaceholder')
                : t('transfers.send.easyPlaceholder')
            "
            class="w-full bg-transparent text-base text-white placeholder:text-white/40 focus:outline-none"
          />
          <button class="text-white/60">
            <Camera class="h-5 w-5" />
          </button>
        </div>
      </div>

      <BaseButton class="w-full py-3 text-base">
        {{ t('transfers.send.continue') }}
      </BaseButton>
    </section>
  </TransferScreenShell>
</template>
