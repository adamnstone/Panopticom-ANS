import { Howl } from 'howler';
import { radioGardenData } from './Three';

// store the current sound being played and URL path to the audio
let currentSound, prevURL;

/* counter to ensure that async promises only resolve and 
    play the loaded audio if another call has not been made */
let mostRecentMusicID = 0;

// sort two arrays based on the first array, by default in ascending order
function sortArrays(arrays, comparator = (a, b) => (a < b) ? -1 : (a > b) ? 1 : 0) {
    // get the first array which sorting is baed on
    let sortableArray = arrays[0];

    // get an array of the indexes of the sortable array
    let indexes = Object.keys(sortableArray);

    // sort the sortable array's indexes by the sortable array's values
    let sortedIndexes = indexes.sort((a, b) => comparator(sortableArray[a], sortableArray[b]));

    // reorders each array argument based on the sorted indexes
    return Object.keys(arrays).map(arrayIndex => // for each passed array...
        sortedIndexes.map(sortedIndex => // for each sorted index...
            arrays[arrayIndex][sortedIndex] // map the sorted index to the value at that index
        )
    );
}

// calculates distance between two latitude and longitude coordinate pairs on the globe
function getDistance(lat1, lon1, lat2, lon2) {
    // convert all coordinates to radians
    const toRadians = degrees => degrees * (Math.PI / 180);
    const lat1Rad = toRadians(lat1),
        lon1Rad = toRadians(lon1),
        lat2Rad = toRadians(lat2),
        lon2Rad = toRadians(lon2);

    // use "Great Circle Distance Formula" to calculate the distance between the coordinates
    const distance = Math.acos(
        (Math.sin(lat1Rad) * Math.sin(lat2Rad)) +
        (Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(lon2Rad - lon1Rad))
    ) * 6371; // radius of the earth in kilometers, for relative calculations not important

    return distance;
}

// load the audio clip
const loadAudio = (_url, successCallback, errorCallback) => {
    try {
        // the default is to play the panopticom audio, signaled by _url = -1
        let url;
        if (_url == -1) {
            if (prevURL == _url) return; // if we are currently playing the panopticom song, do not make any changes
            url = "../../panopticom.mp3"
        } else {
            url = _url;
        }

        // update the current song being played
        prevURL = _url;

        // load the audio
        const sound = new Howl({
            src: [url],
            ext: ['mp3'],
            onload: () => {successCallback(sound)},
            onloaderror: errorCallback,
            html5: _url != -1
        });

        // if there is no error, return true
        return true;
    } catch {
        // if there's an error, return false
        return false;
    }
};

// change the sound currently being played
const swapOutSound = (newSound, currentMusicID, changedCallback) => {
    /* prevent errors due to async livestream promises being resolved before an earlier promise:
        only run the new sound if this music station corresponds to the most recent position 
        scrolled to on the globe */ 
    if (currentMusicID != mostRecentMusicID) return;

    // if there is currently a sound playing, pause it
    if (currentSound) { currentSound.pause(); } 

    // update the current sound playing
    currentSound = newSound;

    // play the new sound
    currentSound.play();

    // run the callback after the sound has been changed
    changedCallback();
}

// play a song based on the scroll position on the globe
const playMusic = (pov, musicChangeCallback) => {
    // update the counter to track that a new song change request has started
    mostRecentMusicID++; 
    
    // store the current value of the counter
    const currentMusicID = mostRecentMusicID;

    // if the default song should be played
    if (pov == -1) {
        // load the default song, then play the default song, then trigger the callback
        loadAudio(-1, sound => {
            swapOutSound(sound, mostRecentMusicID, () => {
                musicChangeCallback(-1);
            })
        }, () => { 
            // log an error if the default song failed to load
            console.log("Panopticom audio failed to load...")
        });
        return;
    }
    
    // deconstruct the pov object to get the coordinates scrolled to on the globe
    const {lat, lng} = pov;

    // stores all of the radio stations and their correspondings distances from the scroll position
    let distances = [];
    let items = [];

    // for each radio station...
    radioGardenData.forEach(item => {
        // store the distance between the current coordinates and that station's coordinates
        distances.push(getDistance(lat, lng, item.geo[0], item.geo[1])); 
        items.push(item);
    });

    // sort the arrays to get the radio stations in order of proximity
    [distances, items] = sortArrays([distances, items])

    // recursively try the next closest radio station until a channel's audio is able to be livestreamed from that station
    const stationRecursion = i => {
        // store all of the radio station's channel data
        const channelsData = items[i].channels_data;
        
        // if the channel data is undefined or there are no channels...
        if (!channelsData || (!channelsData.channels) || channelsData.channels.length == 0) {
            // log an error, try the next closest station
            console.log("No channels data... skipping...");
            stationRecursion(i + 1);
            return;
        }
        
        // store the array of channels of the closest station
        const lowestItemChannels = channelsData.channels;
        
        // recursively try each channel of the radio station until one audio is able to be livestreamed
        const audioRecursion = j => {
            // if this isn't the first try, log an error
            if (j > 0) {
                console.log("Channel not functioning, checking next channel.")
            }

            // if we have run out of channels, log an error and try the next station
            if (j >= lowestItemChannels.length) {
                console.log("ERROR: No channel functioning on this station, moving to next closest station.");
                stationRecursion(i + 1);
            } else {
                /* try loading the audio; if it fails, try the next channel and log an error; otherwise, 
                    play the new sound and trigger the callback */
                if (!(
                    loadAudio(lowestItemChannels[j].mp3_url, sound => {
                        console.log("Audio Loaded Successfully")
                        swapOutSound(sound, currentMusicID, () => {
                            musicChangeCallback({
                                station: items[i],
                                channelData: lowestItemChannels[j]
                            })
                        });
                    }, () => audioRecursion(j + 1))
                )) {
                    console.log("Error playing audio.")
                }
            }
        };
        
        // try the first channel
        audioRecursion(0);
    };

    // try the first station
    stationRecursion(0);
};

export default playMusic