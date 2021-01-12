const listPersonal = document.querySelector(".list-user");
//console.log(listPersonal);
fetch("http://localhost/resume/server/api/personal/getAllPersonal.php", {
        method: "GET",
    })
    .then((res) => res.json())
    .then((data) => {
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
        </div>`;

            listPersonal.innerHTML += user;
        });
    });