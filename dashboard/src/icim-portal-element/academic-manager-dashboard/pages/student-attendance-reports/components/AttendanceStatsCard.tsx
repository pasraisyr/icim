// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// types
import type { AttendanceStatsCardProps } from '../api';

// ==============================|| ATTENDANCE STATS CARD ||============================== //

const AttendanceStatsCard = ({
  title,
  value,
  icon,
  color = 'primary',
  subtitle
}: AttendanceStatsCardProps) => {

  const getColor = () => {
    switch (color) {
      case 'success': return 'success.main';
      case 'warning': return 'warning.main';
      case 'error': return 'error.main';
      case 'info': return 'info.main';
      case 'secondary': return 'secondary.main';
      default: return 'primary.main';
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box 
              sx={{ 
                p: 1, 
                borderRadius: 1, 
                backgroundColor: `${getColor()}15`,
                color: getColor(),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {icon}
            </Box>
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography variant="h4" color={getColor()}>
                {value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AttendanceStatsCard;
