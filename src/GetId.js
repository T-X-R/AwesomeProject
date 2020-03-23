import React, { Component } from 'react';
import { LOGIN } from '../src/api';

export async function fetchId(){
    return new Promise(function(resolve, reject){
        fetch(LOGIN, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })
        .catch((error) => {
            reject(error);
        });
    });
}
