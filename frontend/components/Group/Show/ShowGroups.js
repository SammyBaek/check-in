import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LOAD } from '../../../helpers/Enums';
import { getGroups } from '../../../actions/groupActions';
import GroupItem from './GroupItem';
import { hostGetGroups, resetGroup } from '../../../actions';

class ShowGroups extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleJoin = this.handleJoin.bind(this);

    this.getGroupsOutput = this.getGroupsOutput.bind(this);

    if (this.props.groups === LOAD.NOTHING) this.props.getGroups();

    this.props.resetGroup();
  }

  handleCreate() {
    this.props.history.push('/group/create');
  }

  handleJoin() {
    this.props.history.push('/group/join');
  }

  getGroupsOutput() {
    switch (this.props.events) {
      case LOAD.LOADING:
        return <h3>LOADING</h3>;
      case LOAD.NOTHING:
        return;
      default:
        if (this.props.groups.constructor === Array)
          return (
            <div>
              <div className="row">
                <div className="col-md-12">
                  <ul className="event-list">
                    {this.props.groups.map((group, i) => (
                      <GroupItem
                        history={this.props.history}
                        key={i}
                        group={group}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
    }
  }

  render() {
    return (
      <div className="row host-show">
        <div className="container-fluid">
          <div className="row btn-create">
            <div className="col-md-6 text-center">
              <button
                className="btn btn-lg btn-info buttonLeft"
                onClick={this.handleCreate}
              >
                Create
              </button>
            </div>
            <div className="col-md-6 text-center">
              <button
                className="btn btn-lg btn-info buttonRight"
                onClick={this.handleJoin}
              >
                Join
              </button>
            </div>
          </div>
          <hr />
          {this.getGroupsOutput()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.host.groups
  };
};

const mapDispatchToProps = (/* dispatch */) => {
  return {
    getGroups: hostGetGroups,
    resetGroup: resetGroup
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(ShowGroups);
