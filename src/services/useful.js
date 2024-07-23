export const validator = (type, value) => {
    switch (type) {
        case 'email':
            // Regex for validating an email address
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            return emailRegex.test(value) ? "" : "Invalid e-mail format";

        case 'name':
            // Check if the name length is within the acceptable range
            return value.length > 25 ? "Name should not exceed 25 characters" : "";

        case 'surname':
            // Check if the surname length is within the acceptable range
            return value.length > 25 ? "Surname should not exceed 25 characters" : "";

        case 'phone':
        case 'telefono':
            // Regex for validating a phone number (basic validation)
            const phoneRegex = /^(?=.*?[0-9]).{7,15}$/;
            return phoneRegex.test(value) ? "" : "Invalid phone number format";

        case 'password':
        case 'password2':
        case 'contraseña':
            // Check password length and complexity
            if (value.length < 6) {
                return "Password must be at least 6 characters long";
            }
            // Regex for validating a strong password
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*]{6,20}$/;
            return passwordRegex.test(value) ? "" : "Password must be 6-20 characters long and include at least one uppercase letter and one special character";

        default:
            return "Unknown validation type";
    }
};
