#function to print on console all things in console using the parameter of debugmode if actived
from properties.system import param

def c(t):
    if param['debug_mode']:
        print(t)
    
