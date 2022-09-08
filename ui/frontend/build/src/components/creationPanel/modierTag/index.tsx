import React from "react";
import { useImageCreate } from "../../../store/imageCreateStore";


type ModifierTagProps = {
  name: string;
}

export default function ModifierTag({name}: ModifierTagProps) {

  const hasTag = useImageCreate((state) => state.hasTag(name)) ? "selected" : "";
  const toggleTag = useImageCreate((state) => state.toggleTag);

  console.log('has tag', hasTag)

  const _toggleTag = () => {
    toggleTag(name);
  };

  return (
    <div className={"modifierTag " + hasTag} onClick={_toggleTag}>
      <p>{name}</p>
    </div>
  );
}