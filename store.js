let products = [];

function showProduct(prodArray) {
    let productsBlock = document.getElementsByClassName("products-block");
    for(let i = 0; i < prodArray.length; i++) {
        let product = document.createElement("div");
        product.setAttribute("class", "product");
        productsBlock[0].appendChild(product);
        let productImage = document.createElement("img");
        productImage.setAttribute("class", "product-image");
        productImage.setAttribute("src", prodArray[i].image);
        product.appendChild(productImage);
        let productCategory = document.createElement("p");
        productCategory.setAttribute("class", "product-category");
        productCategory.innerHTML = "<b>" + "Category:" + "</b>" + " " + prodArray[i].category;
        product.appendChild(productCategory);
        let productTitle = document.createElement("p");
        productTitle.setAttribute("class", "product-title");
        productTitle.innerHTML ="<b>" + "Title:" + "</b>" + " " + prodArray[i].title;
        product.appendChild(productTitle);
        let productPrice = document.createElement("p");
        productPrice.setAttribute("class", "product-price");
        productPrice.innerHTML = "<b>" + "Price:" + "</b>" + " " + prodArray[i].price + " " + "&#36;";
        product.appendChild(productPrice);
        let productRating = document.createElement("p");
        productRating.setAttribute("class", "product-rating");
        productRating.innerHTML = "<b>" + "Rate:" + "</b>" + " " + prodArray[i].rating.rate + 
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "<b>" + "Count:" + "</b>" + " " + prodArray[i].rating.count;
        product.appendChild(productRating);
        let productDescription = document.createElement("p");
        productDescription.setAttribute("class", "product-description");
        
    }
}

fetch('https://fakestoreapi.com/products')
.then(response=>response.json())
.then(data=>{
    products = data;
    console.log(products);
    showProduct(products);
});