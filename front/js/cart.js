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
    if (kanap === null || kanap.length === 0) {
        document.querySelector("h1").textContent = "Votre panier est vide";
    } else for (let i = 0; i < kanap.length; i++) {
        let item = kanap[i];
        //console.log(kanap);

        const productData = await getData(item.id);
        //console.log(productData.name);

        let kanapImgContainer = document.getElementById("cart__items");
        Objet1 = document.createElement("div");
        Objet1.setAttribute("class", "cart__item__img")
        let KanapImg = document.createElement("img");
        KanapImg.setAttribute("src", kanap.image);
        kanapImgContainer.appendChild(KanapImg);
        


    }
}