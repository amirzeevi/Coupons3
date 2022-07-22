import { useState } from "react";
import { Navigate } from "react-router";
import { store } from "../../redux/store";


export default function PrivateRoute({ children, clientType }: any): JSX.Element {
    const [user] = useState(store.getState().authState)
    return user.userType === clientType ? children : <Navigate to={'/'} />
}
