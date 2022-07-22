import { Coupon } from "../model/coupon";
import notify from "../utils/notify";

export class cartState {
    couponsInCart: Coupon[] = [];
}

export enum cartActionType {
    addCouponToCart = "addCouponToCart",
    removeCouponFromCart = "removeCouponFromCart",
    clearCart = "clearCart",
    updateCoupon = "updateCoupon"
}

export interface cartAction {
    type: cartActionType;
    payload?: any;
}

export function addCouponToCart(coupon: Coupon): cartAction {
    return { type: cartActionType.addCouponToCart, payload: coupon }
}

export function removeCouponFromCart(couponID: number): cartAction {
    return { type: cartActionType.removeCouponFromCart, payload: couponID }
}
export function updateCoupon(coupon: Coupon): cartAction {
    return { type: cartActionType.updateCoupon, payload: coupon }
}

export function clearCart(): cartAction {
    return { type: cartActionType.clearCart }
}

export function cartReducer(currentState: cartState = new cartState(), action: cartAction): cartState {
    const newState = { ...currentState }

    switch (action.type) {
        case cartActionType.addCouponToCart:
            if (newState.couponsInCart.some(c => c.id === action.payload.id)) {
                notify.error("Coupon " + action.payload.title + " alredy in cart")
                break;
            }
            newState.couponsInCart.push(action.payload)
            notify.success("Coupon " + action.payload.title + " added to cart")
            break;
        case cartActionType.removeCouponFromCart:
            newState.couponsInCart = newState.couponsInCart.filter(c => c.id !== action.payload)
            break;
        case cartActionType.updateCoupon:
            newState.couponsInCart[newState.couponsInCart.findIndex(c => c.id === action.payload.id)] = action.payload
            break;
        case cartActionType.clearCart:
            newState.couponsInCart = ([])
            break;
    }

    return newState
}