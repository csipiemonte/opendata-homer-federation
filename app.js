var URL_FSE_DOCUMENTS = "http://opendata-federation.csi.it/fed-homer/documents/select/?q=";
var URL_FSE_ONTOLOGY = "http://opendata-federation.csi.it/fed-homer/ontology/select/?q=";
var URL_FSE_ADMIN = "http://opendata-federation.csi.it/fed-homer/documents/admin/luke/?";

var URL_PROXY_DOCUMENTS = "proxy.php?path="+("documents/select/")+"&params=q=";
var URL_PROXY_ADMIN = "proxy.php?path="+("documents/admin/luke/")+"&params=";
var URL_PROXY_ONTOLOGY = "proxy.php?path="+("ontology/select/")+"&params=q=";

var languages = {
		"el":"ελληνικά",
		"en":"English",
		"es":"Español",
		"fr":"Français",
		"it":"Italiano",
		"sl":"Slovenščina",
		"sr":"Српски"
};


var countries = {
		"cy":"Cyprus",
		"es":"Spain",
		"fr":"France",
		"gr":"Greece",
		"it":"Italiano",
		"me":"Montenegro",
		"mt":"Malta",
		"si":"Slovenia",
		"eu":"Europe",
};

var portalNames = {
		"www.open-data.me":"Open Data Montenegro",
		"www.sbla-opendata.com.cy":"Sewerage Board of Limassol",
		"www.dati.emilia-romagna.it":"Emilia Romagna Region",
		"www.open-homer.si":"Geodetic Institute of Slovenia",
		"www.dati.piemonte.it":"Piemonte Region",
		"dati.veneto.it":"Veneto Region",
		"data.corse.fr":"Open Data Corsica",
		"www.juntadeandalucia.es":"Junta de Andalucia",
		"opendata.aragon.es":"Arag&oacute;n Open Data",
		"heraklionopencity.gr":"City of Heraklion",
		"www.opencrete.gov.gr":"Region of Crete",
		"dati.regione.sardegna.it": "Sardegna Region",
		"opendata.regionpaca.fr": "Paca Region",
		"api.opendai.eu": "Opendai Project",
		"www.opendatamalta.org": "Open Data Malta",
}

var euroVocCategories = {						
						"en":{"Agriculture":"Agriculture","Culture":"Culture","Energy":"Energy","Environment":"Environment","Tourism":"Tourism"},
						"el":{"Γεωργία": "Γεωργία", "Πολιτισμός": "Πολιτισμός", "Ενέργεια": "Ενέργεια", "Περιβάλλον": "Περιβάλλον", "Τουρισμός": "Τουρισμός"},
						"sl":{"kmetijstvo": "kmetijstvo", "Kultura": "Kultura", "Energija": "Energija", "Okolje": "Okolje", "Turizem": "Turizem"},
						"sr":{"Пољопривреда": "Пољопривреда", "Култура": "Култура", "Енергија": "Енергија", "Животна+средина": "Животна средина", "Туризам": "Туризам"},
						"es":{"Agricultura": "Agricultura", "Cultura": "Cultura", "Energía": "Energía", "Medio+ambiente": "Medio ambiente", "Turismo": "Turismo"},
						"fr":{"Agriculture": "Agriculture", "Culture": "Culture", "Énergie": "Énergie", "Environnement": "Environnement", "Tourisme": "Tourisme"},
						"it":{"Agricoltura": "Agricoltura", "Cultura": "Cultura", "Energia": "Energia", "Ambiente": "Ambiente", "Turismo": "Turismo"},
						}


var facets_list = {
	"tag":new Array(),
	"portal":new Array(),
	"title":new Array(), 
	"concept":new Array()
};

var field_list;

var facets_select = {};
var facets_panel = {};
var docs;

var start = 0;
var rowsInPage = 10;
var resultSize = 0;

var inputLangSelect;
var outputLangSelect;
var inputSearchText;
var tagsSelect;
var euroVocCategorySelect;
var outputFormatSelect;
var sortBySelect;
var sortOrderAscRadio;
var sortOrderDescRadio;

var selectedEuroVocCategories;

var inputCheckTagPortalsSelect;

var checkTagText;
var checkTagPanel;
var checkTagWarning;
var checkTagPortalsPanel;
var checkTagPortalsWarning;
var inputLangCheckTagSelect;
var checkTagResultPanel;
var checkTagOKIcon;
var checkTagKOIcon;
var checkTagResultMessage;
var checkTagResultCounter;
var checkTagUrl;
var checkTagUrlProxy;
var checkTagTableBody;
var checkTagPortalsTableResultPanel;
var checkTagPortalsTableResultProgressBar;
var checkTagPortalsTableBody;
var checkTagTableResultPanel;
var loadCloudTagUrl;
var loadCloudTagProxy;


var autocompleteTagText;
var autocompleteTagUrlText;
var autocompleteTagNumFoundText;
var autocompleteInputLangSelect;

var statistictConceptsInPortalLangSelect;
var statistictConceptsInPortalSelect;
var statistictConceptsInPortalSelectedTag;
var statistictConceptsInPortalTablebody;


