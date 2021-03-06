import React, { Component } from 'react';
import { connect } from 'react-redux';

import { joinEvent, resetJoinFind } from '../../../actions/index';
import { confirmationPrompt, confirmButton } from '../../../assets/text';

class JoinBasic extends Component {
  constructor(props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm(e) {
    e.preventDefault();
    this.props.checkin(this.props.eventToJoin);
    this.props.history.push('/guest');
  }

  render() {
    return (
      <div>
        <h3>{confirmationPrompt + this.props.eventToJoin.name}</h3>
        <button onClick={this.handleConfirm} className="btn btn-success">
          {confirmButton}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventToJoin: state.guest.eventToJoin
  };
};

const mapDispatchToProps = (/* dispatch */) => {
  return {
    checkin: joinEvent,
    resetJoin: resetJoinFind
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(JoinBasic);
