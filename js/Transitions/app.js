/** @jsx React.DOM */


var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;
var DefaultRoute = ReactRouter.DefaultRoute;


var App = React.createClass({
  render: function () {
    return (
      <div>
        <ul>
          <li><Link to="dashboard">Dashboard</Link></li>
          <li><Link to="form">Form</Link></li>
        </ul>
        <RouteHandler/>
      </div>
    );
  }
});

var Home = React.createClass({
  render: function () {
    return <h1>Home</h1>;
  }
});

var Dashboard = React.createClass({
  render: function () {
    return <h1>Dashboard</h1>;
  }
});

var Form = React.createClass({

  mixins: [ ReactRouter.Navigation ],

  statics: {
    willTransitionFrom: function (transition, element) {
      if (element.refs.userInput.getDOMNode().value !== '') {
        if (!confirm('You have unsaved information, are you sure you want to leave this page?')) {
          transition.abort();
        }
      }
    }
  },

  handleSubmit: function (event) {
    event.preventDefault();
    this.refs.userInput.getDOMNode().value = '';
    this.transitionTo('/');
  },

  render: function () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>Click the dashboard link with text in the input.</p>
          <input type="text" ref="userInput" defaultValue="ohai" />
          <button type="submit">Go</button>
        </form>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Home}/>
    <Route name="dashboard" handler={Dashboard}/>
    <Route name="form" handler={Form}/>
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('container'));
});
