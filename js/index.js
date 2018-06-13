(function () {
  'use strict';
  angular
      .module('tabsDemoDynamicTabs', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
      .controller('AppCtrl', AppCtrl);
      AppCtrl.$inject = [ '$scope', '$log', '$http'];
  function AppCtrl ($scope, $log, $http) {
    /*var tabs = [
     { test: 'Zero (AKA 0, Cero, One - One, -Nineteen + 19, and so forth and so on and continuing into what seems like infinity.)', content: 'Woah...that is a really long title!',transactionId:"test",transactionType:"AB",transactionInvoked: "resource:org.hyperledger.composer.system.AddParticipant#162b39a1c4d5f8c4cdcb26bbe36037bddddaaa804ff8e0c1d21d4800d2c7d41c",participantInvoking: "resource:org.hyperledger.composer.system.NetworkAdmin#admin" },
      { test: 'Three (AKA 0, Cero, One - One, -Nineteen + 19, and so forth and so on and continuing into what seems like infinity.)', content: 'Woah...that is a really long title!' ,transactionId:"test",transactionType:"AB",transactionInvoked: "resource:org.hyperledger.composer.system.AddParticipant#162b39a1c4d5f8c4cdcb26bbe36037bddddaaa804ff8e0c1d21d4800d2c7d41c",participantInvoking: "resource:org.hyperledger.composer.system.NetworkAdmin#admin"},
      { test: 'Two (AKA 0, Cero, One - One, -Nineteen + 19, and so forth and so on and continuing into what seems like infinity.)', content: 'Woah...that is a really long title!' ,transactionId:"test",transactionType:"AB",transactionInvoked: "resource:org.hyperledger.composer.system.AddParticipant#162b39a1c4d5f8c4cdcb26bbe36037bddddaaa804ff8e0c1d21d4800d2c7d41c",participantInvoking: "resource:org.hyperledger.composer.system.NetworkAdmin#admin"},
        { title: 'Zero (AKA 0, Cero, One - One, -Nineteen + 19, and so forth and so on and continuing into what seems like infinity.)', content: 'Woah...that is a really long title!',transactionId:"test",transactionType:"AB",transactionInvoked:"test" },
        { title: 'One', content: "Tabs will become paginated if there isn't enough room for them.",transactionId:"test",transactionType:"AB",transactionInvoked:"test"},
        { title: 'Two', content: "You can swipe left and right on a mobile device to change tabs.",transactionId:"test",transactionType:"AB",transactionInvoked:"test"},
        { title: 'Three', content: "You can bind the selected tab via the selected attribute on the md-tabs element.",transactionId:"test",transactionType:"AB",transactionInvoked:"test"},
        { title: 'Four', content: "If you set the selected tab binding to -1, it will leave no tab selected.",transactionId:"test",transactionType:"AB",transactionInvoked:"test"},
        { title: 'Five', content: "If you remove a tab, it will try to select a new one.",transactionId:"test",transactionType:"AB",transactionInvoked: "resource:org.hyperledger.composer.system.AddParticipant#162b39a1c4d5f8c4cdcb26bbe36037bddddaaa804ff8e0c1d21d4800d2c7d41c",participantInvoking: "resource:org.hyperledger.composer.system.NetworkAdmin#admin"},
        { title: 'Six', content: "There's an ink bar that follows the selected tab, you can turn it off if you want.",transactionId:"test",transactionType:"AB",transactionInvoked: "resource:org.hyperledger.composer.system.AddParticipant#162b39a1c4d5f8c4cdcb26bbe36037bddddaaa804ff8e0c1d21d4800d2c7d41c",participantInvoking: "resource:org.hyperledger.composer.system.NetworkAdmin#admin"},
        { title: 'Seven', content: "If you set ng-disabled on a tab, it becomes unselectable. If the currently selected tab becomes disabled, it will try to select the next tab.",transactionId:"test",transactionType:"AB",transactionInvoked: "resource:org.hyperledger.composer.system.AddParticipant#162b39a1c4d5f8c4cdcb26bbe36037bddddaaa804ff8e0c1d21d4800d2c7d41c",participantInvoking: "resource:org.hyperledger.composer.system.NetworkAdmin#admin"},
        { title: 'Eight', content: "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!"},
        { title: 'Nine', content: "If you set md-theme=\"green\" on the md-tabs element, you'll get green tabs."},
        { title: 'Ten', content: "If you're still reading this, you should just go check out the API docs for tabs!"},
        { title: 'Eleven', content: "If you're still reading this, you should just go check out the API docs for tabs!"},
        { title: 'Twelve', content: "If you're still reading this, you should just go check out the API docs for tabs!"},
        { title: 'Thirteen', content: "If you're still reading this, you should just go check out the API docs for tabs!"},
        { title: 'Fourteen', content: "If you're still reading this, you should just go check out the API docs for tabs!"},
        { title: 'Fifteen', content: "If you're still reading this, you should just go check out the API docs for tabs!"},
        { title: 'Sixteen', content: "If you're still reading this, you should just go check out the API docs for tabs!"},
        { title: 'Seventeen', content: "If you're still reading this, you should just go check out the API docs for tabs!"},
        { title: 'Eighteen', content: "If you're still reading this, you should just go check out the API docs for tabs!"},
        { title: 'Nineteen', content: "If you're still reading this, you should just go check out the API docs for tabs!"},
        { title: 'Twenty', content: "If you're still reading this, you should just go check out the API docs for tabs!"} 
      ],
      selected = null,
      previous = null;*/
    $http.get('http://localhost:3000/api/system/historian').success(function(response) {
      
      /*alert(response[6].eventsEmitted[0].loanId);
      alert(response[7].eventsEmitted);
      alert(response[8].eventsEmitted);
      alert(response[0].participantInvoking);
      alert(response[0].identityUsed);
      alert(response[0].transactionTimestamp);*/
      var tabs = response,
      selected = null,
      previous = null;
      
    $scope.tabs = tabs;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
      selected = tabs[current];
      if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
      if ( current + 1 )                $log.debug('Hello ' + selected.title + '!');
    });
   /* $scope.addTab = function (title, view) {
      view = view || title + " Content View";
      tabs.push({ title: title, content: view, disabled: false});
    };
    $scope.removeTab = function (tab) {
      var index = tabs.indexOf(tab);
      tabs.splice(index, 1);
    };*/
  }); 
  }
})();



/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/