var search_bar = document.querySelector(".search-bar");
var search_input = document.querySelector(".search-input");
var search_btn = document.querySelector(".search-btn");

function displayVideos(data){
    const videoDiv = document.getElementById('videos');
    videoDiv.innerHTML =" ";
    data.items.forEach(item => {
        const thumbnails = item.snippet.thumbnails.high.url;
        const title = item.snippet.title;
        const description = item.snippet.description;
        const videoId = item.id.videoId;
        const author = item.snippet.channelTitle;
        const publishedAt = item.snippet.publishTime;
        console.log(item);
        
        // Creating Elements.
        function createTemplate(tagname){
            return document.createElement(tagname);     
        }
        
        let br = createTemplate("br");
        const videoContainer = createTemplate("div");
        const videoElement = createTemplate("img");
        videoElement.setAttribute('class','video-img');
        videoContainer.setAttribute('class','video-style');
    
        const videoDescription = createTemplate("div");
        let des = document.createElement("h2");
        let descriptionInner = document.createElement("p");
        let authorElement = document.createElement("p");
        let publishedElement = document.createElement("p");
        authorElement.innerHTML = author;
        publishedElement.innerHTML = publishedAt;
        descriptionInner.innerHTML = `${description}`;
        descriptionInner.setAttribute('class','video-description');
        des.append(title);
        des.setAttribute('class','video-title');
        des.append(br);
        const anchorTag = document.createElement("a");
        anchorTag.setAttribute("href",`https://www.youtube.com/watch?v=${item.id.videoId}`);
        anchorTag.append(des);

        const http = new XMLHttpRequest();
        http.open("GET", "https://www.googleapis.com/youtube/v3/videos?key=" + api_key + "&id=" + item.id.videoId + "&part=snippet,statistics");
        http.send();
        
        var viewCount = 0;
        http.onload = function () {
            const data = JSON.parse(http.responseText);
            console.log(data.items);
            viewCount = data["items"][0].statistics.viewCount;
            console.log("views count is ", viewCount);
            videoContainer.append(videoElement);
            videoContainer.append(videoDescription);
            videoContainer.style.display = "flex";
            videoElement.setAttribute("src",`${thumbnails}`);
       
            videoDescription.append(anchorTag);
            videoDescription.append(descriptionInner);
            videoDescription.append(authorElement);
            videoDescription.append(publishedElement);
            const views = document.createElement("h5");
            views.innerHTML = "Views " + viewCount;
            videoDescription.append(views);
        }
        
        // return videoContainer;
        videoDiv.append(videoContainer);
    });
    apply_pagination(paginList,data);
}
