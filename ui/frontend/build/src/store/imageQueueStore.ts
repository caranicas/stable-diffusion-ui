import create from 'zustand';
import produce from 'immer';

import { imageOptions } from './imageCreateStore';

interface ImageDisplayState {
  images : imageOptions[];
  addNewImage: (id:string, imageOptions: imageOptions) => void
  hasQueuedImages: () => boolean;
  firstInQueue: () => imageOptions;
  removeFistInQueue: () => void;
}

// figure out why TS is complaining about this
// @ts-ignore
export const useImageQueue = create<ImageDisplayState>((set, get) => ({
  images: new Array(),
  // use produce to make sure we don't mutate state
  addNewImage: (id: string, imageOptions: any) => {
    set( produce((state) => {
      if (imageOptions.isSeedRandom) {
        imageOptions.seed = Math.floor(Math.random() * 10000);
      }
      state.images.push({ id, options: imageOptions });
    }));
  },
  hasQueuedImages: () => {
    return get().images.length > 0;
  },
  firstInQueue: () => {
    return get().images[0];
  },
  removeFirstInQueue: () => {
    set( produce((state) => {
      state.images.shift();
    }));
  }
}));
  