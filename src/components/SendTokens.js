import React, { Component } from 'react'
import { CONTRACT } from '../contract.js'
import _ from 'lodash'


export default class SendTokens extends Component {
  constructor() {
    super()
    this.state = {
      address: '',
      amount: ''
    }
  }

  send() {
    if (!web3.isAddress(this.state.address)) {
      this.setState({
        address: ''
      })
      alert('Invalid address')
      return
    }

    var amt = parseFloat(this.state.amount)
    if (!_.isNumber(amt) || amt <= 0) {
      this.setState({
        amount: ''
      })
      alert('Invalid amount')
      return
    }

    CONTRACT.transfer(this.state.address, web3.toWei(this.state.amount, 'ether'), (err, res) => {
      if (!err) {
        console.log(res)
        this.setState({
          address: '',
          amount: ''
        })
        return
      }
      console.log(err)
      this.setState({
        address: '',
        amount: ''
      })
    })
  }

  addressHandler(e) {
    this.setState({
      address: e.target.value
    })
  }

  amountHandler(e) {
    this.setState({
      amount: e.target.value
    })
  }

  render() {
    return (
      <div className="box">
        <div className="level">
          <div className="level-item">
            <h2 className="title">
              Send
                        </h2>
          </div>
        </div>
        <div className="container has-text-centered">
          <div className="columns">
            <div className="column is-6">
              <div className="field">
                <div className="control is-expanded has-icons-right">
                  <input className="input" type="text" value={this.state.address}
                    placeholder="To Address" onChange={this.addressHandler.bind(this)}>
                  </input>
                  <span className="icon is-small is-right">
                    <i className="fa fa-user-circle-o"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="column is-3">
              <div className="field has-addons">
                <div className="control">
                  <input className="input" type="text" value={this.state.amount}
                    placeholder="Amount" onChange={this.amountHandler.bind(this)}>
                  </input>
                </div>
                <div className="control">
                  <a className="button is-static">
                    Tokens
                                    </a>
                </div>
              </div>
            </div>
            <div className="column is-2">
              <a className="button is-info" onClick={this.send.bind(this)}>
                <span className="icon is-small">
                  <i className="fa fa-paper-plane"></i>
                </span>
                <span>Confirm Transfer</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}