const db = require('../database/models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sgMail = require('@sendgrid/mail');


const userController = {
    register : async (req, res) => {
        const {name, email, password} = req.body;
        sgMail.setApiKey(process.env.API_KEY);

        const sendMail = async (msg) => {
            await sgMail.send(msg);
        }

        try {
            const user = await db.User.create({
                name,
                email,
                password: bcryptjs.hashSync(password, 10),
                token: jwt.sign({ email }, 'my_secret_key')
            })

            if(user){
                sendMail({
                    to: email,
                    from: 'joelalexandertrinidad@gmail.com',
                    subject: 'Challenge Alkemy | NodeJs backend',
                    text: `Bienvenid@ a mi api! se ha generado un nuevo token, con él podrás realizar el crud correspondiente: ${user.token}`
                })
                let response = {
                    ok: true,
                    meta: {
                        status: 200,
                        data: {
                            user: user.name,
                            email: user.email
                        }
                    },
                    msg: '¡El usuario se creó con éxito! se envió un email con un nuevo token, o simplemente puede logearse para visualizarlo',
                    login: 'Para logearse debe ingresar el mail registrado y su contraseña'
                }
                return res.status(200).json(response)
            }

        } catch (error) {
            console.log(error)
        }
    },
    login : async (req, res) => {
        const {email, password} = req.body;
        try {
            const user = await db.User.findOne({
                where: {
                    email
                },
            })

            if(!user){
                let response = {
                    meta: {
                        status: 404
                    },
                    msg: `¡El usuario con el email ${email} no se encuentra registrado!`
                }
                return res.status(404).json(response);
            }

            const validPass = bcryptjs.compareSync(password, user.password);

            if(!validPass){
                return res.status(404).json({
                    auth: false,
                    token: null
                })
            }

            let response = {
                auth: true,
                meta: {
                    status: 200
                },
                msg: '¡Usuario logeado con éxito!',
                token: user.token
            }
            return res.status(200).json(response);
        
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = userController;