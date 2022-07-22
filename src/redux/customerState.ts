import { Customer } from '../model/customer';
import notify from '../utils/notify';

export class customerState {
    customers: Customer[] = [];
}

export enum customerActionType {
    downloadCustomers = "downloadCustomers",
    deleteCustomer = "deleteCustomer",
    updateCustomer = "updateCustomer",
    addCustomer = "addCustomer"
}

export interface customerAction {
    type: customerActionType;
    payload?: any
}

export function downloadCustomers(customers: Customer[]): customerAction {
    return { type: customerActionType.downloadCustomers, payload: customers }
}

export function deleteCustomer(customerID: number) {
    return { type: customerActionType.deleteCustomer, payload: customerID }
}

export function updateCustomer(customer: Customer) {
    return { type: customerActionType.updateCustomer, payload: customer }
}

export function addCustomer(customer: Customer) {
    return { type: customerActionType.addCustomer, payload: customer }
}

export function customerReducer(currentState: customerState = new customerState(), action: customerAction): customerState {
    const newState = { ...currentState }
    switch (action.type) {
        case customerActionType.downloadCustomers:
            newState.customers = action.payload;
            break;
        case customerActionType.addCustomer:
            newState.customers.push(action.payload)
            notify.success("Customer Added")
            break;
        case customerActionType.deleteCustomer:
            newState.customers = newState.customers.filter(c => c.id !== action.payload)
            notify.success("Customer Deleted")
            break;
        case customerActionType.updateCustomer:
            newState.customers[newState.customers.findIndex(c => c.id === action.payload.id)] = action.payload
            notify.success("Customer Updated")
            break;

    }
    return newState;
}