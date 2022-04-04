
import base64
import json
import sys
import wave
from flask import Flask, jsonify, request
from flask_cors import CORS
import parselmouth

import numpy as np
import matplotlib.pyplot as plt

app = Flask(__name__)
app_config = {"host": "0.0.0.0", "port": sys.argv[1]}

"""
---------------------- DEVELOPER MODE CONFIG -----------------------
"""
# Developer mode uses app.py
if "app.py" in sys.argv[0]:
  # Update app config
  app_config["debug"] = True

  # CORS settings
  cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

  # CORS headers
  app.config["CORS_HEADERS"] = "Content-Type"


"""
--------------------------- REST CALLS -----------------------------
"""
def draw_pitch(pitch):
    # Extract selected pitch contour, and
    # replace unvoiced samples by NaN to not plot
    pitch_values = pitch.selected_array['frequency']
    pitch_values[pitch_values==0] = np.nan
    plt.plot(pitch.xs(), pitch_values, 'o', markersize=5, color='w')
    plt.plot(pitch.xs(), pitch_values, 'o', markersize=2)
    plt.grid(False)
    plt.ylim(0, pitch.ceiling)
    plt.ylabel("fundamental frequency [Hz]")

# Remove and replace with your own
@app.route("/example",methods=['GET','POST'])

def example():
  print(request.json)
  data=request.get_json()
  snd = parselmouth.Sound(data['filepath'])
  pitch = snd.to_pitch()
  plt.figure()
  plt.twinx()
  x=pitch.xs()
  y=pitch.selected_array['frequency']
  dataPoints=[]
  for i in range(len(y)):
    if(y[i]!=0):
      dataPoints.append({"x":x[i],"y":y[i]})
  print(dataPoints)
  draw_pitch(pitch)
  plt.xlim([snd.xmin, snd.xmax])

  name="image1.png"
  plt.savefig(name)
  data=""
  with open("image1.png", "rb") as image_file:
    data = format(base64.b64encode(image_file.read()))
  # See /src/components/App.js for frontend call
  
  return {"dataPoints":dataPoints}

@app.route("/wavepattern",methods=['GET','POST'])

def wavepattern():

  data=request.get_json()
  snd = parselmouth.Sound(data['filepath'])
  pitch = snd.to_pitch()
  plt.figure()
  plt.twinx()

  path = data['filepath']
  raw = wave.open(path)

  signal = raw.readframes(-1)
  signal = np.frombuffer(signal, dtype ="int16")
  f_rate = raw.getframerate()
  time = np.linspace(
      0,
      len(signal) / f_rate,
      num = len(signal)
  )


  plt.ylabel("fundamental frequency [Hz]")
  plt.plot(time, signal,color="red")
  
  # plt.xlim([snd.xmin, snd.xmax])


  name="image2.png"
  plt.savefig(name)
  data=""
  with open("image2.png", "rb") as image_file:
    data = format(base64.b64encode(image_file.read()))
  # See /src/components/App.js for frontend call
  
  return jsonify({"imagename":data[2:-1]})
def differentitate_pitch(pitch,pitch2,pitch_values1,pitch_values2,s1,s2):
  # Extract selected pitch contour, and
  # replace unvoiced samples by NaN to not plot

  if s1>s2:
    pitch_values1=pitch_values1[:s2]
  if s1<s2:
    pitch_values2=pitch_values2[:s1]
  cnt = 0
  p = np.empty((pitch_values1.size))
  for i in range(0,pitch_values1.size):
    p[i]=np.nan
  for i in range(0,pitch_values1.size):
    if abs(pitch_values1[i]-pitch_values2[i])>50:
      #print(pitch_values2[i])
      p[i]=pitch_values2[i]
      cnt += 1
  # print(cnt)
  # print(p)
  #plt.plot(pitch2.xs(), pitch_values2, 'o', markersize=5, color='w',label='differences')
  #plt.plot(pitch2.xs(), pitch_values2, 'o', markersize=2)
  if s1>s2:
    plt.plot(pitch2.xs(), pitch_values2, 'o', markersize=5, color='w',label='differences')
    plt.plot(pitch2.xs(), pitch_values2, 'o', markersize=2)
    plt.plot(pitch2.xs(), p, 'o', markersize=5, color='w',label='normal')
    plt.plot(pitch2.xs(), p, 'o', markersize=2)
    #draw_pitch(pitch)
  if s1<s2:
    plt.plot(pitch.xs(), pitch_values1, 'o', markersize=5, color='w',label='differences')
    plt.plot(pitch.xs(), pitch_values1, 'o', markersize=2)
    plt.plot(pitch.xs(), p, 'o', markersize=5, color='w',label='normal')
    plt.plot(pitch.xs(), p, 'o', markersize=2)
    #draw_pitch(pitch2)
  
  plt.grid(False)
  plt.ylim(0, pitch.ceiling)
  plt.ylabel("fundamental frequency [Hz]")
