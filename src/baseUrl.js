
import Axios from 'axios';
const axiosBaseURL = Axios.create({
    baseURL: process.env.baseUrl || "https://admin.mountainnepalholidays.com/",

});
export default axiosBaseURL;

export const baseUrl = process.env.baseUrl || "https://admin.mountainnepalholidays.com/";