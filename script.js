const playBtn=document.querySelector('.main-button')
const nextBtn=document.querySelector('#next')
const previousBtn=document.querySelector('#prev')
const audio=document.querySelector('audio')
const progressContainer=document.querySelector('.progress-container')
const progress=document.querySelector('.progress')
const durationTime=document.querySelector('#duration')
const currenttime=document.querySelector('#current-time')
const songCover=document.querySelector('img')
const songName=document.querySelector("#song-name")
const artistName=document.querySelector("#song-artist")
let isPlaying=false

const songs=[
    {
        cover:'https://mupo.ir/StaticFiles/Albums/fullSize/748190380404300765.jpg',
        title:'Without Me',
        artist:'Halsey',
        src:'https://files.musicfeed.ir/2019/09/Without-Me-Halsey-128.mp3',
        id:0,
  
    },
    {
        cover:'https://lyrichub.ir/wp-content/uploads/2022/06/iamnotshane-Maybe-My-Soulmate-Died.jpg',
        title:'Maybe My Soulmate Died',
        artist:'Iamnotshane',
        src:'https://files.musicfeed.ir/2022/03/iamnotshane_maybe_my%20soulmate%20died%20128.mp3',
        id:1,
        
    },
    {
        cover:'https://ahaang.com/wp-content/uploads/2021/06/Ed-Sheeran-Bad-Habits.jpg',
        title:'Bad Habits',
        artist:'Ed Sheeran',
        src:'https://dl.behmelody.in/1400/Tir/Ed%20Sheeran%20-%20Bad%20Habits%20%282%29.mp3',
        id:2,
        
    },
    {
        cover:'https://ts9.tarafdari.com/contents/user698141/content-sound/dua_lipa.jpg',
        title:'Levitating',
        artist:'Dua Lipa',
        src:'https://dl.nab-music.com/dls/2021/06/30/Dua_Lipa_Levitating_128.mp3',
        id:3,
        
    }
]

function playSong(){
    isPlaying=true
    audio.play()
    playBtn.classList.replace('fa-play' , 'fa-pause')
    playBtn.setAttribute('title','pause')
}

function pauseSong(){
    isPlaying=false
    audio.pause()
    playBtn.classList.replace('fa-pause' , 'fa-play')
    playBtn.setAttribute('title','play')
    
}


function nextSong(){

    const currentSongNumber=Number(audio.dataset.number)

    let nextSongNumber=0

    currentSongNumber !==(songs.length-1) ? (nextSongNumber=currentSongNumber+1) : false

    audio.src=songs[nextSongNumber].src

    playSong()

    UI.set(songs[nextSongNumber])


    audio.dataset.number=nextSongNumber


}

function previousSong(){

    const currentSongNumber=Number(audio.dataset.number)

    let nextSongNumber=3

    currentSongNumber !==0 ? (nextSongNumber=currentSongNumber-1) : false

    audio.src=songs[nextSongNumber].src

    playSong()
    
    UI.set(songs[nextSongNumber])

    audio.dataset.number=nextSongNumber

}

class UI{
    

    static set(song){

        songName.textContent=song.title
        artistName.textContent=song.artist
        songCover.src=song.cover
        
    }

    static updateProgress(e){

        const {duration,currentTime}=e.srcElement
        
        const progressPercent=((currentTime/duration)*100)

        progress.style.width=`${progressPercent}%`

        const durationMinutes=Math.floor(duration/60)

        let durationSeconeds=Math.floor(duration%60)

        if(durationSeconeds < 10){

            durationSeconeds=`0${durationSeconeds}`
        }

        if(durationSeconeds){
            durationTime.textContent=`${durationMinutes}:${durationSeconeds}`
        }
        
        
    
        const currentMinutes=Math.floor(currentTime/60)

        let currentSeconeds=Math.floor(currentTime%60)

        if(currentSeconeds < 10){

            currentSeconeds=`0${currentSeconeds}`
        }
        
        currenttime.textContent=`${currentMinutes}:${currentSeconeds}`


    }
}



function setProgressBar(e){

    const newCurr=e.offsetX/this.clientWidth

    const{duration}=audio

    audio.currentTime=newCurr*duration
    
}

progressContainer.addEventListener('click',setProgressBar)

audio.addEventListener('timeupdate',UI.updateProgress)

audio.addEventListener('ended',()=>nextSong())

nextBtn.addEventListener('click',()=>nextSong())

previousBtn.addEventListener('click',()=>previousSong())

playBtn.addEventListener('click',()=>(isPlaying ? pauseSong(): playSong()))