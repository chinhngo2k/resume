//kiem tra nguoi dung da dang nhap thi moi duoc ato cv
const id = sessionStorage.getItem('id');
console.log(id);
// if(!id){
//     window.location.href = "http://localhost/resume/client/login.html";
// }
// else{
//     console.log('dang nhap thanh cong');
// }


///xu ly du lieu cho phan them ky nang
const btnAddSkill = document.querySelector(".btn-add-skill");
let listSkill = document.querySelector(".list-skill");

let amountSkill = 0;

let skills = [];
let skillsResult = {
  skill: [],
  level: [],
};

const formatSkill = (skills) => {
  skills.forEach((element) => {
    const { group, key } = element;
    if (group === "skill") {
      if (!skillsResult.skill.map((e) => e.key).includes(key))
        skillsResult.skill = [...skillsResult.skill, element];
    } else {
      if (!skillsResult.level.map((e) => e.key).includes(key))
        skillsResult.level = [...skillsResult.level, element];
    }
  });

  //console.log(formatEducation);
};

//cap nhat lai skillResult sau khi da xoa cac phan tu trong skills
const updateSkillResult = (key) => {
  console.log(key);
  skillsResult.skill = skillsResult.skill.filter(
    (e) => !e.key.includes(key.slice(key.length - 1))
  );
  skillsResult.level = skillsResult.level.filter(
    (e) => !e.key.includes(key.slice(key.length - 1))
  );
};

const updateSkill = () => {
  const { skill, level } = skillsResult;
  const skillValue = document.querySelectorAll(".skill-value");
  const levelValue = document.querySelectorAll(".level-value");
  skillValue.forEach((element) => {
    //element: #school1
    let temp = skill.filter((e) => e.key === element.getAttribute("id"));
    element.setAttribute("value", temp.length > 0 ? temp[0].value : "");
    //cai educationResult: {[value: , key: school1, group:, ], [], ...}
  });
  //console.log(levelValue[0].options[1].selected);

  levelValue.forEach((element) => {
    console.log(element.getAttribute("id"));
    let temp = level.filter((e) => e.key === element.getAttribute("id"));
    console.log(temp);
    //element dang la tung cai select
    for (let index = 0; index < element.length; index++) {
      if (element[index].value == temp[0]?.value) {
        //console.log(element[index]);
        element[index].selected = true;
      } else {
        element[index].selected = false;
      }
    }
  });
};

//ham nay tam thoi chay dang bị lỗi ko biết sửa
//ham nay nhan vao 2 tham so la key cua skill va level
const setValueDefaultSkill = (arrayKey, arrayValue) => {
  //tham so la mot mang với skillkey va levelkey tuong ung
  //biet gia tri mac dinh sua skill = '';
  //gia tri mac dinh cua level = 1;
  arrayKey.forEach((element, index) => {
    let info = {
      value: arrayValue[index],
      key: element,
      group: element.slice(0, element.length - 1),
    };
    skills = [...skills, info];
    //skill1
  });
};

btnAddSkill.onclick = () => {
  let skillItem = `<div class="skill-item" id="skills${amountSkill}">
    <div class="r-flex">
    <div class="skill w-1-2">
    <label for="skill${amountSkill}" class="form-label">ký năng</label>
    <input type="text" name="skill${amountSkill}" id="skill${amountSkill}" value='' class="skill-value form-input" >
</div>
<div class="level w-1-2">
    <label for="level${amountSkill}" class="form-label">đánh giá</label>
    <select name="level${amountSkill}" id="level${amountSkill}" class="level-value form-input">
        <option value="" selected>--Please choose an option--</option>
        <option id="" value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
</div>
    </div>
    <button type="button" id="skills${amountSkill}" class="btn" >xoá</button>
    
</div>`;

  // setValueDefaultSkill(
  //   [`skill${amountSkill}`, `level${amountSkill}`],
  //   ["", 1]
  // );
  listSkill.innerHTML += skillItem;
  updateSkill();
  amountSkill++;

  //formatSkill(skills);

  //minh muon la ngay khi vua nhan them moi thi no da co gia tri mac dinh la {}

  //formatSkill(skills);

  //cap nhat lai gia tri vao input
};

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
    //   info.value = value;
    //   info.key = key;
    //   info.group = key.slice(0, key.length - 1);
    /* info no se co du lieu kieu nay ne: 
        {value: "dai hoc thuy loi", key: "school0", group: "school"}
        */

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
    formatSkill(skills);
  };

  itemSkill.onclick = () => {
    //trong truong hop nguoi ta nhan vao nit xoa
    if (itemSkill.getAttribute("type") === "button") {
      let key = `${itemSkill.getAttribute("id")}`;
      let skillRemove = document.querySelector(`#${key}`);
      skillRemove.remove();

      //xoa di roi thi phai xoa du lieu trong skills di
      skills = skills.filter((e) => !e.key.includes(key.slice(key.length - 1)));
      updateSkillResult(key);
    }
  };
};

