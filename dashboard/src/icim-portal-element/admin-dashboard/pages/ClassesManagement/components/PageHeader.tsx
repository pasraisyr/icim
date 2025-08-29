import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Add } from 'iconsax-react';

interface PageHeaderProps {
  onAdd: () => void;
}

const PageHeader = ({ onAdd }: PageHeaderProps) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Stack spacing={1}>
      <Typography variant="h4" color="primary">
        Classes Management
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Manage class details, schedule, and subjects
      </Typography>
    </Stack>
    <Button 
      variant="contained" 
      startIcon={<Add />} 
      onClick={onAdd}
    >
      Add Class
    </Button>
  </Stack>
);

export default PageHeader;
