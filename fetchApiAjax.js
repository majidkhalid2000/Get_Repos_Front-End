// Main Variables

let theInput = document.querySelector(".reposContainer .reposInput");
let getButton = document.querySelector(".reposContainer .reposButton");
let reposData = document.querySelector(".reposContainer .showData");

getButton.onclick = function() {
    getRepos(theInput.value);
}
function getRepos() {
    if(theInput.value === "") {
        reposData.innerHTML = "<span> Please Write Github Username.</span>";
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)

    .then((response) => response.json())

    .then((repositories) => {
        
        reposData.innerHTML = "";
        repositories.forEach(repo => {

            // create The Main Div
            let mainDiv = document.createElement("div");
            
            // Append Repo Name Text
            let repoName = document.createTextNode(repo.name);

            // Append The Text To The Main Div
            mainDiv.appendChild(repoName);

            // Create Repo URL Anchor Tag
            let theUrl = document.createElement("a");

            // Create Repo URL Text
            let theUrlText = document.createTextNode("Visit");

            // Append The Repo URL Text To Anchor Tag
            theUrl.appendChild(theUrlText);

            // Add The Hypertext Reference 
            theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

            // Set Attribute Blank 
            theUrl.setAttribute("target", "_blank");

            //Append URL Anchor To Main Div
            mainDiv.appendChild(theUrl);

            // Create Stars Count Span
            let starsSpan = document.createElement("span");

            // Create The Stars Count Text
            let strasText = document.createTextNode(`Stars ${repo.stargazers_count}`);

            // Add Stars Count Text To Stars Span
            starsSpan.appendChild(strasText);

            // Append Stars Countn Span To Main Div
            mainDiv.appendChild(starsSpan);

            // Add Class On Main Div 
            mainDiv.className = "repoBox";

            // Append The Main Div To Container
            reposData.appendChild(mainDiv);
        });
        }); 
    }
}
function getHttpRequest(apiLink) {
        return new Promise((resolve, reject) => {
        let myRepos = new XMLHttpRequest();
        myRepos.onload = function () {
        if(this.readyState == 4 && this.status == 200) {
            resolve(JSON.parse(this.responseText))
        } else {
            reject(Error("No Data is Found"));
        } 
        };      
        myRepos.open("GET", apiLink);
        myRepos.send();
        });
}