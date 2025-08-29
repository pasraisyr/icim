// ==============================|| ICIMS WEBSITE MENU ITEMS ||============================== //

const icimsWebsiteMenuItems = {
  id: 'icims-website',
  title: 'ICIMS Website',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '#home',
      icon: 'home'
    },
    {
      id: 'about',
      title: 'About Us',
      type: 'item',
      url: '#about',
      icon: 'info'
    },
    {
      id: 'programs',
      title: 'Programs',
      type: 'item',
      url: '#programs',
      icon: 'school'
    },
    {
      id: 'registration',
      title: 'Registration',
      type: 'item',
      url: '#registration',
      icon: 'person_add'
    },
    {
      id: 'contact',
      title: 'Contact',
      type: 'item',
      url: '#contact',
      icon: 'contact_mail'
    }
  ]
};

export default icimsWebsiteMenuItems;
