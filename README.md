# Analysis_traffic_victims
Projeto para realizar análise dos dados sobre as vítimas de trânsito nas rodovias do Brasil.

## RUN APP
Run one web service (python, apache etc) and open index.html

## LOAD THE DATE
Para carregar todos os dados para o dashboard no arquivo **index.html**, <br/> comente a linha onde tem ```var path_data = ["data/dados_p5.csv"]``` <br/> e descomente a linha seguinte ```var path_data = ["data/dados_p1.csv ... data/dados_p5.csv"]```.


## ./scripts/script.R
Script em R para fazer o pré-processamento dos dados.

## ./scripts/part_data.py
Script em Python para realizar o particionamento dos dados (em .csv) em N arquivos .csv.  <br/> *Executar*  <br/> ```python part_data.py path_dados.csv```

## ./js
### ./js/functions.js
Contém funções em JS.
<br/> 
### ./js/chart.js
Contém as funções que montam os gráficos na página `index.html`


## ./data
### ./data/dados.zip
Contém todos os dados no seu formato original.

### ./data/dadosClean.zip
Contém todos os dados já pré-processados.

### ./data/subdados.zip
Contém todos os registros com algumas colunas selecionadas que são utilizadas na visualização dados dados no dashboard.

### ./data/dados_p1.csv ... dados_p5.csv
Contém os registros particionados em 5 arquivos.csv. Estes registros são um divisão do arquivo **subdados.csv**




