window.addEventListener("load", function() {
  function spoilerHeaderClick(evt) {
		var el = evt.target.parentElement;
		var oSB = el.querySelector("div");
		if (el.className == "condensed") {
			el.className = "";
			oSB.style.height = el.fullHeight + "px";
		} else {
			el.className = "condensed";
			oSB.style.height = "0px";
		}
	}

  function lightboxClick(evt) {
		var el = evt.currentTarget;
		var h = el.querySelector("img.full-image").src;
		el = wnd.querySelector("img");
		el.src = h;
		cover.className = "active";
		wnd.className = "active";
	}

  function lightboxCloseClick() {
		cover.className = "";
		wnd.className = "";
	}

	var arrSpoilers = document.querySelectorAll("section aside");
	var el, a;
	for (var i = 0; i < arrSpoilers.length; i++) {
		el = arrSpoilers[i];
		a = el.querySelector("a");
		a.addEventListener("click", spoilerHeaderClick);
		a = el.querySelector("div");
		el.fullHeight = a.clientHeight;
		a.style.height = "0px";
		el.className = "condensed"
	}
	
	var arrLightboxes = document.querySelectorAll("section figure.lightbox a");
  var cover, wnd, el2;
	if (arrLightboxes.length > 0) {
		cover = document.createElement("div");
		cover.id = "lightbox_cover"
		document.body.appendChild(cover);
		wnd = document.createElement("div");
		wnd.id = "lightbox_window"
		wnd.innerHTML = "<div id='lightbox_close'><a href='#'>X</a></div><img src=''>";
		document.body.appendChild(wnd);
		cover.addEventListener("click", lightboxCloseClick);
		el = document.getElementById("lightbox_close");
		el.addEventListener("click", lightboxCloseClick);
		for (var i = 0; i < arrLightboxes.length; i++)
			arrLightboxes[i].addEventListener("click", lightboxClick);
	}
});
