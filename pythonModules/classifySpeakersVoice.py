from pyAudioAnalysis import audioTrainTest as aT
import sys
import os

argvs = []
argvs.append(sys.argv[1])	#	DiviceId (Phone)
argvs.append(sys.argv[2])	#	speaker's Name (ex. 0, 1, 2)
argvs.append(sys.argv[3])	#	array of spaker's data for training

voiceFileDir = '../voiceData'
tempFileDir = '../test/upload'

if not os.path.exists(os.path.join(voiceFileDir, argvs[0])):
	os.mkdir(os.path.join(voiceFileDir, argvs[0]))
if not os.path.exists(os.path.join(os.path.join(voiceFileDir, argvs[0]), argvs[1])):
	os.mkdir(os.path.join(os.path.join(voiceFileDir, argvs[0]), argvs[1]))

for i in range(0,3,1): #1인당 3개의 학습용 음성파일
	shutil.copy(os.path.join(os.path.join(voiceFileDir, argvs[0]), argvs[2][i]), os.path.join(os.path.join(voiceFileDir, argvs[0]), argvs[1]))
