const id = sessionStorage.getItem("id");

let account = {
    username: '',
    email: '',
};

if (!id) {
    window.location.href = "http://localhost/resume/client/login.html";
} else {
    //trong truong hop nguoi dung co tinh setCookie
    const formData = new FormData();
    formData.append('id', id);
    fetch(`http://localhost/resume/server/api/account/checkLogin.php`, {
            method: "post",
            body: formData
        }).then(res => res.json()).then(data => {
            if(data === false){
                window.location.href = "http://localhost/resume/client/login.html";
            }
            else{
                account = {...account, username: data.username, email: data.email};
            }
        });
    //console.log("dang nhap thanh cong");
}

const listPersonal = document.querySelector(".list-cv");

let data = [];

(async() => {
    const res = await fetch(
        `http://localhost/resume/server/api/personal/getPersonalByAccount.php?acc_id=${id}`
    );
    data = await res.json();

    console.log(data);

    data.forEach((element) => {
        let user = `<div class="user">
        <div class="img">
            <img src="${element.avatar}" alt="avatar">
        </div>
        <div class="text">
            <h3>${element.fullname}</h3>
            <a href="http://localhost/resume/client/view.html?personal_id=${element.personal_id}">Xem ngay <i class="fas fa-angle-double-right"></i></a>
        </div>
        <div class="button">
           <button> <a href="http://localhost/resume/client/editresume.html?personal_id=${element.personal_id}">Sửa</a></button>   
            <button type="button" class="btn-delete" id="${element.personal_id}">Xóa</button>
        </div>
    </div>`;

        listPersonal.innerHTML += user;
    });
})();

listPersonal.onclick = async(e) => {
    item = e.target;
    console.log(item);
    if (item.getAttribute("type") == "button") {
        let id = item.getAttribute("id");
        await fetch(
            `http://localhost/resume/server/api/resume/deleteResume.php?per_id=${id}`
        );
        location.reload();
    }
};


const logout = document.querySelector('.nav__bar--logout a');
logout.onclick = () => {
    window.sessionStorage.clear();
    window.location.href = "http://localhost/resume/client/index.html";
}