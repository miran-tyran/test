#!/usr/bin/groovy

File output = new File("../js/storage/songs.js")
output.delete();
int i = 0;

output << "var songs = [";


new File("songs").eachFile({ file->
    println "processing: " +file.getName()
    int line = 0;
    file.eachLine({
        if (line == 0) {
            def split = it.split("\\/")

            output << "\n { id: " + (i++)
            output << ", author: '" + split[1]
            output << "', album: '" + (split.length > 2? split[2] : "")
            output << "', title: '" + split[0]
            output << "', lyrics: '"
        } else {
            output << it.replaceAll("'", "\\\\'").replaceAll("\\[", "<sup>").replaceAll("\\]", "<\\/sup>") + "<br/>"
        }
        line++;
    });
    output << "'},"

//            "lyrics": "[Ami]Říkali [Dmi]že [Ami]už tě [Ami7]neuvidím<br>"+
//                "[Ami]A chtěli slyšet [Dmi]jména"},


            file.getName()
})

output << "\n];"

