const productId = new URLSearchParams(window.location.search).get("id");
console.log(productId);
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
    let kanapImgContainer = document.getElementsByClassName("item__img")[0];

    let kanapImg = document.getElement("img");
    let kanapName = document.getElementById("title");
    let kanapPrice = document.getElement("price");
    let kanapDescription = document.getElement("description");

    kanapImg.src = data.imageUrl;
    kanapName.textContent = data.name;
    kanapPrice.textContent = data.price;
    kanapDescription.textContent = data.kanapDescription;

    kanapImgContainer.appendChild(kanapImg);
    choixCouleurs(data);
    SelectionnerQuantity(data);
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

function SelectionnerQuantity(){
    let selectionQuantity = document.querySelector('input[type="number"]');
    
}


let affichekanap = (data)=>{
    console.log(data);
   
};

}