google.load('visualization', '1.0', {'packages':['corechart']});

	
function init(){
	console.debug("init");
	inputLangSelect = $("#inputLangSelect");
	outputLangSelect = $("#outputLangSelect");
	inputSearchText = $("#inputSearchText");
	euroVocCategorySelect = $("#euroVocCategorySelect");
	tagsSelect = $("#tagsSelect");
	outputFormatSelect = $("#outputFormatSelect");
	sortBySelect = $("#sortBySelect");
	sortOrderDescRadio = $("#sortOrderDescRadio");
	sortOrderAscRadio = $("#sortOrderAscRadio");

	checkTagText = $("#checkTagText");
	checkTagWarning = $("#checkTagWarning");
	checkTagPanel = $("#checkTagPanel");
	inputLangCheckTagSelect = $("#inputLangCheckTagSelect");
	checkTagResultPanel = $("#checkTagResultPanel");
	checkTagOKIcon = $("#checkTagOKIcon");
	checkTagKOIcon = $("#checkTagKOIcon");
	checkTagResultMessage = $("#checkTagResultMessage");
	checkTagResultCounter = $("#checkTagResultCounter");
	checkTagUrl = $("#checkTagUrl");
	checkTagUrlProxy = $("#checkTagUrlProxy");
	checkTagTableBody = $("#checkTagTableBody");
	checkTagPortalsTableResultPanel = $("#checkTagPortalsTableResultPanel");
	checkTagPortalsTableResultProgressBar = $("#checkTagPortalsTableResultProgressBar");
	checkTagTableResultPanel = $("#checkTagTableResultPanel");
	checkTagPortalsTableBody = $("#checkTagPortalsTableBody");
	loadCloudTagUrl = $("#loadCloudTagUrl");
	loadCloudTagProxy = $("#loadCloudTagProxy");
	
	autocompleteTagText = $("#autocompleteTagText");
	autocompleteTagUrlText = $("#autocompleteTagUrlText");
	autocompleteTagNumFoundText = $("#autocompleteTagNumFoundText");
	autocompleteInputLangSelect = $("#autocompleteInputLangSelect");

	$.each(facets_list, function(value, label) {
		facets_select[value] = $("#"+value+"Select");
		facets_panel[value] = $("#"+value+"InputPanel");
	});
	inputCheckTagPortalsSelect = $("#inputCheckTagPortalsSelect");
	checkTagPortalsWarning = $("#checkTagPortalsWarning");
	checkTagPortalsPanel = $("#checkTagPortalsPanel");

	inputLangSelect.append(" <option></option>");
	outputLangSelect.append(" <option></option>");
	inputLangCheckTagSelect.append(" <option value=''>Choose a language...</option>");
	
	statistictConceptsInPortalLangSelect = $("#statistictConceptsInPortalLangSelect");
	statistictConceptsInPortalSelect = $("#statistictConceptsInPortalSelect");
	statistictConceptsInPortalSelect.on('change', function() {
		updateStatisticConceptsInPortal();
    });
	
	statistictConceptsInPortalLangSelect.on('change', function() {
		refreshConceptsStatisticConceptsInPortal();
    });

   
	statistictConceptsInPortalSelectedTag=  $("#statistictConceptsInPortalSelectedTag");
	statistictConceptsInPortalTablebody = $("#statistictConceptsInPortalTablebody");

	$.each(languages, function(value, label) {
		inputLangSelect.append(" <option value='"+value+"'>"+label+"</option>");
		outputLangSelect.append(" <option value='"+value+"'>"+label+"</option>");
		inputLangCheckTagSelect.append(" <option value='"+value+"'>"+label+"</option>");
		var selected = "";
		if(value=="en") 
			selected="selected='selected'";
		autocompleteInputLangSelect.append(" <option value='"+value+"' "+selected+">"+label+"</option>");
		statistictConceptsInPortalLangSelect.append(" <option value='"+value+"' "+selected+">"+label+"</option>");
	});

	$("#clearSearchTextBtn").click(function() {$("#inputSearchText").val("");});
	$("#searchSubmit").click(function() {goToPage(0);});
	$("#inputSearchText").keyup(function (e) {if (e.keyCode == 13) { goToPage(0);}});
	$("#resetSearchFilterBtn").click(function() {resetSearchFilter()});
	
	$("#news-marquee-link").click(function() {scroolTo("homeNewsPanel")});
	
	$("#utilitiesCheckEurovocLink").click(function() {scroolTo("utilitiesCheckEurovocPanel")});
	$("#utilitiesCheckEurovocInPortalsLink").click(function() {scroolTo("utilitiesCheckEurovocInPortalsPanel")});
	
	$("#utilitiesAutocompleteLink").click(function() {scroolTo("utilitiesAutocompletePanel")});
	$("#utilitiesServerProxyLink").click(function() {scroolTo("utilitiesServerProxyPanel")});
	$("#utilitiesTagCloudLink").click(function() {scroolTo("utilitiesTagCloudPanel")});
	$(".utilitiesScrollTopLink").click(function() {scroolTo("nav-bar")});

	$("#statisticsHomerCategoryLink").click(function() {scroolTo("statisticsHomerCategoryPanel")});
	$("#statisticsPortalLink").click(function() {scroolTo("statisticsPortalPanel")});
	$("#statisticsTagsLink").click(function() {scroolTo("statisticsTagsPanel")});
	$("#statisticsConceptsInPortalsLink").click(function() {scroolTo("statisticsConceptsInPortalsPanel")});
	$(".statisticsScrollTopLink").click(function() {scroolTo("nav-bar")});


	$(".scrollResultList").click(function() {scroolTo("resultListPanel")});
	$(".scrollSearchInput").click(function() {scroolTo("searchInputPanel")});
	

	$( "#checkTagForm" ).submit(function( event ) {checkTag();event.preventDefault();});
	$( "#checkTagPortalsForm" ).submit(function( event ) {checkTagsInPortal();event.preventDefault();});

	$("#showSearchUrlProxy").click(function(event) {event.preventDefault();$("#searchUrlProxyContainer").toggle();});
	$("#showCheckTagUrlProxy").click(function(event) {event.preventDefault();$("#checkTagUrlProxyContainer").toggle();});
	$("#showLoadCloudTagUrlProxy").click(function(event) {event.preventDefault();$("#loadCloudTagProxyContainer").toggle();});

	loadFacets();
	loadFields();
	autocompleteTagText.typeahead({
    	source: function( request, response ) {
			var lang = autocompleteInputLangSelect.val();
			var action = URL_FSE_ONTOLOGY+"search_text_"+lang+":"+autocompleteTagText.val()+"*&start=0&rows=1000&wt=json";

			$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: action}).done(function( data ) {
				console.log("url: " + action);
				console.log( "decodeConcept: Found: ", data.response.numFound);
				autocompleteTagUrlText.text(URL_FSE_ONTOLOGY+"search_text_"+lang+":"+autocompleteTagText.val()+"*&start=0&rows=1000&wt=json");
				autocompleteTagUrlText.attr("href",URL_FSE_ONTOLOGY+"search_text_"+lang+":"+autocompleteTagText.val()+"*&start=0&rows=1000&wt=json");
				autocompleteTagNumFoundText.text(data.response.numFound);
				var suggests = new Array();
				$.each(data.response.docs, function(index, doc) {
					suggests[index] =  doc.term;
				});
				return response(suggests);
			});
		}
	});
	loadCloudTags();
	
}



