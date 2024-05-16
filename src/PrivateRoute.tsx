// import React, { useContext } from "react";
// import { Route, Navigate, RouteProps } from "react-router-dom";
// import { AuthContext } from "./AuthContext";

// interface PrivateRouteProps extends RouteProps {
//   element: React.ComponentType<any>;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element, ...rest }) => {
//   const { currentUser } = useContext(AuthContext);

//   return currentUser ? (
//     <Route {...rest} element={<Element />} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export default PrivateRoute;
