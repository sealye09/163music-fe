import { FC } from "react";

import Router from "./router";
import "./index.css";

const App: FC = () => {
  return (
    <div className="app w-full h-full">
      <Router />
    </div>
  );
};

export default App;
