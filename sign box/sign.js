let signBlockVisibility = true;
let usersArr = [];
class User {

    constructor(gmail, password, id) {
        this.mail = gmail;
        this.passwrd = password;
        this.id = id
    }

    changeParms(email, pswrd) {
        this.mail = email;
        this.passwrd = pswrd;
    } 

};

let firstUserExamp = new User("1", "2", 0);
usersArr.push(firstUserExamp);

let forgotDiv = document.getElementById("forgot-pwd-div");
forgotDiv.style.display = "none";
let signPageTitle = document.querySelector("title");
if(signBlockVisibility) {
    document.getElementById("sign-in-div").style.display = "block";
    document.getElementById("sign-up-div").style.display = "none";
}else{
    document.getElementById("sign-up-div").style.display = "block";
    document.getElementById("sign-in-div").style.display = "none";
}

function showForgotDiv() {
    forgotDiv.style.display = "block";
    document.getElementById("sign-in-div").style.display = "none";
    document.getElementById("sign-up-div").style.display = "none";
    setTimeout(function(){
        alert("Enter the email address"
        + " with which you are registered" +
         " on the website so that we can send you your password.");
    }, 600);
}

function signUpVisible(){
    let signInForm = document.getElementsByTagName("form")[0];
    signInForm.getElementsByTagName("input")[0].value = "";
    signInForm.getElementsByTagName("input")[1].value = "";
    document.getElementById("signin-gmail-issue").style.display = "none";
    document.getElementById("signin-password-issue").style.display = "none";
    forgotDiv.style.display = "none";
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
    let signUpForm = document.getElementsByTagName("form")[1];
    signUpForm.getElementsByTagName("input")[0].value = "";
    signUpForm.getElementsByTagName("input")[1].value = "";
    document.getElementById("signup-gmail-issue").style.display = "none";
    document.getElementById("signup-password-issue").style.display = "none";
    forgotDiv.style.display = "none";
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
    let signupPwdIssue = document.getElementById("signup-password-issue");
    let signupGmailIssue = document.getElementById("signup-gmail-issue");
    signupGmailIssue.style.display = "none";
    signupPwdIssue.style.display = "none";
    let sameEmail = [];
    for(let i = 0; i < usersArr.length; i++) {
        if(usersArr[i].mail == gmailVal) {
            sameEmail.push(usersArr[i].mail);
        }
    }
    if(!Boolean(gmailVal[0].match(/\w/g)) ||
     !(gmailVal.includes("@")) || !gmailVal.endsWith("gmail.com")
     || Boolean(gmailVal.match(/\s/g))) {
        signupGmailIssue.style.display = "block";
        signupGmailIssue.innerHTML = "<ul class = 'pwd-issue'><li>" +
         "- must begin with character a-z, A-Z, 0-9, including '_' .</li>" +
         "<li>- must contain '@' symbol.</li>" +
          "<li>- must not contain a space.</li>" + 
          "<li>- must contain Latin alphabet.</li>" +
         "<li>- must ends with 'gmail.com' .</li></ul>";
        /*if(sameEmail.length > 0) {
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
        }*/
    }else if(sameEmail.length > 0) {
        signupGmailIssue.style.display = "block";
        signupGmailIssue.innerHTML = "<ul class = 'pwd-issue'><li>" +
         "<li>- There is an account with this email</li></ul>";
    }else if(passwordVal.length < 8 || Boolean(passwordVal.match(/\s/g)) ||
     !Boolean(passwordVal.match(/\d/g)) || !Boolean(passwordVal.match(/\W/g)) ||
     !Boolean(passwordVal.match(/[a-z]/g)) || !Boolean(passwordVal.match(/[A-Z]/g))) {
        signupPwdIssue.style.display = "block";
        signupPwdIssue.innerHTML = "<ul class = 'pwd-issue'><li>- at least 8 characters.</li>" +
         "<li>- must not contain a space.</li>" + "<li>- at least one number.</li>" +
          "<li>- at least one non-alphabetic and non-numeric character.</li>" +
           "<li>- must contain Latin alphabet and at least one lowercase letter.</li>" + 
           "<li>- at least one capital letter.</li></ul>";
        /*if(passwordVal.length < 8){
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
        }*/
    }else {
        gmailVal.trim();
        passwordVal.trim();
        let previousUserId = usersArr[usersArr.length - 1].id;
        let userExample = new User(gmailVal, passwordVal, previousUserId + 1);
        usersArr.push(userExample);
        console.log(usersArr);
        signInVisible();
        setTimeout(()=>{alert("You have successfully registered. Enter your login details")}, 500);
    }
}

function submitSignIn() {
    let signInForm = document.getElementsByTagName("form")[0];
    let gmailVal = signInForm.getElementsByTagName("input")[0].value;
    let passwordVal = signInForm.getElementsByTagName("input")[1].value;
    let signinPwdIssue = document.getElementById("signin-password-issue");
    let signinGmailIssue = document.getElementById("signin-gmail-issue");
    signinGmailIssue.style.display = "none";
    signinPwdIssue.style.display = "none";
    let rightUser = [];
    for(let i = 0; i < usersArr.length; i++) {
       if(usersArr[i].mail == gmailVal /*&& usersArr[i].passwrd == passwordVal*/) {
        rightUser.push(usersArr[i]);
       }
    }
    if(rightUser.length < 1) {
        signinGmailIssue.style.display = "block";
        signinGmailIssue.innerHTML = "<ul class = 'pwd-issue'><li>" + 
        "<li>- You have entered an incorrect email address.</li></ul>";
    }else if(rightUser.length > 0 && rightUser[0].passwrd != passwordVal) {
        signinPwdIssue.style.display = "block";
        signinPwdIssue.innerHTML = "<ul class = 'pwd-issue'><li>" + 
        "<li>- You have entered an incorrect password.</li></ul>";
    }else{
        window.location.href = "../store.html";
    }
}
