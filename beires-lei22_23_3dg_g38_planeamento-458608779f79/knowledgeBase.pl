%idArmazem(<local>,<codigo>)
armazem_inicial('MAT').
idArmazem('Arouca','ARO').
idArmazem('Espinho','ESP').
idArmazem('Gondomar','GND').
idArmazem('Maia','MAI').
idArmazem('Matosinhos','MAT').
idArmazem('Oliveira de Azemeis','OAZ').
idArmazem('Paredes','PAR').
idArmazem('Porto','POR').
idArmazem('Povoa de Varzim','POV').
idArmazem('Santa Maria da Feira','FEI').
idArmazem('Santo Tirso','TIR').
idArmazem('Sao Joao da Madeira','SJM').
idArmazem('Trofa','TR0').
idArmazem('Vale de Cambra','VCA').
idArmazem('Valongo','VAL').
idArmazem('Vila do Conde','VCO').
idArmazem('Vila Nova de Gaia','GAI').


%entrega(<idEntrega>,<data>,<massaEntrega>,<armazemEntrega>,<tempoColoc>,<tempoRet>)
entrega(4439, 20221205, 200, 'ARO', 8, 10).
entrega(4438, 20221205, 150, 'POV', 7, 9).
entrega(4445, 20221205, 100, 'GND', 5, 7).
entrega(4443, 20221205, 120, 'POR', 6, 8).
entrega(4449, 20221205, 300, 'TIR', 15, 20).

%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
carateristicasCam(eTruck01,7500,4300,80,100,60).

%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).
%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).
dadosCam_t_e_ta(eTruck01,'ARO','ESP',122,42,0).
dadosCam_t_e_ta(eTruck01,'ARO','GND',122,46,10).
dadosCam_t_e_ta(eTruck01,'ARO','MAI',151,54,25).
dadosCam_t_e_ta(eTruck01,'ARO','MAT',147,52,25).
dadosCam_t_e_ta(eTruck01,'ARO','OAZ',74,24,0).
dadosCam_t_e_ta(eTruck01,'ARO','PAR',116,35,0).
dadosCam_t_e_ta(eTruck01,'ARO','POR',141,46,0).
dadosCam_t_e_ta(eTruck01,'ARO','POV',185,74,53).
dadosCam_t_e_ta(eTruck01,'ARO',10,97,30,0).
dadosCam_t_e_ta(eTruck01,'ARO','TIR',164,64,40).
dadosCam_t_e_ta(eTruck01,'ARO',12,76,23,0).
dadosCam_t_e_ta(eTruck01,'ARO',13,174,66,45).
dadosCam_t_e_ta(eTruck01,'ARO',14,59,18,0).
dadosCam_t_e_ta(eTruck01,'ARO',15,132,51,24).
dadosCam_t_e_ta(eTruck01,'ARO',16,181,68,45).
dadosCam_t_e_ta(eTruck01,'ARO',17,128,45,0).

dadosCam_t_e_ta(eTruck01,'ESP','ARO',116,42,0).
dadosCam_t_e_ta(eTruck01,'ESP','GND',55,22,0).
dadosCam_t_e_ta(eTruck01,'ESP','MAI',74,25,0).
dadosCam_t_e_ta(eTruck01,'ESP','MAT',65,22,0).
dadosCam_t_e_ta(eTruck01,'ESP','OAZ',69,27,0).
dadosCam_t_e_ta(eTruck01,'ESP','PAR',74,38,0).
dadosCam_t_e_ta(eTruck01,'ESP','POR',61,18,0).
dadosCam_t_e_ta(eTruck01,'ESP','POV',103,44,0).
dadosCam_t_e_ta(eTruck01,'ESP',10,36,14,0).
dadosCam_t_e_ta(eTruck01,'ESP','TIR',88,41,0).
dadosCam_t_e_ta(eTruck01,'ESP',12,61,19,0).
dadosCam_t_e_ta(eTruck01,'ESP',13,95,42,0).
dadosCam_t_e_ta(eTruck01,'ESP',14,78,34,0).
dadosCam_t_e_ta(eTruck01,'ESP',15,69,30,0).
dadosCam_t_e_ta(eTruck01,'ESP',16,99,38,0).
dadosCam_t_e_ta(eTruck01,'ESP',17,46,14,0).

