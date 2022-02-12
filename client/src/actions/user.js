import axios from "axios";

export const registration = async (name, email, password) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
      name,
      email,
      password
    });
    return response.data;
  } catch (e) {
    return e.response?.data.message ? e.response.data.message : e.message;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/auth/login`, {
      email,
      password
    });
    return response.data;
  } catch (e) {
    return e.response?.data.message ? e.response.data.message : e.message;
  }
};

export const auth = async () => {
  if (!localStorage.getItem('tocken')) return;
  try {
    const response = await axios.get(`http://localhost:5000/api/auth/auth`, {headers: {Authorization: `Bearer: ${localStorage.getItem('tocken')}`}});
    return response.data;
  } catch (e) {
    localStorage.removeItem('tocken');
    return e.response?.data.message ? e.response.data.message : e.message;
  }
};