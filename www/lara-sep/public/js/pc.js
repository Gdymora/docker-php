window.addEventListener("load", function() {
  function tabHeaderClick(evt) {
		var el = evt.target;
		var a = document.querySelector("section div.tab-visible");
		a.className = "tab";
		var s = el.id;
		var n = s.substr(0, s.indexOf("_"));
		var i = s.substr(s.length - 1, 1);
		a = document.getElementById(n + "_content" + i);
		a.className = "tab tab-visible";
		a = el.parentElement.querySelector("a.active");
		a.className = "";
		el.className = "active";
	}

	var arrTabContents = document.querySelectorAll("section div.tab-content");
	var el, a, arr, n;
	for (var i = 0; i < arrTabContents.length; i++) {
		el = arrTabContents[i];
		arr = el.querySelectorAll("div.tab");
		n = 0;
		for (var j = 0; j < arr.length; j++) {
			a = arr[j];
			if (a.clientHeight > n) n = a.clientHeight;
		}
		el.style.height = n + "px";
	}
	
	var arrTabs = document.querySelectorAll("section div.tab-header a");
	for (var i = 0; i < arrTabs.length; i++)
		arrTabs[i].addEventListener("click", tabHeaderClick);

  function deleteLinkClick(evt) {
    if (!window.confirm("Удалить запись?"))
      evt.preventDefault();
  }
  
	var arrLinks = document.querySelectorAll("a.adel");
	for (var i = 0; i < arrLinks.length; i++)
		arrLinks[i].addEventListener("click", deleteLinkClick);

  var arrChars = [
    ['а', 'a'], ['б', 'b'], ['в', 'v'], ['г', 'g'],
    ['д', 'd'],  ['е', 'e'], ['е', 'yo'], ['ж', 'zh'], ['з', 'z'],
    ['и', 'i'], ['й', 'j'], ['к', 'k'], ['л', 'l'],
    ['м', 'm'],  ['н', 'n'], ['о', 'o'], ['п', 'p'],  ['р', 'r'],
    ['с', 's'], ['т', 't'], ['у', 'u'], ['ф', 'f'],
    ['х', 'h'],  ['ц', 'c'], ['ч', 'ch'],['ш', 'sh'], ['щ', 'ssh'],
    ['ъ', ''],  ['ы', 'y'], ['ь', ''],  ['э', 'e'], ['ю', 'yu'],
    ['я', 'ya'], [' ', '-']
  ];

  function txtSourceInput() {
    var s = txtSource.value.toLowerCase();
    for (i in arrChars)
      s = s.replace(new RegExp(arrChars[i][0], "g"), arrChars[i][1]);
    txtDestination.value = s;
  }

  var txtSource = document.querySelector("input.source");
  var txtDestination = document.querySelector("input.destination");
  if ((txtSource) && (txtDestination))
    txtSource.addEventListener("input", txtSourceInput);

  function getFileList(sUrl, bIsAsync) {
    oAJAX = new XMLHttpRequest();
    oAJAX.open("GET", sUrl, bIsAsync);
    oAJAX.onreadystatechange = function() {
      if ((oAJAX.readyState == 4) && (oAJAX.status == 200)) {
        var oData = JSON.parse(oAJAX.responseText);
        if (oData.data.length > 0) {
          var oList = document.getElementById("fileList_" + oData.data[0].type);
          var s = "<div class='pag'>";
          if (oData.next_page_url)
            s += "<a href='" + oData.next_page_url + "'>&lt;</a>";
          s += "</div>";
          var d;
          for (var i = oData.data.length - 1; i >= 0; i--) {
            d = oData.data[i];
            s += "<div class='item'><div class='content'>";
            switch (d.type) {
              case 0:
                s += "<img src='/files/" + d.id + "'>";
                break;
              case 1:
                s += "<audio controls preload='metadata' src='/files/" +
                d.id + "'>";
                break;
              case 2:
                s += "<video controls preload='metadata' src='/files/" +
                d.id + "'>";
                break;
              case 3:
                s += "<img src='/public/archive.png'>";
                break;
            }
            s += "</div><div class='description'>" + d.description +
            "</div><a href='/files/" + d.id + "' class='file-insert' type='" +
            d.type + "' description='" + d.description + "'" +
            ">Вставить</a><div class='file-delete'><a href='/files/" +
            d.id + "/delete?type=" + d.type + "&count=" + itemCount +
            "&page=" + oData.current_page + "'>X</a></div></div>";
          }
          s += "<div class='pag'>";
          if (oData.prev_page_url)
            s += "<a href='" + oData.prev_page_url + "'>&gt;</a>";
          s += "</div>";
          oList.innerHTML = s;
          var col = oList.querySelectorAll("div.pag a");
          for (var i = 0; i< col.length; i++) {
            col[i].addEventListener("click", filePagClick);
          }
          var col = oList.querySelectorAll("div.file-delete a");
          for (var i = 0; i< col.length; i++) {
            col[i].addEventListener("click", fileDeleteClick);
          }
          var col = oList.querySelectorAll("a.file-insert");
          for (var i = 0; i< col.length; i++) {
            col[i].addEventListener("click", fileInsertClick);
          }
        }
      }
    }
    oAJAX.send();
  }

  function fileInsertClick(evt) {
    var oContent = document.querySelector("textarea[name=content]");
    var content = oContent.value;
    var pos = oContent.selectionStart;
    var s = content.substring(0, pos);
    var desc = evt.target.getAttribute("description");
    switch (evt.target.getAttribute("type")) {
      case "0":
        s += evt.target.getAttribute("href");
        break;
      case "1":
        s += "\r\n[audio]" + evt.target.getAttribute("href") + "[/audio]\r\n" +
        "[sign]" + desc + "[/sign]\r\n";
        break;
      case "2":
        s += "\r\n[video]" + evt.target.getAttribute("href") + "[/video]\r\n" +
        "[sign]" + desc + "[/sign]\r\n";
        break;
      case "3":
        s += "[url=" + evt.target.getAttribute("href") + "]" + desc + "[/url]";
        break;
    }
    s += content.substring(pos);
    oContent.value = s;
    evt.preventDefault();
  }
  
  function filePagClick(evt) {
    getFileList(evt.target.href, true);
    evt.preventDefault();
  }

  function fileDeleteClick(evt) {
    if (window.confirm("Удалить этот файл?"))
      getFileList(evt.target.href, true);
    evt.preventDefault();
  }

  function iframeLoad(evt) {
    var parent = evt.target.parentElement;
    var o = parent.querySelector("div.filelist");
    getFileList(o.getAttribute("href"), true);
    o = parent.querySelector("form");
    o.reset();
  }
  
  var itemCount = 0;
  for (var i = 0; i < 4; i++) {
    var oList = document.getElementById("fileList_" + i);
    if (itemCount == 0)
      itemCount = Math.floor((oList.clientWidth - 100) / 252);
    oList.setAttribute("href", "/files?type=" + i + "&count=" + itemCount);
    getFileList(oList.getAttribute("href"), false);
  }
  var col = document.body.getElementsByTagName("iframe");
  for (var i = 0; i < col.length; i++) {
    col[i].addEventListener("load", iframeLoad, false);
  }

  var btnSave = document.getElementById("btnSave");
  var btnLoad = document.getElementById("btnLoad");
  if ((btnSave) && (btnLoad)) {
    var txtTitle = document.querySelector("input[name=title]");
    var txtSlug = document.querySelector("input[name=slug]");
    var txtDescription = document.querySelector("textarea[name=description]");
    var txtContent = document.querySelector("textarea[name=content]");
    var lstSubcategory = document.querySelector("select[name=subcategory]");
    var oLS = window.localStorage;
    btnSave.addEventListener("click", function() {
      if ((txtTitle.value) && (txtContent.value)) {
        oLS.setItem("title", txtTitle.value);
        oLS.setItem("slug", txtSlug.value);
        oLS.setItem("description", txtDescription.value);
        oLS.setItem("content", txtContent.value);
        oLS.setItem("subcategory", lstSubcategory.value);
      }
    });
    btnLoad.addEventListener("click", function() {
      if ((oLS.getItem("title")) && (oLS.getItem("content"))) {
        txtTitle.value = oLS.getItem("title");
        txtSlug.value = oLS.getItem("slug");
        txtDescription.value = oLS.getItem("description");
        txtContent.value = oLS.getItem("content");
        lstSubcategory.value = oLS.getItem("subcategory");
      }
    });
  }
});
