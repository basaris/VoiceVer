import soundfile as sf



def process_audio_from_uri(uri):
    # Make a GET request to the URI to retrieve the audio file
    audio, sample_rate = sf.read(uri)
    
    # Return the processed audio data or any desired output
    return("Audio opened:",len(audio),sample_rate)