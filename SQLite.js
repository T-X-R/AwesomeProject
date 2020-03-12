import React, { Component } from 'react';
import SQLiteStorage from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(true);
var database_name = "Users/xit/Desktop/AwesomeProject/Database/AwesomeProject.db";//数据库文件
var database_version = "1.0";//版本号
var database_displayname = "MySQLite";
var database_size = -1;
var db;

export default class SQLite extends Component {
    //初始化数据库
    initDB(){
        db = SQLiteStorage.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            ()=>{
                console.log("Database started successfully...")
            },(err)=>{
                console.log(err)
            });
        return db;
    }
    //关闭数据库
    closeDB(){
        if(db){
            console.log('close');
            db.close();
        }else {
            console.log("Database close failed...");
        }
    }
    //新建数据表
    createTable() {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS USER(' +
                'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +
                'userName varchar,'+
                'phone VARCHAR,' +
                'pwd VARCHAR)',
                [],
                () => {
                    // callBack && callBack(true)
                    console.log("Execute progress success...")
                },(err) => {
                    // callBack && callBack(false, err)
                    console.log("Execute progress failed..." + err)
            })
        },(err) => {
            console.log("Transaction progress error..." + err)
        },() => {
            console.log("Transaction progress success...")
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
                    console.log(`Insert data to ${tableName} execute successfully...`)
                },(err) => {
                    // callBack && callBack(false, err)
                    console.log("Insert data execute error:" + err)
            })
        },(err) => {
            console.log("Insert data transaction progress error:" + err)
        },() => {
            console.log(`Insert data to ${tableName} transaction progress success...`)
        })
    }
    //删除数据
    deleteData(tableName, key, value, callBack){
        let sql = `DELETE FROM ${tableName} WHERE ${key} = ${value}`
        db.transaction((tx) => {
            tx.executeSql(
                sql,
                [],
                () => {
                    callBack && callBack(true)
                    console.log(`Delete data from ${tableName} execute success...`)
                },(err) => {
                    callBack && callBack(false, err)
                    console.log("Delete data execute error:" + err)
            })
        },(err) => {
            console.log("Delete data transaction progress error:" + err)
        },() => {
            console.log(`Delete data from ${tableName} transaction progress success...`)
        })
    }
    //查找数据
    selectData(tableName, callBack){
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
                    callBack && callBack(true, data)
                    console.log(`Select data from ${tableName} execute success...`)
                },(err) => {
                    callBack && callBack(false, err)
                    console.log("Select data execute error:" + err)
            })
        },(err) => {
            console.log("Select data transaction progress error:" + err)
        },() => {
            console.log(`Select data from ${tableName} transaction progress success...`)
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
                    console.log(`Drop ${tableName} execute success...`)
                },(err) => {
                    callBack && callBack(false, err)
                    console.log("Drop table execute error:" + err)
            })
        },(err) => {
            console.log("Drop table transaction progress error:" + err)
        },() => {
            console.log(`Drop ${tableName} transaction progress success...`)
        })
    }

    render(){
        return null;
    }
}
