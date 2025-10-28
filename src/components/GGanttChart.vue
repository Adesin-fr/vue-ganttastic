<template>
  <div>
    <div :class="[{ 'labels-in-column': !!labelColumnTitle }]">
      <g-gantt-label-column v-if="labelColumnTitle" :style="{ width: labelColumnWidth }">
        <template #label-column-title>
          <slot name="label-column-title" />
        </template>
        <template #label-column-row="{ label }">
          <slot name="label-column-row" :label="label" />
        </template>
      </g-gantt-label-column>
      <div
        ref="ganttChart"
        :class="['g-gantt-chart', { 'with-column': labelColumnTitle, 'is-dragging': isChartDragging }]"
        :style="{ width, background: colors.background, fontFamily: font }"
      >
        <g-gantt-timeaxis v-if="!hideTimeaxis">
          <template #upper-timeunit="{ label, value, date }">
            <!-- expose upper-timeunit slot of g-gantt-timeaxis-->
            <slot name="upper-timeunit" :label="label" :value="value" :date="date" />
          </template>
          <template #timeunit="{ label, value, date }">
            <!-- expose timeunit slot of g-gantt-timeaxis-->
            <slot name="timeunit" :label="label" :value="value" :date="date" />
          </template>
        </g-gantt-timeaxis>
        <g-gantt-grid v-if="grid" :highlighted-units="highlightedUnits" />
        <g-gantt-current-time v-if="currentTime">
          <template #current-time-label>
            <slot name="current-time-label" />
          </template>
        </g-gantt-current-time>
        <div class="g-gantt-rows-container">
          <slot />
          <!-- the g-gantt-row components go here -->
        </div>
      </div>
    </div>
    <g-gantt-bar-tooltip :model-value="showTooltip || isDragging" :bar="tooltipBar">
      <template #default>
        <slot name="bar-tooltip" :bar="tooltipBar" />
      </template>
    </g-gantt-bar-tooltip>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  provide,
  ref,
  toRefs,
  useSlots,
  onMounted,
  onUnmounted,
  type ComputedRef,
  type Ref,
  type ToRefs
} from "vue"

import GGanttGrid from "./GGanttGrid.vue"
import GGanttLabelColumn from "./GGanttLabelColumn.vue"
import GGanttTimeaxis from "./GGanttTimeaxis.vue"
import GGanttBarTooltip from "./GGanttBarTooltip.vue"
import GGanttCurrentTime from "./GGanttCurrentTime.vue"

import type { GanttBarObject } from "../types"
import type { ColorSchemeKey } from "../color-schemes.js"

import { useElementSize } from "@vueuse/core"
import { DEFAULT_DATE_FORMAT } from "../composables/useDayjsHelper"
import { colorSchemes, type ColorScheme } from "../color-schemes.js"
import {
  CHART_ROWS_KEY,
  CONFIG_KEY,
  EMIT_BAR_EVENT_KEY,
  type ChartRow
} from "../provider/symbols.js"
import dayjs from "dayjs"

export interface GGanttChartProps {
  chartStart: string | Date
  chartEnd: string | Date
  precision?: "hour" | "day" | "date" | "week" | "month"
  barStart: string
  barEnd: string
  currentTime?: boolean
  currentTimeLabel?: string
  dateFormat?: string | false
  width?: string
  hideTimeaxis?: boolean
  colorScheme?: ColorSchemeKey | ColorScheme
  grid?: boolean
  pushOnOverlap?: boolean
  noOverlap?: boolean
  rowHeight?: number
  highlightedUnits?: number[]
  font?: string
  labelColumnTitle?: string
  labelColumnWidth?: string
}

export type GGanttChartConfig = ToRefs<Required<GGanttChartProps>> & {
  colors: ComputedRef<ColorScheme>
  chartSize: {
    width: Ref<number>
    height: Ref<number>
  }
}

const props = withDefaults(defineProps<GGanttChartProps>(), {
  currentTimeLabel: "",
  dateFormat: DEFAULT_DATE_FORMAT,
  precision: "day",
  width: "100%",
  hideTimeaxis: false,
  colorScheme: "default",
  grid: false,
  pushOnOverlap: false,
  noOverlap: false,
  rowHeight: 40,
  highlightedUnits: () => [],
  font: "inherit",
  labelColumnTitle: "",
  labelColumnWidth: "150px"
})

