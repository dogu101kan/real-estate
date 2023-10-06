import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import "./assets/tailwind.css"
import { Provider } from 'react-redux';
import store from "./store/index";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>,
);
