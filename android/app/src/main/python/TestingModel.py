import _pickle as cPickle
import numpy as np
from scipy.io.wavfile import read
import warnings
warnings.filterwarnings ("ignore")
import soundfile as sf
from sklearn import preprocessing
import python_speech_features as mfcc
from os.path import dirname,join
import os

from FeatureExtraction import extract_features



def TestModel(uri):

    models_directory = join(dirname(__file__), 'models')

    gmm_files = [join(models_directory,fname) for fname in 
              os.listdir(models_directory) if fname.endswith('.gmm')]
    
    models    = [cPickle.load(open(fname,'rb')) for fname in gmm_files]
    speakers   = [fname.split("/")[-1].split(".gmm")[0] for fname
                  in gmm_files]

    models.append(cPickle.load(open(join(os.environ["HOME"], "user-0.gmm"),'rb')))
    speakers.append("user-0")
    

    print (("Testing Audio : "+uri))

    audio, sr = sf.read(uri)
    vector   = extract_features(audio,sr)
        
    log_likelihood = np.zeros(len(models)) 
        
    for i in range(len(models)):
        gmm    = models[i]  #checking with each model one by one
        scores = np.array(gmm.score(vector))
        log_likelihood[i] = scores.sum()

    winner = speakers[np.argmax(log_likelihood)].split('-')[0]
    print(winner)

    if(winner=='user'):
        return {"verification":"verified"}
    else:
        return {"verification":"not-verified"}

