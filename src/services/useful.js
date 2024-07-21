export const validator = (type, value) => {

    switch(type){

        case 'email':
        case 'correo':
        case 'mail':

            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) ) {
                return "Invalid e-mail format";
            } else {
                return "";
            }
        
        case 'name':

            if(value.length > 25){
                return "Escribe un nombre correcto"
            } else {
                return ""
            }

        case 'surname':

            if(value.length > 25){
                return "Escribe un nombre correcto"
            } else {
                return ""
            }

        case 'phone':
        case 'telefono':

            if (! /(?=.*?[0-9])/.test(value) ) {
                return "Incorrect phone number";
            } else {
                return "";
            }

        case 'password':
        case 'password2':
        case 'contraseña':

            if(value.length <= 4){
                return "Write 4 characters at least"
            } else {


                if (! /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*]{4,12}$/g.test(value) ) {
                    return "Invalid password format";
                } else {
                    return "";
                }
            }


    }
}