const API_KEY = "dd8e80235e830219d9557d89500b038a"
const url = "https://gnews.io/api/v4/search?q="

window.addEventListener("load",() => fetchNews("India"));

function reload(){
    window.location.reload()
}
async function fetchNews(query){
   const res=  await fetch(`${url}${query}&lang=en&country=in&apikey=${API_KEY}`);
   const data = await res.json();
   console.log(data)
   bindData(data.articles)
}
function bindData(articles){
    const cardsContainer = document.getElementById('cards-container')
    const newsCardTemplate = document.getElementById('template-news-card')
    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.image) {
            return;
          }
        const cardClone = newsCardTemplate.content.cloneNode(true)
        fillDataInCard(cardClone,article)
        cardsContainer.appendChild(cardClone)
    });
}
//to add data in templates
function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img')//getElementById and querySelector  are same
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSrc= cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')

    newsImg.src = article.image
    newsTitle.innerHTML = article.title
    newsDesc.innerHTML= article.description
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });
    newsSrc.innerHTML = `${article.source.name} - ${date}`

    //on clicking a news-> to open that page
    cardClone.firstElementChild.addEventListener("click" , () =>{
        window.open(article.url,"_blank")
    })

}
let currSelectedNav = null
//for navigation bars
function onNavItemClick(id){
  fetchNews(id)
  //for making highlight when we click a particular element on navigation bar
  const navItems = document.getElementById(id);
  //if currSelectedNav = null then
  currSelectedNav?.classList.remove("active")
  currSelectedNav = navItems
  currSelectedNav.classList.add("active")
}

//for search bar
const searchButton = document.getElementById('search-button')
const searchText = document.getElementById('seach-text')
searchButton.addEventListener('click',() => {
    const query = searchText.value
    if(!query) return
    fetchNews(query)
    currSelectedNav?.classList.remove("active")
    currSelectedNav = null
})


    
