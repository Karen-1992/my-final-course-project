import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUser } from "../../../store/users";

const EditUserPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateUser(data));
    };
    useEffect(() => {
        if (currentUser && !data) {
            setData({
                ...currentUser
            });
        }
    }, [currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "isRequired"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "isRequired"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        lastName: {
            isRequired: {
                message: "isRequired"
            },
            min: {
                message: "Фамилия должно состоять минимум из 3 символов",
                value: 3
            }
        },
        adress: {
            isRequired: {
                message: "isRequired"
            },
            min: {
                message: "Адресс должен состоять минимум из 10 символов",
                value: 10
            }
        },
        phone: {
            isRequired: {
                message: "isRequired"
            },
            min: {
                message: "Телефон должен состоять минимум из 9 символов",
                value: 9
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="w-75">
            <h1>EDIT</h1>
            {!isLoading && currentUser ? (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Имя"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextField
                        label="Фамилия"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                    />
                    <RadioField
                        options={[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" }
                        ]}
                        value={data.sex}
                        name="sex"
                        onChange={handleChange}
                        label="Выберите ваш пол"
                    />
                    <TextField
                        label="Адресс"
                        name="adress"
                        value={data.adress}
                        onChange={handleChange}
                        error={errors.adress}
                    />
                    <TextField
                        label="Телефон"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        error={errors.phone}
                    />
                    <TextField
                        label="Денежные средства"
                        type="number"
                        name="cash"
                        value={data.cash}
                        onChange={handleChange}
                        error={errors.cash}
                    />
                    {!isValid &&
                        <p>
                            <span className="text-danger">*</span>
                            Поле обязательно для заполнения
                        </p>
                    }
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="btn btn-primary w-100 mx-auto"
                    >
                        Обновить
                    </button>
                </form>
            ) : (
                "Loading..."
            )}
        </div>
    );
};

export default EditUserPage;
