# Load libraries
import numpy
from matplotlib import pyplot
from pandas import read_csv
from pandas import set_option

# Configurations for seeing the entire statistics regarding data
set_option('display.max_rows', 500)
set_option('display.width', 100)
set_option('display.max_columns', None)
set_option('display.precision', 3)

# Load dataset
url = 'data_set.csv'
dataset = read_csv(url, delimiter=';')

# removal of irrelevant data
dataset = dataset.drop('id', axis=1)

#shape
print(dataset.shape)

# (70000, 12)

# types
print("\n")
print(dataset.dtypes)

# age              int64
# gender           int64
# height           int64
# weight         float64
# ap_hi            int64
# ap_lo            int64
# cholesterol      int64
# gluc             int64
# smoke            int64
# alco             int64
# active           int64
# cardio           int64

# peek at the first 20 rows
print("\n")
print(dataset.head(20))

#      age  gender  height  weight  ap_hi  ap_lo  cholesterol  gluc  smoke  alco  active  cardio
# 0   18393       2     168    62.0    110     80            1     1      0     0       1       0
# 1   20228       1     156    85.0    140     90            3     1      0     0       1       1
# 2   18857       1     165    64.0    130     70            3     1      0     0       0       1
# 3   17623       2     169    82.0    150    100            1     1      0     0       1       1
# 4   17474       1     156    56.0    100     60            1     1      0     0       0       0
# 5   21914       1     151    67.0    120     80            2     2      0     0       0       0
# 6   22113       1     157    93.0    130     80            3     1      0     0       1       0
# 7   22584       2     178    95.0    130     90            3     3      0     0       1       1
# 8   17668       1     158    71.0    110     70            1     1      0     0       1       0
# 9   19834       1     164    68.0    110     60            1     1      0     0       0       0
# 10  22530       1     169    80.0    120     80            1     1      0     0       1       0
# 11  18815       2     173    60.0    120     80            1     1      0     0       1       0
# 12  14791       2     165    60.0    120     80            1     1      0     0       0       0
# 13  19809       1     158    78.0    110     70            1     1      0     0       1       0
# 14  14532       2     181    95.0    130     90            1     1      1     1       1       0
# 15  16782       2     172   112.0    120     80            1     1      0     0       0       1
# 16  21296       1     170    75.0    130     70            1     1      0     0       0       0
# 17  16747       1     158    52.0    110     70            1     3      0     0       1       0
# 18  17482       1     154    68.0    100     70            1     1      0     0       0       0
# 19  21755       2     162    56.0    120     70            1     1      1     0       1       0

# descriptions
print("\n")
print(dataset.describe())

#             age     gender     height     weight      ap_hi      ap_lo  cholesterol       gluc
# count  70000.000  70000.000  70000.000  70000.000  70000.000  70000.000    70000.000  70000.000
# mean   19468.866      1.350    164.359     74.206    128.817     96.630        1.367      1.226
# std     2467.252      0.477      8.210     14.396    154.011    188.473        0.680      0.572
# min    10798.000      1.000     55.000     10.000   -150.000    -70.000        1.000      1.000
# 25%    17664.000      1.000    159.000     65.000    120.000     80.000        1.000      1.000
# 50%    19703.000      1.000    165.000     72.000    120.000     80.000        1.000      1.000
# 75%    21327.000      2.000    170.000     82.000    140.000     90.000        2.000      1.000
# max    23713.000      2.000    250.000    200.000  16020.000  11000.000        3.000      3.000

#           smoke       alco     active   cardio
# count  70000.000  70000.000  70000.000  70000.0
# mean       0.088      0.054      0.804      0.5
# std        0.283      0.226      0.397      0.5
# min        0.000      0.000      0.000      0.0
# 25%        0.000      0.000      1.000      0.0
# 50%        0.000      0.000      1.000      0.0
# 75%        0.000      0.000      1.000      1.0
# max        1.000      1.000      1.000      1.0

# class distribution
print("\n")
print(dataset.groupby('cardio').size())

# cardio
# 0    35021
# 1    34979

# histograms
dataset.hist(sharex=False, sharey=False, layout=(4, 3))
pyplot.show()


# density
dataset.plot(kind='density', subplots=True, layout=(3, 4), sharex=False, yticks=[], ylabel='')
pyplot.subplots_adjust(hspace=0.5, wspace=0.5)
pyplot.tight_layout()
pyplot.show()

# box and whisker plots
dataset.plot(kind='box', subplots=True, layout=(3, 4), sharex=False, sharey=False)
pyplot.subplots_adjust(hspace=0.5, wspace=0.5)
pyplot.show()

# correlation matrix
fig = pyplot.figure()
ax = fig.add_subplot(111)
cax = ax.matshow(dataset.corr(), vmin=-1, vmax=1)
ticks = numpy.arange(0, 12, 1)
ax.set_xticks(ticks)
ax.set_yticks(ticks)
ax.set_xticklabels(dataset.columns, rotation=90)
ax.set_yticklabels(dataset.columns)
fig.colorbar(cax)
pyplot.subplots_adjust(hspace=0.5, wspace=0.5)
pyplot.show()