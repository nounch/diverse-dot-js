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

// var xhrReq = new XMLHttpXhrRequest();
var xhrReq = new XMLHttpRequest();
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
// Hiding test
//=========================================================================

var children = document.documentElement.childNodes;
var child;

for (var i = 0; i < children.length; ++i) {
  child = children[i];
  if (typeof child.style != 'undefined' &&
      typeof child.style.display != 'undefined') {
    console.log(child.style.display);  // DEBUG
  } else {
    console.log('NONE');  // DEBUG
  }
}


//=========================================================================
// Disable stylesheets
//=========================================================================

for(i = 0; i < document.styleSheets.length; ++i) {
  document.styleSheets[i].disabled = true;
}

var elements = document.getElementsByTagName('*');
for(i = 0; i < elements.length; ++i) {
  elements[i].style.cssText = '';
}


//=========================================================================
// Remove the `body' element and replace it by an alternative one
//=========================================================================

var originalBody = document.body.cloneNode(true);

var removeBody = function() {
  document.body.parentNode.removeChild(document.body);
}

removeBody();

var newBody = document.createElement('body');
var p = document.createElement('p');
p.innerHTML = 'This is a paragraph.'
newBody.appendChild(p);

document.documentElement.appendChild(newBody);

newBody.onclick = function() {
  console.log(originalBody);  // DEBUG
  removeBody();
  document.documentElement.appendChild(originalBody);
}


//=========================================================================
// Colorize link types
//=========================================================================

var links = document.links;
var link;
var overlay;
var rect;

for (var i = 0; i < links.length; ++i) {
  link = links[i];
  linkString = links[i].toString();
  if (linkString.indexOf(document.domain) != -1) {
    // console.log(linkString.indexOf(document.domain) + ' ' + linkString);  // DEBUG
    link.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'
  }

  overlay = document.createElement('div')
  overlay.innerHTML = link.tagName;
  overlay.style.backgroundColor = 'rgba(0,255, 0, 0.5)';
  overlay.style.color = '#000000';
  overlay.style.position = 'absolute';
  // overlay.style.display = 'block';
  rect = link.getBoundingClientRect();

  // Dimensions
  overlay.style.top = rect.top; // - link.offsetHeight;
  overlay.style.left = rect.left;
  overlay.style.width = link.offsetWidth + 'px';
  overlay.style.height = link.offsetHeight + 'px';

  overlay.style.textAlign = 'center';

  link.parentNode.appendChild(overlay);
}


//=========================================================================
// Get list of all computed styles
//=========================================================================

// TODO
//
// var elements = document.getElementsByTagName('*');
// var element;
// var computedStyles;

// for (var i = 0; i < elements.length; ++i) {
//   element = elements[i];
//   computedStyles = window.getComputedStyle(element, null)
//   console.log(computedStyles);  // DEBUG

//   for (var j = 0; j < computedStyles.length; ++j) {
//     // console.log(element.style[computedStyles[i]]);  // DEBUG
//     console.log(computedStyles[i]);  // DEBUG
//   }
// }


//=========================================================================
// Get all scripts
//=========================================================================

// var elements = document.getElementsByTagName('script');
var elements = document.scripts;
var element;

var WIDGET_HEIGHT = 200;

var widget = document.createElement('div');
widget.id = 'javascript-list-widget';
widget.style.zIndex = '99999999';
widget.style.position = 'fixed';
widget.style.top = '0';
widget.style.left = '0';
widget.style.backgroundColor = '#444444';
widget.style.width = '100%';
widget.style.paddingTop = '10px';
// widget.style.paddingBottom = '10px';
widget.style.boxShadow = '0 0 15px 6px rgba(0, 0, 0, 0.5)';
widget.style.resize = 'vertical';

var closeButton = document.createElement('a');
widget.appendChild(closeButton);
closeButton.innerHTML = 'Close';
closeButton.onclick = function(e) {
  widget.parentNode.removeChild(widget);
  topSpacer.parentNode.removeChild(topSpacer);
};
closeButton.style.top = '0';
closeButton.style.right = '0';
closeButton.style.position = 'absolute';
closeButton.style.color = '#FDFDFD';
closeButton.style.backgroundColor = '#444444';
closeButton.style.borderRadius = '0 0 0 5px';
closeButton.style.padding = '3px';
closeButton.style.textShadow = '0 1px #000000';
closeButton.style.fontSize = '0.9em';
closeButton.style.fontFamily = 'Helvetica, sans-serif';
closeButton.style.cursor = 'pointer';
closeButton.style.padding = '3px';
closeButton.style.borderBottom = '1px solid #000000';
closeButton.style.boxShadow = '0 0 6px 3px rgba(0, 0, 0, 0.5)';

