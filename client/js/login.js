const email = document.querySelector('.form__input--email input');
const password = document.querySelector('.form__input--password input');
const btnSubmit = document.querySelector('.form__button button');


let account = {};
//chua loi khi dang nhap khong thanh cong
let error = '';

email.onchange = (e) => {
    account = {...account, email: e.target.value};
}

password.onchange = (e) => {
    account = {...account, password: e.target.value};
}

btnSubmit.onclick = async () => {
    //console.log(account);
    let formData = new FormData();
    formData.append('email', account.email);
    formData.append('password', account.password);


    const res = await fetch("http://localhost/resume/server/api/account/login.php", {
        method: "post",
        body: formData
    });

    const data = await res.json();
    console.log(data);
    if(data.error == ''){
        sessionStorage.setItem('id', data.id);
        window.location.replace('http://localhost/resume/client/myaccount.html');
    }
    else{
        error = data.error;
    }

    if(error){
        const errorSpan = document.querySelector('.error');
        errorSpan.innerHTML = error;
    }
}
