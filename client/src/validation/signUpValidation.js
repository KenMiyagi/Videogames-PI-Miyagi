function loginValidation(userData){
    const errors = {};
    //Email errors
    if(!(/\S+@\S+\.\S+/).test(userData.email)) errors.email = "Wrong email format."
    if(!userData.email) errors.email = "You must enter an email."
    if(userData.email.length >35)errors.email = "Email must not exceed 35 characters"

    //Username errors
    if(!userData.userName) errors.userName = "You must enter a Username."
    if(userData.userName.length >15) errors.userName = "Username must not exceed 15 characters"
    if(userData.userName.length <3) errors.userName = "Username too short"

    //Password1 errors
    if(!/.*\d+.*/.test(userData.password1)) errors.password1 = "Password must contain at least one number"
    if(userData.password1.length <= 6 ) errors.password1 = "The password must have more than 6 characters."     
    if(userData.password1.length >= 10) errors.password1 = "Password must not exceed 10 characters"     

    //Password2 errors
    if(!/.*\d+.*/.test(userData.password2)) errors.password2 = "Password must contain at least one number"
    if(userData.password2.length <= 6 ) errors.password2 = "The password must have more than 6 characters."     
    if(userData.password2.length >= 10) errors.password2 = "Password must not exceed 10 characters"
    if(userData.password2 !== userData.password1) errors.password2 = "Passwords doesn't match"

    return errors;
}

export default loginValidation