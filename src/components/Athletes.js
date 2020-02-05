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
        <button onClick={props.remove}>delete athlete</button>
      </td>
    </tr>
)

export default Athletes