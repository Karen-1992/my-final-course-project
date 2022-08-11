import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Products from "./layouts/products";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import Main from "./layouts/main";
import AppLoader from "./components/ui/hoc/appLoader";
import UserCabinet from "./layouts/userCabinet";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import Dashboard from "./layouts/dashboard";
import "react-toastify/dist/ReactToastify.css";
import CartPage from "./components/page/cartPage/cartPage";
import Header from "./components/ui/header/header";
import Footer from "./components/ui/footer";

function App() {
    return (
        <div className="container min-vh-100 position-relative p-0 pb-5">
            <AppLoader>
                <Header />
                <div className="my-5 p-0">
                    <Switch>
                        <Route
                            path="/products/:productId?"
                            exact
                            component={Products}
                        />
                        <Route path="/login/:type?" exact component={Login} />
                        <Route path="/logout" exact component={LogOut} />
                        <ProtectedRoute
                            path="/cabinet/:type?/:edit?"
                            component={UserCabinet}
                        />
                        <ProtectedRoute
                            path="/dashboard"
                            component={Dashboard}
                        />
                        <ProtectedRoute path="/cart" component={CartPage} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </div>
                <Footer />
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