dadosCam_t_e_ta(eTruck01,'GND','ARO',120,45,0).
dadosCam_t_e_ta(eTruck01,'GND','ESP',50,22,0).
dadosCam_t_e_ta(eTruck01,'GND','MAI',46,15,0).
dadosCam_t_e_ta(eTruck01,'GND','MAT',46,14,0).
dadosCam_t_e_ta(eTruck01,'GND','OAZ',74,37,0).
dadosCam_t_e_ta(eTruck01,'GND','PAR',63,23,0).
dadosCam_t_e_ta(eTruck01,'GND','POR',38,8,0).
dadosCam_t_e_ta(eTruck01,'GND','POV',84,36,0).
dadosCam_t_e_ta(eTruck01,'GND',10,59,28,0).
dadosCam_t_e_ta(eTruck01,'GND','TIR',61,27,0).
dadosCam_t_e_ta(eTruck01,'GND',12,67,32,0).
dadosCam_t_e_ta(eTruck01,'GND',13,67,29,0).
dadosCam_t_e_ta(eTruck01,'GND',14,82,38,0).
dadosCam_t_e_ta(eTruck01,'GND',15,34,8,0).
dadosCam_t_e_ta(eTruck01,'GND',16,80,30,0).
dadosCam_t_e_ta(eTruck01,'GND',17,36,10,0).

dadosCam_t_e_ta(eTruck01,'MAI','ARO',149,54,25).
dadosCam_t_e_ta(eTruck01,'MAI','ESP',65,24,0).
dadosCam_t_e_ta(eTruck01,'MAI','GND',46,16,0).
dadosCam_t_e_ta(eTruck01,'MAI','MAT',27,10,0).
dadosCam_t_e_ta(eTruck01,'MAI','OAZ',103,47,0).
dadosCam_t_e_ta(eTruck01,'MAI','PAR',55,27,0).
dadosCam_t_e_ta(eTruck01,'MAI','POR',36,10,0).
dadosCam_t_e_ta(eTruck01,'MAI','POV',50,26,0).
dadosCam_t_e_ta(eTruck01,'MAI',10,78,34,0).
dadosCam_t_e_ta(eTruck01,'MAI','TIR',42,19,0).
dadosCam_t_e_ta(eTruck01,'MAI',12,97,42,0).
dadosCam_t_e_ta(eTruck01,'MAI',13,44,11,0).
dadosCam_t_e_ta(eTruck01,'MAI',14,111,48,0).
dadosCam_t_e_ta(eTruck01,'MAI',15,32,13,0).
dadosCam_t_e_ta(eTruck01,'MAI',16,53,14,0).
dadosCam_t_e_ta(eTruck01,'MAI',17,38,11,0).

dadosCam_t_e_ta(eTruck01,'MAT','ARO',141,51,24).
dadosCam_t_e_ta(eTruck01,'MAT','ESP',55,20,0).
dadosCam_t_e_ta("eTruck01",'MAT','GND',48,14,0).
dadosCam_t_e_ta(eTruck01,'MAT','MAI',25,9,0).
dadosCam_t_e_ta(eTruck01,'MAT','OAZ',97,44,0).
dadosCam_t_e_ta(eTruck01,'MAT','PAR',55,28,0).
dadosCam_t_e_ta(eTruck01,'MAT','POR',29,7,0).
dadosCam_t_e_ta(eTruck01,'MAT','POV',48,24,0).
dadosCam_t_e_ta(eTruck01,'MAT',10,69,30,0).
dadosCam_t_e_ta(eTruck01,'MAT','TIR',53,26,0).
dadosCam_t_e_ta(eTruck01,'MAT',12,95,36,0).
dadosCam_t_e_ta(eTruck01,'MAT',13,63,20,0).
dadosCam_t_e_ta(eTruck01,'MAT',14,105,45,0).
dadosCam_t_e_ta(eTruck01,'MAT',15,34,14,0).
dadosCam_t_e_ta(eTruck01,'MAT',16,46,18,0).
dadosCam_t_e_ta(eTruck01,'MAT',17,27,7,0).

