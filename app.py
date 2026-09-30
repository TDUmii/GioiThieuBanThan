from flask import Flask, render_template, send_from_directory

from profile_data import PROFILE


app = Flask(__name__)


@app.get("/")
def home():
    return render_template("index.html", profile=PROFILE)


@app.get("/img/<path:filename>")
def image_file(filename):
    return send_from_directory("img", filename)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5059, debug=True)
