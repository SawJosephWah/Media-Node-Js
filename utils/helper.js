var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

let fMsg = async (res,con , msg = 'Success',data = []) => {
    res.status(200).json({
        con, 
        msg,
        data
    })
}

let encodePassword = (password) => {
    var hashed = bcrypt.hashSync(password);
    return hashed;
}

let decodePassword = (password,hashed_password) => {
    let passwordCheck = bcrypt.compareSync(password,hashed_password);
    return passwordCheck;
}

let createToken = (payload) => {
    var token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1hr"});
    return token;
}
module.exports = {
    fMsg,
    encodePassword,
    decodePassword,
    createToken
}