list1 = ['a', 'b', 'c', 'd', 'e']
sublist = ['a', 'c', 'e']

# Check if sublist is in list1
if all(item in list1 for item in sublist):
    print("Sublist is present in list1")
else:
    print("Sublist is not present in list1")
