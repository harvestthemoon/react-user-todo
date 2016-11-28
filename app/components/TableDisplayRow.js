const React = require('react');
const PropTypes = React.PropTypes;

function TableDisplayRow (props) {
	const user = props.user;
	const tasklists = props.tasklists;
	return (
		<tr className="table-row-display">
			<td>{user.id}</td>
			<td className="data">
				<span className="text-container">{user.name}</span>
			</td>
			<td className="data">
				<span className="text-container">{user.address}</span>
			</td>
			<td className="data">
				<span className="text-container">{user.dob}</span>
			</td>
			<td className="tasklists">
				{tasklists.length ?
					<ul>{tasklists.map(function(tasklist, index) { 
						return (
								<li key={index}>
									<div className="tasklist-title">{tasklist.title}</div>
									{tasklist.tasks ? 
										<ol>{tasklist.tasks.map(function(task, tindex) {
											return (
												<li key={tindex}>
													<label>
														<input 
															type="checkbox" 
															value={task.complete} 
															checked={task.complete}
															onChange={(e) => props.onUpdateTask(e, task)} /> 
														<span className={task.complete ? 'task-complete task-text' : 'task-text'}>{task.text}</span>
														{task.completeDate ? <span> ({task.completeDate})</span> : ''}
													</label>
												</li>
											);
										})}</ol>
										: <li>No tasks in this list</li>}
								</li>
							); 
					})}</ul>
					: <p>No tasklists assigned</p>
				}
			</td>
			<td><button className="btn btn-edit" onClick={() => props.onUpdateUser(user)}>Edit</button></td>
			<td><span className="delete icon" onClick={() => props.onDeleteUser(user)}>X</span></td>
		</tr>
	);
}

TableDisplayRow.propTypes = {
	tasklists: PropTypes.array.isRequired,
	error: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
	onUpdateTask: PropTypes.func.isRequired,
	onUpdateUser: PropTypes.func.isRequired,
	onDeleteUser: PropTypes.func.isRequired
};

module.exports = TableDisplayRow;