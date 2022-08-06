import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import RadioField from "../common/form/radioField";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/users";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        sex: "male",
        adress: "",
        phone: "",
        licence: false,
        isAdmin: false
    });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
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
        email: {
            isRequired: {
                message: "isRequired"
            },
            isEmail: {
                message: "Email введен некорректно"
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
        },
        password: {
            isRequired: {
                message: "isRequired"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(signUp(data));
    };
    return (
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
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <TextField
                label="Телефон"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                error={errors.phone}
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
            <CheckBoxField
                value={data.isAdmin}
                onChange={handleChange}
                name="isAdmin"
            >
                Are you admin
            </CheckBoxField>
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            {!isValid &&
                <p>
                    <span className="text-danger">*</span>
                    Поле обязательно для заполнения
                </p>
            }
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
