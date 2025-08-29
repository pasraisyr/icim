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

import { Teacher,Class,Subject,fetchClasses,fetchSubjects,fetchTeachers } from './api';

const initialAllocation: TeacherAllocationPayload = {
  teacher_id: 0,
  class_obj_id: 0,
  subject_ids: []
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
  };


  const handleEdit = (allocation: TeacherAllocationData) => {
    setOpen(true);
    setEditMode(true);
    setEditingId(allocation.id);
    setCurrentAllocation({
      teacher_id: allocation.teacher.id,
      class_obj_id: allocation.class_obj.id,
      subject_ids: allocation.subjects.map(subject => subject.id)
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentAllocation(initialAllocation);
    setEditingId(null);
  };


  const handleSave = async () => {
    try {
    if (editMode && editingId !== null) {
      const updated = await updateTeacherAllocation(editingId, currentAllocation);
      setAllocations(allocations.map(allocation =>
        allocation.id === editingId ? updated : allocation
      ));
    } else {
      const created = await createTeacherAllocation(currentAllocation);
      setAllocations([...allocations, created]);
    }
    handleClose();
     } catch (e) {
      setError('Failed to save allocation');
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTeacherAllocation(id);
    setAllocations(allocations.filter(allocation => allocation.id !== id));
  };



  const handleChange = (field: keyof TeacherAllocationPayload, value: any) => {
  setCurrentAllocation(prev => ({
    ...prev,
    [field]: field === 'class_obj_id' ? Number(value) : value
  }));
};

  const getSubjectNames = (subjects: Subject[]): string[] => {
    return subjects.map(subject => subject.name);
  };

  const getTeacherName = (teacher: Teacher): string => {
    return teacher.name;
  };

  const getClassName = (classObj: Class): string => {
    return classObj.name;
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
        <MainCard title="Classes List">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : (
            <TeacherAllocationTable 
              allocations={allocations} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
              getSubjectNames={getSubjectNames}
              getTeacherName={getTeacherName}
              getClassName={getClassName}
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
