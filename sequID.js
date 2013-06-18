function sequid(sequence){
// Declaring important variables as null
var A="", B="", C="", D="", E="", F="", G="", H="", I="", J="", K="", L="", M="", N="", O="", P="", Q="", R="", S="", T="", U="", V="", W="", X="", Y="", Z="", Space="";

// Scanning sequence
A=sequence.match("A"),B=sequence.match("B"),C=sequence.match("C"),D=sequence.match("D"),E=sequence.match("E"),F=sequence.match("F"),G=sequence.match("G"),H=sequence.match("H"),I=sequence.match("I"),J=sequence.match("J"),K=sequence.match("K"),L=sequence.match("L"),M=sequence.match("M"),N=sequence.match("N"),O=sequence.match("O"),P=sequence.match("P"),Q=sequence.match("Q"),R=sequence.match("R"),S=sequence.match("S"),T=sequence.match("T"),U=sequence.match("U"),V=sequence.match("V"),W=sequence.match("W"),X=sequence.match("X"),Y=sequence.match("Y"),Z=sequence.match("Z"),Space=sequence.match(" ");

// Using RegExpressions for detecting only Alphabets
var onlyalpha = /^[A-Z]+$/;

// Distinguishing between DNA, RNA and Protien.
if(!B && !J && !O && !X && !Z && !Space && onlyalpha.test(sequence))
{
	
	if(!U)
	{
		if(!!A && !!T && !!G && !!C && !R && !N && !D && !Q && !E && !H && !I && !L && !K && !M && !F && !P && !S && !W && !Y && !V)
		{
			result = "DNA"; //DNA, if it has A,T,G,C and not else as protein.
		}
		else if(!!A||!!R||!!N||!!D||!!C||!!Q||!!E||!!G||!!H||!!I||!!L||!!K||!!M||!!F||!!P||!!S||!!T||!!W||!!Y||!!V)
		{
			result = "PROTEIN";
		}
	}
	else if(!!A && !!U && !!G && !!C && !R && !N && !D && !Q && !E && !H && !I && !T && !L && !K && !M && !F && !P && !S && !W && !Y && !V)
	{
		result = "RNA"; //RNA, if it has A,U,G,C and not T.
	}
	else
	{
		result = "Mistyped";
	}
}
else
{
	result = "Invalid";
}
return result;
}

function complimentary(sequence){
	var compli = "Some Error Occurred.";
    // Check if DNA
    if(result=="DNA"){
		    // Replace A(1) T(2) G(3) and C(4)
		    compli = sequence.replace(/A/g, "1");
		    compli = compli.replace(/T/g, "2");
		    compli = compli.replace(/G/g, "3");
		    compli = compli.replace(/C/g, "4");
		    //Replace 1(T) 2(A) 3(C) 4(G)
		    compli = compli.replace(/1/g, "T");
		    compli = compli.replace(/2/g, "A");
		    compli = compli.replace(/3/g, "C");
		    compli = compli.replace(/4/g, "G");
		}
    // Give out complimentary sequence
    return compli;
}
function transcribe(sequence){
	if (result = "DNA") {
		sequence = complimentary(sequence);
		corresRNA = sequence.replace(/T/g,"U");
	};
	return corresRNA;
}
function primers(sequence, len){
	if(result = "DNA"){
		if (len>15) {len = 15;} else if(len<5){ len=5 ;};
		seqlen = sequence.length;
		var fprimer = sequence.slice(0,len);
		fprimer = complimentary(fprimer);
		var bprimer = sequence.slice(seqlen-len,seqlen);
		return "F:"+fprimer+"; "+"B:"+bprimer+";";
	}
}
function splitinto3(seq){
	seq = seq.split("");
	var num = seq.length/3, newseq = "";
	for(i=1; i<=num; i++){
		var n = i*3;
		if(i==num){
			newseq += seq[n-3]+seq[n-2]+seq[n-1];
		}
		else{
			newseq += seq[n-3]+seq[n-2]+seq[n-1]+" ";
		}
	}
	return newseq;
}

