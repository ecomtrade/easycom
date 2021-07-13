import React, { useState } from 'react'
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
} from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import history from 'history.js'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        background: '#1A2038',
    },
    card: {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const JwtRegister = () => {
    const [state, setState] = useState({})
    const classes = useStyles()
    const { register } = useAuth()

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = (event) => {
        try {   
            register(state.userName, state.firstName, state.lastName, state.phoneNo, state.email, state.password)
            history.push('/')
        } catch (e) {
            console.log(e)
        }
    }

    let { userName, firstName, lastName, phoneNo, email, password, agreement } = state

    return (
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen',
                classes.cardHolder
            )}
        >
            <Card className={classes.card}>
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <div className="p-8 flex justify-center bg-light-gray items-center h-full">
                            <img
                                className="w-full"
                                src="/assets/images/illustrations/posting_photo.svg"
                                alt=""
                            />
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <div className="p-8 h-full">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="User Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="userName"
                                    value={userName || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="First Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="firstName"
                                    value={firstName || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Last Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="lastName"
                                    value={lastName || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Mobile Number"
                                    onChange={handleChange}
                                    type="text"
                                    name="phoneNo"
                                    value={phoneNo || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={email || ''}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                />
                                <TextValidator
                                    className="mb-4 w-full"
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={password || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <FormControlLabel
                                    className="mb-4"
                                    name="agreement"
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: 'agreement',
                                                value: e.target.checked,
                                            },
                                        })
                                    }
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={agreement || false}
                                        />
                                    }
                                    label="I have read and agree to the terms of service."
                                />
                                <div className="flex items-center">
                                    <Button
                                        className="capitalize"
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Sign up
                                    </Button>
                                    <span className="mx-2 ml-5">or</span>
                                    <Link to="/session/signin">
                                        <Button className="capitalize">
                                            Sign in
                                        </Button>
                                    </Link>
                                </div>
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default JwtRegister
