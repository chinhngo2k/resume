let url = window.location.href;
url = new URL(url);
let id = url.searchParams.get("personal_id");
//console.log(id);

//lay du lieu do vao phan gioi thieu thong tin co ban
const updatePersonalInfo = (personal) => {
    const aboutCarrer = document.querySelector(".about-carrer");
    const fullname = document.getElementById("contact-fullname");
    const birth = document.getElementById("contact-birthday");
    const address = document.getElementById("contact-address");
    const number = document.getElementById("contact-number");
    const mail = document.getElementById("contact-email");
    const nameMail = document.getElementById("nameMain");
    const workMain = document.getElementById("workMain");
    const ava = document.querySelector(".info--img img");
    const faceLink = document.getElementById("facebook-link");
    const gitLink = document.getElementById("github-link");

    aboutCarrer.innerHTML = personal.carrer;
    fullname.innerHTML = personal.fullname;
    birth.innerHTML = personal.birthday;
    address.innerHTML = personal.address;
    number.innerHTML = personal.phone;
    mail.innerHTML = personal.mail;
    workMain.innerHTML = personal.job;
    ava.setAttribute("src", personal.avatar);
    faceLink.setAttribute("href", personal.facebook_link);
    nameMail.innerHTML = personal.fullname;
    gitLink.setAttribute("href", personal.github_link);
};

//do du lieu vao phan hoc van

//education la mot mang chua cac giai doan hoc khac nhau
const updateEducation = (education) => {
    const listEducation = document.querySelector(".education .timeline__list");
    education.forEach((element) => {
        const {
            datestart,
            dateend,
            descripition,
            school,
            degree,
            address,
        } = element;
        //const datestart = element.datestart
        //const {datestart} = element;
        let item = `<div class="timeline__item">
    <div class="item--left">
        <div class="item__date">
            <p>${datestart} - ${dateend}</p>
        </div>
        <div class="item__school">
            <p>${address}</p>
        </div>
    </div>
    <div class="item--divided">
        <span></span>
    </div>
    <div class="item--right">
        <div class="item__title">
            <p>${school}</p>
        </div>
        <div class="item__subtitle">
            <p>${descripition}</p>
        </div>
    </div>
</div>`;
        listEducation.innerHTML += item;
    });
};
//experience la mang chua cac gd lam viec

const updateExperience = (experience) => {
    const listExperience = document.querySelector(".experience .timeline__list");
    console.log("sadjhagh");
    experience.forEach((element) => {
        const { company, job, address, descripition, datestart, dateend } = element;
        let item = `<div class="timeline__item">
        <div class="item--left">
            <div class="item__date">
                <p>${datestart} - ${dateend}</p>
            </div>
            <div class="item__school">
                <p>${address}</p>
            </div>
        </div>
        <div class="item--divided">
            <span></span>
        </div>
        <div class="item--right">
            <div class="item__title">
                <p>${company}</p>
            </div>
            <div class="item__subtitle">
                <p>${descripition}</p>
            </div>
        </div>
    </div>`;
        listExperience.innerHTML += item;
    });
};

const updateSkills = (skills) => {
    const listSkills = document.querySelector(".skill-list");
    skills.forEach(element => {
        let item = `<div class="skill-item">
        <p class="skill-title">${element.skill}</p>
        <div class="skill-level">
            <ul class="${element.skill}">
                <li class=""></li>
                <li class=""></li>
                <li class=""></li>
                <li class=""></li>
                <li class=""></li>
            </ul>
        </div>
    </div>`;
    listSkills.innerHTML += item;
    const listNode = document.querySelectorAll(`.skill-item .${element.skill} li`);
    for(let i = 0; i < element.level; i++){
        listNode[i].className += ' active';
    }

    
    });
    
}

//viet lai cho nay nhuwng de chinh commit
fetch(
        `http://localhost/resume/server/api/resume/getResumeByPersonalId.php?personal_id=${id}`
    )
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        updatePersonalInfo(data);
        updateEducation(data.education);
        updateExperience(data.experience);
        updateSkills(data.skills);
    });