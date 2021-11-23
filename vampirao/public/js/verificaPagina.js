$(document).ready(function () {
    var pathname = window.location.pathname;
    // console.log(pathname);
    if (pathname == '/login') {
        $('#navbar').hide();
    }
    else if (pathname == '/') {
        $('#navbar').addClass("fixed-top");
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function () {
            var currentScrollPos = window.pageYOffset;
            if (currentScrollPos == 0) {
                document.getElementById("navbar").style.top = "0";
            } else {
                document.getElementById("navbar").style.top = "-50px";
            }
            prevScrollpos = currentScrollPos;
        }

    }
    else {
        $('#navbar').removeClass("fixed-top").addClass("navbarRed");
    }
});