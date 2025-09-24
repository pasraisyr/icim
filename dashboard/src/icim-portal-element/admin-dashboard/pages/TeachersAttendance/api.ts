import axios from 'axios';

// Base API configuration
const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface AttendanceRecord {
  id: number;
  session: number;
  student: number;
  status: 'present' | 'absent' | 'late' | 'excused';
  time_marked?: string;
  notes?: string;
  marked_by: number;
}

export interface StudentForAttendance {
  id: number;
  name: string;
  ic: string;
  guardian_name: string;
  guardian_phone: string;
  status: string;
  enrollment_date: string;
  allocated_date: string;
  address: string;
}

export interface ClassForAttendance {
  id: number;
  name: string;
  room: string;
  schedule: string;
}

export interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  // Add other fields as needed
}

// Use fetchTeachers instead of axios for getting teachers
export async function fetchTeachers(): Promise<Teacher[]> {
  const res = await fetch(`${BASE_URL}/admin/staffs/`);
  if (!res.ok) throw new Error('Failed to fetch teachers');
  return res.json();
}

// API functions
export const attendanceAPI = {
  // Get all teachers (for teacher selection)
  getAllTeachers: async (): Promise<Teacher[]> => {
    return await fetchTeachers();
  },
};

// Simple API for attendance form
export const simpleAttendanceAPI = {
  getTeachers: async () => {
    return await attendanceAPI.getAllTeachers();
  },

  getSubmittedAttendance: async (teacherID?: string | number) => {
    // Fetch attendance records for a specific teacher
    if (!teacherID) return [];
    const response = await api.get(`/Academic/teachers/${teacherID}/attendance/list/`);
    return response.data;
  },
};

export default attendanceAPI;
