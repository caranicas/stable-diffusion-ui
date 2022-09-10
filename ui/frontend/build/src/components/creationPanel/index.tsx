import React, { ChangeEvent } from "react";

import MakeButton from "./makeButton";
import AdvancedSettings from "./advancedSettings";
import ImageModifiers from "./imageModifiers";

import ModifierTag from "./modierTag";

import { useImageCreate } from "../../store/imageCreateStore";

import './creationPanel.css';

export default function CreationPanel() {

  const promptText = useImageCreate((state) => state.getValueForRequestKey("prompt"));
  const setRequestOption = useImageCreate((state) => state.setRequestOptions);
  const selectedtags = useImageCreate((state) => state.selectedTags());

  const handlePromptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setRequestOption("prompt", event.target.value);
  };

  return (
    <div className="create-panel">
      <div className="basic-create">
        <div className="prompt">
          <p>Prompt </p>
          <textarea value={promptText} onChange={handlePromptChange}></textarea>
        </div>

        <div className="seed-image">
          <p>Seed Image</p>
          <input type="file" accept="image/*" />
        </div>

        <MakeButton></MakeButton>
        <div className="selected-tags">
          <p>Active Tags</p>
          <ul>
            {selectedtags.map((tag) => (
              <li key={tag}>
                <ModifierTag name={tag}></ModifierTag>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="advanced-create">
        <AdvancedSettings></AdvancedSettings>
        <ImageModifiers></ImageModifiers>
      </div>
    </div>
  );
}
