(function($) {
  $.fn.lorem = function(options) {
  	$.fn.lorem.defaults = {
		type: 'paragraphs',
		amount: '3',
		ptags: true
	};
	var opts = $.extend({}, $.fn.lorem.defaults, options);
	var min_num = 1;  
	var max_num = 20; 
	var diff = max_num-min_num+1 ; 
	var howmany = opts.amount;
	var lorem = new Array(20);
	lorem[1] = "Lorem ipsum dolor sit amet, in lacus eros wisi sollicitudin viverra, interdum lobortis sem vivamus, mauris vel, scelerisque eget nonummy montes sociosqu dui, facilisis consectetuer nam. Neque duis vel lectus integer nunc tincidunt, pharetra purus nunc rhoncus duis, magna cras velit urna. Nulla quam leo amet aliquam nonummy, sed nullam, a libero a, nullam vitae morbi porttitor, pulvinar sagittis mauris etiam fermentum. Amet quis ipsum tempor vivamus, do lectus, eu aliquam nullam pellentesque erat, wisi sed vitae feugiat est eos egestas, ut nullam risus non aliquam faucibus orci. Accumsan molestie leo quis vulputate, sit pede habitasse enim, sit et tincidunt donec. Egestas aliquam risus arcu morbi proin felis. Tempor molestiae vestibulum, diam suspendisse netus cras per magna platea, urna mauris enim, orci donec ut. Et in, massa aliqua nisl eleifend turpis libero ut, elementum etiam ligula quam tortor congue, donec commodo nulla vitae. Sodales libero. Id a adipiscing wisi purus.";
	lorem[2] = "Sed viverra augue tellus nulla sollicitudin scelerisque, scelerisque rutrum mauris pharetra tempor donec arcu, ante nunc ipsum donec nec dis vitae, ipsum tempor. Vel volutpat, sed vel imperdiet, vehicula auctor purus in, eu non tempor amet euismod ligula dictumst, massa orci posuere cras varius suscipit ac. Erat dui. Vitae purus suspendisse facilisi vivamus, ligula placerat pede lorem amet, sociosqu mauris, hendrerit mollis nulla in, sed at ante imperdiet. Nulla nonummy, purus pede at id sem morbi, pariatur aliquet massa donec suspendisse mi, integer malesuada velit aenean.";
	lorem[3] = "Aenean magna nulla aptent ut, sociis imperdiet et lorem dui venenatis, vestibulum leo sapien dapibus fames ultricies ante. Venenatis tempus volutpat mi lacus nisl dolore, tortor est turpis, condimentum consequat proin eget ipsum at, velit nulla est sed tincidunt aliquam, netus suspendisse pulvinar lacus non. Varius pellentesque libero volutpat eu maecenas, mattis consectetuer augue eget nec, pellentesque vitae maecenas nulla semper, class dictumst venenatis tincidunt urna orci. Lacus ut erat vivamus ullamcorper wisi. Urna orci, pede luctus ac massa eu amet, quis nullam quis mollis curabitur, pellentesque suspendisse ultrices rhoncus nascetur quisque a, quam morbi nam donec. In natoque ac nulla, donec in autem vivamus quis, non eu, vivamus sunt felis, sit augue mauris pede orci. Risus odio, sed suscipit a eu nulla pede aliquam, tempor vel.";
	lorem[4] = "Quia morbi, et integer, augue neque, eu pede quisque parturient iaculis quam tristique. Dui nec suspendisse libero donec a iaculis, volutpat eros odio hendrerit. Eu vulputate lacinia ullamcorper eget libero. Dapibus tempor dapibus convallis aliquet ac ac, tempus vivamus rem, eget dolor consectetuer fusce diam. Proin at adipiscing eu at. Aliquam et nam in, ac volutpat ut impedit, maecenas morbi tortor scelerisque, feugiat ligula in donec, pede mauris venenatis placerat velit. Wisi amet viverra viverra non tempus mauris, elit nulla in suspendisse amet, libero ut. Dolor feugiat varius dolor arcu ac in, nonummy diam augue ultrices mauris nec, porta nibh fermentum urna urna nam tempor, purus mauris nulla lacinia lorem venenatis, vivamus litora laoreet nunc tellus. Sapien tellus nascetur metus justo turpis elit, elit cras lectus nam, nec fermentum tempus, id vel, quis sit amet vitae.";
	lorem[5] = "Wisi nulla at ut ornare, risus elit convallis orci volutpat quam scelerisque. Vestibulum pretium scelerisque. Pulvinar placerat id dictum eros a, sed facilisi vulputate ut integer, nec lacinia magna dolore dolor lacus, sed scelerisque vel dolor adipiscing sagittis. Natus urna a faucibus eu iaculis consectetuer, vivamus massa sed, vel et, morbi rhoncus nibh, etiam wisi iaculis amet dolor pharetra nisl. Amet ante rhoncus leo vel dictum, morbi duis massa, pretium amet vitae, eleifend laoreet mattis id imperdiet integer.";
	lorem[6] = "Vulputate elit libero, eros in nulla, repellat tempor tempor erat ante pulvinar diam, amet nibh sit in, quis turpis condimentum felis. Eget hac per sit nonummy ut, integer pede, auctor neque est ut. Ipsum justo. Mauris est fusce nunc pellentesque, elementum hac ac ligula massa lacus, magna dolore, aliquam duis at mauris facilisis pede nam. Felis nulla ligula magna suscipit est, lectus suscipit wisi, erat fusce magna. Maecenas in lobortis dignissim porta, amet laoreet lectus in. Dolor urna phasellus, et donec molestie tincidunt suspendisse pretium, eget integer sollicitudin, tortor pellentesque sagittis diam sodales id.";
	lorem[7] = "Tristique lacus hendrerit imperdiet, porta vulputate nec curabitur. Quam aptent vulputate a sodales, blandit purus vivamus et wisi donec nibh. Cum lorem nam elit proin orci, risus est tincidunt. Cursus vulputate sociis non, sit a duis in commodo, est libero massa faucibus sit lobortis, leo est eget id aliquet magna. Augue magna amet eget quam maecenas, adipiscing magna amet varius mauris dui, pede lorem cras urna diam, ante varius aliquam in vestibulum felis neque. Lectus duis tristique purus nullam. Enim interdum facilisis eu in elementum diam, posuere iusto placerat pede eget urna, sed etiam semper morbi dapibus tristique. Per ipsum luctus dolor. Sit curabitur at. Feugiat felis ipsum. Tellus vehicula malesuada adipiscing justo fusce aliquam, laoreet id ullamcorper lacinia arcu aliquam, id praesent rhoncus ipsum libero. Lobortis mauris et nisl, nonummy sed ut, suspendisse id risus ultricies quisque, ipsum eu adipiscing orci ante eget elementum.";
	lorem[8] = "Amet nunc ornare, varius et gravida urna. Tincidunt id vestibulum integer in, vitae fringilla ut dis donec ut, urna felis, ac scelerisque. Adipiscing maecenas suspendisse dolor purus, eros duis sodales justo, sapien vestibulum donec nunc vel wisi scelerisque, cras donec consectetuer sit. In eros nec placerat nonummy nihil, ac faucibus neque fames, aliquam dis sapien quis volutpat lacus. Sociis nec leo, ut mauris cras integer curabitur accumsan elementum, id vitae est risus consectetuer eget molestie. Metus et nunc mi et elit netus, ac metus in, id malesuada sapien, pede in pellentesque vel odio lectus. Velit nulla hymenaeos ea provident ut metus. Quis convallis, sed class veritatis ullamcorper. Tempor at phasellus et ac sodales gravida, nec consequat nonummy sed eu, ex convallis ultricies nonummy, ac donec sed erat lacus arcu, duis venenatis proin. Ultricies eget, magna nec, eget etiam, tortor neque posuere eros a aliquam pellentesque. Quam phasellus vel dolor nulla, lacus in et volutpat sed, nam eleifend, vestibulum integer, nulla et aenean.";
	lorem[9] = "Pretium donec orci lacus, leo sodales ac, urna leo aliquam. Fugiat imperdiet libero volutpat varius augue, dui sed elit turpis non mauris donec. Mauris vestibulum suscipit, eu blandit ornare tincidunt aenean non fringilla, tortor sapien per eu, ullamcorper mi. Massa aliqua amet et, curabitur ligula ligula, cras aliquam elementum dui platea, odio et nec a quis, eros dictum mi placerat nulla. Erat quam rutrum commodo duis dui lorem, magnam hac ac integer, tristique massa, vivamus et porta velit duis. Nec velit cum et ut. Est dolor et, natoque augue eget ut maecenas, porttitor libero sapien proin, lectus ac mauris facilisis tellus vestibulum curabitur. Tristique pellentesque morbi elit lorem felis a, dignissim lacinia viverra nunc, habitasse at vel fringilla, in lorem.";
	lorem[10] = "Vestibulum nullam risus, erat quis, imperdiet sem. Rhoncus tristique, sed orci faucibus ligula wisi pellentesque enim, mi fringilla et, duis sunt orci varius in vivamus. Pede maecenas cras at wisi et, eget elit ad justo vitae, sodales eget, neque enim. Nunc odio suscipit, suspendisse in tempora est justo, ipsum hendrerit wisi mi laoreet nec tellus. Lorem mattis nam, nunc penatibus et ipsum placerat. Amet metus malesuada. Suscipit pulvinar tortor amet praesent, aliquam mollis semper blandit. Ut eu turpis. Pede mattis ullamcorper malesuada sed, erat ac congue ridiculus ante. Justo at varius pulvinar interdum interdum, libero et a at eget, vitae ac dolor. Velit odio vulputate aliquet wisi penatibus, ipsum id erat, molestie lorem libero, ut amet ut a. Pellentesque nec non pulvinar varius, nec ac leo viverra cum morbi elementum, ante donec.";
	lorem[11] = "Vel id odio fringilla pede at est, morbi faucibus feugiat sed tellus velit praesent. Arcu aliquet ea placerat morbi purus. Nec vulputate, euismod curabitur integer duis aliquam. Integer tellus, placerat dictum fermentum ornare, eget eget ultricies. Nulla aliquam, et massa velit nulla vivamus.";
	lorem[12] = "Egestas quisque nullam neque vel amet, pede non dolor vestibulum est id dolor, aut vel id odio proin enim leo. Ut vel felis class duis. Neque mi impedit sodales consectetuer sed fringilla. Quis vel metus rhoncus purus, eum ac dolor quam, donec vehicula tincidunt sem eu, vel vivamus sagittis velit magna, tincidunt urna wisi diam ac nulla. Litora sed bibendum repellat ridiculus nunc, nunc sociis lectus curabitur, proin at, eu per justo in. Nulla tincidunt wisi ante etiam in suscipit, enim orci velit vel mus, volutpat et placerat ullamcorper.";
	lorem[13] = "Massa ut nec ut leo purus placerat, felis vitae magna eleifend perspiciatis ut ante. Arcu nunc at sagittis quis cras maecenas, leo ac, nec porta placerat tempus sed. Elementum ante at amet eu orci, in blandit elementum, rutrum lectus. Sollicitudin in at nulla, integer est bibendum et a donec amet, pede sed felis dolor. Wisi at quis suscipit sed vivamus, mauris quisque, nunc vitae luctus, sed lectus phasellus enim, commodi sit nunc. Metus semper, rhoncus dui etiam vitae, blandit nunc, eget adipiscing consectetuer turpis rutrum. Massa enim ligula est felis volutpat dolor, pellentesque in pede condimentum a vestibulum orci. Eu donec sit in, sociis non nec a commodo dolor tincidunt, bibendum odio vel, dui tempor vitae wisi scelerisque rutrum dignissim, nulla mi facilisis nullam. Aliquet primis nisl ac facilisis ac non. Nulla est integer donec. A est quis wisi, ut neque mi massa ipsum nulla aliquam.";
	lorem[14] = "Nunc nisl consequat leo donec vestibulum, wisi amet ut nisl lorem mi, donec amet. Vel montes felis vestibulum rhoncus cras, id auctor dui nullam adipiscing. Dolor quam adipiscing, vitae sunt mauris necessitatibus at, pellentesque est, convallis sit curabitur enim volutpat. Dis mauris et nam qui curabitur suscipit, tristique eget amet accumsan integer erat accumsan. Sit mattis vestibulum ac, fusce ligula ornare, adipiscing pellentesque mauris, vestibulum eu arcu velit, ipsum wisi hendrerit nam integer lorem lorem. Eleifend et sodales, amet sapien occaecati at in et elit. Dignissim augue in at non elit, in nam nunc posuere, a aliquam eros pellentesque venenatis auctor, justo doloribus nullam. In egestas netus duis odio, integer amet. Suspendisse mauris orci egestas, dui quis nibh quisque tellus massa. Laoreet curabitur eget, nunc volutpat fermentum, justo qui imperdiet dolor nec nullam, sollicitudin congue sed nonummy a nibh.";
	lorem[15] = "Amet laoreet quis, sit dolor ligula justo, elementum scelerisque in id proin justo nulla, non tempor sit consequat aliquet. Ultricies urna vel nisl mollis semper, maecenas velit integer turpis dolor habitasse. Sagittis sodales. Ullamcorper ornare sapien dolor porttitor porta tellus, volutpat rutrum et dolor. Urna ut, elit sed tempus. Mi feugiat donec amet tellus, aliquam vitae justo sodales nibh sem.";
	lorem[16] = "Magna ad, mauris sit quisque amet porta rutrum nunc, in justo metus fringilla pellentesque venenatis, metus eget praesent, blanditiis maecenas suscipit aliquam nec placerat. Potenti erat dolor sit lobortis, pellentesque sit vestibulum commodo at mauris ipsum, wisi justo nulla leo feugiat nonummy, non non porta tortor et elit quis, ut lectus lorem rhoncus. Ut ligula fusce enim lectus condimentum, wisi magna et, suspendisse lacus lobortis, mi vulputate suspendisse eget vestibulum enim. Nam parturient, fermentum semper, sed parturient sed vitae consequat. Eget metus felis dictum, vulputate et morbi molestie. Consequat etiam arcu amet bibendum aenean eu, egestas lacus sed fusce arcu id sociis. Id nulla est morbi sed eu in, neque nullam eros amet vestibulum ornare odio, dignissim adipiscing, in nunc tincidunt ut mattis quis. Consectetuer enim nullam. Fermentum malesuada adipiscing ridiculus morbi sed, in ultrices nulla, erat id cursus, risus litora. Lacus egestas pede accumsan augue euismod, posuere nunc ullamcorper maecenas consectetuer et, aenean in at dui justo lacus ullamcorper. Eros aenean ante erat posuere, sit amet pellentesque.";
	lorem[17] = "Sit dignissim turpis orci eget sodales cras. Velit sem vivamus mauris ipsum vel velit, tellus sed per sociis, in sed porta. Curae libero, ut mi leo vitae non. Lobortis aliquam cursus libero, nunc enim, vestibulum augue ut habitasse non, justo ut, velit id vitae sit ornare dis amet. Donec mi diam. Dictum mauris libero. Consectetuer sociis dui in vivamus. A ut nulla, quam suspendisse nonummy eleifend platea condimentum duis, elit pede pretium posuere id eget. Odio justo habitasse lectus, enim posuere. Nulla nam, libero est pede purus, pharetra blandit. Quis nascetur pede et ornare varius mattis, sit nam et quam lacus pede, dolor libero a arcu hymenaeos, ante donec eleifend vitae, vivamus adipiscing. Laoreet justo vel.";
	lorem[18] = "At sit. Nullam elit quam sapien at nec. Amet sociis sociosqu, ultricies amet, mattis donec hendrerit aliquet lorem, tellus nulla velit hendrerit dui. Et vestibulum dolor eget fermentum, orci arcu quam sed, curabitur duis elit nulla sed dignissim. Quis aliquam arcu viverra lacinia quis. Est sed convallis vehicula justo venenatis vulputate, consequat odio integer sed, integer ipsum eget turpis odio, neque odio nec, lacinia egestas. Nibh eu luctus ligula, felis faucibus vulputate suspendisse aliquam torquent, faucibus proin justo odio cras, sed orci tellus adipiscing, proin mauris eu blandit vel lacus.";
	lorem[19] = "Purus nec urna senectus placerat, imperdiet fringilla, quis eget, odio lobortis. Morbi commodo integer mauris eget nulla, turpis proin sagittis qui congue ipsum, cras pede in sit tincidunt diamlorem. Quis tincidunt eget vestibulum lorem nisl cum, convallis mollis, in pulvinar pulvinar. Faucibus lectus in at qui magna, et orci rhoncus bibendum mollis amet sem. Sit dolorum leo enim sed. Id turpis pretium vestibulum proin lacus dignissim, ante tincidunt ultricies molestie, quia faucibus phasellus aenean hac, et vivamus vivamus, erat suscipit nulla. Eros lacinia dolor fermentum fermentum. In pulvinar eu, morbi at ut cursus congue. Vehicula eget tortor adipiscing, quis sed non, massa ornare. Quis et egestas vivamus suspendisse, ante nulla scelerisque mauris arcu, nullam urna quisque lectus velit, nunc euismod adipiscing morbi.";
	lorem[20] = "Sit commodo tellus aenean tincidunt et, nunc et lorem. Lorem arcu, bibendum dolore pellentesque morbi nonummy leo, auctor pede ipsum, sed ultrices eu nulla. Felis arcu sapien et bibendum amet vitae, consequat quisque, voluptatem sed ornare non elit. A facilisi inceptos quam quam, ornare feugiat vestibulum soluta est eu tortor. Sed non nulla urna. Vulputate sodales condimentum ut, mollis non morbi at urna non varius. Tellus magna augue blandit eu posuere eu. Vestibulum justo libero pellentesque mollis ultricies dictum, ante dapibus, imperdiet aenean purus, non faucibus porta placerat nec, ligula libero arcu mi condimentum arcu amet.";
function makeipsum(){
		var ipsum_text = "";
		for (var i = 0; i < howmany; i++){
			rnd_number=Math.floor(Math.random()*diff + min_num); 
		if(options.ptags==true){
			ipsum_text+="<p>";
		}
		ipsum_text+=lorem[rnd_number];
		if(opts.ptags==true){
			ipsum_text+="</p>";
		}
		ipsum_text+="\n\n";
		}
		switch(opts.type) {
			case "words":{
		      	var numOfWords = opts.amount;
				numOfWords = parseInt( numOfWords );
				var list = new Array();
				var wordList = new Array();
				wordList = ipsum_text.split( ' ' );
				var iParagraphCount = 0;
				var iWordCount = 0;
				while( list.length < numOfWords ) {
					if( iWordCount > wordList.length ) {
						iWordCount = 0;
		        		iParagraphCount++;
		      		  	if( iParagraphCount + 1 > lorem.length ) {
							iParagraphCount = 0;
						}
		        		wordList = lorem[ iParagraphCount ].split( ' ' );
		        		wordList[0] = "\n\n" + wordList[ 0 ];
					}
		       		list.push( wordList[ iWordCount ] );
		       		iWordCount++;
				}
				ipsum_text = list.join(' '); // changed
			break;
			}
			case 'characters':
			{
				var outputString = '';
			    var numOfChars = opts.amount;
			    numOfChars = parseInt( numOfChars );
			    var tempString = lorem.join( "\n\n" );
				while(outputString.length < numOfChars ){
						outputString += tempString;
				}
			    ipsum_text = outputString.substring(0, numOfChars );
			break;
			}
			case 'paragraphs':{
			///no action needed
			break;
			}
		}
		return ipsum_text;
	}


return this.each(function() {
	  $this = $(this);
	  var markup = makeipsum();
	  $this.html(markup);
	  
	});
  };

})(jQuery);

