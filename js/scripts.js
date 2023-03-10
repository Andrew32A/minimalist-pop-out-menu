const menuParent = document.querySelector(".menuParent")
const itemArray = document.querySelectorAll(".item") // item is an array when getting it by query selector all

let menuCounter = 0

// helper function to calculate width based on num of items
function widthCalculator() {
    // takes length of array, adds 1 for menuParent, then times it by 73px which was from the original value (365px / 5)
    let width = `${((itemArray.length + 1) * 73)}px`
    return width
}

// opens menu
function openMenu() {
    anime({
        targets: "#menu",
        backgroundColor: "#151a21",
        width: widthCalculator(),
        easing: "easeInOutQuad"
    })

    for (let i = 0; i < itemArray.length; i++) {
        anime ({
            targets: itemArray[i],
            translateX: (60 * (i + 1)),
            opacity: 2,
            easing: "easeInOutQuad"
            // i really wanted to use stagger to handle each item element, but it's only available on the latest version of anime.js which i couldn't get to work right now
            // instead, i used a for loop to handle each element
            // delay: anime.stagger(100)
        })

        itemArray[i].style.visibility = "visible"
    }
}

// closes menu
function closeMenu() {
    anime({
        targets: "#menu",
        backgroundColor: "#1b2028",
        width: "125px",
        easing: "easeOutQuint"
    })

    for (let i = 0; i < itemArray.length; i++) {
        anime ({
            targets: itemArray[i],
            translateX: 0,
            opacity: -2 // had to set opacity to -2 to avoid weird stutter from bounceback effect in anime.js
        })

        itemArray[i].style.visibility = "hidden"
    }
}

// counts the num of times the user clicked on menu and handles menu behaviour as needed
function menuToggle() {
    menuCounter++
    if (menuCounter % 2 === 0) {
        closeMenu()
    }
    else {
        openMenu()
    }
}

// activates menu functionality, remove this to disable menu
menuParent.addEventListener("click", menuToggle)

// changes menu parent value depending on which item was clicked
function menuChange(item) {
    console.log(item)
    for (i = 0; i < itemArray.length; i++) {
        if (item.id === itemArray[i].id) {
            menuParent.innerHTML = itemArray[i].innerHTML
        }
    }
    
    menuCounter++
    closeMenu()
}