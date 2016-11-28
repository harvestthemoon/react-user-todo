const React = require('react');
const PropTypes = React.PropTypes;

function UpdateTasklist (props) {
	const tasklist = props.tasklist;
	return (
		<div>
			<div className="tasklist-title">{tasklist.title} <span className="icon delete" onClick={() => props.onRemoveTasklist(tasklist)}>X</span></div>
			<ol className="tasks">{tasklist.tasks.map(function(task, index) {
				return (
						<li key={index}>
							{task.text} <span className="icon delete" onClick={() => props.onRemoveTask(task)}>X</span>
						</li>
					);
			}.bind(this))}</ol>        
			{props.addingTask 
			? <form onSubmit={(e) => props.onAddTask(e, tasklist)}>
					{props.error ? <div className="error">{props.error}</div> : ''}
					<input type="text" onChange={props.onUpdateTask} />
					<button type="submit" className="btn btn-primary">Add task</button>
				</form>
			: <div className="add-task-text" onClick={props.onAddingTask}><span className="icon add">+</span> Add Task</div>}            
		</div>
	);
}

UpdateTasklist.propTypes = {
	addingTask: PropTypes.bool.isRequired,
	newTask: PropTypes.string.isRequired,
	error: PropTypes.string.isRequired,
	tasklist: PropTypes.object.isRequired,
	onRemoveTasklist: PropTypes.func.isRequired,
	onAddingTask: PropTypes.func.isRequired,
	onAddTask: PropTypes.func.isRequired,
	onUpdateTask: PropTypes.func.isRequired,
	onRemoveTask: PropTypes.func.isRequired
};

module.exports = UpdateTasklist;