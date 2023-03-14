import psycopg2

from ilogging import Logger as l
from psycopg2.extras import RealDictCursor


class PgHelper:
    def __init__(self, host, db_name, port,user, password, as_dict_cursor=False):
        self.host = host
        self.db_name = db_name
        self.port = port
        self.user = user
        self.password = password
        self.logger = l()
        self.as_dict_cursor = as_dict_cursor

    def connect(self):
        try:
            conn = psycopg2.connect(host=self.host, dbname=self.db_name, port=self.port,
                                    user=self.user,
                                    password=self.password)
            #delete immediately
            conn.autocommit = True
        except Exception as e:
            self.logger.log('Error connecting to database: {}'.format(e))
            exit(1)
            return None
        if self.as_dict_cursor:
            self.cursor = conn.cursor(cursor_factory=RealDictCursor)
        else:
            self.cursor = conn.cursor()
        self.connection = conn

        return self.cursor, conn

    def close(self):
        try:
            self.cursor.close()
            self.connection.close()
        except Exception as e:
            self.logger.log('Error closing connection to DB!: {}'.format(e))