import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    currentPizza: {
      id: '',
      topping: '',
      size: '',
      vegetarian: false
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
      .then(resp => resp.json())
      .then(pizzas => this.setState({pizzas}))
  }

  handleClick = (pizza) => {
    console.log(pizza)
    this.setState({
      ...this.state.pizzas,
      currentPizza: {
        id: pizza.id,
        topping: pizza.topping,
        size: pizza.size,
        vegetarian: pizza.vegetarian
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      ...this.state.pizzas,
      currentPizza: {
        ...this.state.currentPizza,
          [e.target.name]: e.target.value
      }
    })
  }

  handleVeggieChange = (e) => {
    let status = e.target.value == "Vegetarian" ? true : false
    this.setState({
      ...this.state.pizzas,
      currentPizza: {
        ...this.state.currentPizza,
          vegetarian: status
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/pizzas/${this.state.currentPizza.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify( this.state.currentPizza ) })
      .then(response => response.json())
      .then(pizza => {
        let thisPizzaIndex = this.state.pizzas.findIndex(za => za.id === pizza.id)
        let copyArr = [...this.state.pizzas]
        copyArr[thisPizzaIndex] = pizza
        this.setState({
          pizzas: copyArr
        })
      })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm handleSubmit={this.handleSubmit} pizza={this.state.currentPizza} handleVeggieChange={this.handleVeggieChange} handleChange={this.handleChange}/>
        <PizzaList pizzas={this.state.pizzas} handleClick={this.handleClick}/>
      </Fragment>
    );
  }
}

export default App;
