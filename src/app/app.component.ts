import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { AccountService } from './services/accounts/account.service';
import { PushNotificationService } from './services/push-notification.service';
import { FcmService } from './services/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(MenuComponent, {static: true}) menu: MenuComponent;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private router: Router,
    private accountService: AccountService,
    private notificationService: PushNotificationService,
    private fcmService: FcmService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#0E5780");
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event.url === '/login-tutor') {
        this.menuCtrl.enable(false);
      } else {
        this.menu.refreshOptions();
      }
    });

    this.initializePushNotifications();
  }

  private async initializePushNotifications() {
    let signedIn = await this.accountService.isUserLoggedIn();
    if (!signedIn) {
      return;
    }
    await this.fcmService.getToken();
    this.notificationService.listenWhenUserTapsNotification();
  }

}
