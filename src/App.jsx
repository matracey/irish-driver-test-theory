import React from "react";

import Questions from "./components/Containers/Questions/Questions";

import signData from "./sign-data.json";
import theoryData from "./theory-data.json";

import "./App.css";

const App = props => (
    <Questions
        signData={signData}
        theoryData={theoryData}
    />
);

export default App;
