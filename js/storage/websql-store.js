// var songs must be defined already here ...

var WebSqlStore = function(successCallback, errorCallback) {

    this.initializeDatabase = function(successCallback, errorCallback) {
        var self = this;
        this.db = window.openDatabase("songDB", "1.0", "song Demo DB", 200000);
        this.db.transaction(
                function(tx) {
                    self.createTable(tx);
                    self.addSampleData(tx);
                },
                function(error) {
                    console.log('Transaction error: ' + error);
                    if (errorCallback) errorCallback();
                },
                function() {
                    console.log('Transaction success');
                    if (successCallback) successCallback();
                }
        )
    }

    this.createTable = function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS song');
        var sql = "CREATE TABLE IF NOT EXISTS song ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "author VARCHAR(50), " +
            "album VARCHAR(50), " +
            "title VARCHAR(50), " +
            "lyrics VARCHAR(1000))";
        tx.executeSql(sql, null,
                function() {
                    console.log('Create table success');
                },
                function(tx, error) {
                    alert('Create table error: ' + error.message);
                });
    }

    this.addSampleData = function(tx) {

        var l = songs.length;
        var sql = "INSERT OR REPLACE INTO song " +
            "(id, author, album, title, lyrics) " +
            "VALUES (?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = songs[i];
            tx.executeSql(sql, [e.id, e.author, e.album, e.title, e.lyrics],
                    function() {
                        console.log('INSERT success');
                    },
                    function(tx, error) {
                        alert('INSERT error: ' + error.message);
                    });
        }
    }

    this.findByTitle = function(searchKey, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.author, e.album, e.title, e.lyrics " +
                    "FROM song e " +
                    "WHERE e.title LIKE ? " +
                    "OR e.author LIKE ? " +
                    "ORDER BY e.author, e.title";

                tx.executeSql(sql, ['%' + searchKey + '%', '%' + searchKey + '%'], function(tx, results) {
                    var len = results.rows.length,
                        songs = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        songs[i] = results.rows.item(i);
                    }
                    callback(songs);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    }

    this.findById = function(id, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.author, e.album, e.title, e.lyrics " +
                    "FROM song e " +
                    "WHERE e.id=:id";

                tx.executeSql(sql, [id], function(tx, results) {
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    };

    this.initializeDatabase(successCallback, errorCallback);

}
