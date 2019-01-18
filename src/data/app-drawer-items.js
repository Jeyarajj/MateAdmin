export default [
  { header: 'App' },
  // {
  //   title: 'Dashboard',
  //   group: 'dashboard',
  //   icon: 'dashboard',
  //   items: [
  //     { name: 'Dashboardv1', title: 'Dashboard V1', prependIcon: 'dashboard' }
  //   ]
  // },
  { icon: 'dashboard', title: 'Home', name: 'Dashboard' },
  
  {
    title: 'Users Management',
    group: 'usersmanagement',
    icon: 'error',
    items: [
      { name: 'UsersRoles', title: 'Manage User Roles' },
      { name: 'UsersList', title: 'Manage Users' }
    ]
  },

  {
    title: 'Institutions',
    group: 'institutions',
    icon: 'error',
    items: [
      { name: 'InstitutionsOverview', title: 'Overview' },
      { name: 'InstitutionsList', title: 'Manage Institutions' },
      { name: 'ManageCourses', title: 'Manage Courses' },
      { name: 'Institutionsbulkimport', title: 'Bulk Import' }
    ]
  },

  // { header: 'Users Management' },
  // { icon: 'chat', name: 'UsersList', title: 'Users List' },
  // { icon: 'chat', name: 'UsersRoles', title: 'Users Roles' },

  {
    title: 'Students',
    group: 'students',
    icon: 'help',
    items: [
      { title: 'Students List', name: 'StudentsList' },
      { title: 'Students Applications', name: 'StudentsApplications' }
    ]
  },

  {
    title: 'Counsellor',
    group: 'counsellor',
    icon: 'help',
    items: [
      { title: 'Students Applications Process', name: 'StudentApplicationsprocess' },
      { title: 'Students Request', name: 'StudentRequest' }
    ]
  },

  {
    title: 'Content',
    group: 'content',
    icon: 'help',
    items: [
      { title: 'Manage Web Content', name: 'ManageWebContent' },
      { title: 'Manage Articles', name: 'ManageArticles' },
      { title: 'Manage Comments', name: 'ManageComments' }
    ]
  },

  {
    title: 'Settings',
    group: 'settings',
    icon: 'help',
    items: [
      { title: 'Home Page', name: 'HomePage' },
      { title: 'Notifications', name: 'Notify' },
      { title: 'Profile', name: 'ProfileSettings' },
      { title: 'Security & Privacy', name: 'SecurityPrivacy' }
    ]
  },

  {
    title: 'Scholarships',
    group: 'scholarships',
    icon: 'help',
    items: [
      { title: 'Scholarships', name: 'ScholarshipsPage' }
    ]
  },
  
]