function search(){
	clear();
	var searchedText = inputSearchText.val();
	var inputLang = inputLangSelect.val();
	var outputLang = outputLangSelect.val();  // multiple value: comma separated en, es
	var portals = facets_select["portal"].val();
	var tags =  facets_select["tag"].val();
	var outputFormat = outputFormatSelect.val();
	var sortBy = sortBySelect.val();
	var sortOrder = $('input:radio[name=sortOrderRadioGroup]:checked').val();

	console.debug("testo: " + searchedText);
	console.debug("input lang: " + inputLang);
	console.debug("output lang: " + outputLang);
	console.debug("portals: " + portals);
	console.debug("Tags: " + tags);

	var action = searchedText;
	
	if(inputLang != null && inputLang != "" )
		action += "&lang=" + inputLang;
	console.debug("action: " + action);
	var filterQuery = new Array();
	if(outputLang != null && outputLang != "")
		filterQuery.push("language%3A(" + outputLang.join('%20OR%20')+ ")");
	if(portals != null && portals != "")
		filterQuery.push("(portal%3A(" + portals.join('%20OR%20')+ "))");
	if(tags != null && tags != ""){
		filterQuery.push("(tag%3A" + tags.join('%20OR%20')+ ")");
	}
	
	if(filterQuery.length>0){
		action += "&fq="+filterQuery.join('%20AND%20');
	}
	if(sortBy!=null && sortBy!=""){
		if(sortOrder==null || sortOrder=="") sortOrder="asc";
			action += "&sort=" + sortBy + "%20" + sortOrder;
	}
	if(outputFormat == null || outputFormat == "")
		outputFormat = "json";

	start = $("#paginationStart").text();
	action +="&start="+start+"&rows="+rowsInPage;

	// portal, sourceID
	$("#searchUrlProxy").text(URL_PROXY_DOCUMENTS + action + "&wt=" + outputFormat);
	$("#searchUrlProxy").attr("href",URL_PROXY_DOCUMENTS + encodeURIComponent(action + "&wt=" + outputFormat));
	$("#searchUrl").text(URL_FSE_DOCUMENTS + action + "&wt=" + outputFormat);
	$("#searchUrl").attr("href",URL_FSE_DOCUMENTS + action + "&wt=" + outputFormat);


	action = URL_FSE_DOCUMENTS + action+"&wt=json";
	console.log(action);


	$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: action}).done(function( data ) {
			$("#searchUrlProxyContainer").hide();
			console.log( "Found: ", data.response.numFound);
			$("#responseQTime").text(data.responseHeader.QTime);
			$("#responseNumFound").text(data.response.numFound);
			$("#paginationStart").text(start+rowsInPage);
			resultSize = data.response.numFound;

			var nPages = parseInt(numPages());
			var cPage = parseInt(currentPage());
			var counter = parseInt(1 + (cPage-1)*rowsInPage);

			var tbody = "";
			docs = data.response.docs;
			if(docs.length==0){
				$("#info-message-panel").show();
			}
			var lastSource = "";
			$.each(data.response.docs, function(index, doc) {
				var source = doc.portal;
				if(doc.portal == undefined)
				   source = doc.source;
				if(source!= undefined && source != lastSource){
					lastSource = source;
					tbody += "<tr ><td colspan=8 style='background-color:#F9F9F9;text-align:center;'><strong>" + source +"</td></tr>";
				}
				var languageIcon = formatLangIcon("sq", doc.language, "");
				var countryIcon = formatCountryIcon("sq", decodeCountry(source), "");
				var portalNameIcon = formatPortalNameIcon("sq", source, "");
				tbody += "<tr><td>" +counter+"</td><td>"+portalNameIcon+"</td><td>"+source+"</td><td>" + doc.package_id + "</td><td class='single_icon'>"+languageIcon+"</td><td class='single_icon'>"+countryIcon+"</td><td>" + doc.title + "</td><td><a href='javascript:showDetail("+index+");' class='btn btn-mini btn-primary'>Detail</a></td></tr>";
				counter++;
			});
			$("#resultListTableBody").html(tbody);
			console.log( "Num Pages");

			console.log( "Num Pages:" + nPages);
			console.log( "Current Page:" + cPage);
			console.log( "Start:" + start);

			var delta = 3;
			if(nPages>1){

				if(cPage == 1){
					paginationUl = "<li><span>&laquo;</span></li>";
					paginationUl += "<li><span>&lsaquo;</span></li>";
				}
				else{
					paginationUl = "<li><a href=\"javascript:goToPage("+parseInt(0)+")\">&laquo;</a></li>";
					paginationUl += "<li><a href=\"javascript:goToPage("+parseInt(cPage-2)+")\">&lsaquo;</a></li>";
				}
				if(cPage>delta){
					paginationUl += "<li><span>&hellip;</span></li>";
				}
				for(p = 1; p< nPages+1; p++){
					if(Math.abs(p-cPage)<delta){
						var active = "";
						if(cPage==p)
							active = "active";
						paginationUl += "<li class=\""+active+"\"><a href=\"javascript:goToPage("+parseInt(p-1)+")\">"+p+"</a></li>";
					}
				}
				if(nPages-cPage>=delta){
					paginationUl += "<li><span>&hellip;</span></li>";
				}
				if(cPage == nPages){
					paginationUl += "<li><span>&rsaquo;</span></li>";
					paginationUl += "<li><span>&raquo;</span></li>";
				}
				else{
					paginationUl += "<li><a href=\"javascript:goToPage("+parseInt(cPage)+")\">&rsaquo;</a></li>";
					paginationUl += "<li><a href=\"javascript:goToPage("+parseInt(nPages-1)+")\">&raquo;</a></li>";
				}
				$("#paginationUl").html(paginationUl);
			}
			scroolTo("resultListPanel");
		}
	);
}

