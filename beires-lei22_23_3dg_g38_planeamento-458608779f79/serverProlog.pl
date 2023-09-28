%%Base de conhecimento
:- dynamic carateristicasCam/6.
% :- dynamic idArmazem/2.
:- dynamic entrega/6.
% :- dynamic entregas/1.



%%Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_cors)).

% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).


%JSON Objects

:- json_object frotaJson(frota:list(viagem)).
:- json_object viagem(idCamiao:any, entregas:list(any), caminho: list(any),tempo:number).
:- json_object entregasAsJson(array:list(any)).
:- json_object percurso_tempo(percurso:any, tempo:any).                  %Json object de um percurso
:- json_object camiao(idCamiao : any, tara: any, pesoMaximo : any, cargaTotal : any, autonomia : any, carregamento : any).
:- json_object entregaJson(id : any, data: any, massa : any, warehouse : any, tempoColoc : any, tempoRet : any).
:- json_object numberJson(number : any).

%Cors
:- set_setting(http:cors, [*]).

%Relação entre HTTP e predicados que os processa
:- http_handler('/api/planning/percursoMaisRapido', obter_percurso_mais_rapido, []).
:- http_handler('/api/planning/frota', obter_planeamento_frota, []).

%Inicialização do servidor
server(Port) :- http_server(http_dispatch,[port(Port)]).

%%Modules
:-consult('algorithmsApp/geneticAlgorithm.pl').

%Urls das apis necessárias para preencher a base de conhecimento
camioes_url("http://localhost:3000/api/trucks/getAll").
entregas_url("https://localhost:7169/api/Delivery").
armazens_url("https://localhost:7169/api/Warehouses").
% entregas_por_dia("https://localhost:7169/api/Delivery").




%===============================================================Gets Database======================================================================

obterCamioes(Data) :-
        camioes_url(URL),
        setup_call_cleanup(
                http_open(URL,In, [request_header('Accept'='application/json')]),
                json_read_dict(In, Data),
                close(In)
        ).

obterEntregas(Data) :-
        entregas_url(URL),
        setup_call_cleanup(
                http_open(URL,In, [request_header('Accept'='application/json')]),
                json_read_dict(In, Data),
                close(In)
        ).

obterArmazens(Data) :-
        armazens_url(URL),
        setup_call_cleanup(
                http_open(URL,In, [request_header('Accept'='application/json')]),
                json_read_dict(In, Data),
                close(In)
        ).   

% obterPercurso(Data) :-
%         percursos_url(URL),
%                 setup_call_cleanup(
%                 http_open(URL,In, [request_header('Accept'='application/json')]),
%                 json_read_dict(In, Data),
%                 close(In)
%         ).
%==================================================================Preenchimento Base de Conhecimento======================================================



%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
adicionarCamioes() :-
        obterCamioes(Data),
        parseCamioes(Data).

parseCamioes([]).
parseCamioes([H|Data]) :-
        atom_string(Id, H.get(designation)),
        asserta(carateristicasCam(
                                        Id,
                                        H.get(tara),
                                        H.get(cargoCapacity),
                                        H.get(maxBattery),
                                        H.get(autonomy),
                                        H.get(chargingTime)
                                )),
        parseCamioes(Data).
        

%entrega(<idEntrega>,<data>,<massaEntrega>,<armazemEntrega>,<tempoColoc>,<tempoRet>)
adicionarEntregas() :-
        obterEntregas(Data),
        setListaEntregas(Data),
        parseEntregas(Data).

parseEntregas([]).
parseEntregas([H|Data]) :-
        asserta(entrega(
                                        H.get(id),
                                        H.get(date),
                                        H.get(mass),
                                        H.get(warehouseId),
                                        H.get(inputTruck),
                                        H.get(outputTruck)
                                )),
        parseEntregas(Data).       

%================================================================================================

setListaEntregas(Data) :- 
                parseEntregasLista(Data,ListaEntregas),
                asserta(entregas(ListaEntregas)).

parseEntregasLista([],[]).
parseEntregasLista([H|Data],[H.get(id)|L]) :-
                parseEntregasLista(Data, L).

%========================================================================================================
%idArmazem(<local>,<codigo>)
adicionarArmazens() :-
        obterArmazens(Data),
        parseArmazens(Data).

