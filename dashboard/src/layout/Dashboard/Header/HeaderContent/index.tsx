import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// project-imports
import FullScreen from './FullScreen';
import Localization from './Localization';
import MegaMenuSection from './MegaMenuSection';
import Message from './Message';
import MobileSection from './MobileSection';
import Notification from './Notification';
import Profile from './Profile';
import Search from './Search';

// theme toggle components
import ThemeToggleButton from 'components/ThemeToggleButton';

import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/Dashboard/Drawer/DrawerHeader';

// assets
import { Profile2User } from 'iconsax-react';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const { menuOrientation } = useConfig();
  const navigate = useNavigate();

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const localization = useMemo(() => <Localization />, []);

  const megaMenu = useMemo(() => <MegaMenuSection />, []);

  const handleTeacherDashboard = () => {
    navigate('/teacher/classes');
  };

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {!downLG && <Search />}
      {!downLG && megaMenu}
      {!downLG && localization}
      {downLG && <Box sx={{ width: 1, ml: 1 }} />}

      {!downLG && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<Profile2User />}
          onClick={handleTeacherDashboard}
          sx={{ mr: 2 }}
        >
          Teacher Dashboard
        </Button>
      )}

      <ThemeToggleButton />
      <Notification />
      {!downLG && <FullScreen />}
      <Message />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
