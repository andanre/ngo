import api from './axiosInstace';

//FETCHH DATABASE TO DASHBOARD

export const fetchData = async (endpoint: string) => {
  const response = await api.get(endpoint);
  return response.data;
};

export const addData = async (endpoint: string, data: any) => {
  const response = await api.post(endpoint, data);
  return response.data;
};

export const updateData = async (endpoint: string, data: any) => {
  const response = await api.put(endpoint, data);
  return response.data;
};

export const deleteData = async (endpoint: string) => {
  const response = await api.delete(endpoint);
  return response.data;
};



