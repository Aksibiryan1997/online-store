let products = [];
let initialFilter = [];
let copyProductArray = [];
let filteredProducts = [];
let filterByTitle = [];
let moreLessFilter = 15;
let limitOfProducts;

function setlimits(arr, numb1, numb2) {
    limitOfProducts = arr.slice(numb1, numb2);
    showProduct(limitOfProducts);
}

function limitProduct(fullArray) {
    document.getElementsByClassName("pagination-block")[0].innerHTML = '';
    let minlimit;
    let maxlimit;
    let pageButtons;
    let paginationBlock = document.getElementsByClassName("pagination-block")[0];
    let linksCount = Math.ceil(fullArray.length / 8);
    let previousLink = document.createElement("button");
    previousLink.innerHTML = "<<";
    previousLink.setAttribute("class", "pagination-button pagination-symbol"); 
    paginationBlock.appendChild(previousLink);
    previousLink.addEventListener("click", function() {
        if(minlimit > 0) {
            pageButtons[(minlimit / 8) - 1].click();
        }
    });
    for(let i = 1; i <= linksCount; i++) {
        let pageLink = document.createElement("button");
        pageLink.innerHTML = i;
        pageLink.setAttribute("class", "pagination-button pagination-number");
        paginationBlock.appendChild(pageLink);
    }
    pageButtons = document.getElementsByClassName("pagination-number");
    for(let i = 0; i < pageButtons.length; i++) {
        pageButtons[i].addEventListener("click", function() {
            for(let g = 0; g < pageButtons.length; g++) {
                pageButtons[g].setAttribute("style", "background-color: rgba(80, 80, 80, 0);");
            }
            document.getElementsByClassName("products-block")[0].innerHTML = '';
            minlimit = i * 8;
            maxlimit = (i + 1) * 8;
            if(maxlimit > fullArray.length) {
                maxlimit = fullArray.length;
            }
            setlimits(fullArray, minlimit, maxlimit);
            pageButtons[i].setAttribute("style", "background-color: green;");
        })
    }

    let nextLink = document.createElement("button");
    nextLink.innerHTML = ">>";
    nextLink.setAttribute("class", "pagination-button pagination-symbol"); 
    paginationBlock.appendChild(nextLink);
    nextLink.addEventListener("click", function() {
        if(maxlimit < fullArray.length) {
            pageButtons[maxlimit / 8].click();
        }
    });

    if(fullArray.length > 0) {
        pageButtons[0].click();
    }
}

function showProduct(prodArray) {
    let buyCountVal = document.getElementsByClassName("buy-count")[0].innerHTML;
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
        if(localStorage.getItem("rightUser")) {
            let rightUserStyleVal = JSON.parse(localStorage.getItem("rightUser"));
            buyCountVal = rightUserStyleVal.styleVal.length.toString();
            document.getElementsByClassName("buy-count")[0].innerHTML = buyCountVal;
            if(rightUserStyleVal.styleVal.includes(
                productTitle.innerHTML.slice(14,productTitle.innerHTML.length)
            )) {
                product.setAttribute("style", "border: 1px solid green;");
            }
        }
        let productPrice = document.createElement("p");
        productPrice.setAttribute("class", "product-price");
        productPrice.innerHTML = "<b>" + "Price:" + "</b>" + " " + prodArray[i].price + " " + "&#36;";
        product.appendChild(productPrice);
        let productRating = document.createElement("p");
        productRating.setAttribute("class", "product-rating");
        productRating.innerHTML = "<b>" + "Count:" + "</b>" + " " + prodArray[i].rating.count;
        product.appendChild(productRating);
        let buyProduct = document.createElement("button");
        buyProduct.setAttribute("class", "buy-product");
        buyProduct.addEventListener("click", function() {
            if(localStorage.getItem("rightUser")) {
                let userRight = JSON.parse(localStorage.getItem("rightUser"));
                let usersArray = JSON.parse(localStorage.getItem("user"));
                let b;
                for(let m = 0; m < usersArray.length; m++) {
                    if(usersArray[m].mail == userRight.mail) {
                        b = m;
                    }
                }
                if(!product.hasAttribute("style")) {
                    product.setAttribute("style", "border: 1px solid green;");
                    buyCountVal = (Number(buyCountVal) + 1).toString();
                    document.getElementsByClassName("buy-count")[0].innerHTML = buyCountVal;
                    userRight.styleVal.push(productTitle.innerHTML.slice(14,
                        productTitle.innerHTML.length));
                    usersArray[b].styleVal.push(productTitle.innerHTML.slice(14,
                        productTitle.innerHTML.length));    
                } else {
                    product.removeAttribute("style");
                    buyCountVal = (Number(buyCountVal) - 1).toString();
                    document.getElementsByClassName("buy-count")[0].innerHTML = buyCountVal;
                    removeElmnt(userRight.styleVal, productTitle.innerHTML.slice(14, 
                        productTitle.innerHTML.length));
                    removeElmnt(usersArray[b].styleVal, productTitle.innerHTML.slice(14, 
                        productTitle.innerHTML.length));
                }
                localStorage.setItem("rightUser", JSON.stringify(userRight));
                localStorage.setItem("user", JSON.stringify(usersArray));
            }else {
                alert("you need to register to buy the product");
            }
        });
        buyProduct.innerHTML = "<b>" + "Buy" + "</b>";
        product.appendChild(buyProduct);
        let productDescription = document.createElement("p");
        productDescription.setAttribute("class", "product-description");
        productDescription.setAttribute("title", prodArray[i].description);
        productDescription.innerHTML = "<b>" + "Description:" + "</b>";
        product.appendChild(productDescription);
    }
}

