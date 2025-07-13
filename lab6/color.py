from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/color', methods=['GET', 'POST'])
def color():
    bg_color = 'white'  # màu mặc định
    if request.method == 'POST':
        bg_color = request.form.get('color', 'white')
    return render_template('color.html', bg_color=bg_color)

if __name__ == '__main__':
    app.run(debug=True)
