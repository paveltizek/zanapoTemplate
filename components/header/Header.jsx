import React from "react";

import { TopBar } from "./topBar/TopBar";
import { IconMenu } from "./iconMenu/IconMenu";

export const Header = () => {
  return (
    <header>
      <div className="container header">
        <TopBar />
        <IconMenu />
      </div>
    </header>
  );
};
