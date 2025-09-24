import { Student } from "../StudentsManagement/api";
import { Class } from "../ClassesManagement/api";

// API utility for StudentAllocation
const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';

// Updated interface to match backend response
export interface StudentAllocation {
  id: number;
  student_id: number;
  student_name: string;
  student_email: string;
  classroom_id: number;
  classroom_name: string;
  updated_at: string;
}

export interface StudentAllocationPayload {
  student_id: number;
  classroom_id: number;
}

// API Functions
export async function fetchStudents(): Promise<Student[]> {
  const res = await fetch(`${BASE_URL}/admin/clients/`);
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
}

export async function fetchClasses(): Promise<Class[]> {
  const res = await fetch(`${BASE_URL}/admin/classrooms/`);
  if (!res.ok) throw new Error('Failed to fetch classes');
  return res.json();
}

// GET all allocations
export async function fetchStudentAllocations(): Promise<StudentAllocation[]> {
  const res = await fetch(`${BASE_URL}/admin/student_allocations/`);
  if (!res.ok) throw new Error('Failed to fetch student allocations');
  return res.json();
}

// GET single allocation by id
export async function fetchStudentAllocation(id: number): Promise<StudentAllocation> {
  const res = await fetch(`${BASE_URL}/admin/student_allocation/${id}/`);
  if (!res.ok) throw new Error('Failed to fetch student allocation');
  return res.json();
}

// POST create allocation
export async function createStudentAllocation(payload: StudentAllocationPayload): Promise<StudentAllocation> {
  const res = await fetch(`${BASE_URL}/admin/student_allocation_input/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create student allocation');
  return res.json();
}

// PUT update allocation
export async function updateStudentAllocation(id: number, payload: StudentAllocationPayload): Promise<StudentAllocation> {
  const res = await fetch(`${BASE_URL}/admin/student_allocation_edit/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...payload }),
  });
  if (!res.ok) throw new Error('Failed to update student allocation');
  return res.json();
}

// DELETE allocation
export async function deleteStudentAllocation(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/admin/student_allocation_delete/`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Failed to delete student allocation');
}

export type { Student, Class };

// Alias functions for easier importing
export const getStudents = fetchStudents;
export const getClasses = fetchClasses;
export const getStudentAllocations = fetchStudentAllocations;
export const getStudentAllocation = fetchStudentAllocation;
export const allocateStudent = createStudentAllocation;
export const editStudentAllocation = updateStudentAllocation;
export const deallocateStudent = deleteStudentAllocation;