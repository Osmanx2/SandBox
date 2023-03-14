import os
from os import getcwd
import uuid
import json
LOG_FOLDER = "logs"

# log levels:
#  0 - minimal
#  1 - stages after they complete
#  2 - debug mode logging


class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)
class Logger:
    def __init__(self, session_id = uuid.uuid1()):
        self.log_file_path = str(os.path.join(getcwd(),LOG_FOLDER,f'{str(session_id)}.log'))

    def log(self,l):
        print(l)
        print(self.log_file_path)
        f = open(self.log_file_path, 'a')
        f.write('{}\n'.format(l))
        f.close()


    def log_debug(self,l):
        print(l)
        f = open(self.log_file_path, 'a')
        f.write('{}\n'.format(l))
        f.close()

    @staticmethod
    def read_log(guid):
        f = open(os.path.join(getcwd(),LOG_FOLDER,f'{str(guid)}.log'), 'r')
        txt = f.read()
        f.close()

        return txt
    
    @staticmethod
    def dump(path, text):
        f = open(path, 'a')
        f.write(text)
        f.close()
        
    def dump_json(path, item):
        json_object = json.dumps(item, indent = 4, cls=SetEncoder) 
        f = open(path, 'w')
        f.write(str(json_object))
        f.close()