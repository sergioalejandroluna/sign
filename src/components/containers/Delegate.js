import DelegateStore from "../../stores/DelegateStore";
import AbstractUserList from "./AbstractUserList";

class Delegate extends AbstractUserList {
  getStore() {
    return DelegateStore;
  }
}

Delegate.propTypes = {};
export default Delegate;
