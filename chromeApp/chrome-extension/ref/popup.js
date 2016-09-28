// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */

window.onload = function() {

  var getCurrentTabUrl = function (callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
      active: true,
      currentWindow: true
    };



    chrome.tabs.query(queryInfo, function(tabs) {
      // chrome.tabs.query invokes the callback with a list of tabs that match the
      // query. When the popup is opened, there is certainly a window and at least
      // one tab, so we can safely assume that |tabs| is a non-empty array.
      // A window can only have one active tab at a time, so the array consists of
      // exactly one tab.
      var tab = tabs[0];

      // A tab is a plain object that provides information about the tab.
      // See https://developer.chrome.com/extensions/tabs#type-Tab
      var url = tab.url;
      var title = tab.title;
      var category = null;
      var tags = null;

      // tab.url is only available if the "activeTab" permission is declared.
      // If you want to see the URL of other tabs (e.g. after removing active:true
      // from |queryInfo|), then the "tabs" permission is required to see their
      // "url" properties.
      console.assert(typeof url == 'string', 'tab.url should be a string');

      console.log('CURRENT TABS URL IS', url);

      // must used XMLHttpRequest in extension 
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://127.0.0.1:3000/link', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(encodeURI('url=' + url + '&title=' + title + '&category=' + category + '&tags=' + tags));
    });
  };

  getCurrentTabUrl();

  // pipe authentication to our server + db
  var authenticateUser = function () {
    var xhr = new XMLHttpRequest();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var authenticated = false;

    var toSend = {username: username, password: password};
    
    // second, true argument below means send async
    xhr.open('POST', 'http://127.0.0.1:3000/login', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(encodeURI('username=' + username + '&password=' + password));
    // xhr.send(JSON.stringify({username: username, password: password}));

    console.log('username and pass are', username + password);
    xhr.onreadystatechange = function () {
      console.log('status here is', this.status);
      console.log('we received a change in status!');
      if (this.status === 200 ) {
        authenticated = true;
        console.log('authenticated val is now', authenticated);
      } else {
        console.log ('authenticated val is now', authenticated);
      }
    };
    
    if (authenticated) {
      // display next interace 
      console.log('we are now in the auth stage');
    }
  };

  // when submit is clicked, authenticate the user
  document.getElementById('submit').onclick = function(e) {
    e.preventDefault();
    authenticateUser();
  };

};
