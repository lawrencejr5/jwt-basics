const alert = document.querySelector(".alert");
const tokenDiv = document.querySelector(".token");
const form = document.querySelector(".myForm");
const getDataBtn = document.querySelector(".getDataBtn");
const dataMsg = document.querySelector(".dataMsg");

const lsToken = localStorage.getItem("token");

if (lsToken) {
  tokenDiv.textContent = "Token is present";
}

form.addEventListener("submit", async (e) => {
  const user = document.querySelector(".user").value;
  const pass = document.querySelector(".pass").value;

  try {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:3000/api/v1/login", {
      user,
      pass,
    });
    const { msg, token } = data;
    alert.style.display = "block";
    alert.textContent = msg;

    localStorage.setItem("token", token);

    window.location.reload();

    setTimeout(() => {
      alert.style.display = "none";
    }, 2000);
  } catch (error) {
    localStorage.removeItem("token");
  }
});
getDataBtn.addEventListener("click", async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/v1/dashboard", {
      headers: {
        Authorization: `Bearer ${lsToken}`,
      },
    });
    dataMsg.innerHTML = `${data.msg}. <br/> ${data.secret}`;
  } catch (error) {
    console.log(error);
  }
});
