import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Edit, Trash, Profile2User } from 'iconsax-react';
import { Student } from '../api';

interface StudentsTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  getClassroomName: (student_id: number) => string;
}

const StudentsTable = ({ students, onEdit, onDelete, getClassroomName }: StudentsTableProps) => {
  const [search, setSearch] = useState('');

  // Filter students by name or IC (case-insensitive)
  const filteredStudents = students.filter(student =>
    (`${student.first_name} ${student.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
     (student.studentIC || '').toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="Search by student name or IC"
          variant="outlined"
          size="small"
          value={search}
          onChange={e => setSearch(e.target.value)}
          fullWidth
        />
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Student IC</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Guardian Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Enrollment Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Profile2User size={20} />
                    {student.first_name} {student.last_name}
                  </Stack>
                </TableCell>
                <TableCell>{student.studentIC}</TableCell>
                <TableCell>{getClassroomName(student.id) || "Not Allocate Yet"}</TableCell>
                <TableCell>{student.guardianName}</TableCell>
                <TableCell>{student.phone_number}</TableCell>
                <TableCell>{student.level}</TableCell>
                <TableCell>
                  <Chip 
                    label={student.status}
                    color={student.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{student.enrollmentDate}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton 
                      size="small" 
                      onClick={() => onEdit(student)}
                      color="primary"
                    >
                      <Edit size={16} />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => onDelete(student.id)}
                      color="error"
                    >
                      <Trash size={16} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentsTable;
