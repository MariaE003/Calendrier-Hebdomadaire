
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


// valider le formulaire
const Name = document.querySelector(".name");
const heureDebut = document.querySelector(".heureDebut");
const heureFin = document.querySelector(".heureFin");
const nombrePersonnes = document.querySelector(".nombrePersonnes");
const typeRservation = document.querySelector(".typeRservation");
const jourReservation = document.querySelector(".jourReservation");
const inputs = document.querySelectorAll(".input-style");//tous le sinputs
const formulaire = document.querySelector(".formulaire");//form



formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
     const regex = /^[A-Za-z]+$/;
    inputs.forEach((input) => {
        if (input.value.trim()==="") {
            input.style.outline ="red 0.5px solid";
            input.placeholder='ce champest obligatoire';
        }else if(input.classList.contains('name') && !regex.test(input.value)){
            input.style.outline = "red 0.5px solid";
            input.value="";
            input.placeholder='Entrez un nom valide (lettres uniquement)';
        }else{
            input.style.outline = "none";
        }
    })
})




