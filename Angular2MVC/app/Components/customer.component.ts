import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../Service/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ICustomer } from '../Model/customer';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { DatePipe } from '@angular/common';


@Component({
    templateUrl: 'app/Components/customer.component.html'
})

export class CustomerComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    customers: ICustomer[];
    customer: ICustomer;
    msg: string;
    indLoading: boolean = false;
    customerFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _customerService: CustomerService, private datePipe: DatePipe) { }

    ngOnInit(): void {
        this.customerFrm = this.fb.group({
            CustomerId: [''],
            FirstName: ['', Validators.required],
            LastName: ['', Validators.required],
            Email: ['', Validators.required],
            DOB: [''],
            CustCode: ['']
        });
        this.LoadCustomers();
    }

    //Calling Get customer web api and loading all customers
    LoadCustomers(): void {
        this.indLoading = true;
        this._customerService.get(Global.BASE_CUSTOMER_ENDPOINT)
            .subscribe(customers => 
            {
                this.customers = customers; 
                this.indLoading = false; 
            },
            error => this.msg = <any>error);
    }

    //Add new customer by filling data into form, then calling create web api
    addCustomer() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Customer";
        this.modalBtnTitle = "Add";
        this.customerFrm.reset();
        this.modal.open();
    }

    //Edit customer by id, then calling update web api
    editCustomer(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Customer";
        this.modalBtnTitle = "Update";
        this.customer = this.customers.filter(x => x.CustomerId == id)[0];
        this.customerFrm.setValue(this.customer);
        this.modal.open();
    }
    //Delete customer by id, then calling delete web api
    deleteCustomer(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.customer = this.customers.filter(x => x.CustomerId == id)[0];
        this.customerFrm.setValue(this.customer);
        this.modal.open();
    }

    // Form submit event handler, swatch case for: create, update, delete
    onSubmit(formData: any) {
        this.msg = "";       
   
        switch (this.dbops) {
            case DBOperation.create:
                var dobDate = formData._value.DOB;
                var formatedDate = this.datePipe.transform(dobDate, "yyyy-MM-dd").replace('-', '').replace('-', '');
                formData._value.CustCode = (formData._value.FirstName + formData._value.LastName).toLowerCase() + formatedDate;
                this._customerService.post(Global.BASE_CUSTOMER_ENDPOINT, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadCustomers();
                        }
                        else
                        {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }
                        
                        this.modal.dismiss();
                    },
                    error => {
                      this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._customerService.put(Global.BASE_CUSTOMER_ENDPOINT, formData._value.CustomerId, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadCustomers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._customerService.delete(Global.BASE_CUSTOMER_ENDPOINT, formData._value.CustomerId).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadCustomers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;

        }
    }

    SetControlsState(isEnable: boolean)
    {
        isEnable ? this.customerFrm.enable() : this.customerFrm.disable();
    }
}