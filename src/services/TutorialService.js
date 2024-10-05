import http from "../http-common";

class TutorialDataService {
  // 모든 사람 목록을 가져오는 GET 요청
  getAll() {
    return http.get("/id");
  }

  // 특정 사람을 가져오는 GET 요청
  get(id) {
    return http.get(`/id/${id}`);
  }

  // 새로운 사람을 추가하는 POST 요청
  create(data) {
    return http.post("/id", data);
  }

  // 특정 사람의 데이터를 업데이트하는 PUT 요청
  update(id, data) {
    return http.put(`/id/${id}`, data);
  }

  // 특정 사람을 삭제하는 DELETE 요청
  remove(id) {
    return http.delete(`/id/${id}`);
  }

  // 모든 사람을 삭제하는 DELETE 요청
  removeAll() {
    return http.delete(`/id`);
  }

  // 이름을 기준으로 사람을 검색하는 GET 요청
  findByName(name) {
    return http.get(`/id?name=${name}`);
  }
}

// 인스턴스를 생성한 후 내보냅니다.
const tutorialDataService = new TutorialDataService();
export default tutorialDataService;
