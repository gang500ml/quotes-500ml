const endpoint = "https://us-central1-basicblog-mdl.cloudfunctions.net/articles/";

var dialog;
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    document.getElementById('test-connect-mongodb').addEventListener('click', testconnectmongodb);
    
    // dialog = document.querySelector('dialog');
    // if (!dialog.showModal) {
    //   dialogPolyfill.registerDialog(dialog);
    // }
    // var addArticleButton = document.querySelector('#test-connect-mongodb');
    // addArticleButton.addEventListener('click', function() {
    //   var articleId = document.getElementById("article-id"); articleId.value = "-1"; //negative value means new article
    //   var titleAdd = document.getElementById("title-add"); titleAdd.value = "";
    //   var bodyAdd = document.getElementById("body-add"); bodyAdd.value = "";
      
    //   dialog.showModal();
    // });
    // dialog.querySelector('.close').addEventListener('click', function() {
    //   dialog.close();
    // });
    // var submitArticleButton = document.querySelector('#submit-article');
    // submitArticleButton.addEventListener('click', function() {
    //   submitArticle();
    // });

    // getArticles();
  }
};

function testconnectmongodb() {
  var urlString = "/testconnectmongodb";
  var xreq = new XMLHttpRequest();
  xreq.addEventListener("load", (e) => {
    var res = JSON.parse(xreq.response);
console.log(res);
  });
  xreq.addEventListener("error", (e) => {
    console.log(xreq.response)
  });
  xreq.open("GET", urlString);
  xreq.send();
}

function getArticles() {
  var urlString = endpoint;
  var xreq = new XMLHttpRequest();
  xreq.addEventListener("load", (e) => {
    var res = JSON.parse(xreq.response);
console.log(res);
    var aboxes = document.getElementById("aboxes");

for (var key in res) {
    if (res.hasOwnProperty(key)) {
var d = document.createElement('div');
d.className = "mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-phone mdl-card mdl-shadow--2dp";

//<span class="mdl-chip"><span class="mdl-chip__text">'+key+'</span></span>&nbsp;&nbsp;&nbsp; \

var articlebox = '<div class="mdl-card__title"> \
<h3 class="title" id="title'+key+'">' + res[key].title + '</h3></div> \
<div class="mdl-card__supporting-text"><span class="mdl-typography--font-light mdl-typography--subhead" id="body'+key+'">' + res[key].content + '</span></div> \
<div class="mdl-card__actions" style="text-align:right;"> \
<button data-update-aid="'+key+'" style="margin:10px;" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">&#xE3C9;</i></button> \
<button data-delete-aid="'+key+'" style="margin:10px;" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">&#xE872;</i></button></div>';
d.innerHTML = articlebox;
aboxes.appendChild(d);
    }
}
  var progressbar = document.getElementById("progressbar");
  progressbar.style.visibility = "hidden";

    var updateArticleButtons = document.querySelectorAll('[data-update-aid]');
    updateArticleButtons.forEach(function(el) {
      el.addEventListener("click", function() {
        updateArticle(el.getAttribute("data-update-aid"));
      });
    });

    var deleteArticleButtons = document.querySelectorAll('[data-delete-aid]');
    deleteArticleButtons.forEach(function(el) {
      el.addEventListener("click", function() {
        deleteArticle(el.getAttribute("data-delete-aid"));
      });
    });
    
  });
  xreq.addEventListener("error", (e) => {
    console.log(xreq.response)
  });
  xreq.open("GET", urlString);
  xreq.send();
}

function submitArticle() {
    var articleId = document.getElementById("article-id");
    var titleAdd = document.getElementById("title-add");
    var bodyAdd = document.getElementById("body-add");
    if ((titleAdd.value !== "") && (bodyAdd.value !== "")) {
      var api = endpoint;
      var method = "POST";
      if (articleId.value >= "0") {
        api += articleId.value;
        method = "PUT";
      }
      var urlString = api;
      var xreq = new XMLHttpRequest();
      xreq.addEventListener("load", (e) => {
        //var res = JSON.parse(xreq.response);
        console.log(xreq.response);
        location.reload(true);
      });
      xreq.addEventListener("error", (e) => {
        console.log(xreq.response);
        location.reload(true);
      });
      
      var data = {};
      data.title = titleAdd.value;
      data.content  = bodyAdd.value;
      var json = JSON.stringify(data);
    
      xreq.open(method, urlString);
      xreq.setRequestHeader('Content-type','application/json; charset=utf-8');
      xreq.send(json);
    } else {
      alert('please complete form!');
    }
}
  
function deleteArticle(id) {
    var api = endpoint+id;
    var urlString = api;
    var xreq = new XMLHttpRequest();
    xreq.addEventListener("load", (e) => {
    //var res = JSON.parse(xreq.response);
    console.log(xreq.response);
    location.reload(true);
    });
    xreq.addEventListener("error", (e) => {
    console.log(xreq.response);
    location.reload(true);
    });
    xreq.open("DELETE", urlString);
    xreq.send();
}

function updateArticle(id) {
    var title = document.getElementById("title"+id);
    var body = document.getElementById("body"+id);
    
    var articleId = document.getElementById("article-id");
    var titleAdd = document.getElementById("title-add");
    var bodyAdd = document.getElementById("body-add");
    
    articleId.value = id;
    titleAdd.value = title.innerHTML;
    bodyAdd.value = body.innerHTML;
    dialog.showModal();
}
