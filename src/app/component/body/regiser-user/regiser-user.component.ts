import { Component, OnInit } from '@angular/core';
import { RegisterRequest } from '../../../model/register-request.model';
import { DataService } from '../../../service/data.service';
import { JsonResponse } from '../../../model/json-response.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from '../../../model/city.model';
import { AddressCreationRequest } from '../../../model/address-creation-request.model';

@Component({
  selector: 'app-regiser-user',
  templateUrl: './regiser-user.component.html',
  styleUrls: ['./regiser-user.component.css']
})
export class RegiserUserComponent implements OnInit {

  private cityList: City[];

  constructor(private dataService: DataService
    ,private router: Router) { }

  ngOnInit() {
    this.dataService.getCities().subscribe(
      (json)=>{
        if(json.status == 200){
          this.cityList = json.response;
      }
    });
  }

  sendRegisterRequest(formData: NgForm){
    if(this.isValidData(formData)){
      this.dataService.postRegister(this.getRegiserRequest(formData)).subscribe(
        (response) => {
          console.log(response.message);
          if(response.status == 201){
            this.router.navigate(['login']);
          }
        }
      );
    }
    
  }

  isValidData(formData: NgForm): boolean{
    console.log(formData.value.username);
    console.log(formData.value.password);
    console.log(formData.value.name);
    console.log(formData.value.email);
    console.log(formData.value.houseNumber);
    console.log(formData.value.area);
    console.log(formData.value.landmark);
    console.log(this.getCityID(formData.value.city));
    console.log(formData.value.pincode);
    return true;//VALIDATIONS
  }

  getRegiserRequest(formData: NgForm): RegisterRequest{
    return new RegisterRequest(
      formData.value.username,
      formData.value.password,
      formData.value.name,
      formData.value.email,
      this.getAddressCreationRequest(formData)
    );
  }

  getAddressCreationRequest(formData: NgForm): AddressCreationRequest{
    return new AddressCreationRequest
      (
        formData.value.houseNumber,
        formData.value.area,
        formData.value.landmark,
        this.getCityID(formData.value.city),
        formData.value.pincode
      );
  }

  getCityID(selectedCity: string): number{
    for(var city of this.cityList){
      if(city.cityName+", "+city.stateName == selectedCity)
        return city.cityID;
    }
  }

}
