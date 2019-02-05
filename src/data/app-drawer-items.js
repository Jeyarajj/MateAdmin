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
    title: 'Scholarships',
    group: 'scholarships',
    icon: 'card_giftcard',
    items: [
      { title: 'Manage Scholarships', name: 'ManageScholarships' }
    ]
  },

  {
    title: 'Counsellors',
    group: 'counselors',
    icon: 'people',
    items: [
      { title: 'Manage Counsellors', name: 'CounselorsList' }
    ]
  },
  {
    title: 'Articles',
    group: 'articles',
    icon: 'help',
    items: [
      { title: 'Articles List', name: 'ArticlesList' },
      { title: 'Article Page', name: 'ArticlePage' }
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
      { title: 'Manage Articles', name: 'ManageArticles' },
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
      { title: 'Home Page', name: 'HomePage' },
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
