import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import WalletInfo from '../components/WalletInfo'
import WalletLookup from '../components/WalletLookup'
import SendTokens from '../components/SendTokens'
import BuyTokens from '../components/BuyTokens'


function Active(props) {
  const tab = props.tab
  switch (tab) {
    case 0:
      return <WalletLookup />
    case 1:
      return <SendTokens />
    case 2:
      return <BuyTokens />
  }
}

export default class Demo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      classes: ["is-active", "", ""]
    }
  }

  tabHandler(tab) {
    this.setState({
      active: tab
    })

    switch (tab) {
      case 0:
        this.setState({
          classes: ["is-active", "", ""]
        })
        break
      case 1:
        this.setState({
          classes: ["", "is-active", ""]
        })
        break
      case 2:
        this.setState({
          classes: ["", "", "is-active"]
        })
        break
    }
  }

  render() {
    return (
      <div>
        <div className="hero is-fullheight is-light">
          <div className="container">
            <div className="hero is-medium">
              <div className="hero-head">
                <a href="/">
                  <span className="icon is-large has-text-dark fa-3x"><i className="fa fa-home"></i></span>
                </a>
              </div>
              <div className="hero-body has-text-centered">
                <div className="container">
                  <h1 className="title">
                    <img src="img/Logo.png" alt="Upropos: The Future of Crowdfunding"></img>
                  </h1>
                  <h2 className="subtitle">
                    The Future of Crowdfunding
                  </h2>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="tabs is-centered is-boxed">
                <ul>
                  <li className={this.state.classes[0]}>
                    <a onClick={() => { this.tabHandler(0) }}>
                      <span className="icon is-small"><i className="fa fa-search"></i></span>
                      <span>Wallet Lookup</span>
                    </a>
                  </li>
                  <li className={this.state.classes[1]}>
                    <a onClick={() => { this.tabHandler(1) }}>
                      <span className="icon is-small"><i className="fa fa-paper-plane"></i></span>
                      <span>Send Tokens</span>
                    </a>
                  </li>
                  <li className={this.state.classes[2]}>
                    <a onClick={() => { this.tabHandler(2) }}>
                      <span className="icon is-small"><i className="fa fa-shopping-cart"></i></span>
                      <span>Buy Tokens</span>
                    </a>
                  </li>
                </ul>
              </div>
              <WalletInfo />
              <Active tab={this.state.active} />
            </div>
            <div className="container">
            </div>
          </div>
        </div>
      </div>
    )
  }
}