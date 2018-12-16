import React from "react";
import axios from 'axios';
import StateList from "./StateList.jsx";
import styles from '../styles/Additional.css';

class Additional extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      company: "",
      website:"",
      photo:"",
      address: "",
      city: "",
      state: "",
    };
    this.handleCompany = this.handleCompany.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleCity= this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleWebsite = this.handleWebsite.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
  }

  handleState(e){
    this.setState({
      state: e.target.value
    })
  }

  handleCity(e){
    this.setState({
      city: e.target.value
    })
  }

  handleAddress(e){
    this.setState({
      address: e.target.value
    })
  }

  handleCompany(e){
    this.setState({
      company: e.target.value
    })
  }

  handleWebsite(e){
    this.setState({
      website: e.target.value
    })
  }

  handlePhoto(e){
    this.setState({
      photo: e.target.value
    })
  }

  handleSubmit(){
    console.log('About state', this.state)
    let data = this.state
    axios
    .patch('/update', data)
    .then((res)=>{
      console.log('in additional', res)
      axios
      .get('/check' , {params:{data}})
      .then((response)=>{
        console.log('in additional', response.data[0])
        this.props.login(response.data[0])
      })
      .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
  }

  render() {
    return (
      <form>
        <div>
          <h1>Tell us a little more about yourself</h1>
          <hr />

          <b>Company Name: </b>
          <input type="text" placeholder="Company Name" onChange={this.handleCompany} className={styles.input}/>

          <b>Company Website: </b>
          <input type="text" placeholder="Company Website"  onChange={this.handleWebsite} className={styles.input}/>

          <b>Photo: </b>
          <input type="text" placeholder="Insert imageUrl here" onChange={this.handlePhoto} className={styles.input}/>

          <b>Address: </b>
          <input type="text" placeholder="Address" onChange={this.handleAddress} className={styles.input}/>

          <b>City: </b>
          <input type="text" placeholder="City" onChange={this.handleCity} className={styles.input}/>

          <b>State: </b>
          <StateList handle={this.handleState}/>
        </div>
        <div>
          <button type="button" onClick={()=>{this.handleSubmit()}}>Submit</button>
          <button 
            onClick={() => {
              this.props.home();
            }}
          >
            Home
          </button>
        </div>
      </form>
    );
  }
}

export default Additional;