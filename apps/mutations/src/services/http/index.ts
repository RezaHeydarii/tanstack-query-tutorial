import { Axios } from "axios";

const httpService = new Axios({
  //only requires for using with msw
  baseURL: "http://localhost:5173/",
  //only requires for using with msw
  transformResponse: [
    (data) => {
      try {
        return JSON.parse(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        return data;
      }
    },
  ],
});

export default httpService;
