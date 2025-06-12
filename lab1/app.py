from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def linear_equation():
    x = -2
    y = 5 * x + 7
    return render_template('equation.html', x=x, y=y)

@app.route('/student')
def student_info():
    student = {
        'name': 'Nguyễn Văn A',
        'id': 'B21DCCN001',
        'year': '2021-2025',
        'major': 'Công nghệ thông tin',
        'hobbies': ['Đọc sách', 'Lập trình', 'Nghe nhạc']
    }
    return render_template('student.html', student=student)

@app.route('/form', methods=['GET', 'POST'])
def student_form():
    if request.method == 'POST':
        name = request.form['name']
        student_id = request.form['student_id']
        major = request.form['major']
        return render_template('form_result.html', name=name, student_id=student_id, major=major)
    return render_template('form.html')
