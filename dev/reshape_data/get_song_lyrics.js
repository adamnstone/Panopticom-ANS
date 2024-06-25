import { getLyrics, getSong } from 'genius-lyrics-api';
import fs from 'fs';

const options = {
	apiKey: 'dIIBwTe3GNu_KSN1BkjCnXN4Yvs9uiYWF8T_QfWpMK7PGBKDF7ny97HiySiUKKQm',
	title: 'I Had Some Help',
	artist: 'Post Malone Featuring Morgan Wallen',
	optimizeQuery: true
};

getLyrics(options).then((lyrics) => {

    fs.writeFile('./lyrics_test.txt', lyrics, err => {
    if (err) {
        console.error(err);
    } else {
        // file written successfully
    }
    });

    });


//getSong(options).then((song) =>
//	console.log(`${song.id} - ${song.title} - ${song.url} - ${song.albumArt} - ${song.lyrics}`)
//);