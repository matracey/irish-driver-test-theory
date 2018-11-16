import React from "react";
import PropTypes from "prop-types";

import "./Header.css";

const Header = (props) => {
    const { appName } = props;

    return (
        <header className="w-100 d-flex justify-content-left align-items-center">
            <span className="mh-1 ms-font-xl">{appName}</span>
        </header>
    );
};

Header.propTypes = {
    appName: PropTypes.string.isRequired
};

export default Header;