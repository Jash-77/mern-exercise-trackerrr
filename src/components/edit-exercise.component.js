import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EditExercise() {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/' + id)
      .then(res => {
        setUsername(res.data.username);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setDate(new Date(res.data.date));
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  }

  const onChangeDate = (date) => {
    setDate(date);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date
    };
    axios.post('http://localhost:5000/exercises/update/' + id, exercise)
      .then(res => console.log(res.data));
    //for being able to pause console for sometime before goint to home page
    for (let index = 0; index < 10000000000; index++) { ;}
    window.location = '/';
  }

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select
              required
              className="form-control"
              value={username}
              onChange={onChangeUsername}>
              {
                users.map(function(user) {
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
              required
              className="form-control"
              value={description}
              onChange={onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={duration}
              onChange={onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}





// import React,{Component} from 'react';
// import DatePicker from "react-datepicker";
// //import { useParams } from 'react-router-dom';
// import "react-datepicker/dist/react-datepicker.css";
// import axios from 'axios';

// export default class EditExercise extends Component {

//     constructor(props){

//         super(props);

//         this.onChangeUsername = this.onChangeUsername.bind(this);
//         this.onChangeDescription= this.onChangeDescription.bind(this);
//         this.onChangeDuration = this.onChangeDuration.bind(this);
//         this.onChangeDate = this.onChangeDate.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         this.state ={
//             username: '',
//             description: '',
//             duration: 0,
//             date: new Date(),
//             users: [],
//             id: this.props.match.params.id
//         }
//     }

//     componentDidMount(){
//        // let id = {this.state.id};
//       axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
//       .then(res => {
//           this.setState({
//             username : res.data.username,
//             description : res.data.description,
//             duration : res.data.duration,
//             date :new Date(res.data.date)
//           })
//         }
//       )
//       .catch(err => console.log(err))

//       axios.get('http://localhost:5000/users/')
//       .then(response => {
//         if (response.data.length > 0) {
//           this.setState({
//             users: response.data.map(user => user.username),
//           })
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       })

//     }

//      onChangeUsername(e){
//         console.log("on change username called");
//         this.setState({
//             username: e.target.value
//         });
//      }
//      onChangeDescription(e){
//         console.log("on change description called");
//         this.setState({
//             description: e.target.value
//         });
//      }
//      onChangeDuration(e){
//         console.log("on change duration called");
//         this.setState({
//             duration: e.target.value
//         });
//      }
//      onChangeDate(date){
//         console.log("on change date called");
//         this.setState({
//             date: date
//         });
//      }
//      onSubmit(e){
//        // console.log("submit entereed");
//         e.preventDefault();
//         const exercise = {
//             username : this.state.username,
//             description : this.state.description,
//             duration : this.state.duration,
//             date : this.state.date
//         };
//         //console.log("wbjx");
//         console.log(exercise);
//         axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id,exercise)
//          .then(res => console.log(res.data)); 
//         //for being able to pause console for sometime before goint to home page
//         for (let index = 0; index < 10000000000; index++) { ;}
//         window.location = '/';
//      }
 
//      render() {
//         return (
//         <div>
//           <h3>Edit Exercise Log</h3>
//           <form onSubmit={this.onSubmit}>
//             <div className="form-group"> 
//               <label>Username: </label>
//               <select ref="userInput"
//                   name="username"
//                   required
//                   className="form-control"
//                   value={this.state.username}
//                   onChange={this.onChangeUsername}>
//                   {
//                     this.state.users.map(function(user) {
//                       return <option 
//                         key={user}
//                         value={user}>{user}
//                         </option>;
//                     })
//                   }
//               </select>
//             </div>
//             <div className="form-group"> 
//               <label>Description: </label>
//               <input  type="text"
//                   name="description"
//                   required
//                   className="form-control"
//                   value={this.state.description}
//                   onChange={this.onChangeDescription}
//                   />
//             </div>
//             <div className="form-group">
//               <label>Duration (in minutes): </label>
//               <input 
//                   type="text" 
//                   name="duration"
//                   className="form-control"
//                   value={this.state.duration}
//                   onChange={this.onChangeDuration}
//                   />
//             </div>
//             <div className="form-group">
//               <label>Date: </label>
//               <div>
//                 <DatePicker
//                   selected={this.state.date}
//                   onChange={this.onChangeDate}
//                 />
//               </div>
//             </div>
    
//             <div className="form-group">
//               <input type="submit" name="submit" value="Edit Exercise Log" className="btn btn-primary" />
//             </div>
//           </form>
//         </div>
//         )
//       }
// }