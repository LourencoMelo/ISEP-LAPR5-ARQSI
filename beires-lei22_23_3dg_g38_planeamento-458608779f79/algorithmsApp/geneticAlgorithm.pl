:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic tempo_limite/1.

:-dynamic entregasCamiao/2.
:-dynamic planeamentoPorCamiao/4.

%entrega(<idEntrega>,<data>,<massaEntrega>,<armazemEntrega>,<tempoColoc>,<tempoRet>)

% entrega(4439, 20221205, 200, "ARO", 8, 10).
% entrega(4438, 20221205, 150, "POV", 7, 9).
% entrega(4445, 20221205, 100, "GND", 5, 7).
% entrega(4443, 20221205, 120, "POR", 6, 8).
% entrega(4449, 20221205, 300, "TIR", 15, 20).

% % entrega(5439, 20230109, 200, "ARO", 8, 10).
% % entrega(5438, 20230109, 1500, "POV", 50, 60).
% % entrega(5445, 20230109, 1600, "GND", 53, 62).
% % entrega(5443, 20230109, 120, "POR", 6, 8).
% % entrega(5449, 20230109, 300, "TIR", 15, 20).
% % entrega(5398, 20230109, 310, "GAI", 16, 20).
% % entrega(5432, 20230109, 1700, "VCA", 55, 65).
% % entrega(5437, 20230109, 1800, "SJM", 60, 70).
% % entrega(5451, 20230109, 440, "OAZ", 18, 24).
% % entrega(5452, 20230109, 1400, "TRO", 47, 58).
% % entrega(5444, 20230109, 380, "ESP", 20, 25).
% % entrega(5455, 20230109, 560, "PAR", 28, 38).
% % entrega(5399, 20230109, 260, "VAL", 13, 18).
% % entrega(5454, 20230109, 350, "FEI", 18, 22).
% % entrega(5446, 20230109, 260, "MAI", 14, 17).
% % entrega(5456, 20230109, 1300, "VCO", 45, 55).

:-dynamic entregas/1.
:-dynamic melhorGene/1.

armazem_inicial("MAT").

% %carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
% % carateristicasCam(eTruck01,7500,4300,80,100,60).
% % carateristicasCam(eTruck02,7500,4300,80,100,60).
% % carateristicasCam(eTruck03,7500,4300,80,100,60).
% % carateristicasCam(eTruck04,7500,4300,80,100,60).
% % carateristicasCam(eTruck05,7500,4300,80,100,60).


%=========================================================Predicados Distribuição Camiões=============================================================

/**
* Calcula nº necessário de camiões para a lista de entregas total
*
*/
numeroCamioesNecessarios(ListaEntregas, NumeroNecessario) :-
	getMassaTotalEntregas(ListaEntregas, MassaTotal),
	arredonda(MassaTotal/4300,NumeroNecessario1,0),
	(NumeroNecessario1 * 4300) =< MassaTotal,!, NumeroNecessario is NumeroNecessario1+1.

numeroCamioesNecessarios(ListaEntregas, NumeroNecessario) :-
	getMassaTotalEntregas(ListaEntregas, MassaTotal),
	arredonda(MassaTotal/4300,NumeroNecessario,0).


/**
*	Atribui a cada camião necessário as entregas a fazer
*
*/
atribuiEntregasCamioes(ListaEntregas,[C|_],1,_) :-
	asserta(entregasCamiao(C,ListaEntregas)).

atribuiEntregasCamioes(ListaEntregas, [C|Resto],NumeroNecessario,EntregasPorCamiao) :-
	retiraXPrimeirosElementos(ListaEntregas, EntregasPorCamiao, ListaEntregasParcelada),
	length(ListaEntregas, Tamanho),
	sublista(ListaEntregas, EntregasPorCamiao+1, Tamanho, RestantesEntregas),
	eliminah(RestantesEntregas, RestantesEntregasFinal),
	asserta(entregasCamiao(C,ListaEntregasParcelada)),
	NumeroNecessario1 is NumeroNecessario - 1,
	atribuiEntregasCamioes(RestantesEntregasFinal, Resto, NumeroNecessario1, EntregasPorCamiao).


	planeamentoFrota( NG, DP, P1, P2, T) :-
		findall(IdEntrega, entrega(IdEntrega,_,_,_,_,_), ListaEntregas),
		findall(IdCamiao, carateristicasCam(IdCamiao,_,_,_,_,_), ListaCamioes),
		asserta(geracoes(NG)),
		asserta(populacao(DP)),
		asserta(prob_cruzamento(P1)),
		asserta(prob_mutacao(P2)),
		asserta(tempo_limite(T)),
		numeroCamioesNecessarios(ListaEntregas, NumeroNecessario),
		getEntregasPorCamiao(ListaEntregas,NumeroNecessario, EntregasPorCamiao),
		atribuiEntregasCamioes(ListaEntregas, ListaCamioes, NumeroNecessario, EntregasPorCamiao),
		findall(IdCamiaoCheio, entregasCamiao(IdCamiaoCheio,_), ListaCamioesUsados),
		geraParaFrota(ListaCamioesUsados).

	geraParaFrota([]).
	geraParaFrota([C|Resto]):-
		gera_entregas(C),
		geraParaFrota(Resto).


	getMelhorGeneEValor(Ind*V, Ind, V).


	getEntregasPorCamiao(ListaEntregas, NumeroNecessario, EntregasPorCamiao):-
		length(ListaEntregas, NumEntregas),
		arredonda(NumEntregas/NumeroNecessario, EntregasPorCamiao, 0). 

%==========================================================================================================================================================



% entregas(Q):-findall(_,entrega(_,_,_,_,_,_),L),qtde(L,Q).
% qtde([],0).
% qtde([_|T],S):-qtde(T,G),S is 1+G.


removeMatosinhos([],[]).
removeMatosinhos([X*V|L],[X2*V|LF]):-armazem_inicial(M),remover(M,X,X2),removeMatosinhos(L,LF).

remover( _, [], []).
remover( R, [R|T], T2) :- remover( R, T, T2).
remover( R, [H|T], [H|T2]) :- H \= R, remover( R, T, T2).

inserir_final([],Y,[Y]).
inserir_final([I|R],Y,[I|R1]) :-inserir_final(R,Y,R1).



adicionarArmazemInicial(L, Result) :- 
	armazem_inicial(Armazem_Inicial), 
	inserir_ArmazemInicial_inicio(L, Result1), 
	inserir_final(Result1, Armazem_Inicial, Result).


adicionarArmazemInicialAPopulacao([],[]).
adicionarArmazemInicialAPopulacao([Ind|Resto], [IndComMatosinhos|LF]) :- 
	adicionarArmazemInicial(Ind,IndComMatosinhos),
	adicionarArmazemInicialAPopulacao(Resto, LF).
	 	


inserir_ArmazemInicial_fim(L, Result) :- armazem_inicial(Armazem_Inicial), append(L, Armazem_Inicial, Result).

inserir_ArmazemInicial_inicio(L, [Armazem_Inicial|L]) :- armazem_inicial(Armazem_Inicial). 



%% Inicialização dos valores necessários para gerar a solução
/**
*	NG -> Número de novas gerações
*	DP -> Dimensão da população a gerar
*	P1 -> Probabilidade de cruzamento(%)
*	P2 -> Probabilidade de mutação(%)
*	T  -> Tempo limite de execução(segundos)
*
*/
inicializa:-
	write('Numero de novas Geracoes: '),
		read(NG), 	
			(retract(geracoes(_));true), 
				asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),
		read(DP),
			(retract(populacao(_));true), 
				asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), 
		read(P1),
			PC is P1/100, 
				(retract(prob_cruzamento(_));true),
					asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), 
		read(P2),
			PM is P2/100, 
				(retract(prob_mutacao(_));true), 
					asserta(prob_mutacao(PM)),
	write('Tempo limite de execucao (S): '),
		read(T),
			(retract(tempo_limite(_));true),
			asserta(tempo_limite(T)).				


