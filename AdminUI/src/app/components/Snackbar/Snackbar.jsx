import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
const CustomSnackbar = ({
    open,
    message,
    variant,
    handleCloseSnack,
}) => {

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            autoHideDuration={5000}
            onClose={handleCloseSnack}
        >
            <Alert onClose={handleCloseSnack} severity={variant}>{message}</Alert>
        </Snackbar>

    )
}

export default CustomSnackbar
