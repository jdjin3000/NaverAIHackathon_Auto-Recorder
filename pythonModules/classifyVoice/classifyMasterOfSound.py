from pyAudioAnalysis import audioTrainTest as aT
import sys
import os

argvs = []
argvs.append(sys.argv[1])	#	DiviceId (Phone)
argvs.append(sys.argv[2])	#	File's name

interviewFileDir = './FullInterviewData'
voiceFileDir = './voiceData'

final_loc = os.path.join(os.path.join(os.path.join(interviewFileDir, argvs[0]),'seperated'), argvs[1])#각 폴더 내부에 sperated 폴더를 만들어 분할파일을 저장할 것이다.
trained_data_loc = os.path.join(os.path.join(voiceFileDir, argvs[0]), "svmSMtemp")


class_id, probability, classes = aT.file_classification(final_loc, trained_data_loc, "svm")

if not os.path.join(os.path.join(interviewFileDir, argvs[0]), 'class_log.txt'):
	text = open(os.path.join(os.path.join(interviewFileDir, argvs[0]), 'class_log.txt'), 'w')
else
	text = open(os.path.join(os.path.join(interviewFileDir, argvs[0]), 'class_log.txt'), 'a')

text.write(argvs[1]+' '+str(class_id))
text.close()
