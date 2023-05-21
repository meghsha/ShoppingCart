import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import './shoppingCart.css'
import ShoppingCart from "./App"
import { AppProvider } from './context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <AppProvider>
      <ShoppingCart />
    </AppProvider>
  </React.Fragment>
);