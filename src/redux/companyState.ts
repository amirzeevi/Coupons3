import { Company } from "../model/company";
import notify from './../utils/notify';

export class companyState {
    companies: Company[] = [];
}

export enum companyActionType {
    downloadComapnies = "downloadCompanies",
    deleteCompany = "deleteComapny",
    updateCompany = "updateComapny",
    addCompany = "addComapny"
}

export interface companyAction {
    type: companyActionType;
    payload?: any;
}

export function downloadCompanies(companies: Company[]): companyAction {
    return { type: companyActionType.downloadComapnies, payload: companies }
}

export function deleteCompany(companyID: number): companyAction {
    return { type: companyActionType.deleteCompany, payload: companyID }
}

export function updateCompany(company: Company): companyAction {
    return { type: companyActionType.updateCompany, payload: company }
}

export function addCompany(company: Company): companyAction {
    return { type: companyActionType.addCompany, payload: company }
}

export function companyReducer(currentState: companyState = new companyState(), action: companyAction) {
    const newState = { ...currentState }

    switch (action.type) {
        case companyActionType.downloadComapnies:
            newState.companies = action.payload;
            break;

        case companyActionType.addCompany:
            newState.companies.push(action.payload)
            notify.success("Company Added")
            break;

        case companyActionType.deleteCompany:
            const updatedCompanies = newState.companies.filter(c => c.id !== action.payload)
            newState.companies = updatedCompanies
            notify.success("Company Deleted")
            break;

        case companyActionType.updateCompany:
            newState.companies = newState.companies.filter(c => c.id !== action.payload.id)
            newState.companies.push(action.payload);
            notify.success("Company Updated")
            break;
    }
    return newState;
}
