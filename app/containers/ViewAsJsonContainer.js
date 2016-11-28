const React = require('react');
const PropTypes = React.PropTypes;
const ViewAsJson = require('../components/ViewAsJson.js');
const _ = undefined;

const ViewAsJsonContainer = React.createClass({
	propTypes: {
		users: PropTypes.array.isRequired
	},
	getInitialState: function () {
		return {
			showRequests: false,
			searchDropdown: 'Users',
			searchValue: '',
			searchResults: []
		}
	},
	componentWillReceiveProps: function (nextProps) {
		this.updateSearchResults(nextProps.users, _, _);
	},
	getAllTasklists: function (users) {
		let allTasklists = [];
		users.forEach(function (user) {
			if (user.tasklists !== undefined) {
				user.tasklists.forEach(function (tasklist) {
					allTasklists.push(tasklist);
				});
			}
		});
		return allTasklists;
	},
	getAllTasks: function (users) {
		let allTasks = [];
		users.forEach(function (user) {
			if (user.tasklists !== undefined) {
				user.tasklists.forEach(function (tasklist) {
					if (tasklist.tasks !== undefined) {
						tasklist.tasks.forEach(function (task) {
							allTasks.push(task);
						});
					}
				});
			}
		});
		return allTasks;
	},
	updateSearchResults: function (users = this.props.users, dropdown = this.state.searchDropdown, searchValue = this.state.searchValue) {
		let results = [];
		if (searchValue === '') {
			// No IDs have been entered, so just return all Users, all Tasklists, or all Tasks.
			if (dropdown === 'Users') {
				results = users;
			} else if (dropdown === 'Tasklists') {
				results = this.getAllTasklists(users);
			} else if (dropdown === 'Tasks') {
				results = this.getAllTasks(users);
			}
		} else {
			// Something was entered as a search term, so use that value to filter out the appropriate items.
			const searchValueArray = searchValue.split(',').map(num => {
				// An empty string evaluates to 0 when converted to Number.
				if (num === '') {
					return undefined;
				}
				return Number(num);
			});
			if (dropdown === 'Users') {
				const foundUsers = users.filter(user => {
					if (searchValueArray.indexOf(user.id) > -1) {
						return user;
					}
				});
				results = foundUsers;
			} else if (dropdown === 'Tasklists') {
				const allTasklists = this.getAllTasklists(users);
				const foundTasklists = allTasklists.filter(tasklist => {
					if (searchValueArray.indexOf(tasklist.id) > -1) {
						return tasklist;
					}
				});
				results = foundTasklists;
			} else if (dropdown === 'Tasks') {
				const allTasks = this.getAllTasks(users);
				const foundTasks = allTasks.filter(task => {
					if (searchValueArray.indexOf(task.id) > -1) {
						return task;
					}
				});
				results = foundTasks;
			}
		}
		this.setState({
			searchResults: results
		});
	},
	handleToggleRequests: function () {
		const previousState = this.state.showRequests;
		this.setState({
			showRequests: !previousState
		});
	},
	handleUpdateDropdown: function (e) {
		const dropdown = e.target.value;
		this.setState({
			searchDropdown: dropdown
		});
		this.updateSearchResults(_, dropdown, _);
	},
	handleUpdateSearch: function (e) {
		searchValue = e.target.value;
		this.setState({
			searchValue: searchValue
		});
		this.updateSearchResults(_, _, searchValue);
	},
	render: function () {
		const data = this.state.searchResults;
		const result = (data.length ? JSON.stringify(data, null, 2) : 'No matching objects found');
		return <ViewAsJson 
							showRequests={this.state.showRequests}
							onUpdateDropdown={this.handleUpdateDropdown}
							searchValue={this.state.searchValue}
							onUpdateSearch={this.handleUpdateSearch}
							onToggleRequests={this.handleToggleRequests}
							result={result} />;
	}
});

module.exports = ViewAsJsonContainer;