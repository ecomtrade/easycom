import { db } from '../../../models';
import JWT from 'jsonwebtoken';
import mailer from '../../../mailer';
import config from '../../../config';
import bcrypt from 'bcrypt-nodejs';
import speakeasy from 'speakeasy';
import { validateEmail } from './../../../functions'

export default {
    async login(req, res, next) {
        const { email, password } = req.body;
        var passwordHash = bcrypt.hashSync(password);
        db.Users.findOne({ where: { email: email }, paranoid: false })
            .then(user => {
                console.log('user++++', user);
                if (user) {
                    console.log('config.app.validity ', config.app.validity)
                     const accessToken = JWT.sign({ userId: user.id }, config.app.secret, {
                        expiresIn: new Date().setDate(new Date().getDate() + 7),
                    });
                    return res.status(200).json({ 
                        success: true,
                        accessToken,
                        user: {
                            id: user.id,
                            name: user.userName,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            avatar: user.photo,
                            email: user.email,                            
                            phone: user.phoneNo,
                            role: user.role,
                        } 
                    });
                }
                else
                    res.status(400).json({ 'success': false, message: 'Invalid email or password' });
            })
            .catch(err => {
                console.log('loginerr', err);
                res.status(500).json({ 'success': false, message: 'No user found.' });
                next(err);
            })
    },
    async addUser(req, res, next) {
        const { userName, firstName, lastName, phoneNo, email, password } = req.body;
        var passwordHash = bcrypt.hashSync(password);
        db.Users.findOne({ where: { email: email }, paranoid: false })
            .then(find => {
                if (find) {
                    throw new RequestError('Email is already in use', 409);
                }
                return db.Users.create({
                    userName: userName,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNo: phoneNo,
                    password: passwordHash,
                    photo: '',
                    status: 'active',
                    role: 'admin'
                });

            })
            .then(user => {
                if (user) {
                     const accessToken = JWT.sign({ userId: user.id }, config.app.secret, {
                        expiresIn: new Date().setDate(new Date().getDate() + 7),
                    })

                    mailer.sendEmployeePassword(email, accessToken);
                    return res.status(200).json({ 
                        success: true,
                        accessToken,
                        user: {
                            id: user.id,
                            name: user.userName,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            avatar: user.photo,
                            email: user.email,                            
                            phone: user.phoneNo,
                            role: user.role,
                        } 
                    });
                }
                else
                    res.status(500).json({ 'success': false });
            })
            .catch(err => {
                console.log(err)
                next(err);
            })
    },
    async findUser(req, res, next){
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ 'success': false, message: 'Invalid Authorization token' });
        }

        const accessToken = authorization.split(' ')[1];
        const { userId } = JWT.verify(accessToken, config.app.secret);

        db.Users.findOne({ where: { id: userId }, paranoid: false })
            .then(user => {
                if (user) {
                    return res.status(200).json({ 
                        success: true,
                        accessToken,
                        user: {
                            id: user.id,
                            name: user.userName,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            avatar: user.photo,
                            email: user.email,                            
                            phone: user.phoneNo,
                            role: user.role,
                        } 
                    });
                }
                else
                    res.status(500).json({ 'success': false, message: 'Invalid authorization token' });
            })
            .catch(err => {
                console.log(err)
                next(err);
            })
    },
    // async getAllUserList(req,res,next){
    //     db.Users.findAll()
    //     .then(user => {
    //         if (user) {
    //             return res.status(200).json({ success: true, data:user});
    //         }
    //         else
    //             res.status(500).json({ 'success': false });
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         next(err);
    //     })
    // },
    // async userUpdate(req,res,next){
    //     const { id, firstName, lastName, email, password } = req.body;
    //     var passwordHash = bcrypt.hashSync(password);
    //     db.Users.findOne({ where: { email: email }, paranoid: false })
    //         .then(user => {
    //             if (!user) {
    //                 throw new RequestError('User is not found', 409);
    //             }
    //             return db.Users.update({
    //                 firstName: firstName ? firstName: user.firstName,
    //                 lastName: lastName ? lastName: user.lastName,
    //                 password: password ? passwordHash: user.passwordHash,
    //                 role: 'admin',
    //             }, { where: { id: id } })

    //         })
    //         .then(user => {
    //             if (user) {
    //                 return res.status(200).json({ success: true, message: "User update successsfully"});
    //             }
    //             else
    //                 res.status(500).json({ 'success': false });
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             next(err);
    //         })
    // },
    // async deleteUserList(req, res, next) {
    //     db.Users.findOne({ where: { id: req.body.id} })
    //         .then(data => {
    //             if (data) {
    //                 return db.Users.destroy({ where: { id: req.body.id } }).then(r => [r, data])
    //             }
    //             throw new RequestError('User is not found', 409)
    //         })
    //         .then(re => {
    //             return res.status(200).json({ 'status': "deleted userlist Seccessfully" });
    //         }).catch(err => {
    //             next(err)
    //         })
    // },
}




