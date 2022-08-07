import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

const LoadingContext = React.createContext();

export const useLoading = () => {
    return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }) => {
    const [clientX, setClientX] = useState(0);
    const [isAppLoading, setLoading] = useState(true);
    const [clientY, setClientY] = useState(0);
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        setClientX(clientX + 200);
        setClientY(clientY + 200);
    };
    const startLoading = () => {
        setLoading(false);
    };
    return (
        <LoadingContext.Provider
            value={{ clientX, clientY, handleMouseMove, isAppLoading, startLoading }}
        >
            {children}
        </LoadingContext.Provider>
    );
};

LoadingProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
