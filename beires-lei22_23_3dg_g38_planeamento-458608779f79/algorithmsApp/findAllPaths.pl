armazem_inicial("MAT").

% 1a)
% Recebe um id de entrega e apartir desse id vai buscar o armazém a que essa entrega se refere
getWarehouseByDeliveryId(Id,City):- entrega(Id,_,_,WarehouseId,_,_), idArmazem(City,WarehouseId).

%Este predicado é igual ao de cima mas retorna id de armazéns
getWarehouseIdByDeliveryId(Id,WarehouseId):- entrega(Id,_,_,WarehouseId,_,_).

% Para uma lista de entregas vai retornar uma lista de armazéns, onde cada armazém corresponde ao armazém destinho de uma entrega da lista recebida (utilizando o predicado a cima)
getAllWarehousesFromADeliveryList([],[]).
getAllWarehousesFromADeliveryList([H|T],[X|Y]):- getWarehouseByDeliveryId(H,X),getAllWarehousesFromADeliveryList(T,Y).

%Este predicado é igual ao de cima mas retorna a lista com id de armazéns
getAllWarehousesIDFromADeliveryList([],[]).
getAllWarehousesIDFromADeliveryList([H|T],[X|Y]):- getWarehouseIdByDeliveryId(H,X),getAllWarehousesIDFromADeliveryList(T,Y).

% Usando o findAll (predicado do PROLOG) podemos encontrar todas a permutações possíveis da lista de armazéns (concebida usando o predicado anterior) apartir de uma lista de entregas recebida
% por parametro. Visto que todos o percursos têm que começar e acabar em Matosinhos (idArmazem -> 5) utilizamos o "append" para que em casa permutação ponhâmos Matosinhos como armazém de 
% partida e chegada de cada percurso. 
findAllPaths(DeliveryList,AllPaths):- getAllWarehousesFromADeliveryList(DeliveryList,Paths), idArmazem(M,"MAT"),
findall(Result,(permutation(Paths,Aux1), append([M],Aux1,Aux2),append(Aux2,[M],Result)),AllPaths).

%Este predicado é igual ao de cima mas retorna o percurso com ids dos armazéns
findAllPathsWithID(DeliveryList,AllPaths):- getAllWarehousesIDFromADeliveryList(DeliveryList,Paths),armazem_inicial(M),
findall(Result,(permutation(Paths,Aux1), append([M],Aux1,Aux2),append(Aux2,[M],Result)),AllPaths).