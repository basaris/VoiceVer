import _pickle as cPickle
import numpy as np
import warnings
warnings.filterwarnings("ignore")
from sklearn.mixture import GaussianMixture as GMM
from FeatureExtraction import extract_features
from os.path import dirname,join,abspath
import os
import soundfile as sf


def TrainModel(uri):      
    home = os.environ['HOME']

    audio, sr = sf.read(uri)
    audios = []

    count = 0
    for i in range(0, int(len(audio)/(5 * sr))):
        y = audio[5 * sr * i: 5 * sr *(i+1)]
        audios.append([y,sr])
        count+=1

    count = 1
    features = np.asarray(())
    for filename in audios:
        vector   = extract_features(filename[0],filename[1])
    
        if features.size == 0:
            features = vector
        else:
            features = np.vstack((features, vector))
        # when features of 24 files of speaker are concatenated, then do model training
        if count == 23:    
            gmm = GMM(n_components = 23, covariance_type='diag',n_init = 3)
            gmm.fit(features)
            # dumping the trained gaussian model
            picklefile = "user-0.gmm"
            cPickle.dump(gmm,open(join(os.environ["HOME"], picklefile),'wb'))
            print ('+ modeling completed for speaker:',picklefile," with data point = ",features.shape)   
            features = np.asarray(())
            count = 0
                
        count += 1
    
    return "model trained"