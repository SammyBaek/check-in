import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hostGetEvents } from '../../../actions/index';
import EventItem from './EventItem';
import { LOAD } from '../../../helpers/Enums';
import {
  isEventActive,
  isEventClosed,
  isEventRepeat
} from '../../../helpers/Time';

class ShowEvents extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleGroup = this.handleGroup.bind(this);
    // this.getGeneralOutput = this.getGeneralOutput(this);

    if (this.props.events === LOAD.NOTHING) this.props.getEvents();
    this.state = {
      out: this.getEventsOutput(this.props),
      active: this.getActiveEventsOutput(this.props),
      repeats: this.getRepeatEventsOutput(this.props),
      closed: this.getClosedEventsOutput(this.props)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      out: this.getEventsOutput(nextProps),
      active: this.getActiveEventsOutput(nextProps),
      repeats: this.getRepeatEventsOutput(nextProps),
      closed: this.getClosedEventsOutput(nextProps)
    });
  }

  handleCreate() {
    this.props.history.push('/host/create');
  }

  handleGroup() {
    this.props.history.push('/group');
  }

  getGeneralOutput(props, header, filter) {
    switch (props.events) {
      case LOAD.LOADING:
        return <h3>LOADING</h3>;
      case LOAD.NOTHING:
        return;
      default:
        let filteredEvents = props.events.filter(filter);
        if (filteredEvents.length > 0) {
          return (
            <div>
              <h3>{header}</h3>
              <div className="row">
                <div className="col-md-12">
                  <ul className="event-list">
                    {filteredEvents.map((event, i) => (
                      <EventItem
                        history={props.history}
                        key={i}
                        event={event}
                      />
                    ))}
                  </ul>
                </div>
              </div>
              <hr />
            </div>
          );
        }
    }
  }

  getEventsOutput(props) {
    return this.getGeneralOutput(props, 'Open', function(event) {
      return (
        !isEventActive(event) && !isEventClosed(event) && !isEventRepeat(event)
      );
    });
  }

  getRepeatEventsOutput(props) {
    return this.getGeneralOutput(props, 'Repeat Events', function(event) {
      return !isEventActive(event) && isEventRepeat(event);
    });
  }

  getActiveEventsOutput(props) {
    return this.getGeneralOutput(props, 'CheckIn Active', function(event) {
      return isEventActive(event);
    });
  }

  getClosedEventsOutput(props) {
    return this.getGeneralOutput(props, 'Closed', function(event) {
      return isEventClosed(event);
    });
  }

  render() {
    return (
      <div className="row host-show">
        <div className="container-fluid">
          <div className="row btn-create">
            <div className="col-md-6 text-center">
              <button
                className="btn btn-lg btn-info"
                onClick={this.handleCreate}
              >
                Create Event
              </button>
            </div>
            <div className="col-md-6 text-center">
              <button
                className="btn btn-lg btn-info"
                onClick={this.handleGroup}
              >
                Groups
              </button>
            </div>
          </div>
          <hr />
          {this.state.active}
          {this.state.repeats}
          {this.state.out}
          {this.state.closed}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.host.events
  };
};

const mapDispatchToProps = (/* dispatch */) => {
  return {
    getEvents: hostGetEvents
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(ShowEvents);