/**
*
*	PopOrd é a lista com a geração inicial.
*	Cada elemento da lista é do tipo LT*Av. LT -> [entrega1,entrega2,entrega3] e Av -> 20 segundos.
*	O "*" serve apenas de separador.
*	A condição de paragem extra a ser adicionada é relativa ao tempo limite de execução.
*/
gera_entregas(Camiao):-
	% nl,write('Entrou camiao : '), write(Camiao),
	% inicializa,
	gera_populacao(Pop,Camiao), 								%Gera uma população com os dados inseridos no inicializa e guarda-a na variável Pop
	% write('Pop='),write(Pop),nl,								%Escreve a população na consola
	avalia_populacao(Pop,PopAv),								%Guarda a população avaliada na variável PopAv
	% write('PopAv='),write(PopAv),nl,							%Escreve a população avaliada na consola
	ordena_populacao(PopAv,PopOrd),								%Guarda a população ordenada na variável PopOrd
	% write('PopOrd='),write(PopOrd),nl,							%Escreve a população ordenada na consola
	geracoes(NG),												%Obtém o nº de gerações indicado antes
	tempo_limite(TL),											%Obtém o tempo limite
	gera_geracao(0,NG,TL, PopOrd),
	% write('Passei o gera geracao!'),nl,
	entregasCamiao(Camiao, ListaEntregas),
	melhorGene(Gene),
	getMelhorGeneEValor(Gene, Caminho, Tempo),
	% write('Melhor Gene : '), write(Gene),nl, write(Caminho),nl,write(Tempo),
	asserta(planeamentoPorCamiao(Camiao, ListaEntregas, Caminho, Tempo)).


%=============================================================Gera População==============================================================================


gera_populacao([PercursoHeuristicaPorTempo,PercursoHeuristicaPorTempoeMassa|Pop],Camiao):-
	populacao(TamPop1),																%Guarda na variável TamPop o tamanho inserido no inicializa para a população ter
	TamPop is TamPop1 - 2,
	% entregas(NumEntregas),															%Guarda na variável NumEntregas o nº de entregas 
	% findall(IdEntrega, entrega(IdEntrega,_,_,_,_,_), ListaEntregas),
	entregasCamiao(Camiao, ListaEntregas),nl,
	length(ListaEntregas,NumEntregas),
	(retract(entregas(_));true),
	asserta(entregas(NumEntregas)),
	getAllWarehousesIDFromADeliveryList(ListaEntregas, ListaArmazens),				%Vai buscar lista de armazens atraves da lista de entregas
	heuristicaPorTempo(ListaEntregas, PercursoHeuristicaPorTempo),					%Calcula a heuristica por tempo
	heuristicaPorTempoeMassa(ListaEntregas, PercursoHeuristicaPorTempoeMassa),		%Calcula a heuristica por tempo e massa

	gera_populacao(TamPop,ListaArmazens,NumEntregas,Pop).							


gera_populacao(0,_,_,[]):-!.														%Condição de paragem. Quando tamanho população for 0

gera_populacao(TamPop,ListaArmazens, NumEntregas,[Ind|Resto]):-
	TamPop1 is TamPop-1,															%Decrementa o tamanho da população
	gera_populacao(TamPop1,ListaArmazens,NumEntregas,Resto),						%Gera população após decrementar o tamanho da população
	gera_individuo(ListaArmazens,NumEntregas,Ind1),	
	adicionarArmazemInicial(Ind1, Ind),				
	not(member(Ind,Resto)).


/**
*	Entra neste predicado caso a condição acima falhe. Isto permite que seja gerada outra solução 
*
*/
gera_populacao(TamPop,ListaArmazens,NumEntregas,L):-
	gera_populacao(TamPop,ListaArmazens,NumEntregas,L).


%=============================================================Gera Indivíduo==============================================================================


gera_individuo([G],1,[G]):-!.										%Condição de paragem.

gera_individuo(ListaArmazens,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaArmazens,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

	retira(1,[G|Resto],G,Resto).
	retira(N,[G1|Resto],G,[G1|Resto1]):-
		N1 is N-1,
		retira(N1,Resto,G,Resto1).

%=========================================================================================================================================================


avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
    getTempoTotalSprintC(Ind,V2),
	arredonda(V2,V,0),
	avalia_populacao(Resto,Resto1).

avalia_populacaoRestante([],[]).
avalia_populacaoRestante([Ind*V|Resto],[Ind*V1|Resto1]):-
    % getTempoTotalSprintC(Ind,V2),
	random(0.0,1.0,Random),
	arredonda(V*Random,V1,0),
	avalia_populacaoRestante(Resto,Resto1).

substituiAvaliacao([],[]).
substituiAvaliacao([Ind*V|Resto],[Ind*V1|Resto1]):-
    getTempoTotalSprintC(Ind,V2),
	arredonda(V2,V1,0),
	substituiAvaliacao(Resto,Resto1).

%=========================================================================================================================================================


ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).

%=============================================================Gera Geração==============================================================================


gera_geracao(G,G,_,[MelhorGene|Pop]):-!,
	% write('Geracao '), write(G), write(':'), nl, write([MelhorGene|Pop]), nl,
	(retract(melhorGene(_));true),
	asserta(melhorGene(MelhorGene)).

gera_geracao(N,G,TempoRelativo,Pop):-
		tempoMelhorIndividuoPopulacao(Pop, MelhorTempoPop),
		MelhorTempoPop =< TempoRelativo,!.
		% write('Geracao '), write(N), write(':'), nl, write(Pop), nl.
		

gera_geracao(N,G,TempoRelativo,Pop):-

	% write('Geracao '), write(N), write(':'), nl, write(Pop), nl,

    removeMatosinhos(Pop,PopSemMatosinhos),
	% write('Populacao sem Matosinhos : '), write(PopSemMatosinhos), nl,
	random_permutation(PopSemMatosinhos, NPopPermutada),
	% write('Populacao Permutada : '), write(NPopPermutada), nl,

	cruzamento(NPopPermutada,NPopCruzada),
	% write('Populacao Cruzada : '), write(NPopCruzada), nl,

	mutacao(NPopCruzada,NPopMutada),
	% write('Populacao Mutada : '), write(NPopMutada), nl,

	adicionarArmazemInicialAPopulacao(NPopMutada, NPopMutada1),
	adicionarArmazemInicialAPopulacao(NPopCruzada, NPopCruzada1),

	% write('População Cruzada Com Matosinhos : '), write(NPopCruzada1), nl,
	% write('População Mutada Com Matosinhos : '), write(NPopMutada1), nl,

	avalia_populacao(NPopMutada1,NPopAv),
	avalia_populacao(NPopCruzada1, NPopCruzada1Avaliada),

	% write('População Cruzada Com Matosinhos Avaliada: '), write(NPopCruzada1Avaliada), nl,
	% write('População Mutada Com Matosinhos Avaliada : '), write(NPopAv), nl,

	juntarPopulacaoAtualComDescendentes(Pop, NPopCruzada1Avaliada, NPopAv, ListaJunta),
	% write('Populacao junta : '), write(ListaJunta), nl,

	ordena_populacao(ListaJunta, ListaJuntaOrdenada),
	% write('Populacao junta ordenada: '), write(ListaJuntaOrdenada), nl,

	vintePorCentoDaPopulacaoJunta(Pop, Tamanho),
	% write('Tamanho Populacao junta ordenada: '), write(Tamanho), nl,

	retiraXPrimeirosElementos(ListaJuntaOrdenada, Tamanho, SubLista),
	% write('Sublista Populacao junta ordenada: '), write(SubLista), nl,


	criarListaComRestantes(ListaJuntaOrdenada, Tamanho+1, ListaRestantes),
	% write('Sublista Populacao restante: '), write(ListaRestantes), nl,

	avalia_populacaoRestante(ListaRestantes, ListaRestantesAvaliadaComProduto),
	% write('Lista Populacao restante avaliada random: '), write(ListaRestantesAvaliadaComProduto), nl,

	ordena_populacao(ListaRestantesAvaliadaComProduto, ListaRestantesAvaliadaComProdutoOrdenada),
	% write('Lista Populacao restante avaliada random ordenada: '), write(ListaRestantesAvaliadaComProdutoOrdenada), nl,

	length(Pop,TamanhoPopInicial),

	retiraXPrimeirosElementos(ListaRestantesAvaliadaComProdutoOrdenada, TamanhoPopInicial - Tamanho, ListaResultante),
	% write('Lista Resultante Final: '), write(ListaResultante), nl,

	substituiAvaliacao(ListaResultante, ListaResultanteCorretamenteAvaliada),
	% write('Lista Resultante Final Corretamente Avaliada: '), write(ListaResultanteCorretamenteAvaliada), nl,

	append(ListaResultanteCorretamenteAvaliada, SubLista, ListaFinal),


	ordena_populacao(ListaFinal, NPopOrd),
	
	N1 is N+1,
	gera_geracao(N1,G,TempoRelativo,NPopOrd).

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	entregas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	entregas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	entregas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	entregas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).



