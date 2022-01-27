import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Wishlist from '../pages/Wishlist';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';

const Routes = () => {
    return (
        <Switch>
            <Route
                path='/wishlist'
                exact
                component={Wishlist}
            />
            <Route
                path='/:category/search/:keyword'
                component={Catalog}
            />
            <Route
                path='/:category/:id'
                component={Detail}
            />
            <Route
                path='/:category'
                component={Catalog}
            />
            <Route
                path='/'
                exact
                component={Home}
            />
        </Switch>
    );
}

export default Routes;