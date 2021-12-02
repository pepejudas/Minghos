#import curses
#from curses.textpad import Textbox, rectangle
#
#def main(stdscr, w, h, x, y):
#    stdscr.addstr(0, 0, "Enter IM message: (hit Ctrl-G to send)")

#    editwin = curses.newwin(w,h, x+1,y+1)
#    rectangle(stdscr, x, y, w+2, h+2)
#    stdscr.refresh()

#    box = Textbox(editwin)

    # Let the user edit until Ctrl-G is struck.
#    box.edit()

    # Get resulting contents
#    message = box.gather()


#stdscr = curses.initscr()
#curses.noecho()
#main(stdscr, 40, 100, 1, 2)

import pyglet
from pyglet.gl import *

class main (pyglet.window.Window):
    def __init__ (self):
        super(main, self).__init__(800, 600, fullscreen = False)
        self.button_texture = pyglet.image.load('cof.png')
        self.button = pyglet.sprite.Sprite(self.button_texture)

        ## --- If you'd like to play sounds:
        #self.sound = pyglet.media.load('music.mp3')
        #self.sound.play()

        self.alive = 1

    def on_draw(self):
        self.render()

    def on_close(self):
        self.alive = 0

    def on_mouse_press(self, x, y, button, modifiers):
        if x > self.button.x and x < (self.button.x + self.button_texture.width):
            if y > self.button.y and y < (self.button.y + self.button_texture.height):
                self.alive = 0

    def on_key_press(self, symbol, modifiers):
        if symbol == 65307: # [ESC]
            self.alive = 0

    def render(self):
        self.clear()
        self.button.draw()
        self.flip()

    def run(self):
        while self.alive == 1:
            self.render()

            # -----------> This is key <----------
            # This is what replaces pyglet.app.run()
            # but is required for the GUI to not freeze
            #
            event = self.dispatch_events()

x = main()
x.run()
