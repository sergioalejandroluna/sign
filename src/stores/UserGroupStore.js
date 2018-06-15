import BaseStore from "./BaseStore";

class UserGroupStore extends BaseStore {
  setGroup(group_id) {
    console.log(group_id);
    this.group_id = group_id;
  }
  addUser(user) {
    return this.axios.put(`/user_groups/${this.group_id}/add_user`, {
      user_id: user.id
    });
  }
  removeUser(user) {
    return this.axios.put(`/user_groups/${this.group_id}/remove_user`, {
      user_id: user.id
    });
  }
  listUsers() {
    return this.axios.get(`/user_groups/${this.group_id}/list_users`);
  }

  list() {
    return this.axios.get(`/user_groups`);
  }
  add(group) {
    return this.axios.post(`/user_groups`, group);
  }

  save(group) {
    if (group.id === 0) group = { ...group, id: null };
    if (group.id) return this.edit(group);
    return this.add(group);
  }

  edit(group) {
    return this.axios.patch(`/user_groups/${group.id}`, group);
  }

  delete(group) {
    return this.axios.delete(`/user_groups/${group.id}`);
  }
}
export default new UserGroupStore();
