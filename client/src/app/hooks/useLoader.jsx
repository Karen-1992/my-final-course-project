import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

const LoaderContext = React.createContext();

export const useLoader = () => {
    return useContext(LoaderContext);
};

export const LoaderProvider = ({ children }) => {
    const [clientX, setClientX] = useState(0);
    const [isAppLoading, setLoading] = useState(false);
    const [clientY, setClientY] = useState(0);
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        setClientX(clientX - 200);
        setClientY(clientY - 70);
    };
    const startLoading = () => {
        setLoading(false);
    };
    return (
        <LoaderContext.Provider
            value={{ clientX, clientY, handleMouseMove, isAppLoading, startLoading }}
        >
            {children}
        </LoaderContext.Provider>
    );
};

LoaderProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
