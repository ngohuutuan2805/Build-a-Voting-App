/**
 * Created by NgoHuuTuan on 12/13/16.
 */
'use strict';

(function () {
    console.log("showPollController.client.js...")

    var btnHome = document.getElementById('btnHome');
    var btnLogin = document.getElementById('btnLogin');
    var btnSubmit = document.getElementById('btnSubmit');
    var title = document.getElementById('pollTitle')
    var selection = document.getElementById('selection')

    var pollID = window.location.href.slice(window.location.href.indexOf('?') + 1).split('=')[1]


    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', '/getPollContent?id=' + pollID, function (data) {

        var poll = JSON.parse(data)[0]

        title.value = poll.title

        var selectInnerHtml = ""

        for(var i = 0; i < poll.options.length; i++){

            selectInnerHtml += '<option value=' + poll.options[i]._id + '>' + poll.options[i].option + '(' + poll.options[i].selectedCount + ')' + '</option>'
        }

        selection.innerHTML = selectInnerHtml
    }))

    btnHome.addEventListener('click', function () {
        console.log("Click home")

        window.location.href = appUrl;

    }, false);

    if (btnLogin) {
        btnLogin.addEventListener('click', function () {
            console.log("Click login")

            window.location.href = window.location.origin + '/login'

        }, false);
    }

    if(btnSubmit){
        btnSubmit.addEventListener('click', function () {
            console.log("Click submit")

            ajaxFunctions.ajaxRequest('GET', '/submit?id=' + pollID + '&optionId=' + selection.options[selection.selectedIndex].value, function (data) {
                var result = JSON.parse(data)

                console.log("Submit result: " + JSON.stringify(result))

                if(result.result == 'true'){

                    alert("Voting successful !!!")
                    window.location.reload()

                } else{
                    alert("Voting false, try again later")
                }
            })
        })
    }

})()
