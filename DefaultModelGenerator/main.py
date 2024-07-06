# Load libraries
import pickle
import time
import numpy
import numpy as np
import pandas as pd
from pandas import read_csv
from pandas import set_option
from pandas.plotting import scatter_matrix
from sklearn.preprocessing import StandardScaler, Binarizer, MinMaxScaler, Normalizer
from sklearn.model_selection import train_test_split
from sklearn.model_selection import KFold
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC, LinearSVC
from sklearn.ensemble import AdaBoostClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import ExtraTreesClassifier
from pickle import dump, load
from scipy.stats import t


set_option('display.max_rows', 500)
set_option('display.width', 100)
set_option('display.max_columns', None)
set_option('display.precision', 3)


url = 'data_set.csv'
dataset = read_csv(url, delimiter=';')

# removal of irrelevant data
dataset = dataset.drop('id', axis=1)


array = dataset.values
X = array[:, 0:11]
Y = array[:, 11]
validation_size = 0.20
seed = 7
X_train, X_validation, Y_train, Y_validation = train_test_split(X, Y,
                                                                test_size=validation_size, random_state=seed)


num_folds = 10
seed = 7
scoring = 'accuracy'


models = []
models.append(('LR', LogisticRegression(max_iter=10000)))
models.append(('LDA', LinearDiscriminantAnalysis()))
models.append(('KNN', KNeighborsClassifier()))
models.append(('CART', DecisionTreeClassifier()))
models.append(('NB', GaussianNB()))
models.append(('SVM', SVC()))
models.append(('AB', AdaBoostClassifier()))
models.append(('GBM', GradientBoostingClassifier()))
models.append(('RF', RandomForestClassifier()))
models.append(('ET', ExtraTreesClassifier()))

