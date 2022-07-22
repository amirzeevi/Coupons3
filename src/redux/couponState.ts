import { Coupon } from "../model/coupon";
import PurchaseCoupon from './../Components/users/customer/purchaseCoupon';

export class couponState {
    coupons: Coupon[] = [];
}

export enum couponActionType {
    downloadCoupons = "downloadCoupons",
    addCoupon = "addCoupon",
    purchaseCoupon = "purchaseCoupn",
    updateCoupon = "updateCoupon",
    deleteCoupon = "deleteCoupon"
}

export interface couponAction {
    type: couponActionType;
    payload?: any;
}

export function downloadCoupons(coupons: Coupon[]): couponAction {
    return { type: couponActionType.downloadCoupons, payload: coupons }
}

export function addCoupon(coupon: Coupon): couponAction {
    return { type: couponActionType.addCoupon, payload: coupon }
}

export function purchaseCoupon(coupon: Coupon): couponAction {
    return { type: couponActionType.purchaseCoupon, payload: coupon }
}

export function updateCoupon(coupon: Coupon): couponAction {
    return { type: couponActionType.updateCoupon, payload: coupon }
}

export function deleteCoupon(couponID: number): couponAction {
    return { type: couponActionType.deleteCoupon, payload: couponID }
}

export function couponReducer(currentState: couponState = new couponState(), action: couponAction): couponState {
    const newState = { ...currentState }

    switch (action.type) {
        case couponActionType.downloadCoupons:
            newState.coupons = action.payload
            break;
        case couponActionType.purchaseCoupon:
        case couponActionType.addCoupon:
            newState.coupons.push(action.payload)
            break;
        case couponActionType.updateCoupon:
            newState.coupons[newState.coupons.findIndex(c => c.id === action.payload.id)] = action.payload
            break;
        case couponActionType.deleteCoupon:
            newState.coupons = newState.coupons.filter(c => c.id !== action.payload)
            break;
    }
    return newState
}
