import axios from 'axios';

export const fetchClasses = async () => {
  const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/admin/classrooms/`);
  return res.data || [];
};

// Fetch dynamic other payments
export const fetchOtherPayments = async () => {
  const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/admin/other_payments/`);
  return res.data || [];
};

// Accepts a plain JS object, sends as JSON
export const submitRegistration = async (form: FormData) => {
  return axios.post(
    `${import.meta.env.VITE_APP_API_URL}/frontend/client_payment/input/`,
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};
