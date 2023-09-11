import React from 'react';
import { Input } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function ModifiedTextfield({ label = "", value = "", type="text", onChange = () => { }, options = {} }) {

  options = {
    size: "small",
    id: "outlined-size-small",
    defaultValue: "",
    // variant : "filled",
    horizontalLabel: false,
    showLabel : true,
    required : false,
    ...options,
  }

  const themeStyle = {
    padding: '12px 10px' ,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const labelStyle = {
    padding: '0px 11px 0px 9px',
    minWidth: '160px',
    display: 'flex',
    justifyContent: 'flex-start'
}

  return (
    <>
      {
        options.horizontalLabel ?
          <div style={themeStyle}>
            <label style={labelStyle}>{label}</label>
            <TextField
              id={options.id}
              defaultValue={options.defaultValue}
              size={options.size}
              value={value}
              variant={options.variant}
              onChange={onChange}
              required={options.required}
              type={type}
            />
          </div> :
          <div>
            <TextField
              label={options.showLabel && label}
              id={options.id}
              defaultValue={options.defaultValue}
              size={options.size}
              value={value}
              variant={options.variant}
              onChange={onChange}
              required={options.required}
              type={type}
            />
          </div>
      }
    </>
  )
}