@app.route("/speechpattern",methods=['GET','POST'])

def speechpattern():

  data=request.get_json()
  snd = parselmouth.Sound(data['filepath1'])
  pitch = snd.to_pitch()
  snd2 = parselmouth.Sound(data['filepath2'])
  pitch2 = snd2.to_pitch()

  pitch_values1 = pitch.selected_array['frequency']
  pitch_values1[pitch_values1==0] = np.nan
  pitch_values2 = pitch2.selected_array['frequency']
  pitch_values2[pitch_values2==0] = np.nan
  s1=pitch_values1.size
  s2=pitch_values2.size
  if s1>s2:
    draw_pitch(pitch)
  differentitate_pitch(pitch,pitch2,pitch_values1,pitch_values2,s1,s2)
  if s1<s2:
    draw_pitch(pitch2)
  plt.xlim([snd2.xmin-0.2, snd2.xmax+0.2])
  

  

  name="image3.png"
  plt.savefig(name)
  data=""
  with open("image3.png", "rb") as image_file:
    data = format(base64.b64encode(image_file.read()))
  # See /src/components/App.js for frontend call
  
  return jsonify({"imagename":data[2:-1]})


@app.route("/highlight",methods=['GET','POST'])
def highlight():

  data=request.get_json()
  snd = parselmouth.Sound(data['filepath'])
  pitch = snd.to_pitch()
  plt.figure()
  plt.twinx()
  
  pitch_values = pitch.selected_array['frequency']
  x=pitch.xs()
  y=pitch.selected_array['frequency']
  dataPoints=[]
  for i in range(len(y)):
    if(y[i]!=0):
      dataPoints.append({"x":x[i],"y":y[i]})
  
  s = pitch_values.size
  p = np.empty(s)
  for i in range(s-15):
    flag = 0
    for j in range(0,15):
      if abs(pitch_values[i]-pitch_values[i+j])>5:
        flag=1
    if flag == 0:
      for j in range(0,15):
        p[i+j]=pitch_values[i+j]
  pitch_values[pitch_values==0] = np.nan
  dataPoints2=[]
  x=pitch.xs()
  y=p
  for i in range(len(y)):
    if(y[i]!=0):
      dataPoints2.append({"x":x[i],"y":y[i]})

  p[p==0] = np.nan
  
  
  plt.plot(pitch.xs(), pitch_values, 'o', markersize=5, color='w')
  plt.plot(pitch.xs(), pitch_values, 'o', markersize=2)
  plt.plot(pitch.xs(), p, 'o', markersize=5, color='w')
  plt.plot(pitch.xs(), p, 'o', markersize=2)
  plt.grid(False)
  plt.ylim(0, pitch.ceiling)
  plt.ylabel("fundamental frequency [Hz]")
  
  plt.xlim([snd.xmin-0.2, snd.xmax+0.2])

  name="image4.png"
  plt.savefig(name)
  data=""
  with open("image4.png", "rb") as image_file:
    data = format(base64.b64encode(image_file.read()))
  # See /src/components/App.js for frontend call
  
  return jsonify({"normal":dataPoints,"highlight":dataPoints2})
  

"""
-------------------------- APP SERVICES ----------------------------
"""
# Quits Flask on Electron exit
@app.route("/quit")
def quit():
  shutdown = request.environ.get("werkzeug.server.shutdown")
  shutdown()

  return


if __name__ == "__main__":
  app.run(**app_config)
