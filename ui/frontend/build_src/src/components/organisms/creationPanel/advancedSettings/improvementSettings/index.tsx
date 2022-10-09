import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useImageCreate } from "../../../../../stores/imageCreateStore";
import { useCreateUI } from "../../creationPanelUIStore";

import { Disclosure } from '@headlessui/react'
import Checkbox from "../../../../atoms/headlessCheckbox";
import UpscaleOptions from "./upscaleOptions";

import {
  SettingItem,
} from "../../../../../styles/shared.css";
import {
  buttonStyle,
} from "../../../../_recipes/button.css";


export default function ImprovementSettings() {
  const { t } = useTranslation();

  // creation state
  const isUsingFaceCorrection = useImageCreate((state) => state.isUsingFaceCorrection());
  const isUsingUpscaling = useImageCreate((state) => state.isUsingUpscaling());
  const filteredOnly = useImageCreate((state) => state.getValueForRequestKey("show_only_filtered_image"));
  const toggleUseFaceCorrection = useImageCreate((state) => state.toggleUseFaceCorrection);
  const setRequestOption = useImageCreate((state) => state.setRequestOptions);

  // UI STATE
  const improvementOpen = useCreateUI((state) => state.isOpenAdvImprovementSettings);
  const setAdvImprovementIsOpen = useCreateUI((state) => state.setAdvImprovementIsOpen);

  // local state
  const [isFilteringDisabled, setIsFilteringDisabled] = useState(false);
  // should probably be a store selector
  useEffect(() => {
    // if either are true we arent disabled
    if (isUsingFaceCorrection || isUsingUpscaling) {
      setIsFilteringDisabled(false);
    } else {
      setIsFilteringDisabled(true);
    }
  }, [isUsingFaceCorrection, isUsingUpscaling, setIsFilteringDisabled]);


  useEffect(() => {
    console.log(' USE EFFECT improvementOpen', improvementOpen);
  }, [improvementOpen]);

  return (
    <Disclosure defaultOpen={improvementOpen}>
      {({ open }) => {
        setAdvImprovementIsOpen(open);
        return (
          <>
            <Disclosure.Button className={buttonStyle({
              type: 'action',
              color: 'accent',
            })}
            >
              Improvement Settings
            </Disclosure.Button>
            <Disclosure.Panel>
              <div className={SettingItem}>
                <Checkbox
                  label="Face Fixes (uses GFPGAN)"
                  isChecked={isUsingFaceCorrection}
                  toggleCheck={toggleUseFaceCorrection}
                ></Checkbox>
              </div>
              <div className={SettingItem}>
                <UpscaleOptions></UpscaleOptions>
              </div>
              <div className={SettingItem}>
                <Checkbox
                  disabled={isFilteringDisabled}
                  label={t("settings.corrected")}
                  isChecked={filteredOnly}
                  toggleCheck={(value) => {
                    setRequestOption("show_only_filtered_image", value)
                  }}
                ></Checkbox>
              </div>
            </Disclosure.Panel>
          </>
        )
      }
      }
    </Disclosure >
  );
}
