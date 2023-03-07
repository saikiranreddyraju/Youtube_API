// Creating Pagination.

var currentPage = 1;
var paginList = document.getElementById("pagination");
function apply_pagination(paginList, data) {
    paginList.innerHTML = "";
    let prevBtn = document.createElement('button');
    prevBtn.innerText = "Prev";
    prevBtn.setAttribute('id','prev');
    paginList.append(prevBtn);

    prevBtn.addEventListener('click',function(){
        currentPage -= 1;
        console.log("currentPage -->",currentPage);
        generateRecords(data.prevPageToken);
    });

    for(let i=1;i<=10;i++){
        let btn = paginationButton(i,data);
        paginList.append(btn);
    }

    let nextBtn = document.createElement('button');
    nextBtn.innerText = "Next";
    nextBtn.setAttribute('id','next');
    paginList.append(nextBtn);

    nextBtn.addEventListener('click',function(){
        currentPage += 1;
        console.log("currentPage -->",currentPage);
        generateRecords(data.nextPageToken);
    });
}

function paginationButton(page,data){
    let button = document.createElement('button');
    button.innerText = page;

    button.setAttribute('class','button');
    if(currentPage == page){
        button.classList.add('active');
    }

    button.addEventListener('click',function(){
        currentPage = page;
        generateRecords(data.nextPageToken);
        let current_btn = document.querySelector('.pagenumbers button.active');
        current_btn.classList.remove('active');
        
        button.classList.add('active');
    });
    return button;
}

function generateRecords(pageToken){
    // console.log('first-generateRecords');
    var url="https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults="
                +maxResults+"&q="+search_input.value+"&type=video&key="+api_key+"&pageToken="+pageToken;
    
    fetch(url)
    .then(function(response) { 
        return response.json();
    })
    .then(function(data) {
        // console.log("generateRecords  ",data);
        return displayVideos(data);
    });
}