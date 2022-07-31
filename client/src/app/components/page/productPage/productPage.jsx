import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getGalleryById } from "../../../store/gallery";

const ProductPage = ({
    title,
    _id,
    description,
    stock
}) => {
    const [selectedImg, setSelectedImg] = useState(0);
    const handleSelectImg = (i) => {
        setSelectedImg(i);
    };
    const galleryList = useSelector(getGalleryById(_id));
    return (
        <div>
            <h1>{title}</h1>
            <div
                className="d-flex justify-content-between"
            >
                <div
                    className="d-flex flex-column gap-2"
                    style={{
                        width: "80px"
                    }}
                >
                    {galleryList.map((g, i) => (
                        <div
                            className={selectedImg === i ? "border border-danger" : ""}
                            key={i}
                            onClick={() => handleSelectImg(i)}
                            role="button"
                        >
                            <img className="w-100" src={g} alt={g} />
                        </div>
                    ))}
                </div>
                <div>
                    <img className="w-100" src={galleryList[selectedImg]} alt={galleryList[selectedImg]} />
                </div>
                <div>
                    <h3>Основные сведения</h3>
                    <p>
                        Наименование:
                        <span className="px-1 fw-bold">
                            {title}
                        </span>
                    </p>
                    <p>
                        Описание:
                        <span className="px-1 fw-bold">
                            {description}
                        </span>
                    </p>
                    <p>
                        Остаток:
                        <span className="px-1 fw-bold">
                            {stock}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

ProductPage.propTypes = {
    title: PropTypes.string,
    _id: PropTypes.string,
    description: PropTypes.string,
    stock: PropTypes.number
};

export default ProductPage;
