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

    from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

scores = []

@app.route('/score', methods=['GET', 'POST'])
def score():
    average = None
    if request.method == 'POST':
        try:
            score = float(request.form.get('score'))
            if 0 <= score <= 100:
                scores.append(score)
            else:
                return render_template('score.html', error="Score must be between 0 and 100", scores=scores, average=average)
        except ValueError:
            return render_template('score.html', error="Invalid input", scores=scores, average=average)
        return redirect(url_for('score'))
    if scores:
        average = sum(scores) / len(scores)
    return render_template('score.html', scores=scores, average=average)

if __name__ == '__main__':
    app.run(debug=True)

    from flask import Flask, render_template

app = Flask(__name__)

hobbies = ["Reading", "Coding", "Hiking"]

@app.route('/hobbies')
def hobbies():
    return render_template('newfile.html', hobbies=hobbies)

if __name__ == '__main__':
    app.run(debug=True)

    from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

tasks = []

@app.route('/tasks', methods=['GET', 'POST'])
def task_list():
    if request.method == 'POST':
        task = request.form.get('task')
        if task:
            tasks.append(task)
        return redirect(url_for('task_list'))
    return render_template('tasklist.html', tasks=tasks)

if __name__ == '__main__':
    app.run(debug=True)