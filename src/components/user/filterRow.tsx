import React, { useState } from 'react'

interface filterItemUI {
  list: string[];
  item: string;
}

export const FilterRow = (props:filterItemUI) => {

  const [visible,setVisible] = useState(false)

  const toggleVisibility = () => {setVisible(!visible)}

  const handleSelectAll = () => {
    // If originally not checked, set all checkboxes below to checked
    const allCheck = document.getElementById(props.item) as HTMLInputElement
    let dummy
    if (allCheck.checked)
      for (let i=0; i<props.list.length; i++) {
        dummy = document.getElementById(props.item + i) as HTMLInputElement
        if (!dummy.checked)
          dummy.checked = true
      }
  }

  return(
    <div>
      <h4 className="filterHeading" onClick={toggleVisibility} >{props.item}</h4>

      {visible
      ? <div className='filterRow' key={props.item} >
        <input className="filterBox" id={props.item} type="checkbox" name="all" value={props.item} onClick={handleSelectAll}>
        </input>
        <label htmlFor={props.item}>
          All
        </label>
      </div>
      : null
    }

      {visible
      ? props.list.map((option,id) => {
  	    const idForButton = props.item + String(id)

        const handleSelectItem = () => {
          // If not checked, make sure 'all' is also unchecked
          const itemCheck = document.getElementById(idForButton) as HTMLInputElement
          const allCheck = document.getElementById(props.item) as HTMLInputElement
          if (itemCheck && !itemCheck.checked)
            allCheck.checked = false
        }

  	    return (
  	  	  <div className='filterRow' key={idForButton} >
  	  	    <input className="filterBox" id={idForButton} type="checkbox" name={option} value={idForButton} onClick={handleSelectItem}>
            </input>
  	  	    <label htmlFor={idForButton}>
  	  	  	  {option}
  	  	    </label>
  	  	  </div>
  	    )
      })
      : null
      }
    </div>
  )
}