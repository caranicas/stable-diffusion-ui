/**
 * basic server health
 */

import type {imageOptions} from '../store/imageCreateStore';

// when we are on dev we want to specifiy 9000 as the port for the backend
// when we are on prod we want be realtive to the current url
const API_URL = import.meta.env.DEV ? 'http://localhost:9000' : '';


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
  const data = await response.json();
  return data;
}

/**
 * post a new request for an image
 */

export const doMakeImage = async (reqBody: imageOptions) => {

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