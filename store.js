let products = [];
let initialFilter = [];
let filteredProducts = [];
let moreLessFilter = 15;
let limitOfProducts;

function setlimits(arr, numb1, numb2) {
    limitOfProducts = arr.slice(numb1, numb2);
    showProduct(limitOfProducts);
}

function limitProduct(fullArray) {
    let paginationNumber = document.getElementsByClassName("pagination-number");
    setlimits(fullArray, 0, 8);
    for(let i = 0; i < paginationNumber.length; i++) {
        paginationNumber[i].addEventListener("click", function(){
            document.getElementsByClassName("products-block")[0].innerHTML = '';
            let limitnumber = Number(paginationNumber[i].innerHTML);
            let minlimit = (limitnumber - 1) * 8 ;
            let maxlimit = limitnumber * 8; 
            if(maxlimit > fullArray.length){
                maxlimit = fullArray.length;
            }
            setlimits(fullArray, minlimit, maxlimit);
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
        productRating.innerHTML = "<b>" + "Count:" + "</b>" + " " + prodArray[i].rating.count;
        product.appendChild(productRating);
        let productDescription = document.createElement("p");
        productDescription.setAttribute("class", "product-description");
        productDescription.setAttribute("title", prodArray[i].description);
        productDescription.innerHTML = "<b>" + "Description:" + "</b>";
        product.appendChild(productDescription);
    }
}

if(localStorage.getItem("addedProducts")) {
    products = JSON.parse(localStorage.getItem("addedProducts"));
    limitProduct(products);
}else {
    fetch('https://fakestoreapi.com/products')
    .then(response=>response.json())
    .then(data=>{
        products = data;
        console.log(products);
        localStorage.setItem("fetchData", JSON.stringify(products));
        limitProduct(products);
    });   
}

if(localStorage.getItem("rightUser")) {
    document.getElementsByClassName("profile-link")[0].setAttribute("style", "display: inline-block;");
    document.getElementsByClassName("sign-out")[0].setAttribute("style", "display: inline-block;");
    document.getElementsByClassName("sign-in")[0].setAttribute("style", "display: none;");
}

document.getElementsByClassName("sign-out")[0].addEventListener("click", function(){
    localStorage.removeItem("rightUser");
    document.getElementsByClassName("profile-link")[0].setAttribute("style", "display: none;");
    document.getElementsByClassName("sign-out")[0].setAttribute("style", "display: none;");
    document.getElementsByClassName("sign-in")[0].setAttribute("style", "display: block;");
});

document.getElementsByClassName("more")[0].addEventListener("click", function() {
    this.setAttribute("style", "color: red;");
    document.getElementsByClassName("less")[0].setAttribute("style", "color: blue;");
    moreLessFilter = 20;
});

document.getElementsByClassName("less")[0].addEventListener("click", function() {
    this.setAttribute("style", "color: red;");
    document.getElementsByClassName("more")[0].setAttribute("style", "color: blue;");
    moreLessFilter = 10;
});


function filterfunc() {
    filteredProducts = [];
    document.getElementsByClassName("products-block")[0].innerHTML = "";
    switch(document.getElementById("Category").value) {
        case "men's clothing":
            let mensClothingProds = products.filter(mensClothing);
            function mensClothing(value) {
                return value.category == "men's clothing";
            }
            console.log(mensClothingProds);
            filteredProducts = [...mensClothingProds];
            break;
        case "jewelery":
            let jeweleryProds = products.filter(jeweleryFunc);
            function jeweleryFunc(value) {
                return value.category == "jewelery";
            }
            console.log(jeweleryProds);
            filteredProducts = [...jeweleryProds];
            break;
        case "electronics":
            let electronicsProds = products.filter(electronicsFunc);
            function electronicsFunc(value) {
                return value.category == "electronics";
            }
            console.log(electronicsProds);
            filteredProducts = [...electronicsProds];
            break;
        case "women's clothing":
            let womensClothingProds = products.filter(womensClothing);
            function womensClothing(value) {
                return value.category == "women's clothing";
            }
            console.log(womensClothingProds);
            filteredProducts = [...womensClothingProds];
            break;
        case "":
            console.log(products);
            filteredProducts = [...products];
            break;
    }

    initialFilter = [...filteredProducts];

    if(moreLessFilter == 20) {
        filteredProducts.sort(function(a, b) {
            return b.price - a.price;
         });
    }else if(moreLessFilter == 10) {
        filteredProducts.sort(function(a, b) {
            return a.price - b.price;
         });
    }else {
        filteredProducts = [];
        filteredProducts = [...initialFilter];
    }

    limitProduct(filteredProducts);
}

function resetFilters() {
    document.getElementsByClassName("products-block")[0].innerHTML = "";
    limitProduct(products);
}

// localStorage.clear();