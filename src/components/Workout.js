import React from 'react'

const Workout = (props) => {
  return (
    <div>
      <form onSubmit={props.add}>
      <table>
        <tbody>
          <tr>
            <td>Athlete: </td>
            <td><input value={props.name} onChange={props.nameChange} /></td>
          </tr>
          <tr>
            <td>Workout: </td>
            <td><input value={props.workout} onChange={props.workoutChange} /></td>
          </tr>
          <tr>
            <td>Date: </td>
            <td><input type="date" value={props.date} onChange={props.dateChange} /></td>
          </tr>
          <tr>
            <td>Notes:</td>
            <td><textarea value={props.note} rows="10" cols="30" onChange={props.noteChange} /></td>
          </tr>
          <tr>
            <td></td>
            <td><button type="submit">Save</button></td>
          </tr>
        </tbody>
      </table>
      </form>
    </div>
  )
}

export default Workout