var BASE_URL = 'http://sicof.doctum.edu.br/';
var aluno = localStorage.getItem('aluno');
var unidade = localStorage.getItem('unidade');
$$(function() {
	var load = function (aluno,unidade) {
		
		if (aluno != null) {
			$$("#login-header").hide();
			$$("#main-header").show();
			$$("#form-login").removeClass("active");
			$$("#home").addClass("active");
			$$.json(
				BASE_URL+'notasMobile.php',
				{
					aluno:aluno,
					unidade:unidade
				},
				function(dados) {
					console.log(dados);
					for(var disciplina in dados){
						/**
						* Montando Menu-lateral
						**/
						$$('#aside-itens').append('\
							<li data-view-article="'+dados[disciplina].abrev+'" data-icon="list" class="dinamic"> \
								<strong>'+disciplina+'</strong> \
							</li>'
						);
		
						/**
						* Montando página inicial
						**/
						if (parseFloat(dados[disciplina].nota)<70) {
							cor = 'red';
						} else{
							cor = 'blue';
						}
						$$('#home-itens').append('\
							<li>\
								<a href="#" data-view-article="'+dados[disciplina].abrev+'"> <div class="on-right grade "> <span class="'+cor+'">'+parseFloat(dados[disciplina].nota).toFixed(1)+'</span></div>\
									<strong>'+disciplina+'</strong>\
								</a>\
								<!--<small>Nota: <span class="'+cor+'">'+parseFloat(dados[disciplina].nota).toFixed(1)+'</span></small>-->\
							</li>'
						);
		
						/**
						* Montando paginas das disciplinas
						**/
		
						$$('#main').append('\
							<article class="list indented dinamic" id="'+dados[disciplina].abrev+'">\
								<li class="">\
									<div class="on-right"> Nota </div>\
									Agendamentos\
									<small>'+disciplina+'</small>\
								</li>\
							</article>'
						);
		
						/**
						* Montando os agendamentos das disciplinas
						**/
						i=0;
						agendamentos='';
						for(var etapa in dados[disciplina].etapas){
							
							/**
							* Montado etapas
							**/
							if (parseFloat(dados[disciplina].etapas[etapa].nota) < parseFloat(dados[disciplina].etapas[etapa].pontos)*0.7) {
								cor = 'red';
							} else{
								cor = 'blue';
							}
							agendamentos=agendamentos+'\
								<li class="theme">\
									<div class="on-right grade "> <span class="'+cor+'">'+parseFloat(dados[disciplina].etapas[etapa].nota).toFixed(1)+'</span></div>\
									<strong>'+etapa+'</strong>\
								</li>\
								<ul id="#agenda-'+dados[disciplina].abrev+'-'+i+'">';
		
							for (var agendamento in dados[disciplina].etapas[etapa].agenda){
								if (parseFloat(dados[disciplina].etapas[etapa].agenda[agendamento].nota) < parseFloat(dados[disciplina].etapas[etapa].agenda[agendamento].valor)*0.7) {
									cor = 'red';
								} else{
									cor = 'blue';
								}
								agendamentos = agendamentos + '\
									<li>\
										<div class="on-right grade "> <span class="'+cor+'">'+parseFloat(dados[disciplina].etapas[etapa].agenda[agendamento].nota).toFixed(1)+'</span></div>\
										<strong>'+dados[disciplina].etapas[etapa].agenda[agendamento].nome+'</strong>\
										<small>Data: '+dados[disciplina].etapas[etapa].agenda[agendamento].data+'</small>\
										<small>Valor: '+dados[disciplina].etapas[etapa].agenda[agendamento].valor+'</small>\
									</li>'
								;
							}
		
							agendamentos=agendamentos+'\
								</ul>';
							
							i++;
						}
						$$('#'+dados[disciplina].abrev).append(agendamentos);
					}
					$$('#aside-itens').append('\
						<li data-view-article="form-login" data-icon="signout" class="dinamic" id="logout"> \
							<span class="icon signout"></span>\
							<strong>Sair</strong> \
						</li>'
					);
				}
			);
		}else{
			$$("#main-header").hide();
			$$("#login-header").show();
			$$("#home").removeClass("active");
			$$("#form-login").addClass("active");
		}
		return this;
	};


	$$("#refresh").tap(function() {
		$$("#home-itens").html('');
		$$(".dinamic").remove();
		load(aluno,unidade);
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
				unidade : $$("#unidade").val(),
				aluno : $$("#aluno").val(),
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
					aluno = $$("#aluno").val();
					unidade = $$("#unidade").val();
					if ( $$("#lembrar")[0].checked) {
						localStorage.setItem('aluno',aluno);
						localStorage.setItem('unidade',unidade);
					};
					$$("#main").attr('data-aside','features');
					load(aluno,unidade);
				};
			},
		});
	});
	load(aluno,unidade);
});