var textBox = document.createElement('textarea');
widget.appendChild(textBox);
textBox.id = 'javascript-list-widget-textearea';
textBox.style.display = 'inline';
textBox.style.borderWidth = '0';
textBox.style.width = '100%';
textBox.style.height = WIDGET_HEIGHT + 'px';

var summary = document.createElement('p');
if (elements.length == 1) {
  summary.innerHTML = elements.length + ' script'
} else {
  summary.innerHTML = elements.length + ' scripts'
}
widget.appendChild(summary);
summary.style.fontFamily = 'Helvetica, sans-serif';
summary.style.color = '#FDFDFD';
summary.style.backgroundColor = '#444444';
summary.style.margin = '0';
summary.style.width = '100%';
summary.style.textAlign = 'center';


for (var i = 0; i < elements.length; ++i) {
  element = elements[i];
  textBox.innerHTML += element.src + '\n';
}

// document.documentElement.appendChild(widget);
document.documentElement.insertBefore(widget,
                                      document.documentElement.firstChild);
// Vertical spacer; pushes (most parts of) the site down by the height of
// the `textBox'
var topSpacer = document.createElement('div');
topSpacer.style.height = WIDGET_HEIGHT + 35 + 'px';
document.documentElement.insertBefore(topSpacer,
                                      document.documentElement.firstChild);


//=========================================================================
// Make unreadable sites readable
//=========================================================================

// Approach 1
// (Does not allow `!important' rules and may be overriden more easily.):

var elements = document.getElementsByTagName('p');
var element;

for (var i = 0; i < elements.length; ++i) {
  element = elements[i];
  element.style.fontSize = '1.3125em';
  element.style.lineHeight = '1.52381em';
  element.style.fontFamily = 'Georgia, serif';
  element.style.fontStyle = 'normal';
  element.style.fontVariant = 'normal';
  element.style.fontWeight = 'normal';
  element.style.textRendering = 'optimizelegibility';
  element.style.color = '#333333';
  element.style.backgroundColor = '#FDFDFD';
}


// Approach 2
// (Allows `!important' rules and overrides original rules more precisely):

var rules = 'p,font,h1,h2,h3,h4 {\
font-size: 1.3125em !important;\
line-height: 1.52381em !important;\
font-family: Georgia, serif !important;\
font-style: normal !important;\
font-variant: normal !important;\
font-weight: normal !important;\
text-rendering: optimizelegibility !important;\
color: #333333 !important;\
background-color: #FDFDFD !important;\
}\
\
h4 {\
font-size: 1.5em !important;\
}\
\
h3 {\
font-size: 1.79em !important;\
}\
\
h2 {\
font-size: 2.09em !important;\
}\
\
h1 {\
font-size: 2.4em !important;\
}';

var css = document.createElement('style');
css.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(css);
css.appendChild(document.createTextNode(rules));


//=========================================================================
// Make a frequency list of tag names
//=========================================================================

// TODO
// Example:
//   - div: 86
//   - p: 53
//   - li: 27
//   - i: 8
//   - iframe: 1
//   - nav: 1
//   - ...


//=========================================================================
// Put focus on `document.documentElement'
//=========================================================================

document.documentElement.click();


//=========================================================================
// `onscroll' douchbaggery
//=========================================================================

// Assumes that not elements get added/removed during/in between scrolling
// events
var elements =  document.querySelectorAll('*')
var min = 0;
var maxString = window.getComputedStyle(
  document.documentElement).getPropertyValue('height');
var max = 0 + maxString.substring(0, maxString.length - 2);
console.log(max);  // DEBUG


var overlay = document.createElement('div');
overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.0)';
overlay.style.color = 'rgba(255, 255, 255, 0.0)';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.position = 'absolute';
overlay.style.width = '100%';
overlay.style.height = maxString;
overlay.style.zIndex = '99999999';

