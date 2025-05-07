const errorHandler = (statusCode , message) =>{
    const error = new Error(); //Is line mein ek naya error object banaya ja raha hai JavaScript ke built-in Error constructor ko use karke.
    error.statusCode = statusCode;
    error.message = message;
    return error;
}
export default errorHandler // Yeh line  function ko default export kar rahi hai. Matlab, isko kisi bhi doosre file mein import karke use kiya ja sakta hai.