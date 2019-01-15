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
    title: 'User',
    group: 'pages/authentication',
    icon: 'people',
    items: [
      { name: 'ManageUsers', title: 'ManageUsers' },
      { name: 'ManageRoles', title: 'ManageRoles' },
    ]
  },
  {
    title: 'Institutions',
    group: 'pages/Institutions',
    icon: 'text_fields',
    items: [
      { name: 'Manage Courses', title: 'Manage Courses' },
      { name: 'Manage Scholarship', title: 'Manage Scholarship' },
    ]
  },
  {
    title: 'Subscriptions',
    group: 'pages/Subscriptions',
    icon: 'insert_chart',
    items: [
      { name: 'Manage Ad Packages', title: 'Manage Ad Packages' },
    ]
  },

  {
    title: 'Events',
    group: 'pages/Events',
    icon: 'timer',
    items: [
      { name: 'Manage Fairs', title: 'Manage Fairs' },
      { name: 'Manage Webinars', title:'Manage Webinars'}
    ]
  },
  {
    title: 'Content',
    group: 'pages/Content',
    icon: 'collections',
    items: [
      { name: 'Manage Web Content', title: 'Manage Web Content' },
      { name: 'Manage Articles', title: 'Manage Articles' },
      { name: 'Manage Comments', title: 'Manage Comments' },
    ]
  },
  {
    title: 'Billing',
    group: 'pages/Billing',
    icon: 'attach_money',
    items: [
      { name: 'Invoices', title: 'Invoices' },
      { name: 'View Payment Gateways', title: 'View Payment Gateways' },
    ]
  },
  {
    title: 'Settings',
    group: 'pages/Billing',
    icon: 'build',
    items: [
      { name: 'Profile settings', title: 'Profile settings' },
      { name: 'Notification settings', title: 'Notification settings' },
      { name: 'Security & Privacy', title: 'Security & Privacy' },
      { name: 'HomePage settings', title: 'HomePage settings' },
    ]
  },
  {
    title: 'Reports',
    group: 'pages/Reports',
    icon: 'error',
    items: [
      { name: 'Custom Reports Preview', title: 'Custom Reports Preview' },
      { name: 'Bulk Download', title: 'Bulk Download' }
    ]
  },
  
]
