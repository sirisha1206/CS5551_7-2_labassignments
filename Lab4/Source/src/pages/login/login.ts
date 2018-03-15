import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {MainPage} from '../main/main';
import {RegisterPage} from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    @ViewChild('username') user;
    @ViewChild('password') password;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  signInUser(){
    
    var localuname = localStorage.getItem('username');
    var localpwd = localStorage.getItem('password');  
    
    if(this.user.value == localuname && this.password.value == localpwd){
                 this.navCtrl.push(MainPage);    
    }else{
         let alert = this.alertCtrl.create({
          title: 'Login unsuccessful!',
          subTitle: 'Username or Password incorrect!!',
          buttons: ['OK']
        });
        alert.present();
    }
    console.log(this.user.value,this.password.value);
  }
  
  register(){
        this.navCtrl.push(RegisterPage);    
    }

}
