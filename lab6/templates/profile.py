from flask import Flask, render_template

app = Flask(__name__)

@app.route('/hello.html')
def hello():
    return render_template('hello.html')

if __name__ == '__main__':
    app.run(debug=True)

    from flask import Flask, render_template

app = Flask(__name__)

@app.route('/homepage')
def homepage():
    return render_template('homepage.html', message="Welcome to my Homepage!")

if __name__ == '__main__':
    app.run(debug=True)

    from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/square', methods=['GET', 'POST'])
def square():
    result = None
    if request.method == 'POST':
        try:
            number = float(request.form.get('number'))
            result = number ** 2
            result = f"Square of {number} is {result:.2f}"
        except ValueError:
            result = "Invalid input"
    return render_template('math.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)