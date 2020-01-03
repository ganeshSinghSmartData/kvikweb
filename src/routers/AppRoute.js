/*
 * @file: AppRoute.js
 * @description: Defined routers layouts
 * @author: smartData
 */

/************ React Pages according to layouts  *****************/

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { public_type, private_type } from "../utilities/constants";

const AppRoute = ({
  component: Component,
  layout: Layout,
  requireAuth,
  to = "/",
  store,
  type = private_type,
  ...rest
}) => (
    <Route
      {...rest}
      render={props => {
        console.log('props.location.pathname', props.location.pathname)
        const isLogin = requireAuth(store);
        if (type === public_type) {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }
        return isLogin || props.location.pathname === "/" ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
            <Redirect
              to={{
                pathname: to,
                state: { from: props.location }
              }}
            />
          );
      }}
    />
  );

export default AppRoute;
