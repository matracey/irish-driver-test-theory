import React from "react";

import Questions from "./components/Containers/Questions/Questions";
import Header from "./components/Presenters/Header/Header";

import signData from "./sign-data.json";
import theoryData from "./theory-data.json";

import "./App.css";

const App = () => (
    <div className="app">
        <Header appName="Irish Driving Test - Theory Prep" />
        <Questions
            signData={signData}
            theoryData={theoryData}
        />
    </div>
);

export default App;
