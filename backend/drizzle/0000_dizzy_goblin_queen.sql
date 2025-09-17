CREATE TABLE "acessorio" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "acessorio_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nome" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "veiculo" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "veiculo_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"modelo" varchar(100) NOT NULL,
	"anoFabricacao" integer NOT NULL,
	"placa" varchar(6) NOT NULL,
	CONSTRAINT "veiculo_placa_unique" UNIQUE("placa")
);
--> statement-breakpoint
CREATE TABLE "veiculo_acessorio" (
	"veiculoId" integer NOT NULL,
	"acessorioId" integer NOT NULL,
	CONSTRAINT "veiculo_acessorio_veiculoId_acessorioId_pk" PRIMARY KEY("veiculoId","acessorioId")
);
--> statement-breakpoint
ALTER TABLE "veiculo_acessorio" ADD CONSTRAINT "veiculo_acessorio_veiculoId_veiculo_id_fk" FOREIGN KEY ("veiculoId") REFERENCES "public"."veiculo"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "veiculo_acessorio" ADD CONSTRAINT "veiculo_acessorio_acessorioId_acessorio_id_fk" FOREIGN KEY ("acessorioId") REFERENCES "public"."acessorio"("id") ON DELETE cascade ON UPDATE no action;