dadosCam_t_e_ta(eTruck01,'OAZ','ARO',69,23,0).
dadosCam_t_e_ta(eTruck01,'OAZ','ESP',71,27,0).
dadosCam_t_e_ta(eTruck01,'OAZ','GND',74,38,0).
dadosCam_t_e_ta(eTruck01,'OAZ','MAI',103,46,0).
dadosCam_t_e_ta(eTruck01,'OAZ','MAT',99,44,0).
dadosCam_t_e_ta(eTruck01,'OAZ','PAR',88,48,0).
dadosCam_t_e_ta(eTruck01,'OAZ','POR',92,38,0).
dadosCam_t_e_ta(eTruck01,'OAZ','POV',134,66,45).
dadosCam_t_e_ta(eTruck01,'OAZ',10,42,14,0).
dadosCam_t_e_ta(eTruck01,'OAZ','TIR',116,56,30).
dadosCam_t_e_ta(eTruck01,'OAZ',12,23,9,0).
dadosCam_t_e_ta(eTruck01,'OAZ',13,126,58,33).
dadosCam_t_e_ta(eTruck01,'OAZ',14,25,9,0).
dadosCam_t_e_ta(eTruck01,'OAZ',15,84,44,0).
dadosCam_t_e_ta(eTruck01,'OAZ',16,132,60,35).
dadosCam_t_e_ta(eTruck01,'OAZ',17,80,38,0).

dadosCam_t_e_ta(eTruck01,'PAR','ARO',116,36,0).
dadosCam_t_e_ta(eTruck01,'PAR','ESP',71,38,0).
dadosCam_t_e_ta(eTruck01,'PAR','GND',61,22,0).
dadosCam_t_e_ta(eTruck01,'PAR','MAI',53,26,0).
dadosCam_t_e_ta(eTruck01,'PAR','MAT',53,28,0).
dadosCam_t_e_ta(eTruck01,'PAR','OAZ',88,48,0).
dadosCam_t_e_ta(eTruck01,'PAR','POR',59,26,0).
dadosCam_t_e_ta(eTruck01,'PAR','POV',88,48,0).
dadosCam_t_e_ta(eTruck01,'PAR',10,84,44,0).
dadosCam_t_e_ta(eTruck01,'PAR','TIR',74,22,0).
dadosCam_t_e_ta(eTruck01,'PAR',12,82,42,0).
dadosCam_t_e_ta(eTruck01,'PAR',13,76,31,0).
dadosCam_t_e_ta(eTruck01,'PAR',14,97,49,21).
dadosCam_t_e_ta(eTruck01,'PAR',15,29,16,0).
dadosCam_t_e_ta(eTruck01,'PAR',16,84,42,0).
dadosCam_t_e_ta(eTruck01,'PAR',17,69,30,0).

dadosCam_t_e_ta(eTruck01,'POR','ARO',134,46,0).
dadosCam_t_e_ta(eTruck01,'POR','ESP',59,18,0).
dadosCam_t_e_ta(eTruck01,'POR','GND',32,6,0).
dadosCam_t_e_ta(eTruck01,'POR','MAI',34,10,0).
dadosCam_t_e_ta(eTruck01,'POR','MAT',32,7,0).
dadosCam_t_e_ta(eTruck01,'POR','OAZ',88,38,0).
dadosCam_t_e_ta(eTruck01,'POR',7,57,26,0).
dadosCam_t_e_ta(eTruck01,'POR','POV',69,30,0).
dadosCam_t_e_ta(eTruck01,'POR',10,65,26,0).
dadosCam_t_e_ta(eTruck01,'POR','TIR',53,22,0).
dadosCam_t_e_ta(eTruck01,'POR',12,82,34,0).
dadosCam_t_e_ta(eTruck01,'POR',13,61,24,0).
dadosCam_t_e_ta(eTruck01,'POR',14,97,40,0).
dadosCam_t_e_ta(eTruck01,'POR',15,36,12,0).
dadosCam_t_e_ta(eTruck01,'POR',16,65,23,0).
dadosCam_t_e_ta(eTruck01,'POR',17,32,6,0).

