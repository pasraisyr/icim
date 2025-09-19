import React, { useState } from 'react';
import { Button } from '@mui/material';
import ClassAttendanceDialog from './ClassAttendanceDialog';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

interface AttendanceTableProps {
  records: any[];
  students?: any[];
  selectedStudent?: string;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ records, students, selectedStudent }) => {
  // Debug: log raw attendance records
  console.log('AttendanceTable records:', records);

  let studentName = '';
  if (selectedStudent && students && students.length > 0) {
    const found = students.find((s: any) => String(s.id) === String(selectedStudent));
    // Prefer full name if available, fallback to name, then id
    studentName = found
      ? (found.name || (found.first_name && found.last_name ? `${found.first_name} ${found.last_name}` : found.id))
      : '';
  }

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);

  // Helper to get class name
  const getClassName = (record: any) => {
    if (record.classroom_name) return record.classroom_name;
    if (record.class_obj && typeof record.class_obj === 'object') {
      return record.class_obj.name || record.class_obj.className || record.class_obj.id;
    }
    return record.classroom_id || '';
  };

  const getStatus = (record: any) => {
    if (record.status) {
      return record.status;
    }
    return 'Unknown';
  };

  // Group records by date and class
  const grouped: { [key: string]: any[] } = {};
  records.forEach((rec: any) => {
    const key = `${rec.date}_${getClassName(rec)}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(rec);
  });

  // Prepare rows: one per class/date, map student IDs to names
  const rows = Object.entries(grouped).map(([key, group]) => {
    const first = group[0];
    return {
      date: first.date,
      className: getClassName(first),
      status: 'Submitted',
      statusAtt: getStatus(first),
      students: group.map((g: any) => ({
        name: g.student_name || g.name || g.student || g.id,
        status: g.status || '',
      })),
    };
  });

  const handleView = (row: any) => {
    setSelected(row);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <>
      <Box mt={5}>
        <Typography variant="h6" gutterBottom>Submitted Attendance Records</Typography>
        {studentName && (
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Student: {studentName}
          </Typography>
        )}
        {records.length === 0 ? (
          <Typography>No attendance records found.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
            <Table stickyHeader size="small" aria-label="attendance table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Status</TableCell>
                  {/* <TableCell>Actions</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any, idx: number) => {
                  return (
                    <TableRow key={row.date + '_' + row.className} hover>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.className}</TableCell>
                      <TableCell>{row.statusAtt}</TableCell>
                      {/* <TableCell>
                        <Button variant="outlined" size="small" onClick={() => handleView(row)}>
                          View
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <ClassAttendanceDialog
        open={open}
        onClose={handleClose}
        className={selected?.className || ''}
        date={selected?.date || ''}
        students={selected?.students || []}
      />
    </>
  );
};

export default AttendanceTable;