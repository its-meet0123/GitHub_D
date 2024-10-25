const BASE_URL =
  "https://2024-03-06.currency-api.pages.dev/v1/currencies";

  const dropdowns = document.querySelectorAll(".dropdown select");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const btn = document.querySelector("button");
  

  for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
          newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){
          newOption.selected = "selected";
        }
        select.append(newOption);
        select.addEventListener("change",(evt) => {
          updateFlag(evt.target);
        });
    }
  }

  const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  }

  const updadteExchangeRate = async() =>{
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`; 
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = amountVal*rate;
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  }

  btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updadteExchangeRate();
  });

window.addEventListener("load",() =>{
  updadteExchangeRate();
});

  
