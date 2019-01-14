#install.packages("data.table",repos = "http://cran.us.r-project.org")
require(data.table)
#install.packages("dplyr",repos = "http://cran.us.r-project.org")
require(dplyr)
#install.packages("caTools",repos = "http://cran.us.r-project.org")
require(caTools)
#install.packages("lubridate",repos = "http://cran.us.r-project.org")
require(lubridate)


sink("log.txt")
time_inic <- Sys.time()

tryCatch({
  cat("\n Carregando dados")
  dados     <- fread("dados.csv",encoding = "Latin-1")
  cat("\nLEN: ", dim(dados))

  dados$dup <- duplicated(dados[,c("id","pesid","data_inversa")])
  dados     <- dados %>% filter(dup == FALSE)
  
  columns <- c("id","pesid","data_inversa","dia_semana","horario","uf","br","km","municipio",
               "causa_acidente","tipo_acidente","fase_dia","tipo_veiculo","ano_fabricacao_veiculo",
               "tipo_envolvido","estado_fisico","idade","sexo","nacionalidade","naturalidade","ilesos","feridos_leves",
               "feridos_graves","mortos","latitude","longitude")

  amostra_2 <- dados %>%
    select_(.dots = columns)
  cat("\nNEW_LEN: ", dim(amostra_2))

  #View(rbind(head(amostra_2),tail(amostra_2)))
  
  ####----- padronizando data ####-----
  cat(" \n padronizando data")
  amostra_2$dt_new <- dmy(amostra_2$data_inversa)
  #amostra_2[is.na(amostra_2$dt_new)]$dt_new <- ymd(amostra_2[is.na(amostra_2$dt_new),"data_inversa"])
  amostra_2[is.na(amostra_2$dt_new),"dt_new"] <- ymd(amostra_2[is.na(amostra_2$dt_new),"data_inversa"])

  fwrite(data.frame(table(amostra_2$dt_new)),"table_dt.csv")
  
  ####----- padronizando dia_semana ####-----
  cat(" \n padronizando dia_semana")
  amostra_2$day_new <- sapply(amostra_2$dia_semana, function(x){
    x <- tolower(x)
    x <- gsub("-feira","",x)
    x <- trimws(x)
    x
  })
  fwrite(data.frame(table(amostra_2$day_new)),"table_day.csv")
  
  ####----- padronizando municipio ####-----
  cat(" \n padronizando municipio")
  amostra_2$municipio_new <- sapply(amostra_2$municipio, function(x){
    x <- tolower(x)
    x <- trimws(x)
    x
  })
  fwrite(data.frame(table(amostra_2$municipio_new)),"table_municipio.csv")
  
  ####----- padronizando causa_acidente ####-----
  cat(" \n padronizando causa_acidente")
  amostra_2$causa_acidente_new <- sapply(amostra_2$causa_acidente, function(x){
    x <- tolower(x)
    x <- gsub(pattern = "defeito mec(.*.)nico em ve(.*.)culo",replacement = "defeito mecanico em veiculo",x = x)
    x <- trimws(x)
    x
  })
  fwrite(data.frame(table(amostra_2$causa_acidente_new)),"table_causa_acidente.csv")
  
  ####----- padronizando tipo_acidente ####-----
  cat(" \n padronizando tipo_acidente")
  amostra_2$tipo_acidente_new <- sapply(amostra_2$tipo_acidente, function(x){
    x <- tolower(x)
    x <- trimws(x)
    x
  })
  fwrite(data.frame(table(amostra_2$tipo_acidente_new)),"table_tipo_acidente.csv")
  
  ####----- padronizando  fase_dia ####-----
  cat(" \n padronizando fase_dia")
  amostra_2$fase_dia_new <- sapply(amostra_2$fase_dia, function(x){
    x <- tolower(x)
    x <- trimws(x)
    x
  })
  fwrite(data.frame(table(amostra_2$fase_dia_new)),"table_fase_dia_new.csv")
  
  ####----- padronizando  tipo_veiculo ####-----
  cat(" \n padronizando tipo_veiculo")
  amostra_2$tipo_veiculo_new <- sapply(amostra_2$tipo_veiculo, function(x){
    x <- tolower(x)
    x <- gsub("carro de m(.*.)o", "carro-de-mao",x)
    x <- gsub("micro-(.*.)nibus", "microonibus",x)
    x <- gsub("motocicletas", "motocicleta",x)
    x <- gsub("semireboque", "semi-reboque",x)
    x <- gsub("trator de esteiras", "trator de esteira",x)
    x <- trimws(x)
    x
  })
  fwrite(data.frame(table(amostra_2$tipo_veiculo_new)),"table_tipo_veiculo.csv")
  
  ####----- padronizando  ano_fabricacao_veiculo ####-----
  cat(" \n padronizando ano_fabricacao_veiculo")
  amostra_2$ano_fabricacao_new <- sapply(amostra_2$ano_fabricacao_veiculo, function(x){
    x <- trimws(x)
    x <- as.numeric(x)
    if ( (is.na(x)) || (as.numeric(x) > 2019) ){
      x <- -1
    }
    x
  })
  fwrite(data.frame(table(amostra_2$ano_fabricacao_new)),"table_ano_fabricacao.csv")
  
  ####----- padronizando  tipo_envolvido ####-----
  cat(" \n padronizando tipo_envolvido")
  amostra_2$tipo_envolvido_new <- sapply(amostra_2$tipo_envolvido, function(x){
    x <- trimws(x)
    x
  })
  fwrite(data.frame(table(amostra_2$tipo_envolvido_new)),"table_tipo_envolvido.csv")
  
  
  ####----- padronizando  estado_fisico ####-----
  cat(" \n padronizando estado_fisico")
  amostra_2$estado_fisico_new <- sapply(amostra_2$estado_fisico, function(x){
    x <- trimws(x)
    x <- gsub("(.*.)bito","Morto",x)
    x <- gsub("\\(null\\)", "Nao Informado",x)
    x <- gsub("", "Nao Informado",trimws(x))
    x
  })
  fwrite(data.frame(table(amostra_2$estado_fisico_new)),"table_estado_fisico.csv")
  
  
  ####----- padronizando  idade ####-----
  cat(" \n padronizando idade")
  amostra_2$idade_new <- sapply(amostra_2$idade, function(x){
    x <- trimws(x)
    x <- as.numeric(x)
    if ( is.na(x) || (x > 100)){
      x <- -1
    }
    x
  })
  fwrite(data.frame(table(amostra_2$idade_new)),"table_idade.csv")
  
  
  ####----- padronizando  sexo ####-----
  cat(" \n padronizando sexo")
  amostra_2$sexo_new <- sapply(amostra_2$sexo, function(x){
    x <- trimws(x)
    x <- gsub("^F$",'Feminino',x)
    x <- gsub("^M$",'Masculino',x)
    x <- gsub("^I$",'Ignorado',x)
    x <- gsub("^$",'Ignorado',x)
    x
  })
  fwrite(data.frame(table(amostra_2$sexo_new)),"table_sexo.csv")
  
  ####----- padronizando  ilesos feridos_leves ... ####-----
  cat(" \n padronizando ilesos feridos_leves")
  estado_fisico <- apply(amostra_2,1,function(x){
    if (!is.na(x["ilesos"])){
      if(as.numeric(x["ilesos"]) > 0){
        return ("Ileso")
      }else if(as.numeric(x["feridos_leves"])> 0){
        return("Ferido Leve")
      }else if(as.numeric(x["feridos_graves"])> 0){
        return("Ferido Grave")
      }else if(as.numeric(x["mortos"])> 0){
        return("Morto")      
      }else{
        return("Nao Informado")
      }
    }else{
      return(x["estado_fisico_new"])
    }
  })
  amostra_2$estado_fisico_new <- estado_fisico
  fwrite(data.frame(table(amostra_2$estado_fisico_new)),"table_estado_fisico.csv")
  
  
  cols <- c('id', 'pesid', 'horario', 'uf', colnames(amostra_2)[grepl("new",colnames(amostra_2))])
  
  amostra_2 <- amostra_2 %>%   select_(.dots = cols) #[,..cols]
  colnames(amostra_2) <- gsub("_new","",cols)
  
  amostra_2$mes <- lubridate::month(amostra_2$dt)
  amostra_2$ano <- lubridate::year(amostra_2$dt)

  
  ####----- criando categorias para idade ####-----
  cat(" \n criando categorias para idade")
  categories = c('0-4', '5-9', '10-14', '15-19',  '20-24', '25-29', '30-34', 
                 '35-39', '40-44',  '45-49', '50-54', '55-59', '60-64', '65-69',  
                 '70-74', '75-79', '80-84', '85-89', '90-94',  '95-99', '100 + ');
  
  # criando sequencia numérica de cada categoria
  seq <- lapply(categories, function(x){
    c <- unlist( strsplit(x,'-') )
    if(length(c) > 1){
      return(seq(c[1],c[2]))
    }else{    
      return(100)  
    }
  })

  amostra_2$catIdade <- NA

  cat <- sapply(amostra_2$idade, function(x){
    c <- ""
    reg <- paste("^",x,"$",sep = "")
    i <- 1
    if(x == -1){
      c <- "-1"
    }else if(x > 99){
      c <- "100+"
    }else{
      for (a in seq){
        if(length(grep(reg,a)) > 0){
          c <- categories[i]
          break()
        }
        i <- i+1
      } 
    }
    c
  })
  amostra_2$catIdade <- cat
  
  cat("\n Salvando dados...")
  fwrite(amostra_2,"dados_2.csv")

  time_total <- Sys.time() - time_inic
  cat(" \n time_total = ", time_total)
  
  sink()

  
}, error = function(e){
  cat("\n\nERRORRR ==> ")
  print(e)  
  sink()  
})

cat('\n FIMM!!!')


