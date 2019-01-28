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
import HomepageSettings from '@/views/pages/Settings/HomePage';
import Notify from '@/views/pages/Settings/Notify';
import ProfileSettings from '@/views/pages/Settings/ProfileSettings';
import SecurityPrivacy from '@/views/pages/Settings/SecurityPrivacy';

import InstitutionsList from '@/views/pages/Institution/InstitutionsList';
import CourseList from '@/views/pages/Courses/courses';
import InstitutionsBulkImport from '@/views/pages/Institution/institutionsBulkImport';
import ScholarshipsList from '@/views/pages/Scholarships/ScholarshipsList';

import ManageScholarships from '@/views/pages/Scholarships/ManageScholarships';

import CounselorsList from '@/views/pages/Counselors/CounselorsList';

import ManageAdPackages from '@/views/pages/Subscriptions/ManageAdPackages';

import ManageFairs from '@/views/pages/Events/ManageFairs';
import ManageWebinars from '@/views/pages/Events/ManageWebinars';

import ManageArticles from '@/views/pages/Content/ManageArticles';
import ManageComments from '@/views/pages/Content/ManageComments';
import ManageWebContent from '@/views/pages/Content/ManageWebContent';

import Invoice from '@/views/pages/Billing/Invoice';
import ViewPaymentGateway from '@/views/pages/Billing/ViewPaymentGateway';

import CustomReportsReview from '@/views/pages/Reports/CustomReportsReview';
import ReportsBulkDownload from '@/views/pages/Reports/ReportsBulkDownload';

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
    path: '/Institution/InstitutionsBulkImport',
    components: {
      default: InstitutionsBulkImport,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'institutions/InstitutionsBulkImport'
  },

  {
    path: '/Counselors/CounselorsList',
    components: {
      default: CounselorsList,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'counselors/CounselorsList'
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
    path: '/Institution/ScholarshipList',
    components: {
      default: ScholarshipsList,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'institutions/ScholarshipList'
  },

  {
    path: '/Scholarships/ManageScholarships',
    components: {
      default: ManageScholarships,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'scholarships/ManageScholarships'
  },

  {
    path: '/Subscriptions/ManageAdPackages',
    components: {
      default: ManageAdPackages,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'subscriptions/ManageAdPackages'
  },

  {
    path: '/Events/ManageFairs',
    components: {
      default: ManageFairs,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'events/ManageFairs'
  },

  {
    path: '/Events/ManageWebinars',
    components: {
      default: ManageWebinars,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'events/ManageWebinars'
  },

  {
    path: '/Content/ManageArticles',
    components: {
      default: ManageArticles,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'content/ManageArticles'
  },

  {
    path: '/Content/ManageWebContent',
    components: {
      default: ManageWebContent,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'content/ManageWebContent'
  },

  {
    path: '/Content/ManageComments',
    components: {
      default: ManageComments,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'content/ManageComments'
  },

  {
    path: '/Billing/Invoice',
    components: {
      default: Invoice,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'billing/Invoice'
  },

  {
    path: '/Billing/ViewPaymentGateway',
    components: {
      default: ViewPaymentGateway,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'billing/ViewPaymentGateway'
  },


  {
    path: '/Settings/HomepageSettings',
    components: {
      default: HomepageSettings,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'settings/HomepageSettings'
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
  },

  {
    path: '/Reports/CustomReportsReview',
    components: {
      default: CustomReportsReview,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'reports/CustomReportsReview'
  },

  {
    path: '/Reports/ReportsBulkDownload',
    components: {
      default: ReportsBulkDownload,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'reports/ReportsBulkDownload'
  }

];
