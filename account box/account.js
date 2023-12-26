let inputVals = document.getElementsByTagName("input");
let prodArray = [];
let emptyField = [];
class prods {
    constructor(category, descript, prodId, url, price, prodcount, title) {
        this.category = category;
        this.description = descript;
        this.id = prodId;
        this.image = url;
        this.price = price;
        this.rating = {count: prodcount};
        this.title = title;
    }

    changeProdParams(categoryparam, descriptparam, urlparam, priceparam, countparam, titleparam) {
        this.category = categoryparam;
        this.description = descriptparam;
        this.image = urlparam;
        this.price = priceparam;
        this.rating.count = countparam;
        this.title = titleparam;
    }
};

if(localStorage.getItem("addedProducts")) {
    prodArray = JSON.parse(localStorage.getItem("addedProducts"));
    console.log(prodArray);
}else{
    prodArray = JSON.parse(localStorage.getItem("fetchData"));
}

function addProd() {
    // console.log(!document.getElementById("Link").value.startsWith("https://"));
    // console.log(document.getElementById("Price").value[0]);
    // console.log(Boolean(document.getElementById("Price").value.match(/\D/g)));
    emptyField.length = 0;
    console.log(document.querySelector("select").value);
    console.log(document.querySelector("textarea").value);
    for(let i = 0; i < inputVals.length; i++) {
        if(inputVals[i].value.length == 0 || !Boolean(inputVals[i].value.match(/\w/g))) {
            emptyField.push(inputVals[i].value);
        }
    }
    if(document.querySelector("textarea").value.length == 0 || 
    !Boolean(document.querySelector("textarea").value.match(/\w/g)) || emptyField.length != 0
     || Boolean(document.getElementById("Price").value.match(/\D/g))
      || Boolean(document.getElementById("Count").value.match(/\D/g))
       || Number(document.getElementById("Count").value) > 99999
        || Number(document.getElementById("Price").value) > 99999
         || !document.getElementById("Link").value.startsWith("https://")
          || Boolean(document.getElementById("Link").value.match(/\s/g))) {
        document.getElementsByClassName("product-issue")[0].setAttribute(
            "style", "display: inline-block;"
        );
        document.getElementsByClassName("product-issue")[0].innerHTML = 
        "- Fill in all the fields." + "<br>" +
         "- Numeric fields must not contain non-numeric characters." + "<br>" +
          "- Numeric fields must not exceed 99999." + "<br>" +
           "- The value of numeric fields must be an integer." + "<br>" +
           "- The 'Photo link' field must begin with 'https://'." + "<br>" +
           "- The 'Photo link' field must not contain whitespace characters.";
    }else{
        let img = new Image();
        img.src = inputVals[0].value;
        img.onload = function() {
            document.getElementsByClassName("product-issue")[0].setAttribute(
                "style", "display: none;"
            );
            let newProduct = new prods(document.querySelector("select").value, 
            document.querySelector("textarea").value,
            prodArray[prodArray.length -1].id + 1, inputVals[0].value, 
             Number(inputVals[2].value), Number(inputVals[3].value), inputVals[1].value);
            prodArray.push(newProduct);
            localStorage.setItem("addedProducts", JSON.stringify(prodArray));
            let d = JSON.parse(localStorage.getItem("addedProducts"));
            prodArray = d;
            console.log(prodArray);
        };
        img.onerror = function() {
            document.getElementsByClassName("product-issue")[0].setAttribute(
                "style", "display: inline-block;"
            );
            document.getElementsByClassName("product-issue")[0].innerHTML =
             "An incorrect link to a photo was provided," +
             " or there are no photos with such a link. Please correct the photo.";
        };
    }
}

// localStorage.removeItem("addedProducts");