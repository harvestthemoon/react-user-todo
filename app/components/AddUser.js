const React = require('react');
const PropTypes = React.PropTypes;

function AddUser (props) {
	return (
		<div>
			<h2>Create a New User</h2>
			<form className="add-user-form" onSubmit={props.onSubmitUser}>
				{props.error ? <div className="error">{props.error}</div> : ''}
				<div className="form-group">
					<label>
						Name <span className="required">*</span>
						<input 
						className="addUserName"
						placeholder="Name"
						onChange={props.onUpdateName}
						value={props.name}
						type="text" />
					</label>
				</div>
				<div className="form-group">
					<label>
						Address <span className="required">*</span>
						<input 
							className="addUserAddress"
							placeholder="Address"
							onChange={props.onUpdateAddress}
							value={props.address}
							type="text" />
					</label>
				</div>
				<div className="form-group">
					<label>
						Date of Birth
						<input 
							className="addUserDOB"
							placeholder="Date of Birth"
							onChange={props.onUpdateDob}
							value={props.dob}
							type="text" />
					</label>
				</div>
				<button
					type="submit" 
					className="btn btn-primary">
					Add User
				</button>
			</form>
			<button className="btn" onClick={props.onLoadDummyData}>Load Dummy Users</button>
		</div>
	);
}

AddUser.propTypes = {
	error: PropTypes.string.isRequired,
	onUpdateName: PropTypes.func.isRequired,
	onUpdateAddress: PropTypes.func.isRequired,
	onUpdateDob: PropTypes.func.isRequired,
	onSubmitUser: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	dob: PropTypes.string.isRequired,
	onLoadDummyData: PropTypes.func.isRequired
};

module.exports = AddUser;