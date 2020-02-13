from pyAudioAnalysis import audioTrainTest as aT
import sys
import os

argvs = []
argvs.append(sys.argv[1])	#	DiviceId (Phone)
argvs.append(sys.argv[2])	#	speaker's Name (ex. 0, 1, 2)
argvs.append(sys.argv[3])	#	array of spaker's data for training

voiceFileDir = '../voiceData'

listOfSpeakerDirectory = []

for i in range(0, argvs[2][-1]+1, 1): #argvs[2][-1] 이 n이면 n + 1명이 있는 것이므로
	listOfSpeakerDirectory.append(os.path.join(os.path.join(voiceFileDir, argvs[0]),str(i)))

aT.extract_features_and_train(listOfSpeakerDirectory, 1.0, 1.0, aT.shortTermWindow, aT.shortTermStep, "svm", os.path.join(os.path.join(voiceFileDir, argvs[0]), "svmSMtemp"), False)