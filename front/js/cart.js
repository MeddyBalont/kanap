let kanap = JSON.parse(localStorage.getItem("kanap"));

let products = [];

let orderId ="";

function getData(productId) {
  response = fetch('http://localhost:3000/api/products/' + productId)
  .then(data => {
    return data.json();
  })
  .catch(error =>{
    error = 'erreur ';
    alert(error);
})
console.log(response);
//return response;

}

//AFFICHAGE DES PRODUITS

async function affichageKanap(){
  if (kanap === null || kanap.length ===0 ) {
    document.querySelector("h1").textContent = "Votre panier est vide";
  }else for (let i = 0; i < kanap.length; i++){
    let item = kanap[i];
    //console.log(kanap);

    productData =  getData(item.id);
    //console.log(productData);
  }
}

