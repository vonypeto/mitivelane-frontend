import React from 'react'

const TableTextWrapper = (text, record) => {
    return (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: "200px !important"}}>
            {text}
        </div>
    )
}

export default TableTextWrapper