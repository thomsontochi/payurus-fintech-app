export type PayurusRemoteConfig = {
  version: string
  activeBaseUrl: string
  assetsBaseUrl?: string
  signature?: string
  expiresAt?: string
}

const resolveDefaultOrigin = () => {
  if (typeof window !== 'undefined' && window.location) {
    return window.location.origin
  }

  if (typeof globalThis !== 'undefined' && 'location' in globalThis && globalThis.location) {
    return globalThis.location.origin
  }

  return ''
}

export const REMOTE_CONFIG_CACHE_NAME = 'payurus-remote-config'
export const REMOTE_CONFIG_CACHE_KEY = '/__payurus_remote_config__'
export const REMOTE_CONFIG_STORAGE_KEY = 'payurus_remote_config_store'
export const REMOTE_CONFIG_MESSAGE = 'PAYURUS_REMOTE_CONFIG_UPDATE'
export const REMOTE_CONFIG_ERROR_EVENT = 'payurus-remote-config-error'
export const REMOTE_CONFIG_RECOVERED_EVENT = 'payurus-remote-config-recovered'

export const DEFAULT_REMOTE_CONFIG: PayurusRemoteConfig = {
  version: '0.0.0',
  activeBaseUrl: resolveDefaultOrigin(),
}
