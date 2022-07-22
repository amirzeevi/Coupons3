import { Company } from '../model/company';
import { Coupon } from './../model/coupon';
export class guestState {
    allCoupons: Coupon[] = [];
    allCompanies: Company[] = [];
}

export enum guestActionType {
    downloadAllCoupons = "downloadAllCoupons",
    addCoupon = "addCoupon",
    deleteCoupon = "deleteCoupon",
    updateCoupon = "updateCoupon",

    downloadGuestCompanies = "downloadGuestCompanies",
    addCompany = "addCompany",
    deleteCompany = "deleteCompany",
    updateCompany = "updateCompany"
}

export interface guestAction {
    type: guestActionType;
    payload?: any;
}

export function downloadAllCoupons(coupons: Coupon[]): guestAction {
    return { type: guestActionType.downloadAllCoupons, payload: coupons }
}

export function addCoupon(coupon: Coupon): guestAction {
    return { type: guestActionType.addCoupon, payload: coupon }
}

export function updateCoupon(coupon: Coupon): guestAction {
    return { type: guestActionType.updateCoupon, payload: coupon }
}

export function deleteCoupon(couponID: number): guestAction {
    return { type: guestActionType.deleteCoupon, payload: couponID }
}

export function downloadGuestCompanies(companies: Company[]): guestAction {
    return { type: guestActionType.downloadGuestCompanies, payload: companies }
}

export function addCompany(company: Company): guestAction {
    return { type: guestActionType.addCoupon, payload: company }
}

export function updateCompany(company: Company): guestAction {
    return { type: guestActionType.updateCoupon, payload: company }
}

export function deleteCompany(companyID: number): guestAction {
    return { type: guestActionType.deleteCoupon, payload: companyID }
}

export function guestReducer(currentState: guestState = new guestState(), action: guestAction): guestState {
    const newState = { ...currentState }

    switch (action.type) {
        case guestActionType.downloadAllCoupons:
            newState.allCoupons = action.payload
            break;
        case guestActionType.addCoupon:
            newState.allCoupons.push(action.payload)
            break;
        case guestActionType.updateCoupon:
            newState.allCoupons[newState.allCoupons.findIndex(c => c.id === action.payload.id)] = action.payload
            break;
        case guestActionType.deleteCoupon:
            newState.allCoupons = newState.allCoupons.filter(c => c.id !== action.payload)
            break;
        case guestActionType.downloadGuestCompanies:
            newState.allCompanies = action.payload
            break;
        case guestActionType.addCompany:
            newState.allCompanies.push(action.payload)
            break;
        case guestActionType.updateCompany:
            const updatedCompanies = newState.allCompanies.filter(c => c.id !== action.payload.id)
            updatedCompanies.push(action.payload)
            newState.allCompanies = updatedCompanies
            break;
        case guestActionType.deleteCompany:
            newState.allCompanies = newState.allCompanies.filter(c => c.id !== action.payload)
            break;
    }
    return newState
}