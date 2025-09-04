import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'components/MainCard';
import { TeacherAllocationTable, TeacherAllocationForm, PageHeader } from './components';
import {
  fetchTeacherAllocations,
  createTeacherAllocation,
  updateTeacherAllocation,
  deleteTeacherAllocation,
  TeacherAllocationData,
  TeacherAllocationPayload,
} from './api';

import { Teacher, Class, Subject, fetchClasses, fetchSubjects, fetchTeachers } from './api';

const initialAllocation: TeacherAllocationPayload = {
  staff_id: 0,
  classroom_id: 0,
  subjects: []
};

export default function TeacherAllocation() {
  const [allocations, setAllocations] = useState<TeacherAllocationData[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAllocation, setCurrentAllocation] = useState<TeacherAllocationPayload>(initialAllocation);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([fetchClasses(), fetchSubjects(), fetchTeachers(), fetchTeacherAllocations()])
      .then(([classData, subjectData, teacherData, allocationData]) => {
        setClasses(classData);
        setSubjects(subjectData);
        setTeachers(teacherData);
        setAllocations(allocationData);
      })
      .catch(() => setError('Failed to fetch'))
      .finally(() => setLoading(false));
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setCurrentAllocation(initialAllocation);
    setEditingId(null);
  };

  // Map names from allocation to IDs for editing
  const handleEdit = (allocation: TeacherAllocationData) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(allocation.id);

    const staff = teachers.find(
      t => `${t.first_name} ${t.last_name}`.trim() === allocation.teacher_name.trim()
    );
    const classroom = classes.find(c => c.name === allocation.classroom);

    // FIX: Map subject names to IDs
    const subjectIds = subjects
      .filter(s => allocation.subjects.includes(s.name))
      .map(s => s.id);

    setCurrentAllocation({
      id: allocation.id,
      staff_id: staff ? staff.id : 0,
      classroom_id: classroom ? classroom.id : 0,
      subjects: subjectIds
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentAllocation(initialAllocation);
    setEditingId(null);
  };

  const handleSave = async () => {
    setError(null);
    try {
      if (editMode && editingId !== null) {
        const payload: TeacherAllocationPayload = {
          id: editingId,
          staff_id: currentAllocation.staff_id,
          classroom_id: currentAllocation.classroom_id,
          subjects: currentAllocation.subjects
        };
        await updateTeacherAllocation(payload);
      } else {
        const { id, ...createPayload } = currentAllocation;
        await createTeacherAllocation(createPayload);
      }
      // Always refetch allocations after save
      const allocationData = await fetchTeacherAllocations();
      setAllocations(allocationData);
      handleClose();
    } catch (e) {
      setError('Failed to save allocation');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTeacherAllocation(id);
      const allocationData = await fetchTeacherAllocations();
      setAllocations(allocationData);
    } catch {
      setError('Failed to delete allocation');
    }
  };

  const handleChange = (field: keyof TeacherAllocationPayload, value: any) => {
    setCurrentAllocation(prev => ({
      ...prev,
      [field]: field === 'classroom_id' || field === 'staff_id' ? Number(value) : value
    }));
  };

  return (
    <Grid container spacing={3}>
      {/* Page Header */}
      <Grid item xs={12}>
        <MainCard>
          <PageHeader onAdd={handleOpen} />
        </MainCard>
      </Grid>

      <Grid item xs={12}>
        <MainCard title="Teacher Allocations">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : (
            <TeacherAllocationTable
              allocations={allocations}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </MainCard>
      </Grid>

      <TeacherAllocationForm
        open={open}
        editMode={editMode}
        currentAllocation={currentAllocation}
        teachers={teachers}
        classes={classes}
        subjects={subjects}
        allocations={allocations}
        onChange={handleChange}
        onClose={handleClose}
        onSave={handleSave}
      />
    </Grid>
  );
}
