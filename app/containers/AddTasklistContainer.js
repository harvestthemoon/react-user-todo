const React = require('react');
const PropTypes = React.PropTypes;
const AddTasklist = require('../components/AddTasklist.js');

const AddTasklistContainer = React.createClass({
	propTypes: {
		handleAddTasklist: PropTypes.func.isRequired
	},
	getInitialState: function () {
		return {
			isAdding: false,
			tasklistTitle: '',
			error: ''
		}
	},
	handleUpdateTitle: function (e) {
		this.setState({
			tasklistTitle: e.target.value
		})
	},
	handleBeginAddTasklist: function () {
		this.setState({
			isAdding: true
		});
	},
	handleAddTasklist: function (e) {
		e.preventDefault();
		const tasklistTitle = this.state.tasklistTitle;
		if (tasklistTitle.replace(/\s/g,'').length) {
			this.setState({
				isAdding: false,
				tasklistTitle: '',
				error: ''
			});
			this.props.handleAddTasklist(tasklistTitle);
		} else {
			this.setState({
				error: 'INVALID DATA: Tasklist title is a required field.'
			});
		}
	},
	render: function () {
		return <AddTasklist 
							isAdding={this.state.isAdding} 
							tasklistTitle={this.state.tasklistTitle}
							error={this.state.error}
							onUpdateTitle={this.handleUpdateTitle}
							onBeginAddTasklist={this.handleBeginAddTasklist}
							onAddTasklist={this.handleAddTasklist} />;
	}
});

module.exports = AddTasklistContainer;