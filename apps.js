// Load Category Button
const loadCategoryBtn = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => showCategoryBtn(data.categories))
}

const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
        const active = document.getElementById(`btn-${id}`)
        console.log(active)
        removeBg()
        active.classList.add("activebg")
        displayVideos(data.category)
    })
}

const removeBg = () => {
    const categoryBtn = document.getElementsByClassName('categoryBtn')
    for(let el of categoryBtn){
        el.classList.remove('activebg')
    }
}

const showCategoryBtn = (categories) => {
    const categoryBtn = document.getElementById('categoryBtn')
    
    categories.forEach((el)=> {
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
            <button id="btn-${el.category_id}" class="btn categoryBtn" onclick="loadCategoryVideos(${el.category_id})">
                ${el.category}
            </button>
        `
        console.log(btnDiv)
        categoryBtn.append(btnDiv)
    })
}


// Load Videos By API
const loadData=()=>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
}

const displayVideos = (vid) =>{
    const videoAddDiv = document.getElementById('videoAddDiv')
    if(vid.length===0){
        videoAddDiv.innerHTML=`
            <div class="flex justify-center items-center col-span-4 py-[30px]">
                <img src="/assets/Icon.png" alt="">
            </div>
        `
        return    
    }
    
    videoAddDiv.innerHTML=""
    vid.forEach(el=>{
        // console.log(el)
        const singleVid = document.createElement("div")

        singleVid.classList = "flex flex-col gap-3"
        singleVid.innerHTML = `<img class="h-[220px] object-cover rounded-lg" src=${el.thumbnail} alt="">
                <div class="flex gap-3">
                    <img class="w-[50px] h-[50px] object-cover rounded-full" src=${el.authors[0].profile_picture} alt="">
                    <div class="flex flex-col">
                        <h3 class="text-xl font-semibold">${el.title}</h3>
                        <div>
                        <h4 class="text-xl pt-1">${el.authors[0].profile_name} ${el.authors[0].verified ? `<i class="ri-verified-badge-fill"></i>`:``}</i></h4>

                        
                            
                        </div>
                        <h3 class="text-xl">${el.others.views} Views</h3>
                    </div>
                </div>`
        videoAddDiv.append(singleVid)
    })



}

// Search

document.getElementById('searchBox').addEventListener("keyup", (e)=>{
    console.log(e.target.value)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${e.target.value}`)
    .then(res => res.json())
    .then(data => console.data(data))
})


loadCategoryBtn()
loadData()