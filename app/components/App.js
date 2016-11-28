require("../../sass/style.scss");

const React = require('react');
const UserList = require('./UserList.js');
const ViewAsJsonContainer = require('../containers/ViewAsJsonContainer.js');
const AddUserContainer = require('../containers/AddUserContainer.js');
const dummyData = require('../../json/dummy.json');

const nextId = {
	user: 0,
	tasklist: 0,
	task: 0
};

const App = React.createClass({
	getInitialState: function () {
		return {
			users: []
		}
	},
	generateNextUserId: function () {
		const currentUserId = nextId.user;
		nextId.user = currentUserId + 1;
		return currentUserId;
	},
	generateNextTasklistId: function () {
		const currentTasklistId = nextId.tasklist;
		nextId.tasklist = currentTasklistId + 1;
		return currentTasklistId;
	},
	generateNextTaskId: function () {
		const currentTaskId = nextId.task;
		nextId.task = currentTaskId + 1;
		return currentTaskId;
	},
	handleCreateUsers: function (users) {
		const usersToAdd = [].concat(users);
		usersToAdd.forEach(function (user) {
			user.id = this.generateNextUserId();
			user.updating = false;
			if (user.tasklists) {
				user.tasklists.forEach(function (tasklist) {
					tasklist.id = this.generateNextTasklistId();
					if (tasklist.tasks) {
						tasklist.tasks.forEach(function (task) {
							task.id = this.generateNextTaskId();
							task.complete = false;
							task.completeDate = '';
						}.bind(this));
					}
				}.bind(this));
			} else {
				user.tasklists = [];
			}
		}.bind(this));

		this.setState({
			users: this.state.users.concat(usersToAdd)
		});
	},
	handleUpdateUser: function (user) {
		let allUsers = this.state.users;
		if (user.updating) {
			// User is already in the update state, so incorporate any changes made.
			allUsers = allUsers.map(function(d) {
		    if (d.id === user.id) {
		    	d.name = user.name;
		    	d.address = user.address;
		    	d.dob = user.dob;
		    	if (user.tasklists) {
		    		user.tasklists.forEach(function (tasklist) {
		    			if (tasklist.id === undefined) {
		    				tasklist.id = this.generateNextTasklistId();
		    			}
		    			if (tasklist.tasks) {
		    				tasklist.tasks.forEach(function (task) {
		    					if (task.id === undefined) {
		    						task.id = this.generateNextTaskId();
		    					}
		    				}.bind(this));
		    			}
		    		}.bind(this));
		    	}
		    	d.tasklists = user.tasklists;
		    	d.updating = false;
		    }
		    return d;
			}.bind(this));
		} else {
			// User is not in the update state, so change its state accordingly.
			allUsers = allUsers.map(function(d) {
		    if (d.id === user.id) {
		    	d.updating = true;
		    }
		    return d;
			});
		}

		this.setState({
			users: allUsers
		});
	},
	handleDeleteUser: function (user) {
		const allUsers = this.state.users;
		const cleanUsers = allUsers.filter(function(d) {
	    return d.id !== user.id;
		});
		this.setState({
			users: cleanUsers
		});
	},
	handleLoadDummyData: function () {
		const dummyDataCopy = [];
		dummyData.forEach(function(dummyUser) {
			// Create a shallow copy so as to not assign IDs to the original data object.
			let dummyUserCopy = JSON.parse(JSON.stringify(dummyUser));
			dummyDataCopy.push(dummyUserCopy);
		});
		this.handleCreateUsers(dummyDataCopy);
	},
	render: function () {
		return (
			<div className="app-container">
				<UserList 
					users={this.state.users} 
					handleUpdateUser={this.handleUpdateUser}
					handleDeleteUser={this.handleDeleteUser}
					generateNextTasklistId={this.generateNextTasklistId}
					generateNextTaskId={this.generateNextTaskId} />
				<ViewAsJsonContainer 
					users={this.state.users} />
				<AddUserContainer 
					onCreateUser={this.handleCreateUsers} 
					handleLoadDummyData={this.handleLoadDummyData} />
			</div>
		);
	}
});

module.exports = App;