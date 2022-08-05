import React from "react";
import TextField from "../common/form/textField";
import PropTypes from "prop-types";
import SelectField from "../common/form/selectField";

const ProductChangeForm = ({
    onSubmit,
    onChange,
    onCancel,
    data,
    errors,
    isValid,
    productId,
    categoriesList
}) => {
    return (
        <form onSubmit={onSubmit}>
            <TextField
                label="Title"
                name="title"
                value={data.title}
                onChange={onChange}
                error={errors.title}
            />
            <TextField
                label="Brand"
                name="brand"
                value={data.brand}
                onChange={onChange}
                error={errors.brand}
            />
            <SelectField
                name="category"
                label="Category"
                value={data.category}
                defaultOption="Choose..."
                options={categoriesList}
                onChange={onChange}
                error={errors.category}
            />
            <TextField
                label="Description"
                name="description"
                value={data.description}
                onChange={onChange}
                error={errors.description}
            />
            <TextField
                label="DiscountPercentage
                "
                type="number"
                name="discountPercentage"
                value={data.discountPercentage}
                onChange={onChange}
                error={errors.discountPercentage}
            />
            <TextField
                label="Price
                "
                type="number"
                name="price"
                value={data.price}
                onChange={onChange}
                error={errors.price}
            />
            <TextField
                label="Stock
                "
                type="number"
                name="stock"
                value={data.stock}
                onChange={onChange}
                error={errors.stock}
            />
            <TextField
                label="Thumbnail"
                name="thumbnail"
                value={data.thumbnail}
                onChange={onChange}
                error={errors.thumbnail}
            />
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-50 mx-auto"
            >
                {productId ? "Обновить" : "Добавить"}
            </button>
            <button
                type="button"
                onClick={onCancel}
                className="btn btn-warning w-50 mx-auto"
            >
                Отмена
            </button>
        </form>
    );
};

ProductChangeForm.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    onCancel: PropTypes.func,
    data: PropTypes.object,
    categoriesList: PropTypes.array,
    errors: PropTypes.object,
    isValid: PropTypes.bool,
    productId: PropTypes.string
};

export default ProductChangeForm;
