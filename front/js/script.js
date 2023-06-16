//L'emplacement où l'on va afficher nos produits
const sectionItems = document.querySelector('#items');
//on récupère toutes les données de l'api
GetKanap("http://localhost:3000/api/products")
function GetKanap(Url){
    fetch(Url)
.then(reponse => reponse.json())
.then(data =>{
    for(const products of data){
        console.log(products)
        //on crée les éléménts html manquants
        const nouveauA = document.createElement("a")
        nouveauA.setAttribute(`./product.html?id=${products._id}`);
        sectionItems.appendChild(nouveauA)

        const articlesElement = document.createElement.apply('article');
        nouveauA.appendChild(articlesElement);

        //on affiche les images
        const imageElement = document.createElement('img');
        imageElement.src = products.imageUrl;
        imageElement.alt = products.altTxt;
    }
})}