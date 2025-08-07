// material-ui
import { useTheme } from '@mui/material/styles';

// project imports
import icimLogo from 'assets/images/logo-icim.jpg';



// ==============================|| LOGO ICON ||============================== //

export default function LogoIcon() {
  const theme = useTheme();

  return (

    <img
      src={icimLogo}
      alt="Icim Logo"
      style={{
        height: '34px',
        width: 'auto',
        maxWidth: '48px',
        objectFit: 'contain'
      }}
    />


  );
}
