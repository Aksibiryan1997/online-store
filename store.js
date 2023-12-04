let products = [];

function limitProduct(fullArray) {
    let paginationNumber = document.getElementsByClassName("pagination-number");
    let paginationSymbol = document.getElementsByClassName("pagination-symbol");
    for(let i = 0; i < paginationNumber.length; i++) {
        paginationNumber[i].addEventListener("click", function(){
            document.getElementsByClassName("products-block")[0].innerHTML = '';
            let limitnumber = Number(paginationNumber[i].innerHTML);
            let minlimit = (limitnumber - 1) * 8 ;
            let maxlimit = limitnumber * 8; 
            if(maxlimit > fullArray.length){
                maxlimit = fullArray.length;
            }
            paginationSymbol[0].addEventListener("click", function() {
                if (limitnumber > 1) {
                    limitnumber -= 1;
                    let limitOfProducts = fullArray.slice(minlimit, maxlimit);
                    showProduct(limitOfProducts);
                }
            })
            paginationSymbol[1].addEventListener("click", function() {
                if (limitnumber < paginationNumber.length - 2) {
                    limitnumber += 1;
                    let limitOfProducts = fullArray.slice(minlimit, maxlimit);
                    showProduct(limitOfProducts);
                }
            })
            let limitOfProducts = fullArray.slice(minlimit, maxlimit);
            showProduct(limitOfProducts);
        })
    }
}

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
        productDescription.setAttribute("title", prodArray[i].description);
        productDescription.innerHTML = "<b>" + "Description:" + "</b>";
        product.appendChild(productDescription);
    }
}

fetch('https://fakestoreapi.com/products')
.then(response=>response.json())
.then(data=>{
    products = data;
    console.log(products);
    limitProduct(products);
});