tempoMelhorIndividuoPopulacao([MelhorInd*V|Resto], Tempo) :- 
	Tempo is V.

%==============================================================Seleção não elitista ======================================================================

/**
*	Predicado responsável por juntar a população atual com os respetivos descendentes obtidos por cruzamentos e mutações e sem repetidos
*
*/
juntarPopulacaoAtualComDescendentes(PopAtual,Cruzados,Mutados, ListaFinal) :- 
	append(PopAtual,Cruzados,ListaPopAtualECruzados),
	append(ListaPopAtualECruzados, Mutados, ListaJunta),
	removerRepetidos(ListaJunta,ListaFinal).

/**
*	Predicado responsável por remover todos os elementos repetidos de uma população
*
*/
removerRepetidos([],[]).
removerRepetidos([H|Lista],[H|ListaNRep]):-
                not(member(H,Lista)), !,
                removerRepetidos(Lista,ListaNRep).
removerRepetidos([_|Lista],ListaNRep):-removerRepetidos(Lista,ListaNRep).


/**
*	Predicado responsável por calcular 20% do tamanho da população recebida
*
*/
vintePorCentoDaPopulacaoJunta(Pop, X) :- 
	length(Pop,TamanhoPop), 
	arredonda(0.20*TamanhoPop, X,0).

/**
*	Predicado responsável por retirar de uma lista os primeiros X elementos
*
*/
retiraXPrimeirosElementos(_,0,[]).
retiraXPrimeirosElementos([X|L],N,[X|LE]):-
	N1 is N-1,retiraXPrimeirosElementos(L,N1,LE).


criarListaComRestantes(Lista,PosicaoInicial, SubListaResultante) :-
	length(Lista,Tamanho),
	sublista(Lista,PosicaoInicial,Tamanho,SublistaAux),
	eliminah(SublistaAux, SubListaResultante).	

%===============================================================Predicados Sprint B======================================================================
/**
* Calcula o tempo total de um percurso recebido por parâmetro
* 
* @param IdCamiao           Id do camiao que faz o percurso
* @param PesoAtualCamiao    Peso do camiao no momento. Este valor vai ser decrementado por backtracking
* @param EnergiaAtualCamiao Energia do camiao no momento. Este valor vai ser decrementado por backtracking
* @param Percurso           Lista de armazens por ordem de percurso
* @param TempoTotal         Variável onde vai ser inserido o tempo total do percurso
*/

getTempoTotalPercurso(_,_,_,[_],0).

getTempoTotalPercurso(IdCamiao,PesoAtualCamiao,_,[H1,H2],TempoTotal) :- armazem_inicial(AI), H2==AI ,!,
                    getTempoPercursoEntreDuasCidades(IdCamiao,H1,"MAT",PesoAtualCamiao,TempoTotal1),
                    TempoTotal is TempoTotal1.


getTempoTotalPercurso(IdCamiao,PesoAtualCamiao,EnergiaAtualCamiao,[H1,H2|[H3|T]],TempoTotal) :- entrega(_,_,MassaEntrega,H2,_,TempoDescarregamento), 
                    getTempoPercursoEntreDuasCidades(IdCamiao,H1,H2,PesoAtualCamiao,TempoASomar),
                    getEnergiaPercursoEntreDuasCidades(IdCamiao,H1,H2,PesoAtualCamiao,EnergiaASubtrair),

                    getEnergiaPercursoEntreDuasCidades(IdCamiao,H2,H3,PesoAtualCamiao - MassaEntrega,EnergiaNecessaria),
                    
                    (EnergiaAtualCamiao == 80 * 0.2, getTempoParagemEmArmazem(IdCamiao,TempoDescarregamento,EnergiaAtualCamiao, EnergiaNecessaria, TempoParagem, EnergiaAtualizada,H3);
                    getTempoParagemEmArmazem(IdCamiao,TempoDescarregamento,EnergiaAtualCamiao - EnergiaASubtrair, EnergiaNecessaria, TempoParagem, EnergiaAtualizada,H3)),
                    

                    (EnergiaAtualizada < (EnergiaNecessaria + 16), dadosCam_t_e_ta(IdCamiao,H2,H3,_,_,TempoAdicional),
                    carateristicasCam(IdCamiao,_,_,CargaTotal,_,_),
                    getTempoTotalPercurso(IdCamiao,PesoAtualCamiao - MassaEntrega,CargaTotal*0.20, [H2,H3|T], TempoTotal1),
                    TempoTotal is TempoTotal1 + TempoASomar + TempoParagem + TempoAdicional;
                    
                    getTempoTotalPercurso(IdCamiao,PesoAtualCamiao - MassaEntrega,EnergiaAtualizada, [H2,H3|T], TempoTotal1),
                    TempoTotal is TempoTotal1 + TempoASomar + TempoParagem).
                    

getTempoTotalSprintC(ListaArmazens, TempoPercurso) :-  carateristicasCam(IdCamiao,_,_,EnergiaAtual,_,_),
    % getAllDeliveriesFromWarehouses(ListaArmazens,ListaEntregas),
    findall(IdEntrega, entrega(IdEntrega,_,_,_,_,_), ListaEntregas),
    getMassaTotalEntregas(ListaEntregas,MassaTotal),
    getPesoAtualCamiao(IdCamiao, MassaTotal, PesoAtualCamiao),
    getTempoTotalPercurso(IdCamiao, PesoAtualCamiao, EnergiaAtual, ListaArmazens, TempoPercurso).


/**
*
* Calcula tempo de paragem no armazem. Se o camiao ficar a carregar o tempo de paragem vai ser o tempo de carregamento. Caso o camiao não necessite de carregamento, o tempo de paragem é o de * descarregamento
*
* @param IdCamiao               Id do camiao que faz o percurso
* @param TempoDescarregamento   Tempo de descarregamento da entrega no armazém
* @param EnergiaAtualCamiao     Energia do camiao no momento
* @param EnergiaNecessaria      Energia necessaria para chegar ao próximo armazem com pelo menos 20% de energia
* @param TempoParagem           Tempo de paragem final. Variável a ser preenchida com o valor calculado
* @param EnergiaAtualizada      Energia após carregamento
* @param Cidade2                Cidade destino. Serve para identificar o último percurso onde o destino é matosinhos. Nesse caso, a energia precisa ser apenas a necessária
*/
getTempoParagemEmArmazem(IdCamiao,TempoDescarregamento,EnergiaAtualCamiao, EnergiaNecessaria, TempoParagem,EnergiaAtualizada,Cidade2) :- 

                    carateristicasCam(IdCamiao,_,_,CargaTotal,_,_),
                    armazem_inicial(AI),
                    EnergiaVintePorcento is CargaTotal * 0.20, EnergiaNecessaria1 is EnergiaNecessaria + EnergiaVintePorcento, 
                    (EnergiaAtualCamiao > EnergiaNecessaria1, TempoParagem is TempoDescarregamento, EnergiaAtualizada is EnergiaAtualCamiao;
                        (Cidade2 == AI, getTempoCargaSuficiente(IdCamiao,EnergiaAtualCamiao,EnergiaNecessaria1,TempoCarregamento), EnergiaAtualizada is EnergiaNecessaria1;
                        getTempoCarga(IdCamiao,EnergiaAtualCamiao,TempoCarregamento), EnergiaAtualizada is CargaTotal * 0.80),
                        (TempoCarregamento > TempoDescarregamento, TempoParagem is TempoCarregamento; TempoParagem is TempoDescarregamento)). 


%Este predicado é igual ao de cima mas retorna a lista com id de armazéns
getAllWarehousesIDFromADeliveryList([],[]).
getAllWarehousesIDFromADeliveryList([H|T],[X|Y]):- getWarehouseIdByDeliveryId(H,X),getAllWarehousesIDFromADeliveryList(T,Y).

/**
*
* Retorna sucesso se encontrar a entrega com o Id inserido como parâmetro. O peso da entrega respetiva é colocado na variável Peso
* @param Id     Id da entrega para ir buscar o peso
* @param Peso   Variável que vai ser preenchida com o peso da entrega encontrada
*/
getPesoEntrega(Id,Peso) :- entrega(Id,_,Peso,_,_,_).

