let signBlockVisibility = true;
let usersArr = [];
class User {

    constructor(gmail, password) {
        this.mail = gmail;
        this.passwrd = password;
    }

    changeParms(email, pswrd) {
        this.mail = email;
        this.passwrd = pswrd;
    } 

}

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

function submitSignUp() {
    let signUpForm = document.getElementsByTagName("form")[1];
    let gmailVal = signUpForm.getElementsByTagName("input")[0].value;
    let passwordVal = signUpForm.getElementsByTagName("input")[1].value;
    let sameEmail = [];
    for(let i = 0; i < usersArr.length; i++) {
        if(usersArr[i].mail == gmailVal) {
            sameEmail.push(usersArr[i].mail);
        }
    }
    if(sameEmail.length > 0 || !Boolean(gmailVal[0].match(/\w/g)) ||
     !(gmailVal.includes("@")) || !gmailVal.endsWith("gmail.com")) {
        if(sameEmail.length > 0) {
            alert("There is an account with this email");
        }
        if(!Boolean(gmailVal[0].match(/\w/g))) {
            alert("Email must begin with character a-z, A-Z, 0-9, including _")
        }
        if(!(gmailVal.includes("@"))) {
            alert("Email must contain '@' symbol");
        }
        if(!(gmailVal.endsWith("gmail.com"))) {
            alert("Email must ends with 'gmail.com'");
        }
    }else if(passwordVal.length < 8 || Boolean(passwordVal.match(/\s/g)) ||
     !Boolean(passwordVal.match(/\d/g)) || !Boolean(passwordVal.match(/\W/g)) ||
     !Boolean(passwordVal.match(/[a-z]/g)) || !Boolean(passwordVal.match(/[A-Z]/g))) {
        if(passwordVal.length < 8){
            alert("The password must be at least 8 characters long");
        }
        if(Boolean(passwordVal.match(/\s/g))) {
            alert("the password must not contain a space");
        }
        if(!Boolean(passwordVal.match(/\d/g))) {
            alert("the password must contain at least one number");
        }
        if(!Boolean(passwordVal.match(/\W/g))) {
            alert("the password must contain at least one non-alphabetic and non-numeric character");
        }
        if(!Boolean(passwordVal.match(/[a-z]/g))) {
            alert("the password must contain at least one lowercase letter");
        }
        if(!Boolean(passwordVal.match(/[A-Z]/g))) {
            alert("The password must contain at least one capital letter");
            alert("the password must contain letters of the Latin alphabet");
        }
    }else {
        gmailVal.trim();
        passwordVal.trim();
        let userExample = new User(gmailVal, passwordVal);
        usersArr.push(userExample);
        console.log(usersArr);
    }
}

function submitSignIn() {
    let signInForm = document.getElementsByTagName("form")[0];
    let gmailVal = signInForm.getElementsByTagName("input")[0].value;
    let passwordVal = signInForm.getElementsByTagName("input")[1].value;
    let rightUser = [];
    for(let i = 0; i < usersArr.length; i++) {
       if(usersArr[i].mail == gmailVal && usersArr[i].passwrd == passwordVal) {
        rightUser.push(usersArr[i]);
       }
    }
    if(rightUser.length > 0) {
        console.log("djambolat");
    }
}
