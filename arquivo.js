// Julia Louback Ribeiro
window.onload = function(){ // função que é chamada ao carregar a página
	document.getElementById("divNumeros").style.display = "block"; // mostra o elemento na página
	document.getElementById("divTabela").style.display = "none"; // não mostra o elemento na página
}

novoArray = []

function inserir(){
	if(document.getElementById("numero").value !== ''){
		var numeros = Number(document.getElementById("numero").value)
		novoArray.push(numeros)
		document.getElementById("form1").reset();
		document.getElementById("numero").focus()

		var mostrar = document.getElementById('mostrar');
		mostrar.innerHTML = novoArray
	} else {
		alert('Insira um valor!')
	}
}

function entrar(){
	// novoArray = [75, 60.1, 74.6, 68.1, 64.3, 67.2, 75.3, 79.3, 66.4, 86.6, 80, 85, 72.5, 73.2, 68.9, 71, 81.3, 64.2, 73, 81.2]
	// novoArray = [70,70,72,74,75,75,76,77,77,77,78,80,82,83,84,84,85,85,86,88]
	/*novoArray= [
		18,	18,	19,	19,	20,	21,	21,	21,	22,	22,	22,	22,	22,
		22,	23,	23,	23,	23,	23,	23,	23,	24,	24,	24,	24,	24,
		24,	24,	24,	24,	25,	25,	25,	25,	26,	26,	26,	26,	26,
		26,	26,	26,	26,	26,	26,	27,	27,	27,	27,	27,	27,	27,
		27,	27,	27,	27,	27,	27,	27,	27,	27,	27,	29,	29,	29,
		29,	29,	29,	29,	29,	30,	30,	30,	30,	30,	30,	30,	30,
		30,	30,	31,	31,	31,	31,	31,	31,	31,	32,	32,	32,	32,
		32,	33,	33,	33,	34,	34,	34,	34,	34,	35,	36,	36,	36,
		37,	37,	37,	37,	37,	38,	38,	38,	38,	38,	39,	39,	39,
		40,	40,	40,	40,	40,	40,	41,	41,	41,	42,	42,	42,	42,
		43,	43,	43,	44,	44,	44,	45,	45,	45,	46,	46,	47,	47,
		47,	47,	48,	48,	48,	48,	48,	48,	49,	49,	50,	50,	50,
		51,	51,	52,	52,	53,	53,	53,	53,	56,	61,	62,	63,	63
	] */
	/*novoArray = [
		52,	27,	46,	15,	22,	20,	68,	73,	19, 30, 
		33,	58,	24,	35,	32,	27,	42,	30, 45, 40,
		70,	21,	27,	50,	51,	31,	17, 20,	60, 63

	]*/

	if(novoArray.length !== 0){
		document.getElementById("divNumeros").style.display = "none"; // mostra o elemento na página
		document.getElementById("divTabela").style.display = "block"; // não mostra o elemento na página

		novoArray.sort(function(a, b) {
			return a - b;
		});

		var m = Math.min.apply(Math, novoArray);
		var M = Math.max.apply(Math, novoArray);
		var k = 1 + (3.3 * Math.log10(novoArray.length));

		var h = (Number(M) - Number(m))/ Number(k)
		var classes = k

		if(Number.isInteger(classes)){
			classes = classes
		} else {
			classes = Math.ceil(classes)
		}
		
		var decimal = Number((h - Math.floor(h)).toFixed(1))

		if(Number.isInteger(h)){
			intervalo = h
		} else {
			if(decimal === 0.0){
				intervalo = h.toFixed()
			} else {
				intervalo = Math.ceil(h)
			}
		}

		console.log(h)

		tabelaIntervalo = [];
		acesso = {
			inicio: 0,
			final: 0
		}

		let auxiliar = Number(m)

		for(var i = 0; i <= classes - 1; i++){
		
			var teste = auxiliar
			auxiliar = auxiliar + (Number(intervalo))
			acesso.inicio = teste
			acesso.final = auxiliar

			tabelaIntervalo[i] = acesso

			acesso = {
				inicio: 0,
				final: 0,
				frequencias: 0
			}
		}
		
		this.frequencias(tabelaIntervalo)
	} else {
		alert('Você não pode gerar uma tabela vazia!')
	}
}

function frequencias(tabelas){

	var teste = 0
	while(teste <= tabelas.length - 1){
		var count = 0
		for(var j = 0; j <= novoArray.length-1; j++){
			if(novoArray[j] >= tabelas[teste].inicio && novoArray[j] < tabelas[teste].final){
				count = count + 1
			} else {
				continue
			}
		}
		tabelas[teste].frequencias = count
		teste = teste + 1
	}	
	console.log(tabelas)
	
	$("#dataTable").html("");
	$("#dataTable").html(
		"<thead>"+
		"	<tr>"+
		"	<th>Classes</th>"+
		"	<th>f</th>"+
		"	<th>F</th>"+
		"	<th>fr(%)</th>"+
		"	<th>FR(%)</th>"+
		"	</tr>"+
		"</thead>"+
		"<tbody style='border: none'>"+
		"</tbody>"+
		"<tfoot style='border-top: solid 2px #eeeeee;border-bottom: solid 2px #eeeeee'>"+
		"</tfoot>"
		);

	var acumulada = 0
	var totalFrequencia = 0
	for(var j = 0; j <= tabelas.length -1;j++){
		acumulada = acumulada + tabelas[j].frequencias
		totalFrequencia = totalFrequencia  + ((tabelas[j].frequencias / novoArray.length) * 100)
		if(tabelas[j].frequencias !== 0){
			$("#dataTable tbody").append(
				"	<tr style='color:red;'>"+
				"	<td>"+tabelas[j].inicio+" - "+tabelas[j].final+"</td>" + 
				"	<td>"+tabelas[j].frequencias+"</td>" + 
				"	<td>"+acumulada+"</td>" + 
				"	<td>"+((tabelas[j].frequencias / novoArray.length) * 100).toFixed(2)+"</td>" + 
				"	<td>"+((acumulada / novoArray.length) * 100).toFixed(2)+"</td>" + 											
				"</tr>"
			);
		}
		
	}

	$("#dataTable tfoot").append(
		"	<tr>"+
		"	<th>Total</th>" + 
		"	<td>"+novoArray.length+"</td>" +
		"	<td></td>" +	
		"	<td>"+(totalFrequencia).toFixed()+"%</td>" +	
		"	<td></td>" +								
		"</tr>"
	);
	
}

function limpar(){
	novoArray= []
	mostrar.innerHTML = novoArray
}

function voltar(){
	novoArray= []
	mostrar.innerHTML = novoArray
	document.getElementById("divNumeros").style.display = "block"; // mostra o elemento na página
	document.getElementById("divTabela").style.display = "none"; // não mostra o elemento na página
}