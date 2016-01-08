var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      task: ''
    };
  },
  render: function () {
    return <div className="input-group input-group-lg">
      <input
        value={this.state.task}
        onChange={this.handleInputChange}
        className="form-control"
        type="text" />
      <span className="input-group-btn">
        <button
          className="btn btn-primary"
          onClick={this.handleClick}
          type="button">Add</button>
      </span>
    </div>
  },
  handleClick: function (event) {
    // Send the task over to Firebase
    this.props.itemsStore.push({
      task: this.state.task,
      done: false
    });

    this.setState({
      task: ''
    });
  },
  handleInputChange: function (event) {
    // Update the input field
    this.setState({
      task: event.target.value
    });
  }
});
