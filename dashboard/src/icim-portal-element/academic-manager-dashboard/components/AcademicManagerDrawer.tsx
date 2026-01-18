import { useMemo } from 'react';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

// project-imports
import DrawerHeader from 'layout/Dashboard/Drawer/DrawerHeader';
import AcademicManagerDrawerContent from './AcademicManagerDrawerContent';
import MiniDrawerStyled from 'layout/Dashboard/Drawer/MiniDrawerStyled';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import { DRAWER_WIDTH } from 'config';

interface Props {
  window?: () => Window;
}

// ==============================|| ACADEMIC MANAGER DASHBOARD - DRAWER ||============================== //

export default function AcademicManagerDrawer({ window }: Props) {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened || false;

  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined;

  // header content
  const drawerContent = useMemo(() => <AcademicManagerDrawerContent />, []);
  const drawerHeader = useMemo(() => <DrawerHeader open={drawerOpen} />, [drawerOpen]);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="academic manager navigation">
      {!downLG ? (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={() => handlerDrawerOpen(!drawerOpen)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: drawerOpen ? 'block' : 'none', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px solid',
              borderColor: 'divider',
              backgroundImage: 'none',
              boxShadow: 'inherit'
            }
          }}
        >
          {drawerHeader}
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}
