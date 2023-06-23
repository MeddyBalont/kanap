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

                //Ici la balise article
                let articleElem = document.createElement("article");
                //Ici la balise img
                let imgElem = document.createElement("img");

                //Je te laisse faire la suite pour que tu comprennaines bine
                let Elem1 = document.createElement("h3");
                Elem1.setAttribute("class","productname");
                Elem1.innerText = ListProducts.name;
                articleElem.appendChild(Elem1);

                let Elem2 = document.createElement("p");
                Elem2.setAttribute("class","productDescription");
                Elem2.innerText = ListProducts.description;
                articleElem.appendChild(Elem2);

                //Ici tu geres les attributs de tes balises
                imgElem.src = ListProducts.imageUrl;
                imgElem.alt = ListProducts.altTxt;


                //Ici tu ajoutes les elements créés
                articleElem.appendChild(imgElem);
                nouveauA.appendChild(articleElem)

                //Ici tu envoie tout à la page
                doc.appendChild(nouveauA);
            }
        }
        )
        .catch(function (err) { }); //A ne pas oublier dans ton fetch

}