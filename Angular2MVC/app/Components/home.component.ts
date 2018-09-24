import { Component } from "@angular/core";

@Component({
    template: `<h1>Coding Exercise - Customer Management Tool by C#, MVC, Angular</h1>
                <div class="row">
                    <h4>Simple web application to manage customers which including below features:</h4>
                    <ul style="padding-left:5%;">
                        <li><p>Feature of listing of customers.</p></li>
                        <li><p>Add a new customer and persist the changes.</p></li>
                        <li><p>When selecting a customer on the listing, they are taken to the details of the customer.</p></li>
                        <li><p>Details will display all details of the customer..</p></li>
                        <li><p>On the details, the user may edit the customer properties and persist the changes.</p></li>
                    </ul>
                </div>`
})

export class HomeComponent{
}