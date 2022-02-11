var APIKey = "43412397038150732083dc0e001c06af";
// var APIKey = "cf4ee7307cee2a32f38e2035372ceeb7";


fetch(`https://gnews.io/api/v4/top-headlines?lang=en&country=us&token=${APIKey}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for(let i = 0; i < data.articles.length; i++) {
        	let html = `<div class="content">
			        		<a href="${data.articles[i].url}" target="_blank"><img src=${data.articles[i].image} alt="Image ${i}"></a>		
							<a href="${data.articles[i].url}" target="_blank"><h4>${data.articles[i].title}</h4></a>
							<p>${data.articles[i].publishedAt}</p>
							<span>${data.articles[i].description}</span>
						</div>`
			$("main").append(html);
        }
    })
    .catch((error) => {
    	alert(error);
    });

function searchFunction () {
	$(".preloader").fadeIn();

	let search = $(".input-keyword").val();
	
	let from = new Date($("#input-date-from").val());
	let to = new Date($("#input-date-to").val());

	from = from.toISOString();
	from = from.replace(".000", "")
	to = to.toISOString();
	to = to.replace(".000", "")

	fetch(`https://gnews.io/api/v4/search?q=${search}&from=${from}&to=${to}&lang=en&country=us&token=${APIKey}`)
		.then((response) => {
		   	return response.json();
		})
		.then(function (data) {
		   if (data.articles.length === 0) {
		    	alert(`No result found or date range is invalid. Please try again!`);
		    }
		    else {
				$("main").html("");
			    for(let i = 0; i < data.articles.length; i++) {
			        let html = `<div class="content">
			        				<a href="${data.articles[i].url}" target="_blank"><img src=${data.articles[i].image} alt="Image ${i}"></a>
									<a href="${data.articles[i].url}" target="_blank"><h4>${data.articles[i].title}</h4></a>
									<p>${data.articles[i].publishedAt}</p>
									<span>${data.articles[i].description}</span>
								</div>`
					$("main").append(html);
			    }
		    }	
		})
		.catch((error) => {
		   	alert(error);
		})
	    .finally(() => {
			$(".preloader").fadeOut();
	    });
}

$(window).on("load", () => {
	$(".preloader").fadeOut();
})

$(document).ready(function () {
	$(".search-icon").click(() => {
		$(".my-modal").toggleClass("my-modal-activated");
		$(".search-modal").toggleClass("search-modal-activated");
		$(".search-icon").css("display", "none");
		$(".input-keyword").select();
		$("body").css("overflow", "hidden");
	})

	$(".times-icon, .my-modal").click(() => {
		$(".my-modal").toggleClass("my-modal-activated");
		$(".search-modal").toggleClass("search-modal-activated");
		$(".search-icon").css("display", "inline-block");
		$("body").css("overflow", "auto");
	})

	$(".search-modal").click((e) => {
		e.stopPropagation();
	})

	$(".search-btn").click(() => {
		searchFunction();	
		$(".my-modal").toggleClass("my-modal-activated");
		$(".search-modal").toggleClass("search-modal-activated");
		$(".search-icon").css("display", "inline-block");
		$("body").css("overflow", "auto");
	})

	$(".input-keyword, .input-date").keypress((key) => {
		if(key.which == 13) {
			searchFunction();
			$(".my-modal").toggleClass("my-modal-activated");
			$(".search-modal").toggleClass("search-modal-activated");
			$(".search-icon").css("display", "inline-block");
			$("body").css("overflow", "auto");
		}
	})
})