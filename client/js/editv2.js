const acc_id = sessionStorage.getItem("id");

let account = {
    username: '',
    email: '',
};

if (!acc_id) {
    window.location.href = "http://localhost/resume/client/login.html";
} else {
    //trong truong hop nguoi dung co tinh setCookie
    const formData = new FormData();
    formData.append('id', acc_id);
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


let url = window.location.href;
url = new URL(url);
let id = url.searchParams.get("personal_id");

//truy xuat den cac phan tu trong html
const listEducation = document.querySelector(".list-education");
const btnAddEducation = document.querySelector(".btn-add-education button");

const btnAddExperience = document.querySelector(".btn-add-experience");
const listExperience = document.querySelector(".list-experience");

const btnAddSkill = document.querySelector(".btn-add-skill");
const listSkill = document.querySelector(".list-skill");

let amountExperience = 0;
let experience = [];
let experienceResult = {
  job: [],
  company: [],
  datestart: [],
  dateend: [],
  descripition: [],
  address: [],
};

//hoc van
let amountEducation = 0;
let education = [];
let educationResult = {
  school: [],
  degree: [],
  major: [],
  datestart: [],
  dateend: [],
  descripition: [],
  address: [],
};

//ky nang
let amountSkill = 0;
let skills = [];
let skillsResult = {
  skill: [],
  level: [],
  time: [],
  descripition: [],
};

let person = {
  fullname: "",
  birthday: "",
  sex: 0,
  mail: "",
  address: "",
  phone: 0,
  job: "",
  facebook_link: "",
  github_link: "",
  carrer: "",
  avatar: null,
};

let errorPer = {
  fullname: "",
  birthday: "",
  sex: 0,
  mail: "",
  address: "",
  phone: 0,
  job: "",
  facebook_link: "",
  github_link: "",
  carrer: "",
  avatar: null,
};

const addEducationIntoListEducation = () => {
  let education = `<div class="education-item my-2" id="education${amountEducation}">
  <div class="school-degree r-flex">
      <div class="school w-1-3">
          <label for="" class="form-label">trường học</label>
          <input type="text" name="school${amountEducation}" class="edu_school-value form-input" id="edu_school${amountEducation}">
      </div>
      <div class="w-1-3">
          <label for="" class="form-label">cấp học</label>
          <input type="text" name="degree${amountEducation}" class="edu_degree-value form-input" id="edu_degree${amountEducation}" >
      </div>
      <div class="w-1-3">
          <label for="" class="form-label">chuyên ngành</label>
          <input type="text" name="major${amountEducation}" class="edu_major-value form-input" id="edu_major${amountEducation}" >
      </div>
      
  </div>
  <div class="date r-flex">
        <div class="datestart w-1-3">
          <label for="" class="form-label">địa chỉ</label>
          <input type="text" name="address${amountEducation}" class="edu_address-value form-input" id="edu_address${amountEducation}" >
      </div>
      <div class="datestart w-1-3">
          <label for="" class="form-label">ngày bắt đầu học</label>
          <input type="date" name="datestart${amountEducation}" class="edu_datestart-value form-input" id="edu_datestart${amountEducation}" >
      </div>
      <div class="dateend w-1-3">
          <label for="" class="form-label">ngày kết thúc</label>
          <input type="date" name="dateend${amountEducation}" class="edu_dateend-value form-input" id="edu_dateend${amountEducation}" >
      </div>
  </div>
  <div class="descripition w-1-2">
      <label for="" class="form-label">mô tả</label>
      <textarea name="descripition${amountEducation}" class="edu_descripition-value form-input" id="edu_descripition${amountEducation}" cols="30" rows="10"></textarea>
  </div>
  <button type="button" id="education${amountEducation}" class="btn">xoá</button>
</div>`;

  listEducation.innerHTML += education;
  amountEducation++;
};

const addExperienceIntoListExperience = () => {
  let experience = `<div class="experience-item my-2" id="experience${amountExperience}">
<div class="job-company r-flex">
    <div class="job w-1-3">
        <label for="job" class="form-label">công việc</label>
        <input type="text" name="job${amountExperience}" class="exp_job-value form-input" id="exp_job${amountExperience}">
    </div>
    <div class="w-1-3">
        <label for="company" class="form-label">công ty</label>
        <input type="text" name="company${amountExperience}" class="exp_company-value form-input" id="exp_company${amountExperience}" >
    </div>
    <div class="job w-1-3">
        <label for="exp_address${amountExperience}" class="form-label">địa chỉ</label>
        <input type="text" name="address${amountExperience}" class="exp_address-value form-input" id="exp_address${amountExperience}">
    </div>
    
</div>
<div class="date r-flex">
    <div class="datestart w-1-2">
        <label for="" class="form-label">ngày bắt đầu</label>
        <input type="date" name="datestart${amountExperience}" class="exp_datestart-value form-input" id="exp_datestart${amountExperience}" >
    </div>
    <div class="dateend w-1-2">
        <label for="" class="form-label">ngày kết thúc</label>
        <input type="date" name="dateend${amountExperience}" class="exp_dateend-value form-input" id="exp_dateend${amountExperience}" >
    </div>
</div>
<div class="descripition w-1-2">
    <label for="" class="form-label">mô tả</label>
    <textarea name="descripition${amountExperience}" class="exp_descripition-value form-input" id="exp_descripition${amountExperience}" cols="30" rows="10"></textarea>
</div>
<button type="button" id="experience${amountExperience}" class="btn">Xoa</button>
</div>`;

  listExperience.innerHTML += experience;
  amountExperience++;
};

const addSkillIntoListSkills = () => {
  let skillItem = `
  <div class="skill-item" id="skills${amountSkill}">
    <div class="r-flex">
        <div class="skill w-1-3">
            <label for="skill${amountSkill}" class="form-label">ký năng</label>
            <input type="text" name="skill${amountSkill}" id="skill_skill${amountSkill}" value='' class="skill_skill-value form-input" >
        </div>
        <div class="skill w-1-3">
            <label for="time${amountSkill}" class="form-label">thời gian làm việc</label>
            <input type="text" name="time${amountSkill}" id="skill_time${amountSkill}" value='' class="skill_time-value form-input" >
        </div>
        <div class="level w-1-3">
            <label for="level${amountSkill}" class="form-label">đánh giá</label>
            <select name="level${amountSkill}" id="skill_level${amountSkill}" class="skill_level-value form-input">
                <option value="" selected>Vui lòng chọn đánh giá trình độ</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    </div>
    <div class="descripition w-1-2">
      <label for="" class="form-label">mô tả</label>
      <textarea name="descripition${amountSkill}" class="skill_descripition-value form-input" id="skill_descripition${amountSkill}" cols="30" rows="10"></textarea>
  </div>
    <button type="button" id="skills${amountSkill}" class="btn" >xoá</button> 
</div>`;

  listSkill.innerHTML += skillItem;
  amountSkill++;
};

const format = (array, pro, arrAfter) => {
  array.forEach((element) => {
    const { group, key } = element;
    pro.forEach((value) => {
      if (group === value) {
        if (!arrAfter[`${value}`].map((e) => e.key).includes(key)) {
          arrAfter[`${value}`] = [...arrAfter[`${value}`], element];
        }
      }
    });
  });
};

//ham nay cap nhat li du lieu ma nguoi dung da nhap tren form sau khi nhan them thong tin
//param: <ket qua>: object, <cai thuoc tinh trong mang ket qua>: array, <cac class de truy xuat den cac the html>: array
// update(experienceResult, [company, job, datestart, dateend, descripition], ['.exp_company-value', ...])
const update = (objectResult, arrClass, length) => {
  //temp chua cac nodeofelement, cac phan tu html truy xuat duoc theo class trong mang arrClass
  let nodeListElement = [];
  arrClass.forEach((className) => {
    const nodeElement = document.querySelectorAll(`.${className}`);
    nodeListElement = [...nodeListElement, nodeElement];
  });

  nodeListElement.forEach((nodeElement) => {
    nodeElement.forEach((element) => {
      const prop = element.name.slice(0, element.name.length - 1);
      let temp = objectResult[`${prop}`].filter(
        (e) => e.key === element.id.slice(length)
      )[0];
      element.value = temp ? temp.value : "";
    });
  });
};

//xu ly du lieu cho phan nhap thong tin ca nhan

//truy xuat den phan tu html
const fullname = document.querySelector(".fullname input");
const birthday = document.querySelector(".birthday input");
const sex = document.querySelector(".sex select");
const mail = document.querySelector(".mail input");
const address = document.querySelector(".address input");
const phone = document.querySelector(".phone input");
const job = document.querySelector(".job input");
const facebooklink = document.querySelector(".facebook-link input");
const githublink = document.querySelector(".github-link input");
const instargramlink = document.querySelector("instagram-link input");
const carrer = document.querySelector(".carrer textarea");

(async () => {
  const res = await fetch(
    `http://localhost/resume/server/api/resume/getResume.php?personal_id=${id}`
  );
  data = await res.json();
  console.log(data);
  person = {
    ...person,
    fullname: data.fullname,
    birthday: data.birthday,
    sex: data.sex,
    mail: data.mail,
    address: data.address,
    phone: data.phone,
    job: data.job,
    facebook_link: data.facebook_link,
    github_link: data.github_link,
    carrer: data.carrer,
  };

  fullname.value = person.fullname;
  birthday.value = person.birthday;
  sex.value = person.sex;
  mail.value = person.mail;
  address.value = person.address;
  phone.value = person.phone;
  job.value = person.job;
  facebooklink.value = person.facebook_link;
  githublink.value = person.github_link;
  carrer.value = person.carrer;

  //chuyen cai education thanh cai dang education ban dau trc format
  // console.log(data.education);
  data.education.forEach((object, index) => {
    //element dang la 1 object
    for (let property in object) {
      let info = {};
      info.value = object[property];
      info.key = property + index;
      info.group = property;
      education = [...education, info];
    }
  });
  format(
    education,
    [
      "school",
      "degree",
      "major",
      "datestart",
      "dateend",
      "descripition",
      "address",
    ],
    educationResult
  );

  data.education.forEach(() => {
    addEducationIntoListEducation();
  });
  update(
    educationResult,
    [
      "edu_school-value",
      "edu_degree-value",
      "edu_major-value",
      "edu_datestart-value",
      "edu_dateend-value",
      "edu_descripition-value",
      "edu_address-value",
    ],
    4
  );

  // //phan kinh nghiem
  data.experience.forEach((object, index) => {
    //element dang la 1 object
    for (let property in object) {
      let info = {};
      info.value = object[property];
      info.key = property + index;
      info.group = property;
      experience = [...experience, info];
    }
  });
  format(
    experience,
    ["job", "company", "datestart", "dateend", "descripition", "address"],
    experienceResult
  );
  // //render ra so luong thong tin education tuong ung
  data.experience.forEach(() => {
    addExperienceIntoListExperience();
  });
  update(
    experienceResult,
    [
      "exp_company-value",
      "exp_job-value",
      "exp_datestart-value",
      "exp_dateend-value",
      "exp_descripition-value",
      "exp_address-value",
    ],
    4
  );

  // //phan ky nang
  data.skills.forEach((object, index) => {
    //element dang la 1 object
    for (let property in object) {
      let info = {};
      info.value = object[property];
      info.key = property + index;
      info.group = property;
      skills = [...skills, info];
    }
  });
  format(skills, ["skill", "level", "time", "descripition"], skillsResult);
  // //render ra so luong thong tin education tuong ung
  data.skills.forEach(() => {
    addSkillIntoListSkills();
  });
  update(
    skillsResult,
    [
      "skill_skill-value",
      "skill_level-value",
      "skill_time-value",
      "skill_descripition-value",
    ],
    6
  );
})();

//xu ly su kien khi nguoi dung nhap du lieu tren form
listSkill.onclick = (e) => {
  itemSkill = e.target;

  itemSkill.onchange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    let info = {
      value,
      key,
      group: key.slice(0, key.length - 1),
    };

    //kiem tra
    if (skills.map((e) => e.key).includes(info.key)) {
      //tra ve phan tu co key trung voi cai vua nhap vao
      skills = skills.filter((e) => e.key !== info.key);
      skills = [...skills, info];
    } else {
      skills = [...skills, info];
    }
  };

  //khi di chuyen ra ngoi vung nhap thi format du lieu
  itemSkill.onblur = () => {
    format(skills, ["skill", "level", "time", "descripition"], skillsResult);
  };

  itemSkill.onclick = () => {
    if (itemSkill.getAttribute("type") === "button") {
      let key = itemSkill.id;
      let skillRemove = document.querySelector(`#${key}`);
      skillRemove.remove();
      skills = skills.filter((e) => !e.key.includes(key.slice(key.length - 1)));
      format(skills, ["skill", "level", "time", "descripition"], skillsResult);
    }
  };
};

