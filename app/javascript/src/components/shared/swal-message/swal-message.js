import Swal from 'sweetalert2';

export const swalMessage = (message, icon) => {
  Swal.fire({
    position: 'center',
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 1500
  });
};
