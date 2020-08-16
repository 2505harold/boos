import { Component, OnInit, Inject, Optional } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Login } from "../models/login";

@Component({
  selector: "app-modal-login",
  templateUrl: "./modal-login.component.html",
  styleUrls: ["./modal-login.component.css"],
})
export class ModalLoginComponent implements OnInit {
  localData: any;
  constructor(
    public dialogRef: MatDialogRef<ModalLoginComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Login
  ) {
    this.localData = { ...data };
  }

  ngOnInit() {}
}
