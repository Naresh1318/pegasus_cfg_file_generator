import os
import utils
from flask import Flask, render_template, request, send_file, json


class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        variable_start_string='%%',  # Default is '{{', I'm changing this because Vue.js uses '{{' / '}}'
        variable_end_string='%%',
    ))


app = CustomFlask(__name__)  # This replaces your existing "app = Flask(__name__)"


@app.route('/')
def index():
    """
    Renders the dashboard when the server is initially run.
    :return: Template to render, Object that is taken care by flask.
    """

    # render the template (below) that will use JavaScript to read the stream
    return render_template("index.html")


@app.route('/download_config_file', methods=["POST"])
def download_config_file():
    """
    Generate and download the config file
    :return: downloadable config file
    """
    assert request.method == "POST", "POST request expected received {}".format(request.method)
    if request.method == "POST":
        try:
            all_outputs = json.loads(request.form["all_outputs"])
            file = utils.generate_config_file(all_outputs)
            return send_file(file, as_attachment=True, attachment_filename='{}.cfg'.format(all_outputs["file_name"]))
        except Exception as e:
            print("{}".format(e))


if __name__ == "__main__":
    app.run(debug=True)
