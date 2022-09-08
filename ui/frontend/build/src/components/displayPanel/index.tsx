import React, {useEffect, useState} from "react";
import { useImageQueue } from "../../store/imageQueueStore";

import { useQueryClient } from '@tanstack/react-query'


import { MakeImageKey } from "../../api";

import CurrentImage from "./currentImage";

import GeneratedImage from "./generatedImage";


type CompletedImagesType = {
  id: string;
  data: string;
}
export default function DisplayPanel() {

  const queryClient = useQueryClient();
  const [completedImages, setCompletedImages] = useState<CompletedImagesType[]>([]);
  const completedIds = useImageQueue((state) => state.completedImageIds);

  useEffect(() => {

    const completedImages = completedIds.map((id) => {
      const imageData = queryClient.getQueryData([MakeImageKey,id])
      return imageData;
    });

    if (completedImages.length > 0) {
      debugger;
    
      // map the completedImagesto a new array 
      // and then set the state
      setCompletedImages(
        //@ts-ignore // figure out how to type this
        completedImages.map((image, index ) => {
          if(void 0 !== image) {
            //@ts-ignore
            return {
              id: completedIds[index],
              data: image.output[0].data,
            };
          }
        }).reverse()
      );

    }
    else {
      setCompletedImages([]);
    }

  },[setCompletedImages, queryClient,  completedIds]);


  return (
    <div className="display-panel">
      <h1>Display Panel</h1>
      <div>
        <CurrentImage />
        {completedImages.map((image, index) => {
          if(index == 0){
            return null;
          }
          if(void 0 !== image) {
            return <GeneratedImage key={image.id} imageData={image.data} />;
          }
          else {
            console.warn('image is undefined', image, index);
            return null;
          }
        })}
      </div>
    
    </div>
  );
};
