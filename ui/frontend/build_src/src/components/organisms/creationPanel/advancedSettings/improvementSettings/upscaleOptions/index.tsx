/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from "react";
// import { Listbox } from '@headlessui/react'
import { useTranslation } from "react-i18next";
import { useImageCreate } from "../../../../../../stores/imageCreateStore";

import HeadlessListbox from "../../../../../atoms/headlessListbox";


import {
  IconFont,
} from "../../../../../../styles/shared.css";


interface UpscaleOptionsProps {
  id: number,
  display: string,
  value: string | null,
  unavailable: boolean,
}

const options: UpscaleOptionsProps[] = [
  { id: 1, value: null, display: 'No Upscaling', unavailable: false },
  { id: 2, value: 'RealESRGAN_x4plus', display: 'RealESRGAN_x4plus', unavailable: false },
  { id: 3, value: 'RealESRGAN_x4plus_anime_6B', display: 'RealESRGAN_x4plus_anime_6B', unavailable: false },
]

export default function UpscaleOptions() {
  const { t } = useTranslation();
  const [selectedUpscaleOption, setSelectedUpscaleOption] = useState(options[0])
  const setRequestOption = useImageCreate((state) => state.setRequestOptions);
  const upscaleValue = useImageCreate((state) => state.getValueForRequestKey("use_upscale"));

  useEffect(() => {
    if (upscaleValue) {
      const upscaleOption = options.find((option) => option.value === upscaleValue)
      if (upscaleOption) {
        setSelectedUpscaleOption(upscaleOption);
      }
    }
    else {
      setSelectedUpscaleOption(options[0]);
    }
  }, [upscaleValue]);

  const handleChange = (option: UpscaleOptionsProps) => {
    setRequestOption("use_upscale", option.value);
  };


  const FAIcon = [IconFont, 'fa-solid', 'fa-chevron-down'].join(" ");

  return (

    <HeadlessListbox
      options={options}
      currentOption={selectedUpscaleOption}
      handleChange={handleChange}
      label={t("settings.ups")}
      FAIcon={FAIcon}
    ></HeadlessListbox>
    // <div className={ListboxHeadless}>
    //   <Listbox value={selectedUpscaleOption} onChange={handleChange}>
    //     <Listbox.Label className={ListboxHeadlessLabel}>{t("settings.ups")}</Listbox.Label>
    //     <Listbox.Button
    //       className={ListboxHeadlessButton}>
    //       {selectedUpscaleOption.display}
    //       <i className={[ListBoxIcon, IconFont, 'fa-solid', 'fa-chevron-down'].join(" ")}></i>
    //     </Listbox.Button>
    //     <Listbox.Options className={ListboxHeadlessOptions}>
    //       {options.map((option) => (
    //         <Listbox.Option
    //           key={option.id}
    //           value={option}
    //           disabled={option.unavailable}
    //           as={Fragment}
    //         >
    //           {({ active, selected }) => {

    //             return (
    //               <li
    //                 className={ListboxHeadlessOptionItem}
    //               >
    //                 {option.display}
    //               </li>
    //             )
    //           }}
    //         </Listbox.Option>
    //       ))}
    //     </Listbox.Options>
    //   </Listbox>
    // </div>
  );
}