function showDetail(index){
	var doc = docs[index];
	var tbody = "";
	tbody += getDetailrow("Title", doc.title);
	tbody += getDetailrow("Package ID", doc.package_id);
	tbody += getDetailrow("Url Metadata Source", formatLinkUrl(doc.url) );
	var lang = doc.language;
	if(lang!=undefined)
		lang=lang.toLowerCase();
	else 
		lang="it";
	tbody += getDetailrow("Language", formatLangIcon("4x3", doc.language, languages[ lang]));
	var country = decodeCountry(doc.portal);
	if(doc.portal!=null) tbody += getDetailrow("Country",  formatCountryIcon("4x3", country,countries[country]));else tbody += getDetailrow("Country", "-");
	if(doc.package_type!=null) tbody += getDetailrow("Data type", doc.package_type);else tbody += getDetailrow("Data type", "-");
	if(doc.license_id!=null) tbody += getDetailrow("Licence", doc.license_id);else tbody += getDetailrow("Licence", "-");

	if(doc.tag!=null) tbody += getDetailrow("Tags", formatList(doc.tag));else tbody += getDetailrow("Tags", "-");
	if(doc.concept!=null) tbody += getDetailrow("Concepts", formaConceptsList(doc.concept, doc.language));else tbody += getDetailrow("Concepts", "-");
	if(doc.author!=null) tbody += getDetailrow("Authors", formatList(doc.author));else tbody += getDetailrow("Authors", "-");
	if(doc.description!=null) tbody += getDetailrow("Description", doc.description);else tbody += getDetailrow("Description", "-");
	
	if(doc.portal!=null) tbody += getDetailrow("Portal", formatPortalNameIcon("sq_big", doc.portal,portalNames[doc.portal] + " -  " + doc.portal));else tbody += getDetailrow("Portal", "-");
	if(doc.metadata_origin!=null) tbody += getDetailrow("Metadata Origin", formatLinkUrl(doc.metadata_origin));else tbody += getDetailrow("Metadata Origin", "-");
	if(doc.metadata_created!=null) tbody += getDetailrow("Metadata Created", doc.metadata_created);else tbody += getDetailrow("Metadata Created", "-");
	if(doc.metadata_modified!=null) tbody += getDetailrow("Metadata Modified", doc.metadata_modified);else tbody += getDetailrow("Metadata Modified", "-");




	$("#resultDetailTableBody").html(tbody);
	scroolTo("detailPanelAnchor");
}


function getDetailrow(key, value){
	return "<tr><td><strong>" + key + "</strong></td><td>" + value + "</td></tr>";
}

function formatLinkUrl(url){
	var desc = url;
	if(desc.length>100)
		desc = url.substring(0,100) + "&hellip;";
	return "<a href='"+url +"' target='_blank' title='"+url+"'>" + desc +"</a>";
}



function formatLangIcon(type, language, label){
	if(language=='undefined')
		return "<span class='icon-question' aria-hidden='true'></span>";
	if(language!=undefined)
		language = language.toLowerCase();
	else 
		language="it";

	return "<div class='flag_"+type+"'>"+formatLangImage(type, language) +"</div> "+ label;
}

function formatCountryIcon(type, coutry, label){
	if(coutry=='undefined')
		return "<span class='icon-question' aria-hidden='true'></span>";
	return "<div class='flag_"+type+"'>"+formatCountryImage(type, coutry) +"</div> "+ label;
}

function formatPortalNameIcon(type, portalName, label){
	if(portalName=='undefined')
		return "<span class='icon-question' aria-hidden='true'></span>";
	return "<div class='portalName_"+type+"'>"+formatPortalNameImage(type, portalName) +"</div> "+ label;
}

function formatLangImage(type, language){
	return "<img src='flags/"+type+"/"+language+".svg' alt='"+language+"' title='"+language+" - "+ languages[language]+"' />";
}

function formatCountryImage(type, coutry){
	return "<img src='flags/"+type+"/"+coutry+".svg' alt='"+coutry+"' title='"+coutry+" - "+ countries[coutry]+"' />";
}

function formatPortalNameImage(type, portalName){
	return "<img src='portals/"+type+"/"+portalName+".png' alt='"+portalNames[portalName]+"' title='"+portalNames[portalName]+"' />";
}

function formatList(list){
	var result = "";
	$.each(list,function(index, t){
		result +="<div>" + t + "</div>";
	});
	return result;
}

function formaConceptsList(list, lang){
	var result = "";
	result +="<table class='table table-condensed table-concepts table-hover'>";
	result +="<thead><tr><th>EuroVOC-ID</th><th>"+languages[lang]+"</th><th>English</th></tr></thead><tbody>"

	$.each(list,function(index, t){
		var spanId = "concept_" +t + "_"  +index;
		result +="<tr><td>" + t + "</td><td><span id='"+spanId+"_original' class='concept_original_lang'></span></td><td><span id='"+spanId+"_en' class='concept_en'></span></td></tr>";
		decodeConcept(spanId, t, lang);
	});
	result +="</tbody></table>"

	return result;
}



function resetSearchFilter(){
	inputSearchText.val("*:*");
	inputLangSelect.val("");
	outputLangSelect.val([]);  // multiple value: comma separated en, es
	facets_select["portal"].val([]);
	facets_select["tags"].val([]);
	outputFormatSelect.val("");
	sortBySelect.val("");
	sortOrderAscRadio.checked = false;
	sortOrderDescRadio.checked = false;
	$(".btn-group button").removeClass("active");
	$("#showSearchUrlProxy").hide();
}

function clear(){
	$("#searchUrl").text("");
	$("#searchUrl").attr("href","");
	$("#searchUrlProxy").text("");
	$("#searchUrlProxy").attr("href","");
	$("#resultDetailTableBody").html("");
	$("#paginationUl").html("");
	$("#info-message-panel").hide();
}

function goToPage(page){
	$("#paginationStart").text(parseInt(page*rowsInPage));
	search();
}

function numPages(){
	return Math.ceil(resultSize/rowsInPage);
}

function currentPage(){
	return Math.ceil(start/rowsInPage) +1;
}

function scroolTo( panelId){
	var top= $('#'+panelId).offset().top;
	$('html,body').animate({scrollTop:top}, 500);
}

function decodeCountry(portalUrl){
	if(portalUrl == "www.opendatamalta.org")
		return "mt";
	return portalUrl.substring(portalUrl.lastIndexOf(".")+1)
}

function loadFacets(){
	//var url_facet = URL_PROXY_DOCUMENTS + encodeURIComponent("*:*&rows=0&facet=true&facet.limit=-1&facet.field=" + facetName);
	var action ="*:*&rows=0&facet=true&facet.limit=-1&wt=json&facet.sort=name";
	$.each(facets_list, function(value, label) {
		action += "&facet.field="+value;
	});
	var url_facet = URL_FSE_DOCUMENTS + action;
	console.log(url_facet);
	$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: url_facet}).done(function( data ) {
		console.log( "Found: ", data.response.numFound);
		$.each(facets_list, function(value, label) {
			cacheFacets(data.facet_counts.facet_fields[value],value);
			populateFacetCombos(data.facet_counts.facet_fields[value],facets_select[value]);
			populateFacetPanels(data.facet_counts.facet_fields[value],facets_panel[value]);
		});
		populateFacetCombos(data.facet_counts.facet_fields["portal"],inputCheckTagPortalsSelect);
		
		loadStatistics();
		refreshConceptsStatisticConceptsInPortal();
	});
}

function populateFacetCombos(data, select){
	select.append(" <option></option>");
	$.each(data, function(index, value) {
		if(index % 2 == 0){
			select.append(" <option value='"+value+"'>"+value+"</option>");
		}
	});
}

