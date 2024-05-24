import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { ProfileComponent } from '../profile/profile.component';



@Component({
  selector: 'app-dashBoard',
  standalone: true,
  imports: [ HttpClientModule, RouterModule, MenuComponent, ProfileComponent ],
  templateUrl: './dashBoard.component.html',
  styleUrl: './dashBoard.component.scss'
})
export class DashBoardComponent implements OnInit {

  constructor(

  ) {}

  public async ngOnInit(): Promise<void> {

  }
}
