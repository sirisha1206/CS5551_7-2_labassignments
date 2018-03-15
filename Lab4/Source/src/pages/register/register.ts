import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {LoginPage} from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
    
    @ViewChild('username') user;
    @ViewChild('email') email;
    @ViewChild('password') password;
    @ViewChild('confirmpassword') cpassword;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  
  registerUser(){
    if(this.password.value == this.cpassword.value){
        localStorage.setItem('username',this.user.value);
        localStorage.setItem('emailId',this.email.value);
        localStorage.setItem('password',this.password.value);
        localStorage.setItem('confirmpassword',this.cpassword.value);
        let alert = this.alertCtrl.create({
          title: 'Registration successful!',
          subTitle: 'You are registered as '+this.user.value,
          buttons: ['OK']
        });
        alert.present();
         this.navCtrl.push(LoginPage);  
    }else{
        let alert = this.alertCtrl.create({
          title: 'Registration unsuccessful!',
          subTitle: 'Password and Confirm password does not match',
          buttons: ['OK']
        });
        alert.present();
    }
    console.log(this.user.value,this.password.value);
  }

}