/**
*
* Retorna sucesso se encontrar todas as entregas da lista recebida. O peso total das entregas é guardado no segundo parâmetro
* @param L     Lista com entregas de um percurso
* @param Total Variável que vai ser preenchida com a massa total de todas as entregas na lista
*/
getMassaTotalEntregas([],0).
getMassaTotalEntregas([H|T],Total) :- getPesoEntrega(H,Peso), getMassaTotalEntregas(T,Total1), Total is (Total1 + Peso).

/**
*
* Retorna sucesso se encontrar o camião recebido no primeiro parâmetro. O peso atual do camiao vai ser guardado no terceiro parâmetro
*
*/
getPesoAtualCamiao(IdCamiao, PesoEntregas, PesoAtualCamiao) :- carateristicasCam(IdCamiao,Tara,_,_,_,_), PesoAtualCamiao is PesoEntregas + Tara.

/**
*
* Retorna sucesso se encontrar todas as entregas da lista recebida. O tempo de descarga total das entregas é guardado no segundo parâmetro
* @param L     Lista com entregas de um percurso
* @param Total Variável que vai ser preenchida com a massa total de todas as entregas na lista
*/
getTempoDescargaTotal([],0).
getTempoDescargaTotal([H|T], Total) :- entrega(H,_,_,_,_,TempoDescarga), getTempoDescargaTotal(T,Total1), Total is Total1 + TempoDescarga.

/**
*
* Retorna sucesso se encontrar o camiao com o id inserido no primeiro parâmetro. O peso máximo do camião é colocado na variável PesoTotal
* @param IdCamiao   Id do camião para encontrar o peso máximo
* @param PesoTotal  Peso máximo do camião calculado
*/
getPesoTotalCamiao(IdCamiao,PesoTotal) :- carateristicasCam(IdCamiao,Tara,CargaMaxima,_,_,_), PesoTotal is (Tara + CargaMaxima).


/**
*
* Retorna sucesso se encontrar o camiao com o id inserido no primeiro parâmetro. O tempo real gasto é calculado e guardado no parâmetro TempoReal(último).
* @param IdCamiao       Id do camiao para calcular tempo real gasto no percurso 
* @param Cidade1        Cidade origem do percurso
* @param Cidade2        Cidade destino do percurso
* @param PesoRealCamiao Peso base do camião mais peso das entregas que transporta
* @param TempoReal      Tempo realmente gasto pelo camião com o peso atual
*/
getTempoPercursoEntreDuasCidades(IdCamiao,Cidade1,Cidade2,PesoRealCamiao,TempoReal) :- 
            dadosCam_t_e_ta(IdCamiao,Cidade1,Cidade2,TempoPesoMaximo,_,_),
            getPesoTotalCamiao(IdCamiao,PesoCamiaoCheio), 
            TempoReal is (PesoRealCamiao * TempoPesoMaximo / PesoCamiaoCheio).


/**
*
* Retorna sucesso se encontrar o camiao com o id inserido no primeiro parâmetro. A energia real gasta é calculada e guardada no parâmetro EnergiaReal(último).
* @param IdCamiao          Id do camiao para calcular energia real gasta no percurso 
* @param Cidade1           Cidade origem do percurso
* @param Cidade2           Cidade destino do percurso
* @param PesoRealCamiao    Peso base do camião mais peso das entregas que transporta
* @param EnergiaReal       Energia realmente gasta pelo camião com o peso atual
*/
getEnergiaPercursoEntreDuasCidades(IdCamiao,Cidade1,Cidade2,PesoRealCamiao,EnergiaReal) :-
            dadosCam_t_e_ta(IdCamiao,Cidade1,Cidade2,_,EnergiaPesoMaximo,_),
            getPesoTotalCamiao(IdCamiao,PesoCamiaoCheio), 
            EnergiaReal is (PesoRealCamiao * EnergiaPesoMaximo / PesoCamiaoCheio).


/**
*
* Retorna sucesso se encontrar o camião com o id inserido no primeiro parâmetro. O tempo de carga é calculado e guardado no parâmetro TempoCarga
* @param IdCamiao       Id do camiao para calcular tempo de carregamento até 80%
* @param EnergiaAtual   Energia atual do camião
* @param TempoCarga     Variável a ser preenchida com o tempo de carga do camião
*/
getTempoCarga(IdCamiao,EnergiaAtual,TempoCarga) :- carateristicasCam(IdCamiao,_,_,_,_,TempoCargaVinteaOitenta), TempoCarga is ((64 - EnergiaAtual) * TempoCargaVinteaOitenta / 48).



getTempoCargaSuficiente(IdCamiao,EnergiaAtual,EnergiaNecessaria,TempoCarga) :- carateristicasCam(IdCamiao,_,_,_,_,TempoCargaVinteaOitenta), 
                    TempoCarga is ((EnergiaNecessaria - EnergiaAtual) * TempoCargaVinteaOitenta / 48).


%Este predicado é igual ao de cima mas retorna id de armazéns
getWarehouseIdByDeliveryId(Id,WarehouseId):- entrega(Id,_,_,WarehouseId,_,_).




% =========================================================================== HEURISTICAS ==========================================================================
% entrega(<idEntrega>,<data>,<massaEntrefa>,<armazemEntrega>,<tempoColoc>,<tempoRet>)
%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
%dadosCam_t_e_ta(<nome_camiao>,<armazemOrigem>,<armazemDestino>,<tempo>,<energia>,<tempo_adicional>)


% Ex d 1 - heuristica pela distancia/tempo

/**
* Retorna uma lista de armazens por ordem pertencentes às entregas da lista de entregas
*
* @param ListaEntregas       Lista de entregas
* @param ListaArmazens       Lista de armazens pertencentes às entregas
*/
getIdArmazensDasEntregas([],[]):-!.
getIdArmazensDasEntregas([EntregaId|ListaEntregas], [ArmazemId|ListaArmazens]):- entrega(EntregaId,_,_,ArmazemId,_,_), getIdArmazensDasEntregas(ListaEntregas, ListaArmazens).

/**
* Retorna o próximo armazém mais próximo (menos tempo) do armazem atual do percurso até então calculado
*
* @param Armazem         Armazem atual no percurso até então desenvolvido 
* @param ListaArmazens   Lista de armazens restantes para comparar
* @param ArmazemFinal    Próximo armazem mais próximo (menor tempo)
*/
getArmazemMaisProximo(_,[ArmazemFinal],ArmazemFinal):-!.
getArmazemMaisProximo(Armazem, [A1,A2|Resto], ArmazemFinal):- dadosCam_t_e_ta(_,Armazem,A1,T1,_,_), dadosCam_t_e_ta(_,Armazem,A2,T2,_,_), ((T1=<T2, getArmazemMaisProximo(Armazem, [A1|Resto], ArmazemFinal)); getArmazemMaisProximo(Armazem, [A2|Resto], ArmazemFinal)).

/**
* Retorna a lista com os armazens representantes do percurso calculado (em função de menos tempo)
*
* @param Armazem        Representa inicialmente matosinhos e posteriormente o respetivo armazem origem
* @param ListaArmazens   Lista inicialmente com todos os armazens das entregas e posteriormente os que forem sobrando para se comparar
* @param ListaFinal     Lista com os armazens representantes do percurso calculado, sem matosinhos (que se insere no inicio e fim)
*/
getHeuristicaMenosTempo(_,[H],[H]):-!.
getHeuristicaMenosTempo(Armazem, ListaArmazens, [ArmazemFinal|ListaFinal]):- getArmazemMaisProximo(Armazem, ListaArmazens, ArmazemFinal), delete(ListaArmazens, ArmazemFinal, ListaArmazens2), getHeuristicaMenosTempo(ArmazemFinal, ListaArmazens2, ListaFinal).

/**
* Retorna a lista com os id's dos armazens do percurso com menos tempo com início e fim em matosinhos
*
* @param ListaEntregas       Lista com os id's das entregas a considerar
* @param ListaFinal2         Lista com o percurso calculado com menos tempo
*/
heuristicaMenosTempo(ListaEntregas, ListaFinal2):- armazem_inicial(M), getIdArmazensDasEntregas(ListaEntregas, ListaArmazens), getHeuristicaMenosTempo(M, ListaArmazens, ListaFinal), append([M],ListaFinal, ListaFinal1), append(ListaFinal1, [M], ListaFinal2).


