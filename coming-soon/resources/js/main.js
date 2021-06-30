let form = document.getElementsByClassName('form')
let message = document.getElementsByClassName('hiddenMessage')

const send = async () => {
    let email = document.getElementById('email').value
    var pattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (!email || !pattern.test(email)) {
        console.log('invalid');
        return document.getElementById('errorMessage').style.display = "block"
    }
    document.getElementById('loading').style.display = 'block'
    // $(".loading").show();

    let res = await fetch("https://api.techfestsliet.com/api/user/notify", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ email: email })
    })

    document.getElementById('loading').style.display = 'none'
    document.getElementById('errorMessage').style.display = "none"


    let data = await res.json()



    if (data.statusCode == 200) {
        // popupOpenClose($(".popup"));
        form[0].style.display = 'none'
        message[0].innerHTML = '<input  type="submit" onClick="showForm()" value="Successfully Subscribed" class="btn" ></input>';
    }
    else {
        form[0].style.display = 'none'
        message[0].innerHTML = '<input type="submit" onClick="showForm()" value="Welcome Back" class="btn" ></input>';
        // popupOpenClose($(".popup"));
    }
}

const showForm = () => {
    form[0].style.display = 'block'
    message[0].innerHTML = '';
}
function popupOpenClose(popup) {

    /* Add div inside popup for layout if one doesn't exist */
    if ($(".wrapper").length == 0) {
        $(popup).wrapInner("<div class='wrapper'></div>");
    }

    /* Open popup */
    $(popup).show();

    /* Close popup if user clicks on background */
    $(popup).click(function (e) {
        if (e.target == this) {
            if ($(popup).is(':visible')) {
                $(popup).hide();
            }
        }
    });

    /* Close popup and remove errors if user clicks on cancel or close buttons */
    $(popup).find("button[name=close]").on("click", function () {
        if ($(".formElementError").is(':visible')) {
            $(".formElementError").remove();
        }
        $(popup).hide();
    });
}
