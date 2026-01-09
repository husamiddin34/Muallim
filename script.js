// ================= CAPTCHA =================
let num1, num2;
window.onload = function(){
  const captchaQ = document.getElementById("captchaQuestion");
  if(captchaQ){
    num1 = Math.floor(Math.random()*10)+1;
    num2 = Math.floor(Math.random()*10)+1;
    captchaQ.innerText = `🤖 Robot emasligingizni isbotlang: ${num1} + ${num2} = ?`;
  }
};

// ================= REGISTER =================
function register(){
  const error = document.getElementById("error");
  const captchaInput = document.getElementById("captchaAnswer");

  if(captchaInput && parseInt(captchaInput.value) !== (num1+num2)){
    error.innerText = "❌ CAPTCHA noto‘g‘ri!";
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const country = document.getElementById("country").value;
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();

  if(!name || !email || !phone || !password){
    error.innerText = "❌ Barcha maydonlarni to‘ldiring!";
    return;
  }

  const fullPhone = country + phone;
  const code = Math.floor(100000 + Math.random()*900000);

  const data = {name,email,phone:fullPhone,password,code,time:Date.now()};
  localStorage.setItem("verify_data", JSON.stringify(data));

  console.log("Sizning kodingiz:", code); // TEST uchun, keyin o'chirishingiz mumkin

  emailjs.send("service_vip","template_3ri96nc",{email: email, code: code})
  .then(()=>{
    location.href = "verify.html";
  })
  .catch(()=>{
    error.innerText = "❌ Email yuborilmadi!";
  });
}

// ================= VERIFY =================
function verify(){
  const savedJSON = localStorage.getItem("verify_data");
  const msg = document.getElementById("msg");
  const nextBtn = document.getElementById("nextPageBtn");

  if(!savedJSON){
    msg.style.color="red";
    msg.innerText = "❌ Avval ro‘yxatdan o‘ting!";
    return;
  }

  const saved = JSON.parse(savedJSON);
  const inputCode = document.getElementById("code").value.trim();

  // Kod muddati 2 daqiqa
  if(Date.now() - saved.time > 120000){
    msg.style.color="red";
    msg.innerText = "⏱ Kod muddati tugadi! Qayta yuboring.";
    return;
  }

  // To'g'ri kod
  if(inputCode === String(saved.code)){
    msg.style.color="green";
    msg.innerText = "✅ Akkaunt muvaffaqiyatli tasdiqlandi!";
    nextBtn.style.display = "block"; // Keyingi sahifa tugmasini ko‘rsatish
  } else {
    msg.style.color="red";
    msg.innerText = "❌ Kod noto‘g‘ri!";
  }
}

// Keyingi sahifa
function goNextPage(){
  window.location.href = "course.html"; // yoki login.html
}

// Kodni qayta yuborish
function resendCode(){
  const savedJSON = localStorage.getItem("verify_data");
  if(!savedJSON) return;

  const saved = JSON.parse(savedJSON);
  const newCode = Math.floor(100000 + Math.random()*900000);

  saved.code = newCode;
  saved.time = Date.now();
  localStorage.setItem("verify_data", JSON.stringify(saved));

  emailjs.send("service_vip","template_3ri96nc",{email: saved.email, code: newCode})
    .then(()=> alert("✅ Kod qayta yuborildi!"))
    .catch(()=> alert("❌ Kod yuborilmadi!"));

  console.log("Yangi kod:", newCode); // TEST
}
