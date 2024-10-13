
//Commentaire index.html :


/* 
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
        <img src="../images/product01.jpg" alt="Photographie d'un canapé">
    </div>


    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>Vert</p>
            <p>42,00 €</p>
        </div>


       
       
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>



            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
</article>
    2       84,00
    ci est un message d'erreur
*/


//Commentaire Produit n°1 Description :

/* {
    "colors": [
      "Blue",
      "White",
      "Black"
    ],
    
    "_id": "107fb5b75607497b96722bda5b504926",
    "name": "Kanap Sinopé",
    "price": 1849,
    "imageUrl": "http://localhost:3000/images/kanap01.jpeg",
    "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "altTxt": "Photo d'un canapé bleu, deux places"
  }, 
  
*/



//LE LOCALE STORAGE :
        
//Déclaration de la variable "localStorageProducts" dans laquelles on met les key et les values qui sont dans le local stockage :
let localStorageProducts = JSON.parse(localStorage.getItem("produits"));    


// Variable pour stocker les id de chaque articles présents dans le panier :
    let products = [];


    // Condition de vérification si le panier existe et ou est vide et modification texte :
    if (localStorageProducts == null || localStorageProducts.length == 0) {
        document.querySelector('h1').textContent = '🛒 Le panier est vide 🛒 !';
        document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">0</span> articles) : <span id="totalPrice">0</span> €</p>`;
    }
    
    else{
        document.querySelector('h1').textContent = '🛒 Voici votre panier 🛒 ';
    };
    

    // Création d'une boucle for of dans laquelle ont injecte notre code grâce à un innerHTML et affichage des données :
    
    let i = 0;
    
    for (product of localStorageProducts) {
        //requête Fetch : 
        fetch('https://kanap-bd.vercel.app/api/products/' + product.id)
        .then( (response) => response.json())
        .then( (data) => {

            //Création du tableau pour les produits à envoyer au serveur
            products.push(product.id);


            localStorageProducts[i].imageUrl = data.imageUrl;
            localStorageProducts[i].altTxt = data.altTxt;
            localStorageProducts[i].name = data.name;
            localStorageProducts[i].price = data.price;


            document.querySelector('#cart__items').innerHTML += `<article class="cart__item" data-id= ${localStorageProducts[i].id}  data-color= ${localStorageProducts[i].colors}>
            <div class="cart__item__img">
                <img src=${localStorageProducts[i].imageUrl} alt=${localStorageProducts[i].altTxt}>
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${localStorageProducts[i].name}</h2>
                    <p>Couleur du produit : ${localStorageProducts[i].colors}</p>
                    <p>Prix unitaire : ${localStorageProducts[i].price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p> Qté : ${localStorageProducts[i].quantity} </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${localStorageProducts[i].quantity}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`;

        TotalPriceQuantity();
        deleteProduct();
        modifValue();

        i++;

    });
    
}


//Déclaration d'une const avec une fonction TotalPriceQuantity qui vas afficher la quantity et le price total des produits :
const TotalPriceQuantity = () => {
        
    // quantityTotalCalcul qui contient la quantity de chaque articles qui est dans le local storage :
    var quantityTotalCalcul = 0;

    // priceTotalCalcul qui contient la price de chaque articles qui est dans le local storage :
    var priceTotalCalcul = 0;  

    for (let i = 0; i < localStorageProducts.length; i++) {

        //Déclaration de la variable quantityProduitDansLePanier dans laquelle ont vas chercher la quantity de tout les articles et que l'on met dans quantityTotalCalcul :
        let quantityProduitDansLePanier = localStorageProducts[i].quantity;
        quantityTotalCalcul += parseInt(quantityProduitDansLePanier);

        //Déclaration de la variable priceProduitDansLePanier dans laquelle ont vas chercher le price de chaque articles et que l'on met dans priceTotalCalcul :
        let priceProduitDansLePanier = localStorageProducts[i].price * localStorageProducts[i].quantity;
        priceTotalCalcul += priceProduitDansLePanier;
        
    }
    
    //Affichage des résultat grâce à innerHtml : 
    document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">${quantityTotalCalcul}</span> articles) : <span id="totalPrice">${priceTotalCalcul}</span> €</p>`;
}




