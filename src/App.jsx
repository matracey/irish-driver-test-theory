import React, { Component } from "react";

import { PrimaryButton } from "office-ui-fabric-react";

import ImageOption from "./components/ImageOption/ImageOption";
import data from "./sign-data.json";

import "./App.css";

const shuffle = (a) => {
    let counter = a.length;

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter -= 1;
        const temp = a[counter];
        a[counter] = a[index];
        a[index] = temp;
    }

    return a;
};

class App extends Component {
    constructor(props) {
        super(props);

        this.onChangeSelectedOption = this.onChangeSelectedOption.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.loadQuestionData = this.loadQuestionData.bind(this);

        this.state = {
            remainingQuestions: this.loadQuestionData(data),
            answeredQuestions: [],
            selectedOption: "",
        };
    }

    onChangeSelectedOption = (_event, option) => this.setState({ selectedOption: option.text });

    onClickSubmit = () => {
        const { selectedOption, remainingQuestions, answeredQuestions } = this.state;
        const q = remainingQuestions[0];
        if (q.value === selectedOption) {
            const answeredQuestion = remainingQuestions.splice(0, 1);
            answeredQuestions.push(answeredQuestion);
        } else {
            const index = q.possibleValues.map(v => v.text).indexOf(selectedOption);
            if (index >= 0) {
                remainingQuestions[0].possibleValues[index].disabled = true;
            }
        }
        this.setState({ selectedOption: "", remainingQuestions, answeredQuestions });
    }

    loadQuestionData = (inputData) => {
        let questionData = shuffle(Array.from(inputData));
        questionData = questionData.map(({
            id,
            imageSrc,
            value,
            alt
        }) => ({
            id,
            imageSrc,
            value,
            alt,
            possibleValues: shuffle([
                ...shuffle(questionData.filter(qF => qF.value !== value)).map(qM => ({ key: `option-${qM.id}`, text: qM.value, disabled: false })).slice(0, 3),
                { key: `option-${id}`, text: value, disabled: false }
            ]),
        }));

        return questionData;
    }

    render() {
        const { remainingQuestions } = this.state;

        if (remainingQuestions == null || remainingQuestions.length <= 0) {
            return (
                <div className="ms-Grid d-flex flex-column justify-content-center align-items-center vh-100 ms-textAlignCenter" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 d-flex justify-content-center">
                            <h1>No questions to display!</h1>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 d-flex justify-content-center">
                            <PrimaryButton
                                text="Start Again?"
                                onClick={() => this.setState({ remainingQuestions: this.loadQuestionData(data) })}
                            />
                        </div>
                    </div>
                </div>
            );
        }

        const q = remainingQuestions[0];
        return (
            <div className="ms-Grid d-flex justify-content-center align-items-center vh-100" dir="ltr">
                <div className="ms-Grid-row ms-textAlignCenter">
                    <div className="ms-Grid-col ms-sm12 d-flex justify-content-center">
                        <ImageOption
                            key={`option-${q.id}`}
                            imageSrc={q.imageSrc}
                            possibleValues={q.possibleValues}
                            alt={q.alt}
                            onChange={this.onChangeSelectedOption}
                            onClickSubmit={this.onClickSubmit}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
