const React = require('react');
const PropTypes = React.PropTypes;

function AddTasklist (props) {
	return (
		<div>
			{props.isAdding 
			? <form onSubmit={(e) => props.onAddTasklist(e)}>
					{props.error ? <div className="error">{props.error}</div> : ''}
					<input 
						type="text"
						value={props.tasklistTitle}
						onChange={props.onUpdateTitle} />
					<button className="btn btn-primary" type="submit">Add tasklist</button>
				</form>
			: <button className="btn btn-update" onClick={props.onBeginAddTasklist}>Add new tasklist</button>}
		</div>
	);
}

AddTasklist.propTypes = {
	isAdding: PropTypes.bool.isRequired, 
	tasklistTitle: PropTypes.string.isRequired,
	error: PropTypes.string.isRequired,
	onUpdateTitle: PropTypes.func.isRequired,
	onBeginAddTasklist: PropTypes.func.isRequired,
	onAddTasklist: PropTypes.func.isRequired
};

module.exports = AddTasklist;