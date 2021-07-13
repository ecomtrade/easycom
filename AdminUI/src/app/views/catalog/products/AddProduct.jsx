import React, { useState } from 'react'
import { Breadcrumb, Snackbar } from 'app/components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Icon, Grid, Card, Button as Buttons } from '@material-ui/core'
import Textfield from '../../../components/FormsUI/Textfiled'
import Select from '../../../components/FormsUI/Select'
import Checkbox from '../../../components/FormsUI/Checkbox'
import Button from '../../../components/FormsUI/Button'
import { createCategoryList } from '../../../redux/actions/EcommerceActions'

const statusList = { 0: 'Inactive', 1: 'Active' }

const requiredForParentCategory = (requiredText) => ({
    is: false,
    then: Yup.string().required(requiredText),
})

const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    slug: Yup.string().required('Slug is required'),
    summary: Yup.string(),
    photo: Yup.string(),
    isParent: Yup.boolean(),
    parentCategory: Yup.string().when(
        'isParent',
        requiredForParentCategory(
            "If it's not a parent category then choose the parent one"
        )
    ),
    status: Yup.string().required('Required'),
})

const AddProduct = (props) => {
    const categoryList = props.location.state

    const [state, setState] = useState({
        title: '',
        slug: '',
        summary: 'Describe your category',
        photo: '',
        isParent: false,
        parentCategory: 0,
        status: 1,
        imgSrc: [],
    })

    const [openSnack, setOpenSnack] = useState({
        open: false,
        message: '',
        variant: ''
    })

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Categories', path: '/catalog/category' },
                        { name: 'Add Category' },
                    ]}
                />
            </div>

            <Snackbar
                open={openSnack.open}
                message={openSnack.message}
                variant={openSnack.variant}
                handleCloseSnack={() => setOpenSnack(false)}
            />

            <Card className="px-6 pt-2 pb-4">
                <Formik
                    initialValues={{
                        ...state,
                    }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={async (values) => {
                        console.log('onSubmitonSubmit', values)

                        let data = new FormData()
                        data.append('photo', (typeof values.photo !== 'object') ? "" : values.photo)
                        data.append('title', values.title)
                        data.append('slug', values.slug)
                        data.append('summary', values.summary)
                        data.append('isParent', values.isParent)
                        data.append('parentCategory', values.parentCategory)
                        data.append('status', values.status)

                        await createCategoryList(data).then((res) => {
                            props.history.push('/catalog/category', {
                                isSnack: true,
                                message: res.message
                            });
                        }).catch((err) => {
                            console.log('Category Error:: ', err.message);
                            setOpenSnack({
                                open: true,
                                message: err.message,
                                variant: 'error'
                            })
                        })
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setSubmitting,
                        setFieldValue,
                    }) => (
                        <Form>
                            <Grid container spacing={6}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Textfield
                                        className="mb-4 w-full"
                                        name="title"
                                        label="Title"
                                    />

                                    <Textfield
                                        className="mb-4 w-full"
                                        name="slug"
                                        label="Slug"
                                    />
                                    <Select
                                        className="mb-4 w-full"
                                        name="status"
                                        label="Status"
                                        options={statusList}
                                    />
                                    {categoryList.length > 0 && <Checkbox
                                        className="w-full"
                                        name="isParent"
                                        legend="Is Parent?"
                                        label="Yes"
                                        checked={values.isParent}
                                    />}
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Textfield
                                        className="mb-4 w-full"
                                        name="summary"
                                        label="Summary"
                                        multiline
                                        rows={5}
                                    />

                                    <Grid container spacing={6}>
                                        <Grid item sm={6} xs={6}>
                                            <label htmlFor="upload-multiple-file">
                                                <Buttons
                                                    className="mb-4 w-full capitalize"
                                                    color="primary"
                                                    component="span"
                                                    variant="contained"
                                                >
                                                    <div className="flex items-center">
                                                        <Icon className="pr-8">
                                                            cloud_upload
                                                        </Icon>
                                                        <span>
                                                            Upload image
                                                        </span>
                                                    </div>
                                                </Buttons>
                                            </label>
                                            <div className="flex">
                                                <input
                                                    className="hidden"
                                                    name="photo"
                                                    onChange={(event) => {
                                                        setFieldValue(
                                                            'photo',
                                                            event.target
                                                                .files[0]
                                                        );
                                                       
                                                        let reader = new FileReader();
                                                        reader.readAsDataURL(event.target.files[0]);
                                                        reader.onloadend = (e) => {
                                                            setState({
                                                                imgSrc: [reader.result],
                                                            })
                                                        }
                                                    }}
                                                    id="upload-multiple-file"
                                                    type="file"
                                                />
                                                {errors && errors.photo && (
                                                    <p className="m-0 mb-4 MuiFormHelperText-root Mui-error">
                                                        {errors.photo}
                                                    </p>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item sm={6} xs={6}>
                                            {state.imgSrc != null && (
                                                <img
                                                    src={state.imgSrc}
                                                    alt={state.title}
                                                    className="w-200 border-radius-4 mb-4"
                                                />
                                            )}
                                        </Grid>
                                    </Grid>

                                    {!values.isParent && (
                                        <Select
                                            className="mb-4 w-full"
                                            name="parentCategory"
                                            label="Parent Category"
                                            options={categoryList}
                                        />
                                    )}
                                    {/* <DateTimePicker
                                    className="mb-4 w-full"
                                    name="date"
                                    label="Date"
                                /> */}
                                </Grid>
                            </Grid>

                            <Button>
                                <Icon>send</Icon>
                                <span className="pl-2 capitalize">Create</span>
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    )
}

export default AddProduct
