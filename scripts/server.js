// Creating a Server.

search_btn.addEventListener("click", function() {
    search_input.focus();

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var data = JSON.parse(xhttp.responseText);
        displayVideos(data); 
    }
    if(search_input.value){
        xhttp.open("GET", "https://www.googleapis.com/youtube/v3/search?key=" + api_key + "&type=video&part=snippet&maxResults=" + maxResults + `&q=${search_input.value}`);
        xhttp.send();
    }
    else{
        data.innerHTML = "Inavlid Request";
    }
});