
import base64
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
  draw_pitch(pitch)
  plt.xlim([snd.xmin, snd.xmax])
  name="image1.png"
  plt.savefig(name)
  data=""
  with open("image1.png", "rb") as image_file:
    data = format(base64.b64encode(image_file.read()))
  # See /src/components/App.js for frontend call
  
  return jsonify({"imagename":data[2:-1]})

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
