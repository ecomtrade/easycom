const API_URL =
process.env.NODE_ENV !== 'production'
    ? "http://localhost:4000"
    : "productionurl";

const Apis = {
  //Authentication api
  GetUserLogin: `${API_URL}/api/auth/rootLogin`,
  GetUserRegsiter: `${API_URL}/api/auth/register`,
  GetUserProfile: `${API_URL}/api/auth/getUserProfile`,
  GetAllUserList: `${API_URL}/api/auth/user/getAllUserList`,
  GetUserUpdate: `${API_URL}/api/auth/user/update`,
  GetDeleteUserList: `${API_URL}/api/auth/user/delete`,


  // category api
  CreateCategoryList: `${API_URL}/api/category/create`,
  GetAllCategoryList: `${API_URL}/api/category/main-list`,
  UpdateCategoryList: `${API_URL}/api/category/main-list/update`,
  DeleteCategory: `${API_URL}/api/category/delete`,

  // product api
  CreateProductList: `${API_URL}/api/product/create`,
  GetAllProductList: `${API_URL}/api/product/main-list`,
  UpdateProduct: `${API_URL}/api/product/main-list/update`,
  DeleteProduct: `${API_URL}/api/product/delete`,

  GetProductById: `${API_URL}/api/product/getProductById`,
  GetProductPhotoDeleteById: `${API_URL}/api/product/aws/delete/photo`,
  GetUploadProductImage: `${API_URL}/api/product/upload-img`,
  GetAllProductPhoto: `${API_URL}/api/product/getAllPhoto`,

  // brand api
  GetAllBrandList: `${API_URL}/api/brand/main-list`,  

};
export { API_URL, Apis };
