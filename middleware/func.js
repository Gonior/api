module.exports = {
    handleError : (err) => {
        let errors = []
        if (err.errors) {
            for(const key in err.errors) {
                let error = {
                    field : key, 
                    message : err.errors[key].properties.message
                }
                errors.push(error)
            }
        }
        return errors
    }
}