const React = require('react');
const PropTypes = React.PropTypes;
const TableDisplayRowContainer = require('../containers/TableDisplayRowContainer.js');
const TableUpdateRowContainer = require('../containers/TableUpdateRowContainer.js');

function UserList (props) {
	return (
		<div className="users-list-container">
			<h1>Registered Users</h1>
			{props.users.length 
				? <div className="users-list">
					<table className="users-table">
						<tbody>
							<tr className="header-row">
								<th>ID</th>
								<th>Name</th>
								<th>Address</th>
								<th>Date of Birth</th>
								<th>Tasks</th>
								<th></th>
								<th></th>
							</tr>
							{props.users.map(function(user, index) {
								if (!user.updating) {
									return (
										<TableDisplayRowContainer 
											className="user-row"
											key={user.id} 
											user={user} 
											tasklists={user.tasklists}
											handleUpdateUser={props.handleUpdateUser} 
											handleDeleteUser={props.handleDeleteUser} />
									);
								} else {
									return (
										<TableUpdateRowContainer 
											className="user-row"
											key={user.id} 
											user={user} 
											tasklists={user.tasklists} 
											handleUpdateUser={props.handleUpdateUser} 
											handleDeleteUser={props.handleDeleteUser}
											generateNextTasklistId={props.generateNextTasklistId}
											generateNextTaskId={props.generateNextTaskId} />
									);
								}
							}.bind(this))}
						</tbody>
					</table>
				</div>
			: <p>There are currently no registered users.</p>}
		</div>
	);
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
	handleUpdateUser: PropTypes.func.isRequired,
	handleDeleteUser: PropTypes.func.isRequired,
	generateNextTasklistId: PropTypes.func.isRequired,
	generateNextTaskId: PropTypes.func.isRequired
};

module.exports = UserList;