listEducation.onclick = (event) => {
  //lay ra cai o input dang duoc click
  itemEducation = event.target;

  //bat su kien khi nguoi dung thay doi du lieu trong input
  itemEducation.onchange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    let info = { value, key, group: key.slice(0, key.length - 1) };

    if (education.map((e) => e.key).includes(info.key)) {
      education = education.filter((e) => e.key !== info.key);
      education = [...education, info];
    } else {
      education = [...education, info];
    }
  };

  itemEducation.onblur = () => {
    format(
      education,
      [
        "school",
        "degree",
        "major",
        "datestart",
        "dateend",
        "descripition",
        "address",
      ],
      educationResult
    );
  };

  itemEducation.onclick = () => {
    if (itemEducation.getAttribute("type") === "button") {
      //kiem tra xem no co phai la button ko cho chac
      let id = itemEducation.id;
      let educationRemove = document.querySelector(`#${id}`);
      educationRemove.remove();

      // xoa du lieu trong cai education di
      //id = education1 => xoa tat ca key : [school1, degree1, datestart1, ...]
      //[{value: "", key: "school1", group: "school"}, {value: "", key: "", group: "school"}, {value: "", key: "", group: "degree"}, {value: "", key: "", group: "school"}]
      education = education.filter(
        (e) => !e.key.includes(id.slice(id.length - 1))
      );

      // format lai cai educationResult
      format(
        education,
        [
          "school",
          "degree",
          "major",
          "datestart",
          "dateend",
          "descripition",
          "address",
        ],
        educationResult
      );
    }
  };
};

