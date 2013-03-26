var ViewSong = function(song) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
    };

    this.render = function() {
        this.el.html(ViewSong.template(song));
        return this;
    };

    this.initialize();


}

ViewSong.template = Handlebars.compile($("#song-tpl").html());
