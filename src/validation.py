import re

from constants import Constants

class Validation:

    @classmethod
    def validate_phonenumber(cls, phonenumber):
        """
        Check if a phone number is a valid phone number
        :param phonenumber: Phone number
        :return: Boolean: True if valid, False otherwise
        """

        phonenumber_regex = re.compile(r'(^(\+?[0-9]{1,3})?([0-9]{10}$))')

        if phonenumber_regex.search(phonenumber):
            print("valid phone")
            return True
        return False
    
    @classmethod
    def validate_username(cls, username):
        """
        Check if a phone number is a valid username
        :param username: username
        :return: Boolean: True if valid, False otherwise
        """

        username_regex = re.compile(r'(^[a-zA-Z][0-9a-zA-Z]*)$')
        print(username)
        if username_regex.search(username):
            print("User valid")
            return True
        return False
    
    @classmethod
    def validate(cls, username, phonenumber = None):
        """
        Check validity of a entry
        :param username: username
        :param phonenumber: phone number
        :return: Boolean: True if valid, False otherwise
        """

        if not cls.validate_username(username):
           return Constants.INVALID_USER
        if phonenumber and not cls.validate_phonenumber(phonenumber):
            return Constants.INVALID_PHONE
        return None