function cacheFacets(data, key){
	var list = new Array();
	var counter  =0;
	$.each(data, function(index, value) {
		if(index % 2 == 0){
			list[counter] = value;
			counter++;
		}
	});
	facets_list[key] = list;
}

function populateFacetPanels(data, panel){
	panel.append("<div class='row'>");
	$.each(data, function(index, value) {
		if(index % 8 == 0){
			panel.append("</div><div class='row'>");
		}
		if(index % 2 == 0){
			panel.append("<div class='span2'><label class='checkbox inline'><input type='checkbox' id='inlineCheckbox_"+value+"' value='"+value+"'><span class='metro-checkbox'>"+value+"</span></label></div>");
		}
	});
	panel.append("</div>");
}

function decodeConcept(spanId, conceptId, lang){

	var action = URL_FSE_ONTOLOGY+"conceptURI:"+conceptId+"&fq=language:(en%20or%20"+lang +")&start=0&rows=1000&wt=json";
	$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: action}).done(function( data ) {
		console.log( "decodeConcept: Found: ", data.response.numFound);
		var decodeOriginalLang = "";
		var decodeEn = "";
		$.each(data.response.docs, function(index, doc) {
			console.debug(index + " - " + doc.term);
			if(doc.language=="en")
				decodeEn += doc.term+", ";
			else
				decodeOriginalLang += doc.term+", ";
		});
		if(decodeOriginalLang.length>2) decodeOriginalLang= decodeOriginalLang.substring(0, decodeOriginalLang.length - 2);
		if(decodeEn.length>2) decodeEn= decodeEn.substring(0, decodeEn.length - 2);

		$("#"+spanId+"_original").html(decodeOriginalLang);
		$("#"+spanId+"_en").html(decodeEn);
	});
}

function refreshEuroVocCategories(){
	var lang = inputLangSelect.val();
	if(lang == null || lang=="")
		lang = "en";
	var selectedValues =  euroVocCategorySelect.val();
	euroVocCategorySelect.empty();
	euroVocCategorySelect.append(" <option></option>");
	$.each(euroVocCategories[lang], function(value, label) {
		euroVocCategorySelect.append(" <option value='"+value+"'>"+label+"</option>");
	});
	if(selectedValues!=null){
		$.each(selectedValues, function( index, value ){
			$('#euroVocCategorySelect option[value=' + value + ']').attr('selected', true);
		});
	}

}

function loadFields(){
	var action ="&wt=json";
	var url_fields = URL_FSE_ADMIN + action;
	console.log(url_fields);
	$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: url_fields}).done(function( data ) {
		console.log( "Status : ", data.responseHeader.status);
		sortBySelect.append(" <option></option>");
		sortBySelect.append(" <option value='package_id'>"+formatField("package_id")+"</option>");
		sortBySelect.append(" <option value='portal'>"+formatField("portal")+"</option>");
		sortBySelect.append(" <option value='metadata_created'>"+formatField("metadata_created")+"</option>");
		sortBySelect.append(" <option value='metadata_modified'>"+formatField("metadata_modified")+"</option>");
	});
}

function formatField(val){
	return val.charAt(0).toUpperCase() + val.slice(1).replace(/_/g," ");
}

function checkTag(){
	var tagInput = checkTagText.val();
	var lang = inputLangCheckTagSelect.val();
	console.log("tag: " + tagInput + " - lang: " + lang);
	// clear
	checkTagPanel.removeClass("error");
	checkTagWarning.hide();
	checkTagResultPanel.hide();
	checkTagKOIcon.hide();
	checkTagOKIcon.hide();
	checkTagTableResultPanel.hide();
	checkTagResultMessage.removeClass("checkTagKOColor");
	checkTagResultMessage.removeClass("checkTagOKColor");
	checkTagTableBody.html("");
	checkTagResultCounter.text("");	
	
	if(tagInput == null || tagInput=="" || lang == null || lang==""){
		checkTagPanel.addClass("error");
		checkTagWarning.show();
		return;
	}
	
	var langParam = "";
	if( lang != null && lang!="")
		langParam = "&fq=language:"+lang;

	var action = URL_FSE_ONTOLOGY+"search_text_"+lang+":\""+tagInput+"\"&start=0&rows=1000&wt=json";
	console.log(action);
	checkTagUrlProxy.text(URL_PROXY_ONTOLOGY+"search_text_"+lang+":\""+tagInput+"\"&start=0&rows=1000&wt=json");
	checkTagUrlProxy.attr("href",action);
	checkTagUrl.text(URL_FSE_ONTOLOGY+"search_text_"+lang+":\""+tagInput+"\"&start=0&rows=1000&wt=json");
	checkTagUrl.attr("href",URL_FSE_ONTOLOGY+"search_text_"+lang+":\""+tagInput+"\"&start=0&rows=1000&wt=json");

	$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: action}).done(function( data ) {
		console.log( "decodeConcept: Found: ", data.response.numFound);
		checkTagResultPanel.show();

		if(data.response.numFound==0){
			checkTagKOIcon.show();
			checkTagResultMessage.addClass("checkTagKOColor");
			checkTagResultMessage.text("Tag not found");
			checkTagTableResultPanel.hide();
		}
		else{
			checkTagOKIcon.show();
			checkTagResultMessage.addClass("checkTagOKColor");
			checkTagResultMessage.text("Tag found");
			checkTagResultCounter.text("Found "+data.response.numFound+" tags corresponding");
			checkTagTableResultPanel.show();
			var tbody = "";
			$.each(data.response.docs, function(index, doc) {
				tbody += "<tr><td><strong>id</strong>: " + doc.id +"</td>";
				tbody += "<td><strong>conceptURI</strong>: " + doc.conceptURI +"</td>";
				tbody += "<td><strong>language</strong>: " + doc.language +"</td>";
				tbody += "<td><strong>term</strong>: " + doc.term +"</td></tr>";
			});
			checkTagTableBody.html(tbody);
		}
	});

}

			
function checkTagsInPortal(){
	var portalInput = inputCheckTagPortalsSelect.val();
	console.log("portal: " + portalInput);
	// clear
	checkTagPortalsPanel.removeClass("error");
	checkTagPortalsWarning.hide();
	
	checkTagPortalsTableResultPanel.hide();
	
	if(portalInput == null || portalInput==""){
		checkTagPortalsPanel.addClass("error");
		checkTagPortalsWarning.show();
		return;
	}
	
	

	checkTagPortalsTableResultProgressBar.show();
	
	action = URL_FSE_DOCUMENTS + "*:*&fq=portal%3A"+portalInput+"&wt=json&start=0&rows=1000";
	console.log(action);
	var counter=1;
	$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: action}).done(function( data ) {
			console.log( "Found: ", data.response.numFound);
			checkTagPortalsTableResultPanel.show();
			
			var totalData = data.response.numFound
			var numDataOK = 0;
			var numDataKO = 0;
			var offset = 0;
			$.each(data.response.docs, function(index, doc) {
				setTimeout(function(){
				var tagArray = doc.tag;
				var lang = doc.language;
				if(lang!=undefined)
					lang = lang.toLowerCase();
				else 
					lang="it";
				var tags = "NaN";
				if(tagArray === undefined){
					tagArray = new Array();
					console.warn("data without tags: " + doc.package_id + " counter: " + counter);
				}
				else
					tags = tagArray.join(' OR ');
				var action = URL_FSE_ONTOLOGY+"search_text_"+lang+":("+tags+")&start=0&rows=1000&wt=json";
				console.log(action);
				$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: action}).done(function( data ) {
						checkTagPortalsTableResultProgressBar.css("width",Math.round(counter*100/totalData)+"%");
						if(data.response.numFound>0){
							numDataOK++;
						}
						else{
							numDataKO++;
						}
						var percent = Math.round(numDataOK*100/totalData);
						var percentHtml = percent + "%";
						if(percent == 100){
							percentHtml =  percent + "% &nbsp;<i class='icon-trophy trophy-gold' ></i>";
						}
						else if(percent>80){
							percentHtml =  percent + "% &nbsp;<i class='icon-trophy trophy-silver' ></i>";
						}
						else if(percent>60){
							percentHtml =  percent + "% &nbsp;<i class='icon-trophy trophy-bronze' ></i>";
						}
						var tbody = "<tr><td>"+portalInput+"</td><td>"+totalData+"</td><td>"+numDataOK+"</td><td>"+numDataKO+"</td><td>"+percentHtml+"</td><td><a href='checkTagInPortalList.html?portal="+portalInput+"' class='btn btn-mini btn-primary' target='_blank'>Detail</a></td></tr>";
						checkTagPortalsTableBody.html(tbody);
						counter++;
						
						if(counter == totalData) 
							checkTagPortalsTableResultProgressBar.hide();
						
					});
				
				},50+ offset);  
				offset += 50;
			});

		}
	);
}

