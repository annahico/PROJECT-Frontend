import Swal from 'sweetalert2';

// Función para mostrar una alerta personalizada
export const showAlert = (title, text, icon = 'info') => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'Aceptar',
    });
};

// Función para mostrar un mensaje básico
export const messageBasic = (icon = 'success', message = '', position = 'center', showConfirmButton = true, timer = null) => {
    Swal.fire({
        position: position,
        icon: icon,
        title: message,
        showConfirmButton: showConfirmButton,
        timer: timer,
        timerProgressBar: timer !== null, // Mostrar barra de progreso solo si hay un temporizador
    });
};
