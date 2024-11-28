import Swal from 'sweetalert2';

// Success Alert
export const showSuccessAlert = (message: string) => {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
        confirmButtonColor: '#3085d6',
    });
};

// Error Alert
export const showErrorAlert = (message: string) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#d33',
    });
};

// Info Alert
export const showInfoAlert = (message: string) => {
    Swal.fire({
        icon: 'info',
        title: 'Information',
        text: message,
        confirmButtonColor: '#3085d6',
    });
};
