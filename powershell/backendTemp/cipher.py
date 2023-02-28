def encrypt(text, num, shift):
    userInput = False
    if userInput:
        while(True):
            text = input("Input text to encypt\n")
            if("!" in text or " " in text):
                print("invalid input")
            else:
                break

        while(True):
            num = input("Input number you want to shift\n")
            try:
                num = int(num)
                break
            except:
                print("invalid input")

        while(True):
            shift = input("Input which way to shift (-1:left, 1:right)\n")
            try:
                shift = int(shift)
                if shift == -1 or shift == 1:
                    break
            except:
                print("invalid input")

    result = ""
    rev = text[::-1]
    for let in rev:
        temp = (ord(let) - 34)
        trans = (num % 93) * shift
        temp = (temp + trans)%93
        temp += 34
        if temp < 0:
            temp = 126 + temp
        if userInput:
            print(chr(temp), end="")
        else:
            result += chr(temp)
    
    if userInput:
        print()
    else:
        return result

def decrypt(text,num,shift):
    userInput = False
    if userInput:
        while(True):
            text = input("Input text to decypt\n")
            if("!" in text or " " in text):
                print("invalid input")
            else:
                break

        while(True):
            num = input("Input number you shiftedt\n")
            try:
                num = int(num)
                break
            except:
                print("invalid input")

        while(True):
            shift = input("Input which way to shift (-1:left, 1:right)\n")
            try:
                shift = int(shift)
                if shift == -1 or shift == 1:
                    break
            except:
                print("invalid input")

    result = ""
    rev = text[::-1]
    for let in rev:

        temp = (ord(let) - 34)
        trans = (num % 93) * shift
        temp = (temp - trans)%93
        temp += 34
        if temp < 0:
            temp = 126 + temp

        if userInput:
            print(chr(temp), end="")
        else:
            result += chr(temp)

    if userInput:
        print()
    else:
        return result


#encrypt()
#decrypt()
