import { Component } from 'react';
import { checkCheckinCode, checkin } from '../../../actions/index';
import { connect } from 'react-redux';
import React from 'react';
import { CHECK_CHECKIN } from '../../../helpers/Enums';
import { resetCheckin } from '../../../actions';
import {
  checkedInMessage,
  checkInCodeLabel,
  checkingCheckin,
  confirmButton,
  invalidCodeError
} from '../../../assets/text';

class CheckinCode extends Component {
  constructor(props) {
    super(props);
    this.getCheckCheckInOutput = this.getCheckCheckInOutput.bind(this);
    this.handleCheckInCodeInput = this.handleCheckInCodeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      checkinCode: ''
    };
  }

  componentDidUpdate() {
    console.log(this.props.check);
    if (this.props.check === CHECK_CHECKIN.SUCCESS) {
      alert(checkedInMessage);
      this.props.history.push('/guest');
      this.props.checkin(this.props.event);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleCheckInCodeInput(e) {
    this.setState({ checkinCode: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.checkCode(this.props.event, this.state.checkinCode);
  }

  getCheckCheckInOutput() {
    switch (this.props.check) {
      case CHECK_CHECKIN.FAIL:
        return <h3>{invalidCodeError}</h3>;
      case CHECK_CHECKIN.CHECKING:
        return <h3>{checkingCheckin}</h3>;
      default:
        return;
    }
  }

  render() {
    return (
      <div className="row" style={{ margin: '10px' }}>
        <div className="col-md-12">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label className="col-md-3 col-form-label">
                {checkInCodeLabel}
              </label>
              <div className="col-md-9">
                <input
                  className="form-control"
                  type="text"
                  name="code"
                  value={this.state.checkinCode}
                  onChange={this.handleCheckInCodeInput}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-12">
                <button
                  className="btn btn-success"
                  type="submit"
                  value="submit"
                >
                  {confirmButton}
                </button>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-12">{this.getCheckCheckInOutput()}</div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    event: state.event.selected,
    check: state.guest.checkCode
  };
};
const mapDispatchToProps = () => {
  return {
    checkin: checkin,
    checkCode: checkCheckinCode,
    reset: resetCheckin
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(CheckinCode);