const emit = defineEmits<{
  (e: "click-bar", value: { bar: GanttBarObject; e: MouseEvent; datetime?: string | Date }): void
  (
    e: "mousedown-bar",
    value: { bar: GanttBarObject; e: MouseEvent; datetime?: string | Date }
  ): void
  (e: "mouseup-bar", value: { bar: GanttBarObject; e: MouseEvent; datetime?: string | Date }): void
  (e: "dblclick-bar", value: { bar: GanttBarObject; e: MouseEvent; datetime?: string | Date }): void
  (e: "mouseenter-bar", value: { bar: GanttBarObject; e: MouseEvent }): void
  (e: "mouseleave-bar", value: { bar: GanttBarObject; e: MouseEvent }): void
  (e: "dragstart-bar", value: { bar: GanttBarObject; e: MouseEvent }): void
  (e: "drag-bar", value: { bar: GanttBarObject; e: MouseEvent }): void
  (
    e: "dragend-bar",
    value: {
      bar: GanttBarObject
      e: MouseEvent
      movedBars?: Map<GanttBarObject, { oldStart: string; oldEnd: string }>
    }
  ): void
  (
    e: "contextmenu-bar",
    value: { bar: GanttBarObject; e: MouseEvent; datetime?: string | Date }
  ): void
  (e: "click-chart", value: { e: MouseEvent; datetime?: string | Date }): void
  (e: "dblclick-chart", value: { e: MouseEvent; datetime?: string | Date }): void
}>()

const { width, font, colorScheme } = toRefs(props)

const slots = useSlots()
const colors = computed(() =>
  typeof colorScheme.value !== "string"
    ? colorScheme.value
    : colorSchemes[colorScheme.value as ColorSchemeKey] || colorSchemes.default
)
const getChartRows = () => {
  const defaultSlot = slots.default?.()
  const allBars: ChartRow[] = []

  if (!defaultSlot) {
    return allBars
  }
  defaultSlot.forEach((child) => {
    if (child.props?.bars) {
      const { label, bars } = child.props
      allBars.push({ label, bars })
      // if using v-for to generate rows, rows will be children of a single "fragment" v-node:
    } else if (Array.isArray(child.children)) {
      child.children.forEach((grandchild) => {
        const granchildNode = grandchild as {
          props?: ChartRow
        }
        if (granchildNode?.props?.bars) {
          const { label, bars } = granchildNode.props
          allBars.push({ label, bars })
        }
      })
    }
  })
  return allBars
}

const showTooltip = ref(false)
const isDragging = ref(false)
const tooltipBar = ref<GanttBarObject | undefined>(undefined)
let tooltipTimeoutId: ReturnType<typeof setTimeout>
const initTooltip = (bar: GanttBarObject) => {
  if (tooltipTimeoutId) {
    clearTimeout(tooltipTimeoutId)
  }
  tooltipTimeoutId = setTimeout(() => {
    showTooltip.value = true
  }, 800)
  tooltipBar.value = bar
}

const clearTooltip = () => {
  clearTimeout(tooltipTimeoutId)
  showTooltip.value = false
}

// Bar click delay state for distinguishing single vs double click
let barClickTimeoutId: ReturnType<typeof setTimeout> | null = null
const barClickDelay = 250 // milliseconds

const emitBarEvent = (
  e: MouseEvent,
  bar: GanttBarObject,
  datetime?: string | Date,
  movedBars?: Map<GanttBarObject, { oldStart: string; oldEnd: string }>
) => {
  switch (e.type) {
    case "click":
      // Clear any existing timeout
      if (barClickTimeoutId) {
        clearTimeout(barClickTimeoutId)
      }
      // Delay the click event to wait for a potential double-click
      barClickTimeoutId = setTimeout(() => {
        emit("click-bar", { bar, e, datetime })
        barClickTimeoutId = null
      }, barClickDelay)
      break
    case "mousedown":
      emit("mousedown-bar", { bar, e, datetime })
      break
    case "mouseup":
      emit("mouseup-bar", { bar, e, datetime })
      break
    case "dblclick":
      // Cancel the pending click event
      if (barClickTimeoutId) {
        clearTimeout(barClickTimeoutId)
        barClickTimeoutId = null
      }
      emit("dblclick-bar", { bar, e, datetime })
      break
    case "mouseenter":
      initTooltip(bar)
      emit("mouseenter-bar", { bar, e })
      break
    case "mouseleave":
      clearTooltip()
      emit("mouseleave-bar", { bar, e })
      break
    case "dragstart":
      isDragging.value = true
      emit("dragstart-bar", { bar, e })
      break
    case "drag":
      emit("drag-bar", { bar, e })
      break
    case "dragend":
      isDragging.value = false
      emit("dragend-bar", { bar, e, movedBars })
      break
    case "contextmenu":
      emit("contextmenu-bar", { bar, e, datetime })
      break
  }
}