function removeElmnt(array, element) {
    let elementIndex = array.indexOf(element);
    if(elementIndex !== -1) {
        array.splice(elementIndex, 1);
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
        for(let i = 0; i < products.length; i++) {
            if(Boolean(products[i].title.match("(LC49HG90DMNXZA)"))) {
                products[i].title = "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor";
            }
        }
        copyProductArray = [...products];
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
    document.getElementsByClassName("buy-count")[0].innerHTML = "0";
    resetFilters();
    document.getElementById("title-search").value = "";
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
            filteredProducts = [...mensClothingProds];
            break;
        case "jewelery":
            let jeweleryProds = products.filter(jeweleryFunc);
            function jeweleryFunc(value) {
                return value.category == "jewelery";
            }
            filteredProducts = [...jeweleryProds];
            break;
        case "electronics":
            let electronicsProds = products.filter(electronicsFunc);
            function electronicsFunc(value) {
                return value.category == "electronics";
            }
            filteredProducts = [...electronicsProds];
            break;
        case "women's clothing":
            let womensClothingProds = products.filter(womensClothing);
            function womensClothing(value) {
                return value.category == "women's clothing";
            }
            filteredProducts = [...womensClothingProds];
            break;
        case "":
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
    document.getElementById("Category").value = "";
    document.getElementsByClassName("more")[0].setAttribute("style", "color: blue;");
    document.getElementsByClassName("less")[0].setAttribute("style", "color: blue;");
    limitProduct(products);
}

document.getElementsByClassName("submit-search")[0].addEventListener("click", function() {
    products = copyProductArray;
    filterByTitle = [];
    let searchValue = document.getElementById("title-search").value;
    let modSearchVal = new RegExp(searchValue, "i");
    for(let i = 0; i < products.length; i++) {
        if(products[i].title.match(modSearchVal)) {
            filterByTitle.push(products[i]);
        }
    }
    if(filterByTitle.length > 0 && searchValue.length != 0) {
        document.getElementsByClassName("products-block")[0].innerHTML = "";
        products = filterByTitle;
        limitProduct(products);
        document.getElementsByClassName("search-results")[0].setAttribute(
            "style", "display: block;"
        );
        document.getElementsByClassName("search-results")[0].innerHTML = 
        "Search results: " + filterByTitle.length;
        console.log(filterByTitle);
    }else if(searchValue.length == 0) {
        document.getElementsByClassName("products-block")[0].innerHTML = "";
        limitProduct(products);
        document.getElementsByClassName("search-results")[0].setAttribute(
            "style", "display: none;"
        );
    }else {
        document.getElementsByClassName("search-results")[0].setAttribute(
            "style", "display: none;"
        );
        setTimeout(function() {
            alert("There are no products with this title");
        }, 200)
    }
})

document.cookie = "myCookie=example; Samesite=None; Secure";

// localStorage.clear();
