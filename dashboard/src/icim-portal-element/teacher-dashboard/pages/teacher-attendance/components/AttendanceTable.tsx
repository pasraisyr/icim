import React, { useState } from 'react';
import { Button } from '@mui/material';
import ClassAttendanceDialog from './ClassAttendanceDialog';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

interface AttendanceTableProps {
  records: any[];
  students: any[];
  classes: any[];
  selectedTeacher?: string;
  teachers?: any[];
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ records, students, classes, selectedTeacher, teachers }) => {
  let teacherName = '';
  if (selectedTeacher && teachers && teachers.length > 0) {
    const found = teachers.find((t: any) => String(t.id) === String(selectedTeacher));
    teacherName = found ? found.name : '';
  }
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);

  // Helper to get class name
  const getClassName = (record: any) => {
    return record.classroom_name || 
           (classes.find((c: any) => c.id === record.classroom_id)?.name) ||
           record.classroom_id;
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
      students: group.map((g: any) => ({
        name: g.student_name || g.student_id,
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

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    // Try to format as YYYY-MM-DD
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString();
    }
    return dateStr;
  };

  return (
    <>
      <Box mt={5}>
        <Typography variant="h6" gutterBottom>Submitted Attendance Records</Typography>
        {teacherName && (
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Teacher: {teacherName}
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
                  <TableCell>Students</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => (
                  <TableRow key={row.date + '_' + row.className} hover>
                    <TableCell>{formatDate(row.date)}</TableCell>
                    <TableCell>{row.className}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" onClick={() => handleView(row)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
