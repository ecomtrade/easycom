import React, { useState, useEffect } from 'react'
import { Breadcrumb, Snackbar } from 'app/components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Icon, Grid, Card, Button as Buttons } from '@material-ui/core'
import Textfield from '../../../components/FormsUI/Textfiled'
import Select from '../../../components/FormsUI/Select'
import Checkbox from '../../../components/FormsUI/Checkbox'
import Button from '../../../components/FormsUI/Button'

import {
    updateProductList,
    getCategoryList,
    getBrandList,
} from '../../../redux/actions/EcommerceActions'

const statusList = { 0: 'Inactive', 1: 'Active' }

const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    subTitle: Yup.string().required('Sub Title is required'),
    slug: Yup.string().required('Slug is required'),
    summary: Yup.string(),
    description: Yup.string().required('Description is required'),
    photo: Yup.string(),
    qty: Yup.number().required('Quantity is required'),
    price: Yup.number().required('Price is required'),
    discount: Yup.number().required('Discount is required'),
    isFeatured: Yup.boolean(),
    catId: Yup.string().required('Product must select'),
    brandId: Yup.string(),
    status: Yup.string().required('Required'),
})

const EditProduct = (props) => {
    console.log('props.state++++', props)
    const currentData = props.location.state.data
    const productList = props.location.state.productList

    const [isAlive, setIsAlive] = useState(true)
    const [categoryList, setCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])

    const [state, setState] = useState({
        title: currentData.title,
        subTitle: currentData.subTitle,
        slug: currentData.slug,
        summary: currentData.summary,
        description: currentData.description,
        photo:
            process.env.NODE_ENV !== 'production'
                ? 'http://localhost:4000/' + currentData.photo
                : 'productionurl/' + currentData.photo,
        qty: currentData.qty,
        price: currentData.price,
        discount: currentData.discount,
        isFeatured: currentData.isFeatured,
        catId: currentData.catId,
        brandId: currentData.brandId,
        status: currentData.status === 'active' ? 1 : 0,
        imgSrc: [],
    })

    const [openSnack, setOpenSnack] = useState({
        open: false,
        message: '',
        variant: '',
    })

    useEffect(() => {
        getCategories()
        getBrands()
        return () => setIsAlive(false)
    }, [isAlive])

    const getCategories = async () => {
        await getCategoryList().then((res) => {
            if (isAlive) setCategoryList(res.data && res.data)
        })
    }

    const getBrands = async () => {
        await getBrandList().then((res) => {
            if (isAlive) setBrandList(res.data && res.data)
        })
    }

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Products', path: '/catalog/product' },
                        { name: 'Edit Product' },
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
                        data.append('id', props.match.params.id)
                        data.append(
                            'photo',
                            typeof values.photo !== 'object' ? '' : values.photo
                        )
                        data.append('title', values.title)
                        data.append('subTitle', values.subTitle)
                        data.append('slug', values.slug)
                        data.append('qty', values.qty)
                        data.append('price', values.price)
                        data.append('discount', values.discount)
                        data.append('summary', values.summary)
                        data.append('description', values.description)
                        data.append('isFeatured', values.isFeatured)
                        data.append('catId', values.catId)
                        data.append('brandId', values.brandId)
                        data.append('status', values.status)

                        await updateProductList(data)
                            .then((res) => {
                                props.history.push('/catalog/product', {
                                    isSnack: true,
                                    message: res.message,
                                })
                            })
                            .catch((err) => {
                                console.log('Product Error:: ', err)
                                setOpenSnack({
                                    open: true,
                                    message: err.message,
                                    variant: 'error',
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
                                        name="subTitle"
                                        label="Sub Title"
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
                                        isObj={true}
                                        options={statusList}
                                    />

                                    <Checkbox
                                        className="w-full"
                                        name="isFeatured"
                                        legend="Is Feature?"
                                        label="Yes"
                                        checked={values.isFeatured}
                                    />

                                    <Textfield
                                        className="mb-4 w-full"
                                        name="summary"
                                        label="Summary"
                                        multiline
                                        rows={5}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Textfield
                                        className="mb-4 w-full"
                                        name="qty"
                                        label="Quantity"
                                        type="number"
                                    />

                                    <Textfield
                                        className="mb-4 w-full"
                                        name="price"
                                        label="Price"
                                        type="number"
                                    />

                                    <Textfield
                                        className="mb-4 w-full"
                                        name="discount"
                                        label="Discount%"
                                        type="number"
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
                                                        )

                                                        let reader =
                                                            new FileReader()
                                                        reader.readAsDataURL(
                                                            event.target
                                                                .files[0]
                                                        )
                                                        reader.onloadend = (
                                                            e
                                                        ) => {
                                                            setState({
                                                                imgSrc: [
                                                                    reader.result,
                                                                ],
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
                                            {currentData.photo != '' && (
                                                <img
                                                    src={
                                                        state.imgSrc != ''
                                                            ? state.imgSrc
                                                            : state.photo
                                                    }
                                                    alt={state.title}
                                                    className="w-200 border-radius-4 mb-4"
                                                />
                                            )}
                                        </Grid>
                                    </Grid>

                                    {categoryList.length > 0 && (
                                        <Select
                                            className="mb-4 w-full"
                                            name="catId"
                                            label="Category"
                                            isObj={false}
                                            options={categoryList}
                                        />
                                    )}

                                    {brandList.length > 0 && (
                                        <Select
                                            className="mb-4 w-full"
                                            name="brandId"
                                            label="Brand"
                                            isObj={false}
                                            options={brandList}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Textfield
                                    className="w-full"
                                    name="description"
                                    label="Description"
                                    richTextEdit={true}
                                    content={values.description}
                                    handleContentChange={(desc) =>
                                        setFieldValue('description', desc)
                                    }
                                    placeholder="Detailed descriptions here..."
                                />
                            </Grid>
                            <Button className="mt-4">
                                <Icon>send</Icon>
                                <span className="pl-2 capitalize">Update</span>
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    )
}

export default EditProduct
