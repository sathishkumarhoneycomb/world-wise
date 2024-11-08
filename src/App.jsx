import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// import Homepage from "./pages/HomePage.jsx";
// import Product from "./pages/Product.jsx";
// import Pricing from "./pages/Pricing.jsx";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login.jsx";
// import AppLayout from "./pages/AppLayout.jsx";

const Homepage = lazy(() => {
  return import("./pages/HomePage.jsx");
})
const Product = lazy(() => {
  return import('./pages/Product.jsx');
});

const Pricing = lazy(() => {
  return import('./pages/Pricing.jsx');
})


const PageNotFound = lazy(() => import('./pages/PageNotFound.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const AppLayout = lazy(() => import('./pages/AppLayout.jsx'));



import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";




import { CitiesProvider } from "./context/CitiesContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";


function App() {

  return (
    <AuthProvider>
        <CitiesProvider>
    <BrowserRouter>
    <Suspense fallback={<SpinnerFullPage />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
    
        <Route path="/app" element={<ProtectedRoute> 
          <AppLayout />
         </ProtectedRoute>}>
          <Route index element={<Navigate replace to="cities" />} />

          <Route path="cities" element={ <CityList />} />
          <Route path="form" element={<Form />} />
          <Route path="cities/:cityId" element={<City />} />

          <Route path="countries" element={ <CountryList  /> } />
 
       </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>

  );
}

export default App;
