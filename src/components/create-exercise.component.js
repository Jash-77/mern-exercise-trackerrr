import React,{Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
export default class CreateExercise extends Component {

    constructor(props){

        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription= this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount(){
      axios.get('http://localhost:5000/users/')
      .then(res => {
        if(res.data.length > 0){
          this.setState({
            users : res.data.map( user => user.username),
            username : res.data[0].username
          })
        }
      })
    }

     onChangeUsername(e){
        console.log("on change username called");
        this.setState({
            username: e.target.value
        });
     }
     onChangeDescription(e){
        console.log("on change description called");
        this.setState({
            description: e.target.value
        });
     }
     onChangeDuration(e){
        console.log("on change duration called");
        this.setState({
            duration: e.target.value
        });
     }
     onChangeDate(date){
        console.log("on change date called");
        this.setState({
            date: date
        });
     }
     onSubmit(e){
       // console.log("submit entereed");
        e.preventDefault();
        const exercise = {
            username : this.state.username,
            description : this.state.description,
            duration : this.state.duration,
            date : this.state.date
        };
        //console.log("wbjx");
        console.log(exercise);
        axios.post('http://localhost:5000/exercises/add',exercise)
         .then(res => console.log(res.data)); 
        //for being able to pause console for sometime before goint to home page
        for (let index = 0; index < 10000000000; index++) { ;}
        window.location = '/';
     }
 
     render() {
        return (
        <div>
          <h3>Create New Exercise Log</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <select ref="userInput"
                  name="username"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}>
                  {
                    this.state.users.map(function(user) {
                      return <option 
                        key={user}
                        value={user}>{user}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group"> 
              <label>Description: </label>
              <input  type="text"
                  name="description"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input 
                  type="text" 
                  name="duration"
                  className="form-control"
                  value={this.state.duration}
                  onChange={this.onChangeDuration}
                  />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>
    
            <div className="form-group">
              <input type="submit" name="submit" value="Create Exercise Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }
}