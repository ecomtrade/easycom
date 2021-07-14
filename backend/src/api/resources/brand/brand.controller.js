import { db } from '../../../models';
const { Op } = require("sequelize");

export default {
    async getMainList(req, res, next) {
            try {
                await db.Brand.findAll()
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
}


