import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOpenRsvp, updateOpenRsvp } from '../../../actions';

import { LOAD } from '../../../helpers/Enums';

class OpenForm extends Component {
  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
    this.getGuestsOutput = this.getGuestsOutput.bind(this);
    this.removeGuest = this.removeGuest.bind(this);
    this.addGuest = this.addGuest.bind(this);
    this.deleteGuests = this.deleteGuests.bind(this);
    this.changeGuest = this.changeGuest.bind(this);
  }

  componentDidMount() {
    this.props.getOpenRsvp(this.props.event);
  }

  componentWillReceiveProps(next) {
    this.setState({ openRsvp: next.openRsvp });
  }

  removeGuest(i) {
    open = this.props.openRsvp.slice();
    open.splice(i, 1);
    this.props.updateOpenRsvp(open);
  }

  changeGuest(i, e, guest) {
    open = this.props.openRsvp.slice();
    // guest.name = e.target.value();
    console.log(this.props.openRsvp);
    open[i].name = e.target.value;
    this.props.updateOpenRsvp(open);
  }

  addGuest(e) {
    e.preventDefault();
    open = this.props.openRsvp.slice();
    open.push({ name: '' });
    this.props.updateOpenRsvp(open);
  }

  deleteGuests(e) {
    e.preventDefault();
    this.props.updateOpenRsvp([]);
  }

  handleFile() {
    let props = this.props;
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      let file = document.querySelector('#files').files[0];
      let reader = new FileReader();
      reader.onloadend = function(evt) {
        // console.log(evt.target.result);
        props.replaceAllRsvps(props.event, evt.target.result.split(/\r?\n/));
      };
      reader.readAsText(file);
    } else {
      alert('Please add RSVPs manually');
    }
  }

  getGuestsOutput() {
    switch (this.props.openRsvp) {
      case LOAD.LOADING:
        return '';
      case LOAD.NOTHING:
        return ''; //not needed?
      default:
        return this.props.openRsvp.map((guest, i) => (
          <div className="form-group row" key={i}>
            <label className="col-md-2 col-form-label">Name</label>
            <div className="col-md-4">
              <input
                className="form-group"
                type="text"
                value={guest.name}
                onChange={event => this.changeGuest(i, event, guest)}
              />
            </div>
            <div className="col-md-1">
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={event => this.removeGuest(i, event)}
              >
                <span aria-hidden="true" name={i}>
                  &times;
                </span>
              </button>
            </div>
          </div>
        ));
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <input
            className="form-group"
            type="file"
            id="files"
            onChange={this.handleFile}
          />
          <div>
            <div className="row">
              <div className="col-md-12">RSVP List:</div>
            </div>
            {this.getGuestsOutput()}
          </div>
          <div className="row">
            <div className="col-md-3">
              <button className="btn btn-info" onClick={this.addGuest}>
                Add
              </button>
            </div>
            <div className="col-md-3">
              <button className="btn btn-danger" onClick={this.deleteGuests}>
                Delete All
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    event: state.event.selected,
    openRsvp: state.open.openRsvp
  };
};

const mapDispatchToProps = (/* dispatch */) => {
  return {
    getOpenRsvp: getOpenRsvp,
    updateOpenRsvp: updateOpenRsvp
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(OpenForm);
