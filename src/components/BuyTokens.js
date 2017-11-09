import React, { Component } from 'react'
import { CONTRACT } from '../contract.js'
import _ from 'lodash'


export default class BuyTokens extends Component {
  constructor() {
    super()
    this.state = {
      amount: '',
      rate: 10
    }
  }

  componentWillMount() {
    CONTRACT.rate((err, res) => {
      if (!err) {
        this.setState({
          rate: res.toNumber()
        })
      }
      else {
        console.log(err)
      }
    })
  }

  amountHandler(e) {
    this.setState({
      amount: e.target.value
    })
  }

  buy() {
    var amt = parseFloat(this.state.amount)
    if (!_.isNumber(amt) || amt <= 0) {
      this.setState({
        amount: ''
      })
      alert('Invalid amount')
      return
    }

    CONTRACT.buyProcoin({ value: web3.toWei(this.state.amount / this.state.rate, 'ether') }, (err, res) => {
      if (!err) {
        console.log(res)
        this.setState({
          amount: ''
        })
        return
      }
      console.log(err)
      this.setState({
        amount: ''
      })
    })
  }

  render() {
    return (
      <div className="box">
        <div className="level">
          <div className="level-item">
            <h2 className="title">
              Buy
                        </h2>
          </div>
        </div>
        <div className="container has-text-centered">
          <div className="columns">
            <div className="column is-4 is-offset-one-quarter">
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input className="input" type="text" value={this.state.amount}
                    placeholder="Amount" onChange={this.amountHandler.bind(this)}>
                  </input>
                </div>
                <div className="control">
                  <a className="button is-static">
                    Tokens = {this.state.amount / this.state.rate} Ether
                                    </a>
                </div>
              </div>
            </div>
            <div className="column is-2">
              <a className="button is-info" onClick={this.buy.bind(this)}>
                <span className="icon is-small">
                  <i className="fa fa-shopping-cart"></i>
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