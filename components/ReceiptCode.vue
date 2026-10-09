<template>
  <div class="flex flex-col items-center justify-center my-2 text-center text-black">
    <!-- 1D Barcode Mode -->
    <div v-if="mode === 'barcode' || mode === 'both'" class="w-full flex flex-col items-center mb-1">
      <Barcode128 
        :value="value" 
        :height="barcodeHeight" 
        :svg-width="barcodeWidth"
        :show-text="showText"
      />
    </div>

    <!-- 2D QR Code Mode -->
    <div v-if="mode === 'qr' || mode === 'both'" class="flex flex-col items-center my-1">
      <qrcode-vue 
        :value="value" 
        :size="qrSize" 
        level="M" 
        render-as="svg" 
        class="mx-auto"
      />
      <span v-if="mode === 'qr' && showText" class="text-[9px] font-mono tracking-wider text-gray-600 mt-0.5">
        {{ value }}
      </span>
    </div>

    <!-- Optional Label -->
    <p v-if="caption" class="text-[9px] text-gray-500 font-sans mt-0.5 max-w-[200px] leading-tight">
      {{ caption }}
    </p>
  </div>
</template>

<script setup>
import QrcodeVue from 'qrcode.vue'
import Barcode128 from '~/components/Barcode128.vue'

const props = defineProps({
  value: {
    type: String,
    required: true,
    default: ''
  },
  mode: {
    type: String,
    default: 'both', // 'barcode' | 'qr' | 'both'
    validator: (v) => ['barcode', 'qr', 'both'].includes(v)
  },
  barcodeHeight: {
    type: Number,
    default: 36
  },
  barcodeWidth: {
    type: [Number, String],
    default: '180px'
  },
  qrSize: {
    type: Number,
    default: 80
  },
  showText: {
    type: Boolean,
    default: true
  },
  caption: {
    type: String,
    default: ''
  }
})
</script>
