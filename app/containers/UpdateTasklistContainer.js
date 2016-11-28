const React = require('react');
const PropTypes = React.PropTypes;
const UpdateTasklist = require('../components/UpdateTasklist.js');

const UpdateTasklistContainer = React.createClass({
	propTypes: {
		tasklist: PropTypes.object.isRequired,
		handleRemoveTasklist: PropTypes.func.isRequired,
		handleAddTask: PropTypes.func.isRequired,
		handleRemoveTask: PropTypes.func.isRequired
	},
	getInitialState: function () {
		return {
			addingTask: false,
			newTask: '',
			error: ''
		}
	},
	handleRemoveTasklist: function (tasklist) {
		this.setState({
			error: ''
		});
		this.props.handleRemoveTasklist(tasklist);
	},
	handleAddingTask: function () {
		this.setState({
			addingTask: true
		});
	},
	handleUpdateTask: function (e) {
		this.setState({
			newTask: e.target.value
		});
	},
	handleAddTask: function (e, tasklist) {
		e.preventDefault();
		const newTask = {
			"text": this.state.newTask,
			"complete": false,
			"completeDate": ''
		};
		if (newTask.text.replace(/\s/g,'').length) {
			this.setState({
				addingTask: false,
				newTask: '',
				error: ''
			});
			this.props.handleAddTask(tasklist, newTask);
		} else {
			this.setState({
				error: 'INVALID DATA: Task text is a required field.'
			});
		}
	},
	render: function () {
		return (
			<UpdateTasklist 
				addingTask={this.state.addingTask}
				newTask={this.state.newTask}
				error={this.state.error}
				tasklist={this.props.tasklist}
				onRemoveTasklist={this.handleRemoveTasklist}
				onAddingTask={this.handleAddingTask}
				onAddTask={this.handleAddTask}
				onUpdateTask={this.handleUpdateTask}
				onRemoveTask={this.props.handleRemoveTask} />
		);
	}
});

module.exports = UpdateTasklistContainer;