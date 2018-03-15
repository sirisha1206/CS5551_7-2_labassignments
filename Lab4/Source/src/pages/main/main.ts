import { Component ,ViewChild,ElementRef} from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';
import {LoginPage} from '../login/login';

declare var google: any;

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
lat: any;
lng: any;
map: any;
data: any;

@ViewChild('map') mapRef: ElementRef;
  constructor(public navCtrl: NavController, public geo: Geolocation, public httpClient: HttpClient,public alertCtrl: AlertController) {

  }
    ionViewDidLoad(){
    
        this.geo.getCurrentPosition().then( pos => {
            this.lat = pos.coords.latitude;
            this.lng = pos.coords.longitude;
             this.httpClient.get('https://api.foursquare.com/v2/venues/search?client_id=XUE5OHFJNUDACMIFWVF5XMCUFUKPSWXTBBTSO1PHBFL0BGDK&client_secret=Z0RUZIJ4W5M3YLFHDQRL1VL2WQWDJHYSPJKXO2SKFALLHU0U&v=20180223&limit=5&ll='+ this.lat+','+this.lng+'&query=pharmacy').subscribe((data:any) => {
		          this.data = data.response.venues;
                    this.showMap();
                   this.getMarkers();
            });
        }).catch( err => console.log(err));
        
    }
    showMap(){
        //console.log(this.lat);
        //console.log(this.lng);
       // const location = new google.maps.LatLng(this.lat,this.lng);
       console.log(this.data[0].location.lat);
       console.log(this.data[0].location.lng);
        const location = new google.maps.LatLng(this.data[0].location.lat,this.data[0].location.lng);
        const options = {
            center:location,
            zoom:12
        };
       
        this.map = new google.maps.Map(this.mapRef.nativeElement,options);
        
        //this.addMarker(location,this.map);
        
    }
    getMarkers() {
        for (let _i = 0; _i < this.data.length; _i++) {
          if(_i >= 0 )
           this.addMarkersToMap(this.data[_i]);
        }
    }
    
    addMarkersToMap(mstore) {
      var position = new google.maps.LatLng(mstore.location.lat, mstore.location.lng);
      console.log(position);
      var mstoreMarker = new google.maps.Marker({position: position, title: mstore.name});
      mstoreMarker.setMap(this.map);
    }
    
   /* addMarker(position,map){
        return new google.maps.Marker({position,map});
    
    }*/
    
    logout(){
        let alert = this.alertCtrl.create({
          title: 'Logging out',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(LoginPage);    
    }
     
}

