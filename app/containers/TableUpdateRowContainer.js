const React = require('react');
const PropTypes = React.PropTypes
const TableUpdateRow = require('../components/TableUpdateRow.js');

const TableUpdateRowContainer = React.createClass({
	propTypes: {
    user: PropTypes.object.isRequired,
		tasklists: PropTypes.array.isRequired, 
		handleUpdateUser: PropTypes.func.isRequired, 
		handleDeleteUser: PropTypes.func.isRequired,
		generateNextTasklistId: PropTypes.func.isRequired,
		generateNextTaskId: PropTypes.func.isRequired
  },
	getInitialState: function () {
		const user = this.props.user;
		return {
			name: user.name,
			address: user.address,
			dob: user.dob,
			tasklists: user.tasklists,
			error: ''
		}
	},
	handleUpdateName: function (e) {
		this.setState({
			name: e.target.value
		});
	},
	handleUpdateAddress: function (e) {
		this.setState({
			address: e.target.value
		});
	},
	handleUpdateDob: function (e) {
		this.setState({
			dob: e.target.value
		})
	},
	handleUpdateUser: function () {
		// Create a shallow copy so as to not assign new data to the original object.
		const newUser = JSON.parse(JSON.stringify(this.props.user));
		newUser.name = this.state.name;
		newUser.address = this.state.address;
		newUser.dob = this.state.dob;
		newUser.tasklists = this.state.tasklists;
		this.props.handleUpdateUser(newUser);
	},
	handleAddTasklist: function (tasklistTitle) {
		const newTasklists = this.state.tasklists;
		const newTasklistId = this.props.generateNextTasklistId();
		const newTasklist = {
			"title": tasklistTitle,
			"tasks": [],
			"id": newTasklistId
		};
		newTasklists.push(newTasklist);
		this.onUpdateTasklists(newTasklists);
	},
	onUpdateTasklists: function (newTasklists) {
		this.setState({
			tasklists: newTasklists
		});
	},
	handleRemoveTasklist: function (tasklist) {
		const allTasklists = this.state.tasklists;
		let cleanTasklists = [];
		if (allTasklists) {
			allTasklists.forEach(function (currentTasklist) {
				if (currentTasklist.id !== tasklist.id) {
					cleanTasklists.push(currentTasklist);
				}
			});
		}
		this.onUpdateTasklists(cleanTasklists);
	},
	handleAddTask: function (tasklist, task) {
		const allTasklists = this.state.tasklists;
		const nextTaskId = this.props.generateNextTaskId();
		task.id = nextTaskId;
		allTasklists.forEach(function (oldTasklist) {
			if (tasklist.id === oldTasklist.id) {
				tasklist.tasks.push(task);
			}
		});
		this.onUpdateTasklists(allTasklists);
	},
	handleRemoveTask: function (task) {
		const allTasklists = this.state.tasklists;
		let cleanTasklists = [];
		if (allTasklists) {
			allTasklists.forEach(function (tasklist) {
				let cleanTasklist = {
					title: tasklist.title,
					id: tasklist.id
				};
				if (tasklist.tasks) {
					cleanTasklist.tasks = tasklist.tasks.filter(function (currentTask) {
						return currentTask.id !== task.id;
					});
				}
				cleanTasklists.push(cleanTasklist);
			});
		}
		this.onUpdateTasklists(cleanTasklists);
	},
	render: function () {
		return (
			<TableUpdateRow
				user={this.props.user} 
				name={this.state.name}
				address={this.state.address}
				dob={this.state.dob}
				tasklists={this.state.tasklists}
				onUpdateName={this.handleUpdateName}
				onUpdateAddress={this.handleUpdateAddress}
				onUpdateDob={this.handleUpdateDob}
				onUpdateUser={this.handleUpdateUser} 
				onDeleteUser={this.props.handleDeleteUser}
				handleAddTasklist={this.handleAddTasklist}
				handleRemoveTasklist={this.handleRemoveTasklist}
				handleAddTask={this.handleAddTask}
				handleRemoveTask={this.handleRemoveTask} />
			);
	}
});

module.exports = TableUpdateRowContainer;