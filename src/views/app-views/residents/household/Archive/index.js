import React from 'react'

const Archive = (props) => {
  const  { barangay_id } = props
  console.log(barangay_id)
  return (
    <div>Archive: {barangay_id}</div>
  )
}

export default Archive