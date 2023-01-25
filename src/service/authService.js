import axios from "axios";
import { apiRegister,apiLogin,apiLogout } from "../constants/api";



export const registerService = (i) => {
    return new Promise(async (reslove, reject) => {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
          };
        await axios
        .post(
          `${apiRegister}`,
          i
        ).then((res) => {
            reslove(res)
        }).catch((error) => reject(error))
       })
}

export const loginService = (i) => {
    return new Promise(async (reslove, reject) => {
        await axios
        .post(
          `${apiLogin}`,
          i
        ).then((res) => {
            reslove(res)
        }).catch((error) => reject(error))
       })
}

export const logOutService = (i) => {
    return new Promise(async (reslove, reject) => {
        await axios
        .post(
          `${apiLogout}`,
          i
        ).then((res) => {
            reslove(res)
        }).catch((error) => reject(error))
       })
}





