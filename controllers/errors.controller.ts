export const handleMySqlErrors = (err, req, res, next) => {
    if(err.code === "ER_BAD_FIELD_ERROR") {
        return res.status(400).send({msg: "Bad request"})
    }
    next(err)
}

export const handleCustomErrors = (err, req, res, next)=> {
    if(err.status) {
        return res.status(err.status).send({msg: err.msg})
    }
    next(err)
}

export const handleServerErrors = (err, req, res, next) => {
    res.status(500).send({msg: "Something went wrong!"})
}