/**
* Retorna o percurso calculado com menos tempo e o seu tempo total
*
* @param ListaEntregas       Lista com os id's das entregas 
* @param IdCamiao            Id do camião
* @param Percurso            Percurso com menos tempo (id's armazens)
* @param Tempo               Tempo total em minutos demorado para percorrer todo o percurso 
*/
percursoMenosTempoETempoTotal(Lista_Entregas, IdCamiao, Percurso, Tempo):- heuristicaMenosTempo(Lista_Entregas, Percurso), carateristicasCam(IdCamiao,Tara,_,EnergiaAtualCamiao,_,_), getMassaTotalEntregas(Lista_Entregas, Massa), PesoAtualCamiao is Tara+Massa, getTempoTotalPercurso(IdCamiao, PesoAtualCamiao, EnergiaAtualCamiao, Percurso, Tempo).


heuristicaPorTempo(Lista_Entregas, Percurso) :- percursoMenosTempoETempoTotal(Lista_Entregas, eTruck01, Percurso,_).



% Ex d 2 - heuristica pela massa

/**
* Retorna a próxima entrega com maior massa do armazem atual do percurso até então calculado
*
* @param ListaEntregas   Lista de entregas restantes para comparar
* @param EntregaFinal    Próxima entrega mais próxima (maior massa)
*/
getEntregaMaiorMassa([EntregaFinal],EntregaFinal):-!.
getEntregaMaiorMassa([E1,E2|Resto], EntregaFinal):- entrega(E1,_,Massa1,_,_,_), entrega(E2,_,Massa2,_,_,_), ((Massa1>=Massa2, getEntregaMaiorMassa([E1|Resto], EntregaFinal)); getEntregaMaiorMassa([E2|Resto], EntregaFinal)).


/**
* Retorna a lista com os armazens representantes do percurso calculado (em função da maior massa)
*
* @param ListaEntregas   Lista inicialmente com todos as entregas e posteriormente as que forem sobrando para se comparar
* @param ListaFinal      Lista com os armazens representantes do percurso calculado, sem matosinhos (que se insere no inicio e fim)
*/
getHeuristicaMaiorMassa([EntregaFinal],[A]):- entrega(EntregaFinal,_,_,A,_,_),!.
getHeuristicaMaiorMassa(ListaEntregas, [A|ListaFinal]):- getEntregaMaiorMassa(ListaEntregas, EntregaFinal), entrega(EntregaFinal,_,_,A,_,_), delete(ListaEntregas, EntregaFinal, ListaEntregas2), getHeuristicaMaiorMassa(ListaEntregas2, ListaFinal).

% /**
% * Retorna a lista com os id's dos armazens do percurso com maior massa com início e fim em matosinhos
% *
% * @param ListaEntregas       Lista com os id's das entregas a considerar
% * @param ListaFinal2         Lista com o percurso calculado com maior massa
% */
% heuristicaMaiorMassa(ListaEntregas, ListaFinal):- armazem_inicial(M), getHeuristicaMaiorMassa(ListaEntregas, ListaFinal).

/**
* Retorna o percurso calculado com maior massa e o seu tempo total
*
* @param ListaEntregas       Lista com os id's das entregas 
* @param IdCamiao            Id do camião
* @param Percurso            Percurso com mais massa (id's armazens)
* @param Tempo               Tempo total em minutos demorado para percorrer todo o percurso 
*/
percursoMaiorMassaETempoTotal(Lista_Entregas, IdCamiao, Percurso, Tempo):- heuristicaMaiorMassa(Lista_Entregas, Percurso), carateristicasCam(IdCamiao,Tara,_,EnergiaAtualCamiao,_,_), getMassaTotalEntregas(Lista_Entregas, Massa), PesoAtualCamiao is Tara+Massa, getTempoTotalPercurso(IdCamiao, PesoAtualCamiao, EnergiaAtualCamiao, Percurso, Tempo).



% Ex d 3 - heuristica pelo tempo e massa


/**
* Retorna a lista com os armazens representantes do percurso calculado (em função da maior massa)
*
* @param ListaEntregas      Lista inicialmente com todos as entregas e posteriormente as que forem sobrando para se comparar
* @param Armazem            Armazem representante da
* @param ListaArmazens      Lista inicialmente com todos os armazens e posteriormente os que forem sobrando para se comparar
* @param Aux                Variavel auxiliar para definir começar o calculo em função do tempo (aux=0) ou da massa (aux=1)
* @param ListaFinal         Lista com os armazens representantes do percurso calculado, sem matosinhos (que se insere no inicio e fim)
*/
getHeuristicaMenosTempoMaiorMassa([EntregaFinal],_,[A],_,[A]):- entrega(EntregaFinal,_,_,A,_,_).
getHeuristicaMenosTempoMaiorMassa(ListaEntregas, _, ListaArmazens, 1, [A1|ListaFinal]):- getEntregaMaiorMassa(ListaEntregas, ProximaEntrega), entrega(ProximaEntrega,_,_,A1,_,_), delete(ListaEntregas, ProximaEntrega, ListaEntregas2), delete(ListaArmazens, A1,ListaArmazens2), getHeuristicaMenosTempoMaiorMassa(ListaEntregas2, A1, ListaArmazens2, 0, ListaFinal).
getHeuristicaMenosTempoMaiorMassa(ListaEntregas, Armazem, ListaArmazens, 0, [ArmazemFinal|ListaFinal]):- getArmazemMaisProximo(Armazem, ListaArmazens, ArmazemFinal), delete(ListaArmazens, ArmazemFinal, ListaArmazens2), entrega(ProximaEntrega,_,_,ArmazemFinal,_,_), delete(ListaEntregas, ProximaEntrega, ListaEntregas2), getHeuristicaMenosTempoMaiorMassa(ListaEntregas2, ArmazemFinal, ListaArmazens2, 1, ListaFinal).

/**
* Retorna a lista com os id's dos armazens do percurso calculado com início e fim em matosinhos
*
* @param ListaEntregas       Lista com os id's das entregas a considerar
* @param Aux                 Variavel auxiliar para definir começar o calculo em função do tempo (aux=0) ou da massa (aux=1)
* @param ListaFinal2         Lista com o percurso calculado 
*/
heuristicaMenosTempoMaiorMassa(ListaEntregas, Aux, ListaFinal2):- armazem_inicial(M), getIdArmazensDasEntregas(ListaEntregas, ListaArmazens), getHeuristicaMenosTempoMaiorMassa(ListaEntregas, M, ListaArmazens, Aux, ListaFinal), append([M],ListaFinal, ListaFinal1), append(ListaFinal1, [M], ListaFinal2).

/**
* Retorna o percurso calculado (alterando a procura do próximo armazem em função da maior massa (aux=1) e menor tempo (aux=0)) e o seu tempo total
*
* @param ListaEntregas       Lista com os id's das entregas 
* @param IdCamiao            Id do camião
* @param Aux                 Variavel auxiliar para definir começar o calculo em função do tempo (aux=0) ou da massa (aux=1)
* @param Percurso            Percurso calculado (id's armazens)
* @param Tempo               Tempo total em minutos demorado para percorrer todo o percurso 
*/
percursoAlternadoEntreMenosTempoEMaiorMassa(ListaEntregas, IdCamiao, Aux, Percurso, Tempo):- heuristicaMenosTempoMaiorMassa(ListaEntregas, Aux, Percurso), carateristicasCam(IdCamiao,Tara,_,EnergiaAtualCamiao,_,_), getMassaTotalEntregas(ListaEntregas, Massa), PesoAtualCamiao is Tara+Massa, getTempoTotalPercurso(IdCamiao, PesoAtualCamiao, EnergiaAtualCamiao, Percurso, Tempo).


heuristicaPorTempoeMassa(Lista_Entregas, Percurso) :- percursoAlternadoEntreMenosTempoEMaiorMassa(Lista_Entregas, eTruck01, 0, Percurso,_).


% Predicado para arredondar o tempo para 2 casas decimais
arredonda(X,Y,D) :- Z is X * 10^D, round(Z, ZA), Y is ZA / 10^D.


%============================================================Base conhecimento=====================================================================================


