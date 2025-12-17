import axios from "axios";

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export const http = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
})
