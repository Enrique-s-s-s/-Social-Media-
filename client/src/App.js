import React, { Suspense, lazy } from 'react';
import './styles/global.css';
import './styles/profile.css';
import './styles/explore.css';
import './styles/auth.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedComponent';
import Navbar from './layouts/navbar';
import Footer from './layouts/footer';

const HomePage = lazy(() => import('./pages/home'));
const ExplorePage = lazy(() => import('./pages/explore'));
const ProfilePage = lazy(() => import('./pages/profile'));
const PostPage = lazy(() => import('./pages/post'));
const SettingsPage = lazy(() => import('./pages/settings'));
const LoginPage = lazy(() => import('./pages/auth/login'));
const RegisterPage = lazy(() => import('./pages/auth/register'));


function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Suspense fallback={ 
            <div className="loading-container">
              <div className="spinner"></div> 
              <p>Loading...</p>
             </div>
            }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage/></ProtectedRoute>} />
              <Route path="/explore" element={<ProtectedRoute><ExplorePage/></ProtectedRoute>} />
              <Route path="/post/:id" element={<ProtectedRoute><PostPage/></ProtectedRoute>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </div>
  );
}

const Layout = ({ children }) => {
  const location = useLocation();

  const noHeaderFooterRoutes = ['/login', '/register'];

  return (
    <>
      {!noHeaderFooterRoutes.includes(location.pathname) && <Navbar />}
      {children}
      {!noHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
