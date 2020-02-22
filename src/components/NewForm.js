import React from 'react'

const NewForm = (props) => {
  return (
    <div>
      <form onSubmit={props.add}>
        Name:
        <input 
          value={props.value}
          onChange={props.onChange}
        />
        <button type="submit">Add Athlete</button>
      </form>
    </div>
    )
}

export default NewForm