document.documentElement.appendChild(overlay);

var _scaleValue = function(value) {
  return (value - min) * (100 - 0) / (max - min);
}

window.onscroll = function(e) {
  for (var i = 0; i < elements.length; ++i) {
    overlay.style.backgroundColor = 'hsla(170, 5%,' +
      _scaleValue(document.documentElement.scrollTop) + '%, 0.85)'
  }
}


//=========================================================================
// Count number of links on site
//=========================================================================

var links = document.getElementsByTagName('a');
console.log(links.length);  // DEBUG

//=========================================================================
// Acronym finder
//=========================================================================

var infoBoxContainer = document.createElement('div');
infoBoxContainer.id = 'acronym-finder-info-box';
infoBoxContainer.style.position = 'fixed';
infoBoxContainer.style.top = '0';
infoBoxContainer.style.left = '0';
infoBoxContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
infoBoxContainer.style.color = '#FDFDFD';
infoBoxContainer.style.padding = '10px';
infoBoxContainer.style.fontFamily = 'Georgia, sans-serif';
infoBoxContainer.style.fontSize = '0.9em';
infoBoxContainer.style.lineHeight = '1.3em';
infoBoxContainer.style.maxHeight = '50%';
infoBoxContainer.style.overflow = 'auto';
infoBoxContainer.style.boxShadow = '0 0 10px 5px rgba(0, 0, 0, 0.65)';
infoBoxContainer.style.zIndex = '99999999';

var infoBox = document.createElement('ul');
infoBox.style.position = 'relative';
// infoBox.style.top = '15px';
infoBox.style.padding = '20px';
var li;

var closeButton = document.createElement('a');
closeButton.href = '#';
closeButton.innerHTML = 'Close';
closeButton.style.float = 'right';
closeButton.style.right = '0';
closeButton.style.top = '0';
closeButton.style.margin = '5px';
closeButton.style.position = 'absolute';
closeButton.style.textDecoration = 'none';
closeButton.style.color = '#9E9EAE';
closeButton.style.fontSize = '1.0em';
closeButton.style.textAlign = 'center';
closeButton.style.zIndex = '99999999';
closeButton.onclick = function(e) {
  var box = document.getElementById('acronym-finder-info-box');
  box.parentNode.removeChild(box);
};

infoBoxContainer.appendChild(closeButton);
infoBoxContainer.appendChild(infoBox);

var elements = document.getElementsByTagName('acronym');
var element;

for (var i = 0; i < elements.length; ++i) {
  element = elements[i];
  li = document.createElement('li');
  li.innerHTML = '<b>' + element.innerHTML + ':&nbsp;</b>' + element.title;
  infoBox.appendChild(li);
}

document.documentElement.appendChild(infoBoxContainer);


//=========================================================================
// Drain color from the page
//=========================================================================

var rules = '* {\
color: #333333 !important;\
background-color: #FDFDFD !important;\
layer-background-color: #FDFDFD !important;\
outline-color: #FDFDFD !important;\
border-color: #FDFDFD !important;\
}';

var css = document.createElement('style');
css.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(css);
css.appendChild(document.createTextNode(rules));


//=========================================================================
// Highlight current element and all its parents
//=========================================================================

var rules = '*:hover {\
outline: 1px solid #FF0000 !important;\
}';

var css = document.createElement('style');
css.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(css);
css.appendChild(document.createTextNode(rules));


// Different Approach
// (Note: Modifying actual properties will interfere with the page. A
// better solution would be to overlay the page with positioned elements.):

// var oldBackgroundColor;

// document.addEventListener('mouseover', function(e) {
//   oldBackgroundColor = e.target.backgroundColor;
//   e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'
// }, true);

// document.addEventListener('mouseout', function(e) {
//   e.target.style.backgroundColor = oldBackgroundColor;
// }, true);

// document.addEventListener('click', function(e) {
//   e.target.style.backgroundColor = 'rgba(0, 255, 255, 0.5)'
// }, true);


//=========================================================================
// Get all HTML comments
//=========================================================================

var traverse = function(element) {
  var elements = element.childNodes;
  var element;

  for (var i = 0; i < elements.length; ++i) {
    element = elements[i];
    traverse(element);
    if (element.nodeType = Node.COMMENT_NODE) {
      // console.log(element.innerHTML);  // DEBUG
      console.log('Comment found');  // DEBUG
    }
  }
}

