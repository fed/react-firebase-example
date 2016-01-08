var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({
  render: function () {
    return <div>{this.conditionalRender()}</div>
  },
  conditionalRender: function () {
    if (this.props.items) {
      var children = [];

      for (var key in this.props.items) {
        var item = this.props.items[key];
        item.key = key;
        children.push(<ListItem key={key} item={item} />);
      }

      return <div>{children}</div>;
    } else {
      return <h4>All caught up!</h4>
    }
  }
})
