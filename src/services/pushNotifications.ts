export type PushPermissionStatus = 'granted' | 'denied' | 'unsupported'

const isPushSupported = () =>
  typeof window !== 'undefined' &&
  'Notification' in window &&
  'serviceWorker' in navigator &&
  'PushManager' in window

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export const requestPushPermission = async (): Promise<PushPermissionStatus> => {
  if (!isPushSupported()) {
    return 'unsupported'
  }

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') {
    return 'denied'
  }

  try {
    const registration = await navigator.serviceWorker.ready
    const existingSubscription = await registration.pushManager.getSubscription()
    if (existingSubscription) {
      console.info('Payurus push subscription already exists.')
      return 'granted'
    }

    const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY
    if (!vapidKey) {
      console.warn('VAPID key missing. Skipping push subscription creation.')
      return 'granted'
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    })

    console.info('Payurus push subscription generated:', subscription)
    // TODO: send subscription to backend API when endpoint is ready.
  } catch (error) {
    console.error('Payurus push subscription failed:', error)
  }

  return 'granted'
}
