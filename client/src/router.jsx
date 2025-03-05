import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login.jsx';
import NotFound from './views/NotFound.jsx';
import Signup from './views/Signup.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Dashboard from './views/Dashboard.jsx';
import Users from './views/Users.jsx';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta de error 404 */}
                <Route path="*" element={<NotFound />} />

                {/* Ruta base */}
                <Route path='/' element={<Navigate to='/users' />} />

                {/* Rutas protegidas dentro de DefaultLayout */}
                <Route element={<DefaultLayout />}>
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='users' element={<Users />} />
                </Route>

                {/* Rutas públicas dentro de GuestLayout */}
                <Route element={<GuestLayout />}>
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}