import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { StudentAllocation, Class } from '../api';

interface StudentsWithClassTableProps {
  allocations: StudentAllocation[];
  classes: Class[];
}

const StudentClassAllocationTable = ({ allocations, classes }: StudentsWithClassTableProps) => {
  const [selectedClassId, setSelectedClassId] = useState<string>('all');

  const filteredAllocations = selectedClassId === 'all'
    ? allocations
    : allocations.filter(a => String(a.classroom_id) === selectedClassId);

  return (
    <Box>
      <Box mb={2} display="flex" alignItems="center" gap={2}>
        <Select
          value={selectedClassId}
          onChange={e => setSelectedClassId(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="all">All Classes</MenuItem>
          {classes.map(cls => (
            <MenuItem key={cls.id} value={String(cls.id)}>{cls.name}</MenuItem>
          ))}
        </Select>
      </Box>
      {filteredAllocations.length === 0 ? (
        <Alert severity="info">No student allocations found.</Alert>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Student Email</TableCell>
                <TableCell>Class Name</TableCell>
                <TableCell>Allocated Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAllocations.map((allocation) => (
                <TableRow key={allocation.id}>
                  <TableCell>{allocation.student_name}</TableCell>
                  <TableCell>{allocation.student_email}</TableCell>
                  <TableCell>{allocation.classroom_name}</TableCell>
                  <TableCell>{new Date(allocation.updated_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default StudentClassAllocationTable;
