import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Add } from 'iconsax-react';

interface PageHeaderProps {
  onAdd: () => void;
}

const PageHeader = ({ onAdd }: PageHeaderProps) => (
  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
    <Typography variant="h5">Students Management</Typography>
    <Button variant="contained" startIcon={<Add />} onClick={onAdd}>
      Add Student
    </Button>
  </Stack>
);

export default PageHeader;
