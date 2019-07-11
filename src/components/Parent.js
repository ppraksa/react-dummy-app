import React, { Component } from 'react';

import UserList from './UserList'

class Parent extends Component {
  constructor() {
    super();
    this.users = [
      'Pawel',
      'Lukas',
      'Paulina',
      'Katarzyna',
      'Morda'
    ];
    this.state = {
      users: this.users,
      inputValue: '',
      thr: true
    };
    this.filterUsers = this.filterUsers.bind(this);
  }
  render() {
    return(
        <div>
          <input type="text" value={this.state.inputValue} onChange={this.filterUsers}/>
          <UserList users={this.state.users} />
        </div>
    );
  }

  getFilteredUsersForText(text) {
    return new Promise(resolve => {
      const time = (Math.random() + 1) * 250;
      console.log('...waiting');
      setTimeout(() => {
        const filteredUsers = this.users.filter(user => user.toLowerCase().includes(text.toLowerCase()));
        console.log('fetching done');
        resolve(filteredUsers);
      }, time) ;
    });
  }

  filterUsers(event) {
    if(this.state.thr) {
      let value = event.target.value,
          users;

      this.setState({
        thr: !this.state.thr
      }, () => {

        let promise = new Promise((res, rej) => {
          setTimeout(() => {
            res()
          }, 100);
        });

        promise.then(() => {
          this.setState({
            inputValue: value,
            thr: !this.state.thr
          })
        }).then(() => {
          users = this.getFilteredUsersForText(value).then((users) => {
            this.setState({
              users
            })
          });
        });

      });
    } else {
      return false;
    }
  }
}

export default Parent;