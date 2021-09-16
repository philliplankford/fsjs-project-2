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

let pageTracker = 1;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function pageAmount(displayPer, totalEntries) {
   const num = Math.ceil(totalEntries / displayPer);
   return num;
}

function showPage(dataList, pageTracker){
   if (dataList.length === 0) {
      studentList.innerHTML = "<p>No Results Found</p>";
   } else {
      const startIndex = (pageTracker * displayPerPage) - displayPerPage;
      const endIndex = pageTracker * displayPerPage;
      let inner = "";
      for (let i=0; i < dataList.length; i++) {
         if (i >= startIndex && i < endIndex){
            inner +=
            `
            <li class="student-item cf">
               <div class="student-details">
               <img class="avatar" src=${dataList[i].picture.thumbnail} alt="Profile Picture">
               <h3>${dataList[i].name.first} ${dataList[i].name.last}</h3>
               <span class="email">${dataList[i].email}</span>
               </div>
               <div class="joined-details">
               <span class="date">Joined ${dataList[i].registered.date}</span>
               </div>
            </li>
            `;
         }
      }
      studentList.innerHTML = inner;
   }
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
      <button type="button" id="search_button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;
}

// Call functions
insertSearch();
showPage(data, pageTracker)
addPagination(pageAmount(displayPerPage, dataEntries));

/* 
Pagination listener
*/
pagination.addEventListener("click", (e) => {
   if (e.target.tagName === "BUTTON") {
      const prevActive = document.querySelector(".active");
      prevActive.classList = "";
      e.target.classList = "active";
      pageTracker = parseInt(e.target.textContent);
      showPage(data, pageTracker);
   }
});

/* 
Search filter listener
*/
const searchBar = document.getElementById("search");
const searchButton = document.getElementById("search_button");

function searchName(database) {
   const input = searchBar.value.toLowerCase();
   let newData = [];
   for ( i = 0; i < database.length; i++ ) {
      const name = database[i].name.first + database[i].name.last;
      if ( name.toLowerCase().includes(input) ) {
         newData.push(database[i]);
      }
   }
   pageTracker = 1; // reset the page tracker
   showPage(newData, pageTracker);
   addPagination(pageAmount(displayPerPage, newData.length))
}

searchBar.addEventListener( "keyup", (e) => {
   if (e.key === "Enter") {
      searchName(data);
   }    
} );

searchButton.addEventListener( "click", () => {
   searchName(data);
})

// a function that returns a new database 