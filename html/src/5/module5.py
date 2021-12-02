import os
import sqlite3
import sys
import psycopg2
import curses

from getpass import getpass
from classes.system import System
from classes.user import User
from classes.database import Database
from scripts.translations import transl_es, transl_en, transl_fr, transl_pr
from classes.instrument import Instrument
from scripts.sentences import sqlcreatedb, sqlcreatetables
from properties.postgres import param
from curses.textpad import Textbox, rectangle
from scripts.functions import c

# thanks for the console art to http://patorjk.com/
# inicio de la aplicacion 
print("""
88b           d88  88                            88                                   
888b         d888  ""                            88                                   
88`8b       d8'88                                88                                   
88 `8b     d8' 88  88  8b,dPPYba,    ,adPPYb,d8  88,dPPYba,    ,adPPYba,   ,adPPYba,  
88  `8b   d8'  88  88  88P'   `"8a  a8"    `Y88  88P'    "8a  a8"     "8a  I8[    ""  
88   `8b d8'   88  88  88       88  8b       88  88       88  8b       d8   `"Y8ba,   
88    `888'    88  88  88       88  "8a,   ,d88  88       88  "8a,   ,a8"  aa    ]8I  
88     `8'     88  88  88       88   `"YbbdP"Y8  88       88   `"YbbdP"'   `"YbbdP"'  
                                     aa,    ,88                                       
                                      "Y8bbdP"                                        
""")

#instanciar clase system para ver la version y demas datos de la aplicacion

system = System()

print(system.getSystem());

def verifyDb():
    
    try:

        print('User:')
        user = input()
        password = getpass()
        
        db = Database(param['host'], param['dbname'], user, password)
        
        try:

            cur = db.query("SELECT * FROM public.s_system", True)

            for row in cur:
                c(row)

        except Exception as ex:
            # the tables does not exist need to be created
            c(ex)
            
            try:
                db = Database(param['host'], param['dbname'], param['user'], param['password'])

                c(param)
                #ejecutar todas las sentencias contenidas en el script
                for key in sqlcreatetables:
                    db.query(sqlcreatetables[key], False)
                    #print(sqlcreatetables[key])
                    #print(db.getStatusMes())
                    
                db.close()
            
            except Exception as er:
                c('Error creating tables: line 65 '+str(er))
            
    except Exception as e:
        #print('Error connecting database: line 49 ' + str(e))
        exit('Error connecting database: line 49 ' + str(e))
        
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
        c("Not an integer! Try again.")

    while True:
        c(traduccion["menu"])

        userInput = int(input())

        #agregar/ver instrumentos instrumento
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
            #modificar para agregar otra opcion
        if userInput == 2:
            c(traduccion["ingreseNombreAlg"])
            instName = input()
            instrumento = Instrument(instName)
            c(instrumento.getName())
            #crear parser y algoritmo de instrumento
        if userInput == 3:
            c(traduccion["parser"])

            def main(stdscr):
                
                stdscr.addstr(0, 0, "Enter IM message: (hit Ctrl-G to send)")
                
                editwin = curses.newwin(5,30, 2,1)
                rectangle(stdscr, 1,0, 1+5+1, 1+30+1)
                stdscr.refresh()
            
                box = Textbox(editwin)
            
                # Let the user edit until Ctrl-G is struck.
                box.edit()

                # Get resulting contents
                message = box.gather()

            stdscr = curses.initscr()
            
            while True:
                c = stdscr.getch()
                if c == ord('p'):
                    PrintDocument()
                elif c == ord('q'):
                    break  # Exit the while loop
                elif c == curses.KEY_HOME:
                    x = y = 0
                        
            curses.noecho()
            main(stdscr)
    
        if userInput == 4:
            c(traduccion["ingreseNombre"])
            instName = input()
            instrumento = Instrument(instName)
            c(instrumento.getName())
            #mantenimiento de instrumento
        if userInput == 5:
            c(traduccion["ingreseNombre"])
            instName = input()
            instrumento = Instrument(instName)
            c(instrumento.getName())
        
        if userInput== 6:
            sys.exit()
            
except ValueError:
    userInput = 2

c(system.getSystem())
