//L'emplacement où l'on va afficher nos produits
//const sectionItems = document.querySelector('#items');
//on récupère toutes les données de l'api
GetKanap("http://localhost:3000/api/products")

function GetKanap(Url) {
    fetch(Url)
        .then(reponse => reponse.json())
        .then(data => {

            //Ici tu selectionnes la balise sur laquelle tu veux modifier les élements
            let doc = document.getElementById("items");

            for (const ListProducts of data) {
                console.log(ListProducts)
                //on crée les éléménts html manquants
                let nouveauA = document.createElement("a")
                nouveauA.href = `./product.html?id=${ListProducts._id}`;

                
                let articleElem = document.createElement("article");
                let kanapImg = document.createElement("img");
                let kanapName = document.createElement("h3");
                let kanapDescription = document.createElement("p");
                let kanapPrice = document.createElement("p");

                kanapName.setAttribute("class","productname");
                kanapDescription.setAttribute("class","productDescription");
                
                kanapName.innerText = ListProducts.name;
                kanapImg.src = ListProducts.imageUrl;
                kanapImg.alt = ListProducts.altTxt;
                kanapDescription.innerText = ListProducts.description;
                kanapPrice.textContent = "Prix : " + ListProducts.price + "€";
                
                articleElem.appendChild(kanapDescription);
                articleElem.appendChild(kanapName);
                articleElem.appendChild(kanapImg);
                nouveauA.appendChild(articleElem)
                doc.appendChild(nouveauA);
                articleElem.appendChild(kanapPrice);
            }
        }
        )
        .catch(function (err) { }); //A ne pas oublier dans ton fetch

}