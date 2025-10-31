
// close & open
const countainerForm = document.querySelector(".countainerForm");
const close = document.querySelector(".close");
const btnAddReservation = document.querySelector(".btnAddReservation")

close.addEventListener('click', () => {
    countainerForm.style.display = 'none';
    idEdit = -1;
})
btnAddReservation.addEventListener('click', () => {
    countainerForm.style.display = 'flex';
})


let idEdit = -1;
//jours entre 1 et 5
// valider le formulaire
const Name = document.querySelector(".name");
const heureDebut = document.querySelector(".heureDebut");
const heureFin = document.querySelector(".heureFin");
const nombrePersonnes = document.querySelector(".nombrePersonnes");
const typeRservation = document.querySelector(".typeRservation");
// console.log(typeRservation.value);
const jourReservation = document.querySelector(".jourReservation");
const inputs = document.querySelectorAll(".input-style");//tous le sinputs
const formulaire = document.querySelector(".formulaire");//form

//card des reservation dispo
const cardsReservation = document.querySelector(".cards-reservation");


//spanEreur
const erreurDDebut = document.querySelector(".erreurDDebut");
const erreurDFin = document.querySelector(".erreurDFin");

//get info from localstorage if exist
let reservationInfo = JSON.parse(localStorage.getItem('reservations')) || [];
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
        } else if (input.classList.contains('jourReservation') && (jourReservation.value < 1 || jourReservation.value > 5)) {
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
            if (parseInt(heureFin.value) < 12 || parseInt(heureFin.value > '00')) {
                erreurDFin.innerHTML = "l'heur doit etre entre 12 et 23";
                erreurDFin.style = "color:red;";
                input.value = "";
                valide = false;
            }
            else {
                erreurDFin.innerHTML = "";
            }
            if (heureDebut.value > heureFin.value) {
                // heureFin=='00'?
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
        // const idvalue=id.value();
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

        let isunique = false;
        
        for (let i = 0; i < reservationInfo.length; i++) {
            // if (parseInt(reservationInfo[i].heureDebut) == heureDebutValue) {
            if (idEdit == reservationInfo[i].id) {
                continue;
            }
            if (parseInt(reservationInfo[i].heureDebut) === parseInt(heureDebutValue) && parseInt(reservationInfo[i].jourReservation) === parseInt(jourReservationValue)) {
                isunique = true;
                break;
            }
            // if ( parseInt(reservationInfo[i].id)===idvalue) {
            //     console.log("hello");
                
            // }
            // if ( parseInt(reservationInfo.id)===idRes.id) {
            //     console.log("hello");
                
            //     AfficherCalendrier(reservationInfo);
            // }
        }

        if (isunique) {
            alert("ce temps est deja reserver choisir un autre temps");
            formulaire.reset();
        } else if(idEdit!=-1) {
            // reservationInfo[idEdit] = reservationObject;

            reservationInfo = reservationInfo.map((e)=>{
                if (idEdit == e.id) {
                    return reservationObject; 
                }
                return e;
            })

            console.log(reservationInfo[idEdit]);
            
            addToLocalStorage(reservationInfo);
            AfficherCalendrier(reservationInfo);
            alert("Reservation enregistree avec succes !");
            formulaire.reset();
            countainerForm.style.display = 'none';
            idEdit = -1;
        } else {

            
            reservationInfo.push(reservationObject);
            addToLocalStorage(reservationInfo);

            AfficherCalendrier(reservationInfo);
            alert("Reservation enregistree avec succes !");
            formulaire.reset();
            countainerForm.style.display = 'none';
        }


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
                 <div class="div-btn-reservation">
                <button class="edit-btn" id="${e.id}"><img src="images/edit.svg"alt="none"></button>
                <button class="delete-btn" id="${e.id}"><img src="images/delete.svg"alt="none"></button>
                </div>
                `;
                case1Div.appendChild(div1);
                virifierTime(e.heureDebut, e.heureFin, div1,e.typeRservation);
                // console.log(e.typeRservation);
                
                // console.log(case1Div);
                break;
            case 2:
                // console.log(e.jourReservation);
                const div2 = document.createElement("div");
                div2.innerHTML = `${e.Name}
                ${e.heureDebut}
                ${e.heureFin}
                <div class="div-btn-reservation">
                <button class="edit-btn" id="${e.id}"><img src="images/edit.svg"alt="none"></button>
                <button class="delete-btn" id="${e.id}"><img src="images/delete.svg"alt="none"></button>
                </div>
                `;
                case2Div.appendChild(div2);
                virifierTime(e.heureDebut, e.heureFin, div2,e.typeRservation);
                break;
            case 3:
                const div3 = document.createElement("div");
                div3.innerHTML = `${e.Name}
                ${e.heureDebut}
                ${e.heureFin}
                <div class="div-btn-reservation">
                <button class="edit-btn" id="${e.id}"><img src="images/edit.svg"alt="none"></button>
                <button class="delete-btn" id="${e.id}"><img src="images/delete.svg"alt="none"></button>
                </div>
                `;
                case3Div.appendChild(div3);
                //fonction qui return le 
                virifierTime(e.heureDebut, e.heureFin, div3,e.typeRservation);

                break;
            case 4:
                const div4 = document.createElement("div");
                div4.innerHTML = `${e.Name}
                ${e.heureDebut}
                ${e.heureFin}
                <div class="div-btn-reservation">
                <button class="edit-btn" id="${e.id}"><img src="images/edit.svg"alt="none"></button>
                <button class="delete-btn" id="${e.id}"><img src="images/delete.svg"alt="none"></button>
                </div>
                `;
                case4Div.appendChild(div4);
                virifierTime(e.heureDebut, e.heureFin, div4,e.typeRservation);


            case 5:
                const div5 = document.createElement("div");
                div5.innerHTML = `${e.Name}
                ${e.heureDebut}
                ${e.heureFin}
                <div class="div-btn-reservation">
                <button class="edit-btn" id="${e.id}"><img src="images/edit.svg"alt="none"></button>
                <button class="delete-btn" id="${e.id}"><img src="images/delete.svg"alt="none"></button>
                </div>
                `;
                case5Div.appendChild(div5);
                virifierTime(e.heureDebut, e.heureFin, div5,e.typeRservation);
                break;
            default:
                console.log("none");
                // alert
                break;


        }


    })
    deleteReservation(reservationInfo);
    updateReservation();
}
//permet la supprissio dun element
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
//cette fonction permet de positionner l'element selon l'heur
function virifierTime(heureDebut, heureFin, element,typeRservation) {
    // console.log(typeRservation);
        
    if (parseInt(heureDebut) == 12) {
        
        element.style = "font-weight: 700;display:flex;font-size: 12px; align-items: center; width: 93px; height: 5.7em; background: #c79ddc; text-align: center; border-radius: 3px; border-left: 4px #1c023f5c solid;margin-bottom: 5px;position: absolute;top: 4px;";
        // console.log(element);
    } else if (parseInt(heureDebut) == 13) {
        element.style = "font-weight: 700;display:flex;font-size: 12px; align-items: center; width: 93px; height: 5.7em; background: #c79ddc; text-align: center; border-radius: 3px; border-left: 4px #1c023f5c solid;margin-bottom: 5px;position: absolute;top:4.7rem; ";
    }
    else if (parseInt(heureDebut) == 14) {
        element.style = "font-weight: 700;display:flex;font-size: 12px; align-items: center; width: 93px; height: 5.7em; background: #c79ddc; text-align: center; border-radius: 3px; border-left: 4px #1c023f5c solid;margin-bottom: 5px;position: absolute;top:9.12rem;; ";
    } else if (parseInt(heureDebut) == 15) {
        element.style = "font-weight: 700;display:flex;font-size: 12px; align-items: center; width: 93px; height: 5.7em; background: #c79ddc; text-align: center; border-radius: 3px; border-left: 4px #1c023f5c solid;margin-bottom: 5px;position: absolute;top: 13.56rem; ";
    }
    else if (parseInt(heureDebut) == 16) {
        element.style = "font-weight: 700;display:flex;font-size: 12px; align-items: center; width: 93px; height: 5.7em; background: #c79ddc; text-align: center; border-radius: 3px; border-left: 4px #1c023f5c solid;margin-bottom: 5px;position: absolute;top:18rem;; ";
    }
    else if (parseInt(heureDebut) == 17) {
        element.style = "font-weight: 700;display:flex;font-size: 12px; align-items: center; width: 93px; height: 5.7em; background: #c79ddc; text-align: center; border-radius: 3px; border-left: 4px #1c023f5c solid;margin-bottom: 5px;position: absolute;top: 22.44rem; ";
    }
    else if (parseInt(heureDebut) == 18) {
        element.style = "font-weight: 700;display:flex;font-size: 12px; align-items: center; width: 93px; height: 5.7em; background: #c79ddc; text-align: center; border-radius: 3px; border-left: 4px #1c023f5c solid;margin-bottom: 5px;position: absolute;top: 26.87rem; ";
    }
    else if (parseInt(heureDebut) == 19) {
        element.style = "font-weight: 700;display:flex;font-size: 12px; align-items: center; width: 93px; height: 5.7em; background: #c79ddc; text-align: center; border-radius: 3px; border-left: 4px #1c023f5c solid;margin-bottom: 5px;position: absolute;top: 31.28rem; ";
    }
    else if (parseInt(heureDebut) == 20) {
        element.style = "font-weight: 700;display:flex;font-size: 12px; align-items: center; width: 93px; height: 5.7em; background: #c79ddc; text-align: center; border-radius: 3px; border-left: 4px #1c023f5c solid;margin-bottom: 5px;position: absolute;top: 35.7rem; ";
    }
    else if (parseInt(heureDebut) == 21) {
        element.style = "font-weight: 700;display:flex;font-size: 12px; align-items: center; width: 93px; height: 5.7em; background: #c79ddc; text-align: center; border-radius: 3px; border-left: 4px #1c023f5c solid;margin-bottom: 5px;position: absolute;top: 40.14rem; ";
    }
    else if (parseInt(heureDebut) == 22) {
        element.style = "font-weight: 700;display:flex;font-size: 12px; align-items: center; width: 93px; height: 5.7em; background: #c79ddc; text-align: center; border-radius: 3px; border-left: 4px #1c023f5c solid;margin-bottom: 5px;position: absolute;top: 44.6rem; ";
    }
    else if (parseInt(heureDebut) == 23) {
        element.style = "font-weight: 700;display:flex;font-size: 12px; align-items: center; width: 93px; height: 5.7em; background: #c79ddc; text-align: center; border-radius: 3px; border-left: 4px #1c023f5c solid;margin-bottom: 5px;position: absolute;top: 49.05rem;";
    }
    
        virifierTicket(typeRservation,element);

}

function virifierTicket(typeRservation,element) {
    if (typeRservation==="VIP") {
        element.style.background="ff000036"        
    } else if(typeRservation==="standard") {
        element.style.background="#08bdac63"
    }else if(typeRservation==="groupe"){
        element.style.background="#899bff87"
    }

    // console.log(typeRservation);
    
}
function updateReservation() {
    const btnUpdate = document.querySelectorAll(".edit-btn");
    // console.log(btnUpdate[0].id);

    btnUpdate.forEach((btnUpdate) => {
        btnUpdate.addEventListener('click', () => {
            countainerForm.style.display = 'flex';
            idRes = reservationInfo.find(reservation => reservation.id == Number(btnUpdate.id));
            idEdit=Number(btnUpdate.id);
            // console.log(idRes);
            if (!idRes)return;
            Name.value=idRes.Name;
            heureDebut.value=idRes.heureDebut;
            heureFin.value=idRes.heureFin;
            nombrePersonnes.value=idRes.nombrePersonnes;
            typeRservation.value=idRes.typeRservation;
            jourReservation.value=idRes.jourReservation;
            
            const res1 =reservationInfo.filter(res=>res.id !== Number(btnUpdate.id));
            // console.log(res1);


        })
    })

}