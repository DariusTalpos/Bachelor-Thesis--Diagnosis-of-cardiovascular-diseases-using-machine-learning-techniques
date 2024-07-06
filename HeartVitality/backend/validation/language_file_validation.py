def language_file_validation(language, file_name):
    try:
        file = open("./resources/languages/"+language+"/"+file_name+".txt", 'r', encoding='utf-8')
        text = file.read()
        return text
    except:
        return None