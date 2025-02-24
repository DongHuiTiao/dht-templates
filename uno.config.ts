// uno.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'
import { presetExtra } from 'unocss-preset-extra'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetExtra(),
    presetDaisy({
      themes: ['garden'],
    }),
  ],
  shortcuts: {
    center: 'flex items-center justify-center',
    text: 'text-lg font-bold lg:text-4xl md:text-3xl sm:text-2xl',
  },
})
