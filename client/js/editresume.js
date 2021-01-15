let url = window.location.href;
url = new URL(url);
let id = url.searchParams.get("personal_id");

const listEducation = document.querySelector(".list-education");
const btnAddEducation = document.querySelector(".btn-add-education button");

const btnAddExperience = document.querySelector(".btn-add-experience");
const listExperience = document.querySelector(".list-experience");

///xu ly du lieu cho phan them ky nang
const btnAddSkill = document.querySelector(".btn-add-skill");
const listSkill = document.querySelector(".list-skill");

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

let data = {};

let personal = {};

let amountEducation = 0;
let education = [];
let educationResult = {
  school: [],
  degree: [],
  datestart: [],
  dateend: [],
  descripition: [],
};

let amountExperience = 0;
let experience = [];
let experienceResult = {
  job: [],
  company: [],
  datestart: [],
  dateend: [],
  descripition: [],
};

let amountSkill = 0;
let skills = [];
let skillsResult = {
  skill: [],
  level: [],
};

const formatEducation = () => {
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
    //element.setAttribute("value", temp.length > 0 ? temp[0]?.value : "");
    element.value = temp.length > 0 ? temp[0]?.value : "";
    //cai educationResult: {[value: , key: school1, group:, ], [], ...}
  });
};

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

const formatExperience = () => {
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

const formatSkill = () => {
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

const addSkillIntoListSkills = () => {
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
  //updateSkill();
  amountSkill++;
};

(async () => {
  const res = await fetch(
    `http://localhost/resume/server/api/resume/getResume.php?personal_id=${id}`
  );
  data = await res.json();
  console.log(data);
  personal = {
    ...personal,
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

  fullname.value = personal.fullname;
  birthday.value = personal.birthday;
  sex.value = personal.sex;
  mail.value = personal.mail;
  address.value = personal.address;
  phone.value = personal.phone;
  job.value = personal.job;
  facebooklink.value = personal.facebook_link;
  githublink.value = personal.github_link;
  carrer.value = personal.carrer;

  //chuyen cai education thanh cai dang education ban dau trc format
  console.log(data.education);
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
  formatEducation();
  //render ra so luong thong tin education tuong ung
  
  data.education.forEach(() => {
    console.log('ko update a');
    addEducationIntoListEducation();
  });
  updateEducation();

  //phan kinh nghiem
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
  formatExperience();
  //render ra so luong thong tin education tuong ung
  data.experience.forEach(() => {
    addExperienceIntoListExperience();
  });
  updateExperience();

  //phan ky nang
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
  formatSkill();
  //render ra so luong thong tin education tuong ung
  data.skills.forEach(() => {
    addSkillIntoListSkills();
  });
  updateSkill();
})();

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
  formatEducation();
  updateEducation();
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

btnAddSkill.onclick = () => {
  addSkillIntoListSkills();
  updateSkill();
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

// phan nay moi ne
fullname.onchange = (e) => {
  personal = { ...personal, fullname: e.target.value };
};
birthday.onchange = (e) => {
  personal = { ...personal, birthday: e.target.value };
};
sex.onchange = (e) => {
  personal = { ...personal, sex: e.target.value };
  console.log(personal);
};
mail.onchange = (e) => {
  personal = { ...personal, mail: e.target.value };
};
address.onchange = (e) => {
  personal = { ...personal, address: e.target.value };
};
phone.onchange = (e) => {
  personal = { ...personal, phone: e.target.value };
};
facebooklink.onchange = (e) => {
  personal = { ...personal, facebook_link: e.target.value };
};

githublink.onchange = (e) => {
  personal = { ...personal, github_link: e.target.value };
};
job.onchange = (e) => {
  personal = { ...personal, job: e.target.value };
};
carrer.onchange = (e) => {
  personal = { ...personal, carrer: e.target.value };
};

const avatarInput = document.querySelector(".avatar input");
avatarInput.onchange = (e) => {
  person = { ...person, avatar: e.target.files[0] };
};

//fetch gui xu lieu len server

//upload thong tin lien quan den person
//câng hàm update thông tin
const btnSubmit = document.querySelector(".btn-submit button");
btnSubmit.onclick = async () => {

  await fetch(`http://localhost/resume/server/api/personal/updatePersonal.php`, {
    method: "post",
    body: JSON.stringify({person: personal, per_id: id})
  });

  await fetch(`http://localhost/resume/server/api/resume/deleteResumeNotPerson.php?per_id=${id}`);

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

  window.location.replace('http://localhost/resume/client/myaccount.html');

}

//con education, experience, skills do khong biet cai nao vùa duoc them, cái nào là sửa
//nên xoá dữ liệu cái cũ đi, thêm mới lại
//hàm xoá theo id đã có rồi
