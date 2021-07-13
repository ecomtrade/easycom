import axios from 'axios'
import { Apis } from '../../config'
import { authHeaders } from '../../common/handler'
export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST'
export const GET_CART_LIST = 'GET_CART_LIST'
export const GET_BRAND_LIST = 'GET_BRAND_LIST'

export const getCategoryList = async () => {
    try {
        const response = await axios.get(Apis.GetAllCategoryList, authHeaders())
        return response.data
    } catch (e) {
        throw e
    }
}
export const createCategoryList = async (data) => {
    try {
        const response = await axios.post(Apis.CreateCategoryList, data, authHeaders())
        return response.data
    } catch (e) {
        throw e
    }
}

export const deleteCategoryList = async (id) => {
    try {
        const response = await axios.delete(`${Apis.DeleteCategory}/${id}`, authHeaders())
        return response.data
    } catch (e) {
        throw e
    }
}
export const updateCategoryList = async (data) => {
    try {
        const response = await axios.put(Apis.UpdateCategoryList, data, authHeaders())
        return response.data
    } catch (e) {
        throw e
    }
}
export const getProductList = () => (dispatch) => {
    axios.get(Apis.GetAllProductList, authHeaders()).then((res) => {
        return dispatch({
            type: GET_PRODUCT_LIST,
            payload: res.data,
        })
    })
}
export const createProductList = async (data) => {
    try {
        const response = await axios.post(Apis.CreateProductList, data, authHeaders())
        return response.data
    } catch (e) {
        throw e
    }
}

export const deleteProductList = async (id) => {
    try {
        const response = await axios.delete(`${Apis.DeleteProduct}/${id}`, authHeaders())
        return response.data
    } catch (e) {
        throw e
    }
}
export const updateProductList = async (data) => {
    try {
        const response = await axios.put(Apis.UpdateProduct, data, authHeaders())
        return response.data
    } catch (e) {
        throw e
    }
}
