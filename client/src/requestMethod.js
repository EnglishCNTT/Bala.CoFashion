import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTdlM2ZlNDVhZGRmY2YxYmQyZGJkMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5OTUxNDM1NCwiZXhwIjoxNjk5NzczNTU0fQ.vvLYr3ex6btYRTDFnMMUG_-T1DK9ukJpapvFhhv4FGM";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
