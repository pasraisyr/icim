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
    : allocations.filter(a => String(a.class_obj.id) === selectedClassId);

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
                <TableCell>Guardian Name</TableCell>
                <TableCell>Class Name</TableCell>
                <TableCell>Subjects</TableCell>
                <TableCell>Schedule</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Allocated Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAllocations.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.student.studentName}</TableCell>
                  <TableCell>{row.student.guardianName}</TableCell>
                  <TableCell>{row.class_obj.name}</TableCell>
                  <TableCell>{row.class_obj.subjects.map((sub) => sub.name).join(', ')}</TableCell>
                  <TableCell>{row.class_obj.scheduleDay} {row.class_obj.startTime} - {row.class_obj.endTime}</TableCell>
                  <TableCell>{row.class_obj.price}</TableCell>
                  <TableCell>{new Date(row.allocatedDate).toLocaleDateString()}</TableCell>
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
