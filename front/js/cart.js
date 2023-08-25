let kanap = JSON.parse(localStorage.getItem("kanap"));

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
    total = 0
    NbrArticles = 0
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
        kanapArcticles.data_id = kanap[i]._id;
        kanapArcticles.data_color = kanap[i]._color;
        kanapArcticles.className = "cart__item";

        //Ajout des éléments dans la div:
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
        kanapArcticles.appendChild(kanapDescription);

        //let content = document.createElement("div");
        //content.className = "cart__item__content__description";
        //kanapArcticles

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
        divSetting;className = "cart__item__content__settings";
        divCartItems.appendChild(divSetting);

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
        inputQuantity.setAttribute("min" , "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.setAttribute("name", "itemQuantity");

        //création de la div pour supprimer
        let divSupprimer = document.createElement("div");
        divSupprimer.className = "cart__item__content__settings__delete";
        divCartItems.appendChild(divSupprimer);

        //Ajout d'un "p" pour le bouton supprimer
        let SuppItem = document.createElement("p");
        SuppItem.className = "deleteItem";
        divSupprimer.appendChild(SuppItem);
        SuppItem.innerText = "Supprimer";

        const totalProduit = () => {
            let itemQuantity = document.getElementsByClassName("itemQuantity");
            let produitQuantity = itemQuantity.length;

            let totalArticle = 0;

            for (let j = 0; j < produitQuantity; ++j ) {
                totalArticle += itemQuantity[j].valueAsNumber;
            }

            let totalPrix = 0;
            for(let k = 0; k< produitQuantity; ++k) {
                totalPrix += itemQuantity[k].valueAsNumber * productData.price;
            }

            let totalQuantity = document.getElementById("totalQuantity");

            // On affiche la quantité sur la page html:
            totalQuantity.innerText = totalArticle;

            let TotalDesPoduits = document.getElementById("totalPrice");
            TotalDesPoduits.innerText = totalPrix;
        }
        totalProduit();
    }
    
}