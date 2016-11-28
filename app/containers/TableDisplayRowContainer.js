const React = require('react');
const PropTypes = React.PropTypes;
const TableDisplayRow = require('../components/TableDisplayRow.js');

const TableDisplayRowContainer = React.createClass({
	propTypes: {
		user: PropTypes.object.isRequired, 
		tasklists: PropTypes.array.isRequired,
		handleUpdateUser: PropTypes.func.isRequired, 
		handleDeleteUser: PropTypes.func.isRequired
	},
	getInitialState: function () {
		return {
			tasklists: this.props.user.tasklists,
			error: ''
		}
	},
	handleUpdateTask: function (e, task) {
		const allTasklists = this.state.tasklists;
		let updatedTasklists = [];
		if (allTasklists) {
			allTasklists.forEach(function (tasklist) {
				let updatedTasklist = {
					title: tasklist.title,
					tasks: []
				};
				if (tasklist.tasks) {
					tasklist.tasks.forEach(function (currentTask) {
						if (currentTask.id === task.id) {
							const date = new Date();
							const currentTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(); 
							let taskState = !currentTask.complete;
							currentTask.completeDate = (taskState ? currentTime : '');
							currentTask.complete = taskState;
						}
						updatedTasklist.tasks.push(currentTask);
					});
				}
				updatedTasklists.push(updatedTasklist);
			});
		}
		this.handleUpdateUser(updatedTasklists);
	},
	handleUpdateUser: function (tasklists) {
		// Create a shallow copy so as to not assign new data to the original object.
		const newUser = JSON.parse(JSON.stringify(this.props.user));
		newUser.tasklists = tasklists;
		newUser.updating = true;
		this.props.handleUpdateUser(newUser);
	},
	render: function () {
		return (
			<TableDisplayRow 
				tasklists={this.state.tasklists}
				error={this.state.error}
				user={this.props.user} 
				onUpdateTask={this.handleUpdateTask}
				onUpdateUser={this.props.handleUpdateUser} 
				onDeleteUser={this.props.handleDeleteUser} />
		);
	}
});

module.exports = TableDisplayRowContainer;