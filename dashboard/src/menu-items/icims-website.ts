// assets
import { Home } from 'iconsax-react';

// types
import { NavItemType } from 'types/menu';

// icons
const icons = {
  home: Home
};

// ==============================|| MENU ITEMS - ICIMS WEBSITE ||============================== //

const icimsWebsite: NavItemType = {
  id: 'group-icims-website',
  title: 'ICIM Website',
  icon: icons.home,
  type: 'group',
  children: [
    {
      id: 'icims-website-item',
      title: 'ICIMS Website',
      type: 'item',
      url: '/icims-website',
      icon: icons.home,
      breadcrumbs: false
    },
    {
      id: 'admin-icims-dahboard',
      title: 'Admin ICIM Dashboard',
      type: 'item',
      url: '/admin-icims',
      icon: icons.home,
      breadcrumbs: true
    }
  ]
};

export default icimsWebsite;