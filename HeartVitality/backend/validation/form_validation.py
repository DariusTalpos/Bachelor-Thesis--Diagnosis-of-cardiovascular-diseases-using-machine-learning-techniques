def form_validation(form):
    age = form.get('age')
    gender = form.get('gender')
    height = form.get('height')
    weight = form.get('weight')
    sys = form.get('sys')
    dia = form.get('dia')
    cholesterol = form.get('cholesterol')
    glucose = form.get('glucose')
    smoke = form.get('smoke')
    alcohol = form.get('alcohol')
    physical = form.get('physical')
    try:
        age = int(age)
        gender = int(gender)
        height = int(height)
        weight = int(weight)
        sys = int(sys)
        dia = int(dia)
        cholesterol = int(cholesterol)
        glucose = int(glucose)
        smoke = int(smoke)
        alcohol = int(alcohol)
        physical = int(physical)
        return [[age, gender, height, weight, sys, dia, cholesterol, glucose, smoke, alcohol, physical]]

    except:
        return None