traverse(document.documentElement);


//=========================================================================
// Randomly colorize the page
//=========================================================================

var elements = document.getElementsByTagName('*');

var generateRandomHexColor = function() {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var color = '#';

  for (var i = 0; i < 6; ++i ) {
    color += chars[Math.round(Math.random() * 15)];
  }

  // Exclude white and black
  // if (color == '#000000' || color == '#FFFFFF') {
  //   generateRandomHexColor();
  // }

  return color;
};

for (var i = 0; i < elements.length; ++i) {
  elements[i].style.backgroundColor = generateRandomHexColor();
  elements[i].style.color = generateRandomHexColor();
}


//=========================================================================
// Make all elements resizable
//=========================================================================

var elements = document.getElementsByTagName('*');
for (var i = 0; i < elements.length; ++i) {
  // Could potentially be used to make nested elements resizable without
  // being covered by parent elements
  // elements[i].style.zIndex = '99999999';
  elements[i].style.resize = 'both';
  elements[i].style.overflow = 'auto';
}


//=========================================================================
// Highlight even/odd table rows
//=========================================================================

var rules = 'tr:nth-child(even) {\
background-color: rgba(200, 200, 200, 0.5) !important;\
box-shadow: inset 0px 10px 80px -15px rgba(40, 40, 40, 0.5) !important;\
}';

var css = document.createElement('style');
css.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(css);
css.appendChild(document.createTextNode(rules));


//=========================================================================
// Grab Dribble color palettes in plain text format (instead of .aco)
//=========================================================================

// Approach 1

var elements = document.querySelectorAll('.color-chips>.color>a');
var colors = [];
var colorString = '';

for (var i = 0; i < elements.length; ++i) {
  colors = colors + '\n' + elements[i].title;
}

window.open('data:text/plain;charset=utf-8,' + encodeURIComponent(colors));
downloadWithName(colorString, 'colors.txt');
// Also consider: `decodeURIComponent('Hello%2C%20World!');'


// Approach 2

