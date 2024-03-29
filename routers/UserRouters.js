const express=require('express');
const path=require('path');
const app=express.Router();
app.use(express.static('public'));
const ProfileCont=require(path.join(__dirname,'..','controllers','ProfileCont.js'));
const MedInfoCont=require(path.join(__dirname,'..','controllers','MedInfoCon.js'));
const UserInfoCont=require(path.join(__dirname,'..','controllers','UserCon.js'));
const nodemailerCont=require(path.join(__dirname,'..','controllers','nodemailerCon.js'));
const smsCont=require(path.join(__dirname,'..','controllers','smsCon.js'));
const reqAuth=require(path.join(__dirname,'..','middleware','Auth.js'));
app.post('/user',UserInfoCont.createUserInfo);
app.get('/logout',UserInfoCont.LogOut);
app.get('/Admin',UserInfoCont.Admin);
app.get('/ChkLogin',reqAuth.requireAuth,UserInfoCont.CheckLogin);
app.get('/nodemailer/:RegEmail',nodemailerCont.ndemailer);
app.get('/Multinodemailer/:EmailArray/:Message',nodemailerCont.Multindemailer);
app.get('/login/:RegEmail/:password',UserInfoCont.LoginUserInfo);
app.get('/Status/:RegEmail/:status',UserInfoCont.UserStatus);
app.get('/sendSMS/:mobile',reqAuth.requireAuth,smsCont.SendSMS);
app.get('/updatePassword/:RegEmail/:password',UserInfoCont.updateUserPassword);
app.post('/profile',reqAuth.requireAuth,ProfileCont.createProfileInfo);
app.post('/updateProfile',reqAuth.requireAuth,ProfileCont.updateProfileInfo);
app.get('/dashInfo/:RegEmail',reqAuth.requireAuth,ProfileCont.fetchDashInfo);
app.get('/fetchSupplier/:RegEmail',reqAuth.requireAuth,ProfileCont.fetchSupplierInfo);
app.post('/MedInfo',reqAuth.requireAuth,MedInfoCont.createMedInfo);
app.get('/FetchInfo/:RegEmail',reqAuth.requireAuth,MedInfoCont.fetchAllData);
app.delete('/DeleteRecord/:id',reqAuth.requireAuth,MedInfoCont.DeleteRecord);
app.get('/fetchCities',reqAuth.requireAuth,MedInfoCont.fetchCities);
app.get('/fetchMed/:e',reqAuth.requireAuth,MedInfoCont.fetchMed);
app.get('/fetchMedicine/:MedName/:City',reqAuth.requireAuth,MedInfoCont.fetchMedicine);
module.exports=app;