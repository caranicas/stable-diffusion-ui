import React, {useEffect, useState}from "react";

import { useImageCreate } from "../../../store/imageCreateStore";
// import { useImageDisplay } from "../../../store/imageDisplayStore";
import { useImageQueue } from "../../../store/imageQueueStore"; 
// import { doMakeImage } from "../../../api"; 
import {v4 as uuidv4} from 'uuid';

export default function MakeButton() {

  const imageOptions = useImageCreate((state) => state.imageOptions);
  const addNewImage = useImageQueue((state) => state.addNewImage);
  
  const makeImage = () => {
    addNewImage(uuidv4(), imageOptions)
  };
  
  return (
     <button onClick={makeImage}>Make</button>
  );
}