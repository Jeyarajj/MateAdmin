// Pages
import LoginPage from '@/views/pages/Authentication/LoginPage';
import AppSidebar from '@/layouts/App/NavDrawer';
import AppToolbar from '@/layouts/App/Toolbar';
import AppFooter from '@/layouts/App/Footer';
import Dashboard from '@/views/Dashboard/Dashboardv1';
import ForgotPasswordPage from '@/views/pages/Authentication/ForgotPasswordPage';

// User Management
import UsersList from '@/components/UserManagement/userslist';
//import UsersRoles from '@/views/pages/UsersManagement/UsersRoles'
import UserRoles from '@/components/UserManagement/rolepermission';

// Settings
import HomePage from '@/views/pages/Settings/HomePage';
import Notify from '@/views/pages/Settings/Notify';
import ProfileSettings from '@/views/pages/Settings/ProfileSettings';
import SecurityPrivacy from '@/views/pages/Settings/SecurityPrivacy';
import InstitutionsList from '@/views/pages/Institution/InstitutionsList';
import scholarship from '@/views/pages/Scholarship/scholarship';
import CourseList from '@/views/pages/Courses/courses';
import Counseller from '@/views/pages/Counseller/counseller';

export const routes = [
  {
    path: '/',
    components: { default: LoginPage },
    name: 'LoginPage',
    meta: { layout: 'auth' }
  },
  {
    path: '/ForgotPassword',
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
    path: '/UsersManagement/UsersList',
    components: {
      default: UsersList,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'usersmanagement/UsersList'
  },
  {
    path: '/UsersManagement/UserRoles',
    components: {
      default: UserRoles,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'usersmanagement/UserRoles'
  },

  {
    path: '/Institution/InstitutionsList',
    components: {
      default: InstitutionsList,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'institutions/InstitutionsList'
  },
  {
    path: '/Institution/CourseList',
    components: {
      default: CourseList,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'institutions/CourseList'
  },

  {
    path: 'counsellor/counsellorlist',
    components: {
      default: Counseller,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'counsellor/counsellorlist'
  },
  {
    path: '/scholarships/ScholarshipsPage',
    components: {
      default: scholarship,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'scholarships/ScholarshipsPage'
  },

  {
    path: '/Settings/HomePage',
    components: {
      default: HomePage,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'settings/HomePage'
  },

  {
    path: '/Settings/Notify',
    components: {
      default: Notify,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'settings/Notify'
  },

  {
    path: '/Settings/ProfileSettings',
    components: {
      default: ProfileSettings,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'settings/ProfileSettings'
  },

  {
    path: '/Settings/SecurityPrivacy',
    components: {
      default: SecurityPrivacy,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'settings/SecurityPrivacy'
  }
];
