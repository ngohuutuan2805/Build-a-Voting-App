'use strict';

(function () {

   console.log("ClickController.client.js...")

   var btnHome = document.getElementById('btnHome');
   var btnLogin= document.getElementById('btnLogin');
   var cellArr = document.getElementsByClassName('cell')
   var pollTable = document.getElementById('table')

   // Element visible after login
   var btnMyPolls = document.getElementById('btnMyPolls')
   var btnNewPoll = document.getElementById('btnNewPoll')
   var btnLogout  = document.getElementById('btnLogout')
   var profile    = document.getElementById('profile')

   // NewPoll.html
   var btnSave = document.getElementById('btnSave')
   var txtFiTitle = document.getElementById('txtFiTitle')
   var txtFiOptions = document.getElementById('txtFiOptions')


   for(var i = 0; i < cellArr.length; i++){

      var cell = cellArr.item(i);
   }


   function  receivePolls(data) {

      var pollArr = JSON.parse(data);

      var htmlInner = ""
      for(var i = 0; i < pollArr.length; i++){
         var poll = pollArr[i]

         htmlInner += '<a href="/poll?id=' + poll._id + '"><div class="cell">' + poll.title + '</div></a>'
      }
      console.log("Recieved poll array: " + htmlInner)

      if(pollTable){
         pollTable.innerHTML = htmlInner
      }

   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', appUrl + '/getPolls', receivePolls));

   btnHome.addEventListener('click', function () {
      console.log("Click home")

      window.location.href = appUrl;

   }, false);

   if(btnLogin){
      btnLogin.addEventListener('click', function () {
         console.log("Click login")

         // Go to login page
         window.location.href = appUrl + '/login';

      }, false);
   }

   if(btnMyPolls){
      btnMyPolls.addEventListener('click', function () {
         console.log("Click my polls")

         window.location.href = appUrl + '/myPolls'

      }, false);
   }

   if(btnNewPoll){
      btnNewPoll.addEventListener('click', function () {
         console.log("Click new poll")

         window.location.href = appUrl + '/newPoll'

      }, false);
   }

   if(btnLogout){
      btnLogout.addEventListener('click', function () {
         console.log("Click logout")

         window.location.href = appUrl + '/logout'

      }, false);
   }

   if(btnSave){
      btnSave.addEventListener('click', function () {
         console.log('Click save')


         var body = {}
         body.title = txtFiTitle.value
         var options = txtFiOptions.value.split('\n')
         body.options = [];
         for(var i = 0; i < options.length; i++){
            body.options.push({
               option:options[i],
               selectedCount: 0
            })
         }

         console.log('Save new poll : ' + JSON.stringify(body))

         ajaxFunctions.sendPostRequest('POST', appUrl + '/saveNewPoll', function (data) {
            console.log('Save new poll successful: ' + data)

            window.location.href = appUrl
         }, body)

      })
   }


})();
