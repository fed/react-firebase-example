var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var firebase = require('firebase');

var rootUrl = 'https://react-js-example.firebaseio.com/';

var Header = require('./header');
var List = require('./list');
var App = React.createClass({
  mixins: [ReactFire],
  componentWillMount: function () {
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },
  getInitialState: function () {
    return {
      items: [],
      loaded: false
    }
  },
  render: function() {
    return <div>
      <Header itemsStore={this.firebaseRefs.items} />
      <hr />
      <div className={'initially-hidden' + (this.state.loaded ? ' visible' : '')}>
        <List items={this.state.items} />
      </div>
      { this.state.loaded && this.state.items && this.displayClearDoneButton() }
    </div>
  },
  handleDataLoaded: function () {
    this.setState({ loaded: true });
  },
  displayClearDoneButton: function () {
    return <div>
      <hr />
      <button className="btn btn-success" onClick={this.handleClearDone}>Empty list</button>
    </div>
  },
  handleClearDone: function () {
    for (var key in this.state.items) {
      if (this.state.items[key].done) {
        this.fb.child(key).remove();
      }
    }
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('#app'));
