import type { GanttBarObject } from "../types"
import provideConfig from "../provider/provideConfig.js"
import provideGetChartRows from "../provider/provideGetChartRows.js"

export default function useBarDragLimit() {
  const { pushOnOverlap } = provideConfig()
  const getChartRows = provideGetChartRows()

  const getBarsFromBundle = (bundle?: string) => {
    const res: GanttBarObject[] = []
    if (bundle != null) {
      getChartRows().forEach((row) => {
        row.bars.forEach((bar) => {
          if (bar.bundle === bundle) {
            res.push(bar)
          }
        })
      })
    }
    return res
  }

  const setDragLimitsOfGanttBar = (bar: GanttBarObject) => {
    if (!pushOnOverlap.value || bar.pushOnOverlap === false) {
      return
    }
    for (const sideValue of ["left", "right"]) {
      const side = sideValue as "left" | "right"
      const { gapDistanceSoFar, bundleBarsAndGapDist } = countGapDistanceToNextImmobileBar(
        bar,
        0,
        side
      )
      let totalGapDistance = gapDistanceSoFar
      const bundleBarsOnPath = bundleBarsAndGapDist
      if (!bundleBarsOnPath) {
        continue
      }

      for (let i = 0; i < bundleBarsOnPath.length; i++) {
        const barFromBundle = bundleBarsOnPath[i].bar
        const gapDist = bundleBarsOnPath[i].gapDistance
        const otherBarsFromBundle = getBarsFromBundle(barFromBundle.bundle).filter(
          (otherBar) => otherBar !== barFromBundle
        )
        otherBarsFromBundle.forEach((otherBar) => {
          const nextGapDistanceAndBars = countGapDistanceToNextImmobileBar(otherBar, gapDist, side)
          const newGapDistance = nextGapDistanceAndBars.gapDistanceSoFar
          const newBundleBars = nextGapDistanceAndBars.bundleBarsAndGapDist
          if (newGapDistance != null && (!totalGapDistance || newGapDistance < totalGapDistance)) {
            totalGapDistance = newGapDistance
          }
          newBundleBars.forEach((newBundleBar) => {
            if (!bundleBarsOnPath.find((barAndGap) => barAndGap.bar === newBundleBar.bar)) {
              bundleBarsOnPath.push(newBundleBar)
            }
          })
        })
      }
      const barElem = document.getElementById(bar.id) as HTMLElement
      if (totalGapDistance != null && side === "left") {
        bar.dragLimitLeft = barElem.offsetLeft - totalGapDistance
      } else if (totalGapDistance != null && side === "right") {
        bar.dragLimitRight =
          barElem.offsetLeft + barElem.offsetWidth + totalGapDistance
      }
    }
    // all bars from the bundle of the clicked bar need to have the same drag limit:
    const barsFromBundleOfClickedBar = getBarsFromBundle(bar.bundle)
    barsFromBundleOfClickedBar.forEach((barFromBundle) => {
      barFromBundle.dragLimitLeft = bar.dragLimitLeft
      barFromBundle.dragLimitRight = bar.dragLimitRight
    })
  }

  // returns the gap distance to the next immobile bar
  // in the row where the given bar (parameter) is (added to gapDistanceSoFar)
  // and a list of all bars on that path that belong to a bundle
  const countGapDistanceToNextImmobileBar = (
    bar: GanttBarObject,
    gapDistanceSoFar = 0,
    side: "left" | "right"
  ) => {
    const bundleBarsAndGapDist = bar.bundle
      ? [{ bar, gapDistance: gapDistanceSoFar }]
      : []
    let currentBar = bar
    let nextBar = getNextGanttBar(currentBar, side)
    // left side:
    if (side === "left") {
      while (nextBar) {
        const currentBarElem = document.getElementById(currentBar.id) as HTMLElement
        const nextBarElem = document.getElementById(nextBar.id) as HTMLElement
        const nextBarOffsetRight = nextBarElem.offsetLeft + nextBarElem.offsetWidth
        gapDistanceSoFar += currentBarElem.offsetLeft - nextBarOffsetRight
        if (nextBar.immobile) {
          return { gapDistanceSoFar, bundleBarsAndGapDist }
        } else if (nextBar.bundle) {
          bundleBarsAndGapDist.push({
            bar: nextBar,
            gapDistance: gapDistanceSoFar
          })
        }
        currentBar = nextBar
        nextBar = getNextGanttBar(nextBar, "left")
      }
    }
    if (side === "right") {
      while (nextBar) {
        const currentBarElem = document.getElementById(currentBar.id) as HTMLElement
        const nextBarElem = document.getElementById(nextBar.id) as HTMLElement
        const currentBarOffsetRight = currentBarElem.offsetLeft + currentBarElem.offsetWidth
        gapDistanceSoFar += nextBarElem.offsetLeft - currentBarOffsetRight
        if (nextBar.immobile) {
          return { gapDistanceSoFar, bundleBarsAndGapDist }
        } else if (nextBar.bundle) {
          bundleBarsAndGapDist.push({
            bar: nextBar,
            gapDistance: gapDistanceSoFar
          })
        }
        currentBar = nextBar
        nextBar = getNextGanttBar(nextBar, "right")
      }
    }
    return { gapDistanceSoFar: null, bundleBarsAndGapDist }
  }

  const getNextGanttBar = (bar: GanttBarObject, side: "left" | "right") => {
    const barElem = document.getElementById(bar.id) as HTMLElement
    const allBarsInRow = getChartRows().find((row) => row.bars.includes(bar))?.bars ?? []
    let allBarsLeftOrRight = []
    if (side === "left") {
      allBarsLeftOrRight = allBarsInRow.filter((otherBar) => {
        const otherBarElem = document.getElementById(otherBar.id) as HTMLElement
        return (
          otherBarElem &&
          otherBarElem.offsetLeft < barElem.offsetLeft &&
          otherBar.pushOnOverlap !== false
        )
      })
    } else {
      allBarsLeftOrRight = allBarsInRow.filter((otherBar) => {
        const otherBarElem = document.getElementById(otherBar.id) as HTMLElement
        return (
          otherBarElem &&
          otherBarElem.offsetLeft > barElem.offsetLeft &&
          otherBar.pushOnOverlap !== false
        )
      })
    }
    if (allBarsLeftOrRight.length > 0) {
      return allBarsLeftOrRight.reduce((bar1, bar2) => {
        const bar1Elem = document.getElementById(bar1.id) as HTMLElement
        const bar2Elem = document.getElementById(bar2.id) as HTMLElement
        const bar1Dist = Math.abs(bar1Elem.offsetLeft - barElem.offsetLeft)
        const bar2Dist = Math.abs(bar2Elem.offsetLeft - barElem.offsetLeft)
        return bar1Dist < bar2Dist ? bar1 : bar2
      }, allBarsLeftOrRight[0])
    } else {
      return null
    }
  }

  return {
    setDragLimitsOfGanttBar
  }
}
