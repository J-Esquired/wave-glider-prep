from os import walk

f = []
for (dirpath, dirnames, filenames) in walk('./views'):
    f.extend(filenames)
    break
print f
for wat in f:
    print wat
    if (".html" in wat):
        print wat.find(".html")
        filename = "views/" + wat[0:wat.find(".html")] + ".jade"
        file = open(filename, "w")
        file.write("include " + wat)
        file.close()