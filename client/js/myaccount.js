const id = sessionStorage.getItem('id');
console.log(id);
if(!id){
    window.location.href = "http://localhost/resume/client/login.html";
}
else{
    console.log('dang nhap thanh cong');
}