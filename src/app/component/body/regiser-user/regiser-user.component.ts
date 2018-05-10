import { Component, OnInit } from '@angular/core';
import { RegisterRequest } from '../../../model/register-request.model';
import { DataService } from '../../../service/data.service';
import { JsonResponse } from '../../../model/json-response.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regiser-user',
  templateUrl: './regiser-user.component.html',
  styleUrls: ['./regiser-user.component.css']
})
export class RegiserUserComponent implements OnInit {

  constructor(private dataService: DataService
    ,private router: Router) { }

  ngOnInit() {
  }

  sendRegisterRequest(formData: NgForm){
    var request: RegisterRequest = new RegisterRequest();
    //VALIDATIONS !
    request.name = formData.value.name;
    request.username = formData.value.username;
    request.password = formData.value.password;

    this.dataService.postRegister(request).subscribe(
      (response) => {
        console.log(response.message);
        if(response.status == 201){
          this.router.navigate(['login']);
        }
      }
    );
    
  }

}
