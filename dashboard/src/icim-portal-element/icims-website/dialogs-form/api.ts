import axios from 'axios';

export const fetchClasses = async () => {
  const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/admin/classrooms/`);
  return res.data || [];
};

export const submitRegistration = async (form: FormData) => {
  return axios.post(
    `${import.meta.env.VITE_APP_API_URL}/frontend/client/input/`,
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};