/* statistics */
function loadStatistics() {
	loadStatisticHomerCategory();
	loadStatisticHomerPortal();
	loadStatisticHomerTags();
}

function loadStatisticHomerCategory(){
	var resultArray =  {"Category": "Count"};
	var counter = 0;
	var allLoaded = false;
	var categoriesLength = Object.keys(euroVocCategories["en"]).length;
	$.each(euroVocCategories["en"], function(value, label) {
		//var action  = URL_PROXY_DOCUMENTS + encodeURIComponent("*:*&fq=concept%3A" + value + "&start=0&rows=1&wt=json");
		var action  = URL_FSE_DOCUMENTS + label.replace(/ /g,"+")+"&lang=en&start=0&rows=1&wt=json";
		console.log("label", label);
		console.log(action);

		$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: action}).done(function( data ) {
			console.log( "Found: " + label + " - "+  data.response.numFound);
			resultArray[label]=data.response.numFound;
			var chartId = "statistic-homer-category"
			var chart = new google.visualization.PieChart($("#"+chartId+"-chart")[0]);
			var colors = ['#B50000', '#E00000', '#FF0A0A', '#FF3333', '#FF5C5C'];
			drawChart("Category", chartId, resultArray ,chart, colors);
			counter++;
			if(counter == categoriesLength)
				allLoaded = true;
		});
	});
	
}



function loadStatisticHomerPortal(){
	var resultArray =  {"Portal": "Count"};
	var action ="*:*&rows=0&facet=true&facet.limit=-1&wt=json&facet.sort=count&facet.field=portal";
	var url_facet = URL_FSE_DOCUMENTS + action;
	console.log(url_facet);
	$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: url_facet}).done(function( data ) {
		console.log( "Found: ", data.response.numFound);
		var counter = 0;
		$.each(data.facet_counts.facet_fields["portal"], function(value, label) {
			if(counter % 2 == 0){
				resultArray[label]=data.facet_counts.facet_fields["portal"][value+1];
			}
			counter++;
			if(counter == 40) 
				return false;
		});
		var chartId = "statistic-homer-portal"
		var chart = new google.visualization.PieChart($("#"+chartId+"-chart")[0]);
		var colors = ['#CCB800','#E0CA00','#F5DC00','#FFE70A','#FFE91F','#FFEB33','#FFED47','#FFEF5C','#FFF170','#FFF385','#FFF599','#FFF7AD','#FFF9C2','#FFFBD6','#FFFDEB'];
		drawChart("Portal", chartId,resultArray, chart, colors);
	});
}
	
function loadStatisticHomerTags(){
	var resultArray =  {"Tag": "Count"};
	var action ="*:*&rows=0&facet=true&facet.limit=-1&wt=json&facet.sort=count&facet.field=tag";
	var url_facet = URL_FSE_DOCUMENTS + action;
	console.log(url_facet);
	$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: url_facet}).done(function( data ) {
		console.log( "Found: ", data.response.numFound);
		var counter = 0;
		$.each(data.facet_counts.facet_fields["tag"], function(value, label) {
			if(counter % 2 == 0){
				resultArray[label]=data.facet_counts.facet_fields["tag"][value+1];
			}
			counter++;
			if(counter == 20) 
				return false;
		});
		var chartId = "statistic-homer-tag"
		var chart = new google.visualization.PieChart($("#"+chartId+"-chart")[0]);
		var colors = ['#00283D', '#003552', '#004266', '#00507A', '#005D8F', '#006AA3', '#0077B8', '#0085CC', '#0092E0', '#009FF5', '#0AA9FF', '#19AEFF', '#33B8FF', '#47BFFF', '#5CC6FF', '#70CDFF', '#85D4FF', '#99DBFF', '#ADE2FF', '#C2EAFF'];
		drawChart("Tag", chartId,resultArray, chart, colors);
	});
}

