function loginValidation(userData){
    const errors = {};
    //Email errors
    if(!(/\S+@\S+\.\S+/).test(userData.email)) errors.email = "Wrong email format."
    if(!userData.email) errors.email = "You must enter an email."
    if(userData.email.length >35) errors.email = "Email must not exceed 35 characters"
    //Password errors
    if(!userData.password) errors.password = "You must enter a password"
        
    return errors;
}

export default loginValidation