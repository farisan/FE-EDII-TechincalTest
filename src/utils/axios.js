import axios from "axios";

export const API = process.env.REACT_APP_URL;

export const REGISTER = (body) => {
  return axios.post(`${API}/auth/register`, body);
};

export const LOGIN = (body) => {
  return axios.post(`${API}/auth/login`, body);
};

export const ALL_USER = (token) => {
  return axios.get(`${API}/user/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const SEARCH_USER = (token, query) => {
  return axios.get(`${API}/user/search/dataUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: query
  });
};
export const PROFILE = (token) => {
  return axios.get(`${API}/user/getAccount`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UPDATE_BIODATA = (token, body) => {
  return axios.put(`${API}/user/edit/biodata`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const UPDATE_PENGALAMAN = (token, body) => {
  return axios.put(`${API}/user/edit/pekerjaan`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const UPDATE_PELATIHAN = (token, body) => {
  return axios.put(`${API}/user/edit/pelatihan`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const UPDATE_PENDIDIKAN = (token, body) => {
  return axios.put(`${API}/user/edit/pendidikan`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const TAMBAH_PEKERJAAN = (token, body) => {
  return axios.post(`${API}/user/tambah/pekerjaan`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const TAMBAH_PENDIDIKAN = (token, body) => {
  return axios.post(`${API}/user/tambah/pendidikan`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const TAMBAH_PELATIHAN = (token, body) => {
  return axios.post(`${API}/user/tambah/pelatihan`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const DELETE_JENIS = (jenis, token, id, idBiodata) => {
  return axios.delete(`${API}/user/delete-detail/${jenis}/${id}/${idBiodata}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const SOFT_DELETE_ACCOUNT = (token, id) => {
  return axios.patch(
    `${API}/user/delete-account/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
