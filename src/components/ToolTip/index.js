import React from 'react'

export default function ToolTip (props) {
  return props.open && <div>{props.render()}</div>
}
