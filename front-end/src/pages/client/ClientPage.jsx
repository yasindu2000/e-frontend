import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import Products from "./Products";
import ProductOverview from "./ProductOverview";
import Cart from "./Cart";
import CheckoutPage from "./CheckoutPage";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs"
import HomePage from "./HomePage"
import Reviews from "./Reviews"

function ClientPage() {
  return (
    <div className="w-full h-screen max-h-screen ">
        <Header/>
        <div className="w-full h-[calc(100%-100px)] mt-[150px]  ">
            <Routes path="/">
                <Route path="/" element={<HomePage/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/reviews" element={<Reviews/>}/>
                <Route path="/about-us" element={<AboutUs/>}/>
                <Route path="/contact-us" element={ <ContactUs key={Date.now()}/> }/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/overview/:productId" element={<ProductOverview/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/*" element={<h1 className="text-3xl text-center">404 Not Found</h1>}/>

            </Routes>
        </div>
    </div>
  )
}

export default ClientPage