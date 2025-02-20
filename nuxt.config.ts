import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    'nuxt-api-party',
    'nuxt-jsonapi'
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  apiParty: {
    endpoints: {
      sendmarc: {
        url: process.env.NUXT_PUBLIC_SENDMARC_URL!,
        headers: {
          Authorization: `Bearer ${process.env.SENDMARC_TOKEN!}`,
          Accept: 'application/json',
          'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
          'Content-Type': 'application/json'
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_SENDMARC_URL,
    },
  },
})
