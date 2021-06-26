let input = document.querySelector(".categories");
let count = document.querySelector(".count");
let apiList = document.querySelector(".apiDataDisplay");
let loadingHTML = document.querySelector(".loading");
let errorMsgHTML = document.querySelector(".errormsg");
document.querySelector(".getApiBtn").addEventListener("click", getApis);

const renderLoader = () => {
  let loader = `
  <div class="spinner" role="status">
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="24px" height="80px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
    <rect x="0" y="13" width="4" height="8" fill="#878787">
      <animate attributeName="height" attributeType="XML"
        values="5;21;5"
        begin="0s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="y" attributeType="XML"
        values="13; 5; 13"
        begin="0s" dur="0.6s" repeatCount="indefinite" />
    </rect>
    <rect x="10" y="13" width="4" height="8" fill="#878787">
      <animate attributeName="height" attributeType="XML"
        values="5;21;5"
        begin="0.15s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="y" attributeType="XML"
        values="13; 5; 13"
        begin="0.15s" dur="0.6s" repeatCount="indefinite" />
    </rect>
    <rect x="20" y="13" width="4" height="8" fill="#878787">
      <animate attributeName="height" attributeType="XML"
        values="5;21;5"
        begin="0.3s" dur="0.6s" repeatCount="indefinite" />
      <animate attributeName="y" attributeType="XML"
        values="13; 5; 13"
        begin="0.3s" dur="0.6s" repeatCount="indefinite" />
    </rect>
  </svg>
       </div>
      `;
  loadingHTML.insertAdjacentHTML("beforeend", loader);
};
const clearLoader = () => {
  let spinner = document.querySelector(".spinner");
  if (spinner) {
    spinner.parentElement.removeChild(spinner);
  }
};

const renderErrorMsg = () => {
  let errorMsg = `
<div class="columns is-centered">
         <div class="column is-half">
            <div class="card">
               <div class="notification is-danger is-light">
                  <button class="delete"></button>
                  <strong>Sorry, Something went wrong !</strong>
               </div>
            </div>
         </div>
      </div>
`;
  errorMsgHTML.insertAdjacentHTML("beforeend", errorMsg);
};

// TODO : add https and cors

function getApis() {
  apiList.innerHTML = "";
  count.textContent = "";
  let category = input.value;
  renderLoader();
  fetch(`https://api.publicapis.org/entries?category=${category}&https=true`)
    .then((apis) => {
      data = apis.json();
      return data;
    })
    .then((data) => {
      count.textContent = `Total  ${data.count} Api's found`;
      let entries = data.entries;
      clearLoader();
      entries.forEach((el) => {
        if (el.Auth == "") el.Auth = "No Auth";
        displayApi(el);
      });
    })

    .catch((error) => {
      if (error) {
        clearLoader();
        renderErrorMsg();
      }
    });
}

const displayApi = (el) => {
  let layout = `
        <div class="column  is-6">
            <div class="card  has-background-grey-lighter">
               <div class="card-content">
                  <h3 class="title is-4"> ${el.API} </h3>
                  <p class="has-text-grey-darker is-spaced"> ${el.Description} </p>
                  <h6 class="title is-spaced is-6 pt-3"> Auth Type : ${el.Auth} </h6>
                  <a href=${el.Link} class="button is-spaced is-info is-outlined" target="_blank"> View </a>
               </div>
            </div>
         </div>
        `;

  apiList.insertAdjacentHTML("beforeend", layout);
};

document.addEventListener("DOMContentLoaded", () => {
  (document.querySelectorAll(".notification .delete") || []).forEach(
    ($delete) => {
      const $notification = $delete.parentNode;

      $delete.addEventListener("click", () => {
        $notification.parentNode.removeChild($notification);
      });
    }
  );
});
