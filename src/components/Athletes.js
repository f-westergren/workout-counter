import React from 'react'

const Athletes = (props) => (
    <tr>
      <td>
        {props.name} 
      </td>
      <td>
        {props.workouts}
      </td>
      <td>
        <button onClick={props.add}>+1</button>
      </td>
      <td>
        <button onClick={props.sub}>-1</button>
      </td>
      <td>
        <button onClick={props.reset}>reset</button>
      </td>
      <td>
        <button onClick={props.remove}>delete</button>
      </td>
    </tr>
)

export default Athletes