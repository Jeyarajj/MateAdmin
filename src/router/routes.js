// Pages
import LoginPage from '@/views/pages/Authentication/LoginPage';
import AppSidebar from '@/layouts/App/NavDrawer';
import AppToolbar from '@/layouts/App/Toolbar';
import AppFooter from '@/layouts/App/Footer';
import Dashboard from '@/views/Dashboard/Dashboardv1';
import ForgotPasswordPage from '@/views/pages/Authentication/ForgotPasswordPage';

// User Management
import UsersList from '@/components/UserManagement/userslist';
import UserRoles from '@/components/UserManagement/rolepermission';

// Settings
import HomepageSettings from '@/views/pages/Settings/HomePage';
import Notify from '@/views/pages/Settings/Notify';
import ProfileSettings from '@/views/pages/Settings/ProfileSettings';
import SecurityPrivacy from '@/views/pages/Settings/SecurityPrivacy';

import InstitutionsList from '@/views/pages/Institution/InstitutionsList';
import InstitutionsCourses from '@/views/pages/Institution/InstitutionsCourses';
//import CourseList from '@/views/pages/Courses/courses';

import Articles_List from '@/views/pages/Articles/articles_list';
import Article_Page from '@/views/pages/Articles/article_page';

import InstitutionsBulkImport from '@/views/pages/Institution/institutionsBulkImport';
import InstitutionsScholarships from '@/views/pages/Institution/InstitutionsScholarships';

import ManageScholarships from '@/views/pages/Scholarships/ManageScholarships';

import StudentsList from '@/views/pages/Students/StudentsList';
import Student from '@/views/pages/Students/Student';
import StudentsApplicationsList from '@/views/pages/Students/StudentsApplicationsList';
import CounselorsList from '@/views/pages/Counselors/CounselorsList';
import MentorsList from '@/views/pages/Mentors/MentorsList';

import MetaTags from '@/views/Settings/MetaTags';
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
    path: '/usersmanagement/usersList',
    components: {
      default: UsersList,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'usersmanagement/UsersList',
    meta: {
      authenticated: true
    }
  },
  {
    path: '/usersmanagement/userRoles',
    components: {
      default: UserRoles,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'usersmanagement/UserRoles',
    meta: {
      authenticated: true
    }
  },
  {
    path: '/articles/articles_List',
    components: {
      default: Articles_List,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'articles/Articles_List',
    meta: {
      authenticated: true
    }
  },
  {
    path: '/articles/article_Page/:mode?/:article_id?',
    components: {
      default: Article_Page,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'articles/Article_Page',
    meta: {
      authenticated: true
    }
  },

  {
    path: '/institution/institutionsList',
    components: {
      default: InstitutionsList,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'institutions/InstitutionsList',
    meta: {
      authenticated: true
    }
  },

  {
    path: '/institution/institutionsBulkImport',
    components: {
      default: InstitutionsBulkImport,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'institutions/InstitutionsBulkImport',
    meta: {
      authenticated: true
    }
  },

  {
    path: '/counselors/counselorsList',
    components: {
      default: CounselorsList,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'counselors/CounselorsList',
    meta: {
      authenticated: true
    }
  },
  {
    path: '/mentors/MentorsList',
    components: {
      default: MentorsList,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'mentors/MentorsList',
    meta: {
      authenticated: true
    }
  },
  {
    path: '/institution/institutionsCourses',
    components: {
      default: InstitutionsCourses,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'institutions/InstitutionsCourses'
  },

  {
    path: '/institution/institutionsScholarships',
    components: {
      default: InstitutionsScholarships,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'institutions/InstitutionsScholarships',
    meta: {
      authenticated: true
    }
  },

  {
    path: '/scholarships/manageScholarships',
    components: {
      default: ManageScholarships,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'scholarships/ManageScholarships'
  },

  {
    path: '/subscriptions/manageadpackages',
    components: {
      default: ManageAdPackages,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'subscriptions/ManageAdPackages'
  },

  {
    path: '/events/managefairs',
    components: {
      default: ManageFairs,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'events/ManageFairs'
  },

  {
    path: '/events/managewebinars',
    components: {
      default: ManageWebinars,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'events/ManageWebinars'
  },
  {
    path: '/students/studentsList',
    components: {
      default: StudentsList,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'students/StudentsList'
  },
  {
    path: '/studentProfile/:student_id',
    components: {
      default: Student,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'studentProfile/'
  },
  {
    path: '/students/studentsApplicationsList',
    components: {
      default: StudentsApplicationsList,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'students/StudentsApplicationsList'
  },

  {
    path: '/content/managearticles',
    components: {
      default: ManageArticles,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'content/ManageArticles'
  },

  {
    path: '/content/managewebcontent',
    components: {
      default: ManageWebContent,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'content/ManageWebContent'
  },

  {
    path: '/content/managecomments',
    components: {
      default: ManageComments,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'content/ManageComments'
  },

  {
    path: '/billing/invoice',
    components: {
      default: Invoice,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'billing/Invoice'
  },

  {
    path: '/billing/viewpaymentgateway',
    components: {
      default: ViewPaymentGateway,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'billing/ViewPaymentGateway'
  },

  {
    path: '/settings/homepagesettings',
    components: {
      default: HomepageSettings,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'settings/HomepageSettings'
  },

  {
    path: '/settings/notify',
    components: {
      default: Notify,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'settings/Notify'
  },
  {
    path: '/settings/metaTags',
    components: {
      default: MetaTags,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'settings/MetaTags'
  },

  {
    path: '/settings/profilesettings',
    components: {
      default: ProfileSettings,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'settings/ProfileSettings'
  },

  {
    path: '/settings/securityprivacy',
    components: {
      default: SecurityPrivacy,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'settings/SecurityPrivacy'
  },

  {
    path: '/reports/customreportsreview',
    components: {
      default: CustomReportsReview,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'reports/CustomReportsReview'
  },

  {
    path: '/reports/reportsbulkdownload',
    components: {
      default: ReportsBulkDownload,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    },
    name: 'reports/ReportsBulkDownload'
  }
];