//Création function  modifValue qui va changer la quantity des articles :
function modifValue () {

let inputQuantity = Array.from(document.querySelectorAll(".cart__item__content__settings__quantity input"));
let valueQuantity = Array.from(document.querySelectorAll('.itemQuantity'));


//Boucle for en vas chercher tout les input dans lequelle on effectue un addEventListener pour changer la value des articles :
    for (let i = 0; i < inputQuantity.length; i++) {

        inputQuantity[i].addEventListener("change", () => {
        
        // Copie du tableau localStorageProducts dans le tableau tabUpdate :
        tabUpdate = localStorageProducts;
            
        //Création d'une boucle for pour supprimer dans le local storage les valeur altxt, imageUrl, name et price : 
        for (let i = 0; i < tabUpdate.length; i++) { 
        
                delete tabUpdate[i].altTxt;
                delete tabUpdate[i].imageUrl;
                delete tabUpdate[i].name;
                delete tabUpdate[i].price; 
        }
            
        //On modifie la quantité d'un élément à chaque index [i] du tableau écouté :
            tabUpdate[i].quantity = valueQuantity[i].value;

        //Mise à jour du local storage :
            localStorage.setItem("produits", JSON.stringify(tabUpdate));

        //Rafraîchissement de la page :
            window.location.reload();

            TotalPriceQuantity();
        });
    }
}





/******************************** SUPPRESSION DES ARTICLES****************************/




// Fonction de suppression des articles :
function deleteProduct() {

// Récupération boutons supprimer et transformation en tableau avec Array.from :
let btn_supprimer = Array.from(document.querySelectorAll(".deleteItem"));

// Nouveau tableau pour récupérer le tableau localStorageProducts existant et contrôler les suppression :
let tabDelete = [];
  for (let i = 0; i < btn_supprimer.length; i++) {

    // Écoute d'évènements au click sur le tableau des boutons supprimer
    btn_supprimer[i].addEventListener("click", () => {

      // Suppression de l'article visuellement sur la page
      btn_supprimer[i].style.display = "none";

      // Copie du tableau localStorageProducts dans le tableau tabControlDelete
      tabDelete = localStorageProducts;

    
    //Création d'une boucle for pour supprimer dans le local storage les valeur altxt, imageUrl, name et price l'orsque que l'ont supprime un article : 

      for (let i = 0; i < tabDelete.length; i++) { 
        
        delete tabDelete[i].altTxt;
        delete tabDelete[i].imageUrl;
        delete tabDelete[i].name;
        delete tabDelete[i].price;
         
    }

      
      // Array.prototype.splice() supprime un élément à chaque index [i] du tableau écouté
      tabDelete.splice([i], 1);
      
      // Mise à jour du local storage
      localStorageProducts = localStorage.setItem("produits", JSON.stringify(tabDelete));
      

      // Rafraîchissement de la page
      window.location.reload();

      
    });
  }
}



/*************************************  LE FORMULAIRE ********************************/


//Sélection du bouton commander :
let btnSendForm = document.querySelector('#order');