var downloadWithName = function(uri, name) {
  function eventFire(el, etype){
    if (el.fireEvent) {
      (el.fireEvent('on' + etype));
    } else {
      var evObj = document.createEvent('MouseEvents');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  eventFire(link, "click");
}

downloadWithName("data:text/csv;charset=utf-8,Hello%2C%20World!",
                 "helloWorld.txt");


//=========================================================================
// Bookmarklet Encoder/Decoder
//=========================================================================

var textarea = document.createElement('textarea');
textarea.id = 'enc-dec-component';
textarea.rows = 30;
textarea.cols = 100;
document.documentElement.appendChild(textarea);

var encodeButton = document.createElement('input');
encodeButton.type = 'button';
encodeButton.value = 'Encode';
encodeButton.onclick = function() { encode(); };
document.documentElement.appendChild(encodeButton);

var decodeButton = document.createElement('input');
decodeButton.type = 'button';
decodeButton.value = 'Decode';
decodeButton.onclick = function() { decode(); };
document.documentElement.appendChild(decodeButton);

var encode = function() {
  var obj = document.getElementById('enc-dec-component');
  var unencoded = obj.value;
  obj.value = encodeURIComponent(
    unencoded).replace(/'/g,"%27").replace(/"/g,"%22");
}

var decode = function() {
  var obj = document.getElementById('enc-dec-component');
  var encoded = obj.value;
  obj.value = decodeURIComponent(encoded.replace(/\+/g,  " "));
}


//=========================================================================
// `iframe' test
//=========================================================================

// Approach 1

var iframe = document.createElement('iframe');
iframe.width = '200px';
iframe.height = '100px';
iframe.src = 'about:blank'; // IE might dislike iframes without source

var bmDoc = document.implementation.createDocument(null, 'bmDocument',
                                                   null);
var bmBody = document.createElementNS('http://www.w3.org/1999/html',
                                      'bod');;
bmBody.id = 'bookmarklet-document-body';
var p = bmDoc.createElement('p');
p.innerHTML = 'This is a paragraph.';
bmBody.appendChild(p);
bmDoc.appendChild(bmBody);

document.body.appendChild(iframe);


// Approach 2

var iframe = document.createElement('iframe');
// iframe.width = '200px';
// iframe.height = '100px';
iframe.src = 'about:blank';
// Does have to be added before the `iframe' element is inserted into the
// DOM
iframe.frameBorder = '0';
iframe.style.boxShadow = '0 0 10px 6px #FF0000';
iframe.style.backgroundColor = '#00FF00';
iframe.style.margin = '50px';
iframe.style.overflow = 'hidden';

iframe.style.position = 'relative';
iframe.style.display = 'inline';
iframe.style.top = '0';
iframe.style.width = '100%';
iframe.style.margin = '0';
iframe.style.zIndex = '99999999';

// Does have to be added so `iframe.contentWindow' is available
// document.body.appendChild(iframe);
document.body.insertBefore(iframe, document.body.childNodes[0]);

var iframeContent = '<!DOCTYPE html><html><head><title>Bookmarklet</title></head><body><p>This is a paragraph.</p></body></html>';

iframe.contentWindow.document.open('text/html', 'replace');
iframe.contentWindow.document.write(iframeContent);
iframe.contentWindow.document.write(
  iframe.contentWindow.window.parent.document.querySelector(
    'p').innerHTML);
var css = iframe.contentWindow.document.createElement('style');
css.type = 'text/css';
css.innerHTML = 'p {\
background-color: orange;\
}\
';
iframe.contentWindow.document.head.appendChild(css);
iframe.contentWindow.document.close();


//=========================================================================
// Insert a draggable element
//=========================================================================

var element = document.createElement('div');
element.innerHTML = 'This is a test.';
element.setAttribute('draggable', 'true');
element.style.zIndex = '99999999';
// element.style.position = 'relative';
element.style.width = '100px';
element.style.height = '150px';
element.style.backgroundColor = '#FF0000';

element.addEventListener('dragstart', function(e) {
  console.log('dragstart');  // DEBUG
  this.style.opacity = '0.8';

  e.dataTransfer.dropEffect = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML) = 'move';
}, false);

element.addEventListener('dragenter', function(e) {
  console.log('dragenter');  // DEBUG
}, false);

element.addEventListener('dragover', function(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML) = 'move';

  console.log('dragover');  // DEBUG
  this.style.border = '5px solid green';

  return false;
}, false);

element.addEventListener('dragleave', function(e) {
  console.log('dragleave');  // DEBUG
}, false);

element.addEventListener('drop', function(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  console.log('drop');  // DEBUG
  return false;
}, false);

element.addEventListener('dragend', function(e) {
  console.log('dragend');  // DEBUG
}, false);

document.documentElement.appendChild(element);


//=========================================================================
// Input acrobatics
//=========================================================================

var inputElement = document.createElement('input');
inputElement.setAttribute('type', 'file');
inputElement.setAttribute('multiple', '');

var outputElement = document.createElement('output');

var dropElement = document.createElement('div');
dropElement.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
dropElement.style.width = '200px';
dropElement.style.height = '100px';
dropElement.addEventListener('dragover', function(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
  dropElement.style.backgroundColor = 'rgba(0, 255, 0, 0.5)'
}, false);


var _generateListItem = function(innerHTML) {
  return '<li>' + innerHTML + '</li>';
};

var _generateFileSummary = function(file) {
  var s = '<ul>';
  var fileName = escape(file.name);
  s += _generateListItem('Name: ' + fileName);
  s += _generateListItem('Type: ' + file.type);
  s += _generateListItem('Size: ' + file.size);

  if (file.lastModificationDate) {
    s += _generateListItem('Last Modification: ' +
                           file.lastModificationDate.toLocalDateString());
  }
  s += '<li id="' + fileName + '">Content: </li>';
  s += '</ul>';
  return s;
};

dropElement.addEventListener('drop', function(e) {
  e.stopPropagation();
  e.preventDefault();

  // var files = e.target.files;
  var files = e.dataTransfer.files;
  var file;

  var filesString = '';
  for (var i = 0; i < files.length; ++i) {
    file = files[i];
    filesString += '<li>' + _generateFileSummary(file) + '</li>';
  }

  outputElement.innerHTML = '<ul>' + filesString + '</ul>';

  // XXX: Treat files with no content type as text files
  if (file.type.match('')) {
    file.type = 'text';
  }

  var fileReader = new FileReader();
  fileReader.onload = (function(file) {
    return function(e) {
      var listItem = document.getElementById(file.name);
      listItem.innerHTML = 'Content: <pre>' + e.target.result + '</pre>';
    }
  })(file);
  fileReader.readAsText(file);
}, false)

document.documentElement.appendChild(inputElement);
document.documentElement.appendChild(dropElement);
document.documentElement.appendChild(outputElement);


//=========================================================================
// `elementFromPoint' test
//=========================================================================

// `canvas' setup

var canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.zIndex = '99999999';
canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);
document.body.insertBefore(canvas, document.body.firstChild);

