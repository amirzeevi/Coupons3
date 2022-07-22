class Globals{

}

class DevelopmentGlobals extends Globals{
    public urls = {
        login: "http://localhost:8080/login",
        allCompanies: "http://localhost:8080/guest/companies",
        allCoupons: "http://localhost:8080/guest/coupons",
        
        
        
        adminAllCompanies: "http://localhost:8080/admin/company/all",
        addCompany: "http://localhost:8080/admin/company",
        getCompanyById: "http://localhost:8080/admin/company?companyId=",
        updateCompany: "http://localhost:8080/admin/company", 
        deleteCompany: "http://localhost:8080/admin/company/",

        addCustomer: "http://localhost:8080/admin/customer",
        allCustomers: "http://localhost:8080/admin/customer/all",
        getCustomerById: "http://localhost:8080/admin/customer?customerId=",
        updateCustomer: "http://localhost:8080/admin/customer",
        deleteCustomer: "http://localhost:8080/admin/customer/",

        getCompanyCoupons: "http://localhost:8080/company/coupon",
        getCompanyDetails: "http://localhost:8080/company/details",
        deleteCoupon: "http://localhost:8080/company/coupon/",
        addCoupon: "http://localhost:8080/company/coupon/",
        updateCoupon: "http://localhost:8080/company/coupon/",

        getCustomerCoupons: "http://localhost:8080/customer/all",
        getCustomerDetails: "http://localhost:8080/customer/details",
        customerPurchase: "http://localhost:8080/customer/purchase",
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        login: "/login",

        allCompanies: "/guest/companies",
        allCoupons: "/guest/coupons",

        addCompany: "/admin/company",
        adminAllCompanies: "/admin/company/all",
        updateCompany: "/admin/company",
        deleteCompany: "/admin/company?companyId=",

        addCustomer: "/admin/customer",
        allCustomers: "/admin/customer/all",
        updateCustomer: "/admin/customer",
        deleteCustomer: "/admin/customer?companyId=",

        getCompanyCoupons: "/company/coupon",
        getCompanyDetails: "/company/details",
        deleteCoupon: "/company/coupon/",
        addCoupon: "/company/coupon/",
        updateCoupon: "/company/coupon/",
        
        getCustomerCoupons: "/customer/all",
        getCustomerDetails: "/customer/details",
        customerPurchase: "/customer/purchase",
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals :  new DevelopmentGlobals;
export default globals;