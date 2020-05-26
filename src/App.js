import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation';
import Logo from './Components/Logo/Logo';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import ImageLinkForm from './Components/ImageLinkeForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'

const partcicleOptions = {
  particles: {
    number: {
      value: 100,
      density : {
        enable: true,
        value_area: 800
      }
    }
  }
}

const innitialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = innitialState;
}

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
  })
}

  calculateFaceLocation = (data) => {
    const calrifaiFace = data.outputs[0].data.regions.map(region => {
      return region.region_info.bounding_box;
    })

    const inputImage = document.getElementById('inputImage');
    const width = Number(inputImage.width);
    const height = Number(inputImage.height);

    const boundingBoxes = [].concat(
      calrifaiFace.map((face) => ({
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height),
        leftCol: face.left_col * width
      }))
    )
    return boundingBoxes;
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}, this.setImageUrl);
  }

  setImageUrl = () => {
    this.setState({imageUrl: this.state.input});
  }

  onEnterPressed = (event) => {
    if (event.key === 'Enter') {
      this.onButtonSubmit();
    }
  }

  onButtonSubmit = () => {
    fetch('https://whispering-cove-53383.herokuapp.com/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        imageUrl: this.state.imageUrl
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://whispering-cove-53383.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}));
        })
    }
    console.log(response);
    this.displayFaceBox(this.calculateFaceLocation(response))
  })
  .catch(err => console.log(err))
}

  onRouteChange = (route) => {
    if (route === 'signIn') {
      this.setState(innitialState);
    } else if (route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route})
  }

  render() {
    const {isSignedIn, imageUrl, route, boxes, user} = this.state;

    return (
      <div className="App">
        <Particles className='particles' params={partcicleOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' ?
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              onEnterPressed={this.onEnterPressed}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
          </div> :
          (
            route === 'signIn' ?
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