dadosCam_t_e_ta(eTruck01,'POV','ARO',181,72,50).
dadosCam_t_e_ta(eTruck01,'POV','ESP',95,41,0).
dadosCam_t_e_ta(eTruck01,'POV','GND',86,35,0).
dadosCam_t_e_ta(eTruck01,'POV','MAI',55,24,0).
dadosCam_t_e_ta(eTruck01,'POV','MAT',48,23,0).
dadosCam_t_e_ta(eTruck01,'POV','OAZ',134,65,42).
dadosCam_t_e_ta(eTruck01,'POV',7,95,47,0).
dadosCam_t_e_ta(eTruck01,'POV','POR',69,28,0).
dadosCam_t_e_ta(eTruck01,'POV',10,109,51,24).
dadosCam_t_e_ta(eTruck01,'POV','TIR',61,29,0).
dadosCam_t_e_ta(eTruck01,'POV',12,132,57,31).
dadosCam_t_e_ta(eTruck01,'POV',13,67,19,0).
dadosCam_t_e_ta(eTruck01,'POV',14,143,66,45).
dadosCam_t_e_ta(eTruck01,'POV',15,71,34,0).
dadosCam_t_e_ta(eTruck01,'POV',16,15,3,0).
dadosCam_t_e_ta(eTruck01,'POV',17,67,28,0).

dadosCam_t_e_ta(eTruck01,10,'ARO',97,30,0).
dadosCam_t_e_ta(eTruck01,10,'ESP',34,14,0).
dadosCam_t_e_ta(eTruck01,10,'GND',59,27,0).
dadosCam_t_e_ta(eTruck01,10,'MAI',78,33,0).
dadosCam_t_e_ta(eTruck01,10,'MAT',71,30,0).
dadosCam_t_e_ta(eTruck01,10,'OAZ',40,14,0).
dadosCam_t_e_ta(eTruck01,10,7,82,42,0).
dadosCam_t_e_ta(eTruck01,10,'POR',65,24,0).
dadosCam_t_e_ta(eTruck01,10,'POV',109,52,25).
dadosCam_t_e_ta(eTruck01,10,'TIR',92,46,0).
dadosCam_t_e_ta(eTruck01,10,12,32,6,0).
dadosCam_t_e_ta(eTruck01,10,13,99,46,0).
dadosCam_t_e_ta(eTruck01,10,14,63,17,0).
dadosCam_t_e_ta(eTruck01,10,15,74,34,0).
dadosCam_t_e_ta(eTruck01,10,16,105,46,0).
dadosCam_t_e_ta(eTruck01,10,17,53,23,0).

dadosCam_t_e_ta(eTruck01,'TIR','ARO',164,65,42).
dadosCam_t_e_ta(eTruck01,'TIR','ESP',88,41,0).
dadosCam_t_e_ta(eTruck01,'TIR','GND',65,28,0).
dadosCam_t_e_ta(eTruck01,'TIR','MAI',42,18,0).
dadosCam_t_e_ta(eTruck01,'TIR','MAT',55,25,0).
dadosCam_t_e_ta(eTruck01,'TIR','OAZ',118,57,31).
dadosCam_t_e_ta(eTruck01,'TIR',7,74,23,0).
dadosCam_t_e_ta(eTruck01,'TIR','POR',59,23,0).
dadosCam_t_e_ta(eTruck01,'TIR','POV',63,28,0).
dadosCam_t_e_ta(eTruck01,'TIR',10,97,46,0).
dadosCam_t_e_ta(eTruck01,'TIR',12,111,52,25).
dadosCam_t_e_ta(eTruck01,'TIR',13,25,7,0).
dadosCam_t_e_ta(eTruck01,'TIR',14,126,58,33).
dadosCam_t_e_ta(eTruck01,'TIR',15,53,25,0).
dadosCam_t_e_ta(eTruck01,'TIR',16,59,27,0).
dadosCam_t_e_ta(eTruck01,'TIR',17,67,27,0).

