let kanap = JSON.parse(localStorage.getItem("kanap"));
console.log("kanap");
let products = [];
 
affichageKanap();
 
/*--------------------------------------
         FORMULAIRE
--------------------------------------*/
const btnvalid = document.getElementById("order");
 
btnvalid.addEventListener("click", (event) => {
  event.preventDefault();
 
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };
 
  if (
    !verifFirstName() &&
    !verifLastName() &&
    !verifAdresse() &&
    !verifVille() &&
    !verifMail()
  ) {
 
      Server(contact, products);
    } else {
      alert("Veillez bien remplir votre formulaire !");
      return;
  }
 
  // [Z] Pareil que le commentaire sur le fait de déclarer tes fonctions dans un eventListener
});
 
 
// fonctions
 
async function getData(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => {
      return response.json();
    })
 
    .catch((error) => {
      error = "erreur ";
      alert(error);
    });
}
 
async function affichageKanap() {
  let totalPrix = 0;
  let totalArticle = 0;
  if (kanap === null || kanap.length === 0) {
    document.querySelector("h1").textContent = "Votre panier est vide";
  } else
    for (let i = 0; i < kanap.length; i++) {
      let item = kanap[i];
 
      const productData = await getData(item.id);
 
      let kanapItems = document.getElementById("cart__items");
 
      //ajout de l'article:
      let kanapArcticles = document.createElement("article");
      kanapItems.appendChild(kanapArcticles);
      kanapArcticles.className = "cart__item";
      kanapArcticles.setAttribute("data-id", kanap[i].id);
      products.push(kanap[i].id);
      kanapArcticles.setAttribute("data-color", kanap[i].color);
 
      //Ajout des Elements dans la div:
      let kanapImgContainer = document.createElement("div");
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
      let kanapColor = document.createElement("p");
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
 
      //Ajout d'un "p" qui va contenir qté;
      let divQuantity = document.createElement("div");
      divCartItems.className = "cart__item__content__settings__quantity";
      divSetting.appendChild(divQuantity);
 
      //Ajout d'un "p" qui va contenir la qté
      let cartQuantity = document.createElement("p");
      divQuantity.appendChild(cartQuantity);
      cartQuantity.innerText = "Qté : ";
 
      //Input de la quantité
      let inputQuantity = document.createElement("input");
      divQuantity.appendChild(inputQuantity);
      inputQuantity.value = kanap[i].quantity;
      inputQuantity.className = "itemQuantity";
      inputQuantity.setAttribute("type", "number");
      inputQuantity.setAttribute("min", "1");
      inputQuantity.setAttribute("max", "100");
      inputQuantity.setAttribute("name", "itemQuantity");
      inputQuantity.setAttribute("value", kanap[i].quantity);
 
      //création de la div pour supprimer
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
 
      // On affiche la quantité sur la page html:
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
      let myArticcle = db.closest("article");

      if (window.confirm("Voulez vous supprimer ce produit ?")) {
          let deleteId = myArticcle.dataset._id;
          let deleteColor = myArticcle.dataset.color;
  
          kanap = kanap.filter((el) => el._id !== deleteId || el.color !== deleteColor);
        
          localStorage.setItem("kanap", JSON.stringify(kanap));

          document.location.reload();
        }

    });

  });

}
 
function quantityChanged() {
  const ModifQuantite = document.querySelectorAll(".itemQuantity");
    ModifQuantite.forEach((Md) => {
      Md.addEventListener("change", (event) => {
      event.preventDefault();
      let myQte = Md.closest(".itemQuantity");
      let myArticle = Md.closest("article");
      let kanapId = myArticle.dataset.id;
      let kanapColor = myArticle.dataset.color;
 
      let resultFinal = kanap.find((p) => p.id == kanapId && p.color == kanapColor);

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
 
function containsNumbers(str) {
  return /[0-9]/.test(str);
}
 
function verifFirstName() {
  let prenom = document.getElementById("firstName");
  if (!ValidName(prenom.value)) {

    firstNameErrorMsg.style.display = "block";
    firstNameErrorMsg.textContent = "";

    if (prenom.value.length < 3 || prenom.value.length > 26) {
      firstNameErrorMsg.textContent = "Doit contenir entre 3 et 25 caractères";
    } else if (containsNumbers(prenom.value)){
      firstNameErrorMsg.textContent = "Ne doit pas contenir de chiffre";
    } else {
      firstNameErrorMsg.textContent = "Ne doit pas contenir de caractères spéciaux";
    }
    return true;

  } else {
    firstNameErrorMsg.style.display = "none";
    return false;
  }

}
 
function verifLastName() {
  const nom = document.getElementById("lastName");
  if (!ValidName(nom.value)) {
 
    lastNameErrorMsg.style.display = "block";
    lastNameErrorMsg.textContent = "";
 
    if (nom.value.length < 3 || nom.value.length > 26) {
      lastNameErrorMsg.textContent = "Doit contenir entre 3 et 25 caractères";
    } else if (containsNumbers(nom.value)) {
      lastNameErrorMsg.textContent = "Ne doit pas contenir de chiffre";
    } else {
      lastNameErrorMsg.textContent = "Ne doit pas contenir de caractères spéciaux";
    }
    return true;

  } else {
    lastNameErrorMsg.style.display = "none";
    return false;
  }
}
 
function verifAdresse() {
  const adresse = document.getElementById("address");
  addressErrorMsg.textContent = "";
 
  if (!ValidLieu(adresse.value)) {
    addressErrorMsg.style.display = "block";
    addressErrorMsg.textContent = "Adresse invalide, exemple 1 rue François mansart";
    return true;
  } else {
    addressErrorMsg.style.display = "none";
    return false;
  }
}

function verifVille() {
  const ville = document.getElementById("city");
  cityErrorMsg.textContent = "";
    if (!ValidVille(ville.value)) {
        cityErrorMsg.style.display = "block";
        cityErrorMsg.textContent = "Ne doit pas contenir de chiffres ou de caractère";
        return true;
  } else {
        cityErrorMsg.style.display = "none";
    return false;
  }
}
 
function verifMail() {
  const mail = document.getElementById("email");
    emailErrorMsg.textContent = "";
    if (!Validmail(mail.value)) {
        console.log("erreur sur le mail");
        emailErrorMsg.style.display = "block";
        emailErrorMsg.textContent = "email invalide";
         return true;
  } else {
        console.log("pas d'erreur sur le mail");
         emailErrorMsg.style.display = "none";
        return false;
  }
}
 
// SI il y a une erreur, cette fonction renverra true, sinon false
function ValidName(value) {
  return /^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
}
 
// SI il y a une erreur, cette fonction renverra true, sinon false
function ValidLieu(value) {
  return /^([A-Za-zÀ-ÖØ-öø-ÿ0-9\séè]*-?[A-Za-zÀ-ÖØ-öø-ÿ0-9\séè]*)$/.test(value);
}
 
// SI il y a une erreur, cette fonction renverra true, sinon false
function ValidVille(value) {
  return /^[A-Za-zÀ-ÖØ-öø-ÿ\- ']+$/.test(value);
}
 
// SI il y a une erreur, cette fonction renverra true, sinon false
function Validmail(value) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/.test(value);
}
 
function Server(contact, products) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify({ contact, products }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((server) => {
      orderId = server.orderId;
      if (orderId != "") {
        alert("Votre commande a bien été enregistré");
        location.href = "confirmation.html?id=" + orderId;
      }
    });
}
