var React = require('react');

var rootUrl = 'https://react-js-example.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function () {
    return {
      task: this.props.item.task,
      done: this.props.item.done,
      key: this.props.item.key,
      taskChanged: false
    };
  },
  componentWillMount: function () {
    this.fb = new Firebase(rootUrl + 'items/' + this.state.key)
  },
  render: function () {
    return <div className="task input-group">
      <span className="input-group-addon">
        <input
          type="checkbox"
          checked={this.state.done}
          onChange={this.handleDoneChange} />
      </span>

      <input
        type="text"
        className="form-control"
        disabled={this.state.done}
        value={this.state.task}
        onChange={this.handleTaskChange} />

      <span className="input-group-btn">
        {this.state.taskChanged ? this.changeButtons() : ''}

        <button
          className="btn btn-danger"
          onClick={this.handleDeleteClick}>Delete</button>
      </span>
    </div>
  },
  changeButtons: function () {
    return [
      <button
        key="update"
        className="btn btn-secondary"
        onClick={this.handleUpdateClick}>Update</button>,
      <button
        key="undo"
        className="btn btn-secondary"
        onClick={this.handleUndoClick}>Undo</button>
    ];
  },
  handleDoneChange: function (event) {
    var updated = { done: event.target.checked };
    this.setState(updated);
    this.fb.update(updated)
  },
  handleDeleteClick: function () {
    this.fb.remove();
  },
  handleTaskChange: function (event) {
    this.setState({
      task: event.target.value,
      taskChanged: true
    });
  },
  handleUndoClick: function () {
    this.setState({
      task: this.props.item.task,
      taskChanged: false
    });
  },
  handleUpdateClick: function () {
    this.setState({
      taskChanged: false
    });

    this.fb.update({
      task: this.state.task
    });
  }
});