results = []
names = []
# for name, model in models:
#     time1 = time.perf_counter()
#     kfold = KFold(n_splits=num_folds, random_state=seed, shuffle=True)
#     cv_results = cross_val_score(model, X, Y, cv=kfold, scoring=scoring, n_jobs=-1)
#     time2 = time.perf_counter()
#     results.append(cv_results)
#     names.append(name)
#     msg = "%s: %f %s %f" % (
#     name + ": ", cv_results.mean()*100, "+/-", t.ppf(1 - 0.95 / 2, 9) * (cv_results.std() / np.sqrt(len(cv_results))) *100)
#     print(msg)
#
# scalers = [StandardScaler(), Normalizer(), MinMaxScaler(), Binarizer(threshold=0.5)]
# #Standardize the dataset
# for scaler in scalers:
# #     print(scaler)
#     pipelines = []
#     pipelines.append(('ScaledLR', Pipeline([('Scaler', scaler), ('LR',
#                                                                   LogisticRegression(max_iter=10000))])))
#     pipelines.append(('ScaledLDA', Pipeline([('Scaler', scaler), ('LDA',
#                                                                    LinearDiscriminantAnalysis())])))
#     pipelines.append(('ScaledKNN', Pipeline([('Scaler', scaler), ('KNN',
#                                                                    KNeighborsClassifier())])))
#     pipelines.append(('ScaledCART', Pipeline([('Scaler', scaler), ('CART',
#                                                                     DecisionTreeClassifier())])))
#     pipelines.append(('ScaledNB', Pipeline([('Scaler', scaler), ('NB',
#                                                                   GaussianNB())])))
#     pipelines.append(('ScaledSVM', Pipeline([('Scaler', scaler), ('SVM', SVC())])))
#
#     pipelines.append(('ScaledAB', Pipeline([('Scaler', scaler), ('AB',
#                                                                      AdaBoostClassifier())])))
#     pipelines.append(('ScaledGBM', Pipeline([('Scaler', scaler), ('GBM',
#                                                                       GradientBoostingClassifier())])))
#     pipelines.append(('ScaledRF', Pipeline([('Scaler', scaler), ('RF',
#                                                                        RandomForestClassifier())])))
#     pipelines.append(('ScaledET', Pipeline([('Scaler', scaler), ('ET',
#                                                                         ExtraTreesClassifier())])))
#     results = []
#     names = []
#     for name, model in pipelines:
#         time1 = time.perf_counter()
#         kfold = KFold(n_splits=num_folds, random_state=seed, shuffle=True)
#         cv_results = cross_val_score(model, X, Y, cv=kfold, scoring=scoring, n_jobs=-1)
#         time2 = time.perf_counter()
#         results.append(cv_results)
#         names.append(name)
#         msg = "%s: %f %s %f %s" % (name+": ", cv_results.mean()*100, "+/-", t.ppf(1-0.95/2, 9)*(cv_results.std()/np.sqrt(len(cv_results)))*100, model['Scaler'])
#         print(msg)
#
#
# #Tune scaled SVM
# scaler = StandardScaler().fit(X_train)
# rescaledX = scaler.transform(X_train)
# c_values = [0.1, 0.3, 0.5, 0.7, 0.9, 1.0, 1.3, 1.5, 1.7, 2.0]
# kernel_values = ['linear', 'poly', 'rbf', 'sigmoid']
# param_grid = dict(C=c_values, kernel=kernel_values)
# model = SVC()
# kfold = KFold(n_splits=num_folds, random_state=seed, shuffle=True)
# grid = GridSearchCV(estimator=model, param_grid =param_grid, scoring=scoring, cv=kfold, n_jobs=-1)
# grid_result = grid.fit(rescaledX, Y_train)
# means = grid_result.cv_results_['mean_test_score']
# stds = grid_result.cv_results_['std_test_score']
# params = grid_result.cv_results_['params']
# for mean, stdev, param in zip(means, stds, params):
#     print("%f (%f) with: %r" % (mean, stdev, param))
# print("Best: %f using %s" % (grid_result.best_score_, grid_result.best_params_))
#
# pipeline = Pipeline([('scaler', StandardScaler()), ('SVM', SVC(C=2.0, kernel='rbf'))])
# kfold = KFold(n_splits=num_folds, random_state=seed, shuffle=True)
# cv_results = cross_val_score(pipeline, X, Y, cv=kfold, scoring=scoring, n_jobs=-1)
# msg = "%f (%f)" % (cv_results.mean(), cv_results.std())
# print(msg)
#
# #Tune scaled LR
# scaler = StandardScaler().fit(X_train)
# rescaledX = scaler.transform(X_train)
# solvers = ['newton-cg', 'lbfgs', 'liblinear', 'sag', 'saga']
# penalties = [None, 'l1', 'l2', 'elasticnet']
# param_grid = dict(solver=solvers, penalty=penalties)
# model = LogisticRegression(max_iter=10000)
# kfold = KFold(n_splits=num_folds, random_state=seed, shuffle=True)
# grid = GridSearchCV(estimator=model, param_grid =param_grid, scoring=scoring, cv=kfold, n_jobs=-1)
# grid_result = grid.fit(rescaledX, Y_train)
# means = grid_result.cv_results_['mean_test_score']
# stds = grid_result.cv_results_['std_test_score']
# params = grid_result.cv_results_['params']
# for mean, stdev, param in zip(means, stds, params):
#     print("%f (%f) with: %r" % (mean, stdev, param))
# print("Best: %f using %s" % (grid_result.best_score_, grid_result.best_params_))
#
# pipeline = Pipeline([('scaler', StandardScaler()), ('LR', LogisticRegression(penalty=None, solver='newton-cg', max_iter=10000))])
# kfold = KFold(n_splits=num_folds, random_state=seed, shuffle=True)
# cv_results = cross_val_score(pipeline, X, Y, cv=kfold, scoring=scoring, n_jobs=-1)
# msg = "%f (%f)" % (cv_results.mean(), cv_results.std())
# print(msg)
#
# #Tune scaling GB
# scaler = StandardScaler().fit(X_train)
# rescaledX = scaler.transform(X_train)
# n_estimators=[100,200,500,1000]
# learning_rates=[0.1,0.2,0.5,0.01]
# max_depths=[None, 3, 5, 10]
# param_grid = dict(n_estimators=n_estimators, learning_rate=learning_rates, max_depth=max_depths)
# model = GradientBoostingClassifier()
# kfold = KFold(n_splits=num_folds, random_state=seed, shuffle=True)
# grid = GridSearchCV(estimator=model, param_grid =param_grid, scoring=scoring, cv=kfold, n_jobs=-1)
# grid_result = grid.fit(rescaledX, Y_train)
# means = grid_result.cv_results_['mean_test_score']
# stds = grid_result.cv_results_['std_test_score']
# params = grid_result.cv_results_['params']
# for mean, stdev, param in zip(means, stds, params):
#     print("%f (%f) with: %r" % (mean, stdev, param))
# print("Best: %f using %s" % (grid_result.best_score_, grid_result.best_params_))
#
# pipeline = Pipeline([('scaler', MinMaxScaler()), ('GB', GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3))])
# kfold = KFold(n_splits=num_folds, random_state=seed, shuffle=True)
# cv_results = cross_val_score(pipeline, X, Y, cv=kfold, scoring=scoring, n_jobs=-1)
# msg = "%f (%f)" % (cv_results.mean(), cv_results.std())
# print(msg)
#
#
# pipelines = []
# pipelines.append(('LR',Pipeline([('scaler', StandardScaler()), ('LR', LogisticRegression(penalty = None, solver ='newton-cg', max_iter=10000))])))
# pipelines.append(('SVM',Pipeline([('scaler', StandardScaler()), ('SVM', SVC(C = 2.0, kernel ='rbf'))])))
# pipelines.append(('GB',Pipeline([('scaler', StandardScaler()), ('GB1', GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3))])))
# pipelines.append(('GB',Pipeline([('scaler', MinMaxScaler()), ('GB2', GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3))])))
# pipelines.append(('AB',Pipeline([('scaler', StandardScaler()), ('AB1', AdaBoostClassifier(n_estimators=500, learning_rate=0.5))])))
# pipelines.append(('AB',Pipeline([('scaler', MinMaxScaler()), ('AB2', AdaBoostClassifier(n_estimators=500, learning_rate=0.5))])))
# for name, pipeline in pipelines:
#     kfold = KFold(n_splits=num_folds, random_state=seed, shuffle=True)
#     scores = ['accuracy']
#     for score in scores:
#         cv_results = cross_val_score(pipeline, X, Y, cv=kfold, scoring=score, n_jobs=-1)
#         msg = "%s: %f %s %f" % (name+": ", cv_results.mean()*100, "+/-", t.ppf(1-0.95/2, 9)*(cv_results.std()/np.sqrt(len(cv_results)))*100)
#         print(msg+"\n")
# print("\n")

model = Pipeline([('scaler', MinMaxScaler()),('model', GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3))])
model.fit(X_train, Y_train)
filename = 'model.pkl'
dump(model, open(filename, 'wb'))
#print(X_validation[0])
obtained_x=[[10000, 1, 191, 85.0, 125, 84, 2, 1, 0, 1, 1]]
# print(X_validation)
loaded_model = load(open(filename, 'rb'))
predictions = loaded_model.predict(obtained_x)
print(predictions)