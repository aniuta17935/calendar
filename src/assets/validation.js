const Validation = {
    validateNotEmpty: function(field, value, element) {
        if (value) {
            element.className = 'valid';
            return null;
        } else {
            element.className = 'invalid';
            return {
                message: `The "${field}" field cannot be empty`
            }
        }
    },
    validateEmail: function(field, email, element) {
        const letters = /^\S+@\S+\.\S+$/;
        if (!email) {
            element.className = 'invalid';
            return {
                message: `The "${field}" field cannot be empty`
            }
        } else if (email.length < 5) {
            element.className = 'invalid';
            return {
                message: `The "${field}" field must contain at least 5 characters`
            }
        } else if (!letters.test(email)) {
            element.className = 'invalid';
            return {
                message: `The "${field}" field can only contain letters, numbers, and symbols . and @`
            }
        } else {
            element.className = 'valid';
            return null;
        }
    },
}
export default Validation;