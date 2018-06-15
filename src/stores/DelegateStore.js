import BaseStore from "./BaseStore";

class DelegateStore extends BaseStore {
  addUser(user) {
    return this.axios.post("/delegate", { delegate_id: user.id });
  }
  removeUser(user) {
    return this.axios.delete("/delegate/" + user.delegate_id);
  }
  listUsers() {
    return this.axios.get("/delegate");
  }
  getUsersOnBehalf() {
    return this.axios.get("/delegate/behalf");
  }
}
export default new DelegateStore();
