#!/usr/bin/python

import pandas as pd
import sys

""" Scritp to partition the data each part will have 20% of the total"""
def main(path_data):

	df = pd.read_csv(path_data, encoding="Latin-1")
	inic = 1
	perct = 0.2
	total_files = int(len(df)/(len(df)*perct))
	qtd_reg = int(round(len(df)*perct))
	fim = qtd_reg

	for i in range(1,total_files+1):
	    print(i, inic, fim)
	    dados = df.loc[inic:fim, :]
	    
	    print("Salvando: dados_p" +str(i)+ ".csv \n")
	    dados.to_csv("dados_p" +str(i)+ ".csv", index = False)

	    inic = fim + 1
	    fim = inic + qtd_reg

if __name__ == "__main__":
   main(sys.argv[1])