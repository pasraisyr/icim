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
        Other Payments
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Set Up and manage other payment items for students.
      </Typography>
    </Stack>
    <Button 
      variant="contained" 
      startIcon={<Add />} 
      onClick={onAdd}
    >
      Add Other Payment
    </Button>
  </Stack>
);

export default PageHeader;