%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).
dadosCam_t_e_ta(eTruck01,"ARO","ESP",122,42,0).
dadosCam_t_e_ta(eTruck01,"ARO","GND",122,46,10).
dadosCam_t_e_ta(eTruck01,"ARO","MAI",151,54,25).
dadosCam_t_e_ta(eTruck01,"ARO","MAT",147,52,25).
dadosCam_t_e_ta(eTruck01,"ARO","OAZ",74,24,0).
dadosCam_t_e_ta(eTruck01,"ARO","PAR",116,35,0).
dadosCam_t_e_ta(eTruck01,"ARO","POR",141,46,0).
dadosCam_t_e_ta(eTruck01,"ARO","POV",185,74,53).
dadosCam_t_e_ta(eTruck01,"ARO","FEI",97,30,0).
dadosCam_t_e_ta(eTruck01,"ARO","TIR",164,64,40).
dadosCam_t_e_ta(eTruck01,"ARO","SJM",76,23,0).
dadosCam_t_e_ta(eTruck01,"ARO","TRO",174,66,45).
dadosCam_t_e_ta(eTruck01,"ARO","VCA",59,18,0).
dadosCam_t_e_ta(eTruck01,"ARO","VAL",132,51,24).
dadosCam_t_e_ta(eTruck01,"ARO","VCO",181,68,45).
dadosCam_t_e_ta(eTruck01,"ARO","GAI",128,45,0).

dadosCam_t_e_ta(eTruck01,"ESP","ARO",116,42,0).
dadosCam_t_e_ta(eTruck01,"ESP","GND",55,22,0).
dadosCam_t_e_ta(eTruck01,"ESP","MAI",74,25,0).
dadosCam_t_e_ta(eTruck01,"ESP","MAT",65,22,0).
dadosCam_t_e_ta(eTruck01,"ESP","OAZ",69,27,0).
dadosCam_t_e_ta(eTruck01,"ESP","PAR",74,38,0).
dadosCam_t_e_ta(eTruck01,"ESP","POR",61,18,0).
dadosCam_t_e_ta(eTruck01,"ESP","POV",103,44,0).
dadosCam_t_e_ta(eTruck01,"ESP","FEI",36,14,0).
dadosCam_t_e_ta(eTruck01,"ESP","TIR",88,41,0).
dadosCam_t_e_ta(eTruck01,"ESP","SJM",61,19,0).
dadosCam_t_e_ta(eTruck01,"ESP","TRO",95,42,0).
dadosCam_t_e_ta(eTruck01,"ESP","VCA",78,34,0).
dadosCam_t_e_ta(eTruck01,"ESP","VAL",69,30,0).
dadosCam_t_e_ta(eTruck01,"ESP","VCO",99,38,0).
dadosCam_t_e_ta(eTruck01,"ESP","GAI",46,14,0).

dadosCam_t_e_ta(eTruck01,"GND","ARO",120,45,0).
dadosCam_t_e_ta(eTruck01,"GND","ESP",50,22,0).
dadosCam_t_e_ta(eTruck01,"GND","MAI",46,15,0).
dadosCam_t_e_ta(eTruck01,"GND","MAT",46,14,0).
dadosCam_t_e_ta(eTruck01,"GND","OAZ",74,37,0).
dadosCam_t_e_ta(eTruck01,"GND","PAR",63,23,0).
dadosCam_t_e_ta(eTruck01,"GND","POR",38,8,0).
dadosCam_t_e_ta(eTruck01,"GND","POV",84,36,0).
dadosCam_t_e_ta(eTruck01,"GND","FEI",59,28,0).
dadosCam_t_e_ta(eTruck01,"GND","TIR",61,27,0).
dadosCam_t_e_ta(eTruck01,"GND","SJM",67,32,0).
dadosCam_t_e_ta(eTruck01,"GND","TRO",67,29,0).
dadosCam_t_e_ta(eTruck01,"GND","VCA",82,38,0).
dadosCam_t_e_ta(eTruck01,"GND","VAL",34,8,0).
dadosCam_t_e_ta(eTruck01,"GND","VCO",80,30,0).
dadosCam_t_e_ta(eTruck01,"GND","GAI",36,10,0).

dadosCam_t_e_ta(eTruck01,"MAI","ARO",149,54,25).
dadosCam_t_e_ta(eTruck01,"MAI","ESP",65,24,0).
dadosCam_t_e_ta(eTruck01,"MAI","GND",46,16,0).
dadosCam_t_e_ta(eTruck01,"MAI","MAT",27,10,0).
dadosCam_t_e_ta(eTruck01,"MAI","OAZ",103,47,0).
dadosCam_t_e_ta(eTruck01,"MAI","PAR",55,27,0).
dadosCam_t_e_ta(eTruck01,"MAI","POR",36,10,0).
dadosCam_t_e_ta(eTruck01,"MAI","POV",50,26,0).
dadosCam_t_e_ta(eTruck01,"MAI","FEI",78,34,0).
dadosCam_t_e_ta(eTruck01,"MAI","TIR",42,19,0).
dadosCam_t_e_ta(eTruck01,"MAI","SJM",97,42,0).
dadosCam_t_e_ta(eTruck01,"MAI","TRO",44,11,0).
dadosCam_t_e_ta(eTruck01,"MAI","VCA",111,48,0).
dadosCam_t_e_ta(eTruck01,"MAI","VAL",32,13,0).
dadosCam_t_e_ta(eTruck01,"MAI","VCO",53,14,0).
dadosCam_t_e_ta(eTruck01,"MAI","GAI",38,11,0).

dadosCam_t_e_ta(eTruck01,"MAT","ARO",141,51,24).
dadosCam_t_e_ta(eTruck01,"MAT","ESP",55,20,0).
dadosCam_t_e_ta(eTruck01,"MAT","GND",48,14,0).
dadosCam_t_e_ta(eTruck01,"MAT","MAI",25,9,0).
dadosCam_t_e_ta(eTruck01,"MAT","OAZ",97,44,0).
dadosCam_t_e_ta(eTruck01,"MAT","PAR",55,28,0).
dadosCam_t_e_ta(eTruck01,"MAT","POR",29,7,0).
dadosCam_t_e_ta(eTruck01,"MAT","POV",48,24,0).
dadosCam_t_e_ta(eTruck01,"MAT","FEI",69,30,0).
dadosCam_t_e_ta(eTruck01,"MAT","TIR",53,26,0).
dadosCam_t_e_ta(eTruck01,"MAT","SJM",95,36,0).
dadosCam_t_e_ta(eTruck01,"MAT","TRO",63,20,0).
dadosCam_t_e_ta(eTruck01,"MAT","VCA",105,45,0).
dadosCam_t_e_ta(eTruck01,"MAT","VAL",34,14,0).
dadosCam_t_e_ta(eTruck01,"MAT","VCO",46,18,0).
dadosCam_t_e_ta(eTruck01,"MAT","GAI",27,7,0).

dadosCam_t_e_ta(eTruck01,"OAZ","ARO",69,23,0).
dadosCam_t_e_ta(eTruck01,"OAZ","ESP",71,27,0).
dadosCam_t_e_ta(eTruck01,"OAZ","GND",74,38,0).
dadosCam_t_e_ta(eTruck01,"OAZ","MAI",103,46,0).
dadosCam_t_e_ta(eTruck01,"OAZ","MAT",99,44,0).
dadosCam_t_e_ta(eTruck01,"OAZ","PAR",88,48,0).
dadosCam_t_e_ta(eTruck01,"OAZ","POR",92,38,0).
dadosCam_t_e_ta(eTruck01,"OAZ","POV",134,66,45).
dadosCam_t_e_ta(eTruck01,"OAZ","FEI",42,14,0).
dadosCam_t_e_ta(eTruck01,"OAZ","TIR",116,56,30).
dadosCam_t_e_ta(eTruck01,"OAZ","SJM",23,9,0).
dadosCam_t_e_ta(eTruck01,"OAZ","TRO",126,58,33).
dadosCam_t_e_ta(eTruck01,"OAZ","VCA",25,9,0).
dadosCam_t_e_ta(eTruck01,"OAZ","VAL",84,44,0).
dadosCam_t_e_ta(eTruck01,"OAZ","VCO",132,60,35).
dadosCam_t_e_ta(eTruck01,"OAZ","GAI",80,38,0).

