import React from 'react'

export default function EditButton({pk,setEditOn}) {
    const onClickHandler =() =>{
        setEditOn(prev =>!prev)
    }
  return (
    <div>
        <button onClick={onClickHandler}>Edit</button>
    </div>
  )
}
