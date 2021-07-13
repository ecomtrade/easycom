import React from 'react'
import { TextField } from "@material-ui/core";
import { useField } from "formik";

const DateTimePicker = ({
    name,
    ...otherProps
}) => {
    const [field, meta] = useField(name);


    const configDateTimePicker = {
        ...field,
        ...otherProps,
        type: 'date',
        fullWidth: true,
        variant: 'outlined',
        InputLabelProps: {
            shrink: true
        },
    };

    if (meta && meta.touched && meta.error) {
        configDateTimePicker.error = true; // if error then show 
        configDateTimePicker.helperText = meta.error; // error message show
    }

    return (
        <TextField {...configDateTimePicker} />
    )
}

export default DateTimePicker;