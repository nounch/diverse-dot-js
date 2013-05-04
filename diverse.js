//=========================================================================
// Append something to the document body
//=========================================================================

var foo;
for (var i = 0; i < 365; ++i) {
  foo = document.createElement('p');
  foo.innerHTML = 'Foobar ' + i;
  document.getElementsByTagName('body')[0].appendChild(foo);
}


//=========================================================================
// Get HTTP headers
//=========================================================================

var xhrReq = new XMLHttpXhrRequest();
xhrReq.open('GET', document.location, false);
xhrReq.send(null);
var headers = xhrReq.getAllResponseHeaders().toLowerCase();
console.log(headers);


//=========================================================================
// Get the referer (if any)
//=========================================================================

document.referrer


//=========================================================================
// Get all cookies for the current domain
//=========================================================================

var getCookies = function(){
  var pairs = document.cookie.split(";");
  var cookies = {};
  for (var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=");
    cookies[pair[0]] = unescape(pair[1]);
  }
  return cookies;
}
getCookies();


//=========================================================================
// Detect cookies of different domain
//=========================================================================


var iframe = document.createElement('iframe');
var iframeId = 'domain-iframe';
iframe.setAttribute('src', 'http://www.example.com/');
iframe.setAttribute('style', 'display: none; width: 0px; height: 0px;');
iframe.setAttribute('frameborder', '0');
iframe.setAttribute('marginwidth', '0');
iframe.setAttribute('scrolling', 'no');
iframe.setAttribute('id', iframeId);
// In case CSS is disabled
// iframe.setAttribute('width', '0');
// iframe.setAttribute('height', '0');
var body = document.getElementsByTagName('body')[0];
body.appendChild(iframe);

// document.getElementById(iframeId).contentWindow.document.cookie;


//=========================================================================
// Draw on a canvas
//=========================================================================

var canvas = document.createElement('canvas');
canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);
canvas.setAttribute('style', 'position: relative; x: 0; y: 0;');
// document.body.appendChild(canvas);
document.body.insertBefore(canvas, document.body.firstChild);

var ctx = canvas.getContext('2d');
// ctx.fillRect(10, 10, 1, 1);


var rand = function(from, to) {
  var from = from || 0;
  return Math.floor(Math.random() * (to - from + 1) + from);
}

var drawFace = function(ctx){
  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, Math.PI*2, true);  // Outer circle
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI*2, true);  // Left eye
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI*2, true);  // Right eye
  ctx.stroke();
}

var pixelize = function(ctx, width, height, pixelSize) {
  var pixelSize = pixelSize || 1;
  for (var x = 0; x < width; ++x) {
    for (var y = 0; y < width; ++y) {
      ctx.fillStyle = 'rgba(' +
        (rand(0, 255) / 2) + ', ' +
        (rand(0, 255) / 2) + ', ' +
        (rand(0, 255) / 2) + ', ' +
        ' 0.5)';
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }
}

var pixelSize = 10;
pixelize(ctx, 5 * pixelSize, 20 * pixelSize, pixelSize);


//=========================================================================
// Detect if there are iframes on the site (not sophisticated)
//=========================================================================

window.frames.length > 0;


//=========================================================================
// RegEx search
//=========================================================================

var getBodyText = function(win) {
  var doc = win.document;
  var body = doc.body;
  var selection;
  var range;
  var bodyText;
  if (body.createTextRange) {
    return body.createTextRange().text;
  } else if (win.getSelection) {
    selection = win.getSelection();
    range = doc.createRange();
    range.selectNodeContents(body);
    selection.addRange(range);
    bodyText = selection.toString();
    selection.removeAllRanges();
    return bodyText;
  }
}

// var string = 'This is a rather complex test.';
var string = getBodyText(window);
var userInput = window.prompt('RegEx search pattern:', '\\bc\\w*e\\w*\\b');
var flags = window.prompt('RegEx flags ("g", "i" or "m")', 'gi')
var pattern = new RegExp(userInput, flags);
var matches = string.match(pattern);

for (var i = 0; i < matches.length; ++i) {
  console.log(matches[i]);
}


//=========================================================================
// Spoof HTTP `referrer' header entries
//=========================================================================

// Works with HTTP, may work with HTTPS in some situations
function navigateToUrl(url) {
  var f = document.createElement("form");
  f.action = url;

  var indexQM = url.indexOf("?");
  if (indexQM>=0) {
    // the URL has parameters => convert them to hidden form inputs
    var params = url.substring(indexQM+1).split("&");
    for (var i=0; i<params.length; i++) {
      var keyValuePair = params[i].split("=");
      var input = document.createElement("input");
      input.type="hidden";
      input.name  = keyValuePair[0];
      input.value = keyValuePair[1];
      f.appendChild(input);
    }
  }

  document.body.appendChild(f);
  f.submit();
}

navigateToUrl("http://www.example.com/");


//=========================================================================
// Highlight regex matches
//=========================================================================

var highlight = function(element, text) {
  var innerHTML = element.innerHTML;
  var index = innerHTML.indexOf(text);
  innerHTML = innerHTML.substring(0, index) +
    '<span style="background-color: red;">' +
    innerHTML.substring(index, index + text.length) +
    '</span>' + innerHTML.substring(index + text.length);
  element.innerHTML = innerHTML;
}

var paragraphs = document.getElementsByTagName('p');
var searchQuery = prompt('Search query:');
for (var i = 0; i < paragraphs.length; ++i) {
  highlight(paragraphs[i], searchQuery);
}


//=========================================================================
// Clear the current page (approximatly)
//=========================================================================

// Note:
//
// - Does not work in all browsers.
// - Will not free memory.
// - Does not guarantee to remove style sheets, scripts, media etc.
window.location = 'about:blank';



//=========================================================================
// Highlight nesting of (almost) all elements
//=========================================================================

var elements = document.querySelectorAll('*');
var element;

for (var i = 0; i < elements.length; ++i) {
  element = elements[i];
  element.style.backgroundColor = 'rgba(255, 0, 0, 0.25)';
}


//=========================================================================
// Get history by inspecting link color
//=========================================================================

function urlvis(url){
  document.getElementById('gurl').innerHTML="<a id=geturl href="+url+" >^</a>";
  x=document.getElementById('geturl');
  color=document.defaultView.getComputedStyle(x,null).getPropertyValue(
    'color');
  if (color=="rgb(85, 26, 139)") {
    visited=true;
  } else {
    visited=false;
  }
  document.getElementById('gurl').innerHTML="";
  return visited;}
}


