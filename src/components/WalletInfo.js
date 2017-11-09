import React, { Component } from 'react'
import { CONTRACT } from '../contract.js'

export default class WalletInfo extends Component {

  constructor() {
    super()
    this.state = {
      coinbase: '',
      balance: 0,
      tokens: 0,
      interval: null
    }
  }

  updateChecker() {
    var interval = setInterval(() => {
      this.update()
    }, 1000)

    this.setState({
      interval: interval
    })
  }

  componentWillMount() {
    this.update()
    this.updateChecker()
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  update() {
    web3.eth.getCoinbase((err, cb) => {
      if (!err) {
        if (cb == null) {
          this.setState({
            coinbase: "Not Logged In",
            balance: 0,
            tokens: 0
          })
          return
        }

        if (cb != this.state.coinbase) {
          this.setState({
            coinbase: cb
          })
        }

        CONTRACT._eth.getBalance(this.state.coinbase, (err, bal) => {
          if (!err && bal != this.state.balance) {
            this.setState({
              balance: web3.fromWei(bal, 'ether').toNumber()
            })
          }
          else if (err) {
            console.log(err)
          }
        })

        CONTRACT.balanceOf(this.state.coinbase, (err, tkns) => {
          if (!err & tkns != this.state.tokens) {
            this.setState({
              tokens: web3.fromWei(tkns, 'ether').toNumber()
            })
          }
          else if (err) {
            console.log(err)
          }
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
        <div className="container has-text-centered">
          <div className="columns">
            <div className="column is-6">
              <p className="subtitle">
                <span className="icon">
                  <i className="fa fa-user-circle-o"></i>
                </span>
                <strong> {this.state.coinbase}</strong>
              </p>
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