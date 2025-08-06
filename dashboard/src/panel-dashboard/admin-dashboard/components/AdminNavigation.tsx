import { Fragment } from 'react';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

// project-imports
import NavGroup from 'layout/Dashboard/Drawer/DrawerContent/Navigation/NavGroup';
import NavItem from 'layout/Dashboard/Drawer/DrawerContent/Navigation/NavItem';
import { useGetMenuMaster } from 'api/menu';
import { MenuOrientation, HORIZONTAL_MAX_ITEM } from 'config';
import useConfig from 'hooks/useConfig';
import academicManagerMenuItems from '../menu/academic-manager-menu-items';

// types
import { NavItemType } from 'types/menu';

// ==============================|| ADMIN - NAVIGATION ||============================== //

export default function AdminNavigation() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
  const lastItemIndex = academicManagerMenuItems.items.length - 1;
  const remItems = academicManagerMenuItems.items.slice(0, lastItem || lastItemIndex).map((item, index) => ({
    ...item,
    items: item.children,
    ...(lastItem && index === lastItem - 1 && {
      id: `${item.id}-more`,
      title: 'More...',
      type: 'collapse',
      icon: undefined,
      children: academicManagerMenuItems.items.slice(lastItem).map((item: NavItemType) => ({
        ...item,
        title: item.title as string,
        type: 'item',
        url: item.url ? item.url : `/${item.id}`,
        breadcrumbs: false
      }))
    })
  }));

  const navGroups = academicManagerMenuItems.items.map((item, index) => {
    switch (item.type) {
      case 'group':
        if (item.url && item.id !== lastItemIndex.toString()) {
          return (
            <Fragment key={item.id}>
              {menuOrientation !== MenuOrientation.HORIZONTAL && <Divider sx={{ my: 0.5 }} />}
              <NavItem item={item} level={1} isParents />
            </Fragment>
          );
        }
        return (
          <NavGroup
            key={item.id}
            selectedID=""
            setSelectedID={() => {}}
            setSelectedItems={() => {}}
            setSelectedLevel={() => {}}
            selectedLevel={0}
            selectedItems=""
            lastItem={lastItem || 0}
            remItems={remItems}
            lastItemId={lastItemIndex.toString()}
            item={item}
          />
        );
      default:
        return (
          <Fragment key={item.id}>
            {menuOrientation !== MenuOrientation.HORIZONTAL && <Divider sx={{ my: 0.5 }} />}
            <NavItem item={item} level={1} isParents />
          </Fragment>
        );
    }
  });

  return (
    <Box
      sx={{
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        ...(!isHorizontal && {
          '& > *': {
            px: drawerOpen ? 1.25 : 1.5
          }
        })
      }}
    >
      {navGroups}
    </Box>
  );
}
