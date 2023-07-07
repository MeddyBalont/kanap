const productId = new URLSearchParams(window.location.search).get("id");
console.log(productId);

//Tableau de donnée des produits selectionné
let selectedKanap ={};
//Le produit selectionné est l'id du produit
selectedKanap._id = productId;
console.log(selectedKanap);
//Je récupère le contenu de mon back avec l'ID de kanap via un url
if (productId !== null){
fetch(`http://localhost:3000/api/products/${productId}`)
.then ((response) => { 
    return response.json();
})
.then (data =>{
    //appel de la procédure 
    affichekanap(data);
    //function selectionner


    //let kanapImgContainer = document.getElementsByClassName("item__img")[0];
    item = document.createElement("div");
    item.setAttribute("class", "item__img");
    let kanapImg = document.createElement("img");
    kanapImg.setAttribute("src",data.imageUrl)
    item.appendChild(kanapImg);
    

    //let kanapImg = document.getElementsByClassName("item_img");
    
    //let kanapName = document.getElementById("title");
    //kanapName.setAttribute("id","title");

    //let kanapPrice = document.getElementById("price");
    //let kanapDescription = document.getElementById("description");
    //console.log(kanapImg);

    //kanapImg.src = data.imageUrl;
    //kanapName.textContent = data.name;
    //kanapPrice.textContent = data.price;
    //kanapDescription.textContent = data.kanapDescription;

    //kanapImgContainer.appendChild(kanapImg);
    //choixCouleurs(data);
    //SelectionnerQuantity(data);
    console.log(data);
})

.catch(err => console.log("erreur :(",err));

//Création des couleurs

function choixCouleurs(data){
    let kanapCouleurs = document.getElementById("colors")
    data.colors.forEach(color => {
        let showCouleurs = document.createElement("option");
        showCouleurs.value = color;
        showCouleurs.innerText = color;
        kanapCouleurs.appendChild(showCouleurs);
        
    });
}
//Choix de quantité dynamique
function SelectionnerQuantity(){
    let selectionQuantity = document.querySelector('input[type="number"]');
    //On regarde se qu'il se passe dans l'input
    selectionQuantity.addEventListener("input",(e)=> {
        console.log(selectionQuantity)
        //on récupère la valeur de la cible de l'évènement dans input:
        let quantityProduct = e.target.value;

        //On ajoute la quantité à l'objet quantityProduct:
        selectedKanap.quantity = quantityProduct;
        console.log(quantityProduct);
    });

    //Conditions de validation au clic via le bouton ajouter  au panier
    let orderButton = document.getElementById("addToCart");
    //On regarde ce qu'il se passe sur le bouton #addToCart pour faire l'action:
    orderButton.addEventListener("click", () =>{
        //conditions

        let color = document.getElementById("colors").value;
        console.log(color);
        if (
            //valeur créées dynamiquement
            selectedKanap.quantity < 1 ||
            selectedKanap.quantity > 100 ||
            selectedKanap.quantity === undefined ||
            color === "" ||
            color === undefined
        ){
            alert ("Veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100"
            );
        } else {
            selectedKanap.color = color;
            //appel la fonction si condition ok
            ajouterPanier();
        }
        
    });
}


let affichekanap = (data)=>{
    console.log(data);
   
};

}