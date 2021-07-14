import React from 'react'
import { TextField, MenuItem } from '@material-ui/core'
import { useField, useFormikContext } from 'formik'

const SelectWrapper = ({ name, options, ...otherProps }) => {
    const { setFieldValue } = useFormikContext()
    const [field, meta] = useField(name)

    const handleChange = (event) => {
        const { value } = event.target
        setFieldValue(name, value)
    }

    const configSelect = {
        ...field,
        ...otherProps,
        select: true,
        fullWidth: true,
        variant: 'outlined',
        onChange: handleChange,
    }

    if (meta && meta.touched && meta.error) {
        configSelect.error = true // if error then show
        configSelect.helperText = meta.error // error message show
    }

    return (
        <TextField {...configSelect}>
            {otherProps.isObj ? Object.keys(options).map((item, index) => {
                      return (
                          <MenuItem key={index} value={item}>
                              {options[item]}
                          </MenuItem>
                      )
                  })
                : options.map((item, index) => {
                      return (
                          <MenuItem key={index} value={item.id}>
                              {item.title}
                          </MenuItem>
                      )
                  })}
        </TextField>
    )
}

export default SelectWrapper
