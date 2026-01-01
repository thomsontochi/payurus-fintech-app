import { ref } from 'vue'
import { useRouter } from 'vue-router'

export type TransferOption = 'send' | 'request' | 'international' | 'secure' | 'scheduled'

const transferRoutes: Record<TransferOption, string> = {
  send: '/transfer/send',
  request: '/transfer/request',
  international: '/transfer/international',
  secure: '/transfer/secure',
  scheduled: '/transfer/scheduled',
}

export function useTransferSheet() {
  const router = useRouter()
  const transferSheetOpen = ref(false)

  const openTransferSheet = () => {
    transferSheetOpen.value = true
  }

  const closeTransferSheet = () => {
    transferSheetOpen.value = false
  }

  const handleTransferSelect = (option: TransferOption) => {
    transferSheetOpen.value = false
    router.push(transferRoutes[option])
  }

  return {
    transferSheetOpen,
    openTransferSheet,
    closeTransferSheet,
    handleTransferSelect,
  }
}
