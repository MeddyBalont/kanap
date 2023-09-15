
const productId = new URLSearchParams(window.location.search).get("id");
//console.log(productId);

//Tableau de donnée des produits selectionné
let selectedKanap = {};
//Le produit selectionné est l'id du produit
selectedKanap._id = productId;
//console.log(selectedKanap);
//Je récupère le contenu de mon back avec l'ID de kanap via un url
if (productId !== null) {
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            //appel de la procédure 
            //affichekanap(data);
            //function selectionner

            //Affichage de l'image dans la page produit
            let kanapImgContainer = document.getElementsByClassName("item__img")[0];
            item = document.createElement("div");
            item.setAttribute("class", "item__img");
            let kanapImg = document.createElement("img");
            kanapImg.setAttribute("src", data.imageUrl)
            kanapImgContainer.appendChild(kanapImg);

            //Affichage du nom du produit
            let item1 = document.createElement("h1")
            item1.setAttribute("id", "title");
            item1.innerText = data.name
            let kanapTitle = document.getElementById("title")
            kanapTitle.parentNode.replaceChild(item1, kanapTitle);

            //Affichage du prix
            let item2 = document.getElementById("price");
            item2.setAttribute("id", "price");
            item2.innerText = data.price

            //Affichage du produit
            let item3 = document.createElement("p");
            item3.setAttribute("id", "description");
            item3.innerText = data.description
            let kanapDescription = document.getElementById("description");
            kanapDescription.appendChild(item3);
            //console.log(kanapImg);



            choixCouleurs(data);
            SelectionnerQuantity(data);
            //console.log(data);
        })

        .catch(err => console.log("erreur :(", err));

    //Création des couleurs

    function choixCouleurs(data) {
        let kanapCouleurs = document.getElementById("colors")
        data.colors.forEach(color => {
            let showCouleurs = document.createElement("option");
            showCouleurs.value = color;
            showCouleurs.innerText = color;
            kanapCouleurs.appendChild(showCouleurs);

        });
    }
    //Choix de quantité dynamique
    function SelectionnerQuantity() {
        let selectionQuantity = document.querySelector('input[type="number"]');
        //On regarde se qu'il se passe dans l'input
        selectionQuantity.addEventListener("input", (e) => {
            //console.log(selectionQuantity)
            //on récupère la valeur de la cible de l'évènement dans input:
            let quantityProduct = e.target.value;

            //On ajoute la quantité à l'objet quantityProduct:
            selectedKanap.quantity = quantityProduct;
            //console.log(quantityProduct);
        });

        //Conditions de validation au clic via le bouton ajouter  au panier
        let orderButton = document.getElementById("addToCart");
        //On regarde ce qu'il se passe sur le bouton #addToCart pour faire l'action:
        orderButton.addEventListener("click", () => {
            //conditions
            console.log("click")
            let color = document.getElementById("colors").value;
            //console.log(color);
            if (
                //valeur créées dynamiquement 
                
                selectedKanap.quantity < 1 ||
                selectedKanap.quantity > 100 ||
                selectedKanap.quantity === undefined ||
                color === "" ||
                color === undefined
            ) {
                alert("Veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100");
            } else {
                selectedKanap.color = color;
                //appel la fonction si condition ok

           
                //ajouterPanier();
                //ici je passe les infos du kanap en parametre
                ajouterPanier(selectedKanap);
                
            }

        });
    }

    //localStorage
    //Canapé et couleurs dans le paniers selon la quantité

  
    function ajouterPanier(monKanap) {

        //ici, on stoque le canapé courrant dans un objet
        let articleToSave = {
            id: monKanap._id,
            color: monKanap.color,
            quantity: parseInt(monKanap.quantity, 10),
        };

        //ici tu dois controler l'existance de ton panier
        let get_panier = getKanap();

        if (get_panier) { //si le panier existe
            //Ici verifier si le produit est deja dans le panier //id + couleur

            let IdentityKanap = get_panier.find((objet) => objet.id == articleToSave.id && objet.color == articleToSave.color);
            if (IdentityKanap) {
                console.log('trouvé')
                //Convertir les valeurs en numérique (parseInt) 
                    IdentityKanap.quantity = parseInt(monKanap.quantity);
                    console.log(IdentityKanap);
                    saveKanap(get_panier);

            } else {
                console.log("Le panier ne contient pas le canapé en cours !");
                get_panier.push(articleToSave);
                saveKanap(get_panier);  //localStorage.setItem("cart", JSON.stringify(createLocalStorage));
            }

             } else {
            console.log("Le panier est vide, on ajoute le premier canapé !");
            let createLocalStorage = [];
            createLocalStorage.push(articleToSave);
            saveKanap(createLocalStorage);  //localStorage.setItem("cart", JSON.stringify(createLocalStorage));
            }



    }

     function saveKanap(kanap) {
        localStorage.setItem("kanap", JSON.stringify(kanap));
    }
    function getKanap() {
        let kanap = localStorage.getItem("kanap");
        if (kanap == null) {
            return [];
        } else {
            return JSON.parse(kanap);
        }
    }

 
    //let affichekanap = (data) => {
        //console.log(data);

    //};

}