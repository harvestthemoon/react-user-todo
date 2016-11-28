const React = require('react');
const PropTypes = React.PropTypes;
const UpdateTasklistContainer = require('../containers/UpdateTasklistContainer.js');
const AddTasklistContainer = require('../containers/AddTasklistContainer.js');

function TableUpdateRow (props) {
	const user = props.user;
	const tasklists = props.tasklists;
	return (
		<tr>
			<td>{user.id}</td>
			<td className="data">
				<input 
					type="text" 
					value={props.name}
					onChange={props.onUpdateName} />
			</td>
			<td className="data">
				<input 
					type="text" 
					value={props.address}
					onChange={props.onUpdateAddress} />
			</td>
			<td className="data">
				<input 
					type="text" 
					value={props.dob}
					onChange={props.onUpdateDob} />
			</td>
			<td className="tasklists">
			  {tasklists.length ?
					<ul className="tasklists-list">{tasklists.map(function(tasklist, index) { 
						return (
								<li key={index}>
									<UpdateTasklistContainer 
										tasklist={tasklist}
										handleRemoveTasklist={props.handleRemoveTasklist}
										handleAddTask={props.handleAddTask}
										handleRemoveTask={props.handleRemoveTask} />
								</li>
							); 
					})}</ul>
				: <p>No tasklists assigned</p>
				}
				<AddTasklistContainer 
					handleAddTasklist={props.handleAddTasklist} />
			</td>
			<td>
				<button 
					className="update btn btn-primary" 
					onClick={() => props.onUpdateUser()}>Finish</button>
			</td>
			<td>
				<span 
					className="delete icon" 
					onClick={() => props.onDeleteUser(user)}>X</span>
			</td>
		</tr>
	);
}

TableUpdateRow.propTypes = {
	user: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	dob: PropTypes.string.isRequired,
	tasklists: PropTypes.array.isRequired,
	onUpdateName: PropTypes.func.isRequired,
	onUpdateAddress: PropTypes.func.isRequired,
	onUpdateDob: PropTypes.func.isRequired,
	onUpdateUser: PropTypes.func.isRequired, 
	onDeleteUser: PropTypes.func.isRequired,
	handleAddTasklist: PropTypes.func.isRequired,
	handleRemoveTasklist: PropTypes.func.isRequired,
	handleAddTask: PropTypes.func.isRequired,
	handleRemoveTask: PropTypes.func.isRequired
};

module.exports = TableUpdateRow;