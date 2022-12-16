import React, { useState } from 'react'

import './input.scss';

type Props = {
    type: string, 
    value: string,
    changeValue: (e: string) => void
}

const Input = (props: Props) => {
  return (
    <input type="text" value={props.value} onChange={e => props.changeValue(e.target.value)} className='input' placeholder={`Search ${props.type}`} />
  )
}

export default Input;