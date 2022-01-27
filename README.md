# <img width="27px" src="https://github.com/solidjs/solid-site/raw/master/src/assets/logo.png" alt="Solid logo"> &nbsp;Solid Slider

A carousel/slider implementation in TypeScript for Solid using KeenSlider. keen-slider is a free library agnostic touch slider with native touch/swipe behavior and great performance. It comes with no dependencies, typescript support, multitouch support and is compatible with all common browsers.

## Installation

```bash
npm install @digichanges/solid-slider --save
yarn add @digichanges/solid-slider ## or in yarn
```

Add as a module:

```ts
import "@digichanges/solid-slider/dist/slider.css";
import createSlider from "@digichanges/solid-slider";
```

## Demo

Here I add two examples.

The first one is very simple while the second one makes use of the second parameter to add plugins to it, in this case the code is exactly the same as in the keen slider documentation. In addition, there is also the example of the dot that the only difference to the example of keen slider is that we use signal, that is why the syntax is different.


Example 1: https://codesandbox.io/s/solid-slider-example1-bsuiz

Example 2: https://codesandbox.io/s/solid-slider-forked-0l9oz

## Example

The following is an example of how to create and then bind options using a directive.

Currently, keen slider since version 6 forces you to add keen-slider__slide in the html class. If we don't add this class it doesn't work.

```ts
const MySliderComponent = () => {
  const options = { loop: true };
  
  const [createSlide, sliderSignal] = createSlider(options);
  
  return (
    <div use:createSlide>
      <div class="keen-slider__slide">Slide 1</div>
      <div class="keen-slider__slide">Slide 2</div>
      <div class="keen-slider__slide">Slide 3</div>
    </div>
  );
};
```

## Changelog

- 1.0.0 - Initial release

## Keen Options API

You can set options to the slider via parameters. Note that there are other hooks available as well. Only a subset of useful methods are exposed via the primitive although you can access the slider instance as well from the exports to use the methods directly.

- [Options](https://keen-slider.io/docs#options)
- [Event Hooks](https://keen-slider.io/docs#event-hooks)
- [Methods](https://keen-slider.io/docs#methods--properties)
