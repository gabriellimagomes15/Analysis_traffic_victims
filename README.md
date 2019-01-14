# Analysis_traffic_victims
Projeto para realizar análise dos dados sobre as vítimas de trânsito nas rodovias do Brasil.

## RUN APP
Run one web service (python, apache etc) and open index.html

## LOAD THE DATE
Para carregar todos os dados para o dashboard no arquivo **index.html**, <br/> comente a linha onde tem ```var path_data = ["data/dados_p5.csv"]``` <br/> e descomente a linha seguinte ```var path_data = ["data/dados_p1.csv ... data/dados_p5.csv"]```.


## scripts/script.R
Script em R para fazer o pré-processamento dos dados.

## scripts/part_data.py
Script em Python para realizar o particionamento dos dados (em .csv) em N arquivos .csv.  <br/> *Executar*  <br/> ```python part_data.py path_dados.csv```




