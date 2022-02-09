const authorization = (req, res, next) => {

    console.log("MIDDLEWARE: \t AUTHORIZATION")

    const role  = res.locals.user.role;

    if (role !== 'admin') {
        console.log("\t \t UNAUTHORIZED!!! ")
        return res.sendStatus(403);
    }

    console.log("\t \t AUTHORIZED ")
    next()
}

module.exports = authorization