"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var product_service_1 = require("../Service/product.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var ProductComponent = /** @class */ (function () {
    function ProductComponent(fb, _productService) {
        this.fb = fb;
        this._productService = _productService;
        this.indLoading = false;
    }
    ProductComponent.prototype.ngOnInit = function () {
        this.productFrm = this.fb.group({
            ProductId: [''],
            ProductName: ['', forms_1.Validators.required],
            Price: [''],
            StockCount: [''],
            CategoryName: ['', forms_1.Validators.required]
        });
        this.LoadProducts();
    };
    ProductComponent.prototype.LoadProducts = function () {
        var _this = this;
        this.indLoading = true;
        this._productService.get(global_1.Global.BASE_PRODUCT_ENDPOINT)
            .subscribe(function (products) { _this.products = products; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    ProductComponent.prototype.addProduct = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Product";
        this.modalBtnTitle = "Add";
        this.productFrm.reset();
        this.modal.open();
    };
    ProductComponent.prototype.editProduct = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Product";
        this.modalBtnTitle = "Update";
        this.product = this.products.filter(function (x) { return x.ProductId == id; })[0];
        this.productFrm.setValue(this.product);
        this.modal.open();
    };
    ProductComponent.prototype.deleteProduct = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.product = this.products.filter(function (x) { return x.ProductId == id; })[0];
        this.productFrm.setValue(this.product);
        this.modal.open();
    };
    ProductComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._productService.post(global_1.Global.BASE_PRODUCT_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) //Success
                     {
                        _this.msg = "Data successfully added.";
                        _this.LoadProducts();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._productService.put(global_1.Global.BASE_PRODUCT_ENDPOINT, formData._value.ProductId, formData._value).subscribe(function (data) {
                    if (data == 1) //Success
                     {
                        _this.msg = "Data successfully updated.";
                        _this.LoadProducts();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._productService.delete(global_1.Global.BASE_PRODUCT_ENDPOINT, formData._value.ProductId).subscribe(function (data) {
                    if (data == 1) //Success
                     {
                        _this.msg = "Data successfully deleted.";
                        _this.LoadProducts();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    ProductComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.productFrm.enable() : this.productFrm.disable();
    };
    __decorate([
        core_1.ViewChild('modal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], ProductComponent.prototype, "modal", void 0);
    ProductComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/Components/product.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, product_service_1.ProductService])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map