import React from "react";
import history from "../utils/history";

const Main = () => {
    const handleRedirect = () => {
        history.push("/products");
    };
    return (
        <div>
            <div>
                <h1>Интернет-магазин</h1>
                <p>Здесь вы можете найти все что угодно</p>
                <button onClick={handleRedirect}>Перейти к покупкам</button>
            </div>
        </div>
    );
};

export default Main;
