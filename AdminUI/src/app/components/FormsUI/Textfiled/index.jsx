import React from 'react'
import { RichTextEditor } from 'app/components'
import { TextField } from "@material-ui/core";
import { useField } from "formik";

const TextfiledWrapper = ({
    name,
    ...otherProps
}) => {
    const [filed, meta] = useField(name);

    const configTextfield = {
        ...filed,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    };

    if (meta && meta.touched && meta.error) {
        configTextfield.error = true; // if error then show 
        configTextfield.helperText = meta.error; // error message show
    }

    return (otherProps.richTextEdit ? (<RichTextEditor {...configTextfield} />) : (<TextField {...configTextfield} />))
}

export default TextfiledWrapper;