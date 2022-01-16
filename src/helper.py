import json


class Helper:

    filename = "data.json"

    @classmethod
    def read_JSON(cls):
        """
        Read a JSON file
        :return: JSON object
        """
        try:
            f = open(cls.filename, 'r')
        except OSError:
            return None
        except ValueError:
            return None
        
        with f:
            data = json.load(f)
        return data

    @classmethod
    def write_to_JSON(cls, data):
        """
        Write data to a JSON file
        :param data: data to be written
        :return: None
        """
        with open(cls.filename, 'w') as fp:
            json.dump(data, fp)

