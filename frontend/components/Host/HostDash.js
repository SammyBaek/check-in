import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HostCreateEvent from './HostCreateEvent';
import HostShowEvents from './HostShowEvents';
import HostEventDetail from './HostEventDetail';
import HostEditEvent from './HostEditEvent';
import { resetEvent } from '../../actions/index';
import { connect } from 'react-redux';

class HostDash extends Component {
  render() {
    return (
      <div className="container container-fluid">
        <Route exact path="/host" component={HostShowEvents} />
        <Route exact path="/host/create" component={HostCreateEvent} />
        <Route exact path="/host/event" component={HostEventDetail} />
        <Route exact path="/host/edit" component={HostEditEvent} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps())(HostDash);
