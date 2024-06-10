import http from './http-commons';

class StuffDataService {

  postUser(data) {
    return http.post("/user", data);
  }

  postLogin(data) {
    return http.post(`/user/login`, data);
  }
  
  findAllUsers() {
    return http.get("/user");
  }

  findUserById(id) {
    return http.get(`/user/${id}`);
  }
  
  removeUser(id) {
    return http.post(`/user/${id}`);
  }


}

export default new StuffDataService();