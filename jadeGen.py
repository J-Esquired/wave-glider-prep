from os import walk

f = []
for (dirpath, dirnames, filenames) in walk('./views'):
    f.extend(filenames)
    break
print f
for wat in f:
    print wat