import React from "react";

import { TopBar } from "./topBar/TopBar";

export const Header = () => {
  return (
    <header>
      <div className="container header">
        <TopBar />
      </div>
    </header>
  );
};