const ganttChart = ref<HTMLElement | null>(null)
const chartSize = useElementSize(ganttChart)

// Zoom and scroll state
const zoomLevel = ref(1)
const minZoom = 0.05  // Allow zooming out to 5% (20x zoom out)
const maxZoom = 10

// Chart drag/pan state
const isChartDragging = ref(false)
const dragStartX = ref(0)
const dragStartOffset = ref(0)
const hasMouseMoved = ref(false)

// Click delay state for distinguishing single vs double click
let clickTimeoutId: ReturnType<typeof setTimeout> | null = null
const clickDelay = 250 // milliseconds

// Touch gesture state
const lastTouchDistance = ref(0)
const lastTouchCenter = ref(0)
const isTouching = ref(false)

// Convert props to dayjs for calculations
const originalChartStart = computed(() => {
  const format = props.dateFormat || DEFAULT_DATE_FORMAT
  if (props.chartStart instanceof Date) {
    return dayjs(props.chartStart)
  }
  return typeof format === 'string' ? dayjs(props.chartStart, format, true) : dayjs(props.chartStart)
})

const originalChartEnd = computed(() => {
  const format = props.dateFormat || DEFAULT_DATE_FORMAT
  if (props.chartEnd instanceof Date) {
    return dayjs(props.chartEnd)
  }
  return typeof format === 'string' ? dayjs(props.chartEnd, format, true) : dayjs(props.chartEnd)
})

const totalDuration = computed(() => originalChartEnd.value.diff(originalChartStart.value, 'minute'))

// Date range offset for panning (in minutes from the original start)
// Can be negative to allow panning before the original start
const dateRangeOffset = ref(0)

// Calculate the visible date range based on zoom level and offset
const visibleDuration = computed(() => totalDuration.value / zoomLevel.value)

const adjustedChartStart = computed(() => {
  // Allow start to go before the original start when zoomed out
  return originalChartStart.value.add(dateRangeOffset.value, 'minute')
})

const adjustedChartEnd = computed(() => {
  // Allow end to go past the original end when zoomed out
  return adjustedChartStart.value.add(visibleDuration.value, 'minute')
})

// Auto-adjust precision based on visible time range
const effectivePrecision = computed(() => {
  // Calculate visible duration in days using visibleDuration (which is stable)
  const visibleDays = visibleDuration.value / (24 * 60)

  // More granular precision levels for smoother transitions
  if (visibleDays < 1) {
    return 'hour'
  } else if (visibleDays < 60) {
    return 'day'
  } else if (visibleDays < 365) {
    return 'week'
  } else {
    return 'month'
  }
})

// Handle wheel events for zoom and scroll
const handleWheel = (e: WheelEvent) => {
  if (e.ctrlKey || e.metaKey) {
    // Ctrl+wheel: horizontal scroll (pan through time)
    e.preventDefault()
    const scrollSpeed = visibleDuration.value * 0.02 // 2% of visible duration per scroll (reduced from 5%)
    const deltaMinutes = e.deltaY > 0 ? scrollSpeed : -scrollSpeed

    // Update offset without clamping - allow panning anywhere
    dateRangeOffset.value += deltaMinutes
  } else {
    // Regular wheel: zoom in/out
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.05 : 0.05 // Reduced from 0.1 to 0.05 for less sensitive zoom
    const newZoom = Math.max(minZoom, Math.min(maxZoom, zoomLevel.value + delta))

    // Calculate the mouse position as a ratio of the visible range
    const container = ganttChart.value
    if (container) {
      const rect = container.getBoundingClientRect()
      const mouseX = e.clientX - rect.left + container.scrollLeft
      const mouseRatio = mouseX / (chartSize.width.value || 1)

      // Calculate the time at the mouse position
      const timeAtMouse = adjustedChartStart.value.add(mouseRatio * visibleDuration.value, 'minute')

      // Update zoom
      zoomLevel.value = newZoom

      // Adjust offset to keep the time at mouse position stable
      // No clamping - allow zooming out beyond original range
      const newVisibleDuration = totalDuration.value / newZoom
      const minutesFromOriginalStart = timeAtMouse.diff(originalChartStart.value, 'minute')
      const newOffset = minutesFromOriginalStart - (mouseRatio * newVisibleDuration)
      dateRangeOffset.value = newOffset
    }
  }
}