//=========================================================================
// `treeWalker' test
//=========================================================================

// TODO


//=========================================================================
// `window.postMessage' test
//=========================================================================

// TODO


//=========================================================================
// Selectors API (`document.querySelector' and `document.querySelectorAll')
//=========================================================================

var elements = document.querySelectorAll('*');
var element;

for (var i = 0; i < elements.length; ++i) {
  element = elements[i];
  // element.style.border = '1px solid rgba(0, 0, 255, 0.5)';
  element.style.backgroundColor = 'rgba(255, 0, 0, 0.25)';
  // element.style.padding = '5px';
}


//=========================================================================
// jQuery selector `replacement'
//=========================================================================

var $ = function(x) {
  return document.querySelectorAll(x);
}


//=========================================================================
// jQuery AJAX `replacement'
//=========================================================================

$.ajax = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = callback;
  xhr.send();
}


//=========================================================================
// Get selected text
//=========================================================================

function getSelectedText() {
  var txt = '';
  if (window.getSelection) {
    txt = window.getSelection();
  }
  else if (document.getSelection) {
    txt = document.getSelection();
  }
  else if (document.selection) {
    txt = document.selection.createRange().text;
  }
  else return;
  return txt;
}


// Get element where parts of the `innnerHTML' text are selected

var element = getSelectedText().anchorNode.parentNode;

var getAllParentElements = function(element) {
  var parents = [];
  while (element) {
    parents.unshift(element);
    element = element.parentNode;
  }
  return parents;
}

var parents = getAllParentElements(element);
var parentTrail = '[ROOT]';
for (var i = 0; i < parents.length; ++i) {
  parentTrail += ' > ' + parents[i].tagName;
}
console.log(parentTrail);  // DEBUG


//=========================================================================
// Position all elements in a circle around the mouse cursor
//=========================================================================

var links = document.querySelectorAll('*');

var currentElement;
var numElements = links.length;
var radius = 100; // Fallback value
if (window.innerWidth > window.innerHeight) {
  radius = window.innerHeight / 3;
} else {
  radius = window.innerWidth / 3;
}

// Hide the cursor
for (var i = 0; i < numElements; ++i) {
  links[i].style.cursor = 'crosshair';
}

// Arrange the elements in a circular shape around the current mouse
// position
window.onmousemove = function(e) {
  e = e || window.event // IE
  for (var i = 0; i < numElements; ++i) {
    currentElement = links[i];
    currentElement.style.position = 'fixed';

    // Subtracting `currentElement.offsetWidth / 2' would be more precise,
    // but is too expensive;
    currentElement.style.left = e.pageX + radius *
      Math.cos(2 * i * Math.PI / numElements);
    // Subtracting `currentElement.offsetHeight / 2' would be more precise,
    // but is too expensive;
    currentElement.style.top = e.pageY + radius *
      Math.sin(2 * i * Math.PI / numElements);
  }
}


//=========================================================================
// Visibility API
//=========================================================================

document.addEventListener('visibilitychange', function() {
  console.log(document.visibilityState);  // DEBUG
})


//=========================================================================
// Auto-bookmark soemthing (URL, bookmarklet, etc.)
//=========================================================================

