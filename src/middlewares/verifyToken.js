const jwt = require('jsonwebtoken');


function verifyToken (req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            msg: 'Por favor ingrese su token para realizar esta acción'
        })
    }
    
    jwt.verify(token, 'my_secret_key', function(err){
        if(err){
            return res.status(500).json({
                msg: err
            })
        }else{
            const decoded = jwt.verify(token, 'my_secret_key')
            req.userEmail = decoded.email;
            next();
        }
    });
}
module.exports = verifyToken;