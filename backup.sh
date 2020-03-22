#!/bin/sh
DIR=`date +%m%d%y`
DEST=/db_backups/$DIR
mkdir $DEST
mongodump --uri "mongodb://usersname:password@127.0.0.1:27100/dbname?replicaSet=replica_name&authSource=admin" -o $DEST