var ctx = canvas.getContext('2d');

var connect = function(ctx, e){
  canvas.width = e.clientX - 5;
  canvas.height = e.clientY - 5;

  ctx.lineWidth = '5';
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
  // ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  ctx.beginPath();
  ctx.moveTo(infoBox.offsetWidth + 5,  infoBox.offsetHeight + 5);
  ctx.lineTo(e.clientX - 10, e.clientY - 10);
  ctx.stroke();

  // ctx.moveTo(e.clientX, e.clientY);
  // ctx.arc(e.clientX - 10, e.clientY - 10, 20, 0, 2 * Math.PI, false);
  // ctx.fill();
}


// Info box

var infoBox = document.createElement('div');
infoBox.style.zIndex = '99999999';
infoBox.style.backgroundColor = 'rgba(23, 32, 42, 0.35)';
infoBox.style.border = '1px solid #343434';
infoBox.style.borderRadius = '5px';
infoBox.style.padding = '3px';
infoBox.style.fontSize = '1.7em';
infoBox.style.fontFamily = 'Helvetica, sans-serif';
infoBox.style.position = 'fixed';
infoBox.style.top = '5px';
infoBox.style.left = '5px';
infoBox.style.color = '#FDFDFD';
infoBox.style.boxShadow = '2px 2px 10px 6px #AEAEAE';
infoBox.innerHTML = 'Element Info';
document.documentElement.appendChild(infoBox);


// Element detection

var elements = document.getElementsByTagName('*');
var element;

for (var i = 0; i < elements.length; ++i) {
  element = elements[i];
  element.onmouseover = function(e) {
    infoBox.innerHTML = document.elementFromPoint(e.clientX,
                                                  e.clientY).tagName
  };

  element.onmousemove = function(e) {
    connect(ctx, e);
  };
}


//=========================================================================
// Random element positioning
//=========================================================================

var rand = function(from, to) {
  var from = from || 0;
  return Math.floor(Math.random() * (to - from + 1) + from);
}

var element;
var originalStyle = {};
var radius;
if (window.innerWidth > window.innerHeight) {
  radius = window.innerHeight / 2;
} else {
  radius = window.innerWidth / 2;
}
var numElements = 10;

var elementWidth;
var elementHeight;
var PADDING = 20;

