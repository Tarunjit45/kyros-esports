import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';

// Components
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import Navbar from './components/navigation/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage'));
const Tournaments = lazy(() => import('./pages/Tournaments'));
const Teams = lazy(() => import('./pages/Teams'));
const Events = lazy(() => import('./pages/Events'));
const ValorantPage = lazy(() => import('./pages/ValorantPage'));
const CODPage = lazy(() => import('./pages/CODPage'));
const LeaguePage = lazy(() => import('./pages/LeaguePage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy load admin components
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/Dashboard').then(module => ({ default: module.AdminLayout })));
const Dashboard = lazy(() => import('./pages/admin/Dashboard').then(module => ({ default: module.Dashboard })));
const ContentManagement = lazy(() => import('./pages/admin/components/ContentManagement'));
const SiteSettings = lazy(() => import('./pages/admin/components/SiteSettings'));
const GamesManagement = lazy(() => import('./pages/admin/components/GamesManagement'));
const TeamsManagement = lazy(() => import('./pages/admin/components/TeamsManagement'));
const EventsManagement = lazy(() => import('./pages/admin/components/EventsManagement'));
const MediaManagement = lazy(() => import('./pages/admin/components/MediaManagement'));

const SuspenseFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <LoadingSpinner size="large" />
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gray-900">
        {!isAdminRoute && <Navbar />}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Suspense fallback={<SuspenseFallback />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/tournaments" element={<Tournaments />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/events" element={<Events />} />
                
                {/* Game Pages */}
                <Route path="/valorant" element={<ValorantPage />} />
                <Route path="/codm" element={<CODPage />} />
                <Route path="/lol" element={<LeaguePage />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <AdminProtectedRoute>
                      <AdminLayout />
                    </AdminProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="games" element={<GamesManagement />} />
                  <Route path="teams" element={<TeamsManagement />} />
                  <Route path="events" element={<EventsManagement />} />
                  <Route path="media" element={<MediaManagement />} />
                  <Route path="content" element={<ContentManagement />} />
                  <Route path="settings" element={<SiteSettings />} />
                </Route>
                
                {/* 404 - Keep this as the last route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </ErrorBoundary>
  );
};

// Main App component with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AppRoutes />
      </AdminProvider>
    </AuthProvider>
  );
}

// Wrap App with Router in a separate function
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
