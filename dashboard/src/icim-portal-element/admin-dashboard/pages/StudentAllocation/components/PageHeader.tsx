import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const PageHeader = () => (
  <Stack spacing={1}>
    <Typography variant="h4" color="primary">
      Student Allocation
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Select a class and allocate students efficiently
    </Typography>
  </Stack>
);

export default PageHeader;
