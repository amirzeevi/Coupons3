import { Badge, Box, Container, IconButton, Typography } from "@mui/material";
import { connect } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import { userLogout } from '../../redux/authState';
import { store } from '../../redux/store';


function Header(props: any): JSX.Element {
    const navigate = useNavigate()

    const handleLogOut = () => {
        store.dispatch(userLogout())
        store.getState().couponState.coupons = []
        store.getState().companyState.companies = []
        store.getState().customerState.customers = []
        navigate("/")
    }

    const handleProfile = () => {
        switch (store.getState().authState.userType) {
            case "CUSTOMER":
                navigate("/customer")
                break;
            case "COMPANY":
                navigate("/company")
                break;
            case "ADMINISTRATOR":
                navigate("/admin")
                break;
        }
    }

    return (
        <div style={{ backgroundColor: "#1e88e5" }}>
            <Container>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <Typography sx={{ fontFamily: "Dosis",padding:1}} variant="h3">
                        <NavLink style={{ color: "white", textDecoration: "none", }} to={"/"}>
                            Coupons
                        </NavLink>
                    </Typography>

                    <Box>
                        <IconButton sx={{ width: "40px", alignItems: "center" }} onClick={() => navigate("/cart")}>
                            <Badge badgeContent={props.totalCartItems} color="secondary" >
                                <span className="material-symbols-outlined">
                                    shopping_cart
                                </span>

                            </Badge>
                        </IconButton>
                        {!props.client ?
                            <IconButton sx={{ width: "40px", alignItems: "center" }} onClick={() => navigate("/login")}>

                                <span className="material-symbols-rounded">
                                    account_circle
                                </span>

                            </IconButton>
                            :
                            <IconButton sx={{ width: "40px", alignItems: "center" }} onClick={() => handleProfile()}>

                                <span className="material-symbols-rounded">
                                    account_circle

                                </span>
                            </IconButton>
                        }

                        {props.client &&
                            <IconButton onClick={() => handleLogOut()}>
                                <span className="material-symbols-outlined">
                                    logout
                                </span>
                            </IconButton>
                        }
                    </Box>
                </Box>
            </Container>
        </div >
    );
}

const mapStateToProps = (state: any) => ({
    totalCartItems: state.cartState.couponsInCart.length,
    client: state.authState.userType
})

export default connect(mapStateToProps)(Header)