import Axios from "axios";

import env from "@/env";

const backendRequest = Axios.create({
  baseURL: env.BACKEND_URL,
});

export default backendRequest;
