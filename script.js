
let currentsong = new Audio();
async function getsongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response  = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        
        if(element.href.endsWith(".mp3"))
        {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

const playmusic = (track)=>{
    currentsong.src = "/songs/" + track
    currentsong.play()
}

async function main() {
    let currentsong;
    let songs = await getsongs();
    console.log(songs)

    let songol = document.querySelector(".list").getElementsByTagName("ol")[0]
    for (const song of songs) {
        songol.innerHTML = songol.innerHTML + `<li> 
        

        <img class="invert" style="width: 10%; margin-left: 7%;" src="music-svgrepo-com.svg" alt="">
                            <div class="info" >
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>artistname</div>
                            </div>
                            <img class="invert" style="width: 15%;" src="play-circle-svgrepo-com.svg" alt="">
        
        
        
        </li>`
    }
    
    Array.from(document.querySelector(".list").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
    
    

   
}

main()