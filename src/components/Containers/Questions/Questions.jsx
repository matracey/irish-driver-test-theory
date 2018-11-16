import React, { Component } from "react";
import PropTypes from "prop-types";

import { PrimaryButton } from "office-ui-fabric-react";

import ImageOption from "../../Presenters/ImageOption/ImageOption";
import TextOption from "../../Presenters/TextOption/TextOption";

import { shuffleArray } from "../../../helpers";

class Questions extends Component {
    constructor(props) {
        super(props);

        this.onChangeSelectedOption = this.onChangeSelectedOption.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.loadQuestionData = this.loadQuestionData.bind(this);
        this.reloadQuestions = this.reloadQuestions.bind(this);

        const { signData, theoryData } = props;

        this.signData = signData;
        this.theoryData = theoryData;

        this.state = {
            remainingQuestions: this.reloadQuestions(),
            answeredQuestions: [],
            selectedOption: "",
        };
    }

    signData;

    theoryData;

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
        let questionData = shuffleArray(Array.from(inputData));
        questionData = questionData.map((q) => {
            let possibleValues = (q.possibleValues || questionData).filter(qF => qF.value !== q.value).map(qM => ({ key: `option-${qM.id}`, text: qM.value, disabled: false }));
            if (q.possibleValues == null || q.possibleValues.length <= 0) { possibleValues = possibleValues.slice(0, 3); }
            return { ...q, possibleValues: shuffleArray([...possibleValues, { key: `option-${q.id}`, text: q.value, disabled: false }]) };
        });
        return questionData;
    }

    reloadQuestions = () => shuffleArray([...this.loadQuestionData(this.signData), ...this.loadQuestionData(this.theoryData)]);

    render() {
        const { remainingQuestions } = this.state;

        if (remainingQuestions == null || remainingQuestions.length <= 0) {
            return (
                <div className="ms-Grid d-flex flex-column justify-content-center align-items-center h-100 mh-3 ms-textAlignCenter" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 d-flex justify-content-center">
                            <h1>You&rsquo;ve answered all of the questions!</h1>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 d-flex justify-content-center">
                            <PrimaryButton
                                text="Start Again?"
                                onClick={() => this.setState({ remainingQuestions: this.reloadQuestions() })}
                            />
                        </div>
                    </div>
                </div>
            );
        }

        const q = remainingQuestions[0];
        let option = "";
        if (q.imageSrc != null) {
            option = (
                <ImageOption
                    key={`option-${q.id}`}
                    imageSrc={q.imageSrc}
                    possibleValues={q.possibleValues}
                    alt={q.alt}
                    onChange={this.onChangeSelectedOption}
                    onClickSubmit={this.onClickSubmit}
                />
            );
        } else {
            option = (
                <TextOption
                    key={`option-${q.id}`}
                    text={q.text}
                    possibleValues={q.possibleValues}
                    onChange={this.onChangeSelectedOption}
                    onClickSubmit={this.onClickSubmit}
                />
            );
        }

        return (
            <div className="ms-Grid d-flex justify-content-center align-items-center h-100 mh-3" dir="ltr">
                <div className="ms-Grid-row ms-textAlignCenter">
                    <div className="ms-Grid-col ms-sm12 d-flex justify-content-center">
                        {option}
                    </div>
                </div>
            </div>
        );
    }
}

Questions.propTypes = {
    signData: PropTypes.array.isRequired,
    theoryData: PropTypes.array.isRequired
};

export default Questions;
