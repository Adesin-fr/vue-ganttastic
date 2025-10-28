# Vue Ganttastic

<div style="display: flex; flex-direction: column; align-items:center;">
<img
    src="https://user-images.githubusercontent.com/28678851/148047714-301f07df-4101-48b8-9e47-1f272b290e80.png" 
    style="margin: 10px;" height="150"
    alt="Vue Ganttastic logo"
/>

<b>Vue Ganttastic</b> is a simple, interactive and highly customizable Gantt chart component for Vue 3.

![image](https://user-images.githubusercontent.com/28678851/148191571-76bd8d61-4583-4538-8c59-cc2915494890.png)

</div>

## Features

- **[Vue 3](https://v3.vuejs.org/) support**
- **[TypeScript](https://www.typescriptlang.org/) support** _(ships with out of the box type declarations)_
- **Interactivity** _(dynamic, movable and pushable bars)_
- **Reactivity / Responsiveness** (_when changes occur, bars are repositioned accordingly_)
- **Customization options** (_chart/bar styling, slots, event handlers etc._)
- **🆕 Zoom & Pan** _(mouse wheel to zoom in/out, Ctrl+wheel to pan, drag to navigate)_
- **🆕 Automatic Precision** _(time axis automatically adjusts detail level based on zoom)_
- **🆕 Date Object Support** _(accepts both Date objects and formatted strings)_

Using Vue 2? Check out [Vue-Ganttastic v1](https://github.com/zunnzunn/vue-ganttastic/tree/vue-ganttastic-v1).

## Guide and Docs

For further guides and references, check out the [official docs](https://zunnzunn.github.io/vue-ganttastic/getting-started.html).

## Quickstart

Install using

```
npm install @infectoone/vue-ganttastic
```

Then, initalize the plugin in the starting point of your app (most likely src/main.js):

```js
import { createApp } from "vue"
import App from "./App.vue"
...
import ganttastic from '@infectoone/vue-ganttastic'
...
createApp(App)
  .use(ganttastic)
  .mount('#app')
```

This will globally register the components g-gantt-chart and g-gantt-row and you will be able to use those two components right away.

```html
<template>
  <g-gantt-chart
    chart-start="2021-07-12 12:00"
    chart-end="2021-07-14 12:00"
    precision="hour"
    bar-start="myBeginDate"
    bar-end="myEndDate"
  >
    <g-gantt-row label="My row 1" :bars="row1BarList" />
    <g-gantt-row label="My row 2" :bars="row2BarList" />

    <!-- Alternatively, you can use g-gantt-bar components directly inside g-gantt-row -->
    <g-gantt-row label="My row 3">
      <g-gantt-bar :bar="singleBar" />
    </g-gantt-row>
  </g-gantt-chart>
</template>

<script setup>
  import { ref } from "vue"

  const row1BarList = ref([
    {
      myBeginDate: "2021-07-13 13:00",
      myEndDate: "2021-07-13 19:00",
      id: "unique-id-1", // each bar must have a unique "id" property
      label: "Lorem ipsum dolor"
    }
  ])
  const row2BarList = ref([
    {
      myBeginDate: "2021-07-13 00:00",
      myEndDate: "2021-07-14 02:00",
      // ganttBarConfig object is not needed anymore : id and label are now picked directly on objects...
      id: "another-unique-id-2",
      hasHandles: true,
      label: "Hey, look at me",
      style: {
        // arbitrary CSS styling for your bar
        background: "#e09b69",
        borderRadius: "20px",
        color: "black"
      },
      class: "foo" // you can also add CSS classes to your bars!
    }
  ])

  const singleBar = ref({
    myBeginDate: "2021-07-13 10:00",
    myEndDate: "2021-07-13 15:00",
    id: "unique-id-3",
    label: "Direct bar usage"
  })
</script>
```

## New Features

### ✨ Simplified Bar Configuration

**Important:** The `ganttBarConfig` object is no longer needed! You can now define bar properties directly on the bar object:

```js
// ✅ New simplified format (recommended)
const bars = ref([
  {
    myBeginDate: "2021-07-13 13:00",
    myEndDate: "2021-07-13 19:00",
    id: "unique-id-1",
    label: "My task",
    hasHandles: true,
    style: { background: "#e09b69" },
    class: "my-custom-class"
  }
])

// ❌ Old format (deprecated, but still supported)
const bars = ref([
  {
    myBeginDate: "2021-07-13 13:00",
    myEndDate: "2021-07-13 19:00",
    ganttBarConfig: {
      id: "unique-id-1",
      label: "My task",
      // ...
    }
  }
])
```

Properties like `id`, `label`, `hasHandles`, `style`, `class`, `html`, `bundle`, and `immobile` can all be set directly on the bar object.

### 🎯 Zoom & Pan

Navigate through your Gantt chart intuitively with both mouse and touch controls:

#### Desktop (Mouse & Trackpad)
- **Zoom In/Out**: Use the mouse wheel to zoom in (show less time) or zoom out (show more time)
  - Zooming is centered on your mouse cursor position
  - Supports 20x zoom out (0.05x) to 10x zoom in

- **Pan with Ctrl+Wheel**: Hold `Ctrl` (or `Cmd` on Mac) and scroll to move through time horizontally

- **Drag to Pan**: Click and drag on empty areas of the chart (timeaxis, background) to pan
  - The cursor changes to a grab hand when you can drag
  - Bar dragging remains fully functional - drag functionality is context-aware

#### Mobile & Touch Devices
- **Pinch to Zoom**: Use two fingers to pinch in (zoom out) or pinch out (zoom in)
  - Works just like zooming on maps
  - Simultaneous panning while pinching is supported

- **Two-Finger Pan**: Drag with two fingers to pan horizontally through the timeline

- **Single-Finger Pan**: Drag with one finger on empty areas to pan through time
  - Bar dragging on touch devices remains fully functional

### 🔄 Automatic Precision Switching

The time axis automatically adjusts its granularity based on the visible time range:

- **< 1 day visible**: Shows **hourly** precision
- **1-60 days visible**: Shows **daily** precision
- **60-365 days visible**: Shows **weekly** precision
- **> 365 days visible**: Shows **monthly** precision

This provides the optimal level of detail at any zoom level, similar to how maps adjust labels when zooming.

### 📅 Date Object Support

The `chartStart` and `chartEnd` props now accept both Date objects and formatted strings:

```js
// Using Date objects (recommended for dynamic dates)
const chartStart = new Date('2024-01-01')
const chartEnd = new Date('2024-12-31')

// Or using formatted strings (as before)
const chartStart = '01.01.2024 00:00'
const chartEnd = '31.12.2024 23:59'
```

The component automatically detects the type and handles conversions internally. All zoom, pan, and date range calculations work seamlessly with both formats.

### 📊 Flexible Bar Usage

You can now use bars in two ways:

1. **Via `:bars` prop** (original method):
```html
<g-gantt-row label="My row" :bars="barList" />
```

2. **Directly as child components** (new method):
```html
<g-gantt-row label="My row">
  <g-gantt-bar :bar="bar1" />
  <g-gantt-bar :bar="bar2" />
</g-gantt-row>
```

Both methods work identically and can even be mixed within the same chart.

## Contributing

Clone the project, make some changes, test your changes out, create a pull request with a short summary of what changes you made. Contributing is warmly welcomed!

To test your changes out before creating a pull request, create a build:

```
npm run build
```

To test out the build, you should create a tarball using:

```
npm pack
```

Then, place the tarball in some other test project and install the package from the tarball by using:

```
npm install <name_of_the_package>.tgz
```


## About

**License** [MIT](https://choosealicense.com/licenses/mit/)  
**Author**: Marko Žunić, BSc  
[GitHub Repository](https://github.com/zunnzunn/vue-ganttastic)

## Support the project!

In case you found the library useful, a little tip would be much appreciated!

<form action="https://www.paypal.com/donate" method="post" target="_top">
<input type="hidden" name="hosted_button_id" value="M63C8DAMV5YDJ" />
<input type="image" src="https://pics.paypal.com/00/s/MTdhMWZmNTUtOWQ1Yi00YmRjLWJjMjgtY2Y0NTNhODM0OTJl/file.PNG" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" style="max-width:200px"/>
<img alt="" border="0" src="https://www.paypal.com/en_AT/i/scr/pixel.gif" width="1" height="1" />
</form>

BTC address:  
![image](https://user-images.githubusercontent.com/28678851/233090745-a0a6d8a4-6df6-4b82-ac0c-90e69551786e.png)

## Screenshots

![image](https://user-images.githubusercontent.com/28678851/148191571-76bd8d61-4583-4538-8c59-cc2915494890.png)

![image](https://user-images.githubusercontent.com/28678851/148191529-b50c0d17-bcc1-4a78-9d2c-ff2a36b03f52.png)

![image](https://user-images.githubusercontent.com/28678851/148191757-a2520dce-aeed-43df-87b2-3a64e225f9e7.png)
