import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './home/Home';
import Login from './user/Login';
import Register from './user/Register';
import Dashboard from './user/Dashboard';
import { PrivateRoutes, } from '../utils/PrivateRoutes';
import { AdminRoutes } from '../utils/AdminRoute';
import AdminDashboard from './admin/AdminDashboard';
import CreateCategory from './admin/CreateCategory';
import CreateProduct from './admin/CreateProduct';
import { ProductDetails } from './home/ProductDetails';
import Cart from './order/Cart';
import ShippingAddress from './order/ShippingAddress';
import Checkout from './order/Checkout';
import Payment from './order/Payment';
import OAuthCallback from './user/AuthCallback';


const Main = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route element={<PrivateRoutes />}>
                    <Route path='/user/dashboard' element={<Dashboard />} />
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/shipping' element={<ShippingAddress/>}/>
                    <Route path='/checkout' element={<Checkout/>}/>
                    <Route path='/payment' element={<Payment/>}/>
                </Route>
                <Route element={<AdminRoutes />}>
                    <Route path='/admin/dashboard' element={<AdminDashboard />} />
                    <Route path='/create/category' element={<CreateCategory/>}/>
                    <Route path='/create/product' element={<CreateProduct/>}/>

                </Route>
                <Route path='/product/:id' element={<ProductDetails/>}/>
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </div>
    );
}

export default Main;
