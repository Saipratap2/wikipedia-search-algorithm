let searchInputEL=document.getElementById("searchInput");
let searchResultEl=document.getElementById("searchResults");
let spinnerEl=document.getElementById("spinner")
function createAndAppendResult(result){
    //Creating Result Item
    let resultItemEl=document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultEl.appendChild(resultItemEl);

    //Creating title
    let {link,title,description}=result;
    let titleEl=document.createElement("a");
    titleEl.href=link;
    titleEl.target="_blank";
    titleEl.textContent=title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    //Creating break element
    let titleBreakEl=document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //Creating URL element
    let urlEl=document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href=link;
    urlEl.target="_blank";
    urlEl.textContent=link;
    resultItemEl.appendChild(urlEl);
    
    //Creating break element
    let urlBreakEl=document.createElement("br");
    resultItemEl.appendChild(urlBreakEl);

    //Creating Description element
    let descriptionEl=document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent=description;
    resultItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults){
    spinnerEl.classList.toggle("d-none");
    for(let result of searchResults){
        createAndAppendResult(result);
    }
}

function searchWikipedia(event){
    if(event.key=="Enter"){
        spinnerEl.classList.toggle("d-none");
        searchResultEl.textContent="";
        let searchInputValue=searchInputEL.value;
        let url="https://apis.ccbp.in/wiki-search?search="+searchInputValue;
        let options={
            method:"GET"
        }
        fetch(url,options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            let {search_results}=jsonData;
            displayResults(search_results);
        });
    }
}

searchInputEL.addEventListener("keydown",searchWikipedia);

