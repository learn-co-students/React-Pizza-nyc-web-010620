import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  
  state={
    pizzas: [],
    pizzaToEdit: {}
  }

  editPizza =(pizza)=>{
    this.setState({
      pizzaToEdit: pizza
    })
  }

  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
      .then(res => res.json())
      .then(pizzas => this.setState( {pizzas} ))
  }
  
  changePizza =(e)=>{
    this.setState(prevState => {
      return {...prevState.pizzaToEdit, topping: e.target.value }
    })
  }
  
  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizzaToEdit={this.state.pizzaToEdit} />
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
