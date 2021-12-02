sqlcreatedb = {
    'createDatabase':'CREATE DATABASE minghos'
}

sqlcreatetables = {
    'createTableSystem':'CREATE TABLE "m5s_system" (id bigint NOT NULL, name character varying(100) COLLATE pg_catalog."default", dateinstall date)',
    #'createTableSystem':'CREATE TABLE "m5s_system" (id bigint NOT NULL DEFAULT nextval(\'5d_instrument_id_seq\'::regclass),name character varying(100) COLLATE pg_catalog."default",dateinstall date)',
    'createTableInstrument':'CREATE TABLE "m5d_instrument" (id bigint NOT NULL, name character varying(100) COLLATE pg_catalog."default",status character varying(100) COLLATE pg_catalog."default")',
    #'createTableInstrument':'CREATE TABLE "m5d_instrument" (id bigint NOT NULL DEFAULT nextval(\'5d_instrument_id_seq\'::regclass),name character varying(100) COLLATE pg_catalog."default",status character varying(100) COLLATE pg_catalog."default")',
    'createTableParser':'CREATE TABLE "m5d_parser" (id bigint NOT NULL,name character varying(100) COLLATE pg_catalog."default",status character varying(100) COLLATE pg_catalog."default",code character varying(250) COLLATE pg_catalog."default")',
    #'createTableParser':'CREATE TABLE "m5d_parser" (id bigint NOT NULL DEFAULT nextval(\'5d_instrument_id_seq\'::regclass),name character varying(100) COLLATE pg_catalog."default",status character varying(100) COLLATE pg_catalog."default",    code character varying(250) COLLATE pg_catalog."default")',
    'createTableAgenda':'CREATE TABLE "m5d_agenda" (id bigint NOT NULL,name character varying(100) COLLATE pg_catalog."default",status character varying(100) COLLATE pg_catalog."default",startdate date)'
    #'createTableAgenda':'CREATE TABLE "m5d_agenda" (id bigint NOT NULL DEFAULT nextval(\'5d_instrument_id_seq\'::regclass),name character varying(100) COLLATE pg_catalog."default",status character varying(100) COLLATE pg_catalog."default",startdate date)'
}