function drawChart(title, chartId, resultArray, chart, colors){
	var tableBody = "";
	console.log("resultArray",resultArray);
	var data = new google.visualization.DataTable();
	data.addColumn('string', title);
	data.addColumn('number', 'Count');
	var counter = 0;
	var indexColor = -1;
	var totalItems = resultArray.length;
	$.each(resultArray, function(label, count) {
		if(counter>0){
			tableBody += "<tr><td><span class='statistics-legend-bullet'style='background-color: "+colors[indexColor]+"'></span>"+label+"</td><td>"+count+"<td></tr>";
			data.addRow([label,count]);
		}
		counter++;
		indexColor++;
		if(indexColor==totalItems)
			indexColor=0;
	});
	$("#"+chartId+"-tablebody").html(tableBody);

	var options = {
	   colors: colors,//['#1074c2', '#662577', '#ea178c', '#81ae1d', '#f3953e', "#118171"],
	   legend: { position: 'none' },
	   chartArea: {top:20, width:"100%",height:"100%"},
	   pieSliceTextStyle: {'left': '-20px'}

	};

	console.log("resultArray2",resultArray);
	
	chart.draw(data, options);
}

function sortMap(inputMap){
	var arrayTmp = new Array();
	var counter = 0;
	var firstRow = inputMap[0];
	var counter = 0;
	$.each(inputMap, function(label, count) {
		arrayTmp[counter] = count+"-"+label;
		counter++
	});
	arrayTmp = arrayTmp.sort( function (a, b) {
		return parseInt(a.split("-")[0])<parseInt(b.split("-")[0]);
	});
	var outputMap = {};
	$.each(arrayTmp, function( index, value ) {
		outputMap[value.split("-")[1]]=value.split("-")[0];
	});
}


function updateStatisticConceptsInPortal(){
	var selectedTag = statistictConceptsInPortalSelect.val();
	var selectedLabel = $('#statistictConceptsInPortalSelect option:selected').text();
	var tableBody = "";
	if(selectedTag ==null || selectedTag==""){
		statistictConceptsInPortalSelectedTag.text("");
	}
	else{
		statistictConceptsInPortalSelectedTag.text(selectedLabel);
	}
	
	statistictConceptsInPortalTablebody.html(tableBody);
	var resultArray =  {"Portal": "Count"};
	var counter = 0;
	var action ="concept:"+selectedTag+"&rows=0&facet=true&facet.limit=-1&wt=json&facet.sort=count&facet.field=portal";
	var url_facet = URL_FSE_DOCUMENTS + action;
	console.log(action);

	$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: url_facet}).done(function( data ) {
		console.log( "Found: " +  data.response.numFound);
		var counter = 0;
		$.each(data.facet_counts.facet_fields["portal"], function(value, label) {
			if(counter % 2 == 0){
				resultArray[label]=data.facet_counts.facet_fields["portal"][value+1];
			}
			counter++;
		});
		var chartId = "statistic-concepts-in-portal"
		var chart = new google.visualization.PieChart($("#"+chartId+"-chart")[0]);
		var colors = ['#316204','#3B7604','#458A05','#4E9A06','#59B106','#63C507','#6DD908','#77EC09','#81F613'];
		drawChart("Portal", chartId,resultArray, chart, colors);
	});
}

function refreshConceptsStatisticConceptsInPortal(){
	var lang = statistictConceptsInPortalLangSelect.val();
	$.each(facets_list["concept"], function( index, value ) {
		 refreshConceptsListInSelect(statistictConceptsInPortalSelect, value,lang);
	});
}

function refreshConceptsListInSelect(select, conceptId,lang){
	var action = URL_FSE_ONTOLOGY+"conceptURI:"+conceptId+"&fq=language:"+lang +"&start=0&rows=1000&wt=json";
	select.html("");
	$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: action}).done(function( data ) {
		console.log( "decodeConcept: Found: ", data.response.numFound);
		$.each(data.response.docs, function(index, doc) {
			console.debug(index + " - " + doc.term);
			select.append(" <option value='"+doc.conceptURI+"'>"+doc.term+"</option>");
		});
	});
}


function loadCloudTags(){
	var tagsArray =  {"Tag": "Count"};
	var action ="*:*&rows=0&facet=true&facet.limit=-1&wt=json&facet.sort=count&facet.field=tag";
	var url_facet = URL_FSE_DOCUMENTS + action;
	loadCloudTagProxy.text(URL_PROXY_DOCUMENTS+action);
	loadCloudTagProxy.attr("href",URL_PROXY_DOCUMENTS+action);
	loadCloudTagUrl.text(URL_FSE_DOCUMENTS+action);
	loadCloudTagUrl.attr("href",URL_FSE_DOCUMENTS+action);

	console.log(url_facet);
	$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: url_facet}).done(function( data ) {
		console.log( "Found: ", data.response.numFound);
		var counter = 0;
		var maxCount = 0;
		var minCount = 0;
		$.each(data.facet_counts.facet_fields["tag"], function(value, label) {
			if(counter % 2 == 0){
				var count = data.facet_counts.facet_fields["tag"][value+1];
				tagsArray[label]= count;
				if(count>maxCount) maxCount = count;
				if(count<minCount) minCount = count;
			}
			counter++;
			if(counter == 60) 
				return false;
		});
		
		var maxFontSize = 32;
		var minFontSize = 4;
		
		var cloudHtml = "";
		counter = 0;
		var tagCloudItems = new Array();
		$.each(tagsArray, function(label, count) {
			if(counter>0){
				var fontSize = minFontSize+(count-minCount)/(maxCount-minCount)*(maxFontSize-minFontSize);
				tagCloudItems[counter-1] = "<span class='tag-cloud-item' style='font-size:"+Math.round(fontSize)+"px'>"+label+"</span> ";
			}
			counter++;
		});	
		tagCloudItems.sort(function() {
			return .5 - Math.random();
		});
		
		$.each(tagCloudItems, function(index, value ) {
			cloudHtml += value;
		});
		
		$("#tagCloudPanel").html(cloudHtml);

	});
}


// check tag portals page

function initCheckTagPortals(){
	var portal = getUrlParameters("portal", "", true);
	$("#portalName").text(portal);
	$("title").text("Homer Federated Search Engine - Check EuroVOC tag in "+portal);
	checkTagsInPortalResultList(portal)
}

