import { Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Footer(): JSX.Element {
    return (
        <div className="footer py-3 mt-auto bottom" style={{backgroundColor: "#e0e0e0" }}>
            <Container >
                <Row className="text-start">
                    <NavLink style={{ textDecoration: "none" }} to={"/"}>Coupons System</NavLink> <br />
                    <NavLink style={{ textDecoration: "none", fontSize: 14 }} to={"/"}>Home</NavLink> <br />
                    <span> All right resereved {new Date().getFullYear()} </span>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;
