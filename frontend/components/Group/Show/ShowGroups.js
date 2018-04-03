import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LOAD } from '../../../helpers/Enums';
import { getGroups } from '../../../actions/groupActions';
import GroupItem from './GroupItem';

class ShowGroups extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.getGroupsOutput = this.getGroupsOutput.bind(this);
    if (this.props.groups === LOAD.NOTHING) this.props.getGroups();
  }

  handleCreate() {
    this.props.history.push('/group/create');
  }

  getGroupsOutput() {
    switch (props.events) {
      case LOAD.LOADING:
        return <h3>LOADING</h3>;
      case LOAD.NOTHING:
        return;
      default:
        return (
          <div>
            <h3>Open</h3>
            <div className="row">
              <div className="col-md-12">
                <ul className="event-list">
                  {this.props.groups.map((group, i) => (
                    <GroupItem history={props.history} key={i} group={group} />
                  ))}
                </ul>
              </div>
            </div>
            <hr />
          </div>
        );
    }
  }

  render() {
    return (
      <div className="row host-show">
        <div className="container-fluid">
          <div className="row btn-create">
            <div className="col-md-12">
              <button
                className="btn btn-lg btn-info"
                onClick={this.handleCreate}
              >
                create
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
    groups: state.group.groups
  };
};

const mapDispatchToProps = (/* dispatch */) => {
  return {
    getGroups: getGroups
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(ShowGroups);
