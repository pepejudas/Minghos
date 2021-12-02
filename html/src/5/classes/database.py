import psycopg2

class Database:
    
    version='0.0.1'
    company='Xsite Company'
    provider='postgres'
    lastError = ''
    con = None
    statusmessage = ''
    
    def __init__(self, host, dbname, user, password):
        dsn = "user='"+user+"' password='"+password+"' host='"+host+"' dbname='"+dbname+"'"
        self.con = psycopg2.connect(dsn)
        
    def query(self, querystring, returnrows):
        try:
            varetorna = None 
            cursor = self.con.cursor()
            cursor.execute(querystring)
            self.statusmessage = cursor.statusmessage()

            if returnrows:
                varetorna = cursor.fetchall()
                
            self.con.commit()
            
        except Exception as e:
            self.lastError = e
            print(e)
            
        finally:
            cursor.close()
            if returnrows:
                return varetorna

    def getStatusMes(self):
        return self.statusmessage

    def close(self):
        self.con.close()

    def getLastError(self):
        return self.lastError