for (var i = 0; i < numElements; ++i) {
  // elementWidth = rand(50, 200);
  // elementHeight = rand(50, 100);
  elementWidth = 100;
  elementHeight = 100;

  element = document.createElement('div');
  element.setAttribute('class', 'hover-element');
  element.innerHTML = rand(0, 500);
  element.style.transition = 'all 0.5s';
  element.style.width = elementWidth;
  element.style.height = elementHeight;
  element.style.position = 'absolute';
  element.style.borderRadius = '100%';
  element.style.boxShadow = '0 0 20px 30px rgba(160, 160, 160, 0.3)';
  // element.style.top = '' + rand(0, window.innerHeight);
  // element.style.left = '' + rand(0, window.innerWidth);

  element.style.left = window.innerWidth / 2 + radius *
    Math.cos(2 * i * Math.PI / numElements) - elementWidth / 2 + 'px';
  element.style.top = window.innerHeight / 2 + radius *
    Math.sin(2 * i * Math.PI / numElements) - elementHeight / 2 + 'px';

  element.style.backgroundColor = 'rgb(' + rand(0, 255) + ', ' +
    rand(0, 255) + ', ' + rand(0, 255) + ')';
  element.style.color = '#FDFDFD';

  element.onmouseover = function(e) {
    // Store away original styles
    originalStyle.zIndex =
      window.getComputedStyle(e.target).getPropertyValue('z-index');
    originalStyle.border =
      window.getComputedStyle(e.target).getPropertyValue('border');
    originalStyle.padding =
      window.getComputedStyle(e.target).getPropertyValue('padding');
    originalStyle.left =
      window.getComputedStyle(e.target).getPropertyValue('left');
    originalStyle.top =
      window.getComputedStyle(e.target).getPropertyValue('top');
    originalStyle.boxShadow =
      window.getComputedStyle(e.target).getPropertyValue('box-shadow');
    originalStyle.cursor =
      window.getComputedStyle(e.target).getPropertyValue('cursor');

    // Set new styles
    e.target.style.zIndex = '99999999';
    e.target.style.border = '5px solid #FF0000';
    e.target.style.padding = PADDING + 'px';
    e.target.style.boxShadow = '0 0 0 0 rgba(255, 255, 255, 0.0)';
    e.target.style.cursor = 'pointer';

    var left = window.getComputedStyle(e.target).getPropertyValue('left');
    e.target.style.left = parseInt(left.substring(0, left.length - 2)) -
      PADDING / 2 + 'px';
    var top = window.getComputedStyle(e.target).getPropertyValue('top');
    e.target.style.top = parseInt(top.substring(0, top.length - 2)) -
      PADDING / 2 + 'px';

    // var paddingLeft = window.getComputedStyle(e.target).getPropertyValue(
    //   'padding-left');
    // var paddingRight = window.getComputedStyle(e.target).getPropertyValue(
    //   'padding-right');
    // var paddingTop = window.getComputedStyle(e.target).getPropertyValue(
    //   'padding-top');
    // var paddingBottom = window.getComputedStyle(e.target).getPropertyValue(
    //   'padding-bottom');
    // var left = window.getComputedStyle(e.target).getPropertyValue(
    //   'left');
    // var top = window.getComputedStyle(e.target).getPropertyValue(
    //   'top');
    // e.target.style.left =
    //   parseInt(left.substring(0, left.length - 2)) -
    //   parseInt(paddingLeft.substring(0, paddingLeft.length - 2)) +
    //   parseInt(paddingRight.substring(0, paddingLeft.length - 2)) + 'px';
    // e.target.style.top =
    //   parseInt(top.substring(0, top.length - 2)) -
    //   parseInt(paddingTop.substring(0, paddingLeft.length - 2)) +
    //   parseInt(paddingBottom.substring(0, paddingLeft.length - 2)) + 'px';
  };

element.onmouseout = function(e) {
  // Restore original styles
  // e.target.style.zIndex = originalStyle.zIndex;
  // e.target.style.border = originalStyle.border;
  var styleName;
  var keys = Object.keys(originalStyle);
  for (var i = 0; i < keys.length; ++i) {
    styleName = keys[i];
    e.target.style[styleName] = originalStyle[styleName];
  }
};

element.onclick = function(e) {
  document.documentElement.style.backgroundColor =
    window.getComputedStyle(e.target).getPropertyValue('background-color');

  var elems = document.getElementsByClassName('hover-element');

  for (var i = 0; i < elems.length; ++i) {
    elems[i].style.padding = '40px';
  }

  window.setTimeout(function(e) {
    for (var i = 0; i < elems.length; ++i) {
      elems[i].style.padding = '0px';
    }
  }, 1000)

}

document.documentElement.appendChild(element);
}

//=========================================================================
// Forms test
//=========================================================================

var forms = document.forms;
var form;
var formFields;
var formField;

for (var i = 0; i < forms.length; ++i) {
  form = forms[i];
  formFields = Object.keys(form);
  for (var j = 0; j < formFields.length; ++j) {
    formField = form[formFields[j]];
    console.log(formField.type + ' - ' + formField.value);  // DEBUG
  }
}


//=========================================================================
// Add TogetherJS to a website
//=========================================================================

// XXX:
//   1. It does not make sense to load TogetherJS for a domain that does
//      not push TogetherJS to all clients. Collaboration will not be
//      possible.
//   2. TogetherJS's JavaScript file is not wrapped in a manner that allows
//      for it to be dynamically loaded into a `<script>' element.