dadosCam_t_e_ta(eTruck01,12,'ARO',76,23,0).
dadosCam_t_e_ta(eTruck01,12,'ESP',61,19,0).
dadosCam_t_e_ta(eTruck01,12,'GND',67,32,0).
dadosCam_t_e_ta(eTruck01,12,'MAI',97,41,0).
dadosCam_t_e_ta(eTruck01,12,'MAT',92,38,0).
dadosCam_t_e_ta(eTruck01,12,'OAZ',19,8,0).
dadosCam_t_e_ta(eTruck01,12,7,82,42,0).
dadosCam_t_e_ta(eTruck01,12,'POR',86,33,0).
dadosCam_t_e_ta(eTruck01,12,'POV',128,61,37).
dadosCam_t_e_ta(eTruck01,12,10,32,6,0).
dadosCam_t_e_ta(eTruck01,12,'TIR',109,50,23).
dadosCam_t_e_ta(eTruck01,12,13,120,53,26).
dadosCam_t_e_ta(eTruck01,12,14,40,10,0).
dadosCam_t_e_ta(eTruck01,12,15,78,38,0).
dadosCam_t_e_ta(eTruck01,12,16,126,54,28).
dadosCam_t_e_ta(eTruck01,12,17,74,32,0).

dadosCam_t_e_ta(eTruck01,13,'ARO',174,65,42).
dadosCam_t_e_ta(eTruck01,13,'ESP',107,35,0).
dadosCam_t_e_ta(eTruck01,13,'GND',74,29,0).
dadosCam_t_e_ta(eTruck01,13,'MAI',46,11,0).
dadosCam_t_e_ta(eTruck01,13,'MAT',67,20,0).
dadosCam_t_e_ta(eTruck01,13,'OAZ',128,57,31).
dadosCam_t_e_ta(eTruck01,13,7,80,30,0).
dadosCam_t_e_ta(eTruck01,13,'POR',76,20,0).
dadosCam_t_e_ta(eTruck01,13,'POV',67,20,0).
dadosCam_t_e_ta(eTruck01,13,10,105,47,0).
dadosCam_t_e_ta(eTruck01,13,'TIR',27,7,0).
dadosCam_t_e_ta(eTruck01,13,12,122,52,25).
dadosCam_t_e_ta(eTruck01,13,14,137,58,33).
dadosCam_t_e_ta(eTruck01,13,15,67,17,0).
dadosCam_t_e_ta(eTruck01,13,16,59,15,0).
dadosCam_t_e_ta(eTruck01,13,17,78,22,0).

dadosCam_t_e_ta(eTruck01,14,'ARO',59,18,0).
dadosCam_t_e_ta(eTruck01,14,'ESP',80,35,0).
dadosCam_t_e_ta(eTruck01,14,'GND',80,38,0).
dadosCam_t_e_ta(eTruck01,14,'MAI',109,46,0).
dadosCam_t_e_ta(eTruck01,14,'MAT',105,45,0).
dadosCam_t_e_ta(eTruck01,14,'OAZ',27,9,0).
dadosCam_t_e_ta(eTruck01,14,7,97,48,0).
dadosCam_t_e_ta(eTruck01,14,'POR',99,38,0).
dadosCam_t_e_ta(eTruck01,14,'POV',143,66,45).
dadosCam_t_e_ta(eTruck01,14,10,61,17,0).
dadosCam_t_e_ta(eTruck01,14,'TIR',122,57,31).
dadosCam_t_e_ta(eTruck01,14,12,42,10,0).
dadosCam_t_e_ta(eTruck01,14,13,132,58,35).
dadosCam_t_e_ta(eTruck01,14,15,90,44,0).
dadosCam_t_e_ta(eTruck01,14,16,139,61,37).
dadosCam_t_e_ta(eTruck01,14,17,86,38,0).