listExperience.onclick = (event) => {
  //lay ra cai o input dang duoc click
  itemExperience = event.target;

  //bat su kien khi nguoi dung thay doi du lieu trong input
  itemExperience.onchange = (event) => {
    console.log("change");
    const value = event.target.value;
    const key = event.target.name;

    let info = {};
    info.value = value;
    info.key = key;
    info.group = key.slice(0, key.length - 1);
    /* info no se co du lieu kieu nay ne: 
    {value: "dai hoc thuy loi", key: "school0", group: "school"}
    */

    //kiem tra
    if (experience.map((e) => e.key).includes(info.key)) {
      //tra ve phan tu co key trung voi cai vua nhap vao
      experience = experience.filter((e) => e.key !== info.key);
      experience = [...experience, info];
    } else experience = [...experience, info];
  };

  //khi nguoi dung thoat ra khoi vung nhap thi phai format lai du lieu luon
  itemExperience.onblur = () => {
    format(
      experience,
      ["job", "company", "datestart", "dateend", "descripition", "address"],
      experienceResult
    );
  };
  // Task 4: Khi nguoi dung nhan vao nut xoa thi xoa form nhap di

  //itemEducation day dang la cai button
  itemExperience.onclick = () => {
    if (itemExperience.getAttribute("type") === "button") {
      //kiem tra xem no co phai la button ko cho chac
      let id = `${itemExperience.getAttribute("id")}`;
      let experienceRemove = document.querySelector(`#${id}`);
      //console.log(experienceRemove)
      //console.log(id, experienceRemoce);
      experienceRemove.remove();

      // xoa du lieu trong cai education di
      //id = education1 => xoa tat ca key : [school1, degree1, datestart1, ...]
      //[{value: "", key: "school1", group: "school"}, {value: "", key: "", group: "school"}, {value: "", key: "", group: "degree"}, {value: "", key: "", group: "school"}]
      experience = experience.filter(
        (e) => !e.key.includes(id.slice(id.length - 1))
      );

      // format lai cai educationResult
      format(
        experience,
        ["job", "company", "datestart", "dateend", "descripition", "address"],
        experienceResult
      );
    }
  };
};

