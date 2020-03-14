import React from "react"

const Pizza = (props) => {
  const {topping, size, vegetarian} = {...props}
  return(
    <tr>
      <td>{topping}</td>
      <td>{size}</td>
      <td>{vegetarian? "yes" : "no"}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => props.bringUpEditForm(props)}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
