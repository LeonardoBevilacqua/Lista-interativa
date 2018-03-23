/**
 * index.js
 * - All our useful JS goes here, awesome!
 */
// Efeito de seta para X e vice versa, e deleta a linha ao clicar

function carregaLista(){
	for(var i = 0; i < 6; i++){
		var novoItem = $('<input type="text" value="Item ' + i + '" disabled />');

		var li = $("<li></li>");
		$(li)
			.append('<i class="delete fas fa-caret-right fa-fw"></i>')
			.append(novoItem)
			.append('<i class="edit fas fa-edit fa-fw"></i>');

		$("ul").append(li);
	}
}
carregaLista();

var valor;
$(document).on(
	{
		mouseenter: function() {
			$("svg.delete").not(this).toggleClass("fa-caret-right");
			$(this).toggleClass("fa-times");
		},
		mouseleave: function() {
			$(this).toggleClass("fa-caret-right");
		},
		mousedown: function() {
			var parent = $(this).parent();
			$(parent).remove();
		}
	},
	"svg.delete"
);

// Ativa o editar campo e altera o icone
$(document).on("click", "svg.edit", function() {
	var parent = $(this).parent();
	var input = $(parent).children("input");
	valor = $(input).val();

	$(this).toggleClass("fa-check-square");
	$(parent).children("svg.delete").toggleClass("fa-times");
	$(input)
		.removeAttr("disabled")
		.focus();
});

// ao perder foco retorna o icone e o campo ao estado normal
$(document).on("focusout", "li input", function() {
	var parent = $(this).parent();
	var svg = $(parent).children("svg.edit");
	$(this).val(valor);
	
	$(svg).toggleClass("fas fa-edit");
	$(parent).children("svg.delete").toggleClass("fa-caret-right");
	$(this).attr("disabled", "disabled");
});

// alterar campo
$(document).on("mousedown", ".fa-check-square", function() {
	var input = $(this).parent()
		.children("input");
	
	valor = $(input).val();
});

// Inicia form de adição
$(document).on("click", "svg.addInit", function() {
	$("form")
		.removeClass("invisivel")
		.addClass("visivel");
	$(this)
		.removeClass("fa-plus-square")
		.addClass("fa-minus-square");

	$("form input").focus();
});

$("form").submit(function(e) {
	e.preventDefault();
	var valor = $(this)
		.find("input")
		.val();
	var novoItem = $('<input type="text" value="' + valor + '" disabled />');

	var li = $("<li></li>");
	$(li)
		.append('<i class="delete fas fa-caret-right fa-fw"></i>')
		.append(novoItem)
		.append('<i class="edit fas fa-edit fa-fw"></i>');

	$("ul").append(li);

	$(this)[0].reset();
});

// Fecha o form
$(document).on("blur", "form input", function() {
	var parent = $("div.add");
	var svg = $(parent).children("svg.addInit");

	$(svg)
		.removeClass("fa-minus-square")
		.addClass("fa-plus-square");
	$("form")
		.removeClass("visivel")
		.addClass("invisivel");
});
