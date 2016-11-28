const React = require('react');
const PropTypes = React.PropTypes;
const AddUser = require('../components/AddUser.js');

const AddUserContainer = React.createClass({
	propTypes: {
		onCreateUser: PropTypes.func.isRequired,
		handleLoadDummyData: PropTypes.func.isRequired
	},
	getInitialState: function () {
		return {
			name: '',
			address: '',
			dob: '',
			error: ''
		}
	},
	handleUpdateName: function (e) {
		this.setState({
			name: e.target.value
		});
	},
	handleUpdateAddress: function (e) {
		this.setState({
			address: e.target.value
		});
	},
	handleUpdateDob: function (e) {
		this.setState({
			dob: e.target.value
		})
	},
	handleSubmitUser: function (e) {
		e.preventDefault();
		const user = {
			name: this.state.name,
			address: this.state.address,
			dob: this.state.dob
		};

		if (user.name.replace(/\s/g,'').length && user.address.replace(/\s/g,'').length) {
			this.setState({
				name: '',
				address: '',
				dob: '',
				error: ''
			});

			this.props.onCreateUser(user);
		} else {
			this.setState({
				error: 'INVALID DATA: Name and Address are required fields.'
			});
		}
	},
	handleLoadDummyData: function () {
		this.setState({
			error: ''
		});
		this.props.handleLoadDummyData();
	},
	render: function () {
		return (
			<AddUser
				error={this.state.error}
				onUpdateName={this.handleUpdateName}
				onUpdateAddress={this.handleUpdateAddress}
				onUpdateDob={this.handleUpdateDob}
				onSubmitUser={this.handleSubmitUser}
				name={this.state.name}
				address={this.state.address}
				dob={this.state.dob}
				onLoadDummyData={this.handleLoadDummyData} />
		);
	}
});

module.exports = AddUserContainer;