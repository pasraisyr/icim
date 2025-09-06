// Utility to get subjects for a class
import type { Subject } from '../SubjectsManagement/api';
import type { Class} from '../ClassesManagement/api';
import type { Teacher } from '../TeachersManagement/api';
const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';

export interface TeacherAllocationData {
  classroom: string;
  teacher_name: string;
  id: number;
  staff_id: number;
  classroom_id: number;
  subjects: string[]; 
}

export interface TeacherAllocationPayload {
  id?: number; // optional for create
  staff_id: number;
  classroom_id: number;
  subjects: number[]; // array of subject IDs
}


export async function fetchTeacherAllocations(): Promise<TeacherAllocationData[]> {
  const res = await fetch(`${BASE_URL}/admin/teacher_allocations/`);
  if (!res.ok) throw new Error('Failed to fetch teacher allocations');
  return res.json();
}

export async function createTeacherAllocation(payload: TeacherAllocationPayload): Promise<TeacherAllocationData> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/teacher_allocation/input/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to create teacher allocation');
  return res.json();
}

export async function updateTeacherAllocation(payload: TeacherAllocationPayload): Promise<TeacherAllocationData> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/teacher_allocation/edit/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update teacher allocation');
  return res.json();
}

export async function deleteTeacherAllocation(id: number): Promise<{ message: string }> {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/admin/teacher_allocation/delete/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ id })
  });
  if (!res.ok) throw new Error('Failed to delete teacher allocation');
  return res.json();
}

// Utility fetchers for dropdowns
export async function fetchSubjects(): Promise<Subject[]> {
  const res = await fetch(`${BASE_URL}/admin/subject/`);
  if (!res.ok) throw new Error('Failed to fetch subjects');
  return res.json();
}

export async function fetchTeachers(): Promise<Teacher[]> {
  const res = await fetch(`${BASE_URL}/admin/staffs/`);
  if (!res.ok) throw new Error('Failed to fetch teachers');
  return res.json();
}

export async function fetchClasses(): Promise<Class[]> {
  const res = await fetch(`${BASE_URL}/admin/classrooms/`);
  if (!res.ok) throw new Error('Failed to fetch classes');
  return res.json();
}

// Types for dropdowns
export type { Subject } from '../SubjectsManagement/api';
export type { Class } from '../ClassesManagement/api';
export type { Teacher } from '../TeachersManagement/api';