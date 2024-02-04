
// Javascript code for site

/* Toggle between adding and removing the "responsive" class to nav when the user clicks on the icon */
function showMenus() {
    var x = document.getElementById("myTopNav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}