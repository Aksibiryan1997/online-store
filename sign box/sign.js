let signParams = [];
function signUpSubmit() {
    signParams.length = 0;
    let inputTags = document.getElementsByTagName("input");
    for(let i = 0; i < inputTags.length; i++) {
        signParams.push(inputTags[i].value);
    }
    console.log(signParams);
    fetch('https://fakestoreapi.com/users', {
        method: "POST",
        body: JSON.stringify(
            {
                email: signParams[0],
                username: signParams[1],
                password: signParams[4],
                name:{
                    firstname: signParams[2],
                    lastname: signParams[3]
                },
                address:{
                    city:'kilcoole',
                    street:'7835 new road',
                    number:3,
                    zipcode:'12926-3874',
                    geolocation:{
                            lat:'-37.3159',
                            long:'81.1496'
                    }
                },
                phone:'1-570-236-7033'
            }
        )
    })
    .then(response => response.json())
    .then(data => console.log(data));
}