import { BrowserRouter } from "react-router-dom";
import { userLogin } from "../../redux/authState";
import { store } from "../../redux/store";
import Footer from "./footer";
import Header from "./header";
import CouponRouting from "../routing/couponRouting";
import { Container } from "@mui/material";

function Layout(): JSX.Element {

  if (window.sessionStorage.getItem("jwt")) {
    store.dispatch(userLogin(window.sessionStorage.getItem("jwt")))
  }
  
  return (
    <div className="layout d-flex flex-column" style={{ height: "100%" }}>
      <BrowserRouter>
        <Header />
        <Container  >
          <CouponRouting />
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Layout;
