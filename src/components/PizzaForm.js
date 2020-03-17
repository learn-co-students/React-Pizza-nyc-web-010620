import React from "react"

export default class PizzaForm extends React.Component {

  render(){
  return(
    <form onSubmit={this.props.handleSubmit}>
      <div className="form-row">
        <div className="col-5">
            <input onChange={this.props.handleChange} name="topping" type="text" className="form-control" placeholder="Pizza Topping" value={this.props.pizza.topping} />
        </div>
        <div className="col">
          <select onChange={this.props.handleChange} value={this.props.pizza.size} name="size" className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" onChange={this.props.handleVeggieChange} type="radio" name="vegetarian" value="Vegetarian" checked={this.props.pizza.vegetarian}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" onChange={this.props.handleVeggieChange} name="vegetarian" type="radio" value="Not Vegetarian" checked={!this.props.pizza.vegetarian}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={() => console.log("this a submit")}>Submit</button>
        </div>
      </div>
      </form>
  )
  }
}
