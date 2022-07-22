import { Route, Routes } from "react-router-dom";
import NotFound from "../layout/notFound";
import AddCompany from "../users/admin/addCompany";
import AddCustomer from "../users/admin/addCustomer";
import Admin from '../users/admin/admin';
import DeleteCustomer from "../users/admin/deleteCustomer";
import GetAllCompanies from "../users/admin/getAllCompanies";
import GetAllCustomers from "../users/admin/getAllCustomers";
import UpdateCompany from "../users/admin/updateCompany";
import UpdateCustomer from "../users/admin/updateCustomer";
import AddCoupon from '../users/company/addCoupon';
import Company from "../users/company/company";
import GetCompanyCoupons from "../users/company/getCompanyCoupons";
import UpdateCoupon from '../users/company/updateCoupon';
import Customer from "../users/customer/customer";
import GetCustomerCoupons from "../users/customer/getCustomerCoupons";
import PurchaseCoupon from "../users/customer/purchaseCoupon";
import Login from "../login/login";
import Main from "../layout/main";
import UserDetails from "../users/userDetails";
import Cart from './../cart/cart';
import PrivateRoute from './privateRoute';

function CouponRouting(): JSX.Element {
  const types = { admin: "ADMINISTRATOR", company: "COMPANY", customer: "CUSTOMER" }

  return (
    <div className="couponRouting mt-5 mb-3">

      <Routes>
        <Route path='/' element={<Main />} />

        <Route path={'/admin'} element={
          <PrivateRoute clientType={types.admin}>
            <Admin  />
          </PrivateRoute>} />
        <Route path='/admin/addCompany' element={
          <PrivateRoute clientType={types.admin}>
            <AddCompany />
          </PrivateRoute>} />
        <Route path='/admin/updateCompany' element={
          <PrivateRoute clientType={types.admin}>
            <UpdateCompany />
          </PrivateRoute>} />
        <Route path='/admin/allCompanies' element={
          <PrivateRoute clientType={types.admin}>
            <GetAllCompanies />
          </PrivateRoute>} />
        <Route path='/admin/addCustomer' element={
          <PrivateRoute clientType={types.admin}>
            <AddCustomer />
          </PrivateRoute>} />
        <Route path='/admin/updateCustomer' element={
          <PrivateRoute clientType={types.admin}>
            <UpdateCustomer />
          </PrivateRoute>} />
        <Route path='/admin/deleteCustomer' element={
          <PrivateRoute clientType={types.admin}>
            <DeleteCustomer />
          </PrivateRoute>} />
        <Route path='/admin/allCustomers' element={
          <PrivateRoute clientType={types.admin}>
            <GetAllCustomers />
          </PrivateRoute>} />

        <Route path='/company' element={
          <PrivateRoute clientType={types.company}>
            <Company />
          </PrivateRoute>} />
        <Route path='/company/addCoupon' element={
          <PrivateRoute clientType={types.company}>
            <AddCoupon />
          </PrivateRoute>} />


        <Route path='/customer' element={
          <PrivateRoute clientType={types.customer}>
            <Customer />
          </PrivateRoute>} />


        <Route path='/userDetails' element={ <UserDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default CouponRouting;
