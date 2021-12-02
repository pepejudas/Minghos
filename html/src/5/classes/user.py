class User:
    version='0.0.1'
    author='Ferley Ardila'
    company='Xsite'
    
    def __init__(self, user, rol):
        self.user=user
        self.rol=rol
        
    def getUser(self):    
        return self.user

    def getRol():
        return self.rol

    def getVersion():
        return self.version
