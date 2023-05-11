import React,{Component} from 'react';
import axios from 'axios';
export default class CreateUser extends Component {

    constructor(props){

        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            username: '',
        }
    }
    
  
    onChangeUsername(e){
          console.log("on change username called");
          this.setState({
              username: e.target.value
          });
    }
    onSubmit(e){
        // console.log("submit entereed");
         e.preventDefault();
         const user = {
             username : this.state.username,
         };
         //console.log("wbjx");
         console.log(user);
         //for being able to pause console for sometime before goint to home page
         axios.post('http://localhost:5000/users/add',user)
         .then(res => console.log(res.data)); 
        // for (let index = 0; index < 10000000000; index++) { ;}
         this.setState({
            username: ''
        });
    }
 render(){
    return (
        <div>
          <h3>Create New User</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  />
            </div>
            <div className="form-group">
              <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
          </form>
        </div>
      )
 }

}