import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { Profile2User, UserRemove } from 'iconsax-react';
import { StudentAllocation } from '../api';

interface AllocatedStudentsTableProps {
  allocations: StudentAllocation[];
  selectedAllocations: number[];
  onAllocationSelect: (allocationId: number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onDeallocateStudents: () => void;
}

const AllocatedStudentsTable = ({ 
  allocations, 
  selectedAllocations, 
  onAllocationSelect, 
  onSelectAll, 
  onDeallocateStudents 
}: AllocatedStudentsTableProps) => {
  const isAllSelected = selectedAllocations.length === allocations.length && allocations.length > 0;
  const isIndeterminate = selectedAllocations.length > 0 && selectedAllocations.length < allocations.length;

  if (allocations.length === 0) {
    return (
      <Alert severity="info">
        No students currently allocated to this class.
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Checkbox
            checked={isAllSelected}
            indeterminate={isIndeterminate}
            onChange={(e) => onSelectAll(e.target.checked)}
          />
          <Typography variant="body2">
            Select All ({selectedAllocations.length} selected)
          </Typography>
        </Stack>
        <Button
          variant="outlined"
          color="error"
          startIcon={<UserRemove />}
          onClick={onDeallocateStudents}
          disabled={selectedAllocations.length === 0}
        >
          Remove Selected
        </Button>
      </Stack>
      <Divider />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">Select</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Allocated Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allocations.map((allocation) => (
              <TableRow key={allocation.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllocations.includes(allocation.id)}
                    onChange={(e) => onAllocationSelect(allocation.id, e.target.checked)}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Profile2User size={20} />
                    {allocation.student.first_name} {allocation.student.last_name}
                  </Stack>
                </TableCell>
                <TableCell>
                  {new Date(allocation.allocatedDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default AllocatedStudentsTable;
