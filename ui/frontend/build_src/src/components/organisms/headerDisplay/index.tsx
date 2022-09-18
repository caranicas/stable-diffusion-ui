import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getConfig } from "../../../api";

import StatusDisplay from "./statusDisplay";

import {
  HeaderDisplayMain, //@ts-ignore
} from "./headerDisplay.css.ts";

import { useTranslation } from "react-i18next";

export default function HeaderDisplay() {
  const { t } = useTranslation();
  // but this will be moved to the status display when it is created
  const { status, data } = useQuery(["config"], getConfig);

  const [version, setVersion] = useState("2.1.0");
  const [release, setRelease] = useState("");

  useEffect(() => {
    if (status === "success") {
      // TODO also pass down the actual version
      const { update_branch } = data;

      // just hard coded for now
      setVersion("v2.1");

      if (update_branch === "main") {
        setRelease("(stable)");
      } else {
        setRelease("(beta)");
      }
    }
  }, [status, data, setVersion, setVersion]);

  return (
    <div className={HeaderDisplayMain}>
      <h1>
        {t("title")} {version} {release}{" "}
      </h1>
      <StatusDisplay className="status-display"></StatusDisplay>
    </div>
  );
}
