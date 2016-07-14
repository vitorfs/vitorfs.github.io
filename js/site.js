var _ = function (id) {
  return document.getElementById(id);
};

var closeOpenedDropdown = function () {
  var openedDropdownMenu = document.getElementsByClassName("open")[0];
  if (openedDropdownMenu !== undefined) {
    openedDropdownMenu.style.display = "none";
    openedDropdownMenu.className = "dropdown";
  }
};

var openDropdown = function (id) {
  if (_(id).className.match(/\bopen\b/)) {
    _(id).style.display = "none";
    _(id).className = "dropdown";
  }
  else {
    closeOpenedDropdown();
    _(id).style.display = "block";
    _(id).className += " open";
  }
};

_("articlesDropdownButton").onclick = function (evt) {
  evt.stopPropagation();
  openDropdown("articlesDropdownMenu");
  return false;
};

_("openSourceDropdownButton").onclick = function (evt) {
  evt.stopPropagation();
  openDropdown("openSourceDropdownMenu");
  return false;
};

document.getElementsByTagName("body")[0].onclick = closeOpenedDropdown;
