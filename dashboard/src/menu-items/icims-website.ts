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
  id: 'icims-website',
  title: 'ICIMS Website',
  type: 'group',
  children: [
    {
      id: 'icims-website-item',
      title: 'ICIMS Website',
      type: 'item',
      url: '/icims-website',
      icon: icons.home,
      breadcrumbs: false
    }
  ]
};

export default icimsWebsite;