// Create `<script>' element
var togetherJSScript = document.createElement('script');
togetherJSScript.setAttribute('type', 'test/javascript');
togetherJSScript.setAttribute(
  'src', 'https://togetherjs.com/together-js-min.js');
togetherJSScript.text = 'alert("Hello")';
togetherJSScript.setAttribute('onreadystatechange', function() {
  if (this.readyState == 'complete') {
    alert('Ready.');
    TogetherJS.reinitialize();
  }
});


// Create `<button>' element
var togetherJSButton = document.createElement('button');
togetherJSButton.setAttribute('onclick', 'TogetherJS(this); return false;')
togetherJSButton.innerHTML = 'Start TogetherJS';

// Append script + button to the document
document.body.appendChild(togetherJSScript);
document.documentElement.appendChild(togetherJSButton);


//=========================================================================
// jQuerify
//=========================================================================

var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('type', 'text/javascript');
jQueryScript.setAttribute(
  'src', '//ajax.googleapis.com/ajax/libs//jquery/1.10.2/jquery.min.js');

document.body.appendChild(jQueryScript);


//=========================================================================
// Chromium-specific: Copy title + URL to clipboard as org-entry
//=========================================================================

copy('** ' + document.title + '\n' + document.location + '\n');


//=========================================================================
// Open a list of URLs
//=========================================================================

var urls = [
  "http://www.wikipedia.org"
  , "http://www.youtube.com"
  , "http://www.example.com"
];

for (var i = 0; i < urls.length; ++i) {
  window.open(urls[i])
}

//=========================================================================
// StackExchange
//=========================================================================

// Site:
//   http://stackexchange.com/about/team

// var elements =
//   document.getElementsByClassName('employee-position');
var elements =
  document.getElementsByClassName('employee-location');

var positions = '';

for (var i = 0; i < elements.length; ++i) {
  positions += elements[i].innerHTML + '\n';
}

console.log(positions);  // DEBUG


//=========================================================================
// Get a list of all classes (non-unique)
//=========================================================================

var unique = function(arr, returnFrequencyList) {
  returnFrequencyList = returnFrequencyList || null;

  var u = {};
  var a = [];
  var key = '';

  for (var i = 0; i < arr.length; i++) {
    key = arr[i];
    if (!u.hasOwnProperty(key)) {
      a.push(key);
      u[key] = 1;
    } else {
      u[key] += 1;
    }
  }

  if (returnFrequencyList) {
    return u;
  } else {
    return a;
  }
}

var elements = document.querySelectorAll('*');
var classes_non_unique = [];

for (var i = 0; i < elements.length; i++) {
  classes_non_unique.push(elements[i].getAttribute('class'));
}

var classes_frequency_list = unique(classes_non_unique, true);

keys = Object.keys(classes_frequency_list);

for (var i = 0; i < keys.length; i++) {
  key = keys[i];
  console.log(key + ': ' + classes_frequency_list[key]);  // DEBUG
}

// TODO: Sort the frequency list `classes_frequency_list' by frequency


//=========================================================================
// Get a list of all objects on the current site
//=========================================================================

var objects = [];
var allThings = {};

var walkObjects = function(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = obj[key];

    // Objects only
    if (value && typeof value == 'object') {
      if (objects.indexOf(value) < 0) {
        objects.push(value);
        walkObjects(value);
      }
    }

    // All things (obects, strings, integers, etc.)
    if (allThings[typeof value]) {
      allThings[typeof value].push(value)
    } else {
      allThings[typeof value] = [];
    }
  }
};

walkObjects(this);

// Objects only
console.log(objects.length);  // DEBUG

// All things (obects, strings, integers, etc.)
var allThingsKeys = Object.keys(allThings);
var allThingsNum = 0;
for (var i = 0; i < allThingsKeys.length; i++) {
  var key = allThingsKeys[i];
  var value = allThings[key];
  console.log(key + ': ' + value.length);  // DEBUG
  allThingsNum += value.length;
}
console.log('Total: ' + allThingsNum);  // DEBUG

// // Strings
// var allStrings = allThings['string'];
// var stringKeys = Object.keys(allStrings);
// for (var i = 0; i < stringKeys.length; i++) {
//   console.log(allStrings[stringKeys[i]]);  // DEBUG
// }
