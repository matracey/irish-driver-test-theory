import React from "react";
import PropTypes from "prop-types";

import "./ImageOption.css";

import {
    Image,
    ChoiceGroup,
    PrimaryButton
} from "office-ui-fabric-react";

const ImageOption = (props) => {
    const {
        imageSrc,
        possibleValues,
        alt,
        onChange,
        onClickSubmit,
    } = props;
    return (
        <div className="image-option-container d-flex flex-column align-items-center">
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

ImageOption.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    possibleValues: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    })).isRequired,
    alt: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onClickSubmit: PropTypes.func,
};

export default ImageOption;