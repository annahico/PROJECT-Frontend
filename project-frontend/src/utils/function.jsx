export const validate = (type, value) => {
    switch (type) {
        case "name":
        case "firstName":
        case "secondName":
            if (value.length < 3) {
                return "The name must be at least 3 characters long";
            }
            return "";

        case "email":
        case "e-mail":
        case "mail":
            // eslint-disable-next-line no-case-declarations
            const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
            if (!emailRegex.test(value)) {
                return "The email format is incorrect";
            }
            return "";

        case "password":
            if (value.length < 6 || value.length > 10) {
                return "The password must be between 6 and 10 characters long";
            }
            return "";

        default:
            return "Default message";
    }
};