dadosCam_t_e_ta(eTruck01,15,'ARO',132,51,24).
dadosCam_t_e_ta(eTruck01,15,'ESP',74,30,0).
dadosCam_t_e_ta(eTruck01,15,'GND',34,8,0).
dadosCam_t_e_ta(eTruck01,15,'MAI',36,12,0).
dadosCam_t_e_ta(eTruck01,15,'MAT',36,14,0).
dadosCam_t_e_ta(eTruck01,15,'OAZ',86,44,0).
dadosCam_t_e_ta(eTruck01,15,7,34,16,0).
dadosCam_t_e_ta(eTruck01,15,'POR',42,13,0).
dadosCam_t_e_ta(eTruck01,15,'POV',71,35,0).
dadosCam_t_e_ta(eTruck01,15,10,82,36,0).
dadosCam_t_e_ta(eTruck01,15,'TIR',53,25,0).
dadosCam_t_e_ta(eTruck01,15,12,80,38,0).
dadosCam_t_e_ta(eTruck01,15,13,69,18,0).
dadosCam_t_e_ta(eTruck01,15,14,95,45,0).
dadosCam_t_e_ta(eTruck01,15,16,69,29,0).
dadosCam_t_e_ta(eTruck01,15,17,53,17,0).

dadosCam_t_e_ta(eTruck01,16,'ARO',179,68,45).
dadosCam_t_e_ta(eTruck01,16,'ESP',92,37,0).
dadosCam_t_e_ta(eTruck01,16,'GND',84,31,0).
dadosCam_t_e_ta(eTruck01,16,'MAI',57,16,0).
dadosCam_t_e_ta(eTruck01,16,'MAT',46,18,0).
dadosCam_t_e_ta(eTruck01,16,'OAZ',132,60,35).
dadosCam_t_e_ta(eTruck01,16,7,92,42,0).
dadosCam_t_e_ta(eTruck01,16,'POR',67,23,0).
dadosCam_t_e_ta(eTruck01,16,'POV',15,3,0).
dadosCam_t_e_ta(eTruck01,16,10,105,46,0).
dadosCam_t_e_ta(eTruck01,16,'TIR',57,28,0).
dadosCam_t_e_ta(eTruck01,16,12,130,52,25).
dadosCam_t_e_ta(eTruck01,16,13,61,15,0).
dadosCam_t_e_ta(eTruck01,16,14,141,61,37).
dadosCam_t_e_ta(eTruck01,16,15,69,29,0).
dadosCam_t_e_ta(eTruck01,16,17,65,24,0).

dadosCam_t_e_ta(eTruck01,17,'ARO',128,46,0).
dadosCam_t_e_ta(eTruck01,17,'ESP',42,14,0).
dadosCam_t_e_ta(eTruck01,17,'GND',40,11,0).
dadosCam_t_e_ta(eTruck01,17,'MAI',42,13,0).
dadosCam_t_e_ta(eTruck01,17,'MAT',34,10,0).
dadosCam_t_e_ta(eTruck01,17,'OAZ',82,38,0).
dadosCam_t_e_ta(eTruck01,17,7,74,30,0).
dadosCam_t_e_ta(eTruck01,17,'POR',29,6,0).
dadosCam_t_e_ta(eTruck01,17,'POV',69,31,0).
dadosCam_t_e_ta(eTruck01,17,10,55,24,0).
dadosCam_t_e_ta(eTruck01,17,'TIR',69,29,0).
dadosCam_t_e_ta(eTruck01,17,12,80,30,0).
dadosCam_t_e_ta(eTruck01,17,13,82,23,0).
dadosCam_t_e_ta(eTruck01,17,14,90,38,0).
dadosCam_t_e_ta(eTruck01,17,15,53,18,0).
dadosCam_t_e_ta(eTruck01,17,16,67,25,0).