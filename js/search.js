function clearHighlights() {
  document.querySelectorAll(".highlight").forEach(function (el) {
    el.replaceWith(document.createTextNode(el.textContent));
  });
}
function pageSearch() {
  clearHighlights();
  var term = document.getElementById("pageSearch").value.trim();
  var msg = document.getElementById("searchStatus");
  if (!term) {
    msg.textContent = "Type a word to search this page.";
    return;
  }
  var main = document.querySelector("main");
  var walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, null);
  var nodes = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }
  var count = 0;
  nodes.forEach(function (node) {
    var text = node.nodeValue;
    var index = text.toLowerCase().indexOf(term.toLowerCase());
    if (index >= 0) {
      var span = document.createElement("span");
      span.className = "highlight";
      span.textContent = text.substring(index, index + term.length);
      var after = document.createTextNode(text.substring(index + term.length));
      var before = document.createTextNode(text.substring(0, index));
      node.parentNode.insertBefore(before, node);
      node.parentNode.insertBefore(span, node);
      node.parentNode.insertBefore(after, node);
      node.remove();
      count++;
    }
  });
  msg.textContent = count + ' match(es) found for "' + term + '".';
  if (count > 0) {
    document
      .querySelector(".highlight")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
