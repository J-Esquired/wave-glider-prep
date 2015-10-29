from os import walk

f = []
for (dirpath, dirnames, filenames) in walk('./views'):
    f.extend(filenames)
    break
for wat in f:
    if (".html" in wat):
        filename = "views/" + wat[0:wat.find(".html")] + ".jade"
        file = open(filename, "w")
        file.write("include " + wat)
        file.close()
print "Jade files generated."