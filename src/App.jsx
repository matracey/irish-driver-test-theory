import React, { Component } from "react";

import Option from "./components/Option/Option";
import data from "./sign-data.json";

import "./App.css";

const shuffle = (a) => {
    let counter = a.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = a[counter];
        a[counter] = a[index];
        a[index] = temp;
    }

    return a;
}


class App extends Component {
    constructor(props) {
        super(props);

        this.onChangeSelectedOption = this.onChangeSelectedOption.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);

        this.state = {
            questions: Array.from(data),
            remainingQuestions: Array.from(data),
            answeredQuestions: []
        }
    }

    onChangeSelectedOption = () => {

    }

    onClickSubmit = () => {

    }

    render() {
        const { questions, remainingQuestions } = this.state;

        let output = "";

        if (remainingQuestions == null || remainingQuestions.length <= 0) {
            output = (
                <h1>No questions to display!</h1>
            );
        } else {
            const q = remainingQuestions[0];
            output = (
                <Option
                    key={`option-${q.id}`}
                    imageSrc={q.imageSrc}
                    possibleValues={shuffle([
                        ...shuffle(questions.filter(qF => qF.value !== q.value)).map(qM => ({ key: `option-${qM.id}`, text: qM.value })).slice(0, 3),
                        { key: `option-${q.id}`, text: q.value }
                    ])}
                    alt={q.alt}
                    onChange={this.onChangeSelectedOption}
                    onClickSubmit={this.onClickSubmit}
                />
            );
        }



        return (
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row ms-textAlignCenter">
                    <div className="ms-Grid-col ms-sm12 d-flex justify-content-center">
                        {output}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
