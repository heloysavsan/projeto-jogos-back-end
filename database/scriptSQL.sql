
#Ativa o database a ser utilizado
use db_controle_jogos_bb;

-- -----------------------------------------------------
-- Table mydb.tbl_jogo
-- -----------------------------------------------------
CREATE TABLE tbl_jogo (
  id INT  NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(80) NOT NULL,
  data_lancamento DATE NOT NULL,
  versao VARCHAR(10) NOT NULL,
  tamanho VARCHAR(10) NULL,
  descricao TEXT NULL,
  foto_capa VARCHAR(200) NULL,
  link VARCHAR(200) NULL
);


-- -----------------------------------------------------
-- Table mydb.tb_categoria
-- -----------------------------------------------------
CREATE TABLE tb_categoria (
  id_categoria INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  descrição VARCHAR(45) NOT NULL,
  tbl_jogo_id INT NOT NULL,
    FOREIGN KEY (tbl_jogo_id) REFERENCES tbl_jogo (id)
)


-- -----------------------------------------------------
-- Table mydb.tb_empresa
-- -----------------------------------------------------
CREATE TABLE tb_empresa (
  id_empresa INT PRIMARY KEY  NOT NULL,
  nome VARCHAR(45) NULL,
  website VARCHAR(80) NOT NULL,
  tb_empresacol VARCHAR(45) NOT NULL,
  tbl_jogo_id INT NOT NULL,
  FOREIGN KEY (tbl_jogo_id) REFERENCES mydb.tbl_jogo (id)
)

-- -----------------------------------------------------
-- Table mydb.tb_avaliação
-- -----------------------------------------------------
CREATE TABLE tb_avaliação (
  id_avaliação INT NOT NULL,
  id_usuario INT NOT NULL,
  id_jogo INT NOT NULL,
  nota INT NULL,
  comentario VARCHAR(80) NOT NULL,
  data_avaliação DATE NOT NULL,
  tbl_jogo_id INT NOT NULL,
  FOREIGN KEY (tbl_jogo_id) REFERENCES mydb.tbl_jogo (id)
)



-- -----------------------------------------------------
-- Table mydb.tb_usuario
-- -----------------------------------------------------
CREATE TABLE tb_usuario (
  id_usuario INT NULL,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(80) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  data_cadastro VARCHAR(45) NOT NULL,
  tbl_jogo_id INT NOT NULL,
  tb_avaliação_id_avaliação INT NOT NULL,
  tb_avaliação_id_usuario INT NOT NULL,
  tb_avaliação_id_jogo INT NOT NULL,
  FOREIGN KEY (tbl_jogo_id) REFERENCES tbl_jogo (id),
  FOREIGN KEY (tb_avaliação_id_avaliação , tb_avaliação_id_usuario , tb_avaliação_id_jogo) REFERENCES tb_avaliação (id_avaliação , id_usuario , id_jogo)
)



-- -----------------------------------------------------
-- Table mydb.tb_jogo_plataforma
-- -----------------------------------------------------
CREATE TABLE tb_jogo_plataforma (
  id_jogo_plataforma INT NOT NULL,
  id_plataforma INT NOT NULL,
  tb_jogo_plataformacol VARCHAR(45) NULL,
  tbl_jogo_id INT NOT NULL,
  PRIMARY KEY (id_jogo_plataforma, id_plataforma),
  FOREIGN KEY (tbl_jogo_id) REFERENCES tbl_jogo (id)
)



-- -----------------------------------------------------
-- Table mydb.td_plataforma
-- -----------------------------------------------------
CREATE TABLE td_plataforma (
  id_plataforma INT NOT NULL,
  nome VARCHAR(45) NOT NULL,
  tb_jogo_plataforma_id_jogo_plataforma INT NOT NULL,
  tb_jogo_plataforma_id_plataforma INT NOT NULL,
  FOREIGN KEY (tb_jogo_plataforma_id_jogo_plataforma , tb_jogo_plataforma_id_plataforma) REFERENCES tb_jogo_plataforma (id_jogo_plataforma , id_plataforma)
)

-- SHOW TABLES;
-- DESC tbl_jogo;