/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import type { PrecacheEntry } from 'workbox-precaching'

import {
  DEFAULT_REMOTE_CONFIG,
  REMOTE_CONFIG_CACHE_KEY,
  REMOTE_CONFIG_CACHE_NAME,
  REMOTE_CONFIG_MESSAGE,
} from './constants/remoteConfig'
import type { PayurusRemoteConfig } from './constants/remoteConfig'

declare let self: ServiceWorkerGlobalScope & { __WB_MANIFEST: Array<PrecacheEntry> }

self.skipWaiting()
clientsClaim()

const precacheManifest = self.__WB_MANIFEST

precacheAndRoute(precacheManifest)

const hasIndexedDocument = (manifest: Array<PrecacheEntry> = []) => {
  return manifest.some((entry) => {
    if (typeof entry === 'string') return entry === 'index.html'
    return entry.url === 'index.html'
  })
}

if (hasIndexedDocument(precacheManifest)) {
  registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')))
} else if (import.meta.env.DEV) {
  console.warn(
    '[Payurus SW] Skipping navigation handler because index.html is not precached in dev mode.',
  )
}

let remoteConfig: PayurusRemoteConfig = DEFAULT_REMOTE_CONFIG

const loadCachedConfig = async () => {
  try {
    const cache = await caches.open(REMOTE_CONFIG_CACHE_NAME)
    const cachedResponse = await cache.match(REMOTE_CONFIG_CACHE_KEY)
    if (cachedResponse) {
      const payload = (await cachedResponse.json()) as PayurusRemoteConfig
      if (payload?.activeBaseUrl) {
        remoteConfig = payload
      }
    }
  } catch (error) {
    console.warn('[Payurus SW] Unable to read cached remote config', error)
  }
}

void loadCachedConfig()

const persistConfig = async (config: PayurusRemoteConfig) => {
  try {
    const cache = await caches.open(REMOTE_CONFIG_CACHE_NAME)
    await cache.put(
      REMOTE_CONFIG_CACHE_KEY,
      new Response(JSON.stringify(config), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }),
    )
  } catch (error) {
    console.warn('[Payurus SW] Unable to persist remote config', error)
  }
}

self.addEventListener('message', (event) => {
  if (event.data?.type === REMOTE_CONFIG_MESSAGE && event.data?.payload) {
    const payload = event.data.payload as PayurusRemoteConfig
    if (payload?.activeBaseUrl) {
      remoteConfig = payload
      void persistConfig(remoteConfig)
    }
    return
  }

  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

const shouldRewriteRequest = (url: URL, request: Request) => {
  if (!remoteConfig?.activeBaseUrl) return false
  if (request.mode === 'navigate') return false
  if (url.origin !== self.location.origin) return false
  if (remoteConfig.activeBaseUrl === self.location.origin) return false
  if (url.pathname === REMOTE_CONFIG_CACHE_KEY) return false
  return true
}

const rewriteRequest = (request: Request, targetOrigin: string) => {
  const originalUrl = new URL(request.url)
  const proxiedUrl = new URL(
    `${originalUrl.pathname}${originalUrl.search}${originalUrl.hash}`,
    targetOrigin,
  )

  const init: RequestInit = {
    method: request.method,
    headers: request.headers,
    redirect: request.redirect,
    cache: request.cache,
    credentials: request.credentials,
    integrity: request.integrity,
    keepalive: request.keepalive,
    mode: request.mode === 'navigate' ? 'cors' : request.mode,
    referrer: request.referrer,
    referrerPolicy: request.referrerPolicy,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.clone().body : undefined,
  }

  return new Request(proxiedUrl.toString(), init)
}

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method === 'OPTIONS' || request.destination === 'document') {
    return
  }

  const requestUrl = new URL(request.url)

  if (!shouldRewriteRequest(requestUrl, request)) {
    return
  }

  const proxiedRequest = rewriteRequest(request, remoteConfig.activeBaseUrl)

  event.respondWith(
    fetch(proxiedRequest).catch((error) => {
      console.warn('[Payurus SW] Proxy fetch failed, falling back to original request', error)
      return fetch(request)
    }),
  )
})
