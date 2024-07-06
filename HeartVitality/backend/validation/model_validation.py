from numpy import sqrt
from scipy.stats import t
from pandas import read_csv
from sklearn.model_selection import train_test_split, cross_val_score, KFold
from sklearn.linear_model import LogisticRegression
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.ensemble import AdaBoostClassifier, GradientBoostingClassifier, RandomForestClassifier, \
    ExtraTreesClassifier
from sklearn.preprocessing import StandardScaler, Normalizer, MinMaxScaler, Binarizer
from sklearn.metrics import confusion_matrix
from sklearn.pipeline import Pipeline
from pickle import dump

url = './resources/data_set.csv'
dataset = read_csv(url, delimiter=';').drop('id', axis=1)
array = dataset.values
X = array[:, 0:11]
Y = array[:, 11]
validation_size = 0.20
seed = 7
X_train, X_validation, Y_train, Y_validation = train_test_split(X, Y,
                                                                test_size=validation_size, random_state=seed)

num_folds = 10
seed = 7


def model_validation(json):
    try:
        algorithm = json['algorithm']
        transformation = json['transformation']
        optimize = json['optimise']

        alg = None
        scaler = None
        if optimize != 1 and optimize != 2:
            return None

        if transformation == 'None':
            scaler = None
        elif transformation == 'Standardize':
            scaler = StandardScaler()
        elif transformation == 'Normalize':
            scaler = Normalizer()
        elif transformation == 'Scale':
            scaler = MinMaxScaler()
        elif transformation == 'Binarize':
            scaler = Binarizer()
        else:
            return None

        if algorithm == 'LR':
                if optimize == 1:
                    alg = LogisticRegression(penalty=None, solver='newton-cg', max_iter=10000)
                else:
                    alg = LogisticRegression(max_iter=10000)
        elif algorithm == 'LDA':
                alg = LinearDiscriminantAnalysis()
        elif algorithm == 'KNN':
                alg = KNeighborsClassifier()
        elif algorithm == 'DT':
                alg = DecisionTreeClassifier()
        elif algorithm == 'NB':
                alg = GaussianNB()
        elif algorithm == 'SVM':
                if optimize == 1:
                    alg = SVC(C=2.0, kernel='rbf')
                else:
                    alg = SVC()
        elif algorithm == 'AB':
                if optimize == 1:
                    alg = AdaBoostClassifier(n_estimators=500, learning_rate=0.5)
                else:
                    alg = AdaBoostClassifier()
        elif algorithm == 'GB':
                if optimize == 1:
                    alg = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3)
                else:
                    alg = GradientBoostingClassifier()
        elif algorithm == 'RB':
                alg = RandomForestClassifier()
        elif algorithm ==  'ET':
                alg = ExtraTreesClassifier()
        else:
                return None

        if scaler is None:
            model = alg
        else:
            model = Pipeline([('scaler', scaler), ('model', alg)])

        kfold = KFold(n_splits=num_folds, random_state=seed, shuffle=True)
        cv_results = cross_val_score(model, X, Y, cv=kfold, scoring='accuracy', n_jobs=-1)
        accuracy_mean = cv_results.mean()*100
        accuracy_deviation = t.ppf(1 - 0.95 / 2, 9) * (cv_results.std() / sqrt(len(cv_results)))*100
        accuracy = [accuracy_mean, accuracy_deviation]

        cv_results = cross_val_score(model, X, Y, cv=kfold, scoring='neg_log_loss', n_jobs=-1)
        log_loss_mean = cv_results.mean()*100
        log_loss_deviation = t.ppf(1 - 0.95 / 2, 9) * (cv_results.std() / sqrt(len(cv_results)))*100
        log_loss = [log_loss_mean, log_loss_deviation]

        cv_results = cross_val_score(model, X, Y, cv=kfold, scoring='roc_auc', n_jobs=-1)
        roc_auc_mean = cv_results.mean()*100
        roc_auc_deviation = t.ppf(1 - 0.95 / 2, 9) * (cv_results.std() / sqrt(len(cv_results)))*100
        roc_auc = [roc_auc_mean, roc_auc_deviation]

        model.fit(X_train, Y_train)
        predictions = model.predict(X_validation)
        matrix = confusion_matrix(Y_validation, predictions)
        TP = str(matrix[0, 0])
        FP = str(matrix[0, 1])
        FN = str(matrix[1, 0])
        TN = str(matrix[1, 1])
        conf_matrix = [TP, FP, FN, TN]

        filename = "./resources/models/model_testing.pkl"
        dump(model, open(filename, 'wb'))

        return accuracy, log_loss, roc_auc, conf_matrix

    except:
        return None
