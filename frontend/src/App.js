import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShopScreen from './screens/ShopScreen/ShopScreen';
import ProductScreen from './screens/ProductScreen/ProductScreen';
import CartScreen from './screens/CartScreen/CartScreen';

import ShippingAddressScreen from './screens/ShippingAddressScreen/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrederScreen/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

import SearchScreen from './screens/SearchScreen/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListSreen/ProductListScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';

import ContactScreen from './screens/ContactScreen';
import AboutScreen from './screens/AboutScreen';
import DesignersScreen from './screens/DesignersScreen/DesignersScreen';
import DesignerScreen from './screens/DesignerScreen/DesignerScreen';
import ProductEditScreen from './screens/ProductEditScreen/ProductEditScreen';
import OrderListScreen from './screens/OrderListSreen/OrderListScreen';
import UserListScreen from './screens/UserListScreen/UserListScreen';
import UserEditScreen from './screens/UserEditScreen/UserEditScreen';
import DesignerListScreen from './screens/DesignerListScreen/DesignerListScreen';
import DesignerEditScreen from './screens/DesignerEditScreen/DesignerEditScreen';
import SigninScreen from './screens/SigninScereen';

import DesignersSearchScreen from './screens/DesignersSearchScreen/DesignersSearchScreen';
import { Store } from './Store';
import { useContext } from 'react';

function App() {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="bottom-center" limit={1} />

        <Routes>
          <Route path="/designers" element={<DesignersScreen />} />
          <Route path="/designer/:slug" element={<DesignerScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/signin" element={<SigninScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route
            path="/designers/search"
            element={<DesignersSearchScreen />}
          ></Route>

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            }
          />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderScreen />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/orderhistory"
            element={
              <ProtectedRoute>
                <OrderHistoryScreen />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
          <Route path="/payment" element={<PaymentMethodScreen />}></Route>
          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <DashboardScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UserListScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ProductListScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/designers"
            element={
              <AdminRoute>
                <DesignerListScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <OrderListScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/product/:id"
            element={
              <AdminRoute>
                <ProductEditScreen />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/designer/:id"
            element={
              <AdminRoute>
                <DesignerEditScreen />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/user/:id"
            element={
              <AdminRoute>
                <UserEditScreen />
              </AdminRoute>
            }
          ></Route>
          <Route path="/shop" element={<ShopScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
