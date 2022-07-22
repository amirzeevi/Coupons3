import jwt_decode from "jwt-decode";

export class authState {
    userEmail: string = "";
    userType: string = "";
    userToken: string = window.sessionStorage.getItem("jwt");
}

export enum authActionType {
    userLogin = "userLogin",
    userLogout = "userLogout",
    updateToken = "updateToken"
}

export interface authAction {
    type: authActionType;
    payload?: any;
}

export function userLogin(userToken: string): authAction {
    return { type: authActionType.userLogin, payload: userToken }
}

export function userLogout(): authAction {
    return { type: authActionType.userLogout }
}

export function updateToken(userToken: string): authAction {
    return { type: authActionType.updateToken, payload: userToken }
}

export function authReducer(currentState: authState = new authState(), action: authAction): authState {
    const newState = { ...currentState }

    switch (action.type) {
        case authActionType.userLogin:
            const token = action.payload.replace("Bearer ", "")
            const decoded = JSON.parse(JSON.stringify(jwt_decode(token)))
            newState.userEmail = decoded.sub;
            newState.userType = decoded.type;
            newState.userToken = action.payload;
            break;
        case authActionType.userLogout:
            newState.userToken = ""
            newState.userType = ""
            window.sessionStorage.removeItem("jwt")
            break;
        case authActionType.updateToken:
            newState.userToken = action.payload;
    }
    return newState
}