function checkTagsInPortalResultList(portalInput){
	console.log("portal: " + portalInput);
	
	action = URL_FSE_DOCUMENTS + "*:*&fq=portal%3A"+portalInput+"&wt=json&start=0&rows=1000";
	console.log(action);
	var checkTagPortalsListTableBody = $("#checkTagPortalsListTableBody");
	var checkTagPortalsListTotalData = $("#checkTagPortalsListTotalData");
	var checkTagPortalsListTotalDataOk = $("#checkTagPortalsListTotalDataOk");
	var checkTagPortalsListTotalDataKo = $("#checkTagPortalsListTotalDataKo");
	var checkTagPortalsListTotalDataPercent = $("#checkTagPortalsListTotalDataPercent");
	var checkTagPortalsListLang = $("#checkTagPortalsListLang");
	
	var checkTagPortalsListProgressBar = $("#checkTagPortalsListProgressBar");
	var checkTagListWin = $("#checkTagListWin");
	checkTagPortalsListProgressBar.show();
	$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: action}).done(function( data ) {
			console.log( "Found: ", data.response.numFound);
			var totalData = data.response.numFound
			checkTagPortalsListTotalData.text(totalData);
			var numDataOK = 0;
			var numDataKO = 0;
			var offset = 0;
			var counter = 1;
			$.each(data.response.docs, function(index, doc) {
				setTimeout(function(){
				var tagArray = doc.tag;
				var lang = doc.language;
				if(lang!=undefined)
					lang=lang.toLowerCase();
				else 
					lang="it";
				var tags = "NaN";
				
				checkTagPortalsListLang.text(lang);

				if(tagArray === undefined){
					tagArray = new Array();
					console.warn("data without tags: " + doc.package_id + " counter: " + counter);
				}
				else
					tags = tagArray.join(' OR ');
				var action = URL_FSE_ONTOLOGY+"search_text_"+lang+":("+tags+")&start=0&rows=1000&wt=json";
				console.log("action:" + action);
				
				
				checkTagPortalsListProgressBar.css("width",Math.round(counter*100/totalData)+"%");
				if(counter == totalData) 
					checkTagPortalsListProgressBar.hide();
					
				$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: action}).done(function( data ) {

						var tdClass="check-tag-list-td-ko";
						var hideWarning = "";
						if(data.response.numFound>0){
							numDataOK++;
							tdClass="check-tag-list-td-ok";
						}
						else{
							hideWarning = "style='display:none'";
							numDataKO++;
						}

						var percent = Math.round(numDataOK*100/totalData);
						var tagsSpan = "";
						var warningId = "check_tag_warning_" + counter;

						$.each(tagArray, function(index, tag) {
							var spanId = "tag_" + tag.replace(/ /g, '_').replace(/'/g, '_') + "_" + counter;
							tagsSpan += "<span id='"+spanId+"' class='check-tag-list-tag check-tag-list-tag-ko'>"+tag+"</span>";
						});
						if(tagArray.length == 0){
							tagsSpan = "<span class='check-tag-list-tag-NaN check-tag-list-tag'><i>No tag</i></span>";
						}

						var tbody = "<tr><td>"+counter+"</td><td><a href='"+ doc.url + "' target='_blank'>"+doc.package_id+"</a></td><td>"+doc.title+"</td><td><i "+ hideWarning+" id='"+warningId+"' class='icon-warning-2 check-tag-list-warning' title='There are no tags compliant with EurVOC. The search engine found some EuroVOC concept from title or descriptions, but is better use tags.'></i></td><td>"+tagsSpan+"</td><td><div class='"+tdClass+" check-tag-list-td'></div></td></tr>";
						checkTagPortalsListTableBody.append(tbody);
						checkTagPortalsListTotalDataOk.text(numDataOK);
						checkTagPortalsListTotalDataKo.text(numDataKO);
						checkTagPortalsListTotalDataPercent.text(percent + "%");
						$.each(tagArray, function(index, tag) {
							var spanId = "tag_" + tag.replace(/ /g, '_').replace(/'/g, '_') + "_" + counter;
							checkSingleTagInList(lang, tag, spanId,warningId,doc.concept);
						});

						counter++;
						if(counter == totalData) {
							checkTagPortalsListProgressBar.hide();
						}
						
						if(percent == 100){
							checkTagListWin.removeClass();
							checkTagListWin.addClass("trophy-gold");
							checkTagListWin.html("<i class='icon-trophy' ></i> Win!");
							checkTagListWin.show();
						}
						else if(percent>80){
							checkTagListWin.removeClass();
							checkTagListWin.addClass("trophy-silver");
							checkTagListWin.html("<i class='icon-trophy' ></i> Almost&hellip;");
							checkTagListWin.show();
						}
						else if(percent>60){
							checkTagListWin.removeClass();
							checkTagListWin.addClass("trophy-bronze");
							checkTagListWin.html("<i class='icon-trophy' ></i> Nice&hellip;");
							checkTagListWin.show();
						}
						else{
							checkTagListWin.hide();
						}

					});
				
				},50+ offset);  
				offset += 50;
			});

		}
	);
}

function checkSingleTagInList(lang, tag, spanId, warningId, dataConcepts){
	var action = URL_FSE_ONTOLOGY+"search_text_"+lang+":("+tag+")&start=0&rows=1000&wt=json";
	$.ajax({ dataType: "json", encoding:"UTF-8",contentType: "text/plain; charset=utf-8",url: action}).done(function( data ) {
		var span = $("#"+spanId);
		console.error(dataConcepts.length);
		if(data.response.numFound>0 && dataConcepts  != undefined && dataConcepts.length>0){
			$.each(data.response.docs, function(index, doc) {
				console.warn(doc.conceptURI,dataConcepts[0]);

				if(checkConceptInList(doc.conceptURI, dataConcepts)){
					span.removeClass("check-tag-list-tag-ko");
					span.addClass("check-tag-list-tag-ok");
					$("#"+warningId).hide();
					return;
				}
			});
		}
	});
}

function checkConceptInList(concept, conceptList){
	
	var found = false;
	console.warn("in - concept::" + concept);
	if(conceptList.length>0){
		$.each(conceptList, function(index, doc) {
		console.warn("in - doc::" + doc);
			if(doc == concept){
				found=true;
				return;
			}
		});
	}
	
	return found;
}

function checkTagInList(tag, tagList){
	
	var found = false;
	if(tagList.length>0){
		$.each(tagList, function(index, doc) {
			if(doc.term.toLowerCase() == tag.toLowerCase()){
				found=true;
				return;
			}
		});
	}
	
	return found;
}

function getUrlParameters(parameter, staticURL, decode){
   var currLocation = (staticURL.length)? staticURL : window.location.search,
       parArr = currLocation.split("?")[1].split("&"),
       returnBool = true;
   
   for(var i = 0; i < parArr.length; i++){
        parr = parArr[i].split("=");
        if(parr[0] == parameter){
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        }else{
            returnBool = false;            
        }
   }
   
   if(!returnBool) return false;  
}