dadosCam_t_e_ta(eTruck01,"PAR","ARO",116,36,0).
dadosCam_t_e_ta(eTruck01,"PAR","ESP",71,38,0).
dadosCam_t_e_ta(eTruck01,"PAR","GND",61,22,0).
dadosCam_t_e_ta(eTruck01,"PAR","MAI",53,26,0).
dadosCam_t_e_ta(eTruck01,"PAR","MAT",53,28,0).
dadosCam_t_e_ta(eTruck01,"PAR","OAZ",88,48,0).
dadosCam_t_e_ta(eTruck01,"PAR","POR",59,26,0).
dadosCam_t_e_ta(eTruck01,"PAR","POV",88,48,0).
dadosCam_t_e_ta(eTruck01,"PAR","FEI",84,44,0).
dadosCam_t_e_ta(eTruck01,"PAR","TIR",74,22,0).
dadosCam_t_e_ta(eTruck01,"PAR","SJM",82,42,0).
dadosCam_t_e_ta(eTruck01,"PAR","TRO",76,31,0).
dadosCam_t_e_ta(eTruck01,"PAR","VCA",97,49,21).
dadosCam_t_e_ta(eTruck01,"PAR","VAL",29,16,0).
dadosCam_t_e_ta(eTruck01,"PAR","VCO",84,42,0).
dadosCam_t_e_ta(eTruck01,"PAR","GAI",69,30,0).

dadosCam_t_e_ta(eTruck01,"POR","ARO",134,46,0).
dadosCam_t_e_ta(eTruck01,"POR","ESP",59,18,0).
dadosCam_t_e_ta(eTruck01,"POR","GND",32,6,0).
dadosCam_t_e_ta(eTruck01,"POR","MAI",34,10,0).
dadosCam_t_e_ta(eTruck01,"POR","MAT",32,7,0).
dadosCam_t_e_ta(eTruck01,"POR","OAZ",88,38,0).
dadosCam_t_e_ta(eTruck01,"POR","PAR",57,26,0).
dadosCam_t_e_ta(eTruck01,"POR","POV",69,30,0).
dadosCam_t_e_ta(eTruck01,"POR","FEI",65,26,0).
dadosCam_t_e_ta(eTruck01,"POR","TIR",53,22,0).
dadosCam_t_e_ta(eTruck01,"POR","SJM",82,34,0).
dadosCam_t_e_ta(eTruck01,"POR","TRO",61,24,0).
dadosCam_t_e_ta(eTruck01,"POR","VCA",97,40,0).
dadosCam_t_e_ta(eTruck01,"POR","VAL",36,12,0).
dadosCam_t_e_ta(eTruck01,"POR","VCO",65,23,0).
dadosCam_t_e_ta(eTruck01,"POR","GAI",32,6,0).

dadosCam_t_e_ta(eTruck01,"POV","ARO",181,72,50).
dadosCam_t_e_ta(eTruck01,"POV","ESP",95,41,0).
dadosCam_t_e_ta(eTruck01,"POV","GND",86,35,0).
dadosCam_t_e_ta(eTruck01,"POV","MAI",55,24,0).
dadosCam_t_e_ta(eTruck01,"POV","MAT",48,23,0).
dadosCam_t_e_ta(eTruck01,"POV","OAZ",134,65,42).
dadosCam_t_e_ta(eTruck01,"POV","PAR",95,47,0).
dadosCam_t_e_ta(eTruck01,"POV","POR",69,28,0).
dadosCam_t_e_ta(eTruck01,"POV","FEI",109,51,24).
dadosCam_t_e_ta(eTruck01,"POV","TIR",61,29,0).
dadosCam_t_e_ta(eTruck01,"POV","SJM",132,57,31).
dadosCam_t_e_ta(eTruck01,"POV","TRO",67,19,0).
dadosCam_t_e_ta(eTruck01,"POV","VCA",143,66,45).
dadosCam_t_e_ta(eTruck01,"POV","VAL",71,34,0).
dadosCam_t_e_ta(eTruck01,"POV","VCO",15,3,0).
dadosCam_t_e_ta(eTruck01,"POV","GAI",67,28,0).

dadosCam_t_e_ta(eTruck01,"FEI","ARO",97,30,0).
dadosCam_t_e_ta(eTruck01,"FEI","ESP",34,14,0).
dadosCam_t_e_ta(eTruck01,"FEI","GND",59,27,0).
dadosCam_t_e_ta(eTruck01,"FEI","MAI",78,33,0).
dadosCam_t_e_ta(eTruck01,"FEI","MAT",71,30,0).
dadosCam_t_e_ta(eTruck01,"FEI","OAZ",40,14,0).
dadosCam_t_e_ta(eTruck01,"FEI","PAR",82,42,0).
dadosCam_t_e_ta(eTruck01,"FEI","POR",65,24,0).
dadosCam_t_e_ta(eTruck01,"FEI","POV",109,52,25).
dadosCam_t_e_ta(eTruck01,"FEI","TIR",92,46,0).
dadosCam_t_e_ta(eTruck01,"FEI","SJM",32,6,0).
dadosCam_t_e_ta(eTruck01,"FEI","TRO",99,46,0).
dadosCam_t_e_ta(eTruck01,"FEI","VCA",63,17,0).
dadosCam_t_e_ta(eTruck01,"FEI","VAL",74,34,0).
dadosCam_t_e_ta(eTruck01,"FEI","VCO",105,46,0).
dadosCam_t_e_ta(eTruck01,"FEI","GAI",53,23,0).

dadosCam_t_e_ta(eTruck01,"TIR","ARO",164,65,42).
dadosCam_t_e_ta(eTruck01,"TIR","ESP",88,41,0).
dadosCam_t_e_ta(eTruck01,"TIR","GND",65,28,0).
dadosCam_t_e_ta(eTruck01,"TIR","MAI",42,18,0).
dadosCam_t_e_ta(eTruck01,"TIR","MAT",55,25,0).
dadosCam_t_e_ta(eTruck01,"TIR","OAZ",118,57,31).
dadosCam_t_e_ta(eTruck01,"TIR","PAR",74,23,0).
dadosCam_t_e_ta(eTruck01,"TIR","POR",59,23,0).
dadosCam_t_e_ta(eTruck01,"TIR","POV",63,28,0).
dadosCam_t_e_ta(eTruck01,"TIR","FEI",97,46,0).
dadosCam_t_e_ta(eTruck01,"TIR","SJM",111,52,25).
dadosCam_t_e_ta(eTruck01,"TIR","TRO",25,7,0).
dadosCam_t_e_ta(eTruck01,"TIR","VCA",126,58,33).
dadosCam_t_e_ta(eTruck01,"TIR","VAL",53,25,0).
dadosCam_t_e_ta(eTruck01,"TIR","VCO",59,27,0).
dadosCam_t_e_ta(eTruck01,"TIR","GAI",67,27,0).

dadosCam_t_e_ta(eTruck01,"SJM","ARO",76,23,0).
dadosCam_t_e_ta(eTruck01,"SJM","ESP",61,19,0).
dadosCam_t_e_ta(eTruck01,"SJM","GND",67,32,0).
dadosCam_t_e_ta(eTruck01,"SJM","MAI",97,41,0).
dadosCam_t_e_ta(eTruck01,"SJM","MAT",92,38,0).
dadosCam_t_e_ta(eTruck01,"SJM","OAZ",19,8,0).
dadosCam_t_e_ta(eTruck01,"SJM","PAR",82,42,0).
dadosCam_t_e_ta(eTruck01,"SJM","POR",86,33,0).
dadosCam_t_e_ta(eTruck01,"SJM","POV",128,61,37).
dadosCam_t_e_ta(eTruck01,"SJM","FEI",32,6,0).
dadosCam_t_e_ta(eTruck01,"SJM","TIR",109,50,23).
dadosCam_t_e_ta(eTruck01,"SJM","TRO",120,53,26).
dadosCam_t_e_ta(eTruck01,"SJM","VCA",40,10,0).
dadosCam_t_e_ta(eTruck01,"SJM","VAL",78,38,0).
dadosCam_t_e_ta(eTruck01,"SJM","VCO",126,54,28).
dadosCam_t_e_ta(eTruck01,"SJM","GAI",74,32,0).

