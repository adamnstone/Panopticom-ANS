import {Howl, Howler} from 'howler';
import { radioGardenData } from './Three';

let currentSound;

function sortArrays(arrays, comparator = (a, b) => (a < b) ? -1 : (a > b) ? 1 : 0) {
    let arrayKeys = Object.keys(arrays);
    let sortableArray = Object.values(arrays)[0];
    let indexes = Object.keys(sortableArray);
    let sortedIndexes = indexes.sort((a, b) => comparator(sortableArray[a], sortableArray[b]));
  
    let sortByIndexes = (array, sortedIndexes) => sortedIndexes.map(sortedIndex => array[sortedIndex]);
  
    if (Array.isArray(arrays)) {
      return arrayKeys.map(arrayIndex => sortByIndexes(arrays[arrayIndex], sortedIndexes));
    } else {
      let sortedArrays = {};
      arrayKeys.forEach((arrayKey) => {
        sortedArrays[arrayKey] = sortByIndexes(arrays[arrayKey], sortedIndexes);
      });
      return sortedArrays;
    }
  }

function getDistance(lat1, lon1, lat2, lon2) {
    // Convert degrees to radians
    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    // Convert latitude and longitude from degrees to radians
    var lat1Rad = toRadians(lat1);
    var lon1Rad = toRadians(lon1);
    var lat2Rad = toRadians(lat2);
    var lon2Rad = toRadians(lon2);

    // Haversine formula
    var distance = Math.acos(
        (Math.sin(lat1Rad) * Math.sin(lat2Rad)) +
        (Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(lon2Rad - lon1Rad))
    ) * 6371; // Radius of the Earth in kilometers

    return distance;
}

let prevURL;
const playAudio = (_url, successCallback, errorCallback) => {
    try {
        let url;
        if (_url == -1) {
            if (prevURL == _url) return;
            url = "../../panopticom.mp3"
        } else {
            url = _url;
        }
        prevURL = _url;
        var sound = new Howl({
            src: [url],
            ext: ['mp3'],
            onload: () => {successCallback(sound)},
            onloaderror: errorCallback,
            html5: _url != -1
        });
        return true;
    } catch {
        return false;
    }
};

let mostRecentMusicID = 0;
const swapOutSound = (newSound, currentMusicID, changedCallback) => {
    //console.log(currentMusicID, "just finished but most recent is", mostRecentMusicID, "so", currentMusicID == mostRecentMusicID ? "will" : "won't", "play")
    if (currentMusicID != mostRecentMusicID) return;
    if (currentSound) {
        console.log("pausing", currentSound)
        currentSound.pause();
    }
    currentSound = newSound;
    currentSound.play();
    changedCallback();
    console.log("playing", currentSound)
}

const playMusic = (pov, musicChangeCallback) => {
    mostRecentMusicID++; 
    const currentMusicID = mostRecentMusicID;
    if (pov == -1) {
        playAudio(-1, sound => {
            swapOutSound(sound, mostRecentMusicID, () => {
                musicChangeCallback(-1);
            })
        }, () => { 
            console.log("Panopticom audio failed to load...")
        });
        return;
    }
    const {lat, lng} = pov;
    let distances = [];
    let items = [];
    radioGardenData.forEach(item => {
        distances.push(getDistance(lat, lng, item.geo[0], item.geo[1])); // TODO implement matrix operations in parallel to speed this step up
        items.push(item);
    });
    [distances, items] = sortArrays([distances, items])
    const stationRecursion = i => {
        const channelsData = items[i].channels_data;
        if (!channelsData || (!channelsData.channels) || channelsData.channels.length == 0) {
            console.log("No channels data... skipping...");
            stationRecursion(i + 1);
            return;
        }
        const lowestItemChannels = channelsData.channels;
        const audioRecursion = j => {
            if (j > 0) {
                console.log("Channel not functioning, checking next channel.")
            }
            if (j >= lowestItemChannels.length) {
                console.log("ERROR: No channel functioning on this station, moving to next closest station.");
                stationRecursion(i + 1);
            } else {
                if (!(
                    playAudio(lowestItemChannels[j].mp3_url, sound => {
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
        audioRecursion(0);
    };
    stationRecursion(0);
};

export default playMusic