function protein(sequence, MODE){
	if (result=="RNA") {
		var startCodon = /AUG/; 
	  	// Search for first AUG [Start Codon]
	  	seq = sequence.split(startCodon);
	  	// Trim till the starting of AUG
	  	seq = sequence.replace(seq[0],"");
	  	// Split the sequence into bases of three each
	  	var newseq = splitinto3(seq).split(" ");
	  	// Search for first UUA||UAG||UGA [Stop Codon]
	  	for(x in newseq){
	  		if(newseq[x]=="UAA"||newseq[x]=="UAG"||newseq[x]=="UGA"){
	    	  // Count the number of Amino acids and return it
	    	  var aminonum = x;
	    	  // Finally trim the sequence till before stop codon
	    	  seq = seq.substr(0,x*3); // x*3 = position of starting base of stop codon
	    	  newseq = splitinto3(seq);
	    	  break;
	    	}
	    }
	    var temp = newseq.split(" ");
	    var proteins = "";
	    for(x in temp){
	    	if(temp[x]=="AUG"){
	    		proteins += " Methionine;";
	    	}
	    	else if(temp[x]=="UUG"||temp[x]=="UUA"||temp[x]=="CUU"||temp[x]=="CUC"||temp[x]=="CUA"||temp[x]=="CUG"){
	    		proteins += " Leucine;";
	    	}
	    	else if(temp[x]=="CGU"||temp[x]=="CGC"||temp[x]=="CGA"||temp[x]=="CGG"||temp[x]=="AGA"||temp[x]=="AGG"){
	    		proteins += " Arginine;";
	    	}
	    	else if(temp[x]=="UCU"||temp[x]=="UCC"||temp[x]=="UCA"||temp[x]=="UCG"||temp[x]=="AGU"||temp[x]=="AGC"){
	    		proteins += " Serine;";
	    	}
	    	else if(temp[x]=="GUU"||temp[x]=="GUC"||temp[x]=="GUA"||temp[x]=="GUG"){
	    		proteins += " Valine;";
	    	}
	    	else if(temp[x]=="CCU"||temp[x]=="CCC"||temp[x]=="CCA"||temp[x]=="CCG"){
	    		proteins += " Proline;";
	    	}
	    	else if(temp[x]=="ACU"||temp[x]=="ACC"||temp[x]=="ACA"||temp[x]=="ACG"){
	    		proteins += " Threonine;";
	    	}
	    	else if(temp[x]=="GCU"||temp[x]=="GCC"||temp[x]=="GCA"||temp[x]=="GCG"){
	    		proteins += " Alanine;";
	    	}
	    	else if(temp[x]=="GGU"||temp[x]=="GGC"||temp[x]=="GGA"||temp[x]=="GGG"){
	    		proteins += " Glycine;";
	    	}
	    	else if(temp[x]=="AUU"||temp[x]=="AUC"||temp[x]=="AUA"){
	    		proteins += " Isoleucine;";
	    	}
	    	else if(temp[x]=="UUU"||temp[x]=="UUC"){
	    		proteins += " Phenylalanine;";
	    	}
	    	else if(temp[x]=="UAU"||temp[x]=="UAC"){
	    		proteins += " Tyrosine;";
	    	}
	    	else if(temp[x]=="CAU"||temp[x]=="CAC"){
	    		proteins += " Histidine;";
	    	}
	    	else if(temp[x]=="CAA"||temp[x]=="CAG"){
	    		proteins += " Glutamine;";
	    	}
	    	else if(temp[x]=="AAU"||temp[x]=="AAC"){
	    		proteins += " Asparagine;";
	    	}
	    	else if(temp[x]=="AAA"||temp[x]=="AAG"){
	    		proteins += " Lysine;";
	    	}
	    	else if(temp[x]=="GAU"||temp[x]=="GAC"){
	    		proteins += " Glutamic acid;";
	    	}
	    	else if(temp[x]=="UGU"||temp[x]=="UGC"){
	    		proteins += " Cysteine;";
	    	}
	    	else if(temp[x]=="UGG"){
	    		proteins += " Tryptophan;";
	    	}
	    };
	    newseq = proteins.trim();
	    if(MODE=="NUM"){
	    	return aminonum;
	    }
	    else if(MODE=="NAME"){
	    	return newseq;
	    }
	    else{
	    	return "Error: No mode specified";
	    }
	}
	else if(result=="PROTEIN") {
		if(MODE=="NUM"){
			return sequence.length;
		}
		else if(MODE=="NAME") {
			var temp = sequence;
			var proteins = "";
			for(x in temp){
				if(temp[x]=="M"){
					proteins += " Methionine;";
				}
				else if(temp[x]=="D"){
					proteins += " Aspartic acid;";
				}
				else if(temp[x]=="L"){
					proteins += " Leucine;";
				}
				else if(temp[x]=="R"){
					proteins += " Arginine;";
				}
				else if(temp[x]=="V"){
					proteins += " Valine;";
				}
				else if(temp[x]=="S"){
					proteins += " Serine;";
				}
				else if(temp[x]=="P"){
					proteins += " Proline;";
				}
				else if(temp[x]=="T"){
					proteins += " Threonine;";
				}
				else if(temp[x]=="A"){
					proteins += " Alanine;";
				}
				else if(temp[x]=="I"){
					proteins += " Isoleucine;";
				}
				else if(temp[x]=="F"){
					proteins += " Phenylalanine;";
				}
				else if(temp[x]=="Y"){
					proteins += " Tyrosine;";
				}
				else if(temp[x]=="H"){
					proteins += " Histidine;";
				}
				else if(temp[x]=="Q"){
					proteins += " Glutamine;";
				}
				else if(temp[x]=="N"){
					proteins += " Asparagine;";
				}
				else if(temp[x]=="K"){
					proteins += " Lysine;";
				}
				else if(temp[x]=="E"){
					proteins += " Glutamic acid;";
				}
				else if(temp[x]=="G"){
					proteins += " Glycine;";
				}
				else if(temp[x]=="C"){
					proteins += " Cysteine;";
				}
				else if(temp[x]=="W"){
					proteins += " Tryptophan;";
				}
			};
			return proteins.trim();
		}
		else {
			return "Error: No mode specified";
		}
	}
	else{
		return "Some Error Occurred"
	};

}