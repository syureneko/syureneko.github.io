function loadJson() {
	let req = new XMLHttpRequest();
	req.open("get", "json/memberList.json", true);
	req.send();
	req.onload = function () {
		onLoadedJsonDataBase(JSON.parse(req.responseText));
	}
}

function onLoadedJsonDataBase(_jsonText) {
	let target = document.getElementById("menberList");
	let titles = ["リーダー","マネージャー","コモンメンバー","ビジター"];
	let div = document.createElement("div");
	div.classList.add("article");
	target.appendChild(div);	
	let views = titles.map(title => createView(div, title));
	jsonData.forEach(data => {
		let index = titles.indexOf(data.type);
		if (index >= 0) {
			createPanel(views[index], data.name, data.path);
		}
	});
	views.forEach(view => {
		if (view.children.length < 0) {
			createPanel(view, "この役職のメンバはいません。", "");
		}
	});
}

function createView(_parent, _title) {
	let h2 = document.createElement("h2");
	h2.classList.add("article-title");
	h2.textContent = _title;
	_parent.appendChild(h2);
	let div = document.createElement("div");
	div.classList.add("content");
	_parent.appendChild(div);
	return content;
}

function createPanel(_parent, _name, _path) {
	let div = document.createElement("div");
	div.classList.add("character_panel");
	_parent.appendChild(div);
	let h3 = document.createElement("h3");
	h3.classList.add("character_name");
	h3.textContent = _name;
	div.appendChild(h3);
	if (_path) {
		let img = document.createElement("img");
		img.classList.add("character_image");
		img.src = "image/character/" + _path;
		div.appendChild(img);
	}
}