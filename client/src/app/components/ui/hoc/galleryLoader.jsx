import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getGalleryLoadingStatus, loadGalleryList } from "../../../store/gallery";
import { useEffect } from "react";

const GalleryLoader = ({ children }) => {
    const dispatch = useDispatch();
    const dataStatus = useSelector(getGalleryLoadingStatus());
    useEffect(() => {
        dispatch(loadGalleryList());
    }, []);
    if (dataStatus) return "Loading";
    return children;
};

GalleryLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default GalleryLoader;
