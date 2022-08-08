import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app/App";
import { createStore } from "./app/store/createStore";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./app/utils/history";
import { LoaderProvider } from "./app/hooks/useLoader";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <LoaderProvider>
                    <App />
                </LoaderProvider>
            </Router>
        </Provider>
    </React.StrictMode>
);