parseArmazens([]).
parseArmazens([H|Data]) :-
        asserta(        idArmazem(
                                        H.get(warehouseDesignation),
                                        H.get(id)
                                )),
        parseArmazens(Data).  



adicionarBaseConhecimento():-
        % adicionarArmazens(),
        adicionarEntregas(),
        adicionarCamioes(),!.



removerBaseConhecimento():-
        % retractall(idArmazem(_,_)),
        % retractall(carateristicasCam(_,_,_,_,_,_)),
        retractall(entrega(_,_,_,_,_,_)),
        retractall(carateristicasCam(_,_,_,_,_,_)),
        retractall(planeamentoPorCamiao(_,_,_,_)),
        retractall(planeamento_Frota(_)),
        retractall(entregasCamiao(_,_)).
        % retractall(entregas(_,_,_,_,_,_)).



%http://localhost:8000/percursoMaisRapido?idCamiao=eTruck01




%=============================================================== Requests==================================================================================


% obter_percurso_mais_rapido(Request):-
%         cors_enable(Request, [methods([get])]),
%         removerBaseConhecimento(),
%         adicionarBaseConhecimento(),
%         http_parameters(Request, [
%                                         idCamiao(IdCamiao, [])
%                                  ]),
%         % entrega(Id,Data,Massa,Armazem,Col,Ret),
%         entregas(ListaEntregas),

%         % dadosCam_t_e_ta(IdCamiao, "MAT", "ARO", A, B, C),
%         carateristicasCam(IdCamiao,Tara, PesoMaximo, CargaTotal, Autonomia, TempoCarregamento),
%         % findall(X, entrega(X,_,_,_,_,_), ListaEntregas1),    
%         % write(ListaEntregas1),                           
%         findAllPathsWithID(ListaEntregas,PossiblePaths),
%         getPercursoMaisRapido(IdCamiao,ListaEntregas , PossiblePaths, PercursoMaisRapido, Tempo),                         
%         Resposta = percurso_tempo(PercursoMaisRapido,Tempo),
%         % Resposta = camiao(IdCamiao,Tara, PesoMaximo, CargaTotal, Autonomia, TempoCarregamento),
%         % Resposta = entregasAsJson(PossiblePaths),
%         % Resposta = entregaJson(Id,Data,Massa,Armazem,Col,Ret),
%         % Resposta = numberJson(IdCamiao),

%         prolog_to_json(Resposta, JSONObject),
%         reply_json(JSONObject, [json_object(dict)]).

%===============================================================Request Planeamento Frota===========================================================

obter_planeamento_frota(Request):-
        cors_enable,
        % removerBaseConhecimento(),
        % adicionarBaseConhecimento(),
        % http_read_json(Request,Informacao,[json_object(dict)]),
        % json_to_prolog(Informacao, ObjProlog),
        % Data = ObjProlog.get(planningDate),
        % NG = ObjProlog.get(numberGenerations),
        % DP = ObjProlog.get(populationSize),
        % P1 = ObjProlog.get(probabilityCross),
        % P2 = ObjProlog.get(probabilityMutate),
        % T = ObjProlog.get(acceptableTime),
        % planeamentoFrota(NG,DP,P1,P2,T),
        removerBaseConhecimento(),
        adicionarBaseConhecimento(),

        planeamentoFrota(6,8,90,90,120),
        findall(
                [Camiao, ListaEntregas, Caminho, Tempo], 
                planeamentoPorCamiao(Camiao, ListaEntregas, Caminho, Tempo),
                ListaPlanning 
        ),

        

        criarObjetosViagemJson(ListaPlanning,ReplyArray),
        Reply = frotaJson(ReplyArray),
        prolog_to_json(Reply,JSONObject),
        % prolog_to_json(Reply, JSONObject),
        reply_json(JSONObject,[json_object(dict)]).


        criarObjetosViagemJson([],[]).
        criarObjetosViagemJson([[Camiao, ListaEntregas, Caminho, Tempo]|Resto], [ViagemJSON|ListaJson]) :-
                ViagemJSON = viagem(Camiao, ListaEntregas, Caminho, Tempo),
                criarObjetosViagemJson(Resto, ListaJson).