function loremExecute(){
	
	$('.ipsum').addClass('hidden');
	
	if ($("input:radio[name='typeoftext']:checked").val() == "paragraphs"){
		if ($('#ptags').attr("checked")){
			$('.ipsum').lorem({ type: 'paragraphs',amount:$('#numpara').val() ,ptags:true});
		}else{
			$('.ipsum').lorem({ type: 'paragraphs',amount:$('#numpara').val() ,ptags:false});
		}
		$('.ipsum').toggleClass('hidden');
		$('.ipsum').focus();
		$('.ipsum').select();
	}else if ($("input:radio[name='typeoftext']:checked").val() == "words"){
		console.log('words');
		if ($('#ptags').is(":checked")){
			$('.ipsum').lorem({ type: 'words',amount:$('#numwords').val(),ptags:true});
		}else{
			$('.ipsum').lorem({ type: 'words',amount:$('#numwords').val(),ptags:false});
		}
		$('.ipsum').toggleClass('hidden');
		$('.ipsum').focus();
  		$('.ipsum').select();
	}else{
		console.log('characters');
		if ($('#ptags').is(":checked")){
			$('.ipsum').lorem({ type: 'characters',amount:$('#numchars').val(),ptags:true});
		}else{
			$('.ipsum').lorem({ type: 'characters',amount:$('#numchars').val(),ptags:false});
		}
		$('.ipsum').toggleClass('hidden');
		$('.ipsum').focus();
  		$('.ipsum').select();
	}

}