const React = require('react');
const PropTypes = React.PropTypes;

function ViewAsJson (props) {
	return (
		<div>
			{props.showRequests
			? <div>
					<button className="btn btn-primary" onClick={props.onToggleRequests}>Hide JSON</button>
					<label>
						Get: 
						<select className="search" onChange={props.onUpdateDropdown}>
							<option>Users</option>
							<option>Tasklists</option>
							<option>Tasks</option>
						</select>
						by ID(s): 
						<input type="text" className="search" value={props.searchValue} onChange={props.onUpdateSearch} />
					</label>
					<pre>{props.result}</pre>
				</div>
			: <div><button className="btn" onClick={props.onToggleRequests}>View Users as JSON</button></div>}
		</div>
	);
}

ViewAsJson.propTypes = {
	showRequests: PropTypes.bool.isRequired,
	onUpdateDropdown: PropTypes.func.isRequired,
	searchValue: PropTypes.string.isRequired,
	onUpdateSearch: PropTypes.func.isRequired,
	onToggleRequests: PropTypes.func.isRequired,
	result: PropTypes.string.isRequired
};

module.exports = ViewAsJson;