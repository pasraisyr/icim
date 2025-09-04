import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TeacherAllocationPayload, Teacher, Class, Subject } from '../api';


interface TeacherAllocationFormProps {
  open: boolean;
  editMode: boolean;
  currentAllocation: TeacherAllocationPayload;
  teachers: Teacher[];
  classes: Class[];
  subjects: Subject[];
  allocations: any[]; // Add allocations prop
  onChange: (field: keyof TeacherAllocationPayload, value: any) => void;
  onClose: () => void;
  onSave: () => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TeacherAllocationForm = ({ 
  open, 
  editMode, 
  currentAllocation, 
  teachers,
  classes,
  subjects,
  allocations,
  onChange, 
  onClose, 
  onSave 
}: TeacherAllocationFormProps) => {
  // Get available subjects for the selected class
  const selectedClass = classes.find(c => c.id === currentAllocation.classroom_id);
  const availableSubjects = selectedClass ? selectedClass.subjects : [];
  // Find subjects already assigned to other teachers for the selected class
  const assignedSubjectIds = React.useMemo(() => {
    if (!selectedClass || !Array.isArray(allocations)) return [];
    return allocations
      .filter(a => a.classroom_id === currentAllocation.classroom_id && a.teacher.id !== currentAllocation.staff_id)
      .flatMap(a => a.subjects.map((s: Subject) => s.id));
  }, [allocations, currentAllocation.classroom_id, currentAllocation.staff_id, selectedClass]);

  const handleSubjectChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value;
    const selectedSubjectIds = typeof value === 'string' ? [parseInt(value)] : value;
    onChange('subjects', selectedSubjectIds);
  };
  

// console.log('teacher_id:', currentAllocation.teacher_id);
// console.log('class_obj_id:', currentAllocation.class_obj_id);
// console.log('classes:', classes);


  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editMode ? 'Edit Teacher Allocation' : 'Allocate Teacher'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Teacher"
            select
            fullWidth
            value={currentAllocation.staff_id || ''}
            onChange={(e) => onChange('staff_id', parseInt(e.target.value))}
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.first_name} {teacher.last_name}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField
            label="Class"
            select
            fullWidth
            value={currentAllocation.classroom_id || ''}
            onChange={(e) => {
              const classId = parseInt(e.target.value);
              onChange('classroom_id', classId);
              // Clear subjects when class changes
              onChange('subjects', []);
            }}
          >
            {classes.map((classData) => (
              <MenuItem key={classData.id} value={classData.id}>
                {classData.name} - {classData.level}
              </MenuItem>
            ))}
          </TextField>

          <FormControl fullWidth disabled={!currentAllocation.classroom_id}>
            <InputLabel>Subjects</InputLabel>
            <Select
              multiple
              value={currentAllocation.subjects}
              onChange={e => {
                const value = e.target.value;
                // value can be string[] or number[], so always convert to number[]
                const subjectIds = Array.isArray(value) ? value.map(v => Number(v)) : [];
                onChange('subjects', subjectIds);
              }}
              input={<OutlinedInput label="Subjects" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((subjectId) => {
                    const subject = availableSubjects.find(s => s.id === subjectId);
                    return (
                      <Chip key={subjectId} label={subject?.name || subjectId} size="small" />
                    );
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {subjects.map(subject => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
            {!currentAllocation.classroom_id && (
              <Box sx={{ mt: 1, color: 'text.secondary', fontSize: '0.75rem' }}>
                Please select a class first
              </Box>
            )}
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={onSave} 
          variant="contained"
          disabled={
            !currentAllocation.staff_id || 
            !currentAllocation.classroom_id ||
            currentAllocation.subjects.length === 0
          }
        >
          {editMode ? 'Update' : 'Allocate'} Teacher
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeacherAllocationForm;
