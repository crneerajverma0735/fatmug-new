import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

function Alert({ alert }) {
  return alert !== null && alert.message !== "" && alert.type !== "" ? (
    <FloatAlert>
      <div className={`alert alert-${alert.type} setFloat`} role='alert'>
        {alert.message}
      </div>
    </FloatAlert>
  ) : (
    <></>
  );
}

const FloatAlert = styled.div`
  .setFloat {
    position: fixed;
    top: 1.5rem;
    width: 90%;
    z-index: 1000;
    left: 5%;
    border-radius: 5px;
  }
`;

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
