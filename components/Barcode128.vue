<template>
  <div class="inline-flex flex-col items-center select-none font-mono">
    <svg 
      v-if="bars.length > 0"
      :width="svgWidth" 
      :height="height" 
      :viewBox="`0 0 ${totalWidth} ${height}`" 
      preserveAspectRatio="none"
      class="max-w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Background (transparent) -->
      <rect width="100%" height="100%" fill="transparent" />
      
      <!-- Bars -->
      <rect 
        v-for="(bar, idx) in bars" 
        :key="idx"
        :x="bar.x" 
        y="0" 
        :width="bar.w" 
        :height="height" 
        fill="currentColor"
      />
    </svg>
    <div v-else class="text-[10px] text-gray-400 italic">Invalid code</div>
    
    <span v-if="showText && bars.length > 0" class="text-[10px] tracking-widest font-mono font-bold mt-0.5 text-gray-800 dark:text-gray-200">
      {{ value }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true,
    default: ''
  },
  height: {
    type: Number,
    default: 40
  },
  svgWidth: {
    type: [Number, String],
    default: '100%'
  },
  showText: {
    type: Boolean,
    default: true
  },
  quietZone: {
    type: Number,
    default: 10
  }
})

// Code 128 Patterns (0 - 106)
// Each 6-character string represents bar and space widths (alternating bar, space, bar, space, bar, space)
const CODE128_PATTERNS = [
  '212222', '222122', '222221', '121223', '121322', '131222', '122213', '122312', '132212', '221213', // 0-9
  '221312', '231212', '112232', '122132', '122231', '113222', '123122', '123221', '223211', '221132', // 10-19
  '221231', '213212', '223112', '312131', '311222', '321122', '321221', '312212', '322112', '322211', // 20-29
  '212123', '212321', '232121', '111323', '131123', '131321', '112313', '132113', '132311', '211313', // 30-39
  '231113', '231311', '112133', '112331', '132131', '113123', '113321', '133121', '313121', '211331', // 40-49
  '231131', '213113', '213311', '213131', '311123', '311321', '331121', '312113', '312311', '332111', // 50-59
  '314111', '221411', '431111', '111224', '111422', '121124', '121421', '141122', '141221', '112214', // 60-69
  '112412', '122114', '122411', '142112', '142211', '241211', '221114', '413111', '241112', '134111', // 70-79
  '111242', '121142', '121241', '114212', '124112', '124211', '411212', '421112', '421211', '212141', // 80-89
  '214121', '412121', '111143', '111341', '131141', '114113', '114311', '411113', '411311', '113141', // 90-99
  '114131', '311141', '411131', '211412', '211214', '211232', '2331112' // 100-106
]

const START_CODE_B = 104
const STOP_CODE = 106

const barcodeData = computed(() => {
  const text = String(props.value || '').trim()
  if (!text) return { bars: [], totalWidth: 0 }

  // Filter only standard ASCII characters 32 - 126
  const charCodes = []
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i)
    if (code >= 32 && code <= 126) {
      charCodes.push(code - 32)
    } else {
      charCodes.push(0) // space fallback
    }
  }

  // Calculate checksum: (START_CODE_B + sum(pos * code)) % 103
  let checksum = START_CODE_B
  for (let i = 0; i < charCodes.length; i++) {
    checksum += (i + 1) * charCodes[i]
  }
  checksum = checksum % 103

  // Sequence of patterns to render
  const symbols = [START_CODE_B, ...charCodes, checksum, STOP_CODE]

  let currentX = props.quietZone
  const calculatedBars = []

  for (let sIdx = 0; sIdx < symbols.length; sIdx++) {
    const pattern = CODE128_PATTERNS[symbols[sIdx]]
    if (!pattern) continue

    for (let pIdx = 0; pIdx < pattern.length; pIdx++) {
      const width = parseInt(pattern[pIdx], 10)
      const isBar = pIdx % 2 === 0

      if (isBar) {
        calculatedBars.push({ x: currentX, w: width })
      }
      currentX += width
    }
  }

  const totalWidth = currentX + props.quietZone
  return { bars: calculatedBars, totalWidth }
})

const bars = computed(() => barcodeData.value.bars)
const totalWidth = computed(() => barcodeData.value.totalWidth)
</script>
