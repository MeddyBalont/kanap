let kanap = JSON.parse(localStorage.getItem("kanap"));

let products = [];

let orderId ="";
affichageKanap(kanap)

function getData(productId) {
fetch(`http://localhost:3000/api/products/${productId}`)
  .then ((response) => {
    console.log(response);
    return response.json();
  })
  .then(data => {
    //console.log(data.json());
    //return data.json();
  })
  .catch(error =>{
    error = 'erreur ';
    alert(error);
})

//return response;

}

//AFFICHAGE DES PRODUITS

async function affichageKanap(){
  if (kanap === null || kanap.length ===0 ) {
    document.querySelector("h1").textContent = "Votre panier est vide";
  }else for (let i = 0; i < kanap.length; i++){
    let item = kanap[i];
    console.log(kanap);

    productData = getData(item.id);
    console.log(productData);
  }
}

