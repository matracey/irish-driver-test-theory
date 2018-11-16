import React from "react";
import PropTypes from "prop-types";

import "./Header.css";

const Header = (props) => {
    const { appName, className } = props;

    return (
            <span className="mh-1 ms-font-xl">{appName}</span>
        <header className={`${className ? `${className} ` : ""}w-100 d-flex justify-content-left align-items-center`}>
        </header>
    );
};

Header.propTypes = {
    appName: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default Header;