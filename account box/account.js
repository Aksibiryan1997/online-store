let userData = JSON.parse(localStorage.getItem("rightUser"));
let inputVals = document.getElementsByTagName("input");
let prodArray = [];
let emptyField = [];
let userProducts = [];
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

if(localStorage.getItem(userData.mail)) {
    userProducts = JSON.parse(localStorage.getItem(userData.mail));
}

if(localStorage.getItem("addedProducts")) {
    prodArray = JSON.parse(localStorage.getItem("addedProducts"));
    console.log(prodArray);
}else{
    prodArray = JSON.parse(localStorage.getItem("fetchData"));
}

function addProd() {
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
            userProducts.push(newProduct);
            localStorage.setItem(userData.mail, JSON.stringify(userProducts));
            localStorage.setItem("addedProducts", JSON.stringify(prodArray));
            let d = JSON.parse(localStorage.getItem("addedProducts"));
            prodArray = d;
            console.log(prodArray);
            setTimeout(function(){
                alert("Product added successfully");
            }, 300);
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

let confiqButtons = document.getElementsByClassName("confiq-button");

for(let i = 0; i < confiqButtons.length; i++) {
    confiqButtons[i].addEventListener("click", function(){
        let confiqParams = document.getElementsByClassName("config-params");
        for(let g = 0; g < confiqParams.length; g++) {
            confiqParams[g].setAttribute("style", "display: none;");
        }
        document.getElementsByClassName("config-params")[i].setAttribute("style", "display: block;");
    });
}

document.getElementById("prev-checkbox").addEventListener("change", function(){
    if(this.checked) {
        document.getElementById("prev-password").setAttribute("type", "text");
    }else {
        document.getElementById("prev-password").setAttribute("type", "password");
    }
});
document.getElementById("new-checkbox").addEventListener("change", function(){
    if(this.checked) {
        document.getElementById("new-password").setAttribute("type", "text");
    }else {
        document.getElementById("new-password").setAttribute("type", "password");
    }
});
document.getElementById("repeat-checkbox").addEventListener("change", function(){
    if(this.checked) {
        document.getElementById("repeat-password").setAttribute("type", "text");
    }else {
        document.getElementById("repeat-password").setAttribute("type", "password");
    }
});

function changePwd() {
    let userPassword = JSON.parse(localStorage.getItem("rightUser")).passwrd;
    let prevPwdVal = document.getElementById("prev-password").value;
    let newPwdVal = document.getElementById("new-password").value;
    let repeatedPwdVal = document.getElementById("repeat-password").value;
    if(prevPwdVal != userPassword) {
        document.getElementsByClassName("change-pwd-issues")[0].setAttribute("style", 
        "display: none;");
        document.getElementsByClassName("change-pwd-issues")[0].setAttribute("style", 
        "display: block;");
        document.getElementsByClassName("change-pwd-issues")[0].innerHTML = 
        "- Previous password is incorrect";
    }else if(newPwdVal.length < 8 || Boolean(newPwdVal.match(/\s/g)) ||
    !Boolean(newPwdVal.match(/\d/g)) || !Boolean(newPwdVal.match(/\W/g)) ||
    !Boolean(newPwdVal.match(/[a-z]/g)) || !Boolean(newPwdVal.match(/[A-Z]/g))) {
        document.getElementsByClassName("change-pwd-issues")[0].setAttribute("style", 
        "display: none;");
        document.getElementsByClassName("change-pwd-issues")[0].setAttribute("style", 
        "display: block;");
        document.getElementsByClassName("change-pwd-issues")[0].innerHTML = 
        "- at least 8 characters.<br>" + 
         "- must not contain a space.<br>" + "- at least one number.<br>" +
          "- at least one non-alphabetic and non-numeric character.<br>" +
           "- must contain Latin alphabet and at least one lowercase letter.<br>" + 
           "- at least one capital letter.";
    }else if(repeatedPwdVal != newPwdVal) {
        document.getElementsByClassName("change-pwd-issues")[0].setAttribute("style", 
        "display: none;");
        document.getElementsByClassName("change-pwd-issues")[0].setAttribute("style", 
        "display: block;");
        document.getElementsByClassName("change-pwd-issues")[0].innerHTML = 
        "- Repeated password is incorrect";
    }else {
        let newRightUser = JSON.parse(localStorage.getItem("rightUser"));
        let newUsersArray = JSON.parse(localStorage.getItem("user"));
        newRightUser.passwrd = newPwdVal;
        for(let i = 0; i < newUsersArray.length; i++) {
            if(newUsersArray[i].mail == newRightUser.mail) {
                newUsersArray[i].passwrd = newPwdVal;
            }
        }
        localStorage.setItem("user", JSON.stringify(newUsersArray));
        localStorage.setItem("rightUser", JSON.stringify(newRightUser));
        setTimeout(function() {
            alert("Password changed successfully");
        }, 500);
    }
}

// localStorage.removeItem("addedProducts");