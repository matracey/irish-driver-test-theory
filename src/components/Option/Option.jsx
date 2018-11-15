import React from "react";
import PropTypes from "prop-types";

import {
    Image,
    ChoiceGroup,
    PrimaryButton
} from "office-ui-fabric-react";

const Option = (props) => {
    const {
        imageSrc,
        possibleValues,
        alt,
        onChange,
        onClickSubmit,
    } = props;
    return (
        <div className="option-container">
            <Image
                src={imageSrc}
                alt={alt}
                width={150}
            />
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

Option.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    possibleValues: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    })).isRequired,
    alt: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

export default Option;