import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import RootLayout from './RootLayout';
import Home from '../pages/Home';
import VendorListing from '../pages/VendorListing';
import VendorDetails from '../pages/VendorDetails';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const vendorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vendors',
  component: VendorListing,
});

const vendorDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vendors/$id',
  component: VendorDetails,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: Signup,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  vendorsRoute,
  vendorDetailsRoute,
  loginRoute,
  signupRoute,
  dashboardRoute,
]);

export const router = createRouter({ routeTree });
