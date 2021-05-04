export const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);;
}
  
export const emailValid = (value: string|undefined) => {
    return value && value.trim().length > 0 && validateEmail(value || '') ? true : false;
}
  
export const passwordValid = (value: string|undefined) => {
    return value && value.length > 8 ? true : false;
}
  
export const nameValid = (value: string|undefined) => {
    return value && value.length > 1 ? true : false;
}
  