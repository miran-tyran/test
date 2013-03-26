var ViewHome = function(store) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByTitle);
    };

    this.render = function() {
        this.el.html(ViewHome.template());
        store.findByTitle("", function(songs) {
            $('.song-list').html(ViewHome.liTemplate(songs));
        });

        return this;
    };

    this.findByTitle = function() {
        console.log("Pressed " + $('.search-key').val())
        store.findByTitle($('.search-key').val(), function(songs) {
            $('.song-list').html(ViewHome.liTemplate(songs));
        });
    };

    this.initialize();


}

ViewHome.template = Handlebars.compile($("#home-tpl").html());
ViewHome.liTemplate = Handlebars.compile($("#song-li-tpl").html());