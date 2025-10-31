
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
        //si condition heur debut superieur que heur fin
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
        const reservationObject = {
            id: Date.now(), Name: NameValue, heureDebut: heureDebutValue, heureFin: heureFinValue,
            nombrePersonnes: nombrePersonnesValue, typeRservation: typeRservationValue, jourReservation: jourReservationValue
        };

        // let isunique = false;
        // reservationInfo.forEach((e) => {
        //     // if (parseInt(e.heureDebut) !== heureDebutValue || parseInt(e.heureFin) !== heureFinValue) {
        //     if (parseInt(e.heureDebut) !== heureDebutValue ) {
        //         isunique = true;
        //     }
        // })
        // if (isunique) {
        //     alert("ce temps est deja reserver choisir un autre temps");
        //     formulaire.reset();
        // } else {
        reservationInfo.push(reservationObject);
        addToLocalStorage(reservationInfo);

        AfficherCalendrier(reservationInfo);
        alert("Reservation enregistree avec succes !");
        formulaire.reset();
        countainerForm.style.display = 'none';
        // }


    }
}

function addToLocalStorage(reservationInfo) {
    localStorage.setItem('reservations', JSON.stringify(reservationInfo));

}

function AfficherCalendrier(reservationInfo) {

    const case1Div = document.querySelector(".case1");
    const case2Div = document.querySelector(".case2");
    const case3Div = document.querySelector(".case3");
    const case4Div = document.querySelector(".case4");
    const case5Div = document.querySelector(".case5");

    case1Div.innerHTML = "";
    case2Div.innerHTML = "";
    case3Div.innerHTML = "";
    case4Div.innerHTML = "";
    case5Div.innerHTML = "";

    // console.log(reservationInfo[0].jourReservation);

    // res.innerHTML=reservationInfo[0].Name;
    // console.log(res);

    reservationInfo.forEach((e) => {

        switch (parseInt(e.jourReservation)) {
            case 1:
                const div1 = document.createElement("div");
                div1.innerHTML = `${e.Name}
                ${e.heureDebut}
                ${e.heureFin}
                ${e.nombrePersonnes}
                 <div class="div-btn-reservation">
                <button class="edit-btn" id="${e.id}"><img src="images/edit.svg"alt="none"></button>
                <button class="delete-btn" id="${e.id}"><img src="images/delete.svg"alt="none"></button>
                </div>
                `;
                case1Div.appendChild(div1);
                virifierTime(e.heureDebut, e.heureFin, div1);
                // console.log(case1Div);
                break;
            case 2:
                // console.log(e.jourReservation);
                const div2 = document.createElement("div");
                div2.innerHTML = `${e.Name}
                ${e.heureDebut}
                ${e.heureFin}
                ${e.nombrePersonnes}
                <div class="div-btn-reservation">
                <button class="edit-btn" id="${e.id}"><img src="images/edit.svg"alt="none"></button>
                <button class="delete-btn" id="${e.id}"><img src="images/delete.svg"alt="none"></button>
                </div>
                `;
                case2Div.appendChild(div2);
                virifierTime(e.heureDebut, e.heureFin, div2);
                break;
            case 3:
                const div3 = document.createElement("div");
                div3.innerHTML = `${e.Name}
                ${e.heureDebut}
                ${e.heureFin}
                ${e.nombrePersonnes}
                <div class="div-btn-reservation">
                <button class="edit-btn" id="${e.id}"><img src="images/edit.svg"alt="none"></button>
                <button class="delete-btn" id="${e.id}"><img src="images/delete.svg"alt="none"></button>
                </div>
                `;
                case3Div.appendChild(div3);
                //fonction qui return le 
                virifierTime(e.heureDebut, e.heureFin, div3);

                break;
            case 4:
                const div4 = document.createElement("div");
                div4.innerHTML = `${e.Name}
                ${e.heureDebut}
                ${e.heureFin}
                ${e.nombrePersonnes}
                <div class="div-btn-reservation">
                <button class="edit-btn" id="${e.id}"><img src="images/edit.svg"alt="none"></button>
                <button class="delete-btn" id="${e.id}"><img src="images/delete.svg"alt="none"></button>
                </div>
                `;
                case4Div.appendChild(div4);
                virifierTime(e.heureDebut, e.heureFin, div4);


            case 5:
                const div5 = document.createElement("div");
                div5.innerHTML = `${e.Name}
                ${e.heureDebut}
                ${e.heureFin}
                ${e.nombrePersonnes}
                <div class="div-btn-reservation">
                <button class="edit-btn" id="${e.id}"><img src="images/edit.svg"alt="none"></button>
                <button class="delete-btn" id="${e.id}"><img src="images/delete.svg"alt="none"></button>
                </div>
                `;
                case5Div.appendChild(div5);
                virifierTime(e.heureDebut, e.heureFin, div5);
                break;
            default:
                console.log("none");
                break;


        }
        deleteReservation(reservationInfo);


    })
}


function deleteReservation(reservation) {
    const btnDelete = document.querySelectorAll(".delete-btn");
    // console.log(btnDelete);

    btnDelete.forEach((btnDelete) => {
        btnDelete.addEventListener("click", () => {
            // profiles = profiles.filter(profil => profil.id !== id);
            console.log(btnDelete.id);

            reservation = reservation.filter(reser => reser.id !== parseInt(btnDelete.id));


            addToLocalStorage(reservation);
            AfficherCalendrier(reservation);
        })
    })

}
