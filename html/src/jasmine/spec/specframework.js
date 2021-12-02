describe("Testing", function() {
    
    it("carga de variable dL espanol por defecto", function() {
	expect(dL).toBe('es');
    });

    it("version del framework de prueba", function() {
	expect(f.version).toBe('0.0.1');
    });

    it("debug mode del framework", function() {
    expect(f.debugMode).toBe(true);
    });

    it("ejecucion de funcion descripcion de genJSDoc", function() {
	expect(lang_err_en.a).toBe('Your browser does not support the HTML5 canvas tag.');
    });

    it("funcion de traducciones", function() {
	expect(f.rTran('{{celular}}')).toBe('Celular');
    });

    /*
    it("funcion load script dinamically", function() {
	return f.iMSL('js/agenda.js').then(function (result) {
	    expect(result).toBe(true);
	});
    });
    */

/*
  var player;
  var song;

  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  it("should be able to play a Song", function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
  });

  describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
  */
});
