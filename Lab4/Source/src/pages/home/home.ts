import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {RegisterPage} from '../register/register';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public alertCtrl:AlertController) {
  
  }
    signIn(){
        this.navCtrl.push(LoginPage);    
    }
    register(){
        this.navCtrl.push(RegisterPage);    
    }
}


