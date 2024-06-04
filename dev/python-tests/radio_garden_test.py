import requests
from pydub import AudioSegment
from pydub.playback import play
import io

# URL of the livestream
url = "https://radio.garden/api/ara/content/listen/x3ZzxD51/channel.mp3?r=1&1716656756589"

def livestream_to_mp3(url):
    # Open a streaming connection
    response = requests.get(url, stream=True)
    response.raise_for_status()  # Ensure we notice bad responses
    
    # Create an empty audio segment to store the livestream
    audio = AudioSegment.empty()

    while True:
        try:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:  # Filter out keep-alive new chunks
                    # Use BytesIO to read the chunk as a file-like object
                    chunk_audio = AudioSegment.from_file(io.BytesIO(chunk), format="mp3")
                    audio += chunk_audio
                    play(chunk_audio)  # Play the audio chunk (optional)
        except KeyboardInterrupt:
            quit()
        except:
            pass

    """finally:
        # Save the entire audio segment to an mp3 file
        output_file = "livestream_output.mp3"
        audio.export(output_file, format="mp3")
        print(f"Livestream saved to {output_file}")"""

if __name__ == "__main__":
    livestream_to_mp3(url)
