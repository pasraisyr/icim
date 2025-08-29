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
        Edit About Section
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Manage about description
      </Typography>
    </Stack>
    <Button 
      variant="contained" 
      startIcon={<Add />} 
      onClick={onAdd}
    >
      Add About
    </Button>
  </Stack>
);

export default PageHeader;
