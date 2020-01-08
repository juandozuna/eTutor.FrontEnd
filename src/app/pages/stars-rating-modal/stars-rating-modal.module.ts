import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StarsRatingModalPage } from './stars-rating-modal.page';

import { StarRatingModule } from 'ionic4-star-rating';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    ComponentsModule
  ],
  declarations: [StarsRatingModalPage]
})
export class StarsRatingModalPageModule {}