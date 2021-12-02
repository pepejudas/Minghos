import os
import sqlite3
import sys
import psycopg2

from classes.system import System
from classes.user import User
from classes.database import Database
from scripts.translations import transl_es, transl_en, transl_fr, transl_pr
from classes.instrument import Instrument
from scripts.sentences import sqlcreatedb, sqlcreatetables
from properties.postgres import param

# thanks for the console art to http://patorjk.com/
# inicio de la aplicacion 
print("""
                                                                      :             
                           L.                                        t#,           .
                       t   EW:        ,ft         .Gt .    .        ;##W.         ;W
            ..       : Ej  E##;       t#E        j#W: Di   Dt      :#L:WE        f#E
           ,W,     .Et E#, E###t      t#E      ;K#f   E#i  E#i    .KG  ,#D     .E#f 
          t##,    ,W#t E#t E#fE#f     t#E    .G#D.    E#t  E#t    EE    ;#f   iWW;  
         L###,   j###t E#t E#t D#G    t#E   j#K;      E#t  E#t   f#.     t#i L##Lffi
       .E#j##,  G#fE#t E#t E#t  f#E.  t#E ,K#f   ,GD; E########f.:#G     GK tLLG##L 
      ;WW; ##,:K#i E#t E#t E#t   t#K: t#E  j#Wi   E#t E#j..K#j... ;#L   LW.   ,W#i  
     j#E.  ##f#W,  E#t E#t E#t    ;#W,t#E   .G#D: E#t E#t  E#t     t#f f#:   j#E.   
   .D#L    ###K:   E#t E#t E#t     :K#D#E     ,K#fK#t E#t  E#t      f#D#;  .D#j     
  :K#t     ##D.    E#t E#t E#t      .E##E       j###t f#t  f#t       G#t  ,WK,      
  ...      #G      ..  E#t ..         G#E        .G#t  ii   ii        t   EG.       
           j           ,;.             fE          ;;                     ,         
                                        ,                                           

""")

#instanciar clase system para ver la version y demas datos de la aplicacion

system = System()

print(system.getSystem());

def verifyDb():
    
    try:
        #print(param)
        db = Database(param['host'], param['dbname'], param['user'], param['password'])
        
        try:

            cur = db.query("SELECT * FROM public.system")

            for row in cur:
                print(row)

        except Exception as ex:
            # the tables does not exist need to be created
            try:
                db = Database(param['host'], param['dbname'], param['user'], param['password'])
                #ejecutar todas las sentencias contenidas en el script
                for key in sqlcreatetables:
                    db.query(sqlcreatetables[key], False)
                    print(sqlcreatetables[key])
                    print(db.getStatusMes())
                    
                db.close()
            
            except Exception as er:
                print('Error creating tables: line 65 '+str(er))
            
    except Exception as e:
        print('Error connecting database: line 49 ' + str(e))

        
verifyDb()

print("""

Please select languaje (Using the number):
    1. [es] Spanish default
    2. [en] English 
    3. [fr] French
    4. [pr] Portuguese

""")

traduccion = {};

try:

    try:
            
        userInput = input()

        if userInput == "1":
            traduccion = transl_es
        elif userInput=="2":
            traduccion = transl_en
        elif userInput=="3":
            traduccion = transl_fr
        elif userInput=="4":
            traduccion = transl_pr
        else:
            traduccion = transl_es
        
        print(traduccion["mensaje"])
            
    except ValueError:
        print("Not an integer! Try again.")

    while True:
        print(traduccion["menu"])

        userInput = int(input())

        #agregar instrumento
        if userInput == 1:
            print(traduccion["ingreseNombre"])
            instName = input()
            print(traduccion["ingreseIdInst"])
            instId = input()
           
            instrumento = Instrument(instId, instName)

            con = psycopg2.connect(dsn)
            cursorOb = con.cursor()
        
            print(instrumento.getName())
            print(instrumento.getID())
        #crear parser y algoritmo de instrumento    
        if userInput == 2:
            print(traduccion["ingreseNombreAlg"])
            instName = input()
            instrumento = Instrument(instName)
            print(instrumento.getName())            
        #crear agenda de instrumento
        if userInput == 3:
            print(traduccion["ingreseIdInst"])
            instName = input()
            instrumento = Instrument(instName)
            print(instrumento.getName())
        #mantenimiento de instrumento
        if userInput == 4:
            print(traduccion["ingreseNombre"])
            instName = input()
            instrumento = Instrument(instName)
            print(instrumento.getName())
        if userInput== 5:
            sys.exit()
            
except ValueError:
    userInput = 2

print(system.getSystem())
