import React, { useState, useEffect } from 'react'
import { Breadcrumb, SimpleCard, Snackbar, CustomPagination } from 'app/components'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import {
    IconButton,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Fab,
    Button as Buttons,
    Paper,
    Tooltip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { getProductList, deleteProductList, getCategoryList, getBrandList } from '../../../redux/actions/EcommerceActions'


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}))

const Product = (props) => {
    const [openSnack, setOpenSnack] = useState({
        open: props.location.state && props.location.state.isSnack ? true : false,
        message: props.location.state && props.location.state.message ? props.location.state.message : '',
    })
    const classes = useStyles()
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)

    const [isAlive, setIsAlive] = useState(true)
    const [productList, setProductList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [productData, setProductData] = useState()

    const [open, setOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const handleClickOpen = (product) => {
        console.log('productproductproduct',product);
        setProductData(product)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        getProducts();
        return () => setIsAlive(false)
    }, [isAlive])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handlDeleteById = async (id) => {
        setOpen(false)
        await deleteProductList(id).then((res) => {
            getProducts();
        })
    }

    const getProducts = async () => {
        setLoader(true);
        await getProductList().then((res) => {
            if (isAlive) setProductList(res.data && res.data)
            getCategories();
            getBrands();
            setLoader(false);
        })
    }

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
            <div className="flex flex-wrap justify-between mb-6">
                <div>
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Catalog', path: '/catalog/product' },
                            { name: 'Products' },
                        ]}
                    />
                </div>

                <Snackbar
                    open={openSnack.open}
                    message={openSnack.message}
                    variant={'success'}
                    handleCloseSnack={() => setOpenSnack(false)}
                />
                
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        Permanently delete your product?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {productData && productData.title} product deletion is permanent and you won't be able to  undo it
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Buttons onClick={handleClose} color="primary">
                            Disagree
                        </Buttons>
                        <Buttons onClick={() => handlDeleteById(productData && productData.id)} color="primary" autoFocus>
                            Agree
                        </Buttons>
                    </DialogActions>
                </Dialog>

                <div className="">
                    <Link
                        className="btn btn-primary"
                        to={{
                            pathname: '/catalog/product/create',
                            state: productList,
                        }}
                    >
                        <Tooltip title="Add" aria-label="add">
                            <Fab
                                color="secondary"
                                aria-label="Add"
                                className={classes.fab}
                            >
                                <Icon>add</Icon>
                            </Fab>
                        </Tooltip>
                    </Link>
                </div>
            </div>

            <div className="py-3" />
            <SimpleCard title="Product Lists">
            {
                loader && <LinearProgress color="secondary" />
            }
                <div className="w-full overflow-auto">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="px-0">Title</TableCell>
                                {/* <TableCell className="px-0">Sub Title</TableCell> */}
                                <TableCell className="px-0">Slug</TableCell>
                                <TableCell className="px-0">Featured</TableCell>
                                <TableCell className="px-0">Category</TableCell>
                                <TableCell className="px-0">Brand</TableCell>
                                <TableCell className="px-0">Qty</TableCell>
                                <TableCell className="px-0">Price</TableCell>
                                <TableCell className="px-0">Sell Price</TableCell>
                                <TableCell className="px-0">Discount</TableCell>
                                <TableCell className="px-0">Image</TableCell>
                                <TableCell className="px-0">Status</TableCell>
                                <TableCell className="px-0">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productList
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((subscriber, index) => (
                                    <TableRow key={index}>
                                        <TableCell
                                            className="px-0 capitalize"
                                            align="left"
                                        >
                                            {subscriber.title}
                                        </TableCell>
                                        {/* <TableCell
                                            className="px-0 capitalize"
                                            align="left"
                                        >
                                            {subscriber.subTitle}
                                        </TableCell> */}
                                        <TableCell
                                            className="px-0"
                                            align="left"
                                        >
                                            {subscriber.slug}
                                        </TableCell>
                                        <TableCell
                                            className="px-0"
                                            align="left"
                                        >
                                            {subscriber.isFeatured ? 'Yes' : 'No'}
                                        </TableCell>
                                        <TableCell
                                            className="px-0 capitalize"
                                            align="left"
                                        >
                                            {subscriber.catId == null ? '---' : categoryList.map(cat => subscriber.catId === cat.id && cat.title)}
                                        </TableCell>
                                        <TableCell
                                            className="px-0 capitalize"
                                            align="left"
                                        >
                                            {subscriber.brandId == null ? '---' : brandList.map(brand => subscriber.brandId === brand.id && brand.title)}
                                        </TableCell>
                                        <TableCell
                                            className="px-0"
                                            align="left"
                                        >
                                            {subscriber.qty}
                                        </TableCell>
                                        <TableCell
                                            className="px-0"
                                            align="left"
                                        >
                                            {subscriber.price}
                                        </TableCell>
                                        <TableCell
                                            className="px-0"
                                            align="left"
                                        >
                                            {subscriber.sellingPrice}
                                        </TableCell>
                                        <TableCell
                                            className="px-0"
                                            align="left"
                                        >
                                            {subscriber.discount}%
                                        </TableCell>
                                        <TableCell
                                            className="px-0"
                                            align="left"
                                        >
                                            {subscriber.photo && (
                                                <img
                                                    src={
                                                        process.env.NODE_ENV !==
                                                        'production'
                                                            ? 'http://localhost:4000/' +
                                                              subscriber.photo
                                                            : 'productionurl/' +
                                                              subscriber.photo
                                                    }
                                                    alt={subscriber.title}
                                                    className="w-100 border-radius-4"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell
                                            className="px-0 capitalize"
                                            align="left"
                                        >
                                            {subscriber.status}
                                        </TableCell>
                                        <TableCell className="px-0">
                                            <Link
                                                className="btn btn-primary"
                                                to={{
                                                    pathname: `/catalog/product/edit/${subscriber.id}`,
                                                    state: {
                                                        data: subscriber,
                                                        productList,
                                                    },
                                                }}
                                            >
                                                <Tooltip title="Edit">
                                                    <IconButton aria-label="edit">
                                                        <Icon color="primary">
                                                            edit
                                                        </Icon>
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>
                                            <Tooltip title="Delete">
                                                <IconButton aria-label="delete" onClick={() => handleClickOpen(subscriber)}>
                                                    <Icon color="error">close</Icon>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        className="px-4"
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        component="div"
                        count={productList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                          }}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={CustomPagination}
                    />
                    </TableContainer>
                </div>
            </SimpleCard>
        </div>
    )
}

export default Product
