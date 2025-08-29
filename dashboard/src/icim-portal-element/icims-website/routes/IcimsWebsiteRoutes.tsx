import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

// project-imports
import Loadable from 'components/Loadable';
import IcimsWebsiteLayout from '../layout/IcimsWebsiteLayout';

// render - ICIMS website pages
const IcimsWebsite = Loadable(lazy(() => import('../IcimsWebsite')));

// ==============================|| ICIMS WEBSITE ROUTES ||============================== //

const IcimsWebsiteRoutes = {
  path: '/',
  element: <IcimsWebsiteLayout><Outlet /></IcimsWebsiteLayout>,
  children: [
    {
      path: 'icims-website',
      element: <IcimsWebsite />
    },
    {
      index: true,
      element: <IcimsWebsite />
    }
  ]
};

export { IcimsWebsiteRoutes };
export default IcimsWebsiteRoutes;
