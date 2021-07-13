import kue from 'kue';
import { db } from './models';
import config from './config';

export var queue = kue.createQueue({
    prefix: 'q',
    redis: {
        host: config.redis.host,
        port: config.redis.port,
        auth: config.redis.password
    }
});

export default {
    init: () => {
        queue.process('img-upload', function (job, done) {
            Promise.all([
                db.ProductPhotos.bulkCreate(job.data.attachmentEntries),
                db.ProductPhotos.destroy({
                    where: {
                        id: job.data.productId
                    }
                })
            ])
            .then(r => {
                done(true);
            })
            .catch(err => {
                console.log('error - ' + err);
                done(false);
            })
        });

    }

}