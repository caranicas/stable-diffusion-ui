/**
 * basic server health
 */

import type {imageOptions} from '../store/imageCreateStore.ts'

const API_URL = import.meta.env.DEV ? 'http://localhost:9000' : ''

export const HEALTH_PING_INTERVAL = 5000; // 5 seconds
export const healthPing = async () => {
  let response = await fetch(`${API_URL}/ping`)
  const data = await response.json();
  return data;
}

/**
 * the local list of modifications
 */
export const loadModifications = async () => {
  const response = await fetch(`${API_URL}/modifiers.json`)
  const data = await response.text();
  return data;
}

/**
 * post a new quest for an image
 */

export const doMakeImage = async (reqBody: imageOptions) => {

  debugger;
  const res = await fetch(`${API_URL}/image`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  });

  const data = await res.json();
  return data;
}


// export const makeImageFrom = () => {
//   return doMakeImage
// }