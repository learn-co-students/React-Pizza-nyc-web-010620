import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state = {
    pizzas: [],
    editForm: {
      id: "",
      topping: "",
      size: "",
      vegetarian: null
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/pizzas`)
    .then(res => res.json())
    .then(js => this.setState({pizzas: js}))
  }

  bringUpEditForm = (pizzaProps) => {
    this.setState({
      editForm:{
        id: pizzaProps.id,
        topping: pizzaProps.topping,
        size: pizzaProps.size ,
        vegetarian: pizzaProps.vegetarian,
      }
   })

   console.log(this.state)

  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm selectedPizza={this.state.editForm}/>
        <PizzaList pizzas={this.state.pizzas} bringUpEditForm={this.bringUpEditForm}/>
      </Fragment>
    );
  }
}

export default App;
