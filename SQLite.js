import React, { Component } from 'react';
import SQLiteStorage from 'react-native-sqlite-storage';
import Reactotron from 'reactotron-react-native';

SQLiteStorage.DEBUG(true);
var database_name = "AwesomeProject.db";//数据库文件
var database_version = "1.0";//版本号
var database_displayname = "MySQLite";
var database_size = -1;
var db;

export default class SQLite extends Component {
    //初始化数据库
    initDB(){
        config = {
            name: 'my.db', location: 'default'
        };

        db = SQLiteStorage.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            ()=>{
                Reactotron.log("Database started successfully...")
            },(err)=>{
                Reactotron.log(err)
            });
        return db;
    }
    //关闭数据库
    closeDB(){
        if(db){
            Reactotron.log('close');
            db.close();
        }else {
            Reactotron.log("Database close failed...");
        }
    }
    //新建用户数据表
    createUserTable() {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS USER(' +
                'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'userName varchar,'+
                'phone VARCHAR,' +
                'pwd VARCHAR)',
                [],
                () => {
                    // callBack && callBack(true)
                    Reactotron.log("Execute progress success...")
                },(err) => {
                    // callBack && callBack(false, err)
                    Reactotron.log("Execute progress failed..." + err)
            })
        },(err) => {
            Reactotron.log("Transaction progress error..." + err)
        },() => {
            Reactotron.log("Transaction progress success...")
        })
    }
    //新建收藏数据表
    createCollectTable() {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS COLLECT(' +
                'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'musicId VARCHAR,'+
                'musicName VARCHAR,' +
                'playUrl VARCHAR,' +
                'code VARCHAR)',
                [],
                () => {
                    // callBack && callBack(true)
                    Reactotron.log("Execute progress success...")
                },(err) => {
                    // callBack && callBack(false, err)
                    Reactotron.log("Execute progress failed..." + err)
            })
        },(err) => {
            Reactotron.log("Transaction progress error..." + err)
        },() => {
            Reactotron.log("Transaction progress success...")
        })
    }
    //插入or更新数据
    insertData(tableName, data){
        let sql = `INSERT OR REPLACE INTO ${tableName} (${Object.keys(data).join(',')}) VALUES (${Array(Object.keys(data).length).fill('?').join(',')})`
        db.transaction((tx) => {
            tx.executeSql(
                sql,
                Object.values(data),
                () => {
                    // callBack && callBack(true)
                    Reactotron.log(`Insert data to ${tableName} execute successfully...`)
                },(err) => {
                    // callBack && callBack(false, err)
                    Reactotron.log("Insert data execute error:" + err)
            })
        },(err) => {
            Reactotron.log("Insert data transaction progress error:" + err)
        },() => {
            Reactotron.log(`Insert data to ${tableName} transaction progress success...`)
        })
    }
    //删除数据
    deleteData(tableName, key, value){
        let sql = `DELETE FROM ${tableName} WHERE ${key} = ${value}`
        db.transaction((tx) => {
            tx.executeSql(
                sql,
                [],
                () => {
                    // callBack && callBack(true)
                    Reactotron.log(`Delete data from ${tableName} execute success...`)
                },(err) => {
                    // callBack && callBack(false, err)
                    Reactotron.log("Delete data execute error:" + err)
            })
        },(err) => {
            Reactotron.log("Delete data transaction progress error:" + err)
        },() => {
            Reactotron.log(`Delete data from ${tableName} transaction progress success...`)
        })
    }
    //查找所有数据
    selectData(tableName){
        let sql = `SELECT * FROM ${tableName}`
        db.transaction((tx) => {
            tx.executeSql(
                sql,
                [],
                (tx, result) => {
                    let data = [];
                    for(let i = 0; i < result.rows.length; i++){
                        let outcome = result.rows.item(i);
                        data.push(outcome)
                    }
                    // callBack && callBack(true, data)
                    Reactotron.log(`Select data from ${tableName} execute success...`)
                    Reactotron.log(result)
                    Reactotron.log(data)
                },(err) => {
                    // callBack && callBack(false, err)
                    Reactotron.log("Select data execute error:" + err)
            })
        },(err) => {
            Reactotron.log("Select data transaction progress error:" + err)
        },() => {
            Reactotron.log(`Select data from ${tableName} transaction progress success...`)
        })
    }
    //精确查找
    selectExactData(tableName, key, value, callBack){
        let sql = `SELECT * FROM ${tableName} WHERE ${key} = ${value}`
        db.transaction((tx) => {
            tx.executeSql(
            sql,
            [],
            (tx,results) => {
                callBack && callBack(true, results.rows.item(0))
                Reactotron.log(`select exact data from ${tableName} success...`)
            },
            (err) => {
                callBack && callBack(false, err)
                Reactotron.log('select exact data error:' + err)
            })
            },
            (err) => {
            Reactotron.log('select exact data transaction error:' + err)
            },
            () => {
            Reactotron.log(`select exact data from ${tableName} transaction success...`)
            })
    }
    //删除表
    dropTable(tableName, callBack){
        let sql = `DROP TABLE ${tableName}`
        db.transaction((tx) => {
            tx.executeSql(
                sql,
                [],
                (tx,results) => {
                    callBack && callBack(true)
                    Reactotron.log(`Drop ${tableName} execute success...`)
                },(err) => {
                    callBack && callBack(false, err)
                    Reactotron.log("Drop table execute error:" + err)
            })
        },(err) => {
            Reactotron.log("Drop table transaction progress error:" + err)
        },() => {
            Reactotron.log(`Drop ${tableName} transaction progress success...`)
        })
    }

    render(){
        return null;
    }
}
