import axios from 'axios';

export const fetchClasses = async () => {
  const res = await axios.get('http://localhost:8000/api/Academic/classes/');
  return res.data || [];
};

export const submitRegistration = async (form: FormData) => {
  return axios.post(
    'http://localhost:8000/api/Frontend/self-registration/',
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};
