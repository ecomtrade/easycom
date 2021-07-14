import { db } from '../../../models';
const { Op } = require("sequelize");

export default {
    async addProduct(req, res, next) {
        try {
            console.log('req.bodyreq.body', req.body)
            const { title, subTitle, slug, qty, price, discount, summary, description,  isFeatured, catId, brandId, status } = req.body;
            await db.Product.findOne({ where: { title: title } })
                .then(data => {
                    if (data) {
                        res.status(400).json({ 'success': false, message: "Record exists, Please create new one." });
                    }
                    return db.Product.create({ 
                        title: title,
                        subTitle: subTitle,
                        slug: slug,
                        summary: summary,
                        description: description,
                        photo: req.file ? req.file.path : '',
                        qty: qty,
                        price: price,
                        discount: discount,
                        sellingPrice: parseFloat(parseInt(price) - (parseInt(price) * parseFloat(discount) / 100)),
                        isFeatured: isFeatured,
                        catId: catId,
                        brandId: brandId,
                        status: status == '1' ? 'active' : 'inactive'
                    })
                })
                .then(category => {
                    res.status(200).json({ 'success': true, message: "Record created successfully" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    async getMainList(req, res, next) {
            try {
                await db.Product.findAll()
                .then(list => {
                        res.status(200).json({ success: true, data: list });
                    })
                    .catch(function (err) {
                        next(err)
                    });
            } catch (err) {
                throw new RequestError('Error');
            }
    },
    async deleteProduct(req, res, next) {
        try {
                await db.Product.findOne({ where: { id: parseInt(req.params.id) } })
                .then(async data => {
                    if (data) {
                        await db.Product.destroy({ where: { [Op.or]: [{ id: data.id }, { parentId: data.id }], } })
                    } else {
                        res.status(400).json({ 'success': false, message: "Record does not exists" });
                    }
                })
                .then(resp => {
                    console.log('rerere', resp)
                    res.status(200).json({ "success": true, message: "Record deleted successfully" });
                }).catch(err => {
                    next(err)
                })
            } catch (err) {
                throw new RequestError('Error');
            }
        
    },
    async getMainListUpdate(req, res, next) {
        try {
            const { id, title, slug, summary, isParent, parentCategory, photo, status } = req.body;
            await db.Product.findOne({ where: { id: id } })
                .then(data => {
                    if (data) {
                        let updateDate;
                        if (req.file) {
                            updateDate = { 
                                title: title,
                                slug: slug,
                                summary: summary,
                                photo: req.file.path,
                                isParent: isParent,
                                parentId: isParent == 'false' ? parentCategory : 0,
                                status: status == '1' ? 'active' : 'inactive'
                            };
                        } else {
                            updateDate = { 
                                title: title,
                                slug: slug,
                                summary: summary,
                                isParent: isParent,
                                parentId: isParent == 'false' ? parentCategory : 0,
                                status: status == '1' ? 'active' : 'inactive'
                            };
                        }
                        return db.Product.update(updateDate, { where: { id: data.id } });
                    } else {
                        res.status(400).json({ 'success': false, message: "Record does not exists" });
                    }
                })
                .then(category => {
                    res.status(200).json({ 'success': true, message: "Record updated successfully" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
}


