import React from 'react'
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const CheckboxWrapper = ({
    name,
    label,
    legend,
    ...otherProps
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = event => {
        const {checked} = event.target;
        setFieldValue(name, checked);
    };

    const configCheckbox = {
        ...field,
        ...otherProps,
        variant: 'outlined',
        onChange: handleChange,
    };

    const configFormControl = {};

    if (meta && meta.touched && meta.error) {
        configFormControl.error = true; // if error then show 
    }

    return (
        <FormControl {...configFormControl}>
            <FormLabel component="legend">{legend}</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox {...configCheckbox} />}
                    label={label}
                />
            </FormGroup>
        </FormControl>
    )
}

export default CheckboxWrapper;