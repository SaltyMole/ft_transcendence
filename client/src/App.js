import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import drawing from './img/drawing.jpg'

class Game extends React.Component
{
  state = { data: null };

  componentDidMount()
  {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200)
    {
      throw Error(body.message)
    }
    else
    {
      Text("Express connected");
    }
    return body;
  };

  render() {
    return (
      <div className="Game">

        <div className="Game-banner">

          <img src={logo} className="Game-logo" alt="logo" />

          <text className="AI-generated-text">
            Premiere histoire: blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </text>

          <div className="Drawings-carrousel">
            <button className="Carousel-button">previous</button>
            <img src={drawing} className="Drawings" alt="logo" />
            <img src={drawing} className="Drawings" alt="logo" />
            <img src={drawing} className="Drawings" alt="logo" />
            <button className="Carousel-button">Next</button>
          </div>

          <text className="AI-generated-text">
            Deuxieme histoire: blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </text>

        </div>

      </div>
    );
  }
}



export default Game;