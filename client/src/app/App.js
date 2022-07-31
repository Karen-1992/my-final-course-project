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
import CartLoader from "./components/ui/hoc/cartLoader";
import PersonalPage from "./components/page/personalPage";
import Orders from "./components/page/ordersPage/orders";
import Reviews from "./components/page/reviewsPage";
import Favorites from "./components/page/favoritesPage/favorites";

function App() {
    return (
        <div className="">
            <AppLoader>
                <CartLoader>
                    <NavBar />
                    <Switch>
                        <Route path="/products/:productId?" exact
                            component={Products} />
                        <Route path="/login/:type?" exact component={Login} />
                        <Route path="/logout" exact component={LogOut} />
                        <Route path="/cabinet" exact component={UserCabinet} />
                        <Route path="/cabinet/personal" exact component={PersonalPage} />
                        <Route path="/cabinet/orders" exact component={Orders} />
                        <Route path="/cabinet/favorites" exact component={Favorites} />
                        <Route path="/cabinet/reviews" exact component={Reviews} />
                        <Route path="/cart" exact component={Cart} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </CartLoader>
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