// Handle chart click and dblclick
const handleChartClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.closest('.g-gantt-bar')) {
    // Don't emit chart click if clicking on a bar
    return
  }

  // Only emit click if mouse didn't move (not a drag)
  if (hasMouseMoved.value) {
    return
  }

  // Clear any existing timeout
  if (clickTimeoutId) {
    clearTimeout(clickTimeoutId)
  }

  // Delay the click event to wait for a potential double-click
  clickTimeoutId = setTimeout(() => {
    const container = ganttChart.value
    if (!container) return

    const rect = container.getBoundingClientRect()
    const xPos = e.clientX - rect.left
    const pixelsPerMinute = (chartSize.width.value || 1) / visibleDuration.value
    const minutesFromStart = xPos / pixelsPerMinute
    const datetime = adjustedChartStart.value.add(minutesFromStart, 'minute')

    // Return date in same format as original props
    const formattedDatetime = props.chartStart instanceof Date
      ? datetime.toDate()
      : datetime.format(props.dateFormat || DEFAULT_DATE_FORMAT)

    emit("click-chart", { e, datetime: formattedDatetime })
    clickTimeoutId = null
  }, clickDelay)
}

const handleChartDblClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.closest('.g-gantt-bar')) {
    // Don't emit chart dblclick if clicking on a bar
    return
  }

  // Cancel the pending click event
  if (clickTimeoutId) {
    clearTimeout(clickTimeoutId)
    clickTimeoutId = null
  }

  const container = ganttChart.value
  if (!container) return

  const rect = container.getBoundingClientRect()
  const xPos = e.clientX - rect.left
  const pixelsPerMinute = (chartSize.width.value || 1) / visibleDuration.value
  const minutesFromStart = xPos / pixelsPerMinute
  const datetime = adjustedChartStart.value.add(minutesFromStart, 'minute')

  // Return date in same format as original props
  const formattedDatetime = props.chartStart instanceof Date
    ? datetime.toDate()
    : datetime.format(props.dateFormat || DEFAULT_DATE_FORMAT)

  emit("dblclick-chart", { e, datetime: formattedDatetime })
}

// Handle mouse drag for panning
const handleMouseDown = (e: MouseEvent) => {
  // Only start drag on left mouse button
  if (e.button !== 0) return

  // Check if the click is on a bar element or its children
  const target = e.target as HTMLElement
  if (target.closest('.g-gantt-bar')) {
    // Don't start chart dragging if clicking on a bar
    return
  }

  isChartDragging.value = true
  hasMouseMoved.value = false
  dragStartX.value = e.clientX
  dragStartOffset.value = dateRangeOffset.value

  // Prevent text selection while dragging
  e.preventDefault()
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isChartDragging.value) return

  const container = ganttChart.value
  if (!container) return

  // Calculate how many pixels were dragged
  const deltaX = e.clientX - dragStartX.value

  // Mark that mouse has moved (for distinguishing click from drag)
  if (Math.abs(deltaX) > 3) {
    hasMouseMoved.value = true
  }

  // Convert pixels to time (minutes)
  const pixelsPerMinute = (chartSize.width.value || 1) / visibleDuration.value
  const deltaMinutes = -deltaX / pixelsPerMinute // Negative because dragging right should show earlier dates

  // Update the offset
  dateRangeOffset.value = dragStartOffset.value + deltaMinutes
}

const handleMouseUp = () => {
  isChartDragging.value = false
}

const handleMouseLeave = () => {
  // Stop dragging if mouse leaves the chart
  isChartDragging.value = false
}

// Touch gesture handlers
const getTouchDistance = (touches: TouchList) => {
  const dx = touches[0].clientX - touches[1].clientX
  const dy = touches[0].clientY - touches[1].clientY
  return Math.sqrt(dx * dx + dy * dy)
}

const getTouchCenter = (touches: TouchList) => {
  return (touches[0].clientX + touches[1].clientX) / 2
}