//Écoute du bouton commander sur le click pour pouvoir contrôler, valider et ennoyer le formulaire et les produits au back-end :
btnSendForm.addEventListener('click', (e) => {
e.preventDefault();


//Récupération des valeur du formulaire :
const contact = {
    firstName : document.querySelector("#firstName").value,
    lastName : document.querySelector("#lastName").value,
    address : document.querySelector("#address").value,
    city : document.querySelector("#city").value,
    email : document.querySelector("#email").value,
    
};
    

/******************************** GESTION DU FORMULAIRE ****************************/
    

    function firstNameControle () {     
        //Regex pour le contrôle des champs Prénom :
        const firstName = contact.firstName;  
        let inputFirstName = document.querySelector("#firstName");
        if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(firstName)) {
            inputFirstName.style.border = "solid 2px green";
            document.querySelector("#firstNameErrorMsg").textContent = "";
            return true;
        } 
        
        else {
            inputFirstName.style.border = "solid 2px red";
            document.querySelector("#firstNameErrorMsg").textContent = "Champ Prénom de formulaire invalide, ex: Bernard";
            return false;
        }
        
    }
    


    function lastNameControle () {     
        //Regex pour le contrôle des champs Nom :
        const lastName = contact.lastName; 
        let inputLastName = document.querySelector("#lastName"); 
        if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(lastName)) {
            inputLastName.style.border = "solid 2px green";
            document.querySelector("#lastNameErrorMsg").textContent = "";
            return true;
        } 
                
        else {
            inputLastName.style.border = "solid 2px red";
            document.querySelector("#lastNameErrorMsg").textContent = "Champ Nom de formulaire invalide, ex: Durand";
            return false;
        }
            
    }



    function addressControl () {     
        // Regex pour le contrôle des champs adresse :
        const adresse = contact.address;  
        let inputAddress = document.querySelector("#address");
        if (/^([A-Za-zÀ-ÖØ-öø-ÿ0-9\séè]{1,100})?([-]{0,1})?([A-Za-zÀ-ÖØ-öø-ÿ0-9\séè]{1,100})$/.test(adresse)) {
            inputAddress.style.border = "solid 2px green";
            document.querySelector("#addressErrorMsg").textContent = "";
            return true;
        } 
        
        else {
            inputAddress.style.border = "solid 2px red";
            document.querySelector("#addressErrorMsg").textContent = "Champ Adresse de formulaire invalide, ex: 50 rue de la paix";
            return false;
        }
        
    }



    
    function cityControl () {     
        //Regex pour le contrôle des champs Ville :
        const city = contact.city;  
        let inputCity = document.querySelector("#city");
        if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(city)) {
            inputCity.style.border = "solid 2px green";
            document.querySelector("#cityErrorMsg").textContent = "";
            return true;
        } 
        
        else {
            inputCity.style.border = "solid 2px red";
            document.querySelector("#cityErrorMsg").textContent = "Champ Ville de formulaire invalide, ex: Bordeaux";
            return false;
        }
        
    }




    function emailControle () {     
        //Regex pour le contrôle des champs Email :
        const email = contact.email;  
        let inputMail = document.querySelector("#email");
        if (/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(email)) {
            inputMail.style.border = "solid 2px green";
            document.querySelector("#emailErrorMsg").textContent = "";
            return true;
        } 
        
        else {
            inputMail.style.border = "solid 2px red";
            document.querySelector("#emailErrorMsg").textContent = "Champ Email de formulaire invalide, ex: example@contact.fr";
            return false;
        }
        
    }




    //Contrôle validité formulaire avant envoie dans le locale storage : 
    if (firstNameControle() && lastNameControle() && addressControl() && cityControl() && emailControle()) {
    //Mettre l'objet "contact" dans le local storage :
        localStorage.setItem("contact", JSON.stringify(contact));
        sendFromToServer();
    } 
    
    else {
        alert("❌ Veillez bien remplir le formulaire ❌")
    }
    
    
    /********************************FIN GESTION DU FORMULAIRE ****************************/
     
    // Variable qui récupère l'orderId envoyé comme réponse par le serveur lors de la requête POST :
    var orderId = "";

    
    /*******************************REQUÊTE DU SERVEUR ET POST DES DONNÉES *******************/
    
    
    function sendFromToServer () {
        fetch("https://kanap-bd.vercel.app/api/products/order/", {
            method: "POST",
            body:JSON.stringify({contact, products}) ,
            headers: {
                "Content-Type": "application/json",
            },
        }) 
        
        // Ensuite on stock la réponse de l'api (orderId) :
        .then((response) => {
            return response.json();
        })
        

        .then((server) => {
            orderId = server.orderId;
            // Si la variable orderId n'est pas une chaîne vide on redirige notre utilisateur sur la page confirmation avec la variable :
            if (orderId != "") {
                alert("✅ Votre commande à bient était prise en compte ✅");
                location.href = "confirmation.html?id=" + orderId;
            }
        })
    }
})


/******************************* FIN REQUÊTE DU SERVEUR ET POST DES DONNÉES ***************/

