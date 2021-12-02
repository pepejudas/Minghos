class Instrument:
    version='0.0.1'
    company='Xsite'
    
    def __init__(self, idinstrument, name):
        self.name=name
        self.idinstrument=idinstrument
        
    def getName(self):    
        return self.name

    def getID(self):
        return self.idinstrument