//xu ly di lieu cho phan them hoc van
let amountEducation = 0;
let education = [];
let educationResult = {
  school: [],
  degree: [],
  datestart: [],
  dateend: [],
  descripition: [],
};

const btnAddEducation = document.querySelector(".btn-add-education");
const listEducation = document.querySelector(".list-education");

const addEducationIntoListEducation = () => {
  let education = `<div class="education-item my-2" id="education${amountEducation}">
      <div class="school-degree r-flex">
          <div class="school w-1-2">
              <label for="" class="form-label">trường học</label>
              <input type="text" name="school${amountEducation}" class="school-value form-input" id="school${amountEducation}">
          </div>
          <div class="w-1-2">
              <label for="" class="form-label">cấp học</label>
              <input type="text" name="degree${amountEducation}" class="degree-value form-input" id="degree${amountEducation}" >
          </div>
          
      </div>
      <div class="date r-flex">
          <div class="datestart w-1-2">
              <label for="" class="form-label">ngày bắt đầu học</label>
              <input type="date" name="datestart${amountEducation}" class="datestart-value form-input" id="datestart${amountEducation}" >
          </div>
          <div class="dateend w-1-2">
              <label for="" class="form-label">ngày kết thúc</label>
              <input type="date" name="dateend${amountEducation}" class="dateend-value form-input" id="dateend${amountEducation}" >
          </div>
      </div>
      <div class="descripition w-1-2">
          <label for="" class="form-label">mô tả</label>
          <textarea name="descripition${amountEducation}" class="descripition-value form-input" id="descripition${amountEducation}" cols="30" rows="10"></textarea>
      </div>
      <button type="button" id="education${amountEducation}" class="btn">xoá</button>
  </div>`;

  listEducation.innerHTML += education;
  amountEducation++;
};

const formatEducation = (education) => {
  education.forEach((element) => {
    const { group, key } = element;
    if (group === "school") {
      if (!educationResult.school.map((e) => e.key).includes(key))
        educationResult.school = [...educationResult.school, element];
    } else if (group === "degree") {
      if (!educationResult.degree.map((e) => e.key).includes(key))
        educationResult.degree = [...educationResult.degree, element];
    } else if (group === "datestart") {
      if (!educationResult.datestart.map((e) => e.key).includes(key))
        educationResult.datestart = [...educationResult.datestart, element];
    } else if (group === "dateend") {
      if (!educationResult.dateend.map((e) => e.key).includes(key))
        educationResult.dateend = [...educationResult.dateend, element];
    } else {
      if (!educationResult.descripition.map((e) => e.key).includes(key))
        educationResult.descripition = [
          ...educationResult.descripition,
          element,
        ];
    }
  });

  //console.log(formatEducation);
};

//chuc nang nay se hoat dong khi nhan nut "them thong tin"
const updateEducation = () => {
  const { school, degree, datestart, dateend, descripition } = educationResult;

  //lay tat ca ca the input = school-value
  const schoolValue = document.querySelectorAll(".school-value");
  const degreeValue = document.querySelectorAll(".degree-value");
  const datestartValue = document.querySelectorAll(".datestart-value");
  const dateendValue = document.querySelectorAll(".dateend-value");
  const descripitionValue = document.querySelectorAll(".descripition-value");

  //console.log(school);
  schoolValue.forEach((element) => {
    //element: #school1
    let temp = school.filter((e) => e.key === element.getAttribute("id"));
    element.setAttribute("value", temp.length > 0 ? temp[0]?.value : "");
    //cai educationResult: {[value: , key: school1, group:, ], [], ...}
  });

  degreeValue.forEach((element) => {
    //element: #school1
    let temp = degree.filter((e) => e.key === element.getAttribute("id"));
    element.setAttribute("value", temp.length > 0 ? temp[0]?.value : "");
    //cai educationResult: {[value: , key: school1, group:, ], [], ...}
  });

  datestartValue.forEach((element) => {
    //element: #school1
    let temp = datestart.filter((e) => e.key === element.getAttribute("id"));
    element.setAttribute("value", temp.length > 0 ? temp[0]?.value : "");
    //cai educationResult: {[value: , key: school1, group:, ], [], ...}
  });

  dateendValue.forEach((element) => {
    //element: #school1
    let temp = dateend.filter((e) => e.key === element.getAttribute("id"));
    element.setAttribute("value", temp.length > 0 ? temp[0]?.value : "");
    //cai educationResult: {[value: , key: school1, group:, ], [], ...}
  });

  descripitionValue.forEach((element) => {
    //element: #school1
    let temp = descripition.filter((e) => e.key === element.getAttribute("id"));
    element.value = temp.length > 0 ? temp[0]?.value : "";
    //cai educationResult: {[value: , key: school1, group:, ], [], ...}
  });
};

