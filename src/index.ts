import { onMount, onCleanup, createSignal } from "solid-js";
import KeenSlider, { KeenSliderInstance, KeenSliderPlugin, KeenSliderOptions, TrackDetails } from 'keen-slider';

export type SliderOptions = KeenSliderOptions;
export type SliderDetails = TrackDetails;

// declare module "solid-js" {
//   namespace JSX {
//     // interface HTMLAttributes<T> extends HTMLAttributes<T> {
//     //   ["use:slider"]?: {};
//     // }
//   }
// }

/**
 * Creates a slider powered by KeenSlider.
 *
 * @returns {Array} An array of useful utilities
 * @returns [create] Register and creation function to call on setup
 * @returns [current] Current slide number
 * @returns [next] Function to trigger the next slide
 * @returns [prev] Function to trigger the previous slide
 * @returns [moveTo] Allow you to change the slider to a specific slide
 * @returns [refresh] Refresh trigger
 * @returns [details] Retrieve a list of SliderDetails
 * @returns [slider] Gain access to the slider itself
 * @returns [destroy] Destroy the entire slider (this is automatically handled)
 *
 * @example
 * ```ts
 * const [create] = createSlider();
 * <div use:slider>...</div>
 * ```
 * @param options
 * @param plugins
 */

export type IAnimationSlide = { duration?: number, easing?: (t: number) => number };

const createSlider = (
  options: SliderOptions = {},
  plugins: KeenSliderPlugin
): [
  (el: HTMLElement) => void,
  {
    current: () => number;
    next: () => void;
    prev: () => void;
    moveToIdx: (idx: number, absolute?: boolean, animation?: IAnimationSlide) => void;
    // resize: () => void;
    // refresh: () => void;
    details: () => SliderDetails;
    slider: () => KeenSliderInstance;
    destroy: () => void;
  }
] => {
  let slider: KeenSliderInstance;
  const [current, setCurrent] = createSignal(0);
  const destroy = () => slider && slider.destroy();
  const create = (el: HTMLElement) => {
    let opts = { ...options };
    // @ts-ignore
    opts.slides = el.childNodes;
    opts.slideChanged = instance => {
      options.slideChanged && options.slideChanged(instance);
      setCurrent(instance.track.details.rel);
    };
    el.classList.add("keen-slider");
    // @ts-ignore
    onMount(() => (slider = new KeenSlider(el, opts, plugins)));
    onCleanup(destroy);
  };
  return [
    create,
    {
      current,
      next: () => slider.next(),
      prev: () => slider.prev(),
      moveToIdx: (idx: number, absolute = false, animation: IAnimationSlide = { duration: 250 }) => slider.moveToIdx(idx, absolute, animation),
      // resize: () => slider.resize(),
      // refresh: () => slider.refresh(),
      details: () => slider.track.details,
      slider: () => slider,
      destroy
    }
  ];
};

export default createSlider;
