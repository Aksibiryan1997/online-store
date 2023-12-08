let signBlockVisibility = true;
let signPageTitle = document.querySelector("title");
if(signBlockVisibility) {
    document.getElementById("sign-in-div").style.display = "block";
    document.getElementById("sign-up-div").style.display = "none";
}else{
    document.getElementById("sign-up-div").style.display = "block";
    document.getElementById("sign-in-div").style.display = "none";
}
function signUpVisible(){
    signBlockVisibility = false;
    if(signBlockVisibility) {
        document.getElementById("sign-in-div").style.display = "block";
        document.getElementById("sign-up-div").style.display = "none";
    }else{
        document.getElementById("sign-up-div").style.display = "block";
        document.getElementById("sign-in-div").style.display = "none";
    }
    signPageTitle.innerHTML = "Sign up";
    let signUpIcon = document.querySelector("link[rel='shortcut icon']");
    signUpIcon.setAttribute("href", "../imagesbox/icons8-зарегистрироваться-16.png");
};
function signInVisible() {
    signBlockVisibility = true;
    if(signBlockVisibility) {
        document.getElementById("sign-in-div").style.display = "block";
        document.getElementById("sign-up-div").style.display = "none";
    }else{
        document.getElementById("sign-up-div").style.display = "block";
        document.getElementById("sign-in-div").style.display = "none";
    }
    signPageTitle.innerHTML = "Sign in";
    let signInIcon = document.querySelector("link[rel='shortcut icon']");
    signInIcon.setAttribute("href", "../imagesbox/icons8-войти-16.png")
}; 