listEducation.onclick = (event) => {
  //lay ra cai o input dang duoc click
  itemEducation = event.target;

  //bat su kien khi nguoi dung thay doi du lieu trong input
  itemEducation.onchange = (event) => {
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
    if (education.map((e) => e.key).includes(info.key)) {
      //tra ve phan tu co key trung voi cai vua nhap vao
      education = education.filter((e) => e.key !== info.key);
      education = [...education, info];
    } else education = [...education, info];
  };

  //khi nguoi dung thoat ra khoi vung nhap thi phai format lai du lieu luon
  itemEducation.onblur = () => {
    formatEducation(education);
  };
  // Task 4: Khi nguoi dung nhan vao nut xoa thi xoa form nhap di

  //itemEducation day dang la cai button
  itemEducation.onclick = () => {
    if (itemEducation.getAttribute("type") === "button") {
      //kiem tra xem no co phai la button ko cho chac
      let id = `${itemEducation.getAttribute("id")}`;
      let educationRemove = document.querySelector(`#${id}`);
      //console.log(id, educationRemove);
      educationRemove.remove();

      // xoa du lieu trong cai education di
      //id = education1 => xoa tat ca key : [school1, degree1, datestart1, ...]
      //[{value: "", key: "school1", group: "school"}, {value: "", key: "", group: "school"}, {value: "", key: "", group: "degree"}, {value: "", key: "", group: "school"}]
      education = education.filter(
        (e) => !e.key.includes(id.slice(id.length - 1))
      );

      // format lai cai educationResult
      formatEducation(education);
    }
  };
};

btnAddEducation.onclick = () => {
  addEducationIntoListEducation();
  //format lai phat nua cho chac nhưng thực ra chắc ko cần đâu
  formatEducation(education);
  updateEducation();
};

//xu ly phan thong tin ca nhan

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
const carrer = document.querySelector(".carrer textarea");

fullname.onchange = (e) => {
  person = { ...person, fullname: e.target.value };
};
birthday.onchange = (e) => {
  person = { ...person, birthday: e.target.value };
};
sex.onchange = (e) => {
  person = { ...person, sex: e.target.value };
  console.log(person);
};
mail.onchange = (e) => {
  person = { ...person, mail: e.target.value };
};
address.onchange = (e) => {
  person = { ...person, address: e.target.value };
};
phone.onchange = (e) => {
  person = { ...person, phone: e.target.value };
};
facebooklink.onchange = (e) => {
  person = { ...person, facebook_link: e.target.value };
};
githublink.onchange = (e) => {
  person = { ...person, github_link: e.target.value };
};
job.onchange = (e) => {
  person = { ...person, job: e.target.value };
};
carrer.onchange = (e) => {
  person = { ...person, carrer: e.target.value };
};

//phan kinh nghiem
let amountExperience = 0;
let experience = [];
let experienceResult = {
  job: [],
  company: [],
  datestart: [],
  dateend: [],
  descripition: [],
};

const btnAddExperience = document.querySelector(".btn-add-experience");
//console.log(btnAddExperience);
const listExperience = document.querySelector(".list-experience");

const addExperienceIntoListExperience = () => {
  let experience = `<div class="experience-item my-2" id="experience${amountExperience}">
    <div class="job-company r-flex">
        <div class="job w-1-2">
            <label for="job" class="form-label">chức vụ</label>
            <input type="text" name="job${amountExperience}" class="job-value form-input" id="job${amountExperience}">
        </div>
        <div class="w-1-2">
            <label for="company" class="form-label">công ty</label>
            <input type="text" name="company${amountExperience}" class="company-value form-input" id="company${amountExperience}" >
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
    <button type="button" id="experience${amountExperience}" class="btn" >xoá</button>
</div>`;

  listExperience.innerHTML += experience;
  amountExperience++;
};

const formatExperience = (experience) => {
  experience.forEach((element) => {
    const { group, key } = element;
    if (group === "job") {
      if (!experienceResult.job.map((e) => e.key).includes(key))
        experienceResult.job = [...experienceResult.job, element];
    } else if (group === "company") {
      if (!experienceResult.company.map((e) => e.key).includes(key))
        experienceResult.company = [...experienceResult.company, element];
    } else if (group === "datestart") {
      if (!experienceResult.datestart.map((e) => e.key).includes(key))
        experienceResult.datestart = [...experienceResult.datestart, element];
    } else if (group === "dateend") {
      if (!experienceResult.dateend.map((e) => e.key).includes(key))
        experienceResult.dateend = [...experienceResult.dateend, element];
    } else {
      if (!experienceResult.descripition.map((e) => e.key).includes(key))
        experienceResult.descripition = [
          ...experienceResult.descripition,
          element,
        ];
    }
  });

  //console.log(formatEducation);
};

