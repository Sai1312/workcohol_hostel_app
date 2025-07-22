import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
export default api;

export const endpoints = {
  LogIn: `login/`,
  SetPassword: `passwordset/`,

  Token: `access_token/`,

  hostel: 'hostel/',

  students: `students/`,
  studentDetails: (id) => `students/${id}/`,

  hostelFees: 'hostelfees/',
  hostelFeeDetail: (id) => `hostelfees/${id}/`,

  rooms: 'rooms/',
  roomDetail: (id) => `rooms/${id}/`,

  staff: 'staff/',
  staffDetail: (id) => `staff/${id}/`,

  visitors: 'visitors/',
  visitorDetail: (id) => `visitors/${id}/`,

  outpasses: 'outpasses/',
  outpassDetail: (id) => `outpasses/${id}/`,
}



