import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter, Router } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app/App";
import { createStore } from "./app/store/createStore";
import { Provider } from "react-redux";
// import history from "./app/utils/history";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                {/* <Router history={history}> */}
                <App />
                {/* </Router> */}
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);
