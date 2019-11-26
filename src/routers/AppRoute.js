/*
 * @file: AppRoute.js
 * @description: Defined routers layouts
 * @author: smartData
 */

/************ React Pages according to layouts  *****************/

import React from "react";
import { Route, Redirect } from "react-router-dom";
import {
  public_type,
  private_type,
  dashboard_path
} from "../utilities/constants";

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
      const isLogin = requireAuth(store);

      if (isLogin && props.location.pathname === "/") {
        return (
          <Redirect
            to={{
              pathname: `/${dashboard_path}`,
              state: { from: props.location }
            }}
          />
        );
      }
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
