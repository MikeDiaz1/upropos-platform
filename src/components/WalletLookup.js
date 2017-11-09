import React, { Component } from 'react'
import { CONTRACT } from '../contract.js'


export default class WalletLookup extends Component {
  constructor() {
    super()
    this.state = {
      balance: 0,
      tokens: 0
    }
  }

  changeHandler(e) {
    if (!web3.isAddress(e.target.value)) {
      this.setState({
        balance: 0,
        tokens: 0
      })
      return
    }

    web3.eth.getBalance(e.target.value, (err, bal) => {
      if (!err) {
        this.setState({
          balance: web3.fromWei(bal, 'ether').toNumber()
        })
      }
      else {
        console.log(err)
      }
    })

    CONTRACT.balanceOf(e.target.value, (err, tkns) => {
      if (!err) {
        this.setState({
          tokens: web3.fromWei(tkns, 'ether').toNumber()
        })
      }
      else {
        console.log(err)
      }
    })
  }

  render() {
    return (
      <div className="box">
        <div className="level">
          <div className="level-item">
            <h2 className="title">
              Search
                        </h2>
          </div>
        </div>
        <div className="container has-text-centered">
          <div className="columns">
            <div className="column is-6">
              <div className="field">
                <div className="control is-expanded has-icons-right">
                  <input className="input" type="text"
                    placeholder="Search Address" onChange={this.changeHandler.bind(this)}></input>
                  <span className="icon is-small is-right">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="column is-3">
              <p className="subtitle"><strong>{this.state.balance}</strong> Ether</p>
            </div>
            <div className="column is-3">
              <p className="subtitle"><strong>{this.state.tokens}</strong> Tokens</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}