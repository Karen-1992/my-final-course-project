import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const { error, initialize, progress, status } = useMockData();
    const handleClick = () => {
        initialize();
    };
    return (
        <div className="container">
            <div>
                <h1>Интернет-магазин</h1>
                <p>Здесь вы можете найти все что угодно</p>
            </div>
            <div className="container mt-5">
                <h1> Main Page</h1>
                <h3>Инициализация данных в FireBase</h3>
                <ul>
                    <li>Status: {status}</li>
                    <li>Progress: {progress}%</li>
                    {error && <li>Error: {error}</li>}
                </ul>
                <button className="btn btn-primary" onClick={handleClick}>
                    {" "}
                    Инициализировать
                </button>
            </div>
        </div>
    );
};

export default Main;
