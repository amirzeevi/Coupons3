import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer} from "./authState";
import { cartReducer } from "./cartState";
import { companyReducer } from "./companyState";
import { couponReducer } from './couponState';
import { customerReducer } from "./customerState";
import { guestReducer } from './guestState';

const reducers = combineReducers({ authState: authReducer, companyState: companyReducer, customerState: customerReducer, couponState: couponReducer, guestState: guestReducer, cartState: cartReducer })

export const store = configureStore({ reducer: reducers,});