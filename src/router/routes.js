// Pages
import LoginPage from '@/views/pages/Authentication/LoginPage';
import AppSidebar from '@/layouts/App/NavDrawer';
import AppToolbar from '@/layouts/App/Toolbar';
import AppFooter from '@/layouts/App/Footer';
import Dashboard from '@/views/Dashboard/Dashboardv1';
import ForgotPasswordPage from '@/views/pages/Authentication/ForgotPasswordPage';
import RolePermission from '@/components/User/rolepermission';
export const routes = [
  {
    path: '/',
    components: { default: LoginPage },
    name: 'LoginPage',
    meta: { layout: 'auth' }
  },
  {
    path: '/pages/authentication/forgot-password',
    components: { default: ForgotPasswordPage },
    name: 'ForgotPasswordPage',
    meta: { layout: 'auth' }
  },
  {
    path: '/dashboard',
    components: {
      default: Dashboard,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'dashboard',
    meta: {
      authenticated: true
    }
  },
  {
    path: '/pages/authentication/ManageRoles',
    name: 'pages/authentication/ManageRoles',
    components: {
      default: RolePermission,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    meta: {
      authenticated: true
    }
  }
  // children: [{
  //   path: 'roles',
  //   component: RolePermission
  // }]
  // }
];
