import { IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project-imports
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// assets
import { Moon, Sun1 } from 'iconsax-react';

// ==============================|| THEME TOGGLE BUTTON ||============================== //

export default function ThemeToggleButton() {
  const theme = useTheme();
  const { mode, onChangeMode } = useConfig();

  const handleToggle = () => {
    // Toggle between light and dark mode (excluding auto mode for simplicity)
    const newMode = mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    onChangeMode(newMode);
  };

  const isDark = mode === ThemeMode.DARK;

  return (
    <Tooltip title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}>
      <IconButton
        onClick={handleToggle}
        sx={{
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        {isDark ? <Sun1 size={20} /> : <Moon size={20} />}
      </IconButton>
    </Tooltip>
  );
}
