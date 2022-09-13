import React, {useEffect, useState} from "react";
import { useImageQueue } from "../../store/imageQueueStore";

import { ImageRequest } from '../../store/imageCreateStore';

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

    const testReq = {} as ImageRequest;
    const completedQueries = completedIds.map((id) => {
      const imageData = queryClient.getQueryData([MakeImageKey,id])
      return imageData;
    });

    console.log('completedQueries', completedQueries);

    if (completedQueries.length > 0) {
      // map the completedImagesto a new array 
      // and then set the state
      const temp = completedQueries.map((query, index ) => {
        // debugger;
        if(void 0 !== query) {
          return query.output.map((data)=>{
            return {id: `${completedIds[index]}-${data.seed}`, data: data.data}
          })
        }
        
      }).flat().reverse();
      setCompletedImages(temp);
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
