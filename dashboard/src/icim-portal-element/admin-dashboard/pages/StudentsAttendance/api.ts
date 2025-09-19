import axios from 'axios';

// Base API configuration
const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
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


// API functions
export const attendanceAPI = {

  // Get all teachers (for teacher selection)
  getAllStudents: async (): Promise<any[]> => {
    try {
      const response = await api.get('/admin/clients/');
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

};
// Simple API for attendance form
export const simpleAttendanceAPI = {
  getStudents: async () => {
    return await attendanceAPI.getAllStudents();
  },
  
  getSubmittedAttendance: async (studentID?: string | number) => {
    // Fetch attendance records for a specific student using the admin endpoint
    if (!studentID) return [];
    const response = await api.get(`/admin/attendance/by_student/${studentID}/`);
    return response.data;
  },
};

export default attendanceAPI;
