import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Products from "./layouts/products";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import Main from "./layouts/main";
import Cart from "./layouts/cart";
import AppLoader from "./components/ui/hoc/appLoader";
import UserCabinet from "./layouts/userCabinet";
import { ToastContainer } from "react-toastify";
// import PersonalPage from "./components/page/personalPage";
// import Orders from "./components/page/ordersPage/orders";
// import Reviews from "./components/page/reviewsPage";
// import Favorites from "./components/page/favoritesPage/favorites";
import ProtectedRoute from "./components/common/protectedRoute";

function App() {
    return (
        <div className="container">
            <AppLoader>
                <NavBar />
                <Switch>
                    <Route path="/products/:productId?" exact
                        component={Products} />
                    <Route path="/login/:type?" exact component={Login} />
                    <Route path="/logout" exact component={LogOut} />
                    {/* <ProtectedRoute
                        path="/cabinet/personal"
                        component={PersonalPage}
                    />
                    <ProtectedRoute
                        path="/cabinet/orders"
                        component={Orders}
                    />
                    <ProtectedRoute
                        path="/cabinet/favorites"
                        component={Favorites}
                    />
                    <ProtectedRoute
                        path="/cabinet/reviews"
                        component={Reviews}
                    /> */}
                    {/* <ProtectedRoute
                        path="/cabinet"
                        component={UserCabinet}
                    /> */}
                    <ProtectedRoute
                        path="/cabinet/:type?"
                        component={UserCabinet}
                    />
                    <ProtectedRoute
                        path="/cart"
                        component={Cart}
                    />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
