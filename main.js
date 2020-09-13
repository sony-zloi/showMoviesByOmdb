let search = document.getElementById('search');
let movieRequest;
let movieRequestDetails;
let inputTitle = document.getElementById('name');
let selectType = document.getElementById('type');
var result;
var resultDetails;
let div_table = document.createElement('div');
let ulPag = document.createElement('ul');
let page = 1;
let divFilms = document.createElement('div');
let divPag = document.createElement('div');
let movieNotFound = document.createElement('div');
let divFilmInfo = document.createElement('div');
let divTableDet = document.createElement('div');
const moviesOnPage = 10;//количество фильмов на страницу

search.onclick = function(){
	getMovies(1);
};

//получение списка фильмо, в качестве входного параметра номер страницы
function getMovies(_page){
	
	div_table.innerHTML = '';
	ulPag.innerHTML = '';
	divFilms.innerHTML = '';
	movieNotFound.innerHTML = '';
	divFilmInfo.innerHTML = '';
	divTableDet.innerHTML = '';
	
	let url = 'http://www.omdbapi.com/?apikey=5864a9f1&page=' + _page +'&plot=short&s=' + inputTitle.value + '&type='+selectType.value;
	
	if(window.XMLHttpRequest){
		movieRequest = new XMLHttpRequest();
	}
		else{
		 movieRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	movieRequest.open('GET', url,'async', 'luqz0r@ya.ru','5864a9f1');
	movieRequest.responseType = "json";

	movieRequest.send();

		movieRequest.onload = function(){
			if(movieRequest.status === 200){
				
				if (movieRequest.response.Error == 'Movie not found!' || movieRequest.response.Error == 'Series not found!') {
					movieNotFound = document.createElement('div');
					movieNotFound.innerHTML = movieRequest.response.Error;
					document.body.append(movieNotFound);
				}
				else {
					showHeader();
					setTimeout(showFilms,1000);
					setTimeout(showPagination,1000);
					
				}
			}
			result = movieRequest.response;
		}
}

//Функция для надписи Films
function showHeader() {

	document.body.append(divFilms);
	divFilms.innerHTML = 'Films: ';
}

//Функция для вывода одной страницы фильмов
function showFilms() {
	
	document.body.append(div_table);
	div_table.setAttribute('id','div-table');
			
	//формируем динамический html код для формирования списка фильмов
			
	for (let i = 0; i < result.Search.length;i++) {
		
		let table = document.createElement('table');
		div_table.appendChild(table);;
				
		let tr = document.createElement('tr');
		table.appendChild(tr);
				
		let td = document.createElement('td');
		tr.appendChild(td);
		td.setAttribute('rowspan','4');
		td.setAttribute('class','td-image');

		let img = document.createElement('img');
		td.appendChild(img);
		img.setAttribute('src',result.Search[i].Poster);
		img.setAttribute('alt','N/A');

		let td_type = document.createElement('td');
		tr.appendChild(td_type);
		td_type.innerHTML = (result.Search[i].Type);
		td_type.setAttribute('style', 'font-weight:normal;')

		let tr_title = document.createElement('tr');
		table.appendChild(tr_title);

		let td_title = document.createElement('td');
		tr_title.appendChild(td_title);
		td_title.innerHTML = (result.Search[i].Title);

		let tr_year = document.createElement('tr');
		table.appendChild(tr_year);

		let td_year = document.createElement('td');
		tr_year.appendChild(td_year);
		td_year.innerHTML = (result.Search[i].Year);
		td_year.setAttribute('style', 'font-weight:normal;')

		let tr_button = document.createElement('tr');
		table.appendChild(tr_button);

		let td_button = document.createElement('td');
		tr_button.appendChild(td_button);

		let detButton = document.createElement('button');
		td_button.appendChild(detButton);
		detButton.setAttribute('id','details');
		detButton.setAttribute('name','details');
		detButton.innerHTML = ('Details');
		detButton.setAttribute('id',result.Search[i].imdbID);
	}
	
	let table = document.getElementById('div-table');
	
	//запрос детальной информации о фильме, используется так называемое 'всплытие/bubbling'
	table.onclick = function(event) {
		let target = event.target.id;
		getDetails(target);
		setTimeout(showDetails,1000);
	};
};


function getDetails(_tt){
	divFilmInfo.innerHTML = '';
	divTableDet.innerHTML = '';
	
	let url = 'http://www.omdbapi.com/?apikey=5864a9f1&plot=full&i=' + _tt;
	
	if(window.XMLHttpRequest){
		movieRequestDetails = new XMLHttpRequest();
	}
	else{
		 movieRequestDetails = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	movieRequestDetails.open('GET', url,'async', 'luqz0r@ya.ru','5864a9f1');
	movieRequestDetails.responseType = "json";

	movieRequestDetails.send();

		movieRequestDetails.onload = function(){
			if(movieRequestDetails.status === 200){
				resultDetails = movieRequestDetails.response;
			}
			else alert("Houston, we have a problem!");
		}
}

//функция для показа детальной информации

function showDetails(){
	
	document.body.append(divFilmInfo);
	divFilmInfo.innerHTML = 'Film info: ';
	
	document.body.appendChild(divTableDet);
	
	let tableDet = document.createElement('table');
	divTableDet.appendChild(tableDet);
	tableDet.setAttribute('class','table-det');

	let trDet = document.createElement('tr');
	tableDet.appendChild(trDet);
	let tdDet = document.createElement('td');
	trDet.appendChild(tdDet);
	tdDet.setAttribute('rowspan','9');
	tdDet.setAttribute('class','td-image');
	
	let imgDet = document.createElement('img');
	tdDet.appendChild(imgDet);
	imgDet.setAttribute('src',movieRequestDetails.response.Poster);
	imgDet.setAttribute('class','img-detail');
	imgDet.setAttribute('alt','N/A');

	let trTitle = document.createElement('tr');
	tableDet.appendChild(trTitle);
	let tdTitle = document.createElement('td');
	trTitle.appendChild(tdTitle);
	tdTitle.innerHTML = ('<b>Title:</b> ' + resultDetails.Title);
	
	let trReleased = document.createElement('tr');
	tableDet.appendChild(trReleased);
	let tdReleased = document.createElement('td');
	trReleased.appendChild(tdReleased);
	tdReleased.innerHTML = ('<b>Released:</b> ' + resultDetails.Released);
	
	let trGenre = document.createElement('tr');
	tableDet.appendChild(trGenre);
	let tdGenre = document.createElement('td');
	trGenre.appendChild(tdGenre);
	tdGenre.innerHTML = ('<b>Genre:</b> ' + resultDetails.Genre);
	
	let trCountry = document.createElement('tr');
	tableDet.appendChild(trCountry);
	let tdCountry = document.createElement('td');
	trCountry.appendChild(tdCountry);
	tdCountry.innerHTML = ('<b>Country:</b> ' + resultDetails.Country);
	
	let trDirector = document.createElement('tr');
	tableDet.appendChild(trDirector);
	let tdDirector = document.createElement('td');
	trDirector.appendChild(tdDirector);
	tdDirector.innerHTML = ('<b>Director:</b> ' + resultDetails.Director);
	
	let trWriter = document.createElement('tr');
	tableDet.appendChild(trWriter);
	let tdWriter = document.createElement('td');
	trWriter.appendChild(tdWriter);
	tdWriter.innerHTML = ('<b>Writer:</b> ' + resultDetails.Writer);
	
	let trActors = document.createElement('tr');
	tableDet.appendChild(trActors);
	let tdActors = document.createElement('td');
	trActors.appendChild(tdActors);
	tdActors.innerHTML = ('<b>Actors:</b> ' + resultDetails.Actors);
	
	let trAwards = document.createElement('tr');
	tableDet.appendChild(trAwards);
	let tdAwards = document.createElement('td');
	trAwards.appendChild(tdAwards);
	tdAwards.innerHTML = ('<b>Awards:</b> ' + resultDetails.Awards); 
}

//формируем переключатель пагинации		
function showPagination () {
	
	let moviesCountOnPage = 1;
	
	document.body.append(divPag);
	divPag.setAttribute('style','width: 70%; margin-left: auto; margin-right: auto;')
	divPag.appendChild(ulPag);
				
	var li = document.createElement('li');
	ulPag.appendChild(li);
	li.setAttribute('id','offsetLeft');
	li.innerHTML = ('<<');

	for (let j = 1; j <= (Math.floor(result.totalResults/moviesOnPage)) + 2; j++){
		var li = document.createElement('li');
		ulPag.appendChild(li);
		if(j == page) { 
			li.innerHTML = (moviesCountOnPage);
			li.classList.add('active-button');		
		}
		else li.innerHTML = (moviesCountOnPage);
		moviesCountOnPage++;
		li.setAttribute('id',j);
	}
	
	document.createElement('li');
	ulPag.appendChild(li);
	li.setAttribute('id','offsetRight');
	li.innerHTML = ('>>');
}

//обработчик для пагинации

ulPag.onclick = function(event) {
  let target = event.target.id; // где был клик?
	if (target == 'offsetLeft') getMovies(--page);
	else if	(target == 'offsetRight')getMovies(++page);
	else {
		page = target;
		getMovies(target);
	}
};
