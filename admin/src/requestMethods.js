import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTdlM2ZlNDVhZGRmY2YxYmQyZGJkMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5OTQ4ODM0NSwiZXhwIjoxNjk5NzQ3NTQ1fQ.goAmgOBhD5Z-FEeMdZzjwT2NabjgU5DHcy4JI3yD4y0";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
