import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { UserAdd } from 'iconsax-react';

interface PageHeaderProps {
  onAdd: () => void;
}

const PageHeader = ({ onAdd }: PageHeaderProps) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Stack spacing={1}>
      <Typography variant="h4" color="primary">
        Teacher Allocation
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Assign teachers to subjects and classes
      </Typography>
    </Stack>
    <Button 
      variant="contained" 
      startIcon={<UserAdd />}
      onClick={onAdd}
    >
      Allocate Teacher
    </Button>
  </Stack>
);

export default PageHeader;
