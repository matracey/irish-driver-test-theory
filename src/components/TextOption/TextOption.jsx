import React from "react";
import PropTypes from "prop-types";

import "./TextOption.css";

import {
    ChoiceGroup,
    PrimaryButton
} from "office-ui-fabric-react";

const TextOption = (props) => {
    const {
        text,
        possibleValues,
        alt,
        onChange,
        onClickSubmit,
    } = props;
    return (
        <div className="text-option-container d-flex flex-column align-items-center">
            <div className="ms-font-l">
                {text}
            </div>
            <ChoiceGroup
                options={possibleValues}
                onChange={onChange}
                label="Please choose an answer"
                required
                className="mt-3"
            />
            <PrimaryButton
                text="Submit"
                onClick={onClickSubmit}
                className="mt-3"
            />
        </div>
    );
};

TextOption.propTypes = {
    text: PropTypes.string.isRequired,
    possibleValues: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    })).isRequired,
    alt: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onClickSubmit: PropTypes.func,
};

export default TextOption;