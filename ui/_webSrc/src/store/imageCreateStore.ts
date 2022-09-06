import create from 'zustand';
import produce from 'immer'

export type imageOptions = {
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
  soundOnComplete: boolean;
  useTurboMode: boolean;
  useCPU: boolean;
  useFullPrecision: boolean;
}

interface ImageCreateState {
  imageOptions: imageOptions;
  setPrompt: (prompt: string) => void
}

export const useImageCreate = create<ImageCreateState>((set) => ({
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
    guidence: 7.5,
    promptStrength: 0.8,
    autoSave: false,
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

}))


