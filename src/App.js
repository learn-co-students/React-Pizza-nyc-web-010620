import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    currentPizza: {
      id: "",
      topping: "",
      size: "",
      vegetarian: false
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
    .then(response => response.json())
    .then(response => {
      this.setState({
        pizzas: response
      })
    })
  }

  editPizzaHandler = (pizza) => {
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

  handleSubmit = () => {
    console.log(this.state.currentPizza)
    fetch(`http://localhost:3000/pizzas/${this.state.currentPizza.id}`, {
      method: "PATCH", 
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(this.state.currentPizza)
    }).then(response => response.json())
    .then(response => {
      let foundPizza = this.state.pizzas.findIndex(pizza => pizza.id == response.id)
      let copyArr = [...this.state.pizzas]
      copyArr[foundPizza] = response
      this.setState({
        pizzas: copyArr
      })
    })
  }

  handleToppingChange = (event) => {
    this.setState({
      ...this.state, 
        currentPizza: {
          ...this.state.currentPizza,
          topping: event.target.value
        }
    })
  }

  handleSizeChange = (event) => {
    this.setState({
      ...this.state,
      currentPizza: {
        ...this.state.currentPizza,
        size: event.target.value
      }
    })
  }

  handleVeggieChange = (event) => {
      if(event.target.value === "Vegetarian"){
        this.setState({
          ...this.state,
          currentPizza: {
            ...this.state.currentPizza,
            vegetarian: true
          }
      })
    } else if(event.target.value === "Not Vegetarian"){
      this.setState({
        ...this.state,
        currentPizza: {
          ...this.state.currentPizza,
          vegetarian: false
        }
    })
  }
}


  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.currentPizza} handleToppingChange={this.handleToppingChange} handleSizeChange={this.handleSizeChange} handleVeggieChange={this.handleVeggieChange} handleSubmit={this.handleSubmit}/>
        <PizzaList pizzas={this.state.pizzas} editPizzaHandler={pizza =>this.editPizzaHandler(pizza)}/>
      </Fragment>
    );
  }
}

export default App;
