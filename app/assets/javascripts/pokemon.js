// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

PokemonApp.Pokemon = function (pokemonUri) {
	this.id = PokemonApp.idForumUri(pokemonUri);
};

PokemonApp.Pokemon.prototype.render = function () {
	console.log("Rendering pokemon: #" + this.id);

	$.ajax({
		url:"/api/pokemon/" + this.id,
		success: function(response) {
			// console.log(response)
			var spriteUri = response.sprites[0].resource_uri
			var idSprite = PokemonApp.idForumUri(spriteUri)

			$.ajax({

				url:"/api/sprite/" + idSprite,
				success: function(response) {

					var imgUri = response.image;
					var imgFile = PokemonApp.idForumUri(imgUri,-1);
					var imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + imgFile

					$(".js-pkmn-image").attr("src", imgUrl);		
					$(".js-pkmn-name").text(response.name);
					$(".js-pkmn-number").text(response.pkdx_id);
					$(".js-pkmn-height").text(response.height);
					$(".js-pkmn-weight").text(response.weight);
					$(".js-pkmn-hp").text(response.hp);
					$(".js-pkmn-attack").text(response.attack);
					$(".js-pkmn-defense").text(response.defense);
					$(".js-pkmn-sp_atk").text(response.sp_atk);
					$(".js-pkmn-sp_def").text(response.sp_def);
					$(".js-pkmn-speed").text(response.speed);
					
					
						var types = "";
						var arrayTypes = response.types;
						arrayTypes.forEach(function(type){
							types += type.name + " ";
						})

				  $(".js-pkmn-type").text(types);

					$(".js-pokemon-modal").modal("show");		
			
				}
			});
			
		}


	});

};

PokemonApp.idForumUri = function (pokemonUri, position = -2) {
	var uriSegments = pokemonUri.split("/");
	var secondLast = uriSegments.length + position;
	return uriSegments[secondLast];
};

$(document).on("ready",function (){
	$(".js-show-pokemon").on("click",function(event){
		var $button = $(event.currentTarget);
		var pokemonUri = $button.data("pokemon-uri");

		var pokemon = new PokemonApp.Pokemon(pokemonUri);
		pokemon.render();
	});
});