//chuc nang nay se hoat dong khi nhan nut "them thong tin"
const updateExperience = () => {
  const { company, job, datestart, dateend, descripition } = experienceResult;

  //lay tat ca ca the input = school-value
  const companyValue = document.querySelectorAll(".company-value");
  const jobValue = document.querySelectorAll(".job-value");
  const datestartValue = document.querySelectorAll(".exp_datestart-value");
  const dateendValue = document.querySelectorAll(".exp_dateend-value");
  const descripitionValue = document.querySelectorAll(
    ".exp_descripition-value"
  );

  //console.log(school);
  companyValue.forEach((element) => {
    //element: #school1
    let temp = company.filter((e) => e.key === element.getAttribute("id"));
    element.setAttribute("value", temp.length > 0 ? temp[0]?.value : "");
    //cai educationResult: {[value: , key: school1, group:, ], [], ...}
  });

  jobValue.forEach((element) => {
    //element: #school1
    let temp = job.filter((e) => e.key === element.getAttribute("id"));
    element.setAttribute("value", temp.length > 0 ? temp[0]?.value : "");
    //cai educationResult: {[value: , key: school1, group:, ], [], ...}
  });

  datestartValue.forEach((element) => {
    //element: #school1
    let temp = datestart.filter(
      (e) => e.key === element.getAttribute("id").slice(4)
    );
    element.setAttribute("value", temp.length > 0 ? temp[0]?.value : "");
    //cai educationResult: {[value: , key: school1, group:, ], [], ...}
  });

  dateendValue.forEach((element) => {
    //element: #school1
    let temp = dateend.filter(
      (e) => e.key === element.getAttribute("id").slice(4)
    );
    element.setAttribute("value", temp.length > 0 ? temp[0]?.value : "");
    //cai educationResult: {[value: , key: school1, group:, ], [], ...}
  });

  descripitionValue.forEach((element) => {
    //element: #school1
    let temp = descripition.filter(
      (e) => e.key === element.getAttribute("id").slice(4)
    );
    console.log(temp);
    //element.setAttribute("value", temp.length > 0 ? temp[0]?.value : "");
    element.value = temp.length > 0 ? temp[0]?.value : "";
    //cai educationResult: {[value: , key: school1, group:, ], [], ...}
  });
};

listExperience.onclick = (event) => {
  //lay ra cai o input dang duoc click
  itemExperience = event.target;

  //bat su kien khi nguoi dung thay doi du lieu trong input
  itemExperience.onchange = (event) => {
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
    formatExperience(experience);
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
      formatExperience(experience);
    }
  };
};

btnAddExperience.onclick = () => {
  addExperienceIntoListExperience();
  //format lai phat nua cho chac nhưng thực ra chắc ko cần đâu
  formatExperience(experience);
  updateExperience();
};

const avatarInput = document.querySelector(".avatar input");
avatarInput.onchange = (e) => {
  person = { ...person, avatar: e.target.files[0] };
};

//phan gui du lieu len serevr
const btnSubmit = document.querySelector(".btn-submit button");
btnSubmit.onclick = async () => {
  console.log('jhagsdhja');
  //luu thong tin hoc van cac kieu trc
  let data = { skills, education, person, experience };
  console.log(data.person);
  // //console.log(data.skills)
  const resPersonal = await fetch(
    "http://localhost/resume/server/api/personal/addPersonal.php",
    {
      method: "POST",
      body: JSON.stringify({person: data.person, acc_id: id}),
    }
  );
  const personal_id = await resPersonal.json();
  //console.log(typeof Number(personal_id));

  let formData = new FormData();
  formData.append("avatar", person.avatar);
  formData.append("personal_id", personal_id);
  await fetch(
    "http://localhost/resume/server/api/personal/uploadAvatarByPersonalId.php",
    {
      method: "post",
      body: formData,
    }
  );

  await fetch(
    "http://localhost/resume/server/api/education/addEducationByPersonalId.php",
    {
      method: "post",
      body: JSON.stringify({ education: data.education, personal_id }),
    }
  );

  await fetch(
    "http://localhost/resume/server/api/experience/addExperienceByPersonalId.php",
    {
      method: "post",
      body: JSON.stringify({ experience: data.experience, personal_id }),
    }
  );

  await fetch(
    "http://localhost/resume/server/api/skills/addSkillByPersonalId.php",
    {
      method: "post",
      body: JSON.stringify({ skills: data.skills, personal_id }),
    }
  );
  window.location.replace('http://localhost/resume/client/myaccount.html');
};
