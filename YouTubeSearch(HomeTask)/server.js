// const api_key = "AIzaSyC5kvxuhyuLX5No7WCurPoeVimBhtTRTok";
const api_key = "AIzaSyC5PFdTdM9eWM1LXMpCMB-Dfw-L4RrS8RU";
// const api_key = "AIzaSyDNJHJEGmXzKy6Ax6r1vsWpPbc1x5_7xp8";  
const maxResults = 15;

// Creating a Server.
search_btn.addEventListener("click", function() {
    search_input.focus();

    const xhttp = new XMLHttpRequest();
    if(search_input.value){
        xhttp.open("GET", "https://www.googleapis.com/youtube/v3/search?key=" + api_key + "&type=video&part=snippet&maxResults=" + maxResults + `&q=${search_input.value}`);
        xhttp.send();
        xhttp.onload = function(){
            var data = JSON.parse(xhttp.responseText);
            displayVideos(data); 
        }
    }
    else{
        data.innerHTML = "Inavlid Request";
    }
});