import axios from "axios";
import { apiDrivers } from "../constants/api";


export const getDriverDetailsService = (i, id) => {
  return new Promise(async (reslove, reject) => {
    const config = {
      headers: { 'Authorization': `Bearer ${i}` }
    };
    await axios
      .get(`${apiDrivers}${id}`,
        config
      ).then((res) => {
        reslove(res)
      }).catch((error) => reject(error))
  })
}

export const getDriverlistService = (i) => {
  return new Promise(async (reslove, reject) => {
    const config = {
      headers: { 'Authorization': `Bearer ${i}` }
    };
    await axios
      .get(
        `${apiDrivers}`,
        config
      ).then((res) => {
        reslove(res)
      }).catch((error) => reject(error))
  })
}


export const createDriverService = (data, token) => {
  return new Promise(async (reslove, reject) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    await axios
      .post(`${apiDrivers}`,
        data,
        config
      ).then((res) => {
         reslove(res)
      }).catch((error) => {
        reject(error);
      }
      )
  })
}

export const updateDriverService = (id,data,token) => {
  return new Promise(async (reslove, reject) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    await axios
      .put(`${apiDrivers}${id}`,
        data,
        config
      ).then((res) => {
        reslove(res)
      }).catch((error) => reject(error))
  })
}


export const deleteDriverService = (token, id) => {
  return new Promise(async (reslove, reject) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    await axios
      .delete(`${apiDrivers}${id}`,
        config,
      ).then((res) => {
        reslove(res)
      }).catch((error) => reject(error))
  })
}


