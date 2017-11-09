import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const loading = document.getElementById('loading')
const content = document.getElementById('content')

var Demo
var intervalID

//Only run this after web3 exists
function loadDemo() {
  Demo = require('./Demo.js').default
  content.remove()
  ReactDOM.render(<Demo />, loading)
  if (intervalID !== 'undefined') {
    clearInterval(intervalID)
  }
}

//Wait for web3
function startUp() {

  //Found web3
  if (typeof web3 !== 'undefined') {
    loadDemo()
    return
  }

  //Keep checking...
  var intervalID = setInterval(() => {
    if (typeof web3 !== 'undefined') {
      loadDemo()
      return
    }
  }, 1000)
}

export default class Loading extends Component {
  componentWillMount() {
    startUp()
  }

  render() {
    return (
      <div>
        <section className="hero is-white is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">
                Waiting for web3...
                            </h1>
              <span className="icon">
                <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
              </span>
              <h2 className="subtitle">
                This app requires an Ethereum compatible browser (Mist, MetaMask)
                            <br></br>
                <br></br>
                <a href="/">
                  <span className="icon is-small"><i className="fa fa-arrow-left"></i></span>
                  <span> Back</span>
                </a>
              </h2>
            </div>
          </div>
        </section>
      </div>
    )
  }
}