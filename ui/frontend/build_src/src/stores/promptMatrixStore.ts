import create from "zustand";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

import { ImageRequest } from "../api/api";

import { promptTag } from "./store.d";


export enum QueueStatus {
  pending = "pending",
  processing = "processing",
  complete = "complete",
  paused = "paused",
  error = "error",
}

export interface QueuedPrompt {
  queueId: string;
  options: promptTag[];
}

interface PromptMatixState {

  shouldClearOnAdd: boolean;
  shouldClearOnCreate: boolean;
  potentialTags: string;
  promptsList: QueuedPrompt[];
  setPotentialTags: (tags: string) => void;
  generateTags: (isPositive: boolean) => void;
  pendingPrompts: () => QueuedPrompt[];
  hasPendingQueue: () => boolean;
  hasAnyQueue: () => boolean;
  firstInQueue: () => QueuedPrompt;
  updateStatus: (queueId: string, status: QueueStatus[keyof QueueStatus]) => void; removeItem: (queueId: string) => void;
  removeCompleted: () => void;
  clearQueue: () => void;
}

export const usePromptMatrix = create<PromptMatixState>((set, get) => ({
  shouldClearOnAdd: true,
  shouldClearOnCreate: true,
  potentialTags: '',

  promptsList: [],

  setPotentialTags: (tags: string) => {
    set({ potentialTags: tags });
  },

  generateTags: (isPositive: boolean) => {
    set(
      produce((state) => {
        const tags = state.potentialTags.split(',');
        const tagList: promptTag[] = [];
        tags.forEach((tag) => {
          tagList.push({ id: uuidv4(), name: tag, type: isPositive ? 'positive' : 'negative' });
        });
        state.promptsList.push({ queueId: uuidv4(), options: tagList });
      })
    );

    if (get().shouldClearOnAdd) {
      set({ potentialTags: '' });
    }

  },

  pendingPrompts: () => {
    return get().prompts.filter((item) => item.status === QueueStatus.pending);
  },

  hasPendingQueue: () => {
    return get().pendingPrompts().length > 0;
  },

  hasAnyQueue: () => {
    return get().prompts.length > 0;
  },

  firstInQueue: () => {
    const pending = get().pendingPrompts()[0];

    if (pending === undefined) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const temp: QueuedPrompt = { queueId: "", options: ({} as ImageRequest), status: QueueStatus.pending };
      return temp;
    }
    return pending;
  },

  updateStatus: (queueId: string, status: QueueStatus[keyof QueueStatus]) => {
    set(
      produce((state) => {
        const item = state.prompts.find((item: QueuedPrompt) => item.queueId === queueId);
        if (void 0 !== item) {
          item.status = status;
        }
      })
    );
  },

  removeItem: (queueId: string) => {
    set(
      produce((state) => {
        const index = state.prompts.findIndex((item: QueuedPrompt) => item.queueId === queueId);
        if (index > -1) {
          state.prompts.splice(index, 1);
        }
      })
    );
  },

  removeCompleted: () => {
    set(
      produce((state) => {
        const completed = state.prompts.filter((item: QueuedPrompt) => item.status === QueueStatus.complete);
        completed.forEach((item: QueuedPrompt) => {
          const index = state.prompts.indexOf(item);
          state.prompts.splice(index, 1);
        });
      })
    );
  },

  clearQueue: () => {
    set(
      produce((state) => {
        state.prompts = [];
      })
    );
  },

}));
