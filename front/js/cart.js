
let kanap = JSON.parse(localStorage.getItem("kanap"));
console.log(kanap);
let products = [];

let orderId = "";
affichageKanap()

async function getData(productId) {
    return fetch(`http://localhost:3000/api/products/${productId}`)
        .then((response) => {
            return response.json();
        })

        .catch(error => {
            error = 'erreur ';
            alert(error);
        })
}


//AFFICHAGE DES PRODUITS

async function affichageKanap() {
    let totalPrix = 0;
    let totalArticle = 0;
    if (kanap === null || kanap.length === 0) {
        document.querySelector("h1").textContent = "Votre panier est vide";
    } else for (let i = 0; i < kanap.length; i++) {
        let item = kanap[i];
        //console.log(kanap);

        const productData = await getData(item.id);
        //console.log(productData.name);

        let kanapItems = document.getElementById("cart__items");

        //ajout de l'article:
        let kanapArcticles = document.createElement('article');
        kanapItems.appendChild(kanapArcticles);
        //kanapArcticles.data_id = kanap[i]._id;
        //kanapArcticles.data_color = kanap[i]._color;
        kanapArcticles.className = "cart__item";
        kanapArcticles.setAttribute("data-id", kanap[i].id)
        kanapArcticles.setAttribute("data-color", kanap[i].color)


        //Ajout des Ã©lÃ©ments dans la div:
        let kanapImgContainer = document.createElement("div")
        kanapImgContainer.className = "cart__item__img";
        kanapArcticles.appendChild(kanapImgContainer);

        //Ajout de l'image:
        let kanapImg = document.createElement("img");
        kanapImg.src = productData.imageUrl;
        kanapImg.aslt = productData.alt;
        kanapImgContainer.appendChild(kanapImg);


        //Ajout de la div en lien "article"
        let divCartItems = document.createElement("div");
        divCartItems.className = "cart__item__content";
        kanapArcticles.appendChild(divCartItems);

        //Ajout de la div lien avec le nom, couleur et prix du produit:
        let kanapDescription = document.createElement("div");
        kanapDescription.className = "cart__item__content__description";
        divCartItems.appendChild(kanapDescription);

        //Ajout du "h2" nom du produit:
        let kanapName = document.createElement("h2");
        kanapDescription.appendChild(kanapName);
        kanapName.innerText = productData.name;

        //Ajout d'un "p" pour la coleur du produit:
        let kanapColor = document.createElement("p")
        kanapDescription.appendChild(kanapColor);
        kanapColor.innerText = kanap[i].color;

        //Ajout d'un "p" pour le prix du produit:
        let KanapPrice = document.createElement("p");
        kanapDescription.appendChild(KanapPrice);
        KanapPrice.innerText = `${productData.price} €`;

        //Ajout d'un div lien
        let divSetting = document.createElement("div");
        divSetting.className = "cart__item__content__settings";
        kanapDescription.appendChild(divSetting);

        //Ajout d'un "p" qui va contenir qtÃ©;
        let divQuantity = document.createElement("div");
        divCartItems.className = "cart__item__content__settings__quantity";
        divSetting.appendChild(divQuantity);

        //Ajout d'un "p" qui va contenir la qtÃ©
        let cartQuantity = document.createElement("p");
        divQuantity.appendChild(cartQuantity);
        cartQuantity.innerText = "Qté : ";

        //Input de la quantitÃ©
        let inputQuantity = document.createElement("input");
        divQuantity.appendChild(inputQuantity);
        inputQuantity.value = kanap[i].quantity;
        inputQuantity.className = "itemQuantity";
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("min", "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.setAttribute("name", "itemQuantity");
        inputQuantity.setAttribute("value", kanap[i].quantity)

        //crÃ©ation de la div pour supprimer
        let divSupprimer = document.createElement("div");
        divSupprimer.className = "cart__item__content__settings__delete";
        divSetting.appendChild(divSupprimer);

        //Ajout d'un "p" pour le bouton supprimer
        let SuppItem = document.createElement("p");
        SuppItem.className = "deleteItem";
        divSupprimer.appendChild(SuppItem);
        SuppItem.innerText = "Supprimer";

        //Total articles
        totalArticle += parseInt(item.quantity);

        //Total prix
        totalPrix += parseInt(item.quantity) * productData.price;

        //affichages
        let totalQuantity = document.getElementById("totalQuantity");

        // On affiche la quantitÃ© sur la page html:
        totalQuantity.innerText = totalArticle;

        let TotalDesPoduits = document.getElementById("totalPrice");
        TotalDesPoduits.innerText = totalPrix;

    }
    deleteKanap();
    quantityChanged();
}



function deleteKanap() {
    const deleteB = document.querySelectorAll(".deleteItem");
    deleteB.forEach((db) => {
        db.addEventListener("click", (event) => {
            event.preventDefault();
            let myArticcle = db.closest('article');
            console.log(myArticcle);
            console.log(myArticcle.dataset.id);
            console.log(myArticcle.dataset.color);
            if (window.confirm("Voulez vous supprimer ce produit ?")) {
                let deleteId = myArticcle.dataset._id;
                let deleteColor = myArticcle.dataset.color;

                kanap = kanap.filter(el => el._id !== deleteId || el.color !== deleteColor);
                console.log(kanap);
                localStorage.setItem("kanap", JSON.stringify(kanap));
                document.location.reload();
            }
        });
    })

}

function quantityChanged() {
    const ModifQuantite = document.querySelectorAll(".itemQuantity");
    ModifQuantite.forEach((Md) => {
        Md.addEventListener("change", (event) => {
            event.preventDefault();
            console.log(ModifQuantite);
            let myQte = Md.closest(".itemQuantity");

            let myArticle = Md.closest('article')
            let kanapId = myArticle.dataset.id;
            let kanapColor = myArticle.dataset.color;

            let resultFinal = kanap.find((p) => p.id == kanapId && p.color == kanapColor);
            //let IdentityKanap = kanap.find((objet) => objet.id == articleToSave.id && objet.color == articleToSave.color);
            if (resultFinal) {

                if (parseInt(myQte.value) > 0) {

                    resultFinal.quantity = parseInt(myQte.value);
                }
            }
            localStorage.setItem("kanap", JSON.stringify(kanap));
            document.location.reload();

        });
    });

}

/*--------------------------------------
         FORMULAIRE
--------------------------------------*/
const btnvalid = document.getElementById("order");

btnvalid.addEventListener("click", (event) => {
    event.preventDefault();

const contact = {
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            address:  document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value,
    };

    
    function verifFirstName() {
        const prenom = document.getElementById("firstName");
        if (ValidName(prenom.value)) {
            firstNameErrorMsg.classList.add("opacity")
            firstNameErrorMsg.textContent = "";
            if (prenom.value.length < 3 || prenom.value.length > 26) {
                firstNameErrorMsg.textContent = 'Doit contenir entre 3 et 25 caractÃ¨res'
                return false;
            } else {
                return true;
            }
        } else {
            firstNameErrorMsg.classList.remove("opacity");
            firstNameErrorMsg.textContent = 'Ne doit pas contenir de chiffres';
            return false;
        }
    }

    function verifLastName() {
        const nom = document.getElementById("lastName");

        if (ValidName(nom.value)) {
            lastNameErrorMsg.classList.add("opacity")
            lastNameErrorMsg.textContent = "";
            if (nom.value.length < 3 || nom.value.length > 26) {
                lastNameErrorMsg.textContent = 'Doit contenir entre 3 et 25 caractÃ¨res'
                return false;
            } else {
                return true;
            }
        } else {
            lastNameErrorMsg.classList.remove("opacity");
            lastNameErrorMsg.textContent = 'Ne doit pas contenir de chiffres'
            return false;
        }
    }


    function verifAdresse() {
        const adresse = document.getElementById("address");
        if (ValidLieu(adresse.value)) {
            addressErrorMsg.classList.add("opacity");
            addressErrorMsg.textContent = "";
            return true;
        } else {
            addressErrorMsg.classList.remove("opacity");
            addressErrorMsg.textContent = 'Adresse invalide, exemple 1 rue FranÃ§ois mansart';
            return false;
        }
    }

    function verifVille() {
        const ville = document.getElementById("city");
        if (ValidVille(ville.value)) {
            //console.log(ville);
            cityErrorMsg.classList.add("opacity");
            cityErrorMsg.textContent = "";
            return true;
        } else {
            cityErrorMsg.classList.remove("opacity");
            cityErrorMsg.textContent = "Ne doit pas contenir de chiffres"
            return false;
        }
    }

    function verifMail() {
        const mail = document.getElementById("email");
        if (Validmail(mail.value)) {
            emailErrorMsg.classList.add("opacity");
            emailErrorMsg.textContent = "";
            return true;
        } else {
            emailErrorMsg.classList.remove("opacity");
            emailErrorMsg.textContent = "email invalide"
            return false;
        }
    }

    function ValidName(value) {
        return /^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value)
    }

    function ValidLieu(value) {
        return /^([A-Za-zÀ-ÖØ-öø-ÿ0-9\séè]{1,100})?([-]{0,1})?([A-Za-zÀ-ÖØ-öø-ÿ0-9\séè]{1,100})$/.test(value)

    }

    function ValidVille(value) {
        //return /^([A-Za-z\s-\]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value)
        return /^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value)
    }

    function Validmail(value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/.test(value)
    }

    //Controle de tous les champs. Si un champ est en erreur alor la variable ValidOK sera Ã  false et le formaulaire ne ser pas soumis.
    let ValidOk = verifFirstName() && verifLastName() && verifAdresse() && verifVille() && verifMail();
   
    
    if (ValidOk) { 
        localStorage.setItem("contact",JSON.stringify(contact));
         kanap = JSON.parse(localStorage.getItem("kanap"));
        for (let i = 0; i < kanap.length; i++){
            let item = kanap[i];
            products.push(item.id)
        }
        Server();
        //Si tout est ok on sauvergade et on envoie les infos
       
        //ICI il te faut passer l'objet contact et un tableau de
        //comme prÃ©cisÃ© dans https://course.oc-static.com/projects/DWJ_FR_P5/DW+P5+-+Specifications+fonctionnelles.pdf
        // en derniere page
    } else {

        //ICI, tu peut faire afficher un message d'erreur pour siginfier que le formaulaire ne sera pas soumis
        alert("Pas ok")
    }
    //var orderId = "";
    //console.log('valodeok :', ValidOk);
    function Server () {
        let command = {
            contact : contact,
            products : products,
        }
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body:JSON.stringify(command),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        //.then((response) =>{
            //return response.json();
        //})
        .then((server) => {
            orderId = server.orderId;
            if (orderId !=""){
            alert("Votre commande a bien été enregistré");
            location.href = "confirmation.html?id=" + orderId;
            }
        })
    }
})
