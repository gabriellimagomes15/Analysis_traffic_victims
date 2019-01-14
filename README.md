# Analysis_traffic_victims
Projeto para realizar análise dos dados sobre as vítimas de trânsito nas rodovias do Brasil.

## RUN APP
Run one web service (python, apache etc) and open index.html

## LOAD THE DATE
Para carregar todos os dados para o dashboard, comente a linha onde se tem ```var path_data = ["data/dados_p5.csv"]``` e descomente a linha seguinte ```var path_data = ["data/dados_p1.csv ... data/dados_p5.csv"]```.


## scripts/script.R
Script em R para fazer o pré-processamento dos dados.

## scripts/part_data.py
Script em Python para realizar o particionamento dos dados (em .csv) em N arquivos .csv.
`Executar`
```python part_data.py path_dado.csv```




