import { Student } from "../StudentsManagement/api";
import { Class } from "../ClassesManagement/api";


// API utility for StudentAllocation
const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';


export interface StudentAllocation {
  id: number;
  student: {
    id: number;
    studentName: string;
    guardianName: string;
    guardianPhone: string;
    // will add other field when its needed
  };
  class_obj: {
    id: number;
    name: string;
    level: string;
    subjects: { id: number; name: string; status: string }[];
    scheduleDay: string;
    startTime: string;
    endTime: string;
    price: string;
    status: string;
  };
  allocatedDate: string;
}

export interface StudentAllocationPayload {
  student_id: number;
  class_obj_id: number;
}

// API Functions
export async function fetchStudents(): Promise<Student[]> {
  const res = await fetch(`${BASE_URL}/admin/students/`);
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
}

export async function fetchClasses(): Promise<Class[]> {
  const res = await fetch(`${BASE_URL}/admin/classes/`);
  if (!res.ok) throw new Error('Failed to fetch classes');
  return res.json();
}

export async function fetchStudentAllocations(classId?: number): Promise<StudentAllocation[]> {
  // Note: You may need to create this endpoint in your backend
  const url = classId
    ? `${BASE_URL}/admin/student_allocations/?class_id=${classId}`
    : `${BASE_URL}/admin/student_allocations/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch student allocations');
  return res.json();
}


export async function createStudentAllocation(payload: StudentAllocationPayload): Promise<StudentAllocation> {
  const res = await fetch(`${BASE_URL}/admin/student_allocations/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create student allocation');
  return res.json();
}

export async function updateStudentAllocation(id: number, payload: StudentAllocationPayload): Promise<StudentAllocation> {
  const res = await fetch(`${BASE_URL}/admin/student_allocations/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update student allocation');
  return res.json();
}

export async function deleteStudentAllocation(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/admin/student_allocations/${id}/`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete student allocation');
}

export type {Student,Class}

// Alias functions for easier importing
export const getStudents = fetchStudents;
export const getClasses = fetchClasses;
export const getStudentAllocations = fetchStudentAllocations;
export const allocateStudent = createStudentAllocation;
export const deallocateStudent = deleteStudentAllocation;