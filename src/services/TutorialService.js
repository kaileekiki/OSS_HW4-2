import http from "../http-common";

const getAll = () => {
  return http.get("/tutorials"); // 'api' 부분을 제거
};

const get = (id) => {
  return http.get(`/tutorials/${id}`); // 'api' 부분을 제거
};

const create = (data) => {
  return http.post("/tutorials", data); // 'api' 부분을 제거
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data); // 'api' 부분을 제거
};

const remove = (id) => {
  return http.delete(`/tutorials/${id}`); // 'api' 부분을 제거
};

const removeAll = () => {
  return http.delete(`/tutorials`); // 'api' 부분을 제거
};

const findByTitle = (title) => {
  return http.get(`/tutorials?title=${title}`); // 'api' 부분을 제거
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TutorialService;
