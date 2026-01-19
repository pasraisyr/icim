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
  title: 'icims-website',
  icon: icons.home,
  type: 'group',
  children: [
    {
      id: 'icims-website-item',
      title: 'icims-website',
      type: 'item',
      url: '/icims-website',
      icon: icons.home,
      breadcrumbs: false
    },
    {
      id: 'admin-icims-dahboard',
      title: 'admin-icim-dashboard',
      type: 'item',
      url: '/admin-icims',
      icon: icons.home,
      breadcrumbs: true
    }
  ]
};

export default icimsWebsite;