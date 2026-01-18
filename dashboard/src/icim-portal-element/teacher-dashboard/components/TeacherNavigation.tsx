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
import teacherMenuItems from '../menu/teacher-menu-items';

// types
import { NavItemType } from 'types/menu';

// ==============================|| TEACHER DASHBOARD - NAVIGATION ||============================== //

export default function TeacherNavigation() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened || false;

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
  let lastItemIndex = teacherMenuItems.items.length - 1;
  let remItems: NavItemType[] = [];
  let lastItemId: string;

  if (lastItem && lastItem < teacherMenuItems.items.length) {
    lastItemId = teacherMenuItems.items[lastItem - 1].id!;
    lastItemIndex = lastItem - 1;
    remItems = teacherMenuItems.items.slice(lastItem - 1, teacherMenuItems.items.length).map((item) => ({
      title: item.title,
      elements: item.children,
      icon: item.icon,
      ...(item.url && {
        url: item.url
      })
    }));
  }

  const navGroups = teacherMenuItems.items.slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case 'group':
        if (item.url && item.id !== lastItemId) {
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
            lastItem={lastItem!}
            remItems={remItems}
            lastItemId={lastItemId}
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