function bookmark(title, url) {
  if(document.all) { // IE
    window.external.AddFavorite(url, title);
  }
  else if(window.sidebar) { // Firefox
    window.sidebar.addPanel(title, url, "");
  }
  else if(window.opera && window.print) { // Opera
    var elem = document.createElement('a');
    elem.setAttribute('href',url);
    elem.setAttribute('title',title);
    elem.setAttribute('rel','sidebar');
    elem.click(); // this.title=document.title;
  }
}


//=========================================================================
// Get all images on a page
//=========================================================================

// Using `document.images' does not work because `cloneNode' will not
// operate on non-DOM array elements properly
var images = document.querySelectorAll('img')

// Does not assume fundamental strucutre changes to the `html' element in
// the future
var html = document.getElementsByTagName('html')[0];
var imageList = document.createElement('ul');
var listElement;
for (var i = 0; i < images.length; ++i) {
  listElement = document.createElement('li');
  listElement.appendChild(images[i].cloneNode(true));
  html.insertBefore(listElement, html.childNodes[0]);
}


//=========================================================================
// `overflow: auto' finder (defunct, very fuzzy!)
//=========================================================================

// Test
var elements = document.querySelectorAll('*');
var currentElement;
for (var i = 0; i < elements.length; ++i) {
  currentElement = elements[i]
  // if (window.getComputedStyle(currentElement, null).getPropertyValue(
  //   'hidden') == 'visible') {
  //   console.log(currentElement.tagName);  // DEBUG
  // }

  if ((currentElement.clientHeight < currentElement.scrollHeight) ||
      (currentElement.clientWidth < currentElement.scrollWidth)) {
    // console.log(currentElement.tagName);  // DEBUG
    currentElement.style.backgroundColor = 'rgba(255, 0, 0, 0.25)';
  }
}


//=========================================================================
// Recursive DOM walker
//=========================================================================

var walkDOM = function(parent, callback) {
  if (parent.hasChildNodes()) {
    for (var node = parent.firstChild; node; node = node.nextSibling) {
      walkDOM(node, callback);
    }
  }
  callback(parent);
}

var width = '';
walkDOM(document.getElementsByTagName('html')[0], function(element) {
  console.log(element.innerText || element.textContent);  // DEBUG
});


//=========================================================================
// Get the namespace URI for the current document
//=========================================================================

console.log(document.documentElement.namespaceURI);  // DEBUG


//=========================================================================
// `treeWalker' test
//=========================================================================

var treeWalker = document.createTreeWalker(document.body, );

// 1. Walk all elements.
// 2. For each element inspect `elemnt.style.overflow'.
// 3. If `elemnt.style.overflow == 'auto'' do the magic.
//
// Step 3 could also include matching `element.innerHTML' against a RegEx
// and store the element in an array if it matches, then display all
// matched elements on a new site/in a dedicated area on the same page


//=========================================================================
// Test
//=========================================================================

var links = document.links;

var win = window.open('');

// var document = win.document;

// Test
var p = win.document.createElement('p');
p.innerHTML = 'This is a test.';
win.document.body.appendChild(p);

// var li;
// for (var i = 0; i < links.length; ++i) {
//   li = win.document.body.createElement('li');
//   li.appendChild(links[i]);
// }


//=========================================================================
// Hiding test
//=========================================================================

// Description:
//
//   1. Hide the whole document (assumes the document to have a single root
//      which should be the `document.documentElement').
//   2. Create a `bookmarklet-container' div which wraps the whole
//      bookmarklet.
//   3. Append the `bookmarklet-container' to the
//      `document.documentElement'
//   4. Set the `bookmarklet-container' to be visible.

// document.documentElement.style.visibility = 'hidden';
// document.documentElement.style.display = 'none';

var children = document.documentElement.childNodes;
var child;
var childrenElements = [];
var childElement;

var hidePage = function() {
  for (var i = 0; i < children.length; ++i) {
    // Store the `display' CSS property away for later
    child = children[i];
    childElement['element'] = child;
    childElement['display'] = child.style.display;
    childrenElements[i] = childElement;
    // Hide every child
    child.style.display = 'hidden';
  }
}

var showPage = function() {
  for (var i = 0; i < children.length; ++i) {
    children[i].style.display = childrenElements[i]['display'];
  }
}

var bookmarkletContainer = document.createElement('div');
bookmarkletContainer.id = 'bookmarklet-container';
document.documentElement.insertBefore(
  bookmarkletContainer, document.documentElement.childNodes[0]);
// bookmarkletContainer.style.visibility = 'visible';
bookmarkletContainer.style.display = 'inline';

// Test paragraph
var p = document.createElement('p');
p.innerHTML = 'This is a test.';
bookmarkletContainer.appendChild(p);

var ul = document.createElement('ul');
var links = document.links;
var li;

for (var i = 0; i < links.length; ++i) {
  li = document.createElement('li');
  li.appendChild(links[i]);
  ul.appendChild(li);
}

bookmarkletContainer.appendChild(ul);

