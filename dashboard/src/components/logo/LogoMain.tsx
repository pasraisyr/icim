// material-ui
import { useTheme } from '@mui/material/styles';

import icimLogo from 'assets/images/logo-icim.jpg';


export default function LogoMain() {
  const theme = useTheme();

  return (

    <img
      src={icimLogo}
      alt="Icim Logo"
      style={{
        height: 'auto',
        width: 'auto',
        maxWidth: '60px',
        objectFit: 'contain'
      }}
    />


  );
}
