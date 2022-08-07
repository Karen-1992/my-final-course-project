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
                label="Наименование"
                name="title"
                value={data.title}
                onChange={onChange}
                error={errors.title}
            />
            <TextField
                label="Производитель"
                name="brand"
                value={data.brand}
                onChange={onChange}
                error={errors.brand}
            />
            <SelectField
                name="category"
                label="Категория"
                value={data.category}
                defaultOption="Выберите категорию..."
                options={categoriesList}
                onChange={onChange}
                error={errors.category}
            />
            <TextField
                label="Описание"
                name="description"
                value={data.description}
                onChange={onChange}
                error={errors.description}
            />
            <TextField
                label="Скидка"
                type="number"
                name="discountPercentage"
                value={data.discountPercentage}
                onChange={onChange}
                error={errors.discountPercentage}
            />
            <TextField
                label="Цена"
                type="number"
                name="price"
                value={data.price}
                onChange={onChange}
                error={errors.price}
            />
            <TextField
                label="Количество"
                type="number"
                name="stock"
                value={data.stock}
                onChange={onChange}
                error={errors.stock}
            />
            <TextField
                label="Изображение"
                placeholder="Вставьте ссылку изображение"
                name="thumbnail"
                value={data.thumbnail}
                onChange={onChange}
                error={errors.thumbnail}
            />
            {!isValid &&
                <p>
                    <span className="text-danger">*</span>
                    Поле обязательно для заполнения
                </p>
            }
            <div className="d-flex flex-wrap gap-2">
                <button
                    type="submit"
                    disabled={!isValid}
                    className="btn btn-primary btn-sm w-100"
                >
                    {productId ? "Обновить" : "Добавить"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-danger btn-sm w-100"
                >
                    Отмена
                </button>
            </div>
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
