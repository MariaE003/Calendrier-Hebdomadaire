
// close & open
const countainerForm = document.querySelector(".countainerForm");
const close = document.querySelector(".close");
const btnAddReservation = document.querySelector(".btnAddReservation")

close.addEventListener('click', () => {
    countainerForm.style.display = 'none';
})
btnAddReservation.addEventListener('click', () => {
    countainerForm.style.display = 'flex';
})




