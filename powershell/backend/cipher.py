'''
Task 3 Answers

1) All of the users are in the database, however, some have incorrect characters. But for the most part as a Human I can see which are which just with some characters missing or added
2) User with incorrect passwords- aissa, bjha
3) User with incorrect names- Ally!

'''





# Modulo notes
# Given that ! and SPACE are not allowed, we have a total of 93 characters that are possible (34 to 126)
#   Furthermore, if the shift is above 93, that is overkill and we don't want to keep looping through over and over again for no extra reason so just modulo the shift by 93
#   What does this do? Well it get's rid of any extra loops we would need to do and just do it in 1 loop.
#       Keep in mind this only eliminates the possibility of extra unecessary loops. This does not ensure we don't go out of bounds
#       So to avoid going out of bounds, simply just have an if statement and get the amount that we went overbound by and add it to 33 or subract from 127.
#       Why 33 and 127? If we went over 126 by 1, we should end up at 34, not 35. Same with if we end up 1 under 34, we should be at 126.
#   Now Decrypt is the exact same thing as encrypt except -1 means shift right and 1 means shift left... literal opposite of encrypt

import sys




def encrypt (inputText, s, d):
    # Step 1, reverse the string
    inputText = inputText[::-1]; # starting at the last index, and move towards the first index... reverse reverse
    trueShift = s % 93; # Reduce extra loops as denoted in notes above
    inputAnswer = "";
    
    if(d == 1): # right shift
        for character in inputText: # iterate through each character and shift them right
            if(character == ' ' or character == '!'):
                print("invalid character found... the input was " + inputText[::-1]);
                break;
            tempASCII = ord(character) + trueShift; # Get the ASCII value of the character and shift it
            # Making sure we still stay in bounds... with the modulo we did, we only need to worry about this once
            if(tempASCII > 126):
                tempASCII = 33 + tempASCII - 126; # refer to notes above for more understanding
            inputAnswer += chr(tempASCII); #convert ASCII back to Char append this character to the the string
    elif( d == -1):
        for character in inputText: # iterate through each character and shift them right
            if(character == ' ' or character == '!'):
                print("invalid character found... the input was " + inputText[::-1]);
                break;
            tempASCII = ord(character) - trueShift; # Get the ASCII value of the character and shift it            
            # Making sure we still stay in bounds... with the modulo we did, we only need to worry about this once
            if(tempASCII < 34):
                tempASCII = 127 - (34 - tempASCII); # refer to notes above for more understanding
            inputAnswer += chr(tempASCII); #convert ASCII back to Char append this character to the the string
    else:
        sys.exit('NOOooooo!!! Incorrect Direction input provided... Only 1 and -1 are allowed! \nSystem Dying boohh');
    
    return inputAnswer;





def decrypt (inputText, s, d):
    # simplest solution to this? Just call the encrypt method but add a (-) to the d... basically switch the direction to shift back to OG spot
    # Step 1, reverse the string back to the correct flow
    inputText = inputText[::-1]; # starting at the last index, and move towards the first index... reverse reverse Reverse back to the OG
    
    trueShift = s % 93; # Reduce extra loops as denoted in notes above
    inputAnswer = "";
    
    if(d == 1): # right LEFT
        for character in inputText: # iterate through each character and shift them right
            if(character == ' ' or character == '!'):
                print("invalid character found... the input was " + inputText[::-1]);
                break;
            tempASCII = ord(character) - trueShift; # Get the ASCII value of the character and shift it
            # Making sure we still stay in bounds... with the modulo we did, we only need to worry about this once
            if(tempASCII < 34):
                tempASCII = 127 - (34 - tempASCII); # refer to notes above for more understanding
            inputAnswer += chr(tempASCII); #convert ASCII back to Char append this character to the the string
    elif( d == -1):
        for character in inputText: # iterate through each character and shift them right
            if(character == ' ' or character == '!'):
                print("invalid character found... the input was " + inputText[::-1]);
                break;
            tempASCII = ord(character) + trueShift; # Get the ASCII value of the character and shift it
            # Making sure we still stay in bounds... with the modulo we did, we only need to worry about this once
            if(tempASCII > 126):
                tempASCII = 33 + tempASCII - 126; # refer to notes above for more understanding
            inputAnswer += chr(tempASCII); #convert ASCII back to Char append this character to the the string
    
    return inputAnswer;


# print(decrypt('.0$L(/*)5&.04^")1"5460..&3605', 30, 1))
# print(decrypt('54&51k', 30, 1))
# print(decrypt('.0$L(/*)5&.04^&*8"k', 30, 1))
# print(decrypt(':"qg/"a5")8', 30, 1))

# uncomment to test: 

# nickname = 'Mousse'
# email = 'touremmoustaha@gmail.com'
# password = 'MousseyWoo'

# print('nickname: ' + nickname + '\nemail: ' + email + '\npassword: ' + password)

# encryptNickName = encrypt(nickname, 30, 1)
# encryptEmail = encrypt(email, 30, 1)
# encryptPassword = encrypt(password, 30, 1)

# print('Encrypted nickname: ' + encryptNickName + '\n Encrypted email: ' + encryptEmail + '\n Encrypted password: ' + encryptPassword)

# decryptNickName = decrypt(encryptNickName, 30, 1)
# decryptEmail = decrypt(encryptEmail, 30, 1)
# decryptPassword = decrypt(encryptPassword, 30, 1)

# print('Decrypted nickname: ' + decryptNickName + '\n Decrypted email: ' + decryptEmail + '\n Decrypted password: ' + decryptPassword)
