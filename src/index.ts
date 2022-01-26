import { onMount, onCleanup, createSignal, createEffect } from 'solid-js';
import KeenSlider, {
  KeenSliderHooks,
  KeenSliderInstance,
  KeenSliderOptions,
  KeenSliderPlugin,
} from 'keen-slider';

const createSlider = <
  T extends HTMLElement,
  O = {},
  P = {},
  H extends string = KeenSliderHooks
>(
  options?: KeenSliderOptions<O, P, H>,
  plugins?: KeenSliderPlugin<O, P, H>[]
): [
  (el: HTMLElement) => void,
  () => KeenSliderInstance<O, P, H> | undefined
] => {
  let slider: KeenSliderInstance<O, P, H> | undefined;
  let currentOptions: KeenSliderOptions<O, P, H> | undefined = options;
  let [sliderSignal, setSliderSignal] = createSignal<KeenSliderInstance<O, P, H> | undefined>();

  const destroy = () => slider && slider.destroy();

  const create = (el: HTMLElement) => {
    el.classList.add("keen-slider");
    onMount(() => {
      slider = new KeenSlider<O, P, H>(el, currentOptions, plugins);
      // @ts-ignore
      setSliderSignal(slider);
    });
    onCleanup(destroy);
    createEffect(() => {
      if (slider)
      {
        slider.update(currentOptions)
      }
  })
  };

  return [
    create,
    sliderSignal
  ];
};

export default createSlider;
