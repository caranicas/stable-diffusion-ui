import React from "react";

import MakeButton from "./makeButton";
import AdvancedSettings from './advancedSettings';
import ImageModifiers from './imageModifiers';

export default function CreationPanel() {
  return (
    <div className="create-panel">
      <div className="basic-create">
        <div className="prompt">
          <p>Prompt </p>
          <textarea></textarea>
        </div>

        <div className="seed-image">
          <p>Seed Image</p>
          <input type="file" accept="image/*" />
        </div>

        <MakeButton></MakeButton>
      </div>

      <div className="advanced-create">
        <AdvancedSettings></AdvancedSettings>
        <ImageModifiers></ImageModifiers>
      </div>
    </div>
  );
}