//xu ly su kien khi nguoi dung nhan them thong tin

btnAddExperience.onclick = () => {
  addExperienceIntoListExperience();
  update(
    experienceResult,
    [
      "exp_company-value",
      "exp_job-value",
      "exp_datestart-value",
      "exp_dateend-value",
      "exp_descripition-value",
      "exp_address-value",
    ],
    4
  );
};

btnAddEducation.onclick = () => {
  addEducationIntoListEducation();
  update(
    educationResult,
    [
      "edu_school-value",
      "edu_degree-value",
      "edu_major-value",
      "edu_datestart-value",
      "edu_dateend-value",
      "edu_descripition-value",
      "edu_address-value",
    ],
    4
  );
};

btnAddSkill.onclick = () => {
  addSkillIntoListSkills();
  update(
    skillsResult,
    [
      "skill_skill-value",
      "skill_level-value",
      "skill_time-value",
      "skill_descripition-value",
    ],
    6
  );
};

const personalField = document.querySelector(".personal");

personalField.onclick = (event) => {
  element = event.target;

  if (element.type !== "file") {
    element.onchange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      person = { ...person, [name]: value };
    };
    element.onblur = (e) => {
      const name = e.target.name;

      //nếu mà đang blur trên fullname, address, ....
      //name !== 'phone' && name !== 'mail' && name !== 'sex' && name !== 'ins-link'
      if (
        !["phone", "mail", "sex", "ins-link", "fb-link", "gh-link"].includes(
          name
        )
      ) {
        if (!person[`${name}`]) {
          errorPer = { ...errorPer, [name]: "vui lòng điền thông tin" };
        }
        //truy xuat den phan tu html tuong ung
        const err = document.querySelector(`.err-${name}`);
        err.innerHTML = errorPer[`${name}`];
        err.style.opacity = "1";
      }

      //nếu đang blur trên phone
      if (name === "phone") {
        const phone = Number(e.target.value);
        if (!person[`${name}`]) {
          errorPer = { ...errorPer, [name]: "vui lòng điền thông tin" };
        }
        if (Number.isNaN(phone)) {
          //ko phai so dien thoai
          errorPer = { ...errorPer, [name]: "vui lòng nhập số điện thoại" };
        }
        const err = document.querySelector(`.err-${name}`);
        err.innerHTML = errorPer[`${name}`];
        err.style.opacity = "1";
      }

      //nếu blur trên mail
    };

    element.onfocus = (e) => {
      const name = e.target.name;

      errorPer = { ...errorPer, [name]: "" };
      console.log(errorPer);
      const err = document.querySelector(`.err-${name}`);
      err.innerHTML = errorPer[`${name}`];
      err.style.opacity = "0";
    };
  }

  if (element.type === "file") {
    element.onchange = (e) => {
      person = { ...person, avatar: e.target.files[0] };
    };
  }
};

const btnSubmit = document.querySelector(".btn-submit button");
btnSubmit.onclick = async () => {
  await fetch(
    `http://localhost/resume/server/api/personal/updatePersonal.php`,
    {
      method: "post",
      body: JSON.stringify({ person, per_id: id }),
    }
  );

  await fetch(
    `http://localhost/resume/server/api/resume/deleteResumeNotPersonal.php?per_id=${id}`
  );

  //them lai du lieu moi vao csdl
  await fetch(
    "http://localhost/resume/server/api/education/addEducationByPersonalId.php",
    {
      method: "post",
      body: JSON.stringify({ education, personal_id: id }),
    }
  );

  await fetch(
    "http://localhost/resume/server/api/experience/addExperienceByPersonalId.php",
    {
      method: "post",
      body: JSON.stringify({ experience, personal_id: id }),
    }
  );

  await fetch(
    "http://localhost/resume/server/api/skills/addSkillByPersonalId.php",
    {
      method: "post",
      body: JSON.stringify({ skills, personal_id: id }),
    }
  );

  window.location.replace("http://localhost/resume/client/myaccount.html");
};
