(function(){

// Autoresize Textareas
$("textarea").autosize();

/*$("input").first().on("focus", function(){
	$(this).trigger("keyup");
});*/

$("select").on("change", function(){
	$("input").first().trigger("keyup");
});
	// Update number of characters entered in sequence
	$("input").first().on("keyup", function(){
		var userInput = $(this).attr("value");
		var charnum = userInput.length;
		$(this).next().attr("value", charnum);
		if(charnum==1){
			var helper = "Just one nucleotide long sequence? Give me more.";
		}
		else if(charnum==0){
			var helper = "Let's try another sequence.";
		}
		else if(charnum <5){
			var helper = "This much won't do. I want more."
		}
		else if(charnum <10){
			var helper = "Sorry, still very few nucleotides. Give me some more.";
		}
		else if(charnum <15){
			var helper = "Still very less. Add some more bases.";
		}
		else if(charnum <20){
			var helper = "Good, Just give me a few more bases.";
		}
		else {
			var sequence = $(this).attr("value");
			sequence = sequence.toUpperCase();
			var result = sequid(sequence);
			var helper = "Your sequence is "+result;
		}
		

		//Display result in help text.
		$("h2#1").html(helper);
		if (result == "DNA"){
			$("div#main2").show();
			$("textarea#21").html(complimentary(sequence)).trigger("oninput");
			$("textarea#22").html(transcribe(sequence)).trigger("oninput");
			len = $("select>option:selected").text();
			$("textarea#hg").html(primers(sequence,len));
		}
		else{
			$("div#main2").hide();
		};
		if(result == "RNA"){
			var main3 = $("div#main3").show();
			main3.children().first().children().html(protein(sequence, "NUM"));
			$("textarea#31").html(protein(sequence,"NAME")).trigger("oninput");
		}
		else{
			$("div#main3").hide();
		};
		if(result == "PROTEIN"){
			var main4 = $("div#main4").show();
			main4.children().first().children().html(protein(sequence, "NUM"));
			$("textarea#41").html(protein(sequence,"NAME")).trigger("oninput");
		}
		else {
			$("div#main4").hide();
		};
	});


})();