GetKanap("http://localhost:3000/api/products")

function GetKanap(Url) {
    fetch(Url)
        .then(reponse => reponse.json())
        .then(data => {

            //Ici tu selectionnes la balise sur laquelle tu veux modifier les élements
            let doc = document.getElementById("items");

                for (let ListProducts of data) {
                    console.log(ListProducts)
                    //on crée les éléménts html manquants
                    let kanap_id = document.createElement("a")
                    kanap_id.href = `./product.html?id=${ListProducts._id}`;

                    //On créé le compartiment pour stocker nos canapé
                    let articleElem = document.createElement("article");
                    //Image du canapé
                    let kanapImg = document.createElement("img");
                    //Nom du canapé
                    let kanapName = document.createElement("h3");
                    //description du canapé
                    let kanapDescription = document.createElement("p");
                    //Prix du canapé
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
                    kanap_id.appendChild(articleElem)
                    doc.appendChild(kanap_id);
                    articleElem.appendChild(kanapPrice);

                    document.getElementById("items").appendChild(kanap_id);
                }
            }
        )
        .catch(function (err) { }); //A ne pas oublier dans ton fetch
}