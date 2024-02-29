//Creating custom error message

export const errorHandler =(statusCode, message)=>{
    //javascript error constructor
    const error = new Error()
    error.statusCode= statusCode;
    error.message= message;
    return error;
}