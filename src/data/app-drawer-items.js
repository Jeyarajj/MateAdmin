export default [
  { icon: 'dashboard', title: 'Home', name: 'dashboard' },

  {
    title: 'Users Management',
    group: 'usersmanagement',
    icon: 'account_circle',
    items: [
      { name: 'UserRoles', title: 'Manage User Roles' },
      { name: 'UsersList', title: 'Manage Users' }
    ]
  },

  {
    title: 'Institutions',
    group: 'institutions',
    icon: 'school',
    items: [
      { name: 'InstitutionsList', title: 'Manage Institutions' },
      { name: 'InstitutionsCourses', title: 'Manage Courses' },
      { name: 'InstitutionsScholarships', title: 'Manage Scholarship' },
      { name: 'InstitutionsBulkImport', title: 'Bulk Import' }
    ]
  },

  {
    title: 'Students',
    group: 'students',
    icon: 'card_giftcard',
    items: [
      { title: 'Students List', name: 'StudentsList' },
      { title: 'Students Applications', name: 'StudentsApplicationsList' }
    ]
  },

  {
    title: 'Counselors',
    group: 'counselors',
    icon: 'supervisor_account',
    items: [
      { title: 'Manage Counselors', name: 'CounselorsList' }
    ]
  },
  {
    title: 'Mentors',
    group: 'mentors',
    icon: 'accessibility',
    items: [
      { title: 'Manage Mentors', name: 'MentorsList' }
    ]
  },
  {
    title: 'Articles',
    group: 'articles',
    icon: 'rate_review',
    items: [
      { title: 'Articles List', name: 'Articles_List' },
      { title: 'Article Page', name: 'Article_Page' }
    ]
  },

  {
    title: 'Subscriptions',
    group: 'subscriptions',
    icon: 'subscriptions',
    items: [
      { title: 'Manage Ad Packages', name: 'ManageAdPackages' }
    ]
  },

  {
    title: 'Events',
    group: 'events',
    icon: 'event',
    items: [
      { title: 'Manage Fairs', name: 'ManageFairs' },
      { title: 'Manage Webinars', name: 'ManageWebinars' }
    ]
  },

  {
    title: 'Content',
    group: 'content',
    icon: 'ballot',
    items: [
      { title: 'Manage Web Content', name: 'ManageWebContent' },
      { title: 'Manage Comments', name: 'ManageComments' }
    ]
  },

  {
    title: 'Billing',
    group: 'billing',
    icon: 'receipt',
    items: [
      { title: 'Invoice', name: 'Invoice' },
      { title: 'View Payment Gateway', name: 'ViewPaymentGateway' }
    ]
  },

  {
    title: 'Settings',
    group: 'settings',
    icon: 'settings',
    items: [
      { title: 'Homepage Settings', name: 'HomepageSettings' },
      { title: 'Notifications', name: 'Notify' },
      { title: 'Profile', name: 'ProfileSettings' },
      { title: 'Security & Privacy', name: 'SecurityPrivacy' },
      { title: 'Meta Tags', name: 'MetaTags' }
    ]
  },

  {
    title: 'Reports',
    group: 'reports',
    icon: 'info',
    items: [
      { title: 'Custom Reports Review', name: 'CustomReportsReview' },
      { title: 'Bulk Download', name: 'ReportsBulkDownload' }
    ]
  }
];
