var BASE_URL = 'http://192.168.10.108/eleitores/back/';
var usuario = localStorage.getItem('usuario');
$$(function() {
	var load = function (usuario) {
		
		if (true/*usuario != null*/) {
			$$("#login-header").hide();
			$$("#main-header").show();
			$$("#form-login").removeClass("active");
			$$("#home").addClass("active");
			for(var cidade in dados){
				$$("#cidades-itens").append('<li><a herf="#" data-view-section="'+dados[cidade].slug+'-bairros">'+dados[cidade].cidade+'</a></li>');
				$$("body").append('\
					<section id="'+dados[cidade].slug+'-bairros" data-transition="slide" classe="drag">\
						<header id="'+dados[cidade].slug+'-header">\
							<nav>\
								<a href="#" data-view-aside="'+dados[cidade].slug+'-aside" data-icon="menu"></a>\
							</nav>\
							<nav class="on-right">\
								<a id="refresh" href="#" data-view-section="main" data-icon="home"></a>\
							</nav>\
						</header>\
						<article id="'+dados[cidade].slug+'-bairros" class="list scroll indented active">\
							<li class="theme">\
								<strong>Bairros de '+dados[cidade].cidade+'</strong>\
							</li>\
							<ul id="'+dados[cidade].slug+'-bairros-itens">\
							</ul>\
						</article>\
						<footer>\
							<nav>\
								<a data-view-section="main" class=" icon arrow-left" ></a>\
							</nav>\
						</footer>\
					</section>\
				');
				$$("body").append('\
					<section id="'+dados[cidade].slug+'-ruas" data-transition="slide" classe="drag">\
						<header id="'+dados[cidade].slug+'-ruas-header">\
							<nav>\
								<a href="#" data-view-aside="'+dados[cidade].slug+'-aside" data-icon="menu"></a>\
							</nav>\
							<nav class="on-right">\
								<a id="refresh" href="#" data-view-section="main" data-icon="home"></a>\
							</nav>\
						</header>\
						<footer>\
							<nav>\
								<a data-view-section="'+dados[cidade].slug+'-bairros" class="icon arrow-left" ></a>\
							</nav>\
						</footer>\
					</section>\
				');	
				for(bairro in dados[cidade].bairros){
					$$('#'+dados[cidade].slug+'-bairros-itens').append('<li><a herf="#" data-view-section="'+dados[cidade].slug+'-ruas" data-view-article="'+dados[cidade].slug+'-'+dados[cidade].bairros[bairro].slug+'">'+dados[cidade].bairros[bairro].bairro+'</a></li>');
					$$('#'+dados[cidade].slug+'-ruas').append('\
						<article id="'+dados[cidade].slug+'-'+dados[cidade].bairros[bairro].slug+'" class="list scroll indented ">\
							<li class="theme">\
								<div class="on-right">'+dados[cidade].cidade+'</div>\
								<strong>Ruas do '+dados[cidade].bairros[bairro].bairro+'</strong>\
							</li>\
							<ul id="'+dados[cidade].slug+'-'+dados[cidade].bairros[bairro].slug+'-ruas">\
							</ul>\
						</article>\
					');
					for(rua in dados[cidade].bairros[bairro].ruas){
						$$('#'+dados[cidade].slug+'-'+dados[cidade].bairros[bairro].slug+'-ruas').append('<li><a herf="#" data-view-section="listagem-eleitores">'+dados[cidade].bairros[bairro].ruas[rua]+'</a></li>')
					}
				}
			}
		}else{
			$$("#main-header").hide();
			$$("#login-header").show();
			$$("#home").removeClass("active");
			$$("#form-login").addClass("active");
		}
		return this;
	};

/*
	$$("#refresh").tap(function() {
		$$("#home-itens").html('');
		$$(".dinamic").remove();
		load(usuario);
	});
	$$("#logout").tap(function() {
		localStorage.clear();
		location.reload();
		
	});
	$$("#submit").tap(function() {
		if($$("#unidade").val()==""){
			Lungo.Notification.error(
						"Erro",
						"Informe a unidade",
						"warning-sign",
						3,
						function() {
							location.reload();
						}
					);
			return false;
		}
		$$.ajax({
			type: 'GET', // defaults to 'GET'
			url: BASE_URL+'loginMobile.php',
			data:{
				usuario : $$("#usuario").val(),
				senha : $$("#senha").val()
			},
			dataType: 'json', //'json', 'xml', 'html', or 'text'
			async: true,
			success: function(ret) {
				
				if (ret.erro==1 ) {
					Lungo.Notification.error(
						"Erro",
						"Login ou senha incorretos",
						"warning-sign",
						3,
						function() {
							location.reload();
						}
					);
				} else{
					usuario = $$("#usuario").val();
					if ( $$("#lembrar")[0].checked) {
						localStorage.setItem('usuario',usuario);
					};
					$$("#main").attr('data-aside','features');
					load(usuario);
				};
			},
		});
	});*/
	load(usuario);
});