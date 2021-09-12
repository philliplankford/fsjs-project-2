/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const displayPerPage = 9;
const dataEntries = data.length; // 42 entries

const header = document.querySelector("header");
const studentList = document.querySelector(".student-list");
const pagination = document.querySelector(".link-list");

let pageTracker = 0;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function pageAmount(displayPer, totalEntries) {
   const num = Math.ceil(totalEntries / displayPer);
   return num;
}

function showPage(pagesPer){
   let inner = "";
   for (let i=0; i < pagesPer; i++) {
      inner +=
      `
      <li class="student-item cf">
         <div class="student-details">
         <img class="avatar" src=${data[i].picture.thumbnail} alt="Profile Picture">
         <h3>${data[i].name.first} ${data[i].name.last}</h3>
         <span class="email">${data[i].email}</span>
         </div>
         <div class="joined-details">
         <span class="date">Joined ${data[i].registered.date}</span>
         </div>
      </li>
      `;
   }
   studentList.innerHTML = inner;
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(pages){
   let classActive = "";
   let inner = "";
   for (let i=0; i < pages; i++) {
      if(i === 0) {
         classActive = "class='active'";
      } else { classActive = ""; }
      inner += 
      `
      <li> 
         <button type="button" ${classActive}>${i + 1}</button>
      </li>
      `
   }
   pagination.innerHTML = inner;
}

/* 
Insert search bar
*/

function insertSearch(){
   header.innerHTML = 
   `
   <h2>Students</h2>
   <label for="search" class="student-search"> 
      <span>Search by Name</span> 
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;
}

// Call functions
insertSearch();
showPage(displayPerPage)
addPagination(pageAmount(displayPerPage, dataEntries));

/* 
Pagination listener
*/

/* 
Search filter listener
*/