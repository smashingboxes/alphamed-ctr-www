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

export const confirmSwalMessage = (message, icon, cb) => {
  Swal.fire({
    position: 'center',
    icon: icon,
    title: message,
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: `Confirm`,
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      cb();
    }
  });
};
