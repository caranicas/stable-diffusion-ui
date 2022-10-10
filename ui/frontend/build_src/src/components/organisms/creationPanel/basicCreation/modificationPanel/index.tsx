import React, { useState, KeyboardEventHandler, Fragment } from "react";
import { Switch } from '@headlessui/react'

import { useImageCreate } from "../../../../../stores/imageCreateStore";
import { v4 as uuidv4 } from "uuid";
import PromptTag from "../../../../molecules/promptTag";

import ActiveTags from "../promptCreator/activeTags";


import MatrixList from "./matrixList";
import {
  IconFont,
} from "../../../../../styles/shared.css";

import {
  ToggleGroupMain,
  ToggleMain,
  TogglePill,
  inputRow,
  prmptBtn,
} from "../promptCreator/promptCreator.css";

import {
  buttonStyle,
} from "../../../../_recipes/button.css";

interface TagTypeProps {
  positive: boolean;
  setPositive: (positive: boolean) => void;
};

function TagTypeToggle({ positive, setPositive }: TagTypeProps) {
  return (
    <Switch.Group as={Fragment}>
      <div className={ToggleGroupMain}>
        <Switch.Label> Type </Switch.Label>
        <Switch className={ToggleMain} checked={positive} onChange={setPositive}>
          <span
            className={TogglePill}
          >
            {positive
              ? <i className={[IconFont, 'fa-solid', 'fa-plus'].join(" ")}></i>
              : <i className={[IconFont, 'fa-solid', 'fa-minus'].join(" ")}></i>}
          </span>
        </Switch>
      </div>
    </Switch.Group>
  );
}

export default function ModificationPanel() {

  // const createTags = useImageCreate((state) => state.createTags);
  const [tagText, setTagText] = useState('');
  const [positive, setPositive] = useState(true)
  const addCreateTag = useImageCreate((state) => state.addCreateTag);

  const enterPrompt = () => {
    if (tagText !== '') {
      const type = positive ? "positive" : "negative";
      tagText.split(',').map((tag) => tag.trim()).forEach((tag) => {
        addCreateTag({ id: uuidv4(), name: tag, type });
      });
      setTagText('');
    }
  }

  const checkForEnter = (event: KeyboardEventHandler<HTMLInputElement>) => {
    // @ts-expect-error
    if (event.key === "Enter") {
      if (tagText !== '') {
        const type = positive ? "positive" : "negative";
        tagText.split(',').map((tag) => tag.trim()).forEach((tag) => {
          addCreateTag({ id: uuidv4(), name: tag, type });
        });
        setTagText('');
      }
    }
  };

  return (
    <div>
      <div className=''>
        <span>
          <label> modifiers</label>
          {/* @ts-expect-error */}
          <input value={tagText} onKeyDown={checkForEnter} onChange={(event) => {
            setTagText(event.target.value);
          }}></input>
        </span>
        {/* <TagTypeToggle positive={positive} setPositive={setPositive}></TagTypeToggle> */}

        <button
          className={[buttonStyle({
            color: 'secondary',
            size: 'large',
          })].join(" ")}
          onClick={enterPrompt}
        >
          Add Modification
        </button>
      </div>

      <div>
        <MatrixList></MatrixList>
      </div>

      <ActiveTags></ActiveTags>

    </div>
  );
}