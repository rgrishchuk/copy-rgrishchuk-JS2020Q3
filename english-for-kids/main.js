(()=>{"use strict";class t{constructor(t){this.element=document.querySelector(".burger-menu"),this.icon=document.querySelector(".burger"),this.overlay=document.querySelector(".blackout"),this.items=[];const e=document.querySelector(".mainPage");this.items.push(e),this.activeItem=null;const i=document.querySelector(".burger-menu__list");Object.keys(t).forEach((t=>{const e=document.createElement("li");e.innerHTML=t,e.dataset.menuAction=t.toLowerCase(),this.items.push(e),i.appendChild(e)}));const s=document.createElement("li");s.classList.add("statisticsPage"),s.dataset.menuAction="statistics",s.innerHTML="Statistics",this.items.push(s),i.appendChild(s)}show(){this.overlay.classList.toggle("active"),this.icon.classList.toggle("active"),this.element.classList.toggle("active")}isActive(){return this.element.className.includes("active")}findMenuItem(t){for(let e=0;e<this.items.length;e+=1)if(this.items[e].innerHTML===t)return this.items[e];return null}changeActiveItem(t){this.activeItem&&this.activeItem.classList.remove("active"),this.activeItem=this.findMenuItem(t),this.activeItem&&this.activeItem.classList.add("active")}}class e{constructor(t,e){this.card=document.createElement("div"),this.card.classList.add("card");const i=new Image;i.src=e,this.card.appendChild(i);const s=document.createElement("div");s.classList.add("card__container");const a=document.createElement("h4");a.innerHTML=t,s.appendChild(a),this.card.appendChild(s)}getElement(){return this.card}}class i{constructor(t,e,i,s){this.card=document.createElement("div"),this.card.classList.add("flip-card"),s||this.card.classList.add("play");const a=document.createElement("div");a.classList.add("front","card");let r=document.createElement("div");r.classList.add("image__container"),r.style.backgroundImage=`url(${i})`,a.appendChild(r),this.card.appendChild(a);let n=document.createElement("div");n.classList.add("card__container");let o=document.createElement("h4");o.innerHTML=t,n.appendChild(o);const c=document.createElement("i");c.classList.add("material-icons","icon-loop"),c.innerHTML="loop",n.appendChild(c),a.appendChild(n);const d=document.createElement("div");d.classList.add("back","card"),r=document.createElement("div"),r.classList.add("image__container"),r.style.backgroundImage=`url(${i})`,d.appendChild(r),n=document.createElement("div"),n.classList.add("card__container"),o=document.createElement("h4"),o.innerHTML=e,n.appendChild(o),d.appendChild(n),d.classList.add("back"),this.card.appendChild(d),c.addEventListener("click",(t=>{t.stopPropagation(),t.target.closest(".flip-card").classList.add("flipH")})),this.card.addEventListener("mouseleave",(t=>{t.target.closest(".flip-card").classList.remove("flipH")}));const l=document.createElement("div");l.classList.add("overlay"),this.card.appendChild(l)}getElement(){return this.card}}const s={"Action (set A)":{words:[{word:"cry",translation:"плакать",image:"cry.jpg",audioSrc:"cry.mp3"},{word:"dance",translation:"танцевать",image:"dance.jpg",audioSrc:"dance.mp3"},{word:"dive",translation:"нырять",image:"dive.jpg",audioSrc:"dive.mp3"},{word:"draw",translation:"рисовать",image:"draw.jpg",audioSrc:"draw.mp3"},{word:"fish",translation:"ловить рыбу",image:"fish.jpg",audioSrc:"fish.mp3"},{word:"fly",translation:"летать",image:"fly.jpg",audioSrc:"fly.mp3"},{word:"hug",translation:"обнимать",image:"hug.jpg",audioSrc:"hug.mp3"},{word:"jump",translation:"прыгать",image:"jump.jpg",audioSrc:"jump.mp3"}]},"Action (set B)":{words:[{word:"open",translation:"открывать",image:"open.jpg",audioSrc:"open.mp3"},{word:"play",translation:"играть",image:"play.jpg",audioSrc:"play.mp3"},{word:"point",translation:"указывать",image:"point.jpg",audioSrc:"point.mp3"},{word:"ride",translation:"ездить",image:"ride.jpg",audioSrc:"ride.mp3"},{word:"run",translation:"бегать",image:"run.jpg",audioSrc:"run.mp3"},{word:"sing",translation:"петь",image:"sing.jpg",audioSrc:"sing.mp3"},{word:"skip",translation:"пропускать, прыгать",image:"skip.jpg",audioSrc:"skip.mp3"},{word:"swim",translation:"плавать",image:"swim.jpg",audioSrc:"swim.mp3"}]},"Action (set C)":{words:[{word:"read",translation:"читать",image:"read.jpg",audioSrc:"read.mp3"},{word:"write",translation:"писать",image:"write.jpg",audioSrc:"write.mp3"},{word:"drive",translation:"водить",image:"drive.jpg",audioSrc:"drive.mp3"},{word:"drink",translation:"пить",image:"drink.jpg",audioSrc:"drink.mp3"},{word:"eat",translation:"есть",image:"eat.jpg",audioSrc:"run.mp3"},{word:"shoot",translation:"стрелять",image:"shoot.jpg",audioSrc:"sing.mp3"},{word:"kiss",translation:"целовать",image:"kiss.jpg",audioSrc:"kiss.mp3"},{word:"throw",translation:"бросать",image:"throw.jpg",audioSrc:"throw.mp3"}]},Adjective:{words:[{word:"small",translation:"маленький",image:"small.jpg",audioSrc:"small.mp3"},{word:"tall",translation:"высокий",image:"tall.jpg",audioSrc:"tall.mp3"},{word:"clever",translation:"умный",image:"clever.jpg",audioSrc:"clever.mp3"},{word:"heavy",translation:"тяжелый",image:"heavy.jpg",audioSrc:"heavy.mp3"},{word:"cold",translation:"холодный",image:"cold.jpg",audioSrc:"cold.mp3"},{word:"warm",translation:"тёплый",image:"warm.jpg",audioSrc:"warm.mp3"},{word:"friendly",translation:"дружелюбный",image:"friendly.jpg",audioSrc:"friendly.mp3"},{word:"messy",translation:"грязный",image:"messy.jpg",audioSrc:"swim.mp3"}]},"Animal (set A)":{words:[{word:"cat",translation:"кот",image:"cat.jpg",audioSrc:"cat.mp3"},{word:"chick",translation:"цыплёнок",image:"chick.jpg",audioSrc:"chick.mp3"},{word:"chicken",translation:"курица",image:"chicken.jpg",audioSrc:"chicken.mp3"},{word:"dog",translation:"собака",image:"dog.jpg",audioSrc:"dog.mp3"},{word:"horse",translation:"лошадь",image:"horse.jpg",audioSrc:"horse.mp3"},{word:"pig",translation:"свинья",image:"pig.jpg",audioSrc:"pig.mp3"},{word:"rabbit",translation:"кролик",image:"rabbit.jpg",audioSrc:"rabbit.mp3"},{word:"sheep",translation:"овца",image:"sheep.jpg",audioSrc:"sheep.mp3"}]},"Animal (set B)":{words:[{word:"bird",translation:"птица",image:"bird.jpg",audioSrc:"bird.mp3"},{word:"fish",translation:"рыба",image:"fish1.jpg",audioSrc:"fish.mp3"},{word:"frog",translation:"жаба",image:"frog.jpg",audioSrc:"frog.mp3"},{word:"giraffe",translation:"жирафа",image:"giraffe.jpg",audioSrc:"giraffe.mp3"},{word:"lion",translation:"лев",image:"lion.jpg",audioSrc:"lion.mp3"},{word:"mouse",translation:"мышь",image:"mouse.jpg",audioSrc:"mouse.mp3"},{word:"turtle",translation:"черепаха",image:"turtle.jpg",audioSrc:"turtle.mp3"},{word:"dolphin",translation:"дельфин",image:"dolphin.jpg",audioSrc:"dolphin.mp3"}]},Clothes:{words:[{word:"skirt",translation:"юбка",image:"skirt.jpg",audioSrc:"skirt.mp3"},{word:"pants",translation:"брюки",image:"pants.jpg",audioSrc:"pants.mp3"},{word:"blouse",translation:"блузка",image:"blouse.jpg",audioSrc:"blouse.mp3"},{word:"dress",translation:"платье",image:"dress.jpg",audioSrc:"dress.mp3"},{word:"boot",translation:"ботинок",image:"boot.jpg",audioSrc:"boot.mp3"},{word:"shirt",translation:"рубашка",image:"shirt.jpg",audioSrc:"shirt.mp3"},{word:"coat",translation:"пальто",image:"coat.jpg",audioSrc:"coat.mp3"},{word:"shoe",translation:"туфли",image:"shoe.jpg",audioSrc:"shoe.mp3"}]},Emotion:{words:[{word:"sad",translation:"грустный",image:"sad.jpg",audioSrc:"sad.mp3"},{word:"angry",translation:"сердитый",image:"angry.jpg",audioSrc:"angry.mp3"},{word:"happy",translation:"счастливый",image:"happy.jpg",audioSrc:"happy.mp3"},{word:"tired",translation:"уставший",image:"tired.jpg",audioSrc:"tired.mp3"},{word:"surprised",translation:"удивлённый",image:"surprised.jpg",audioSrc:"surprised.mp3"},{word:"scared",translation:"испуганный",image:"scared.jpg",audioSrc:"scared.mp3"},{word:"smile",translation:"улыбка",image:"smile.jpg",audioSrc:"smile.mp3"},{word:"laugh",translation:"смех",image:"laugh.jpg",audioSrc:"laugh.mp3"}]}};function a(t,e,i){const s=t.querySelector(".game-button__icon"),a=t.querySelector(".game-button__text");s.innerHTML=e,a.innerHTML=i}function r(){document.querySelector(".home").classList.add("active")}function n(t){const e=document.querySelector(".voice");e.src=`assets/audio/${t}.mp3`,e.play()}function o(t,e="center",i=!0){const s=document.querySelector(".game-status");s.className="game-status",s.classList.add(e),i&&(s.innerHTML=""),s.appendChild(t)}function c(t){const e=document.createElement("i");e.classList.add("material-icons"),e.innerHTML=t?"star":"star_border",o(e,"right",!1)}function d(t){const e=new Image;return e.classList.add("material-icons","smile"),e.src=`assets/images/${t}`,e}function l(t,e){window.localStorage.setItem(t,JSON.stringify(e))}function h(t){const e=document.createElement("tr");return e.innerHTML=`<td>${t.word}</td><td>${t.translation}</td><td>${t.category}</td>`,e.innerHTML+=`<td>${t.clicks}</td><td>${t.right}</td><td>${t.wrong}</td><td>${t.percent}</td>`,e}class m{constructor(t){this.thead=[["Word","word"],["Translation","translation"],["Category","category"],["Clicks","clicks"],["Right","right"],["Wrong","wrong"],["Correct %","percent"]],this.data=("statistics",JSON.parse(window.localStorage.getItem("statistics"))),this.data||(this.data=[],Object.keys(t).forEach((e=>{t[e].words.forEach((t=>{this.data.push({category:e,word:t.word,translation:t.translation,clicks:0,right:0,wrong:0,percent:0,image:t.image,audioSrc:t.audioSrc})}))})),l("statistics",this.data))}setData(t,e,i){const s=this.data.findIndex((e=>e.word===t));-1!==s&&(this.data[s].clicks+=1,i?this.data[s].right+=1:this.data[s].wrong+=1,this.data[s].percent=Math.ceil(100*this.data[s].right/this.data[s].clicks)),l("statistics",this.data)}clear(){this.data.forEach((t=>{const e=t;e.clicks=0,e.right=0,e.wrong=0,e.percent=0})),l("statistics",this.data),Array.from(this.table.rows).slice(1).forEach((t=>{const e=t;for(let t=3;t<=6;t+=1)e.cells[t].innerHTML="0"}))}sortTable(t){if(t.classList.contains("sort")){const t=this.table.querySelector(".sort");t.classList.contains("asc")?(t.classList.remove("asc"),t.classList.add("desc")):(t.classList.remove("desc"),t.classList.add("asc")),this.data.reverse()}else{const e=this.table.querySelector(".sort");e.classList.remove("sort"),e.classList.remove("asc"),e.classList.remove("desc"),t.classList.add("sort","asc"),this.data.sort(((e,i)=>e[t.dataset.field]>i[t.dataset.field]?1:-1))}for(let t=1;t<this.table.rows.length;)this.table.deleteRow(t);const e=[];this.data.forEach((t=>{e.push(h(t))})),this.table.tBodies[0].append(...e)}createTable(){this.table=document.createElement("table"),this.table.classList.add("statistics-table");const t=document.createElement("tbody");this.table.appendChild(t);let e=document.createElement("tr");this.thead.forEach((([t,i])=>{const s=document.createElement("th");s.innerHTML=t,s.dataset.field=i,"Word"===t&&s.classList.add("sort","asc"),s.addEventListener("click",(t=>{this.sortTable(t.target)})),e.appendChild(s)})),t.appendChild(e),this.data.sort(((t,e)=>t.word===e.word?0:t.word>e.word?1:-1)),this.data.forEach((i=>{e=h(i),t.appendChild(e)}))}}const u="Main",g="Statistics";(new class{constructor(){this.isTrain=!0,this.main=document.querySelector(".main .wrapper .main__container"),this.categories=s,this.burgerMenu=new t(this.categories),this.cardsArr=[],this.gameButton=function(){const t=document.createElement("div");t.classList.add("game-button");const e=document.createElement("i");e.classList.add("material-icons","game-button__icon");const i=document.createElement("span");return i.classList.add("game-button__text"),t.appendChild(e),t.appendChild(i),t}(),this.errors=0,this.success=0,this.gameStart=!1,this.playSound=!1;const e=[];Object.keys(s).forEach((t=>{s[t].words.forEach((t=>{e.push(t.image)}))})),e.push("smile.png"),e.push("smile-sad.png"),this.wordsRandArr=[],this.startGame=this.startGame.bind(this),this.talk=this.talk.bind(this),this.nextWord=this.nextWord.bind(this),this.toMain=this.toMain.bind(this),this.successSound=document.querySelector(".success"),this.errorSound=document.querySelector(".error"),this.winSound=document.querySelector(".win"),this.loseSound=document.querySelector(".lose"),this.statistics=new m(this.categories)}setListeners(){this.burgerMenu.items.forEach((t=>{"main"===t.dataset.menuAction?t.addEventListener("click",(()=>{this.showMain()})):"statistics"===t.dataset.menuAction?t.addEventListener("click",(()=>{r(),this.showStatistics()})):t.addEventListener("click",(t=>{const e=t.target.innerHTML;e!==this.activeMenu&&this.showCategory(e),this.burgerMenu.isActive()&&this.burgerMenu.show()}))})),this.burgerMenu.icon.addEventListener("click",(()=>{this.playSound||this.burgerMenu.show()})),this.burgerMenu.overlay.addEventListener("click",(()=>{this.burgerMenu.show()})),document.querySelector(".home").addEventListener("click",(()=>{this.playSound||this.showMain()})),document.querySelector(".switch-button input").addEventListener("change",(()=>{this.playSound||(this.isTrain=!this.isTrain,document.querySelector(".switch-button").classList.toggle("game"),this.clearGame())}))}start(){this.showMain(),this.setListeners()}clearMain(){for(;this.main.lastElementChild;)this.main.removeChild(this.main.lastElementChild)}activeMenu(){return this.burgerMenu.activeItem?this.burgerMenu.activeItem.innerHTML:null}showMain(){this.activeMenu()!==u&&(this.clearGame(),document.querySelector(".home").classList.remove("active"),this.burgerMenu.changeActiveItem(u),this.clearMain(),delete this.categories.Difficult,Object.keys(this.categories).forEach((t=>{const i=`assets/images/${this.categories[t].words[0].image}`,s=new e(t,i);s.getElement().addEventListener("click",(()=>{this.showCategory(t)})),this.main.appendChild(s.getElement())}))),this.burgerMenu.isActive()&&this.burgerMenu.show()}nextWord(){this.playSound=!1,this.successSound.removeEventListener("ended",this.nextWord),this.wordsRandArr.length>0?(this.currWord=this.wordsRandArr.pop(),n(this.currWord.word)):this.endGame()}toMain(){setTimeout((()=>{this.playSound=!1,document.querySelector(".checkbox").disabled=!1,this.showMain()}),3e3),this.winSound.removeEventListener("ended",this.toMain),this.loseSound.removeEventListener("ended",this.toMain)}endGame(){if(document.querySelector(".checkbox").disabled=!0,this.playSound=!0,this.clearMain(),this.errors>0){const t=document.createElement("span");t.innerHTML=`ERRORS: ${this.errors}`,o(t),this.loseSound.addEventListener("ended",this.toMain),this.loseSound.play(),this.main.appendChild(d("smile-sad.png"))}else this.winSound.addEventListener("ended",this.toMain),this.winSound.play(),this.main.appendChild(d("smile.png"))}categoryListener(t){if(this.isTrain)n(t.target.closest(".front").querySelector("h4").innerHTML);else if(this.gameStart&&!this.playSound){const e=t.target.closest(".flip-card").querySelector(".overlay");this.currWord.word===t.target.closest(".front").querySelector("h4").innerHTML?(c(!0),this.success+=1,this.statistics.setData(this.currWord.word,this.activeMenu(),!0),e.classList.add("active"),this.successSound.addEventListener("ended",this.nextWord,!1),this.playSound=!0,this.successSound.play()):(c(!1),this.statistics.setData(this.currWord.word,this.activeMenu(),!1),this.errors+=1,this.errorSound.play())}}showCategory(t){t!==this.activeMenu()&&(this.clearGame(),this.cardsArr.length=0,r(),this.burgerMenu.changeActiveItem(t),this.clearMain(),this.categories[t].words.forEach((t=>{const e=`assets/images/${t.image}`,s=new i(t.word,t.translation,e,this.isTrain);this.cardsArr.push(s.getElement()),this.main.appendChild(s.getElement()),s.getElement().querySelector(".front").addEventListener("click",(t=>{this.categoryListener(t)}))})),this.main.appendChild(this.gameButton)),this.burgerMenu.isActive()&&this.burgerMenu.show()}clearGame(){document.querySelector(".game-status").innerHTML="",this.errors=0,this.success=0,this.gameStart=!1,a(this.gameButton,"play_circle_filled","Start GAME"),this.gameButton.removeEventListener("click",this.startGame),this.gameButton.removeEventListener("click",this.talk),this.gameButton.addEventListener("click",this.startGame),this.cardsArr.forEach((t=>{t.querySelector(".overlay").classList.remove("active")})),this.isTrain?(this.cardsArr.forEach((t=>{t.classList.remove("play")})),this.gameButton.classList.remove("active")):(this.cardsArr.forEach((t=>{t.classList.add("play")})),this.gameButton.classList.add("active"))}startGame(){this.gameStart=!0,a(this.gameButton,"replay","Repeat"),this.wordsRandArr.length=0;const t=this.activeMenu()??"Difficult";this.categories[t].words.forEach((t=>{this.wordsRandArr.push(t)})),function(t){for(let e=t.length-1;e>0;e-=1){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}}(this.wordsRandArr),this.currWord=this.wordsRandArr.pop(),this.errors=0,this.success=0,this.gameButton.removeEventListener("click",this.startGame),n(this.currWord.word),this.gameButton.addEventListener("click",this.talk)}talk(){n(this.currWord.word)}showDifficultWords(){const t=this.statistics.data.filter((t=>t.clicks>0&&t.percent<100));t.sort(((t,e)=>t.percent>e.percent?1:-1)),delete this.categories.Difficult,this.categories.Difficult={words:[]};for(let e=0;e<8&&e<t.length;e+=1)this.categories.Difficult.words.push(t[e]);if(t.length>0)this.showCategory("Difficult");else{const t=document.createElement("span");t.innerHTML="No difficult words",o(t)}}showStatistics(){if(this.activeMenu()!==g){this.burgerMenu.changeActiveItem(g),this.clearGame(),this.clearMain();const t=function(){const t=document.createElement("div");t.classList.add("statistics-buttons");const e=document.createElement("button");e.classList.add("statistics-buttons__reset"),e.innerHTML="Reset";const i=document.createElement("button");return i.classList.add("statistics-buttons__difficult"),i.innerHTML="Repeat difficult words",t.appendChild(i),t.appendChild(e),t}();this.main.appendChild(t),t.querySelector(".statistics-buttons__reset").addEventListener("click",(()=>{this.statistics.clear()})),t.querySelector(".statistics-buttons__difficult").addEventListener("click",(()=>{this.showDifficultWords()})),this.statistics.createTable(),this.main.appendChild(this.statistics.table)}this.burgerMenu.isActive()&&this.burgerMenu.show()}}).start()})();