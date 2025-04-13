const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) 
  {
    console.log("ErrorHandler: ", err.statusCode, err.message)    
    return res.status(err.statusCode).json({ error: err.message });
  }
  else
  {
    let statusCode = 500;
    if(["CastError", "ValidationError"].includes(err.name)) {
      statusCode = 400;
    }
    
    return res.status(statusCode).send({error: err.message});
  }
}

module.exports = errorHandler;
  