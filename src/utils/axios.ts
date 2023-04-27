import SERVER_URL from "@/data/url";
import axios from "axios";
import clientToken from "./token";

const useFetch = axios.create({
  baseURL: SERVER_URL,
  headers: { Authorization: clientToken.get() },
});

export default useFetch;
