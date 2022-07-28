import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app/App";
import { createStore } from "./app/store/createStore";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./app/utils/history";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/* <BrowserRouter> */}
            <Router history={history}>
                <App />
            </Router>
            {/* </BrowserRouter> */}
        </Provider>
    </React.StrictMode>
);