dadosCam_t_e_ta(eTruck01,"TRO","ARO",174,65,42).
dadosCam_t_e_ta(eTruck01,"TRO","ESP",107,35,0).
dadosCam_t_e_ta(eTruck01,"TRO","GND",74,29,0).
dadosCam_t_e_ta(eTruck01,"TRO","MAI",46,11,0).
dadosCam_t_e_ta(eTruck01,"TRO","MAT",67,20,0).
dadosCam_t_e_ta(eTruck01,"TRO","OAZ",128,57,31).
dadosCam_t_e_ta(eTruck01,"TRO","PAR",80,30,0).
dadosCam_t_e_ta(eTruck01,"TRO","POR",76,20,0).
dadosCam_t_e_ta(eTruck01,"TRO","POV",67,20,0).
dadosCam_t_e_ta(eTruck01,"TRO","FEI",105,47,0).
dadosCam_t_e_ta(eTruck01,"TRO","TIR",27,7,0).
dadosCam_t_e_ta(eTruck01,"TRO","SJM",122,52,25).
dadosCam_t_e_ta(eTruck01,"TRO","VCA",137,58,33).
dadosCam_t_e_ta(eTruck01,"TRO","VAL",67,17,0).
dadosCam_t_e_ta(eTruck01,"TRO","VCO",59,15,0).
dadosCam_t_e_ta(eTruck01,"TRO","GAI",78,22,0).

dadosCam_t_e_ta(eTruck01,"VCA","ARO",59,18,0).
dadosCam_t_e_ta(eTruck01,"VCA","ESP",80,35,0).
dadosCam_t_e_ta(eTruck01,"VCA","GND",80,38,0).
dadosCam_t_e_ta(eTruck01,"VCA","MAI",109,46,0).
dadosCam_t_e_ta(eTruck01,"VCA","MAT",105,45,0).
dadosCam_t_e_ta(eTruck01,"VCA","OAZ",27,9,0).
dadosCam_t_e_ta(eTruck01,"VCA","PAR",97,48,0).
dadosCam_t_e_ta(eTruck01,"VCA","POR",99,38,0).
dadosCam_t_e_ta(eTruck01,"VCA","POV",143,66,45).
dadosCam_t_e_ta(eTruck01,"VCA","FEI",61,17,0).
dadosCam_t_e_ta(eTruck01,"VCA","TIR",122,57,31).
dadosCam_t_e_ta(eTruck01,"VCA","SJM",42,10,0).
dadosCam_t_e_ta(eTruck01,"VCA","TRO",132,58,35).
dadosCam_t_e_ta(eTruck01,"VCA","VAL",90,44,0).
dadosCam_t_e_ta(eTruck01,"VCA","VCO",139,61,37).
dadosCam_t_e_ta(eTruck01,"VCA","GAI",86,38,0).

dadosCam_t_e_ta(eTruck01,"VAL","ARO",132,51,24).
dadosCam_t_e_ta(eTruck01,"VAL","ESP",74,30,0).
dadosCam_t_e_ta(eTruck01,"VAL","GND",34,8,0).
dadosCam_t_e_ta(eTruck01,"VAL","MAI",36,12,0).
dadosCam_t_e_ta(eTruck01,"VAL","MAT",36,14,0).
dadosCam_t_e_ta(eTruck01,"VAL","OAZ",86,44,0).
dadosCam_t_e_ta(eTruck01,"VAL","PAR",34,16,0).
dadosCam_t_e_ta(eTruck01,"VAL","POR",42,13,0).
dadosCam_t_e_ta(eTruck01,"VAL","POV",71,35,0).
dadosCam_t_e_ta(eTruck01,"VAL","FEI",82,36,0).
dadosCam_t_e_ta(eTruck01,"VAL","TIR",53,25,0).
dadosCam_t_e_ta(eTruck01,"VAL","SJM",80,38,0).
dadosCam_t_e_ta(eTruck01,"VAL","TRO",69,18,0).
dadosCam_t_e_ta(eTruck01,"VAL","VCA",95,45,0).
dadosCam_t_e_ta(eTruck01,"VAL","VCO",69,29,0).
dadosCam_t_e_ta(eTruck01,"VAL","GAI",53,17,0).

dadosCam_t_e_ta(eTruck01,"VCO","ARO",179,68,45).
dadosCam_t_e_ta(eTruck01,"VCO","ESP",92,37,0).
dadosCam_t_e_ta(eTruck01,"VCO","GND",84,31,0).
dadosCam_t_e_ta(eTruck01,"VCO","MAI",57,16,0).
dadosCam_t_e_ta(eTruck01,"VCO","MAT",46,18,0).
dadosCam_t_e_ta(eTruck01,"VCO","OAZ",132,60,35).
dadosCam_t_e_ta(eTruck01,"VCO","PAR",92,42,0).
dadosCam_t_e_ta(eTruck01,"VCO","POR",67,23,0).
dadosCam_t_e_ta(eTruck01,"VCO","POV",15,3,0).
dadosCam_t_e_ta(eTruck01,"VCO","FEI",105,46,0).
dadosCam_t_e_ta(eTruck01,"VCO","TIR",57,28,0).
dadosCam_t_e_ta(eTruck01,"VCO","SJM",130,52,25).
dadosCam_t_e_ta(eTruck01,"VCO","TRO",61,15,0).
dadosCam_t_e_ta(eTruck01,"VCO","VCA",141,61,37).
dadosCam_t_e_ta(eTruck01,"VCO","VAL",69,29,0).
dadosCam_t_e_ta(eTruck01,"VCO","GAI",65,24,0).

dadosCam_t_e_ta(eTruck01,"GAI","ARO",128,46,0).
dadosCam_t_e_ta(eTruck01,"GAI","ESP",42,14,0).
dadosCam_t_e_ta(eTruck01,"GAI","GND",40,11,0).
dadosCam_t_e_ta(eTruck01,"GAI","MAI",42,13,0).
dadosCam_t_e_ta(eTruck01,"GAI","MAT",34,10,0).
dadosCam_t_e_ta(eTruck01,"GAI","OAZ",82,38,0).
dadosCam_t_e_ta(eTruck01,"GAI","PAR",74,30,0).
dadosCam_t_e_ta(eTruck01,"GAI","POR",29,6,0).
dadosCam_t_e_ta(eTruck01,"GAI","POV",69,31,0).
dadosCam_t_e_ta(eTruck01,"GAI","FEI",55,24,0).
dadosCam_t_e_ta(eTruck01,"GAI","TIR",69,29,0).
dadosCam_t_e_ta(eTruck01,"GAI","SJM",80,30,0).
dadosCam_t_e_ta(eTruck01,"GAI","TRO",82,23,0).
dadosCam_t_e_ta(eTruck01,"GAI","VCA",90,38,0).
dadosCam_t_e_ta(eTruck01,"GAI","VAL",53,18,0).
dadosCam_t_e_ta(eTruck01,"GAI","VCO",67,25,0).







% percursorapidissimo(Lista_Entregas, IdCamiao, Path, Tempo) :- 
% 	findAllPathsWithID(Lista_Entregas, AllPaths),
%     getPercursoMaisRapido(IdCamiao, Lista_Entregas, AllPaths, Path, Tempo).


% getPercursoMaisRapido(IdCamiao,ListaEntregas,[H],H,TempoPercurso) :- getMassaTotalEntregas(ListaEntregas, MassaTotal),
%                     getPesoAtualCamiao(IdCamiao, MassaTotal, PesoAtualCamiao),
%                     getTempoTotalPercurso(IdCamiao,PesoAtualCamiao,80,H,TempoPercurso).

% getPercursoMaisRapido(IdCamiao,ListaEntregas,[H1,H2|T],PercursoMaisRapido,TempoPercurso) :- getMassaTotalEntregas(ListaEntregas, MassaTotal),
%                     getPesoAtualCamiao(IdCamiao, MassaTotal, PesoAtualCamiao),
%                     getTempoTotalPercurso(IdCamiao,PesoAtualCamiao,80,H1,X), 
%                     getTempoTotalPercurso(IdCamiao,PesoAtualCamiao,80,H2,Y), 
%                     (X < Y, getPercursoMaisRapido(IdCamiao,ListaEntregas,[H1|T],PercursoMaisRapido, TempoPercurso);
%                     getPercursoMaisRapido(IdCamiao,ListaEntregas,[H2|T], PercursoMaisRapido, TempoPercurso)).	

% findAllPathsWithID(DeliveryList,AllPaths):- 
% 	getAllWarehousesIDFromADeliveryList(DeliveryList,Paths),armazem_inicial(M),
% 	findall(Result,(permutation(Paths,Aux1), append([M],Aux1,Aux2),append(Aux2,[M],Result)),AllPaths).					