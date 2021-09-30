import * as yup from 'yup';
import { MIN_USER_NAME, MAX_USER_NAME } from '../../client/Validation';

function ValidateUserData({ name, email, password, repassword })
{
    let Schema = yup.object().shape({
        name: yup.string().min(MIN_USER_NAME).max(MAX_USER_NAME).required(),
        email: yup.string().email(),
        password: yup.string().min(MIN_USER_PASSWORD).max(MAX_USER_PASSWORD).required(),
        repassword: yup.string().oneOf(yup.ref['password', null], 'Passwords must match')
    });

    return Schema.isValid({ name, email, password, repassword });
}

module.exports = { ValidateUserData }