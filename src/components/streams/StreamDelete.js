import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onCancel = () => {
    console.log('ready');
    history.push('/');
  };

  renderActions = () => {
    const { id } = this.props.match.params;

    return (
      <>
        <button
          className="ui primary button"
          onClick={() => this.props.deleteStream(id)}
        >
          Delete
        </button>
        <button className="ui button" onClick={() => history.push('/')}>
          Cancel
        </button>
      </>
    );
  };

  renderContent = () => {
    if (!this.props.stream) return 'Are you sure want to delete this stream?';
    return (
      'Are you sure want to delete this stream with' + this.props.stream.title
    );
  };

  render() {
    return (
      <div>
        StreamDelete
        <Modal
          title="Delete stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
