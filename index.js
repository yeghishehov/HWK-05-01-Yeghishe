const myInput = document.querySelector(".myInput");
const myUL = document.querySelector(".myUL");
const allBtn = document.querySelector(".all");
const activeBtn = document.querySelector(".active");
const completedBtn = document.querySelector(".completed");

const arrayLI = [];

myInput.addEventListener("keypress", input => {
  if (input.key === "Enter") {
    addList(input);
    render(arrayLI);
    input.target.value = "";
  }
});

const addList = input => {
  if (input.target.value !== "") {
    const li = {
      value: input.target.value,
      textDecoration: "none"
    };
    arrayLI.push(li);
  }
};

const render = elements => {
  myUL.innerHTML = "";
  elements.forEach((el, ind) => {
    const li = document.createElement("li");
    li.innerText = el.value;
    li.style.textDecoration = el.textDecoration;
    addClickToLi(li, ind);
    myUL.appendChild(li);
  });
  localStorage.setItem("cache", JSON.stringify(arrayLI));
};

const addClickToLi = (li, ind) => {
  li.addEventListener("click", e => {
    if (e.target.style.textDecoration === "line-through") {
      e.target.style.textDecoration = "none";
      arrayLI[ind].textDecoration = "none";
    } else {
      e.target.style.textDecoration = "line-through";
      arrayLI[ind].textDecoration = "line-through";
    }
  });
};

allBtn.addEventListener("click", () => {
  render(arrayLI);
});

activeBtn.addEventListener("click", () => {
  const activedLI = arrayLI.filter(li => li.textDecoration === "none");
  render(activedLI);
});

completedBtn.addEventListener("click", () => {
  const completedLI = arrayLI.filter(
    li => li.textDecoration === "line-through"
  );
  render(completedLI);
});

if (localStorage.cache) {
  const cache = JSON.parse(localStorage.cache);
  render(cache);
  cache.forEach(li => arrayLI.push(li));
}
