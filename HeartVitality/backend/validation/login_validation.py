def login_validation(json):
    username = json['username']
    password = json['password']
    try:
        pair = username+" "+password
        file = open("./resources/authentication/accounts.txt", 'r')
        accounts = file.read().split("\n")
        index = accounts.index(pair)
        file.close()
        file = open("./resources/authentication/tokens.txt", 'r')
        tokens = file.read().split("\n")
        return tokens[index]
    except:
        return None

def token_is_valid(json):
    token = json['token']
    file = open("./resources/authentication/tokens.txt", 'r')
    tokens = file.read().split("\n")
    if token in tokens:
        return True
    return False