const handleTouchStart = (e: TouchEvent) => {
  const target = e.target as HTMLElement
  if (target.closest('.g-gantt-bar')) {
    return // Don't handle touch on bars
  }

  if (e.touches.length === 2) {
    // Two-finger gesture
    e.preventDefault()
    isTouching.value = true
    lastTouchDistance.value = getTouchDistance(e.touches)
    lastTouchCenter.value = getTouchCenter(e.touches)
    dragStartOffset.value = dateRangeOffset.value
  } else if (e.touches.length === 1) {
    // Single finger drag
    isTouching.value = true
    dragStartX.value = e.touches[0].clientX
    dragStartOffset.value = dateRangeOffset.value
  }
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isTouching.value) return

  if (e.touches.length === 2) {
    // Pinch to zoom and two-finger pan
    e.preventDefault()

    const currentDistance = getTouchDistance(e.touches)
    const currentCenter = getTouchCenter(e.touches)

    // Calculate zoom change from pinch
    const distanceRatio = currentDistance / lastTouchDistance.value
    const zoomChange = (distanceRatio - 1) * 0.5 // Sensitivity factor
    const newZoom = Math.max(minZoom, Math.min(maxZoom, zoomLevel.value * (1 + zoomChange)))

    // Calculate pan from two-finger movement
    const centerDelta = currentCenter - lastTouchCenter.value
    const pixelsPerMinute = (chartSize.width.value || 1) / visibleDuration.value
    const panMinutes = -centerDelta / pixelsPerMinute

    // Apply zoom
    zoomLevel.value = newZoom

    // Apply pan
    dateRangeOffset.value = dragStartOffset.value + panMinutes

    // Update for next move
    lastTouchDistance.value = currentDistance
    lastTouchCenter.value = currentCenter
    dragStartOffset.value = dateRangeOffset.value
  } else if (e.touches.length === 1) {
    // Single finger pan
    e.preventDefault()

    const deltaX = e.touches[0].clientX - dragStartX.value
    const pixelsPerMinute = (chartSize.width.value || 1) / visibleDuration.value
    const deltaMinutes = -deltaX / pixelsPerMinute

    dateRangeOffset.value = dragStartOffset.value + deltaMinutes
  }
}

const handleTouchEnd = () => {
  isTouching.value = false
}

onMounted(() => {
  const container = ganttChart.value
  if (container) {
    // Mouse events
    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("mousedown", handleMouseDown)
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseup", handleMouseUp)
    container.addEventListener("mouseleave", handleMouseLeave)
    container.addEventListener("click", handleChartClick)
    container.addEventListener("dblclick", handleChartDblClick)

    // Touch events
    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd)
    container.addEventListener("touchcancel", handleTouchEnd)
  }
})

onUnmounted(() => {
  // Clear any pending click timeouts
  if (clickTimeoutId) {
    clearTimeout(clickTimeoutId)
    clickTimeoutId = null
  }
  if (barClickTimeoutId) {
    clearTimeout(barClickTimeoutId)
    barClickTimeoutId = null
  }

  const container = ganttChart.value
  if (container) {
    // Mouse events
    container.removeEventListener("wheel", handleWheel)
    container.removeEventListener("mousedown", handleMouseDown)
    container.removeEventListener("mousemove", handleMouseMove)
    container.removeEventListener("mouseup", handleMouseUp)
    container.removeEventListener("mouseleave", handleMouseLeave)
    container.removeEventListener("click", handleChartClick)
    container.removeEventListener("dblclick", handleChartDblClick)

    // Touch events
    container.removeEventListener("touchstart", handleTouchStart)
    container.removeEventListener("touchmove", handleTouchMove)
    container.removeEventListener("touchend", handleTouchEnd)
    container.removeEventListener("touchcancel", handleTouchEnd)
  }
})

// Format the adjusted dates to match the expected type (always as strings or Date based on input type)
const formattedChartStart = computed(() => {
  // If the original was a Date object, return Date object
  if (props.chartStart instanceof Date) {
    return adjustedChartStart.value.toDate()
  }
  // Otherwise format as string using the dateFormat
  const format = props.dateFormat || DEFAULT_DATE_FORMAT
  return typeof format === 'string' ? adjustedChartStart.value.format(format) : adjustedChartStart.value.toDate()
})

const formattedChartEnd = computed(() => {
  // If the original was a Date object, return Date object
  if (props.chartEnd instanceof Date) {
    return adjustedChartEnd.value.toDate()
  }
  // Otherwise format as string using the dateFormat
  const format = props.dateFormat || DEFAULT_DATE_FORMAT
  return typeof format === 'string' ? adjustedChartEnd.value.format(format) : adjustedChartEnd.value.toDate()
})

provide(CHART_ROWS_KEY, getChartRows)
provide(CONFIG_KEY, {
  ...toRefs(props),
  precision: effectivePrecision,  // Override precision with auto-calculated value
  chartStart: formattedChartStart,
  chartEnd: formattedChartEnd,
  colors,
  chartSize
})
provide(EMIT_BAR_EVENT_KEY, emitBarEvent)
</script>

<style>
.g-gantt-chart {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  -webkit-touch-callout: none;
  user-select: none;
  font-variant-numeric: tabular-nums;
  border-radius: 5px;
  cursor: grab;
}

.g-gantt-chart.is-dragging {
  cursor: grabbing;
}

.with-column {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.g-gantt-rows-container {
  position: relative;
}

.labels-in-column {
  display: flex;
  flex-direction: row;
}
</style>
