// project-imports
import academicManagement from './academic-management';
import icimsWebsite from './icims-website';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [icimsWebsite, academicManagement]
};

export default menuItems;
