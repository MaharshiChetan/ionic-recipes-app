import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = 'TabsPage';
  signupPage: any = 'SignupPage';
  signinPage: any = 'SigninPage';
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {
    firebase.initializeApp({
      apiKey: 'AIzaSyBAXU9njta2HQmEJkwVU6Ut36IvZOrm8Fs',
      authDomain: 'fir-crud-a5c1a.firebaseapp.com',
      databaseURL: 'https://fir-crud-a5c1a.firebaseio.com',
      projectId: 'fir-crud-a5c1a',
      storageBucket: 'fir-crud-a5c1a.appspot.com',
      messagingSenderId: '828366756442',
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = 'TabsPage';
      } else {
        this.isAuthenticated = false;
        this.rootPage = 'SigninPage';
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: string) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
  }
}
