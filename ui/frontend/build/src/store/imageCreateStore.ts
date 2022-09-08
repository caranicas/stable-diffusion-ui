import create from 'zustand';
import produce from 'immer';
import { devtools } from 'zustand/middleware'

export type ImageCreationUiOptions = {
  advancedSettingsIsOpen: boolean;
}

export type imageOptions = {
  // id: number;
  prompt: string;
  imgSrc: string;
  seed: number;
  isSeedRandom: boolean;
  numberOfImages: number;
  parallelRequests: number;
  width: number;
  height: number;
  stepCount: number;
  guidence: number;
  promptStrength: number;
  autoSave: boolean;
  diskPath: string;
  soundOnComplete: boolean;
  useTurboMode: boolean;
  useCPU: boolean;
  useFullPrecision: boolean;
}

interface ImageCreateState {
  imageOptions: imageOptions;
  setPrompt: (prompt: string) => void;
  setImageOptions: (imageOptions: Partial<imageOptions>) => void;

  uiOptions: ImageCreationUiOptions;
  toggleAdvancedSettingsIsOpen: () => void;
}

// devtools breaks TS
// @ts-ignore
export const useImageCreate = create<ImageCreateState>(devtools((set) => ({
  imageOptions: {
    prompt: 'a photograph of an astronaut riding a horse',
    imgSrc: '',
    seed: 0,
    isSeedRandom: true,
    numberOfImages: 1,
    parallelRequests: 1,
    width: 512,
    height: 512,
    stepCount:50,
    guidence: 75,
    promptStrength: 8,
    autoSave: false,
    diskPath: '',
    soundOnComplete: false,
    useTurboMode: false,
    useCPU: false,
    useFullPrecision: false,
  },
  // use produce to make sure we don't mutate state
  setPrompt: (prompt: string) => {
    set( produce((state) => {
      state.imageOptions.prompt = prompt
    }))
  },
  setImageOptions: (imageOptions: Partial<imageOptions>) => {
    set( produce((state) => {
      state.imageOptions = {
        ...state.imageOptions,
        ...imageOptions
      }
    }))
  },

  uiOptions: {
    // TODO proper persistence of all UI / user settings centrally somewhere?
    advancedSettingsIsOpen: localStorage.getItem('ui:advancedSettingsIsOpen') === 'true',
  },
  toggleAdvancedSettingsIsOpen: () => {
    set( produce((state) => {
      state.uiOptions.advancedSettingsIsOpen = !state.uiOptions.advancedSettingsIsOpen;
      localStorage.setItem('ui:advancedSettingsIsOpen', state.uiOptions.advancedSettingsIsOpen);
    }))
  },

})))


