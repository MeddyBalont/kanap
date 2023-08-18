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
        let kanapArcticles = document.createElement('articles');
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
        kanapDescription.className = "cart__item__description";
        kanapArcticles.appendChild(kanapDescription);

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
        kanapArcticles.appendChild(KanapPrice);
        KanapPrice.innerText = `${productData.price} €`;






        total = kanap[i].quantity*productData.price + total;
        
        console.log((kanap[i].quantity*productData.price))

        NbrArticles = kanap[i].quantity + NbrArticles
        
    }
    console.warn(total)
    console.log(NbrArticles);
}