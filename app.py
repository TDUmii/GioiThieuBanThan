import os

from flask import Flask, render_template, send_from_directory

from profile_data import PROFILE


app = Flask(__name__)
app.config["DEBUG"] = os.environ.get("FLASK_DEBUG", "").strip().lower() in {
    "1", "true", "yes", "on"
}


@app.get("/")
def home():
    return render_template("index.html", profile=PROFILE)


@app.get("/img/<path:filename>")
def image_file(filename):
    return send_from_directory("img", filename)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.environ.get("PORT", "5059")), debug=app.debug)
