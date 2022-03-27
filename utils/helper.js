let fMsg = async (res,con , msg = 'Success',data = []) => {
    res.status(200).json({
        con, 
        msg,
        data
    })
}

module.exports = {
    fMsg
}