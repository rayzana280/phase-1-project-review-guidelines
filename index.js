
const click = document.getElementById('button')//click event 
const divList = document.getElementById('divforList')//use in click event 
let arrayData // varibale used in fetch 


const counter = document.getElementById('counter')
let count = 60
let timer;


const loader = document.getElementById('preloader')

// using this function on dom event 
function counting() {
    if (count > 0) {
        count -= 1
        counter.textContent = count
    } else {
        //stop the intverval from running 
        clearInterval(timer)
        alert('Classified Information! Press space bar for 3 more cat facts!')
    }

}

// array.map().filter().join(' ').toUppercase();
// wait until dom is loaded run this callback 
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://catfact.ninja/facts')
    // Promise.then()
    //fetch returns promise runs first .then if resolved.
        .then(respond => respond.json())
        //.json runs second .then if promise is resolved 
        .then(data => {
            //add loading screen and disable once .then get the promise back
            arrayData = data.data
            loader.style.display = 'none';
            timer = setInterval(counting, 1000)
            //only runs if second promise is resolve 
        })
})

//only give 7 facts 
//event listner for button 
click.addEventListener('click', () => {
    //search for li
    const arrayLi = document.querySelectorAll('li')
    if (arrayLi.length !== 7) {
        const newListItem = document.createElement('li')
        divList.append(newListItem)
        //getting a fact from array(arraydata)
        newListItem.textContent = arrayData[arrayLi.length]['fact']
    } else {
        //create an alert boxing saying no more jokes 
        alert('SORRY NO MORE FACTS FOR TODAY!')

    }
})


//connceted with counter 
document.addEventListener('keypress', () => {
    //grabbing all the item that is greater then 6 inside the arrayData
    const newArrayData = arrayData.filter((_element, index) => {
        return index > 6
    })
    if (count === 0) {
        for (let i = 0; i < newArrayData.length; i++) {
            const newlist = document.createElement('li')
            divList.append(newlist)
            newlist.textContent = newArrayData[i]['fact']
        }
    }
})
// organize everything
