import React from 'react'

const catalogRoutes = [
    {
        path: '/catalog/category/create',
        component: React.lazy(() => import('./categories/AddCategory')),
    },
    {
        path: '/catalog/category/edit/:id',
        component: React.lazy(() => import('./categories/EditCategory')),
    },
    {
        path: '/catalog/category',
        component: React.lazy(() => import('./categories/Categories')),
    },
    {
        path: '/catalog/product/create',
        component: React.lazy(() => import('./products/AddProduct')),
    },
    {
        path: '/catalog/product/edit/:id',
        component: React.lazy(() => import('./products/EditProduct')),
    },
    {
        path: '/catalog/product',
        component: React.lazy(() => import('./products/Products')),
    },
    {
        path: '/catalog/brand',
        component: React.lazy(() => import('./brands')),
    },
    {
        path: '/catalog/banner',
        component: React.lazy(() => import('./banners')),
    },
]

export default catalogRoutes
