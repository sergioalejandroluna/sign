import React from "react";
import PropTypes from "prop-types";

class UserGroups extends React.Component {
  render() {
    return <div>some group</div>;
  }
}

UserGroups.propTypes = {
  match: PropTypes.object.isRequired
};
export default UserGroups;
