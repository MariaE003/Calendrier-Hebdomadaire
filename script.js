
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


//jours entre 1 et 7
// valider le formulaire
const Name = document.querySelector(".name");
const heureDebut = document.querySelector(".heureDebut");
const heureFin = document.querySelector(".heureFin");
const nombrePersonnes = document.querySelector(".nombrePersonnes");
const typeRservation = document.querySelector(".typeRservation");
const jourReservation = document.querySelector(".jourReservation");
const inputs = document.querySelectorAll(".input-style");//tous le sinputs
const formulaire = document.querySelector(".formulaire");//form
//spanEreur
const erreurDDebut = document.querySelector(".erreurDDebut");
const erreurDFin = document.querySelector(".erreurDFin");

//get info from localstorage if exist
const reservationInfo = JSON.parse(localStorage.getItem('reservations')) || [];
// console.log(reservationInfo);
AfficherCalendrier(reservationInfo);
formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
    validerFormulaire();
})



function validerFormulaire() {
    let valide = true;
    const regex = /^[A-Za-z\s]+$/;
    // console.log(typeof heureDebut.value);
    inputs.forEach((input) => {
        if (input.value.trim() === "") {
            input.style.outline = "red 0.5px solid";
            input.placeholder = 'ce champest obligatoire';
            valide = false;
        } else if (input.classList.contains('name') && !regex.test(input.value)) {
            input.style.outline = "red 0.5px solid";
            input.value = "";
            input.placeholder = 'entrez un nom valide (lettres uniquement)';
            valide = false;
        } else if (input.classList.contains('jourReservation') && (jourReservation.value < 1 || jourReservation.value > 6)) {
            input.style.outline = "red 0.5px solid";
            input.value = "";
            input.placeholder = "entrez un nombre entre 1 et 7";
            valide = false;
        }

        else if (input.classList.contains('heureDebut')) {
            if (parseInt(heureDebut.value) < 12 || parseInt(heureDebut.value > 23)) {
                erreurDDebut.innerHTML = "l'heur doit etre entre 12 et 23";
                erreurDDebut.style = "color:red;";
                input.value = "";
                valide = false;
            } else {
                erreurDDebut.innerHTML = "";
            }
        }
        // else if(input.classList.contains('heureFin')){
        //     erreurDFin.innerHTML="l'heur doit etre entre 12 et 23";
        //     erreurDFin.style="color:red;";
        //     input.value = "";
        //     valide = false;
        // }
        //si condition debut superieur que date fin
        else if (input.classList.contains('heureFin')) {
            if (parseInt(heureFin.value) < 12 || parseInt(heureFin.value > 23)) {
                erreurDFin.innerHTML = "l'heur doit etre entre 12 et 23";
                erreurDFin.style = "color:red;";
                input.value = "";
                valide = false;
            }
            else {
                erreurDFin.innerHTML = "";
            }
            if (heureDebut.value > heureFin.value) {
                erreurDFin.innerHTML = "l'heur de fin doit etre superieur de la date l'heur de depart ";
                erreurDFin.style = "color:red;";
                input.value = "";
                valide = false;
            }

        }
        else if (input.classList.contains('nombrePersonnes') && nombrePersonnes.value < 1) {
            input.style.outline = "red 0.5px solid";
            input.value = "";
            input.placeholder = "Entrez un nombre superieur de 1";
            valide = false;
        }
        else {
            input.style.outline = "none";
        }
    })

    if (valide) {
        const NameValue = Name.value.trim();//supprimer les espace mn debut et la fin du mot " "
        const heureDebutValue = heureDebut.value.trim();
        const heureFinValue = heureFin.value.trim();
        const nombrePersonnesValue = nombrePersonnes.value.trim();
        const typeRservationValue = typeRservation.value.trim();
        const jourReservationValue = jourReservation.value.trim();
        const reservationObject = { id: Date.now(), Name: NameValue, heureDebut: heureDebutValue, heureFin: heureFinValue, nombrePersonnes: nombrePersonnesValue, typeRservation: typeRservationValue, jourReservation: jourReservationValue };
        reservationInfo.push(reservationObject);
        localStorage.setItem('reservations', JSON.stringify(reservationInfo));

        AfficherCalendrier(reservationInfo);
        alert("Reservation enregistree avec succes !");
        formulaire.reset();
        countainerForm.style.display = 'none';

    }
}



function AfficherCalendrier(reservationInfo) {
    const case1Div = document.querySelector(".case1");

    console.log(reservationInfo[0].jourReservation);

    // res.innerHTML=reservationInfo[0].Name;
    // console.log(res);

    reservationInfo.forEach((e) => {

        switch (parseInt(reservationInfo[0].jourReservation)) {
            case 1:
                const res = document.createElement("div");
                res.innerHTML = `${e.Name}
                ${e.heureDebut}
                ${e.heureFin}
                ${e.nombrePersonnes}
                `;
                case1Div.appendChild(res);
                res.style = "display: flex;font-size: 14px; align-items: center; width: 93px; height: 7em; background: #c79ddc; text-align: center; border-radius: 3px; border-left: 4px #1c023f5c solid; ";
                // console.log(case1Div);
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            default:
                break;
        }

        


    })
}
